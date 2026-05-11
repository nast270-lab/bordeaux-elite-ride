import { createAPIFileRoute } from "@tanstack/react-start/api";
import { sendSMS, normalizePhone } from "@/lib/twilio";

type BookingPayload = {
  type: "booking";
  from: string;
  to: string;
  date?: string;
  pax: number;
  estimate?: number | null;
  clientPhone?: string;
};

type ContactPayload = {
  type: "contact";
  name: string;
  email: string;
  phone?: string;
  message: string;
};

type Payload = BookingPayload | ContactPayload;

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

export const APIRoute = createAPIFileRoute("/api/notify")({
  POST: async ({ request }) => {
    try {
      const data = (await request.json()) as Payload;
      const ownerPhone = process.env.OWNER_PHONE_NUMBER ?? "";

      if (!ownerPhone) {
        console.warn("[notify] OWNER_PHONE_NUMBER non configuré.");
      }

      // ── RÉSERVATION ─────────────────────────────────────────────────────────
      if (data.type === "booking") {
        const { from, to, date, pax, estimate, clientPhone } = data;

        if (!from || !to) {
          return json({ ok: false, error: "Départ et destination requis." }, 400);
        }

        // Option E — SMS chauffeur
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

        // Option A — SMS client (si numéro fourni)
        if (clientPhone) {
          const normalized = normalizePhone(clientPhone);
          const clientSms = [
            "Bordeaux Privilège — Demande reçue ✓",
            `Trajet ${from} → ${to} bien transmis.`,
            "Votre chauffeur vous contacte sous 30 min.",
            ownerPhone ? `Contact direct : ${ownerPhone}` : null,
          ]
            .filter(Boolean)
            .join("\n");
          await sendSMS(normalized, clientSms);
        }
      }

      // ── CONTACT ──────────────────────────────────────────────────────────────
      if (data.type === "contact") {
        const { name, email, phone, message } = data;

        if (!name || !email || !message) {
          return json({ ok: false, error: "Champs requis manquants." }, 400);
        }

        // Option E — SMS chauffeur
        const ownerSms = [
          "📩 Bordeaux Privilège — Nouveau message",
          `De : ${name}`,
          `Email : ${email}`,
          phone ? `Tél : ${normalizePhone(phone)}` : null,
          `---`,
          message.slice(0, 300),
        ]
          .filter(Boolean)
          .join("\n");

        if (ownerPhone) await sendSMS(ownerPhone, ownerSms);

        // Option A — SMS client (si numéro fourni)
        if (phone) {
          const normalized = normalizePhone(phone);
          const clientSms = [
            "Bordeaux Privilège — Message reçu ✓",
            `Bonjour ${name}, votre message a bien été transmis.`,
            "Nous vous répondons sous 24h.",
            ownerPhone ? `Contact direct : ${ownerPhone}` : null,
          ]
            .filter(Boolean)
            .join("\n");
          await sendSMS(normalized, clientSms);
        }
      }

      return json({ ok: true });
    } catch (err) {
      console.error("[/api/notify]", err);
      return json({ ok: false, error: "Erreur lors de l'envoi du SMS." }, 500);
    }
  },
});

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}
