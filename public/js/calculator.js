(function () {
  const ROUTES = {
    urban:       { label: 'Trajet urbain (centre-ville)', min: 15, max: 35 },
    airport:     { label: 'Navette aéroport Mérignac',   fixed: 45 },
    arcachon:    { label: 'Bordeaux → Arcachon',          fixed: 95 },
    saintemilion:{ label: 'Bordeaux → Saint-Émilion',     fixed: 55 },
    toulouse:    { label: 'Bordeaux → Toulouse',          fixed: 320 },
    biarritz:    { label: 'Bordeaux → Biarritz/Bayonne',  fixed: 180 },
    paris:       { label: 'Bordeaux → Paris',             fixed: 600 },
  };

  function calculate() {
    const routeEl = document.getElementById('calc-route');
    const vehicleEl = document.getElementById('calc-vehicle');
    const priceEl = document.getElementById('calc-price');
    const noteEl = document.getElementById('calc-note');
    if (!routeEl || !priceEl) return;

    const r = ROUTES[routeEl.value];
    const vehicle = vehicleEl ? vehicleEl.value : 'berline';
    const tripType = document.querySelector('.calc-toggle-btn.active');
    const isReturn = tripType && tripType.dataset.value === 'return';
    const vanMult = vehicle === 'van' ? 1.3 : 1;
    const returnMult = isReturn ? 1.8 : 1;

    if (r.fixed !== undefined) {
      const price = Math.round(r.fixed * vanMult * returnMult);
      priceEl.textContent = price + ' €';
      if (noteEl) noteEl.textContent = 'Prix fixe garanti — aucune surprise';
    } else {
      const min = Math.round(r.min * vanMult * returnMult);
      const max = Math.round(r.max * vanMult * returnMult);
      priceEl.textContent = min + ' – ' + max + ' €';
      if (noteEl) noteEl.textContent = 'Estimation selon la distance exacte';
    }
  }

  document.getElementById('calc-route')?.addEventListener('change', calculate);
  document.getElementById('calc-vehicle')?.addEventListener('change', calculate);

  document.querySelectorAll('.calc-toggle-btn').forEach((btn) => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.calc-toggle-btn').forEach((b) => b.classList.remove('active'));
      this.classList.add('active');
      calculate();
    });
  });

  calculate();
})();
