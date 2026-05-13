import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Plane, Train, Briefcase, Map as MapIcon, Heart } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Nos services de chauffeur privé — Bordeaux Privilège" },
      { name: "description", content: "Transferts aéroport et gare, trajets professionnels, longue distance, événements privés. Tous les services d'un chauffeur privé indépendant à Bordeaux." },
      { property: "og:url", content: "https://bordeaux-privilege.fr/services" },
    ],
    links: [{ rel: "canonical", href: "https://bordeaux-privilege.fr/services" }],
  }),
  component: ServicesPage,
});

const services = [
  { icon: Plane, title: "Transferts aéroport", desc: "Aéroport de Bordeaux-Mérignac et autres aéroports régionaux. Suivi des vols en temps réel, accueil personnalisé en zone d'arrivée avec pancarte nominative.", points: ["Suivi vol temps réel", "Accueil personnalisé", "Bagages assistés"] },
  { icon: Train, title: "Transferts gare", desc: "Gare de Bordeaux Saint-Jean et toutes les gares de Nouvelle-Aquitaine. Ponctualité garantie pour ne jamais manquer votre train.", points: ["Toutes gares SNCF", "Suivi des trains", "Service door-to-door"] },
  { icon: Briefcase, title: "Trajets professionnels", desc: "Pour vos rendez-vous d'affaires, séminaires ou déplacements ponctuels. Discrétion totale, véhicule équipé, facture sur demande.", points: ["Facture sur demande", "Discrétion absolue", "Wi-Fi à bord"] },
  { icon: MapIcon, title: "Longue distance", desc: "Trajets longue distance partout en France et en Europe. Confort et sérénité pour vos voyages d'affaires ou privés.", points: ["France & Europe", "Pause sur demande", "Devis personnalisé"] },
  { icon: Heart, title: "Événements privés", desc: "Cérémonie, gala, soirée. Service confort et discret avec chauffeur en tenue professionnelle.", points: ["Tenue professionnelle", "Service discret", "Devis personnalisé"] },
];

function ServicesPage() {
  return (
    <div className="container-luxe py-24 md:py-32">
      <SectionHeading
        eyebrow="Nos prestations"
        title="Des services pensés pour les plus exigeants"
        description="Chaque trajet est unique. Particulier ou professionnel, votre déplacement est traité avec la même rigueur."
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
