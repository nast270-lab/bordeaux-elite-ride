/**
 * Bordeaux Elite Ride — Chatbot IA Widget
 */
'use strict';

(function () {
    const cfg       = window.berConfig || {};
    const toggle    = document.getElementById('chatbot-toggle');
    const closeBtn  = document.getElementById('chatbot-close');
    const widget    = document.getElementById('chatbot-widget');
    const messages  = document.getElementById('chatbot-messages');
    const form      = document.getElementById('chatbot-form');
    const input     = document.getElementById('chatbot-input');
    const sendBtn   = form?.querySelector('button[type="submit"]');

    if (!toggle || !widget || !form) return;

    let isOpen      = false;
    let isLoading   = false;
    let history     = [];

    // ─── Toggle widget ────────────────────────────────────────────
    function openWidget() {
        isOpen = true;
        widget.classList.add('open');
        widget.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.classList.add('active');
        input?.focus();
    }

    function closeWidget() {
        isOpen = false;
        widget.classList.remove('open');
        widget.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.classList.remove('active');
    }

    toggle.addEventListener('click', () => isOpen ? closeWidget() : openWidget());
    closeBtn?.addEventListener('click', closeWidget);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen) closeWidget();
    });

    // ─── Messages ─────────────────────────────────────────────────
    function addMessage(role, content, extraContent = null) {
        const div = document.createElement('div');
        div.className = `chatbot-message ${role}`;

        const p = document.createElement('p');
        p.textContent = content;
        div.appendChild(p);

        if (extraContent) div.appendChild(extraContent);
        messages.appendChild(div);
        scrollToBottom();
        return div;
    }

    function addTypingIndicator() {
        const typing = document.createElement('div');
        typing.className = 'chatbot-typing';
        typing.id = 'chatbot-typing';
        typing.setAttribute('aria-label', 'Réponse en cours...');
        for (let i = 0; i < 3; i++) {
            const span = document.createElement('span');
            typing.appendChild(span);
        }
        messages.appendChild(typing);
        scrollToBottom();
        return typing;
    }

    function removeTypingIndicator() {
        document.getElementById('chatbot-typing')?.remove();
    }

    function scrollToBottom() {
        messages.scrollTop = messages.scrollHeight;
    }

    function createEscaladeBlock(phone, whatsapp) {
        const div = document.createElement('div');
        div.className = 'chatbot-escalade';
        div.innerHTML = `
            <strong>Parler à un humain ?</strong>
            <a href="tel:${phone.replace(/\s/g, '')}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.1 19.79 19.79 0 0 1 1.61 4.5 2 2 0 0 1 3.6 2.32h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.87-1.87a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Appeler (${phone})
            </a>
            <a href="https://wa.me/${whatsapp}?text=${encodeURIComponent('Bonjour, je viens du chatbot et souhaite de l\'aide.')}" target="_blank" rel="noopener noreferrer">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                WhatsApp
            </a>
        `;
        return div;
    }

    // ─── Envoyer un message ───────────────────────────────────────
    async function sendMessage(text) {
        if (isLoading || !text.trim()) return;
        isLoading = true;
        if (sendBtn) sendBtn.disabled = true;

        const userMsg = text.trim();
        if (input) input.value = '';

        addMessage('user', userMsg);
        history.push({ role: 'user', content: userMsg });

        const typing = addTypingIndicator();

        try {
            const formData = new FormData();
            formData.append('action', 'ber_chatbot');
            formData.append('nonce', cfg.nonceChatbot || '');
            formData.append('message', userMsg);
            formData.append('history', JSON.stringify(history.slice(-8)));

            const resp = await fetch(cfg.ajaxUrl || '/wp-admin/admin-ajax.php', {
                method: 'POST',
                body: formData,
            });
            const data = await resp.json();

            removeTypingIndicator();

            if (data.success) {
                const reply   = data.data?.message || '';
                const escalade = data.data?.escalate;
                const phone   = data.data?.phone || cfg.phone;
                const wa      = data.data?.whatsapp || cfg.whatsapp;

                history.push({ role: 'assistant', content: reply });
                const extra = escalade ? createEscaladeBlock(phone, wa) : null;
                addMessage('assistant', reply, extra);
            } else {
                const errMsg = data.data?.message || 'Désolé, je rencontre un problème. Contactez-nous directement.';
                const escalade = data.data?.escalate;
                const extra = escalade ? createEscaladeBlock(cfg.phone, cfg.whatsapp) : null;
                addMessage('assistant', errMsg, extra);
            }
        } catch {
            removeTypingIndicator();
            addMessage('assistant', 'Désolé, une erreur est survenue. Veuillez réessayer.');
        } finally {
            isLoading = false;
            if (sendBtn) sendBtn.disabled = false;
            input?.focus();
        }
    }

    // ─── Soumission du formulaire ─────────────────────────────────
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = input?.value?.trim();
        if (msg) sendMessage(msg);
    });

    // ─── Quick replies ─────────────────────────────────────────────
    messages.addEventListener('click', (e) => {
        const btn = e.target.closest('.quick-reply');
        if (btn) {
            sendMessage(btn.dataset.message || btn.textContent);
        }
    });

    // ─── Enter to send ────────────────────────────────────────────
    input?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            form.dispatchEvent(new Event('submit'));
        }
    });
})();
