import { createFileRoute, Link } from "@tanstack/react-router";
import { BookingForm } from "@/components/site/BookingForm";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Plane, Train, Briefcase, Clock, Map as MapIcon, Wine,
  ShieldCheck, BadgeCheck, Star, Phone, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bordeaux Privilège — Chauffeur privé VTC à Bordeaux" },
      { name: "description", content: "Chauffeur privé à Bordeaux pour particuliers et professionnels. Transferts aéroport, gare, déplacements affaires. Prix fixes, 24h/24." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Plane, title: "Transferts aéroport", desc: "Bordeaux-Mérignac, suivi des vols en temps réel." },
  { icon: Train, title: "Transferts gare", desc: "Gare Saint-Jean et toutes gares de la région." },
  { icon: Briefcase, title: "Déplacements professionnels", desc: "Discrétion et ponctualité pour vos rendez-vous." },
  { icon: Clock, title: "Mise à disposition", desc: "Chauffeur dédié à l'heure ou à la journée." },
  { icon: MapIcon, title: "Longue distance", desc: "France et Europe sur simple demande." },
  { icon: Wine, title: "Excursions œnotouristiques", desc: "Saint-Émilion, Médoc, Arcachon, Cap Ferret." },
];

const reasons = [
  { icon: BadgeCheck, title: "Prix fixes garantis", desc: "Tarif annoncé, tarif appliqué. Aucune surprise." },
  { icon: Clock, title: "Disponible 24/7", desc: "Réservation à toute heure, tous les jours." },
  { icon: ShieldCheck, title: "Chauffeurs qualifiés", desc: "Expérience, sens du service et discrétion." },
  { icon: Briefcase, title: "Compte entreprise", desc: "Facturation mensuelle et reporting détaillé." },
];

const testimonials = [
  { name: "Sophie L.", role: "Directrice marketing", text: "Service irréprochable depuis deux ans. Ponctualité et discrétion exemplaires." },
  { name: "Marc D.", role: "Chef d'entreprise", text: "Mes clients sont toujours impressionnés. Une véritable carte de visite." },
  { name: "Claire B.", role: "Voyageuse", text: "Excursion à Saint-Émilion parfaite. Chauffeur attentionné et professionnel." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-20 pt-32 pb-20 md:pt-40 md:pb-28 bg-pearl border-b border-border">
        <div className="container-luxe">
          <div className="max-w-3xl animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="hairline" />
              <span className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Chauffeur privé · Bordeaux</span>
            </div>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mb-6">
              Le transport privé,<br/>simple et professionnel.
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Service de chauffeur privé à Bordeaux pour particuliers et professionnels.
              Prix fixes, ponctualité, discrétion.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/reservation"
                className="group inline-flex items-center gap-3 px-7 py-3.5 bg-ink text-ink-foreground text-xs uppercase tracking-[0.22em] hover:opacity-90 transition rounded-md"
              >
                Réserver
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="tel:+33600000000"
                className="inline-flex items-center gap-3 px-7 py-3.5 border border-border bg-card hover:border-ink text-xs uppercase tracking-[0.22em] transition rounded-md"
              >
                <Phone className="h-4 w-4" /> Nous appeler
              </a>
            </div>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
              {[
                { k: "24/7", v: "Disponibilité" },
                { k: "Prix fixes", v: "Sans surprise" },
                { k: "+15 ans", v: "Expérience" },
                { k: "4.9/5", v: "Avis clients" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-display">{s.k}</div>
                  <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-1">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section className="container-luxe -mt-12 md:-mt-16 relative z-20">
        <BookingForm />
      </section>

      {/* SERVICES */}
      <section className="container-luxe py-24 md:py-32">
        <SectionHeading
          eyebrow="Nos services"
          title="Une prestation adaptée à chaque trajet"
          description="Particuliers ou professionnels, nous adaptons notre savoir-faire à toutes vos exigences."
        />
        <div className="mt-14 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border rounded-md overflow-hidden">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card p-8 hover:bg-muted/50 transition-colors">
              <Icon className="h-6 w-6 text-ink mb-5" strokeWidth={1.4} />
              <h3 className="text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-card border-y border-border py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Pourquoi nous choisir"
            title="Un service pensé pour la performance"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="border border-border bg-background p-8 rounded-md">
                <Icon className="h-6 w-6 text-ink mb-5" strokeWidth={1.4} />
                <div className="text-base font-medium mb-2">{title}</div>
                <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="container-luxe py-24 md:py-32">
        <SectionHeading
          eyebrow="Tarifs indicatifs"
          title="Des prix transparents et garantis"
          description="Le prix annoncé est le prix payé."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { route: "Bordeaux Centre → Aéroport Mérignac", price: 45 },
            { route: "Bordeaux Centre → Gare Saint-Jean", price: "—" },
            { route: "Bordeaux → Arcachon", price: "—" },
            { route: "Bordeaux → Saint-Émilion", price: "—" },
            { route: "Bordeaux → Cap Ferret", price: "—" },
            { route: "Bordeaux → Médoc", price: "—" },
          ].map((p) => (
            <div key={p.route} className="bg-card border border-border p-7 hover:border-ink/40 transition-colors rounded-md">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-3">Trajet</div>
              <div className="text-base mb-5 leading-snug">{p.route}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground">à partir de</span>
                <span className="text-2xl font-display">
                  {typeof p.price === "number" ? `${p.price} €` : <span className="text-muted-foreground/70">à venir</span>}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/tarifs" className="inline-flex items-center gap-2 text-sm text-ink hover:underline underline-offset-4">
            Voir tous les tarifs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-card border-t border-border py-24 md:py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Avis clients"
            title="Ils nous ont confié leurs trajets"
          />
          <div className="mt-6 flex items-center justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-ink text-ink" />
            ))}
            <span className="ml-3 text-sm text-muted-foreground">4.9/5 — 320 avis</span>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="bg-background border border-border p-7 rounded-md">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-ink text-ink" />)}
                </div>
                <blockquote className="text-base leading-relaxed mb-5">
                  « {t.text} »
                </blockquote>
                <figcaption>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-luxe py-24 md:py-32">
        <div className="bg-ink text-ink-foreground p-12 md:p-20 text-center rounded-md">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-5">
              <span className="hairline bg-ink-foreground" />
              <span className="text-xs uppercase tracking-[0.3em] opacity-70">À votre service</span>
              <span className="hairline bg-ink-foreground" />
            </div>
            <h2 className="text-4xl md:text-5xl mb-5 text-ink-foreground">Prêt à réserver votre trajet ?</h2>
            <p className="opacity-80 mb-10">Réservation en ligne ou par téléphone, 24h/24.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link to="/reservation" className="inline-flex items-center gap-3 px-7 py-3.5 bg-background text-foreground text-xs uppercase tracking-[0.22em] hover:opacity-90 rounded-md">
                Réserver en ligne <ArrowRight className="h-4 w-4" />
              </Link>
              <a href="tel:+33600000000" className="inline-flex items-center gap-3 px-7 py-3.5 border border-ink-foreground/30 text-ink-foreground text-xs uppercase tracking-[0.22em] hover:bg-ink-foreground/10 rounded-md">
                <Phone className="h-4 w-4" /> Nous appeler
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
