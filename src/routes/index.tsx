import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-bordeaux.jpg";
import { BookingForm } from "@/components/site/BookingForm";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Plane, Train, Briefcase, Clock, Map as MapIcon, Building2,
  ShieldCheck, BadgeCheck, Star, Sparkles, Phone, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bordeaux Privilège — Chauffeur privé VTC à Bordeaux & Nouvelle-Aquitaine" },
      { name: "description", content: "Votre chauffeur privé à Bordeaux. Transferts aéroport, gare, déplacements professionnels. Prix fixes, 24h/24, véhicules hybrides confort." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Plane, title: "Transferts aéroport", desc: "Bordeaux-Mérignac, suivi des vols en temps réel." },
  { icon: Train, title: "Transferts gare", desc: "Gare Saint-Jean et toutes gares de la région." },
  { icon: Briefcase, title: "Déplacements professionnels", desc: "Discrétion absolue pour vos rendez-vous d'affaires." },
  { icon: Clock, title: "Mise à disposition", desc: "Chauffeur dédié à l'heure ou à la journée." },
  { icon: MapIcon, title: "Longue distance", desc: "France et Europe sur simple demande." },
  { icon: Building2, title: "Comptes entreprises", desc: "Facturation mensuelle, suivi dédié, équipes." },
];

const reasons = [
  { icon: BadgeCheck, title: "Prix fixes garantis", desc: "Tarif annoncé, tarif appliqué. Aucune surprise." },
  { icon: Clock, title: "Disponible 24/7", desc: "Réservation à toute heure, tous les jours de l'année." },
  { icon: ShieldCheck, title: "Chauffeurs professionnels", desc: "Formation rigoureuse, expérience et sens du service." },
  { icon: Sparkles, title: "Véhicules hybrides", desc: "Flotte récente, confortable, entretien irréprochable." },
  { icon: Plane, title: "Suivi vols & trains", desc: "Adaptation en temps réel à vos horaires." },
  { icon: ShieldCheck, title: "Paiement sécurisé", desc: "CB, virement, espèces. Facture professionnelle." },
];

const testimonials = [
  { name: "Sophie L.", role: "Directrice marketing", text: "Service irréprochable depuis deux ans. Ponctualité et discrétion exemplaires." },
  { name: "Marc D.", role: "Chef d'entreprise", text: "Mes clients sont toujours impressionnés. Une véritable carte de visite." },
  { name: "Claire B.", role: "Voyageuse d'affaires", text: "Réservation simple, chauffeur ponctuel, véhicule impeccable. Je recommande." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative -mt-20 min-h-[100vh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Vue de Bordeaux à l'heure bleue"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0 bg-gradient-dark" />
        <div className="absolute inset-0 bg-background/30" />

        <div className="container-luxe relative z-10 pt-32 pb-20">
          <div className="max-w-3xl animate-fade-up">
            <div className="flex items-center gap-3 mb-6">
              <span className="gold-divider" />
              <span className="text-xs uppercase tracking-[0.4em] text-gold">Chauffeur privé business</span>
            </div>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mb-6">
              Votre chauffeur privé à <span className="text-gradient-gold italic">Bordeaux</span> & en Nouvelle-Aquitaine
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Transport confort, ponctualité absolue, discrétion business.
              Une expérience pensée pour les professionnels et les voyageurs exigeants.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/reservation"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gold text-gold-foreground text-xs uppercase tracking-[0.25em] hover:opacity-90 transition"
              >
                Réserver maintenant
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 border border-border hover:border-gold text-xs uppercase tracking-[0.25em] transition"
              >
                Obtenir un devis
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent animate-shimmer" />
        </div>
      </section>

      {/* BOOKING */}
      <section className="container-luxe -mt-24 relative z-20">
        <BookingForm />
      </section>

      {/* SERVICES */}
      <section className="container-luxe py-32">
        <SectionHeading
          eyebrow="Nos services"
          title="Une prestation sur-mesure pour chaque trajet"
          description="Particuliers ou professionnels, nous adaptons notre savoir-faire à toutes vos exigences."
        />
        <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 border border-border">
          {services.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-background p-10 group hover:bg-card transition-colors">
              <Icon className="h-8 w-8 text-gold mb-6" strokeWidth={1.2} />
              <h3 className="text-xl mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-card py-32">
        <div className="container-luxe">
          <SectionHeading
            eyebrow="Pourquoi nous choisir"
            title="L'excellence comme standard, le confort comme signature"
          />
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex gap-5 border border-border p-8 bg-background hover:border-gold transition-colors">
                <Icon className="h-7 w-7 text-gold shrink-0 mt-1" strokeWidth={1.3} />
                <div>
                  <div className="text-base font-medium mb-2">{title}</div>
                  <div className="text-sm text-muted-foreground leading-relaxed">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="container-luxe py-32">
        <SectionHeading
          eyebrow="Tarifs indicatifs"
          title="Des prix transparents et garantis"
          description="Aucune mauvaise surprise. Le prix annoncé est le prix payé."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            { route: "Bordeaux Centre → Aéroport Mérignac", price: 45 },
            { route: "Bordeaux Centre → Gare Saint-Jean", price: 20 },
            { route: "Bordeaux → Arcachon", price: 90 },
            { route: "Bordeaux → Cap Ferret", price: 110 },
            { route: "Bordeaux → Dune du Pilat", price: 115 },
            { route: "Bordeaux → Biarritz", price: 380 },
          ].map((p) => (
            <div key={p.route} className="border border-border p-8 hover:border-gold transition-colors group">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-4">Trajet</div>
              <div className="text-base mb-6 leading-snug">{p.route}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-muted-foreground">à partir de</span>
                <span className="text-3xl font-display text-gold">{p.price} €</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/tarifs"
            className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
          >
            Voir tous les tarifs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-luxe py-32">
        <SectionHeading
          eyebrow="Avis clients"
          title="Ils nous ont confié leurs trajets"
        />
        <div className="mt-6 flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-gold text-gold" />
          ))}
          <span className="ml-3 text-sm text-muted-foreground">4.9/5 — basé sur 320 avis</span>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} className="border border-border p-8 hover:border-gold transition-colors">
              <div className="flex gap-1 mb-5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
              </div>
              <blockquote className="text-base leading-relaxed mb-6 italic font-display">
                « {t.text} »
              </blockquote>
              <figcaption>
                <div className="text-sm font-medium">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-luxe pb-32">
        <div className="bg-card border border-border p-12 md:p-20 text-center">
          <SectionHeading
            eyebrow="À votre service"
            title="Prêt à voyager autrement ?"
            description="Réservez votre chauffeur privé en quelques clics, ou contactez-nous pour un devis personnalisé."
          />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/reservation" className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-gold-foreground text-xs uppercase tracking-[0.25em] hover:opacity-90">
              Réserver en ligne <ArrowRight className="h-4 w-4" />
            </Link>
            <a href="tel:+33600000000" className="inline-flex items-center gap-3 px-8 py-4 border border-gold text-gold text-xs uppercase tracking-[0.25em] hover:bg-gold hover:text-gold-foreground transition-colors">
              <Phone className="h-4 w-4" /> Nous appeler
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
