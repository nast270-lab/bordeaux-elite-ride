import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { z } from "zod";
import { notifyServer } from "@/lib/notify";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Bordeaux Privilège" },
      { name: "description", content: "Contactez Bordeaux Privilège pour toute demande de devis ou information sur nos services de chauffeur privé." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Nom requis").max(100),
  email: z.string().trim().email("Email invalide").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(10, "Message trop court").max(1000),
});

function ContactPage() {
  const [status, setStatus] = useState<null | "success" | "error">(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus(null);
    try {
      await notifyServer({
        data: {
          type: "contact",
          name: r.data.name,
          email: r.data.email,
          phone: r.data.phone || undefined,
          message: r.data.message,
        },
      });
      setStatus("success");
      e.currentTarget.reset();
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="container-luxe py-24 md:py-32">
      <SectionHeading
        eyebrow="Contact"
        title="Restons en contact"
        description="Une question, un devis sur-mesure, une demande spécifique ? Notre équipe vous répond dans les plus brefs délais."
      />

      <div className="mt-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2 space-y-8">
          {[
            { icon: Phone, title: "Téléphone", value: "+33 6 00 00 00 00", href: "tel:+33600000000" },
            { icon: Mail, title: "Email", value: "contact@bordeaux-privilege.fr", href: "mailto:contact@bordeaux-privilege.fr" },
            { icon: MapPin, title: "Adresse", value: "Bordeaux, Gironde — Nouvelle-Aquitaine" },
            { icon: Clock, title: "Disponibilité", value: "24 heures sur 24, 7 jours sur 7" },
          ].map(({ icon: Icon, title, value, href }) => (
            <div key={title} className="flex gap-5">
              <div className="h-12 w-12 border border-gold/40 flex items-center justify-center shrink-0">
                <Icon className="h-5 w-5 text-gold" strokeWidth={1.3} />
              </div>
              <div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground mb-1">{title}</div>
                {href ? (
                  <a href={href} className="text-base text-foreground hover:text-gold">{value}</a>
                ) : (
                  <div className="text-base">{value}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-3 bg-card border border-border p-8 md:p-10 space-y-6">
          {status === "success" && (
            <div className="p-4 border border-gold/40 bg-gold/5 text-sm text-foreground">
              Merci, votre message a bien été envoyé. Nous vous répondons sous 24h.
            </div>
          )}
          {status === "error" && (
            <div className="p-4 border border-destructive/40 bg-destructive/5 text-sm text-destructive">
              Une erreur est survenue. Réessayez ou appelez-nous directement.
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <Field label="Nom complet" name="name" error={errors.name} />
            <Field label="Email" name="email" type="email" error={errors.email} />
          </div>
          <Field label="Téléphone (optionnel)" name="phone" type="tel" error={errors.phone} />

          <div>
            <label className="block">
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Votre message</div>
              <textarea
                name="message"
                rows={6}
                maxLength={1000}
                className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2 resize-none text-foreground"
              />
            </label>
            {errors.message && <p className="text-xs text-destructive mt-2">{errors.message}</p>}
          </div>

          <button className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-gold-foreground text-xs uppercase tracking-[0.25em] hover:opacity-90">
            Envoyer <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", error }: { label: string; name: string; type?: string; error?: string }) {
  return (
    <div>
      <label className="block">
        <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</div>
        <input
          name={name}
          type={type}
          maxLength={255}
          className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-2 text-foreground"
        />
      </label>
      {error && <p className="text-xs text-destructive mt-2">{error}</p>}
    </div>
  );
}
