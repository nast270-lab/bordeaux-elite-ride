import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { BookingForm, type BookingPayload } from "@/components/site/BookingForm";

export const Route = createFileRoute("/reservation")({
  head: () => ({
    meta: [
      { title: "Réservation chauffeur privé Bordeaux — Bordeaux Privilège" },
      {
        name: "description",
        content:
          "Réservez votre chauffeur privé à Bordeaux en quelques clics. Estimation instantanée, prix fixes.",
      },
    ],
  }),
  component: ReservationPage,
});

async function notifyBooking(data: BookingPayload): Promise<void> {
  const resp = await fetch("/api/notify-booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!resp.ok) throw new Error(`notify-booking ${resp.status}`);
}

function ReservationPage() {
  return (
    <div className="container-luxe py-24 md:py-32">
      <SectionHeading
        eyebrow="Réservation"
        title="Votre trajet, en quelques instants"
        description="Indiquez vos détails de course, obtenez une estimation immédiate et confirmez votre réservation."
      />
      <div className="mt-16 max-w-3xl mx-auto">
        <BookingForm onNotify={notifyBooking} />
        <p className="mt-8 text-center text-xs text-muted-foreground">
          Une question ? Contactez-nous au{" "}
          <a href="tel:+33644691032" className="text-gold hover:underline">
            +33 6 44 69 10 32
          </a>{" "}
          — disponible 24h/24.
        </p>
      </div>
    </div>
  );
}
