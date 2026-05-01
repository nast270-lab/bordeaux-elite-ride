import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-32">
      <div className="container-luxe py-20 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center border border-gold rounded-sm">
              <span className="font-display text-gold text-xl leading-none">B</span>
            </div>
            <div>
              <div className="font-display text-lg">Bordeaux Privilège</div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-gold">Chauffeur Privé</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Service de transport privé haut de gamme à Bordeaux et en Nouvelle-Aquitaine. L'excellence à votre service.
          </p>
          <div className="flex gap-3 mt-6">
            {[Instagram, Facebook, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 flex items-center justify-center border border-border hover:border-gold hover:text-gold transition-colors"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Navigation</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-gold">Nos services</Link></li>
            <li><Link to="/flotte" className="hover:text-gold">Notre flotte</Link></li>
            <li><Link to="/tarifs" className="hover:text-gold">Tarifs</Link></li>
            <li><Link to="/reservation" className="hover:text-gold">Réservation</Link></li>
            <li><Link to="/contact" className="hover:text-gold">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Contact</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="flex gap-3"><Phone className="h-4 w-4 text-gold mt-0.5 shrink-0" /><a href="tel:+33600000000" className="hover:text-gold">+33 6 00 00 00 00</a></li>
            <li className="flex gap-3"><Mail className="h-4 w-4 text-gold mt-0.5 shrink-0" /><a href="mailto:contact@bordeaux-privilege.fr" className="hover:text-gold">contact@bordeaux-privilege.fr</a></li>
            <li className="flex gap-3"><MapPin className="h-4 w-4 text-gold mt-0.5 shrink-0" /><span>Bordeaux, Gironde<br/>Nouvelle-Aquitaine</span></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] text-gold mb-6">Disponibilité</h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            24h/24 — 7j/7<br/>
            Réservation en ligne ou par téléphone, à toute heure.
          </p>
          <a
            href="https://wa.me/33600000000"
            className="inline-flex mt-4 items-center gap-2 text-sm text-gold hover:underline"
          >
            WhatsApp →
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-luxe py-6 flex flex-col md:flex-row gap-4 justify-between text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Bordeaux Privilège. Tous droits réservés.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gold">Mentions légales</a>
            <a href="#" className="hover:text-gold">CGV</a>
            <a href="#" className="hover:text-gold">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
