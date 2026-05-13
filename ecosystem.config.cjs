// Configuration PM2 — Hostinger VPS
// PM2 maintient le serveur Node.js en vie (redémarrage automatique si crash).
//
// Commandes utiles (en SSH) :
//   pm2 start ecosystem.config.cjs   → démarrer
//   pm2 restart bordeaux-privilege    → redémarrer après une mise à jour
//   pm2 logs bordeaux-privilege       → voir les logs en direct
//   pm2 save && pm2 startup           → relance automatique au reboot du serveur

module.exports = {
  apps: [
    {
      name: 'bordeaux-privilege',
      script: 'server.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '256M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        // Ne jamais mettre les vraies clés ici.
        // Utiliser un fichier .env sur le serveur ou les variables d'environnement Hostinger.
      },
    },
  ],
};
