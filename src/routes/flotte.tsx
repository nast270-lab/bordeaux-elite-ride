import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import lynkco from "@/assets/fleet-lynkco.jpg";
import prius7 from "@/assets/fleet-prius7.jpg";
import yarisCross from "@/assets/fleet-yariscross.jpg";
import { Users, Briefcase, Wifi, Snowflake } from "lucide-react";

export const Route = createFileRoute("/flotte")({
  head: () => ({
    meta: [
      { title: "Notre flotte — Bordeaux Privilège" },
      { name: "description", content: "Lynk & Co, Toyota Prius 7 places, Toyota Yaris Cross : une flotte hybride moderne pensée pour le confort business et professionnel." },
    ],
  }),
  component: FleetPage,
});

const fleet = [
  {
    name: "Lynk & Co",
    model: "Lynk & Co 01 Hybride",
    img: lynkco,
    pax: "1-4 passagers",
    bags: "4 bagages",
    desc: "Un SUV hybride au design épuré et contemporain. Parfait pour vos déplacements business avec un confort silencieux et une conduite souple.",
  },
  {
    name: "Toyota Prius 7 places",
    model: "Toyota Prius+ Hybride",
    img: prius7,
    pax: "1-6 passagers",
    bags: "6 bagages",
    desc: "L'espace et la modularité d'un véhicule 7 places hybride. Idéal pour les groupes, familles et transferts professionnels en équipe.",
  },
  {
    name: "Toyota Yaris Cross",
    model: "Toyota Yaris Cross Hybride",
    img: yarisCross,
    pax: "1-3 passagers",
    bags: "3 bagages",
    desc: "Un crossover compact et confortable, agile en centre-ville. Parfait pour les courses urbaines et les transferts express vers l'aéroport.",
  },
];

const amenities = [
  { icon: Wifi, label: "Wi-Fi à bord" },
  { icon: Snowflake, label: "Climatisation" },
  { icon: Briefcase, label: "Eau & rafraîchissements" },
  { icon: Users, label: "Confort premium" },
];

function FleetPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Notre flotte"
          title="Confort, hybride et discrétion business"
          description="Une flotte récente, hybride et entretenue avec soin, pensée pour vos trajets professionnels et personnels."
        />
      </div>

      <div className="container-luxe mt-20 space-y-24">
        {fleet.map((v, i) => (
          <article
            key={v.name}
            className={`grid gap-12 lg:grid-cols-2 items-center ${i % 2 === 1 ? "lg:[&>div:first-child]:order-2" : ""}`}
          >
            <div className="bg-gradient-to-br from-card to-background p-8">
              <img
                src={v.img}
                alt={`${v.name} — ${v.model}`}
                className="w-full h-auto object-contain"
                loading="lazy"
                width={1280}
                height={800}
              />
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">{v.model}</div>
              <h3 className="text-4xl md:text-5xl mb-5">{v.name}</h3>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">{v.desc}</p>
              <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Capacité</div>
                  <div className="text-xl font-display text-gold">{v.pax}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Bagages</div>
                  <div className="text-xl font-display text-gold">{v.bags}</div>
                </div>
              </div>
              <ul className="grid grid-cols-2 gap-3">
                {amenities.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4 text-gold" /> {label}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
