// Proxies the homelab's Uptime Kuma status page so the browser never talks to
// the homelab directly. Doing it server-side avoids CORS (Kuma doesn't send
// CORS headers in production), lets Vercel's edge cache absorb traffic, and
// gives one place to drop monitors that shouldn't be public.
//
// Env vars (set in Vercel → Settings → Environment Variables):
//   UPTIME_KUMA_URL   e.g. https://uptime.codycodez.com (no trailing slash)
//   UPTIME_KUMA_SLUG  status page slug, defaults to "homelab"
//   UPTIME_HIDE       optional, comma-separated extra name patterns to hide

const DEFAULT_HIDE = [
  "sonarr", "radarr", "lidarr", "readarr", "prowlarr", "bazarr", "overseerr",
  "jellyseerr", "qbittorrent", "sabnzbd", "nzbget", "transmission", "deluge",
  "gluetun", "flaresolverr", "arr", "grafana",
];

function hidePatterns() {
  const extra = (process.env.UPTIME_HIDE || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return [...DEFAULT_HIDE, ...extra];
}

function isHidden(name, patterns) {
  const n = name.toLowerCase();
  // "arr" only matches as a whole word (e.g. "Arr Stack"), not inside other names.
  return patterns.some((p) => (p === "arr" ? /\barr\b/.test(n) : n.includes(p)));
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const base = process.env.UPTIME_KUMA_URL;
  const slug = process.env.UPTIME_KUMA_SLUG || "homelab";
  if (!base) return res.status(503).json({ error: "Status source not configured" });

  try {
    const signal = AbortSignal.timeout(5000);
    const [pageRes, hbRes] = await Promise.all([
      fetch(`${base}/api/status-page/${slug}`, { signal }),
      fetch(`${base}/api/status-page/heartbeat/${slug}`, { signal }),
    ]);
    if (!pageRes.ok || !hbRes.ok) throw new Error(`upstream ${pageRes.status}/${hbRes.status}`);

    const page = await pageRes.json();
    const hb = await hbRes.json();
    const patterns = hidePatterns();

    const groups = (page.publicGroupList || [])
      .map((group) => ({
        name: group.name,
        services: (group.monitorList || [])
          .filter((m) => !isHidden(m.name, patterns))
          .map((m) => {
            const beats = hb.heartbeatList?.[m.id] ?? [];
            const last = beats[beats.length - 1];
            const uptime24 = hb.uptimeList?.[`${m.id}_24`];
            return {
              name: m.name,
              description: m.description || "",
              status: last ? (last.status === 1 ? "up" : "down") : "unknown",
              uptime: uptime24 != null ? uptime24 * 100 : null,
              // Only up/down per beat; no hostnames, IPs, or error messages leave the lab.
              bars: beats.slice(-30).map((b) => b.status === 1),
            };
          }),
      }))
      .filter((g) => g.services.length > 0);

    // Fresh for 60s at the edge, then serve stale for up to 5 min while refreshing.
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json({ groups, updatedAt: new Date().toISOString() });
  } catch (err) {
    console.error("Uptime Kuma fetch failed:", err.message);
    res.setHeader("Cache-Control", "public, s-maxage=30");
    return res.status(502).json({ error: "Status source unavailable" });
  }
}
