import { createStartHandler, defaultStreamHandler } from "@tanstack/react-start/server";

const startHandler = createStartHandler(defaultStreamHandler);

interface Env {
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_SENDER_ID?: string;
  TWILIO_WHATSAPP_FROM?: string;
  OWNER_PHONE_NUMBER?: string;
  OWNER_EMAIL?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
  ANTHROPIC_API_KEY?: string;
}

// ── Rate limiter (per IP × per endpoint) ──────────────────────────────────────
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMITS: Record<string, number> = {
  "/api/notify-booking": 5,
  "/api/notify-contact": 5,
  "/api/chat": 30,
  "/api/whatsapp-webhook": 100,
};
const RATE_WINDOW = 60_000;

function checkRateLimit(ip: string, pathname: string): boolean {
  const limit = RATE_LIMITS[pathname] ?? 20;
  const key = `${ip}:${pathname}`;
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= limit) return false;
  entry.count++;
  return true;
}

// ── Security headers ──────────────────────────────────────────────────────────
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

// ── Chat system prompt ────────────────────────────────────────────────────────
const CHAT_SYSTEM_PROMPT = `Tu es l'assistant virtuel de Bordeaux Privilège, une société de chauffeur privé haut de gamme à Bordeaux. Tu aides les visiteurs à :
- préparer une réservation (trajet, date, heure, nombre de passagers, bagages)
- obtenir une estimation tarifaire (Bordeaux ↔ Aéroport Mérignac à partir de 45 €, mise à disposition sur devis). Important : le trajet « Bordeaux centre → gare Saint-Jean » n'est plus proposé, ne pas le mentionner comme service disponible ; orienter le client vers un autre trajet ou un devis personnalisé.
- répondre aux questions sur le service (ponctualité, discrétion, SUV hybride confort, 1 à 4 passagers, Wi-Fi, eau). Un véhicule 7 places est potentiellement disponible sur demande (à confirmer selon la date) — invite le client à préciser la date et le nombre de passagers/bagages pour vérification.
- orienter vers la page de réservation, le téléphone (+33 6 44 69 10 32) ou WhatsApp si nécessaire

Ton : professionnel, rassurant, premium, concis. Réponds en français, avec des phrases courtes. Ne promets jamais de tarif définitif sans confirmation par téléphone. Pour finaliser une réservation, invite l'utilisateur à utiliser le formulaire de réservation ou à appeler.`;

// ── Utilities ─────────────────────────────────────────────────────────────────
function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[\s\-.()]/g, "");
  if (/^0[67]\d{8}$/.test(digits)) return "+33" + digits.slice(1);
  if (/^\+33[67]\d{8}$/.test(digits)) return digits;
  return digits;
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

// ── Notification channels ─────────────────────────────────────────────────────
async function sendSMS(to: string, body: string, env: Env): Promise<void> {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  const from = env.TWILIO_SENDER_ID ?? "BdxPrivil";
  if (!sid || !token) {
    console.warn("[SMS] Variables manquantes");
    return;
  }
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${sid}:${token}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
  });
  if (!resp.ok) throw new Error(`SMS ${resp.status}: ${await resp.text()}`);
}

async function sendWhatsApp(to: string, body: string, env: Env): Promise<void> {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  const rawFrom = env.TWILIO_WHATSAPP_FROM;
  if (!sid || !token || !rawFrom) {
    console.warn("[WhatsApp] Variables manquantes — message non envoyé");
    return;
  }
  const from = rawFrom.startsWith("whatsapp:") ? rawFrom : `whatsapp:${rawFrom}`;
  const recipient = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;
  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${sid}:${token}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ From: from, To: recipient, Body: body }).toString(),
  });
  if (!resp.ok) throw new Error(`WhatsApp ${resp.status}: ${await resp.text()}`);
}

async function sendEmail(
  to: string,
  subject: string,
  html: string,
  env: Env,
): Promise<void> {
  const apiKey = env.RESEND_API_KEY;
  const from = env.RESEND_FROM_EMAIL ?? "Bordeaux Privilège <noreply@bordeaux-privilege.fr>";
  if (!apiKey) {
    console.warn("[Email] RESEND_API_KEY manquant — email non envoyé");
    return;
  }
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!resp.ok) throw new Error(`Resend ${resp.status}: ${await resp.text()}`);
}

