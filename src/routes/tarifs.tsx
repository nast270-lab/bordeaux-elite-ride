import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs chauffeur privé Bordeaux — Bordeaux Privilège" },
      { name: "description", content: "Tarifs fixes et transparents de notre service de chauffeur privé à Bordeaux. Aéroport, gare, excursions." },
    ],
  }),
  component: PricingPage,
});

const prices = [
  { route: "Bordeaux Centre → Gare Saint-Jean", price: 20, time: "10 min" },
  { route: "Bordeaux Centre → Aéroport Mérignac", price: 45, time: "20 min" },
  { route: "Bordeaux → Arcachon", price: 95, time: "1h00" },
  { route: "Bordeaux → Cap Ferret", price: 115, time: "1h15" },
  { route: "Bordeaux → Dune du Pilat", price: 120, time: "1h00" },
  { route: "Bordeaux → Saint-Émilion", price: 110, time: "45 min" },
  { route: "Bordeaux → Biarritz", price: 390, time: "2h15" },
];

// Comparatif tarifaire indicatif (jour, course standard)
const kmComparison = [
  { km: 5, taxi: 14, vtc: 18, ours: 16 },
  { km: 10, taxi: 24, vtc: 28, ours: 25 },
  { km: 20, taxi: 44, vtc: 48, ours: 45 },
  { km: 30, taxi: 64, vtc: 68, ours: 62 },
  { km: 50, taxi: 104, vtc: 108, ours: 95 },
  { km: 80, taxi: 164, vtc: 168, ours: 145 },
  { km: 120, taxi: 244, vtc: 248, ours: 210 },
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
        title="Des prix justes, sans surprise"
        description="Notre tarification est transparente et garantie. Le prix annoncé lors de la réservation est le prix final, quelles que soient les conditions de circulation."
      />

      <div className="mt-20 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h3 className="text-2xl mb-8">Tarifs indicatifs</h3>
          <div className="border border-border rounded-lg overflow-hidden bg-card/40">
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
            * Tarifs indicatifs pour 1 à 4 passagers. Suppléments possibles : van, course de nuit (22h-6h), jours fériés. Devis personnalisé sur demande.
          </p>

          {/* COMPARATIF KM */}
          <div className="mt-16">
            <h3 className="text-2xl mb-3">Comparatif tarif au kilomètre</h3>
            <p className="text-sm text-muted-foreground mb-8 max-w-2xl">
              Sur les courts trajets, notre tarif est comparable à celui d'un taxi. Dès 30 km, nous devenons plus compétitifs que les deux — qualité premium, prix maîtrisé. Tarifs indicatifs en journée, course standard.
            </p>
            <div className="border border-border rounded-lg overflow-hidden bg-card/40">
              <div className="grid grid-cols-4 text-xs uppercase tracking-[0.2em] text-muted-foreground bg-secondary/60">
                <div className="p-4">Distance</div>
                <div className="p-4 text-right">Taxi</div>
                <div className="p-4 text-right">VTC</div>
                <div className="p-4 text-right text-gold">Notre tarif</div>
              </div>
              {kmComparison.map((row, i) => (
                <div
                  key={row.km}
                  className={`grid grid-cols-4 items-center text-sm ${i !== 0 ? "border-t border-border" : ""}`}
                >
                  <div className="p-4 font-medium">{row.km} km</div>
                  <div className="p-4 text-right text-muted-foreground">{row.taxi} €</div>
                  <div className="p-4 text-right text-muted-foreground">{row.vtc} €</div>
                  <div className="p-4 text-right text-gold font-display text-lg">{row.ours} €</div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-muted-foreground italic">
              Comparatif estimatif basé sur les tarifs moyens constatés à Bordeaux. Le prix final dépend du trajet, de l'horaire et du véhicule choisi.
            </p>
          </div>
        </div>

        <aside className="bg-card border border-border rounded-lg p-8 h-fit lg:sticky lg:top-28">
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
          <Link to="/reservation" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-gold-foreground text-xs uppercase tracking-[0.2em] w-full justify-center rounded-md">
            Réserver <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
