interface Env {
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_SENDER_ID?: string;
  OWNER_PHONE_NUMBER?: string;
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

    return Response.json({ ok: true });
  } catch (e) {
    console.error("[notify-booking]", e);
    return Response.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
