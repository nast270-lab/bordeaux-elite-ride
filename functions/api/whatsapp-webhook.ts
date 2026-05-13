interface Env {
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_WHATSAPP_FROM?: string;
  OWNER_PHONE_NUMBER?: string;
}

function escHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

async function sendWhatsApp(to: string, body: string, env: Env): Promise<void> {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  const rawFrom = env.TWILIO_WHATSAPP_FROM;
  if (!sid || !token || !rawFrom) return;
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
  if (!resp.ok) throw new Error(`WA ${resp.status}`);
}

// Cloudflare Pages Function — handles POST /api/whatsapp-webhook
// Configure this URL in Twilio console → WhatsApp Sender → Webhook (A message comes in)
export async function onRequestPost(context: {
  request: Request;
  env: Env;
  waitUntil: (p: Promise<unknown>) => void;
}): Promise<Response> {
  try {
    const body = await context.request.text();
    const params = new URLSearchParams(body);
    const from = params.get("From") ?? "";
    const messageBody = params.get("Body") ?? "";
    const ownerPhone = context.env.OWNER_PHONE_NUMBER ?? "";

    const autoReply = [
      "Bonjour ! Bordeaux Privilège 🚗",
      "Merci pour votre message. Notre chauffeur vous répond dans les plus brefs délais.",
      "",
      `📞 Appel direct : ${ownerPhone}`,
      "🌐 Réservation : https://bordeaux-privilege.fr/reservation",
    ].join("\n");

    // Forward incoming message to owner asynchronously
    if (ownerPhone && from) {
      const fwd = `📲 WhatsApp de ${from} :\n"${messageBody.slice(0, 300)}"`;
      context.waitUntil(
        sendWhatsApp(ownerPhone, fwd, context.env).catch((e) =>
          console.error("[WA fwd]", e),
        ),
      );
    }

    const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escHtml(autoReply)}</Message></Response>`;
    return new Response(twiml, { headers: { "Content-Type": "text/xml" } });
  } catch (e) {
    console.error("[whatsapp-webhook]", e);
    return new Response('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
      headers: { "Content-Type": "text/xml" },
    });
  }
}
