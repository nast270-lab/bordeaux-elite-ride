import { createFileRoute } from "@tanstack/react-router";

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Bordeaux Privilège, un service de chauffeur privé VTC haut de gamme à Bordeaux. Tu aides les visiteurs à :
- préparer une réservation (trajet, date, heure, nombre de passagers, bagages)
- obtenir une estimation tarifaire (Bordeaux ↔ Aéroport Mérignac à partir de 45 €, gare Saint-Jean à partir de 25 €, mise à disposition sur devis)
- répondre aux questions sur le service (ponctualité, discrétion, véhicule SUV hybride confort, 1 à 4 passagers, Wi-Fi, eau)
- orienter vers la page de réservation, le téléphone (+33 6 00 00 00 00) ou WhatsApp si nécessaire

Ton : professionnel, rassurant, premium, concis. Réponds en français, avec des phrases courtes. Ne promets jamais de tarif définitif sans confirmation par téléphone. Pour finaliser une réservation, invite l'utilisateur à utiliser le formulaire de réservation ou à appeler.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }: { request: Request }) => {
        try {
          const { messages } = await request.json();
          const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
          if (!LOVABLE_API_KEY) {
            return new Response(JSON.stringify({ error: "LOVABLE_API_KEY missing" }), { status: 500 });
          }

          const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${LOVABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "google/gemini-3-flash-preview",
              messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
              stream: true,
            }),
          });

          if (!response.ok) {
            if (response.status === 429) {
              return new Response(JSON.stringify({ error: "Trop de demandes, réessayez dans un instant." }), { status: 429 });
            }
            if (response.status === 402) {
              return new Response(JSON.stringify({ error: "Crédits IA épuisés." }), { status: 402 });
            }
            const t = await response.text();
            console.error("AI gateway error:", response.status, t);
            return new Response(JSON.stringify({ error: "Erreur du service IA" }), { status: 500 });
          }

          return new Response(response.body, {
            headers: { "Content-Type": "text/event-stream" },
          });
        } catch (e) {
          console.error("chat error:", e);
          return new Response(JSON.stringify({ error: "Erreur interne" }), { status: 500 });
        }
      },
    },
  },
} as any);
