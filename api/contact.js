import { Resend } from "resend";
import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

const resend = new Resend(process.env.RESEND_API_KEY);

// Redis is only used for spam protection and stats, never for actually
// sending the message. If it's unconfigured or unreachable, the form must
// keep working, just without rate limiting.
let redis = null;
let ratelimit = null;
try {
  redis = Redis.fromEnv();
  // 5 submissions per 10 minutes per IP. analytics:true logs every decision
  // to the Upstash dashboard's built-in Ratelimit Analytics view.
  ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    analytics: true,
    prefix: "ratelimit:contact",
  });
} catch (err) {
  console.error("Redis unavailable; rate limiting and stats are disabled:", err);
}

const REASON_LABELS = {
  general: "General Inquiry",
  project: "Project",
  "tech-help": "Tech Help / IT Consulting",
  homelab: "Homelab",
};

function getClientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket?.remoteAddress || "unknown";
}

// Fire-and-forget counter increment; a Redis hiccup should never block a response.
function trackStat(key) {
  redis?.incr(key)?.catch((err) => console.error(`Failed to increment ${key}:`, err));
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (ratelimit) {
    try {
      const { success } = await ratelimit.limit(getClientIp(req));
      if (!success) {
        trackStat("contact:stats:blocked_ratelimit");
        return res.status(429).json({ error: "Too many requests. Please try again later." });
      }
    } catch (err) {
      console.error("Rate limit check failed, allowing request through:", err);
    }
  }

  const { name, email, phone, reason, message, company } = req.body ?? {};

  // Honeypot: a field real visitors never see or fill in. Bots that
  // autofill every input trip it. Return a fake success so they move on.
  if (company) {
    trackStat("contact:stats:blocked_honeypot");
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required" });
  }

  const reasonLabel = REASON_LABELS[reason] || "General Inquiry";

  try {
    await resend.emails.send({
      from: "Cody Hanna <hello@contact.codycodez.com>",
      to: "codyhanna8@gmail.com",
      replyTo: email,
      subject: `New contact form message: ${reasonLabel}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        `Reason: ${reasonLabel}`,
        "",
        message,
      ].join("\n"),
    });

    trackStat("contact:stats:sent");
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Resend send failed:", err);
    return res.status(502).json({ error: "Failed to send message" });
  }
}
