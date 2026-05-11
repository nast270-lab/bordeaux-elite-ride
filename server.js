import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

import bookingRoute from "./routes/booking.js";
import contactRoute from "./routes/contact.js";
import webhookRoute from "./routes/webhook.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));

app.use("/api/booking", bookingRoute);
app.use("/api/contact", contactRoute);
app.use("/webhook/whatsapp", webhookRoute);

app.get("/health", (_req, res) => res.json({ ok: true }));

app.use((_req, res) => {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"), (err) => {
    if (err) res.status(404).send("Page introuvable");
  });
});

app.listen(PORT, () => {
  console.log(`🚗 Bordeaux Privilège — http://localhost:${PORT}`);
});
