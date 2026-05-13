import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { FloatingActions } from "@/components/site/FloatingActions";

import appCss from "../styles.css?url";

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
      { name: "description", content: "Société de chauffeur privé haut de gamme à Bordeaux et en Nouvelle-Aquitaine. Transferts aéroport, gare, déplacements professionnels et excursions. Prix fixes, 24h/24." },
      { name: "keywords", content: "chauffeur privé Bordeaux, transport privé Bordeaux, transfert aéroport Mérignac, chauffeur professionnel Bordeaux, société de chauffeur Bordeaux" },
      { property: "og:title", content: "Bordeaux Privilège — Chauffeur privé à Bordeaux" },
      { property: "og:description", content: "Transport premium à Bordeaux : ponctualité, discrétion et confort." },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Bordeaux Privilège — Chauffeur privé à Bordeaux" },
      { name: "twitter:description", content: "Transport premium à Bordeaux : ponctualité, discrétion et confort. Prix fixes garantis." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Inter:wght@300;400;500;600&display=swap" },
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
