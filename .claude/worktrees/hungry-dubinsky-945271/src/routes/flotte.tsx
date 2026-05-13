import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import suvImg from "@/assets/fleet-suv.jpg";
import { Users, Briefcase, Wifi, Snowflake } from "lucide-react";

export const Route = createFileRoute("/flotte")({
  head: () => ({
    meta: [
      { title: "Notre véhicule — Bordeaux Privilège" },
      { name: "description", content: "SUV hybride : un véhicule récent, soigné et confortable pour vos déplacements professionnels et personnels à Bordeaux." },
    ],
  }),
  component: FleetPage,
});

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
          eyebrow="Notre véhicule"
          title="Un SUV hybride moderne, soigné et confortable"
          description="Aujourd'hui, un seul véhicule pour une qualité de service maîtrisée. Demain, une flotte élargie avec la même exigence."
        />
      </div>

      <div className="container-luxe mt-20">
        <article className="grid gap-12 lg:grid-cols-2 items-center">
          <div className="bg-gradient-to-br from-card to-background p-8">
            <img
              src={suvImg}
              alt="SUV hybride — Bordeaux Privilège"
              className="w-full h-auto object-contain"
              loading="lazy"
              width={1920}
              height={1080}
            />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">SUV hybride</div>
            <h3 className="text-4xl md:text-5xl mb-5">Confort & discrétion</h3>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Un SUV hybride au design contemporain, idéal pour vos déplacements business
              comme pour vos trajets personnels. Habitacle silencieux, sièges enveloppants,
              conduite souple : chaque détail est pensé pour votre confort.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-border">
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Capacité</div>
                <div className="text-xl font-display text-gold">1-4 passagers</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Bagages</div>
                <div className="text-xl font-display text-gold">4 bagages</div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground italic mb-6">
              Véhicule 7 places potentiellement disponible sur demande — nous consulter lors de la réservation.
            </p>
            <ul className="grid grid-cols-2 gap-3">
              {amenities.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Icon className="h-4 w-4 text-gold" /> {label}
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="mt-24 border border-border p-10 md:p-14 bg-card text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Évolution</div>
          <h3 className="text-3xl md:text-4xl mb-4">Une flotte amenée à grandir</h3>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            La structure se développera prochainement avec de nouveaux véhicules et chauffeurs partenaires
            sélectionnés selon nos standards — pour vous offrir toujours plus de disponibilité et de confort.
          </p>
        </div>
      </div>
    </div>
  );
}
