import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Check, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: "Tarifs — Bordeaux Privilège" },
      { name: "description", content: "Tarifs fixes et transparents de notre service de chauffeur privé à Bordeaux." },
    ],
  }),
  component: PricingPage,
});

const prices: { route: string; price: number | null; time?: string }[] = [
  { route: "Bordeaux Centre → Aéroport Mérignac", price: 45, time: "20 min" },
  { route: "Bordeaux Centre → Gare Saint-Jean", price: null },
  { route: "Bordeaux → Arcachon", price: null },
  { route: "Bordeaux → Saint-Émilion", price: null },
  { route: "Bordeaux → Cap Ferret", price: null },
  { route: "Bordeaux → Médoc", price: null },
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
        description="Notre tarification est transparente. Le prix annoncé lors de la réservation est le prix final."
      />

      <div className="mt-16 grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <h3 className="text-xl mb-6">Tarifs indicatifs</h3>
          <div className="bg-card border border-border rounded-md overflow-hidden">
            {prices.map((p, i) => (
              <div
                key={p.route}
                className={`flex items-center justify-between p-6 hover:bg-muted/40 transition-colors ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <div>
                  <div className="text-base mb-1">{p.route}</div>
                  {p.time && (
                    <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">durée moyenne {p.time}</div>
                  )}
                </div>
                <div className="text-right">
                  {p.price !== null ? (
                    <>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">à partir de</div>
                      <div className="text-2xl font-display">{p.price} €</div>
                    </>
                  ) : (
                    <div className="text-sm text-muted-foreground italic">à venir</div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            * Tarifs indicatifs pour 1 à 3 passagers en berline. Suppléments possibles : SUV, Van, course de nuit (22h-6h), jours fériés. Devis personnalisé sur demande.
          </p>
        </div>

        <aside className="bg-card border border-border p-8 h-fit lg:sticky lg:top-28 rounded-md">
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">Toujours inclus</div>
          <h3 className="text-2xl mb-6">L'expérience complète</h3>
          <ul className="space-y-3 mb-8">
            {inclusions.map((inc) => (
              <li key={inc} className="flex gap-3 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-ink shrink-0 mt-0.5" />
                {inc}
              </li>
            ))}
          </ul>
          <Link to="/reservation" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-ink-foreground text-xs uppercase tracking-[0.2em] w-full justify-center rounded-md">
            Réserver <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
