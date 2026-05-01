import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";

const nav = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/flotte", label: "Véhicules" },
  { to: "/tarifs", label: "Tarifs" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-background/60 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="container-luxe flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center bg-ink text-ink-foreground rounded-md">
            <span className="font-display text-base leading-none">B</span>
          </div>
          <div className="leading-tight">
            <div className="font-display text-base tracking-tight">Bordeaux Privilège</div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Chauffeur Privé</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+33600000000"
            className="flex items-center gap-2 text-sm text-foreground hover:opacity-70 transition"
          >
            <Phone className="h-4 w-4" />
            +33 6 00 00 00 00
          </a>
          <Link
            to="/reservation"
            className="px-5 py-2.5 bg-ink text-ink-foreground text-xs uppercase tracking-[0.2em] hover:opacity-90 rounded-md"
          >
            Réserver
          </Link>
        </div>

        <button
          className="lg:hidden p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-background border-t border-border animate-fade-up">
          <nav className="container-luxe py-6 flex flex-col gap-5">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="text-base text-foreground"
              >
                {n.label}
              </Link>
            ))}
            <a href="tel:+33600000000" className="flex items-center gap-2 text-foreground">
              <Phone className="h-4 w-4" /> +33 6 00 00 00 00
            </a>
            <Link
              to="/reservation"
              onClick={() => setOpen(false)}
              className="px-5 py-3 bg-ink text-ink-foreground text-xs uppercase tracking-[0.2em] text-center rounded-md"
            >
              Réserver
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
