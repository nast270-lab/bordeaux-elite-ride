// Shared interactions for all pages.

// Injecte les coordonnées depuis window.BP_CONFIG (défini dans config.js)
function applyPhoneConfig() {
  const cfg = window.BP_CONFIG;
  if (!cfg) return;

  // Liens tel:
  document.querySelectorAll('a[href^="tel:"]').forEach(function (el) {
    el.href = 'tel:' + cfg.phoneTel;
    if (el.textContent.trim().startsWith('+')) {
      el.textContent = cfg.phoneDisplay;
    }
  });

  // Liens WhatsApp (wa.me)
  document.querySelectorAll('a[href*="wa.me"]').forEach(function (el) {
    el.href = 'https://wa.me/' + cfg.phoneRaw;
  });

  // Placeholder du champ téléphone dans le formulaire de réservation
  var telInput = document.querySelector('input[type="tel"][placeholder]');
  if (telInput) telInput.placeholder = cfg.phoneDisplay;
}

applyPhoneConfig();

(function () {
  const header = document.getElementById('header');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.textContent = links.classList.contains('open') ? '✕' : '☰';
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.textContent = '☰';
      })
    );
  }

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }
})();
