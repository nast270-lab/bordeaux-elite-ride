import { Router } from "express";
import { sendWhatsApp, normalizePhone } from "../lib/twilio.js";

const router = Router();

function formatDate(iso) {
  if (!iso) return "à confirmer";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function clean(str, max = 200) {
  return String(str ?? "").trim().slice(0, max);
}

router.post("/", async (req, res) => {
  try {
    const name = clean(req.body.name, 100);
    const phone = clean(req.body.phone, 30);
    const from = clean(req.body.from, 200);
    const to = clean(req.body.to, 200);
    const date = clean(req.body.date, 50);
    const pax = clean(req.body.pax, 10) || "1";
    const vehicle = clean(req.body.vehicle, 50) || "Berline";

    if (!name || !phone || !from || !to) {
      return res.status(400).json({ ok: false, error: "Champs requis manquants" });
    }

    const manager = process.env.MANAGER_PHONE;
    const dateStr = formatDate(date);

    const managerMsg = [
      "🚨 *Nouvelle réservation* — Bordeaux Privilège",
      `👤 Nom : ${name}`,
      `📱 Tél : ${normalizePhone(phone)}`,
      `📍 Départ : ${from}`,
      `🏁 Destination : ${to}`,
      `📅 Date : ${dateStr}`,
      `👥 Passagers : ${pax}`,
      `🚗 Véhicule : ${vehicle}`,
    ].join("\n");

    const clientMsg = [
      "✅ *Réservation confirmée !*",
      `Bonjour ${name}, votre course est bien enregistrée.`,
      "",
      `📍 Départ : ${from}`,
      `🏁 Destination : ${to}`,
      `📅 Date : ${dateStr}`,
      `👥 Passagers : ${pax}`,
      `🚗 Véhicule : ${vehicle}`,
      "",
      "Nous vous recontactons sous 15 minutes pour confirmer.",
      manager ? `Urgence : ${manager}` : null,
    ].filter(Boolean).join("\n");

    const tasks = [];
    if (manager) tasks.push(sendWhatsApp(manager, managerMsg));
    if (phone) tasks.push(sendWhatsApp(phone, clientMsg));
    await Promise.allSettled(tasks);

    res.json({ ok: true });
  } catch (err) {
    console.error("[booking]", err);
    res.status(500).json({ ok: false, error: "Erreur serveur" });
  }
});

export default router;
