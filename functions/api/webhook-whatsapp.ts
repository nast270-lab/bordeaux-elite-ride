interface Env {
  SITE_URL?: string;
}

function xmlEscape(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function twimlResponse(message: string): Response {
  const xml = `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${xmlEscape(message)}</Message></Response>`;
  return new Response(xml, {
    headers: { "Content-Type": "text/xml; charset=utf-8" },
  });
}

export async function onRequestPost(context: {
  request: Request;
  env: Env;
}): Promise<Response> {
  const formData = await context.request.formData();
  const rawBody = (formData.get("Body") as string | null) ?? "";
  const body = rawBody.toLowerCase().trim();
  const siteUrl = (context.env.SITE_URL ?? "https://bordeaux-elite-ride.pages.dev").replace(/\/$/, "");

  if (
    body === "" ||
    body === "menu" ||
    body.includes("bonjour") ||
    body.includes("hello") ||
    body.includes("salut") ||
    body.includes("bonsoir")
  ) {
    return twimlResponse(
      "👋 Bienvenue chez Bordeaux Privilège !\n\nQue souhaitez-vous faire ?\n1️⃣ Réserver une course\n2️⃣ Voir les tarifs\n3️⃣ Contacter un conseiller"
    );
  }

  if (
    body === "1" ||
    body.includes("réserver") ||
    body.includes("reserver") ||
    body.includes("réservation") ||
    body.includes("reservation") ||
    body.includes("book")
  ) {
    return twimlResponse(
      `🚗 Pour réserver votre course, rendez-vous sur :\n${siteUrl}/reservation\n\nOu envoyez-nous directement :\n- Votre adresse de départ\n- Votre destination\n- La date et l'heure\n- Le nombre de passagers`
    );
  }

  if (
    body === "2" ||
    body.includes("tarif") ||
    body.includes("prix") ||
    body.includes("combien") ||
    body.includes("coût") ||
    body.includes("cout")
  ) {
    return twimlResponse(
      `💰 Nos tarifs indicatifs :\n\n✈️ Aéroport Mérignac : à partir de 45 €\n🌊 Bordeaux → Arcachon : à partir de 95 €\n🏰 Bordeaux → Saint-Émilion : à partir de 110 €\n🛣️ Longue distance : sur devis\n🎉 Événement privé : sur devis\n\nTarifs complets : ${siteUrl}/tarifs\n\nTapez 1 pour réserver.`
    );
  }

  if (
    body === "3" ||
    body.includes("contact") ||
    body.includes("appel") ||
    body.includes("telephone") ||
    body.includes("téléphone") ||
    body.includes("humain") ||
    body.includes("conseiller")
  ) {
    return twimlResponse(
      `📞 Contactez-nous :\n\n📱 Tel / WhatsApp : +33 6 44 69 10 32\n📧 Email : contact@bordeaux-privilege.fr\n🌐 Site : ${siteUrl}\n\nDisponible 24h/24, 7j/7.`
    );
  }

  return twimlResponse(
    "Je n'ai pas compris votre message 😊\n\nTapez :\n1️⃣ pour réserver\n2️⃣ pour les tarifs\n3️⃣ pour nous contacter"
  );
}
