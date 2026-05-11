import { Router } from "express";
import { sendWhatsApp, normalizePhone } from "../lib/twilio.js";

const router = Router();

function clean(str, max = 500) {
  return String(str ?? "").trim().slice(0, max);
}

router.post("/", async (req, res) => {
  try {
    const name = clean(req.body.name, 100);
    const email = clean(req.body.email, 150);
    const phone = clean(req.body.phone, 30);
    const message = clean(req.body.message, 1000);

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Champs requis manquants" });
    }

    const manager = process.env.MANAGER_PHONE;

    const managerMsg = [
      "📩 *Nouveau message* — Bordeaux Privilège",
      `👤 De : ${name}`,
      `📧 Email : ${email}`,
      phone ? `📱 Tél : ${normalizePhone(phone)}` : null,
      "---",
      message,
    ].filter(Boolean).join("\n");

    const tasks = [];
    if (manager) tasks.push(sendWhatsApp(manager, managerMsg));
    if (phone) {
      const clientMsg = [
        "✅ Message bien reçu !",
        `Bonjour ${name}, nous vous répondons sous 24h.`,
        manager ? `Urgence : ${manager}` : null,
      ].filter(Boolean).join("\n");
      tasks.push(sendWhatsApp(phone, clientMsg));
    }
    await Promise.allSettled(tasks);

    res.json({ ok: true });
  } catch (err) {
    console.error("[contact]", err);
    res.status(500).json({ ok: false, error: "Erreur serveur" });
  }
});

export default router;
