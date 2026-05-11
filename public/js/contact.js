(function () {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const button = document.getElementById('submit-btn');
  if (!form) return;

  function showStatus(msg, isError = false) {
    status.textContent = msg;
    status.classList.toggle('error', isError);
    status.classList.add('visible');
    status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (button.disabled) return;

    const data = Object.fromEntries(new FormData(form));

    if (!data.name || !data.email || !data.message) {
      showStatus('Merci de remplir tous les champs obligatoires.', true);
      return;
    }
    if (data.message.length < 10) {
      showStatus('Votre message est un peu trop court.', true);
      return;
    }

    button.disabled = true;
    const originalLabel = button.textContent;
    button.textContent = 'Envoi en cours…';
    status.classList.remove('visible');

    try {
      const resp = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await resp.json().catch(() => ({}));
      if (!resp.ok || !json.ok) {
        throw new Error(json.error || `Erreur ${resp.status}`);
      }
      showStatus('✓ Message bien reçu. Nous vous répondons sous 24h.');
      form.reset();
    } catch (err) {
      console.error(err);
      showStatus('Une erreur est survenue. Appelez-nous au +33 6 44 69 10 32.', true);
    } finally {
      button.disabled = false;
      button.textContent = originalLabel;
    }
  });
})();
