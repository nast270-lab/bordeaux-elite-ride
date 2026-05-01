import { useMemo, useState } from "react";
import { ArrowRight, MapPin, Calendar, Users } from "lucide-react";

export function BookingForm({ compact = false }: { compact?: boolean }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [pax, setPax] = useState(1);

  const estimate = useMemo(() => {
    if (!from || !to) return null;
    const base = 45;
    const len = (from.length + to.length) * 0.5;
    return Math.round(base + len + pax * 2);
  }, [from, to, pax]);

  return (
    <div className={`bg-card border border-border ${compact ? "p-6" : "p-8 md:p-10"} shadow-card rounded-md`}>
      <div className="flex items-center gap-3 mb-6">
        <span className="hairline" />
        <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Réservation rapide</span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Field icon={<MapPin className="h-4 w-4" />} label="Adresse de départ">
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Bordeaux Centre"
            className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground/60"
          />
        </Field>
        <Field icon={<MapPin className="h-4 w-4" />} label="Destination">
          <input
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Aéroport Bordeaux-Mérignac"
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>{n} passager{n > 1 ? "s" : ""}</option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-6 pt-6 border-t border-border">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">Estimation</div>
          <div className="text-3xl font-display">
            {estimate ? `${estimate} €` : "—"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">Prix fixe garanti, sans surprise</div>
        </div>
        <button className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-ink text-ink-foreground text-xs uppercase tracking-[0.22em] hover:opacity-90 transition rounded-md">
          Réserver
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

function Field({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <label className="block group">
      <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2 flex items-center gap-2">
        {icon}
        {label}
      </div>
      <div className="border-b border-border group-focus-within:border-ink transition-colors py-2">
        {children}
      </div>
    </label>
  );
}
