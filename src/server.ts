import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

const startHandler = createStartHandler(defaultStreamHandler);

interface Env {
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_SENDER_ID?: string;
  OWNER_PHONE_NUMBER?: string;
}

// In-memory rate limiter — 5 calls/min per IP on API routes
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const API_RATE_LIMIT = 5;
const API_RATE_WINDOW = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + API_RATE_WINDOW });
    return true;
  }
  if (entry.count >= API_RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",
  "Content-Security-Policy": [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' data: https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join("; "),
};

function withSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[\s\-.()]/g, "");
  if (/^0[67]\d{8}$/.test(digits)) return "+33" + digits.slice(1);
  if (/^\+33[67]\d{8}$/.test(digits)) return digits;
  return digits;
}

async function sendSMS(to: string, body: string, env: Env): Promise<void> {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  const from = env.TWILIO_SENDER_ID ?? "BdxPrivil";
  if (!sid || !token) {
    console.warn("[Twilio] Variables manquantes — SMS non envoyé");
    return;
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const auth = "Basic " + btoa(`${sid}:${token}`);
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
  });
  if (!resp.ok) throw new Error(`Twilio ${resp.status}: ${await resp.text()}`);
}

function formatDate(iso?: string): string {
  if (!iso) return "date non précisée";
  return new Date(iso).toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const clientIp = request.headers.get("CF-Connecting-IP") ?? "unknown";

    // ── API: booking notification ─────────────────────────────────────────────
    if (request.method === "POST" && url.pathname === "/api/notify-booking") {
      if (!checkRateLimit(clientIp)) {
        return withSecurityHeaders(
          Response.json({ ok: false, error: "Too many requests" }, { status: 429 }),
        );
      }
      try {
        const data = (await request.json()) as {
          from: string;
          to: string;
          date?: string;
          pax: number;
          estimate?: number | null;
          clientPhone?: string;
        };
        const ownerPhone = env.OWNER_PHONE_NUMBER ?? "";

        const ownerSms = [
          "🚗 Bordeaux Privilège — Nouvelle réservation",
          `Trajet : ${data.from} → ${data.to}`,
          `Date : ${formatDate(data.date)}`,
          `Passagers : ${data.pax}`,
          data.estimate ? `Estimation : ${data.estimate} €` : null,
          data.clientPhone
            ? `Client : ${normalizePhone(data.clientPhone)}`
            : "Pas de tél client",
        ]
          .filter(Boolean)
          .join("\n");

        if (ownerPhone) await sendSMS(ownerPhone, ownerSms, env);

        if (data.clientPhone) {
          const clientSms = [
            "Bordeaux Privilège — Demande reçue ✓",
            `Trajet ${data.from} → ${data.to} bien transmis.`,
            "Votre chauffeur vous contacte sous 30 min.",
            ownerPhone ? `Contact direct : ${ownerPhone}` : null,
          ]
            .filter(Boolean)
            .join("\n");
          await sendSMS(normalizePhone(data.clientPhone), clientSms, env);
        }

        return withSecurityHeaders(Response.json({ ok: true }));
      } catch (e) {
        console.error("[notify-booking]", e);
        return withSecurityHeaders(
          Response.json({ ok: false, error: String(e) }, { status: 500 }),
        );
      }
    }

    // ── API: contact notification ─────────────────────────────────────────────
    if (request.method === "POST" && url.pathname === "/api/notify-contact") {
      if (!checkRateLimit(clientIp)) {
        return withSecurityHeaders(
          Response.json({ ok: false, error: "Too many requests" }, { status: 429 }),
        );
      }
      try {
        const data = (await request.json()) as {
          name: string;
          email: string;
          phone?: string;
          message: string;
        };
        const ownerPhone = env.OWNER_PHONE_NUMBER ?? "";

        const ownerSms = [
          "📩 Bordeaux Privilège — Nouveau message",
          `De : ${data.name}`,
          `Email : ${data.email}`,
          data.phone ? `Tél : ${normalizePhone(data.phone)}` : null,
          "---",
          String(data.message).slice(0, 300),
        ]
          .filter(Boolean)
          .join("\n");

        if (ownerPhone) await sendSMS(ownerPhone, ownerSms, env);

        if (data.phone) {
          const clientSms = [
            "Bordeaux Privilège — Message reçu ✓",
            `Bonjour ${data.name}, votre message a bien été transmis.`,
            "Nous vous répondons sous 24h.",
            ownerPhone ? `Contact direct : ${ownerPhone}` : null,
          ]
            .filter(Boolean)
            .join("\n");
          await sendSMS(normalizePhone(data.phone), clientSms, env);
        }

        return withSecurityHeaders(Response.json({ ok: true }));
      } catch (e) {
        console.error("[notify-contact]", e);
        return withSecurityHeaders(
          Response.json({ ok: false, error: String(e) }, { status: 500 }),
        );
      }
    }

    // ── TanStack Start SSR ────────────────────────────────────────────────────
    const response = await startHandler(request, env, ctx);
    return withSecurityHeaders(response);
  },
};
