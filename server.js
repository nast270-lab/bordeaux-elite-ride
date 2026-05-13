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

// Rate-limit : 20 requêtes / 15 min par IP sur les routes API et webhook
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  standardHeaders: true,  // renvoie les headers RateLimit-* standard
  legacyHeaders: false,
  message: { error: "Trop de requêtes, réessayez dans quelques minutes." },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

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
