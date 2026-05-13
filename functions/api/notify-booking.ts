interface Env {
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_SENDER_ID?: string;
  TWILIO_WHATSAPP_FROM?: string;
  OWNER_PHONE_NUMBER?: string;
  OWNER_EMAIL?: string;
  RESEND_API_KEY?: string;
  RESEND_FROM_EMAIL?: string;
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[\s\-.()]/g, "");
  if (/^0[67]\d{8}$/.test(digits)) return "+33" + digits.slice(1);
  if (/^\+33[67]\d{8}$/.test(digits)) return digits;
  return digits;
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

async function sendSMS(to: string, body: string, env: Env): Promise<void> {
  const { TWILIO_ACCOUNT_SID: sid, TWILIO_AUTH_TOKEN: token } = env;
  const from = env.TWILIO_SENDER_ID ?? "BdxPrivil";
  if (!sid || !token) return;
  const resp = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${sid}:${token}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
    },
  );
  if (!resp.ok) throw new Error(`SMS ${resp.status}`);
}

async function sendWhatsApp(to: string, body: string, env: Env): Promise<void> {
  const { TWILIO_ACCOUNT_SID: sid, TWILIO_AUTH_TOKEN: token, TWILIO_WHATSAPP_FROM: rawFrom } = env;
  if (!sid || !token || !rawFrom) return;
  const from = rawFrom.startsWith("whatsapp:") ? rawFrom : `whatsapp:${rawFrom}`;
  const recipient = to.startsWith("whatsapp:") ? to : `whatsapp:${to}`;
  const resp = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${sid}:${token}`),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({ From: from, To: recipient, Body: body }).toString(),
    },
  );
  if (!resp.ok) throw new Error(`WA ${resp.status}`);
}

async function sendEmail(to: string, subject: string, html: string, env: Env): Promise<void> {
  if (!to || !env.RESEND_API_KEY) return;
  const from = env.RESEND_FROM_EMAIL ?? "Bordeaux Privilège <noreply@bordeaux-privilege.fr>";
  const resp = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!resp.ok) throw new Error(`Resend ${resp.status}`);
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  try {
    const data = (await context.request.json()) as {
      from: string;
      to: string;
      date?: string;
      pax: number;
      estimate?: number | null;
      clientPhone?: string;
    };
    const env = context.env;
    const ownerPhone = env.OWNER_PHONE_NUMBER ?? "";
    const ownerEmail = env.OWNER_EMAIL ?? "";

    const ownerMsg = [
      "🚗 Bordeaux Privilège — Nouvelle réservation",
      `Trajet : ${data.from} → ${data.to}`,
      `Date : ${formatDate(data.date)}`,
      `Passagers : ${data.pax}`,
      data.estimate ? `Estimation : ${data.estimate} €` : null,
      data.clientPhone ? `Client : ${normalizePhone(data.clientPhone)}` : "Pas de tél client",
    ]
      .filter(Boolean)
      .join("\n");

    const clientMsg = [
      "Bordeaux Privilège — Demande reçue ✓",
      `Trajet ${data.from} → ${data.to} bien transmis.`,
      "Votre chauffeur vous contacte sous 30 min.",
      ownerPhone ? `Contact : ${ownerPhone}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const ownerEmailHtml = `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#c9a84c;">🚗 Nouvelle réservation</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="padding:8px 0;color:#666;">Trajet</td><td><b>${escHtml(data.from)} → ${escHtml(data.to)}</b></td></tr>
        <tr><td style="padding:8px 0;color:#666;">Date</td><td>${formatDate(data.date)}</td></tr>
        <tr><td style="padding:8px 0;color:#666;">Passagers</td><td>${data.pax}</td></tr>
        ${data.estimate ? `<tr><td style="padding:8px 0;color:#666;">Estimation</td><td style="color:#c9a84c;font-size:18px;">${data.estimate} €</td></tr>` : ""}
        ${data.clientPhone ? `<tr><td style="padding:8px 0;color:#666;">Tél client</td><td>${escHtml(normalizePhone(data.clientPhone ?? ""))}</td></tr>` : ""}
      </table>
    </body></html>`;

    const clientEmailHtml = `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#c9a84c;">Demande reçue ✓</h2>
      <p>Votre demande pour le trajet <b>${escHtml(data.from)} → ${escHtml(data.to)}</b> a bien été reçue.</p>
      <p>Notre chauffeur vous contacte sous 30 minutes.</p>
      ${ownerPhone ? `<p>Contact direct : <a href="tel:${escHtml(ownerPhone)}">${escHtml(ownerPhone)}</a></p>` : ""}
    </body></html>`;

    await Promise.allSettled([
      ownerPhone ? sendSMS(ownerPhone, ownerMsg, env) : Promise.resolve(),
      ownerPhone ? sendWhatsApp(ownerPhone, ownerMsg, env) : Promise.resolve(),
      ownerEmail
        ? sendEmail(ownerEmail, "🚗 Nouvelle réservation — Bordeaux Privilège", ownerEmailHtml, env)
        : Promise.resolve(),
      data.clientPhone ? sendSMS(normalizePhone(data.clientPhone), clientMsg, env) : Promise.resolve(),
      data.clientPhone ? sendWhatsApp(normalizePhone(data.clientPhone), clientMsg, env) : Promise.resolve(),
    ]);

    // Client confirmation email (if a booking form email field exists in future)
    if (data.clientPhone && data.clientPhone.includes("@")) {
      await sendEmail(
        data.clientPhone,
        "Bordeaux Privilège — Demande reçue ✓",
        clientEmailHtml,
        env,
      ).catch((e) => console.error("[email client]", e));
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[notify-booking]", e);
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
