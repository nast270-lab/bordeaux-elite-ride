import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-bordeaux.jpg";
import suvImg from "@/assets/fleet-suv.jpg";
import { BookingForm } from "@/components/site/BookingForm";
import { SectionHeading } from "@/components/site/SectionHeading";
import {
  Plane, Train, Briefcase, Map as MapIcon, Clock,
  ShieldCheck, BadgeCheck, Star, Sparkles, Phone, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bordeaux Privilège — Chauffeur privé VTC à Bordeaux" },
      { name: "description", content: "Chauffeur privé indépendant à Bordeaux. Transferts aéroport, gare et trajets professionnels. Prix fixes, ponctualité, véhicule SUV hybride confort." },
    ],
  }),
  component: HomePage,
});

const services = [
  { icon: Plane, title: "Transferts aéroport", desc: "Bordeaux-Mérignac, suivi des vols en temps réel." },
  { icon: Train, title: "Transferts gare", desc: "Gare Saint-Jean et toutes gares de la région." },
  { icon: Briefcase, title: "Trajets professionnels", desc: "Discrétion et ponctualité pour vos rendez-vous d'affaires." },
  { icon: MapIcon, title: "Longue distance", desc: "France et Europe sur simple demande." },
];

const reasons = [
  { icon: BadgeCheck, title: "Prix fixes garantis", desc: "Tarif annoncé, tarif appliqué. Aucune surprise." },
  { icon: Clock, title: "Disponible 24/7", desc: "Réservation à toute heure, tous les jours de l'année." },
  { icon: ShieldCheck, title: "Chauffeur sérieux", desc: "Indépendant, formé, expérimenté et soucieux du détail." },
  { icon: Sparkles, title: "Véhicule récent", desc: "SUV hybride confort, entretenu avec soin." },
  { icon: Plane, title: "Suivi vols & trains", desc: "Adaptation en temps réel à vos horaires." },
  { icon: ShieldCheck, title: "Paiement sécurisé", desc: "CB, virement, espèces. Facture sur demande." },
];

const milestones = [
  { year: "2025", title: "Lancement", desc: "Un chauffeur, un véhicule, une exigence : la qualité de chaque trajet." },
  { year: "2026", title: "Second véhicule", desc: "Renfort d'un véhicule familial pour répondre à la demande croissante." },
  { year: "2027", title: "Équipe dédiée", desc: "Recrutement de chauffeurs partenaires sélectionnés selon nos standards." },
  { year: "2028+", title: "Flotte complète", desc: "Une offre élargie — berline, SUV, van — au service des particuliers et professionnels." },
];

const testimonials = [
  { name: "Sophie L.", role: "Directrice marketing", text: "Service irréprochable. Ponctualité et discrétion exemplaires." },
  { name: "Marc D.", role: "Chef d'entreprise", text: "Mes clients sont toujours impressionnés. Une véritable carte de visite." },
  { name: "Claire B.", role: "Voyageuse d'affaires", text: "Réservation simple, chauffeur ponctuel, véhicule impeccable." },
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
              <span className="text-xs uppercase tracking-[0.4em] text-gold">Chauffeur privé indépendant</span>
            </div>
            <h1 className="text-5xl md:text-7xl leading-[1.05] mb-6">
              Votre chauffeur privé à <span className="text-gradient-gold italic">Bordeaux</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
              Un chauffeur, un véhicule, une exigence absolue.
              Confort, ponctualité et discrétion pour vos trajets personnels et professionnels.
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

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block">
          <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent animate-shimmer" />
        </div>
      </section>

      {/* BOOKING */}
      <section className="container-luxe -mt-24 relative z-20">
        <BookingForm />
      </section>

      {/* CHAUFFEUR + VEHICULE */}
      <section className="container-luxe py-32">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div className="bg-gradient-to-br from-card to-background p-6 md:p-10 order-2 lg:order-1">
            <img
              src={suvImg}
              alt="SUV berline hybride — Bordeaux Privilège"
              className="w-full h-auto object-contain"
              loading="lazy"
              width={1920}
              height={1080}
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex items-center gap-3 mb-5">
              <span className="gold-divider" />
              <span className="text-xs uppercase tracking-[0.3em] text-gold">Un chauffeur, un véhicule</span>
            </div>
            <h2 className="text-4xl md:text-5xl leading-tight mb-6">
              L'engagement personnel d'un <span className="text-gradient-gold italic">professionnel indépendant</span>
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-6">
              Chauffeur indépendant basé à Bordeaux, je mets à votre disposition mon expérience et un SUV berline
              hybride récent, soigné et confortable. Chaque trajet est traité avec rigueur, ponctualité et discrétion.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Carte professionnelle VTC",
                "Assurance transport de personnes",
                "Tenue soignée et véhicule impeccable",
                "Interlocuteur unique, joignable directement",
              ].map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm">
                  <span className="h-px w-6 bg-gold" /> {p}
                </li>
              ))}
            </ul>
            <Link to="/flotte" className="inline-flex items-center gap-2 text-sm text-gold hover:underline">
              Découvrir le véhicule <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-luxe pb-32">
        <SectionHeading
          eyebrow="Nos services"
          title="Une prestation sur-mesure pour chaque trajet"
          description="Particuliers ou professionnels, chaque course est traitée avec la même exigence."
        />
        <div className="mt-16 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4 border border-border">
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

      {/* VISION / EVOLUTION */}
      <section className="container-luxe py-32">
        <SectionHeading
          eyebrow="Notre vision"
          title="Une structure qui grandit avec ses clients"
          description="Aujourd'hui un chauffeur, un véhicule. Demain, une équipe et une flotte — sans jamais transiger sur la qualité de service."
        />
        <div className="mt-20 relative">
          <div className="absolute left-0 right-0 top-8 h-px bg-border hidden md:block" />
          <div className="grid gap-12 md:grid-cols-4">
            {milestones.map((m, i) => (
              <div key={m.year} className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <span className="h-4 w-4 rounded-full bg-gold ring-4 ring-background relative z-10" />
                  <span className="text-xs uppercase tracking-[0.3em] text-gold">Étape {i + 1}</span>
                </div>
                <div className="text-3xl font-display text-gradient-gold mb-3">{m.year}</div>
                <div className="text-base font-medium mb-2">{m.title}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="container-luxe pb-32">
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
      <section className="container-luxe pb-32">
        <SectionHeading
          eyebrow="Avis clients"
          title="Ils nous ont confié leurs trajets"
        />
        <div className="mt-6 flex items-center justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-gold text-gold" />
          ))}
          <span className="ml-3 text-sm text-muted-foreground">5/5 — recommandé par mes clients</span>
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
