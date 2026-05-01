import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Users, Briefcase, Wifi, Snowflake, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/flotte")({
  head: () => ({
    meta: [
      { title: "Nos véhicules — Bordeaux Privilège" },
      { name: "description", content: "Berline, SUV, Van : découvrez notre flotte premium." },
    ],
  }),
  component: FleetPage,
});

const fleet = [
  {
    name: "Berline",
    model: "Classe affaires",
    pax: "1-3 passagers",
    bags: "3 bagages",
    desc: "L'élégance discrète d'une berline d'affaires. Idéale pour vos transferts et déplacements professionnels.",
  },
  {
    name: "SUV",
    model: "Premium",
    pax: "1-5 passagers",
    bags: "5 bagages",
    desc: "Plus d'espace et de présence. Parfait pour familles ou trajets nécessitant un confort supérieur.",
  },
  {
    name: "Van",
    model: "Grande capacité",
    pax: "1-7 passagers",
    bags: "7 bagages",
    desc: "L'espace d'un salon pour groupes. Idéal événements et grandes familles.",
  },
];

const amenities = [
  { icon: Wifi, label: "Wi-Fi gratuit" },
  { icon: Snowflake, label: "Climatisation" },
  { icon: Briefcase, label: "Eau & rafraîchissements" },
  { icon: Users, label: "Sièges cuir premium" },
];

function FleetPage() {
  return (
    <div className="py-24 md:py-32">
      <div className="container-luxe">
        <SectionHeading
          eyebrow="Nos véhicules"
          title="Une flotte récente et entretenue"
          description="Des véhicules adaptés à tous vos besoins, des trajets individuels aux groupes."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {fleet.map((v) => (
            <article key={v.name} className="bg-card border border-border p-8 rounded-md hover:border-ink/40 transition-colors">
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">{v.model}</div>
              <h3 className="text-3xl mb-4">{v.name}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{v.desc}</p>
              <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-border">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Capacité</div>
                  <div className="text-base font-medium">{v.pax}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Bagages</div>
                  <div className="text-base font-medium">{v.bags}</div>
                </div>
              </div>
              <ul className="space-y-2">
                {amenities.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Icon className="h-4 w-4" /> {label}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-16 bg-muted/40 border border-border rounded-md p-8 md:p-12 text-center">
          <p className="text-sm text-muted-foreground mb-5 max-w-xl mx-auto">
            Photos de nos véhicules à venir prochainement. Contactez-nous pour toute demande spécifique.
          </p>
          <Link to="/reservation" className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-ink-foreground text-xs uppercase tracking-[0.22em] rounded-md">
            Réserver <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
