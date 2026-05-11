import { createServerFn } from "@tanstack/react-start/server";
import { sendSMS, normalizePhone } from "@/lib/twilio";

type BookingData = {
  type: "booking";
  from: string;
  to: string;
  date?: string;
  pax: number;
  estimate?: number | null;
  clientPhone?: string;
};

type ContactData = {
  type: "contact";
  name: string;
  email: string;
  phone?: string;
  message: string;
};

type NotifyData = BookingData | ContactData;

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

export const notifyServer = createServerFn({ method: "POST" })
  .validator((data: NotifyData) => data)
  .handler(async ({ data }) => {
    const ownerPhone = process.env.OWNER_PHONE_NUMBER ?? "";

    if (!ownerPhone) {
      console.warn("[notify] OWNER_PHONE_NUMBER non configuré.");
    }

    // ── RÉSERVATION ──────────────────────────────────────────────────────────
    if (data.type === "booking") {
      const { from, to, date, pax, estimate, clientPhone } = data;

      const ownerSms = [
        "🚗 Bordeaux Privilège — Nouvelle réservation",
        `Trajet : ${from} → ${to}`,
        `Date : ${formatDate(date)}`,
        `Passagers : ${pax}`,
        estimate ? `Estimation : ${estimate} €` : null,
        clientPhone ? `Client : ${normalizePhone(clientPhone)}` : "Pas de tél client",
      ]
        .filter(Boolean)
        .join("\n");

      if (ownerPhone) await sendSMS(ownerPhone, ownerSms);

      if (clientPhone) {
        const clientSms = [
          "Bordeaux Privilège — Demande reçue ✓",
          `Trajet ${from} → ${to} bien transmis.`,
          "Votre chauffeur vous contacte sous 30 min.",
          ownerPhone ? `Contact direct : ${ownerPhone}` : null,
        ]
          .filter(Boolean)
          .join("\n");
        await sendSMS(normalizePhone(clientPhone), clientSms);
      }
    }

    // ── CONTACT ──────────────────────────────────────────────────────────────
    if (data.type === "contact") {
      const { name, email, phone, message } = data;

      const ownerSms = [
        "📩 Bordeaux Privilège — Nouveau message",
        `De : ${name}`,
        `Email : ${email}`,
        phone ? `Tél : ${normalizePhone(phone)}` : null,
        "---",
        message.slice(0, 300),
      ]
        .filter(Boolean)
        .join("\n");

      if (ownerPhone) await sendSMS(ownerPhone, ownerSms);

      if (phone) {
        const clientSms = [
          "Bordeaux Privilège — Message reçu ✓",
          `Bonjour ${name}, votre message a bien été transmis.`,
          "Nous vous répondons sous 24h.",
          ownerPhone ? `Contact direct : ${ownerPhone}` : null,
        ]
          .filter(Boolean)
          .join("\n");
        await sendSMS(normalizePhone(phone), clientSms);
      }
    }

    return { ok: true };
  });
