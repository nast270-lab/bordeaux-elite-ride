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
      name: string;
      email: string;
      phone?: string;
      message: string;
    };
    const env = context.env;
    const ownerPhone = env.OWNER_PHONE_NUMBER ?? "";
    const ownerEmail = env.OWNER_EMAIL ?? "";

    const ownerMsg = [
      "📩 Bordeaux Privilège — Nouveau message",
      `De : ${data.name}`,
      `Email : ${data.email}`,
      data.phone ? `Tél : ${normalizePhone(data.phone)}` : null,
      "---",
      String(data.message).slice(0, 300),
    ]
      .filter(Boolean)
      .join("\n");

    const clientMsg = [
      "Bordeaux Privilège — Message reçu ✓",
      `Bonjour ${data.name}, votre message a bien été transmis.`,
      "Nous vous répondons sous 24h.",
      ownerPhone ? `Contact direct : ${ownerPhone}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const ownerEmailHtml = `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#c9a84c;">📩 Nouveau message de contact</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;margin-bottom:16px;">
        <tr><td style="padding:8px 0;color:#666;">Nom</td><td><b>${escHtml(data.name)}</b></td></tr>
        <tr><td style="padding:8px 0;color:#666;">Email</td><td>${escHtml(data.email)}</td></tr>
        ${data.phone ? `<tr><td style="padding:8px 0;color:#666;">Téléphone</td><td>${escHtml(normalizePhone(data.phone))}</td></tr>` : ""}
      </table>
      <div style="background:#f5f5f5;border-left:3px solid #c9a84c;padding:12px 16px;font-size:13px;color:#333;">
        ${escHtml(data.message)}
      </div>
    </body></html>`;

    const clientEmailHtml = `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
      <h2 style="color:#c9a84c;">Message reçu ✓</h2>
      <p>Bonjour ${escHtml(data.name)},</p>
      <p>Votre message a bien été transmis à Bordeaux Privilège. Nous vous répondons sous 24h.</p>
      ${ownerPhone ? `<p>Contact direct : <a href="tel:${escHtml(ownerPhone)}">${escHtml(ownerPhone)}</a></p>` : ""}
    </body></html>`;

    await Promise.allSettled([
      ownerPhone ? sendSMS(ownerPhone, ownerMsg, env) : Promise.resolve(),
      ownerPhone ? sendWhatsApp(ownerPhone, ownerMsg, env) : Promise.resolve(),
      ownerEmail
        ? sendEmail(ownerEmail, "📩 Nouveau message — Bordeaux Privilège", ownerEmailHtml, env)
        : Promise.resolve(),
      data.phone ? sendSMS(normalizePhone(data.phone), clientMsg, env) : Promise.resolve(),
      data.phone ? sendWhatsApp(normalizePhone(data.phone), clientMsg, env) : Promise.resolve(),
      data.email
        ? sendEmail(data.email, "Bordeaux Privilège — Message reçu ✓", clientEmailHtml, env)
        : Promise.resolve(),
    ]);

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[notify-contact]", e);
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
