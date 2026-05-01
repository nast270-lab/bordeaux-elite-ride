import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BookingForm } from "@/components/site/BookingForm";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Réservation — Bordeaux Privilège" },
      { name: "description", content: "Réservez votre chauffeur privé à Bordeaux en quelques clics. Estimation instantanée, prix fixes." },
    ],
  }),
  component: ReservationPage,
});

function ReservationPage() {
  return (
    <div className="container-luxe py-24 md:py-32">
      <SectionHeading
        eyebrow="Réservation"
        title="Votre trajet, en quelques instants"
        description="Indiquez vos détails de course, obtenez une estimation immédiate et confirmez votre réservation."
      />
      <div className="mt-16 max-w-3xl mx-auto">
        <BookingForm />
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Une question ? Contactez-nous au <a href="tel:+33600000000" className="text-ink hover:underline">+33 6 00 00 00 00</a> — disponible 24h/24.
        </p>
      </div>
    </div>
  );
}
