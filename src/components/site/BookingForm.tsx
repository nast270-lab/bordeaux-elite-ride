import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Calendar, Users, Phone } from "lucide-react";

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(1);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<null | "success" | "error">(null);

  const estimate = useMemo(() => {
    if (!from || !to) return null;
    const base = 45;
    const len = (from.length + to.length) * 0.6;
    return Math.round(base + len + pax * 3);
  }, [from, to, pax]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to || loading) return;
    setLoading(true);
    setStatus(null);
    try {
      const resp = await fetch("/api/notify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "booking",
          from,
          to,
          date: date || undefined,
          pax,
          estimate,
          clientPhone: phone || undefined,
        }),
      });
      setStatus(resp.ok ? "success" : "error");
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-card/90 backdrop-blur-xl border border-border ${compact ? "p-6" : "p-8 md:p-10"} shadow-luxe`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="gold-divider" />
        <span className="text-xs uppercase tracking-[0.3em] text-gold">Réservation rapide</span>
      </div>

      {status === "success" && (
        <div className="mb-6 p-4 border border-gold/40 bg-gold/5 text-sm">
          Demande envoyée — votre chauffeur vous contacte sous 30 min.
        </div>
      )}
      {status === "error" && (
        <div className="mb-6 p-4 border border-destructive/40 bg-destructive/5 text-sm text-destructive">
          Une erreur est survenue. Appelez-nous directement.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Field icon={<MapPin className="h-4 w-4" />} label="Adresse de départ">
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Bordeaux Centre"
            required
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
          />
        </Field>

        <Field icon={<MapPin className="h-4 w-4" />} label="Destination">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Aéroport Bordeaux-Mérignac"
            required
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
          />
        </Field>

        <Field icon={<Calendar className="h-4 w-4" />} label="Date & heure">
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-transparent outline-none text-foreground"
          />
        </Field>

        <Field icon={<Users className="h-4 w-4" />} label="Passagers">
          <select
            value={pax}
            onChange={(e) => setPax(+e.target.value)}
            className="w-full bg-transparent outline-none text-foreground"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n} className="bg-card">
                {n} passager{n > 1 ? "s" : ""}
              </option>
            ))}
            <option value={5} className="bg-card">
              5 à 7 passagers — nous contacter
            </option>
          </select>
        </Field>

        <div className="md:col-span-2">
          <Field icon={<Phone className="h-4 w-4" />} label="Votre téléphone (pour confirmation SMS)">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+33 6 XX XX XX XX"
              className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
            />
          </Field>
        </div>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-border">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-1">Estimation</div>
          <div className="text-3xl font-display text-gold">
            {estimate ? `${estimate} €` : "—"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Prix fixe garanti, sans surprise</div>
        </div>

        <button
          type="submit"
          disabled={loading || !from || !to}
          className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-gold text-gold-foreground text-xs uppercase tracking-[0.25em] hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Envoi…" : "Réserver maintenant"}
          {!loading && (
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          )}
        </button>
      </div>
    </form>
  );
}

function Field({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block group">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 flex items-center gap-2">
        <span className="text-gold">{icon}</span>
        {label}
      </div>
      <div className="border-b border-border group-focus-within:border-gold transition-colors py-2">
        {children}
      </div>
    </label>
  );
}