// ── Email templates ───────────────────────────────────────────────────────────
function emailShell(title: string, body: string): string {
  return `<!DOCTYPE html><html lang="fr">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>${title}</title></head>
<body style="margin:0;padding:0;background:#f0f0f0;font-family:Arial,sans-serif;">
<div style="max-width:600px;margin:24px auto;background:#141414;color:#e0e0e0;border-radius:4px;overflow:hidden;">
  <div style="background:#0a0a0a;padding:20px 28px;border-bottom:2px solid #c9a84c;">
    <p style="margin:0;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9a84c;">Bordeaux Privilège</p>
    <h1 style="margin:6px 0 0;font-size:18px;font-weight:400;color:#fff;">${title}</h1>
  </div>
  <div style="padding:28px;">${body}</div>
  <div style="background:#0a0a0a;padding:14px 28px;font-size:11px;color:#555;text-align:center;">
    Bordeaux Privilège — Chauffeur privé haut de gamme à Bordeaux
  </div>
</div>
</body></html>`;
}

function row(label: string, value: string, accent = false): string {
  const color = accent ? "color:#c9a84c;font-size:17px;" : "color:#fff;";
  return `<tr style="border-top:1px solid #2a2a2a;">
    <td style="padding:9px 0;color:#888;width:38%;font-size:13px;">${label}</td>
    <td style="padding:9px 0;${color}font-size:13px;">${value}</td>
  </tr>`;
}

function bookingOwnerHtml(data: {
  from: string;
  to: string;
  date?: string;
  pax: number;
  estimate?: number | null;
  clientPhone?: string;
}): string {
  const rows = [
    row("Trajet", `${escHtml(data.from)} → ${escHtml(data.to)}`),
    row("Date", formatDate(data.date)),
    row("Passagers", String(data.pax)),
    ...(data.estimate ? [row("Estimation", `${data.estimate} €`, true)] : []),
    ...(data.clientPhone ? [row("Tél client", escHtml(normalizePhone(data.clientPhone)))] : []),
  ].join("");
  return emailShell(
    "Nouvelle réservation",
    `<p style="margin:0 0 18px;color:#aaa;font-size:13px;">Une nouvelle demande de trajet a été soumise via le site.</p>
    <table style="width:100%;border-collapse:collapse;">${rows}</table>`,
  );
}

function bookingClientHtml(
  data: { from: string; to: string },
  ownerPhone: string,
): string {
  const waLink = `https://wa.me/${ownerPhone.replace(/\D/g, "")}`;
  return emailShell(
    "Demande reçue ✓",
    `<p style="margin:0 0 12px;color:#e0e0e0;font-size:14px;">Bonjour,</p>
    <p style="margin:0 0 18px;color:#aaa;font-size:13px;">Votre demande de chauffeur privé pour le trajet
    <strong style="color:#fff;">${escHtml(data.from)} → ${escHtml(data.to)}</strong> a bien été reçue.<br>
    Notre chauffeur vous contacte sous 30 minutes.</p>
    <div style="background:#1e1e1e;border:1px solid #2a2a2a;padding:16px 20px;font-size:13px;">
      <p style="margin:0 0 8px;color:#888;">Contact direct :</p>
      <p style="margin:0 0 4px;"><a href="tel:${escHtml(ownerPhone)}" style="color:#c9a84c;text-decoration:none;">📞 ${escHtml(ownerPhone)}</a></p>
      <p style="margin:0;"><a href="${waLink}" style="color:#c9a84c;text-decoration:none;">💬 WhatsApp</a></p>
    </div>`,
  );
}

function contactOwnerHtml(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}): string {
  const rows = [
    row("Nom", escHtml(data.name)),
    row("Email", escHtml(data.email)),
    ...(data.phone ? [row("Téléphone", escHtml(normalizePhone(data.phone)))] : []),
  ].join("");
  return emailShell(
    "Nouveau message de contact",
    `<table style="width:100%;border-collapse:collapse;margin-bottom:18px;">${rows}</table>
    <div style="background:#1e1e1e;border-left:3px solid #c9a84c;padding:14px 16px;font-size:13px;color:#ccc;line-height:1.6;">
      ${escHtml(data.message)}
    </div>`,
  );
}

function contactClientHtml(name: string, ownerPhone: string): string {
  const waLink = `https://wa.me/${ownerPhone.replace(/\D/g, "")}`;
  return emailShell(
    "Message reçu ✓",
    `<p style="margin:0 0 12px;color:#e0e0e0;font-size:14px;">Bonjour ${escHtml(name)},</p>
    <p style="margin:0 0 18px;color:#aaa;font-size:13px;">Votre message a bien été transmis à Bordeaux Privilège.<br>
    Nous vous répondons sous 24h.</p>
    <div style="background:#1e1e1e;border:1px solid #2a2a2a;padding:16px 20px;font-size:13px;">
      <p style="margin:0 0 8px;color:#888;">Pour une réponse rapide :</p>
      <p style="margin:0 0 4px;"><a href="tel:${escHtml(ownerPhone)}" style="color:#c9a84c;text-decoration:none;">📞 ${escHtml(ownerPhone)}</a></p>
      <p style="margin:0;"><a href="${waLink}" style="color:#c9a84c;text-decoration:none;">💬 WhatsApp</a></p>
    </div>`,
  );
}

