import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-24">
      <div className="container-luxe py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex h-9 w-9 items-center justify-center bg-ink text-ink-foreground rounded-md">
              <span className="font-display text-base leading-none">B</span>
            </div>
            <div>
              <div className="font-display text-base">Bordeaux Privilège</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Chauffeur Privé</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Service de chauffeur privé à Bordeaux pour particuliers et professionnels.
          </p>
          <div className="flex gap-2 mt-5">
            <a
              href="#"
              className="h-9 w-9 flex items-center justify-center border border-border hover:border-ink transition-colors rounded-md"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Navigation</h4>
          <ul className="space-y-3 text-sm">
            <li><Link to="/services" className="hover:opacity-70">Nos services</Link></li>
            <li><Link to="/flotte" className="hover:opacity-70">Véhicules</Link></li>
            <li><Link to="/tarifs" className="hover:opacity-70">Tarifs</Link></li>
            <li><Link to="/reservation" className="hover:opacity-70">Réservation</Link></li>
            <li><Link to="/contact" className="hover:opacity-70">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 shrink-0" /><a href="tel:+33600000000" className="hover:opacity-70">+33 6 00 00 00 00</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 shrink-0" /><a href="mailto:contact@bordeaux-privilege.fr" className="hover:opacity-70">contact@bordeaux-privilege.fr</a></li>
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 shrink-0" /><span className="text-muted-foreground">Bordeaux, Gironde</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-5">Disponibilité</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            24h/24 — 7j/7<br/>
            Réservation en ligne ou par téléphone.
          </p>
          <a
            href="https://wa.me/33600000000"
            className="inline-flex mt-4 items-center gap-2 text-sm hover:underline underline-offset-4"
          >
            WhatsApp →
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-luxe py-5 flex flex-col md:flex-row gap-4 justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Bordeaux Privilège. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-70">Mentions légales</a>
            <a href="#" className="hover:opacity-70">CGV</a>
            <a href="#" className="hover:opacity-70">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
