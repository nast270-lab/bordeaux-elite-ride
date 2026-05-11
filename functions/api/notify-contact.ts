interface Env {
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_SENDER_ID?: string;
  TWILIO_WHATSAPP_NUMBER?: string;
  OWNER_PHONE_NUMBER?: string;
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/[\s\-.()]/g, "");
  if (/^0[67]\d{8}$/.test(digits)) return "+33" + digits.slice(1);
  if (/^\+33[67]\d{8}$/.test(digits)) return digits;
  return digits;
}

function toWhatsApp(phone: string): string {
  if (phone.startsWith("whatsapp:")) return phone;
  return "whatsapp:" + normalizePhone(phone);
}

async function sendMessage(to: string, body: string, env: Env): Promise<void> {
  const sid = env.TWILIO_ACCOUNT_SID;
  const token = env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) {
    console.warn("[Twilio] Variables manquantes — message non envoyé");
    return;
  }

  const isWhatsApp = to.startsWith("whatsapp:");
  if (isWhatsApp && !env.TWILIO_WHATSAPP_NUMBER) {
    console.warn("[Twilio] TWILIO_WHATSAPP_NUMBER manquant — message WhatsApp ignoré");
    return;
  }

  const from = isWhatsApp
    ? env.TWILIO_WHATSAPP_NUMBER!
    : (env.TWILIO_SENDER_ID ?? "BdxPrivil");

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
    const useWhatsApp = !!env.TWILIO_WHATSAPP_NUMBER;

    const ownerMsg = [
      "📩 Bordeaux Privilège — Nouveau message",
      `👤 De : ${data.name}`,
      `📧 Email : ${data.email}`,
      data.phone ? `📱 Tél : ${normalizePhone(data.phone)}` : null,
      "---",
      String(data.message).slice(0, 300),
    ]
      .filter(Boolean)
      .join("\n");

    if (ownerPhone) {
      const ownerTo = useWhatsApp ? toWhatsApp(ownerPhone) : ownerPhone;
      await sendMessage(ownerTo, ownerMsg, env);
    }

    if (data.phone) {
      const clientTo = useWhatsApp
        ? toWhatsApp(data.phone)
        : normalizePhone(data.phone);

      const clientMsg = [
        "✅ Bordeaux Privilège — Message reçu",
        `Bonjour ${data.name}, votre message a bien été transmis.`,
        "Nous vous répondons sous 24h.",
        ownerPhone ? `Contact direct : ${ownerPhone}` : null,
      ]
        .filter(Boolean)
        .join("\n");

      await sendMessage(clientTo, clientMsg, env);
    }

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[notify-contact]", e);
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
