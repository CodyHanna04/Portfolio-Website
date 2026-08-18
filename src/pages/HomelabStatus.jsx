import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Uptime Kuma status page endpoint. Once uptime.codycodez.com is live with a
// status page slug of "homelab", this page switches from demo data to live
// automatically. Override with VITE_UPTIME_BASE_URL / VITE_UPTIME_SLUG.
const UPTIME_BASE = import.meta.env.VITE_UPTIME_BASE_URL || "https://uptime.codycodez.com";
const UPTIME_SLUG = import.meta.env.VITE_UPTIME_SLUG || "homelab";

// ---- Demo data (shown until the live endpoint exists) ----
const demoGroups = [
  {
    name: "Core Infrastructure",
    services: [
      { name: "Proxmox VE Cluster", description: "Multi-node virtualization on Dell PowerEdge", uptime: 99.99 },
      { name: "Ceph Storage", description: "Distributed high-availability storage", uptime: 99.97 },
      { name: "Tailscale Mesh", description: "Multi-site private networking", uptime: 100 },
    ],
  },
  {
    name: "Identity & Access",
    services: [
      { name: "Authentik", description: "Centralized SSO / OIDC identity provider", uptime: 99.95 },
      { name: "Homepage", description: "Service dashboard behind the reverse proxy", uptime: 99.92 },
    ],
  },
  {
    name: "Monitoring & Cameras",
    services: [
      { name: "Frigate NVR", description: "AI-powered camera detection & recording", uptime: 99.61 },
      { name: "Grafana", description: "Metrics and infrastructure dashboards", uptime: 99.9 },
    ],
  },
  {
    name: "Apps & Automation",
    services: [
      { name: "Home Assistant", description: "Smart home hub with HomeKit bridge", uptime: 99.78 },
      { name: "n8n", description: "Workflow automation & local AI pipelines", uptime: 99.7 },
      { name: "Immich", description: "Self-hosted photo library", uptime: 99.88 },
      { name: "Jellyfin", description: "Self-hosted media server", uptime: 99.84 },
    ],
  },
  {
    name: "Storage & Operations",
    services: [
      { name: "Storj Node", description: "Decentralized storage node", uptime: 98.9 },
      { name: "OpenProject", description: "Documentation & lab project tracking", uptime: 99.93 },
    ],
  },
];

function hashString(s) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0;
  return Math.abs(h);
}

// Deterministic 30-day history bars for demo mode; a rare dip keeps it honest.
function demoBars(name, uptime) {
  const h = hashString(name);
  return Array.from({ length: 30 }, (_, i) => {
    const v = Math.sin(h + i * 7.3) * 0.5 + 0.5;
    return v > (100 - uptime) / 25 + 0.02;
  });
}

function withDemoBars(groups) {
  return groups.map((g) => ({
    ...g,
    services: g.services.map((s) => ({
      ...s,
      status: "up",
      bars: demoBars(s.name, s.uptime),
    })),
  }));
}

// ---- Live fetch (Uptime Kuma status page API) ----
async function fetchLiveGroups() {
  const signal = AbortSignal.timeout(5000);
  const [pageRes, hbRes] = await Promise.all([
    fetch(`${UPTIME_BASE}/api/status-page/${UPTIME_SLUG}`, { signal }),
    fetch(`${UPTIME_BASE}/api/status-page/heartbeat/${UPTIME_SLUG}`, { signal }),
  ]);
  if (!pageRes.ok || !hbRes.ok) throw new Error("status endpoint unavailable");

  const page = await pageRes.json();
  const hb = await hbRes.json();

  return page.publicGroupList.map((group) => ({
    name: group.name,
    services: group.monitorList.map((monitor) => {
      const beats = hb.heartbeatList?.[monitor.id] ?? [];
      const last = beats[beats.length - 1];
      const uptimeRaw = hb.uptimeList?.[`${monitor.id}_24`];
      return {
        name: monitor.name,
        description: "",
        status: last ? (last.status === 1 ? "up" : "down") : "unknown",
        uptime: uptimeRaw != null ? uptimeRaw * 100 : null,
        bars: beats.slice(-30).map((b) => b.status === 1),
      };
    }),
  }));
}

