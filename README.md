# Bordeaux Privilège

Site vitrine + réservation pour une entreprise de transport de personnes (VTC),
avec chatbot **WhatsApp** automatisé via Twilio.

**Stack** : Node.js · Express · HTML/CSS/JS vanilla · Twilio WhatsApp Business
**Pas de base de données** — les réservations partent directement en message WhatsApp
au gérant et au client.

---

## Structure

```
.
├── server.js             # serveur Express
├── lib/twilio.js         # helpers WhatsApp (envoi, normalisation tél.)
├── routes/
│   ├── booking.js        # POST /api/booking → WhatsApp client + gérant
│   ├── contact.js        # POST /api/contact → WhatsApp gérant (+ accusé client)
│   └── webhook.js        # POST /webhook/whatsapp → chatbot TwiML par mots-clés
├── public/
│   ├── index.html        # accueil
│   ├── reservation.html  # formulaire de réservation
│   ├── about.html        # à propos
│   ├── contact.html      # contact
│   ├── 404.html
│   ├── css/style.css
│   ├── js/{main,booking,contact}.js
│   └── assets/{hero,fleet}.jpg
├── .env.example
└── package.json
```

---

## Installation locale

```bash
git clone <repo>
cd bordeaux-elite-ride
npm install
cp .env.example .env
# remplissez .env avec vos clés Twilio
npm run dev
```

Le site tourne sur `http://localhost:5000`.

### Variables d'environnement

| Clé | Description |
|---|---|
| `PORT` | Port du serveur (défaut : 5000) |
| `TWILIO_ACCOUNT_SID` | Trouvable sur [console.twilio.com](https://console.twilio.com) |
| `TWILIO_AUTH_TOKEN` | Idem |
| `TWILIO_WHATSAPP_NUMBER` | `whatsapp:+14155238886` (Sandbox) ou votre numéro Business |
| `MANAGER_PHONE` | Numéro du gérant qui reçoit les notifications, ex. `+33644691032` |
| `SITE_URL` | URL publique du site (utilisée dans les réponses du chatbot) |

---

## Configurer le chatbot WhatsApp Twilio

### 1) Sandbox WhatsApp (gratuit, pour le dev)

1. Sur [console.twilio.com](https://console.twilio.com) → **Messaging → Try it out → Send a WhatsApp message**
2. Rejoindre le sandbox depuis votre téléphone : envoyer `join <code>` au **+1 415 523 8886**
3. Dans **Sandbox settings**, champ **"When a message comes in"** :
   - URL : `https://<votre-domaine-public>/webhook/whatsapp` (méthode `POST`)
   - En local : voir la section ngrok ci-dessous

### 2) Tester en local avec ngrok

Le webhook doit être accessible depuis Internet. Utilisez ngrok :

```bash
# Terminal 1
npm run dev

# Terminal 2
ngrok http 5000
```

Copiez l'URL `https://xxxx.ngrok.io` et collez-la dans **Sandbox settings → When a message comes in** :
`https://xxxx.ngrok.io/webhook/whatsapp`

Envoyez ensuite `bonjour` au sandbox depuis votre téléphone — vous devriez recevoir le menu.

### 3) Mots-clés reconnus

| Message entrant | Réponse |
|---|---|
| `bonjour`, `hello`, `salut`, `menu` | Menu d'accueil (3 options) |
| `1`, `réserver`, `reservation` | Lien vers `/reservation` |
| `2`, `tarif`, `prix` | Grille tarifaire |
| `3`, `contact`, `conseiller` | Coordonnées du gérant |
| Autre | Message d'aide |

### 4) Passer en production

Le sandbox impose à chaque utilisateur de **rejoindre** d'abord (`join <code>`).
Pour un usage commercial public, il faut un **numéro WhatsApp Business validé par Meta** :

1. [Soumettre un sender WhatsApp](https://www.twilio.com/console/sms/whatsapp/senders)
2. Renseigner le profil entreprise (nom légal, site, etc.)
3. Une fois validé, remplacer `TWILIO_WHATSAPP_NUMBER` par le numéro de production

---

## Déploiement

### Render (recommandé — gratuit pour démarrer)

1. Créer un compte sur [render.com](https://render.com)
2. **New → Web Service** → connecter votre repo GitHub
3. Configuration :
   - **Build command** : `npm install`
   - **Start command** : `npm start`
   - **Environment** : `Node`
4. Onglet **Environment** : ajouter toutes les variables de `.env`
5. Une fois déployé, mettre à jour l'URL du webhook Twilio avec votre URL Render
   (ex. `https://bordeaux-privilege.onrender.com/webhook/whatsapp`)

### Railway

```bash
npm install -g @railway/cli
railway login
railway init
railway up
```

Puis configurer les variables d'environnement via le dashboard Railway.

### Cloudflare Pages / Workers / Vercel Serverless

Ce projet utilise un serveur Express persistant. Pour le déployer sur du
serverless, il faudrait adapter `server.js` (Cloudflare Workers / Vercel Functions
ont leur propre format). **Render et Railway sont plus simples.**

---

## Points importants

- **Pas de base de données** : les réservations partent en WhatsApp uniquement.
  Si vous voulez un historique, ajoutez un fichier JSON ou une base (MongoDB, SQLite).
- **Validation des entrées** : tronquée côté serveur (`clean()` dans les routes),
  pas de sanitisation HTML — les données ne sont jamais réinjectées dans le DOM.
- **Rate-limit** : non implémenté. Ajouter `express-rate-limit` si exposé publiquement.
- **HTTPS en production** : Render/Railway le gèrent automatiquement.
- **Téléphone du gérant** : configuré dans `MANAGER_PHONE` (variable d'env), pas en dur.
- **Numéros affichés sur le site** : actuellement `+33 6 44 69 10 32` en dur dans
  les HTML. À changer dans les 4 pages `public/*.html` si vous changez de numéro.

---

## Licence

Code privé — propriété de Bordeaux Privilège.
