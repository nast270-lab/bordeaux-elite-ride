import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import berline from "@/assets/fleet-berline.jpg";
import suv from "@/assets/fleet-suv.jpg";
import van from "@/assets/fleet-van.jpg";
import { Users, Briefcase, Wifi, Snowflake } from "lucide-react";

export const Route = createFileRoute("/flotte")({
  head: () => ({
    meta: [
      { title: "Notre flotte premium — Bordeaux Privilège" },
      { name: "description", content: "Berline, SUV, Van : découvrez notre flotte de véhicules Mercedes haut de gamme. Confort, élégance et discrétion." },
    ],
  }),
  component: FleetPage,
});

const fleet = [
  {
    name: "Berline",
    model: "Mercedes Classe E / Classe S",
    img: berline,
    pax: "1-3 passagers",
    bags: "3 bagages",
    desc: "L'élégance discrète d'une berline d'affaires. Idéale pour vos transferts et déplacements professionnels.",
  },
  {
    name: "SUV",
    model: "Mercedes GLE / Classe V",
    img: suv,
    pax: "1-5 passagers",
    bags: "5 bagages",
    desc: "Plus d'espace et de présence. Parfait pour familles ou trajets nécessitant un confort supérieur.",
  },
  {
    name: "Van",
    model: "Mercedes V-Class",
    img: van,
    pax: "1-7 passagers",
    bags: "7 bagages",
    desc: "L'espace d'une limousine pour groupes. Configuration salon, idéal événements et grandes familles.",
  },
];

const amenities = [
  { icon: Wifi, label: "Wi-Fi gratuit" },
  { icon: Snowflake, label: "Climatisation 4 zones" },
  { icon: Briefcase, label: "Eau & rafraîchissements" },
  { icon: Users, label: "Sièges cuir premium" },
];

function FleetPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Notre flotte"
          title="Des véhicules à la hauteur de vos exigences"
          description="Une flotte exclusivement Mercedes-Benz, récente et entretenue avec soin."
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