function StatusDot({ status }) {
  const color =
    status === "up" ? "bg-emerald-400" : status === "down" ? "bg-red-400" : "bg-gray-500";
  return (
    <span className="relative flex w-3 h-3 flex-shrink-0">
      {status === "up" && (
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
      )}
      <span className={`relative inline-flex rounded-full w-3 h-3 ${color}`} />
    </span>
  );
}

function UptimeBars({ bars }) {
  return (
    <div className="flex gap-[3px]" aria-hidden="true">
      {bars.map((up, i) => (
        <span
          key={i}
          className={`w-1.5 h-6 rounded-sm ${up ? "bg-emerald-400/70" : "bg-red-400/80"}`}
        />
      ))}
    </div>
  );
}

function ServiceRow({ service }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 py-4 border-b border-gray-800 last:border-b-0">
      <div className="flex items-center gap-3 sm:w-72 flex-shrink-0">
        <StatusDot status={service.status} />
        <div>
          <p className="font-medium text-sm">{service.name}</p>
          {service.description && (
            <p className="text-gray-500 text-xs">{service.description}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-4 sm:ml-auto">
        <UptimeBars bars={service.bars} />
        <span
          className={`text-sm font-mono w-16 text-right ${
            service.status === "down" ? "text-red-400" : "text-emerald-400"
          }`}
        >
          {service.uptime != null ? `${service.uptime.toFixed(2)}%` : "N/A"}
        </span>
      </div>
    </div>
  );
}

export default function HomelabStatus() {
  const [groups, setGroups] = useState(() => withDemoBars(demoGroups));
  const [mode, setMode] = useState("demo"); // demo | live

  useEffect(() => {
    let cancelled = false;
    fetchLiveGroups()
      .then((live) => {
        if (!cancelled && live.length > 0) {
          setGroups(live);
          setMode("live");
        }
      })
      .catch(() => {
        /* endpoint not up yet, stay in demo mode */
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const allServices = groups.flatMap((g) => g.services);
  const upCount = allServices.filter((s) => s.status === "up").length;
  const uptimes = allServices.filter((s) => s.uptime != null);
  const avgUptime =
    uptimes.length > 0
      ? uptimes.reduce((sum, s) => sum + s.uptime, 0) / uptimes.length
      : null;

  return (
    <div className="bg-gray-900 text-white min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <h1 className="text-4xl font-bold">Homelab Status</h1>
            {mode === "live" ? (
              <span className="text-xs font-mono uppercase tracking-wider bg-emerald-400/10 text-emerald-400 border border-emerald-400/30 px-2.5 py-1 rounded-full">
                Live
              </span>
            ) : (
              <span className="text-xs font-mono uppercase tracking-wider bg-amber-400/10 text-amber-400 border border-amber-400/30 px-2.5 py-1 rounded-full">
                Demo
              </span>
            )}
          </div>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real services running on my enterprise-style homelab: a multi-node Proxmox
            cluster with Ceph storage, VLAN-segmented networking, and centralized auth.
          </p>
          {mode === "demo" && (
            <p className="text-gray-600 text-xs mt-3 font-mono">
              Public monitoring endpoint coming soon: data below reflects the real
              service lineup with representative uptime.
            </p>
          )}
        </div>

        {/* Overall stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">
              {upCount}/{allServices.length}
            </p>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Operational</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-sky-400">
              {avgUptime != null ? `${avgUptime.toFixed(2)}%` : "N/A"}
            </p>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Avg Uptime</p>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-white">{groups.length}</p>
            <p className="text-gray-500 text-xs uppercase tracking-widest mt-1">Categories</p>
          </div>
        </div>

        {/* Service groups */}
        {groups.map((group) => (
          <div key={group.name}>
            <h2 className="text-sky-400 text-xs uppercase tracking-widest font-medium mb-2">
              {group.name}
            </h2>
            <div className="bg-gray-800/60 border border-gray-700 rounded-xl px-5">
              {group.services.map((service) => (
                <ServiceRow key={service.name} service={service} />
              ))}
            </div>
          </div>
        ))}

        {/* Footer link */}
        <div className="text-center pt-4">
          <p className="text-gray-400 text-sm mb-3">
            Curious how all of this is built and wired together?
          </p>
          <Link
            to="/projects/homelab"
            className="text-sky-400 hover:underline text-sm font-medium"
          >
            Read the homelab write-up →
          </Link>
        </div>
      </div>
    </div>
  );
}
