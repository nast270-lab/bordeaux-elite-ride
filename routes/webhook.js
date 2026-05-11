import { Router } from "express";
import twilio from "twilio";

const router = Router();
const { MessagingResponse } = twilio.twiml;

function siteUrl() {
  return (process.env.SITE_URL || "http://localhost:5000").replace(/\/$/, "");
}

router.post("/", (req, res) => {
  const body = String(req.body.Body || "").toLowerCase().trim();
  const twiml = new MessagingResponse();
  const url = siteUrl();

  if (
    body === "" ||
    body === "menu" ||
    body.includes("bonjour") ||
    body.includes("hello") ||
    body.includes("salut") ||
    body.includes("bonsoir")
  ) {
    twiml.message(
      "👋 Bienvenue chez Bordeaux Privilège !\n\n" +
      "Que souhaitez-vous faire ?\n" +
      "1️⃣ Réserver une course\n" +
      "2️⃣ Voir les tarifs\n" +
      "3️⃣ Contacter un conseiller"
    );
  } else if (
    body === "1" ||
    body.includes("réserver") ||
    body.includes("reserver") ||
    body.includes("réservation") ||
    body.includes("reservation")
  ) {
    twiml.message(
      `🚗 Pour réserver, rendez-vous sur :\n${url}/reservation\n\n` +
      "Ou envoyez-nous directement :\n" +
      "- Adresse de départ\n" +
      "- Destination\n" +
      "- Date et heure\n" +
      "- Nombre de passagers"
    );
  } else if (
    body === "2" ||
    body.includes("tarif") ||
    body.includes("prix") ||
    body.includes("combien")
  ) {
    twiml.message(
      "💰 Tarifs indicatifs :\n\n" +
      "🏙️ Trajet urbain : à partir de 15€\n" +
      "✈️ Aéroport Mérignac : à partir de 45€\n" +
      "🌊 Bordeaux → Arcachon : à partir de 95€\n" +
      "🏰 Bordeaux → Saint-Émilion : à partir de 110€\n" +
      "🛣️ Longue distance : sur devis\n" +
      "🎉 Événement privé : sur devis\n\n" +
      "Tapez 1 pour réserver."
    );
  } else if (
    body === "3" ||
    body.includes("contact") ||
    body.includes("appel") ||
    body.includes("conseiller")
  ) {
    const manager = process.env.MANAGER_PHONE || "+33 6 44 69 10 32";
    twiml.message(
      "📞 Nos coordonnées :\n\n" +
      `📱 Tél / WhatsApp : ${manager}\n` +
      "📧 Email : contact@bordeaux-privilege.fr\n" +
      `🌐 Site : ${url}\n\n` +
      "Disponible 24h/24, 7j/7."
    );
  } else {
    twiml.message(
      "Je n'ai pas compris votre message 😊\n\n" +
      "Tapez :\n" +
      "1️⃣ pour réserver\n" +
      "2️⃣ pour les tarifs\n" +
      "3️⃣ pour nous contacter"
    );
  }

  res.type("text/xml").send(twiml.toString());
});

export default router;
