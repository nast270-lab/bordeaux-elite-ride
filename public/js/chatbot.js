(function () {
  const RESPONSES = [
    {
      triggers: ['bonjour', 'hello', 'salut', 'bonsoir', 'bj', 'hi'],
      text: 'Bonjour ! Je suis l\'assistant Bordeaux Privilège.\nComment puis-je vous aider ?',
      replies: ['💰 Tarifs', '🚗 Réserver', '✈️ Aéroport', '🧳 Bagages'],
    },
    {
      triggers: ['tarif', 'prix', 'coût', 'cout', 'combien', '2'],
      text: 'Nos tarifs fixes :\n\n✈️ Bordeaux → Aéroport — 40 €\n🚉 Aéroport → Gare St Jean — 50 €\n🏘️ Aéroport → Andernos — 75 €\n🌊 Bordeaux → Arcachon — 120 €\n🍷 Bordeaux → St Émilion — 90 €\n⛵ Bordeaux → Cap Ferret — 130 €\n\nPrix fixes, aucune surprise.',
      replies: ['🧮 Calculateur', '🚗 Réserver', '📞 Contact'],
    },
    {
      triggers: ['réserver', 'reserver', 'réservation', 'reservation', 'course', 'book', '1'],
      text: 'Pour réserver votre chauffeur, cliquez ci-dessous ou contactez-nous directement sur WhatsApp.',
      link: { text: '→ Formulaire de réservation', href: '/reservation' },
      replies: ['💰 Tarifs', '📞 Contact'],
    },
    {
      triggers: ['aéroport', 'aeroport', 'mérignac', 'merignac', 'vol', 'avion', 'navette'],
      text: '✈️ Navette aéroport Bordeaux-Mérignac disponible 24h/24.\n\nSuivi du vol en temps réel, aide aux bagages incluse. En cas de retard, nous nous adaptons sans frais supplémentaires.\n\nTarif fixe : 40 €',
      replies: ['🚗 Réserver', '🧳 Bagages', '📞 Contact'],
    },
    {
      triggers: ['bagage', 'bagages', 'valise', 'aide', 'chargement', '🧳'],
      text: '🧳 Aide aux bagages incluse sur toutes nos courses :\n\n• Chargement et déchargement\n• Véhicule spacieux (berline ou 7 places)\n• Aucun frais supplémentaire\n\nPour des bagages volumineux, précisez-le lors de la réservation.',
      replies: ['🚗 Réserver', '💰 Tarifs', '📞 Contact'],
    },
    {
      triggers: ['contact', 'appeler', 'téléphone', 'telephone', 'numero', 'numéro', '3'],
      text: '📞 +33 6 44 69 10 32\n💬 WhatsApp — 24h/24\n📧 contact@bordeaux-privilege.fr\n\nRéponse garantie sous 15 minutes.',
      replies: ['🚗 Réserver', '💰 Tarifs'],
    },
    {
      triggers: ['calculer', 'calculateur', 'estimer', 'estimation', 'devis'],
      text: 'Notre calculateur de tarif est disponible sur la page d\'accueil. Sélectionnez votre trajet pour voir le prix instantanément !',
      link: { text: '→ Voir le calculateur', href: '/#pricing' },
      replies: ['🚗 Réserver', '📞 Contact'],
    },
    {
      triggers: ['arcachon', 'bassin'],
      text: '🌊 Bordeaux → Arcachon : 120 €\nCap Ferret : 130 €\nTous points du Bassin sur demande.',
      replies: ['🚗 Réserver', '📞 Contact'],
    },
    {
      triggers: ['saint-émilion', 'saintemilion', 'saint emilion', 'emilion', 'vignoble', 'vin'],
      text: '🍷 Bordeaux → Saint-Émilion : 90 €\nVisites vignobles, excursions privées disponibles.',
      replies: ['🚗 Réserver', '💰 Tous les tarifs'],
    },
    {
      triggers: ['7 places', 'minivan', 'van', 'groupe', 'famille'],
      text: '🚐 Véhicule 7 places disponible pour les groupes et familles.\n\nConfort identique à la berline, capacité étendue.\nTarif : +30% sur le prix de base.',
      replies: ['🚗 Réserver', '💰 Tarifs', '📞 Contact'],
    },
  ];

  const DEFAULT = {
    text: 'Je n\'ai pas bien compris. Voici ce que je peux faire pour vous :',
    replies: ['💰 Tarifs', '🚗 Réserver', '✈️ Aéroport', '📞 Contact'],
  };

  const TRIGGER_MAP = {
    '💰 Tarifs': 'tarif',
    '💰 Tous les tarifs': 'tarif',
    '🚗 Réserver': 'réserver',
    '✈️ Aéroport': 'aéroport',
    '📞 Contact': 'contact',
    '🧮 Calculateur': 'calculateur',
    '🧳 Bagages': 'bagages',
  };

  function findResponse(text) {
    const lower = text.toLowerCase().trim();
    for (const r of RESPONSES) {
      if (r.triggers.some((t) => lower.includes(t))) return r;
    }
    return null;
  }

  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <button class="chatbot-btn" id="chatbot-btn" aria-label="Ouvrir le chat">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    </button>
    <div class="chatbot-panel" id="chatbot-panel" role="dialog" aria-label="Assistant Bordeaux Privilège">
      <div class="chatbot-header">
        <div class="chatbot-header-info">
          <div class="chatbot-avatar">B</div>
          <div>
            <strong>Assistant Bordeaux Privilège</strong>
            <span class="chatbot-status">● En ligne</span>
          </div>
        </div>
        <button class="chatbot-close" id="chatbot-close" aria-label="Fermer">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages"></div>
      <div class="chatbot-input-row">
        <input class="chatbot-input" id="chatbot-input" type="text" placeholder="Écrivez votre message…" autocomplete="off">
        <button class="chatbot-send" id="chatbot-send" aria-label="Envoyer">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);

  const btn = document.getElementById('chatbot-btn');
  const panel = document.getElementById('chatbot-panel');
  const closeBtn = document.getElementById('chatbot-close');
  const messagesEl = document.getElementById('chatbot-messages');
  const inputEl = document.getElementById('chatbot-input');
  const sendBtn = document.getElementById('chatbot-send');

  let opened = false;

  function addMessage(text, sender, link, replies) {
    const msg = document.createElement('div');
    msg.className = 'chatbot-msg chatbot-msg-' + sender;

    const bubble = document.createElement('div');
    bubble.className = 'chatbot-bubble';
    bubble.style.whiteSpace = 'pre-line';
    bubble.textContent = text;
    msg.appendChild(bubble);

    if (link) {
      const a = document.createElement('a');
      a.href = link.href;
      a.className = 'chatbot-link-btn';
      a.textContent = link.text;
      msg.appendChild(a);
    }

    if (replies && replies.length) {
      const row = document.createElement('div');
      row.className = 'chatbot-replies';
      replies.forEach((r) => {
        const b = document.createElement('button');
        b.className = 'chatbot-reply-btn';
        b.textContent = r;
        b.addEventListener('click', () => {
          row.querySelectorAll('button').forEach((x) => (x.disabled = true));
          handleInput(TRIGGER_MAP[r] || r);
        });
        row.appendChild(b);
      });
      msg.appendChild(row);
    }

    messagesEl.appendChild(msg);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function botReply(text, link, replies) {
    const typing = document.createElement('div');
    typing.className = 'chatbot-msg chatbot-msg-bot';
    typing.innerHTML = '<div class="chatbot-bubble chatbot-typing"><span></span><span></span><span></span></div>';
    messagesEl.appendChild(typing);
    messagesEl.scrollTop = messagesEl.scrollHeight;

    setTimeout(() => {
      typing.remove();
      addMessage(text, 'bot', link, replies);
    }, 900);
  }

  function openChat(proactiveMsg) {
    opened = true;
    panel.classList.add('open');
    btn.classList.add('active');
    if (messagesEl.children.length === 0) {
      const msg = proactiveMsg || 'Bonjour ! 👋 Je suis l\'assistant Bordeaux Privilège.\nComment puis-je vous aider ?';
      botReply(msg, null, ['💰 Tarifs', '🚗 Réserver', '✈️ Aéroport', '🧳 Bagages']);
    }
    inputEl.focus();
  }

  function handleInput(text) {
    if (!text.trim()) return;
    addMessage(text, 'user');
    inputEl.value = '';
    const r = findResponse(text);
    if (r) {
      botReply(r.text, r.link, r.replies);
    } else {
      botReply(DEFAULT.text, null, DEFAULT.replies);
    }
  }

  btn.addEventListener('click', () => {
    if (opened) {
      opened = false;
      panel.classList.remove('open');
      btn.classList.remove('active');
    } else {
      openChat();
    }
  });

  closeBtn.addEventListener('click', () => {
    opened = false;
    panel.classList.remove('open');
    btn.classList.remove('active');
  });

  sendBtn.addEventListener('click', () => handleInput(inputEl.value));
  inputEl.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleInput(inputEl.value);
  });

  // Auto-popup après 35 secondes si le client n'a pas encore interagi
  if (!sessionStorage.getItem('chatbot-seen')) {
    setTimeout(() => {
      if (!opened) {
        sessionStorage.setItem('chatbot-seen', '1');
        openChat('Bonjour 👋 Vous cherchez un chauffeur à Bordeaux ?\nJe peux vous donner un tarif en quelques secondes — quel est votre trajet ?');
      }
    }, 35000);
  }
})();
