import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

import appCss from "../styles.css?url";
import heroImg from "../assets/hero-bordeaux.jpg";

const SITE_URL = "https://bordeaux-privilege.fr";

const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Bordeaux Privilège",
  description:
    "Chauffeur privé haut de gamme à Bordeaux et en Nouvelle-Aquitaine. Transferts aéroport, gare, déplacements professionnels et excursions. Prix fixes, 24h/24.",
  url: SITE_URL,
  telephone: "+33644691032",
  email: "contact@bordeaux-privilege.fr",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bordeaux",
    addressRegion: "Nouvelle-Aquitaine",
    postalCode: "33000",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 44.8378,
    longitude: -0.5792,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  priceRange: "€€",
  areaServed: ["Bordeaux", "Gironde", "Nouvelle-Aquitaine", "France", "Europe"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de chauffeur privé",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Transfert aéroport Bordeaux-Mérignac" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Transfert gare Bordeaux Saint-Jean" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Trajets professionnels" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Longue distance France & Europe" } },
    ],
  },
};

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl text-gold">404</h1>
        <h2 className="mt-4 text-xl">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <Link
          to="/"
          className="inline-flex mt-6 items-center justify-center px-6 py-3 bg-gold text-gold-foreground text-xs uppercase tracking-[0.2em]"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bordeaux Privilège — Chauffeur privé à Bordeaux" },
      {
        name: "description",
        content:
          "Société de chauffeur privé haut de gamme à Bordeaux et en Nouvelle-Aquitaine. Transferts aéroport, gare, déplacements professionnels et excursions. Prix fixes, 24h/24.",
      },
      {
        name: "keywords",
        content:
          "chauffeur privé Bordeaux, transport privé Bordeaux, transfert aéroport Mérignac, chauffeur professionnel Bordeaux, société de chauffeur Bordeaux",
      },
      { property: "og:title", content: "Bordeaux Privilège — Chauffeur privé à Bordeaux" },
      {
        property: "og:description",
        content: "Transport premium à Bordeaux : ponctualité, discrétion et confort.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { property: "og:site_name", content: "Bordeaux Privilège" },
      { property: "og:image", content: `${SITE_URL}${heroImg}` },
      { property: "og:image:width", content: "1920" },
      { property: "og:image:height", content: "1280" },
      { property: "og:image:alt", content: "Bordeaux Privilège — Chauffeur privé à Bordeaux" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bordeaux Privilège — Chauffeur privé à Bordeaux" },
      {
        name: "twitter:description",
        content: "Transport premium à Bordeaux : ponctualité, discrétion et confort. Prix fixes garantis.",
      },
      { name: "twitter:image", content: `${SITE_URL}${heroImg}` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_SCHEMA) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-20">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
    </>
  );
}
