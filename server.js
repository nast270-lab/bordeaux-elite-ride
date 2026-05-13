import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import rateLimit from "express-rate-limit";

import bookingRoute from "./routes/booking.js";
import contactRoute from "./routes/contact.js";
import webhookRoute from "./routes/webhook.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

// ── Sécurité : désactiver fingerprinting Express ──────────────────────────────
app.disable("x-powered-by");

// ── Headers de sécurité HTTP ──────────────────────────────────────────────────
app.use((_req, res, next) => {
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  res.setHeader(
    "Content-Security-Policy",
    [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https://images.pexels.com",
      "connect-src 'self'",
      "frame-src 'none'",
    ].join("; ")
  );
  next();
});

// ── Rate-limit : 20 requêtes / 15 min par IP sur les routes API ──────────────
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Trop de requêtes, réessayez dans quelques minutes." },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ── Fichiers statiques avec cache 7 jours ─────────────────────────────────────
app.use(express.static(path.join(__dirname, "public"), {
  extensions: ["html"],
  setHeaders(res, filePath) {
    if (/\.(css|js|woff2?|png|jpe?g|webp|svg|ico)$/i.test(filePath)) {
      res.setHeader("Cache-Control", "public, max-age=604800, immutable");
    } else if (/\.html$/.test(filePath)) {
      res.setHeader("Cache-Control", "no-cache");
    }
  },
}));

app.use("/api/booking", apiLimiter, bookingRoute);
app.use("/api/contact", apiLimiter, contactRoute);
app.use("/webhook/whatsapp", apiLimiter, webhookRoute);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"), (err) => {
    if (err) res.status(404).send("Page introuvable");
  });
});

app.listen(PORT, () => {
  console.log(`🚗 Bordeaux Privilège — http://localhost:${PORT}`);
});
