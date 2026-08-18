import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Simple shared-secret gate so this isn't wide open on a public URL.
  if (!process.env.STATS_SECRET || req.query.key !== process.env.STATS_SECRET) {
    return res.status(404).json({ error: "Not found" });
  }

  const [sent, blockedHoneypot, blockedRatelimit] = await Promise.all([
    redis.get("contact:stats:sent"),
    redis.get("contact:stats:blocked_honeypot"),
    redis.get("contact:stats:blocked_ratelimit"),
  ]);

  return res.status(200).json({
    sent: sent || 0,
    blockedHoneypot: blockedHoneypot || 0,
    blockedRatelimit: blockedRatelimit || 0,
  });
}
