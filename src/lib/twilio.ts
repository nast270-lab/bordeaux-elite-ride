/** Normalise un numéro français saisi librement vers le format E.164.
 *  "06 44 69 10 32" → "+33644691032"
 *  "+33644691032"  → "+33644691032" (inchangé)
 */
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/[\s\-\.()]/g, "");
  if (/^0[67]\d{8}$/.test(digits)) return "+33" + digits.slice(1);
  if (/^\+33[67]\d{8}$/.test(digits)) return digits;
  return digits; // on renvoie tel quel si format inconnu
}

/** Envoie un SMS via l'API REST Twilio (sans SDK, compatible Cloudflare Workers). */
export async function sendSMS(to: string, body: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_SENDER_ID ?? "BdxPrivil";

  if (!sid || !token) {
    console.warn("[Twilio] Variables manquantes — SMS non envoyé.");
    return;
  }

  const url = `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`;
  const auth = "Basic " + btoa(`${sid}:${token}`);

  console.log(`[Twilio] Envoi SMS → ${to}`);

  const resp = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ From: from, To: to, Body: body }).toString(),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    console.error(`[Twilio] Erreur ${resp.status}:`, err);
    throw new Error(`Twilio ${resp.status}`);
  }

  const result = (await resp.json()) as { sid?: string };
  console.log(`[Twilio] SMS envoyé — SID: ${result.sid}`);
}
