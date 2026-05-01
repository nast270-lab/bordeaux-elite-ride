import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Plane, Train, Briefcase, Clock, Map as MapIcon, Building2, Heart, Users } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Nos services VTC — Bordeaux Privilège" },
      { name: "description", content: "Transferts aéroport et gare, déplacements professionnels, mise à disposition, comptes entreprises. Tous nos services de chauffeur privé à Bordeaux." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Plane, title: "Transferts aéroport", desc: "Aéroport de Bordeaux-Mérignac et autres aéroports régionaux. Suivi des vols en temps réel, accueil personnalisé en zone d'arrivée avec pancarte nominative.", points: ["Suivi vol temps réel", "Accueil personnalisé", "Bagages assistés"] },
  { icon: Train, title: "Transferts gare", desc: "Gare de Bordeaux Saint-Jean et toutes les gares de Nouvelle-Aquitaine. Ponctualité garantie pour ne jamais manquer votre train.", points: ["Toutes gares SNCF", "Suivi des trains", "Service door-to-door"] },
  { icon: Briefcase, title: "Déplacements professionnels", desc: "Pour vos rendez-vous d'affaires, séminaires ou roadshows. Discrétion totale, véhicules équipés, facturation entreprise.", points: ["Compte entreprise", "Facturation mensuelle", "Wi-Fi à bord"] },
  { icon: Clock, title: "Mise à disposition", desc: "Un chauffeur dédié à l'heure, à la demi-journée ou à la journée complète. Idéal pour vos rendez-vous multiples ou journées chargées.", points: ["À l'heure ou journée", "Chauffeur dédié", "Itinéraire flexible"] },
  { icon: MapIcon, title: "Longue distance", desc: "Trajets longue distance partout en France et en Europe. Confort et sérénité pour vos voyages d'affaires ou privés.", points: ["France & Europe", "Pause sur demande", "Devis personnalisé"] },
  { icon: Building2, title: "Comptes entreprises", desc: "Solution dédiée aux entreprises : facturation mensuelle, interlocuteur unique, suivi des trajets de vos collaborateurs.", points: ["Facturation mensuelle", "Interlocuteur dédié", "Reporting détaillé"] },
  { icon: Users, title: "Roadshows & équipes", desc: "Transport coordonné de vos équipes pour roadshows, séminaires et événements professionnels. Plusieurs véhicules sur demande.", points: ["Multi-véhicules", "Coordination logistique", "Planning sur-mesure"] },
  { icon: Heart, title: "Événements privés", desc: "Cérémonie, gala, soirée. Service confort et discret avec chauffeur en tenue professionnelle.", points: ["Tenue professionnelle", "Service discret", "Devis personnalisé"] },
];

function ServicesPage() {
  return (
    <div className="container-luxe py-24 md:py-32">
      <SectionHeading
        eyebrow="Nos prestations"
        title="Des services pensés pour les plus exigeants"
        description="Chaque trajet est unique. Nous adaptons notre savoir-faire à vos besoins, qu'ils soient professionnels ou personnels."
      />

      <div className="mt-20 grid gap-8 md:grid-cols-2">
        {services.map(({ icon: Icon, title, desc, points }) => (
          <article key={title} className="border border-border p-10 hover:border-gold transition-colors group">
            <div className="flex items-start gap-6">
              <div className="h-14 w-14 border border-gold/40 group-hover:border-gold flex items-center justify-center shrink-0 transition-colors">
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.2} />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl mb-3">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{desc}</p>
                <ul className="space-y-2">
                  {points.map((p) => (
                    <li key={p} className="text-xs uppercase tracking-[0.15em] text-foreground/80 flex items-center gap-3">
                      <span className="h-px w-6 bg-gold" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
