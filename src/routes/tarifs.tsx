import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs VTC Bordeaux — Bordeaux Privilège" },
      { name: "description", content: "Tarifs fixes et transparents de notre service de chauffeur privé à Bordeaux. Aéroport, gare, excursions." },
    ],
  }),
  component: PricingPage,
});

const prices = [
  { route: "Bordeaux Centre → Aéroport Mérignac", price: 45, time: "20 min" },
  { route: "Bordeaux Centre → Gare Saint-Jean", price: 20, time: "10 min" },
  { route: "Bordeaux → Arcachon", price: 90, time: "1h00" },
  { route: "Bordeaux → Cap Ferret", price: 110, time: "1h15" },
  { route: "Bordeaux → Dune du Pilat", price: 115, time: "1h00" },
  { route: "Bordeaux → Biarritz", price: 380, time: "2h15" },
];

const inclusions = [
  "Prise en charge à l'adresse exacte",
  "Eau minérale offerte à bord",
  "Wi-Fi gratuit",
  "Suivi vol/train en temps réel",
  "Aucun supplément bagages",
  "Annulation gratuite jusqu'à 24h avant",
];

function PricingPage() {
  return (
    <div className="container-luxe py-24 md:py-32">
      <SectionHeading
        eyebrow="Tarifs"
        title="Des prix fixes, sans surprise"
        description="Notre tarification est transparente et garantie. Le prix annoncé lors de la réservation est le prix final, quelles que soient les conditions de circulation."
      />

      <div className="mt-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h3 className="text-2xl mb-8">Tarifs indicatifs</h3>
          <div className="border border-border">
            {prices.map((p, i) => (
              <div
                key={p.route}
                className={`flex items-center justify-between p-6 hover:bg-card transition-colors ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <div>
                  <div className="text-base mb-1">{p.route}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">durée moyenne {p.time}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">à partir de</div>
                  <div className="text-2xl font-display text-gold">{p.price} €</div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground italic">
            * Tarifs indicatifs pour 1 à 3 passagers en berline. Suppléments possibles : SUV, Van, course de nuit (22h-6h), jours fériés. Devis personnalisé sur demande.
          </p>
        </div>

        <aside className="bg-card border border-border p-8 h-fit lg:sticky lg:top-28">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Toujours inclus</div>
          <h3 className="text-2xl mb-6">L'expérience complète</h3>
          <ul className="space-y-3 mb-8">
            {inclusions.map((inc) => (
              <li key={inc} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                {inc}
              </li>
            ))}
          </ul>
          <Link to="/reservation" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-gold-foreground text-xs uppercase tracking-[0.2em] w-full justify-center">
            Réserver <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