// ── Main handler ──────────────────────────────────────────────────────────────
export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const clientIp = request.headers.get("CF-Connecting-IP") ?? "unknown";

    // ── Booking notification ──────────────────────────────────────────────────
    if (request.method === "POST" && url.pathname === "/api/notify-booking") {
      if (!checkRateLimit(clientIp, url.pathname)) {
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
        const ownerEmail = env.OWNER_EMAIL ?? "";

        const ownerSmsBody = [
          "🚗 Bordeaux Privilège — Nouvelle réservation",
          `Trajet : ${data.from} → ${data.to}`,
          `Date : ${formatDate(data.date)}`,
          `Passagers : ${data.pax}`,
          data.estimate ? `Estimation : ${data.estimate} €` : null,
          data.clientPhone ? `Client : ${normalizePhone(data.clientPhone)}` : "Pas de tél client",
        ]
          .filter(Boolean)
          .join("\n");

        const clientSmsBody = [
          "Bordeaux Privilège — Demande reçue ✓",
          `Trajet ${data.from} → ${data.to} bien transmis.`,
          "Votre chauffeur vous contacte sous 30 min.",
          ownerPhone ? `Contact direct : ${ownerPhone}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        await Promise.allSettled([
          ownerPhone ? sendSMS(ownerPhone, ownerSmsBody, env) : Promise.resolve(),
          ownerPhone ? sendWhatsApp(ownerPhone, ownerSmsBody, env) : Promise.resolve(),
          ownerEmail
            ? sendEmail(ownerEmail, "🚗 Nouvelle réservation — Bordeaux Privilège", bookingOwnerHtml(data), env)
            : Promise.resolve(),
          data.clientPhone ? sendSMS(normalizePhone(data.clientPhone), clientSmsBody, env) : Promise.resolve(),
          data.clientPhone
            ? sendWhatsApp(normalizePhone(data.clientPhone), clientSmsBody, env)
            : Promise.resolve(),
          data.clientPhone
            ? sendEmail(
                data.clientPhone.includes("@") ? data.clientPhone : "",
                "Bordeaux Privilège — Demande reçue ✓",
                bookingClientHtml(data, ownerPhone),
                env,
              )
            : Promise.resolve(),
        ]);

        return withSecurityHeaders(Response.json({ ok: true }));
      } catch (e) {
        console.error("[notify-booking]", e);
        return withSecurityHeaders(
          Response.json({ ok: false, error: String(e) }, { status: 500 }),
        );
      }
    }

    // ── Contact notification ──────────────────────────────────────────────────
    if (request.method === "POST" && url.pathname === "/api/notify-contact") {
      if (!checkRateLimit(clientIp, url.pathname)) {
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
        const ownerEmail = env.OWNER_EMAIL ?? "";

        const ownerSmsBody = [
          "📩 Bordeaux Privilège — Nouveau message",
          `De : ${data.name}`,
          `Email : ${data.email}`,
          data.phone ? `Tél : ${normalizePhone(data.phone)}` : null,
          "---",
          String(data.message).slice(0, 300),
        ]
          .filter(Boolean)
          .join("\n");

        const clientSmsBody = [
          "Bordeaux Privilège — Message reçu ✓",
          `Bonjour ${data.name}, votre message a bien été transmis.`,
          "Nous vous répondons sous 24h.",
          ownerPhone ? `Contact direct : ${ownerPhone}` : null,
        ]
          .filter(Boolean)
          .join("\n");

        await Promise.allSettled([
          ownerPhone ? sendSMS(ownerPhone, ownerSmsBody, env) : Promise.resolve(),
          ownerPhone ? sendWhatsApp(ownerPhone, ownerSmsBody, env) : Promise.resolve(),
          ownerEmail
            ? sendEmail(ownerEmail, "📩 Nouveau message — Bordeaux Privilège", contactOwnerHtml(data), env)
            : Promise.resolve(),
          data.phone ? sendSMS(normalizePhone(data.phone), clientSmsBody, env) : Promise.resolve(),
          data.phone ? sendWhatsApp(normalizePhone(data.phone), clientSmsBody, env) : Promise.resolve(),
          data.email
            ? sendEmail(
                data.email,
                "Bordeaux Privilège — Message reçu ✓",
                contactClientHtml(data.name, ownerPhone),
                env,
              )
            : Promise.resolve(),
        ]);

        return withSecurityHeaders(Response.json({ ok: true }));
      } catch (e) {
        console.error("[notify-contact]", e);
        return withSecurityHeaders(
          Response.json({ ok: false, error: String(e) }, { status: 500 }),
        );
      }
    }

    // ── WhatsApp auto-reply webhook ───────────────────────────────────────────
    if (request.method === "POST" && url.pathname === "/api/whatsapp-webhook") {
      if (!checkRateLimit(clientIp, url.pathname)) {
        return withSecurityHeaders(
          new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
            headers: { "Content-Type": "text/xml" },
          }),
        );
      }
      try {
        const body = await request.text();
        const params = new URLSearchParams(body);
        const from = params.get("From") ?? "";
        const messageBody = params.get("Body") ?? "";
        const ownerPhone = env.OWNER_PHONE_NUMBER ?? "";

        const autoReply = [
          "Bonjour ! Bordeaux Privilège 🚗",
          "Merci pour votre message. Notre chauffeur vous répond dans les plus brefs délais.",
          "",
          `📞 Appel direct : ${ownerPhone}`,
          "🌐 Réservation en ligne : https://bordeaux-privilege.fr/reservation",
        ].join("\n");

        if (ownerPhone && from) {
          const fwd = `📲 WhatsApp de ${from} :\n"${messageBody.slice(0, 300)}"`;
          ctx.waitUntil(
            sendWhatsApp(ownerPhone, fwd, env).catch((e) =>
              console.error("[WA fwd]", e),
            ),
          );
        }

        const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escHtml(autoReply)}</Message></Response>`;
        return withSecurityHeaders(
          new Response(twiml, { headers: { "Content-Type": "text/xml" } }),
        );
      } catch (e) {
        console.error("[whatsapp-webhook]", e);
        return withSecurityHeaders(
          new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
            headers: { "Content-Type": "text/xml" },
          }),
        );
      }
    }

    // ── Claude chatbot ────────────────────────────────────────────────────────
    if (request.method === "POST" && url.pathname === "/api/chat") {
      if (!checkRateLimit(clientIp, url.pathname)) {
        return withSecurityHeaders(
          Response.json({ error: "Trop de demandes, réessayez dans un instant." }, { status: 429 }),
        );
      }
      try {
        const { messages } = (await request.json()) as {
          messages: { role: string; content: string }[];
        };
        const apiKey = env.ANTHROPIC_API_KEY;
        if (!apiKey) {
          return withSecurityHeaders(
            Response.json({ error: "Service IA non configuré." }, { status: 500 }),
          );
        }

        const claudeResp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": apiKey,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1024,
            system: CHAT_SYSTEM_PROMPT,
            messages: messages
              .filter((m) => m.role === "user" || m.role === "assistant")
              .slice(-20), // keep last 20 turns to limit token usage
            stream: true,
          }),
        });

        if (!claudeResp.ok) {
          const status = claudeResp.status;
          const msg =
            status === 429
              ? "Trop de demandes, réessayez dans un instant."
              : "Erreur du service IA.";
          return withSecurityHeaders(Response.json({ error: msg }, { status }));
        }

        // Transform Anthropic SSE → OpenAI-compatible SSE (Chatbot.tsx stays unchanged)
        const stream = new ReadableStream({
          async start(controller) {
            const reader = claudeResp.body!.getReader();
            const dec = new TextDecoder();
            const enc = new TextEncoder();
            let buf = "";
            try {
              for (;;) {
                const { done, value } = await reader.read();
                if (done) break;
                buf += dec.decode(value, { stream: true });
                let nl: number;
                while ((nl = buf.indexOf("\n")) !== -1) {
                  let line = buf.slice(0, nl);
                  buf = buf.slice(nl + 1);
                  if (line.endsWith("\r")) line = line.slice(0, -1);
                  if (!line.startsWith("data: ")) continue;
                  const data = line.slice(6).trim();
                  try {
                    const parsed = JSON.parse(data);
                    if (
                      parsed.type === "content_block_delta" &&
                      parsed.delta?.type === "text_delta"
                    ) {
                      const chunk = JSON.stringify({
                        choices: [{ delta: { content: parsed.delta.text } }],
                      });
                      controller.enqueue(enc.encode(`data: ${chunk}\n\n`));
                    } else if (parsed.type === "message_stop") {
                      controller.enqueue(enc.encode("data: [DONE]\n\n"));
                    }
                  } catch {
                    /* skip malformed lines */
                  }
                }
              }
            } finally {
              controller.close();
            }
          },
        });

        return withSecurityHeaders(
          new Response(stream, {
            headers: {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
            },
          }),
        );
      } catch (e) {
        console.error("[chat]", e);
        return withSecurityHeaders(
          Response.json({ error: "Erreur interne." }, { status: 500 }),
        );
      }
    }

    // ── TanStack Start SSR ────────────────────────────────────────────────────
    const response = await startHandler(request, env, ctx);
    return withSecurityHeaders(response);
  },
};
