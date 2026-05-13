import twilio from "twilio";

const sid = process.env.TWILIO_ACCOUNT_SID;
const token = process.env.TWILIO_AUTH_TOKEN;

let _client = null;
function client() {
  if (_client) return _client;
  if (!sid || !token) {
    console.warn("[Twilio] Identifiants manquants — messages désactivés.");
    return null;
  }
  _client = twilio(sid, token);
  return _client;
}

export function normalizePhone(raw) {
  const digits = String(raw).replace(/[\s\-.()]/g, "");
  if (/^0[67]\d{8}$/.test(digits)) return "+33" + digits.slice(1);
  if (/^\+\d{8,15}$/.test(digits)) return digits;
  return digits;
}

export function toWhatsApp(phone) {
  if (!phone) return null;
  if (phone.startsWith("whatsapp:")) return phone;
  return "whatsapp:" + normalizePhone(phone);
}

export async function sendWhatsApp(to, body) {
  const c = client();
  if (!c) return null;
  const from = process.env.TWILIO_WHATSAPP_NUMBER;
  if (!from) {
    console.warn("[Twilio] TWILIO_WHATSAPP_NUMBER manquant.");
    return null;
  }
  try {
    const msg = await c.messages.create({ from, to: toWhatsApp(to), body });
    console.log(`[Twilio] WhatsApp envoyé → ${to} (SID ${msg.sid})`);
    return msg;
  } catch (err) {
    console.error(`[Twilio] Échec WhatsApp → ${to}:`, err.message);
    throw err;
  }
}
