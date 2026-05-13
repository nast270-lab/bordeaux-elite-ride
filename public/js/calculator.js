(function () {
  const ROUTES = {
    airport:      { label: 'Bordeaux → Aéroport Mérignac',  fixed: 40 },
    airportGare:  { label: 'Aéroport → Gare St Jean',       fixed: 50 },
    airportAndernos: { label: 'Aéroport → Andernos',        fixed: 75 },
    arcachon:     { label: 'Bordeaux → Arcachon',            fixed: 120 },
    saintemilion: { label: 'Bordeaux → Saint-Émilion',       fixed: 90 },
    capferret:    { label: 'Bordeaux → Cap Ferret',          fixed: 130 },
    urban:        { label: 'Trajet urbain (centre-ville)',    min: 15, max: 35 },
  };

  function calculate() {
    const routeEl = document.getElementById('calc-route');
    const vehicleEl = document.getElementById('calc-vehicle');
    const priceEl = document.getElementById('calc-price');
    const noteEl = document.getElementById('calc-note');
    if (!routeEl || !priceEl) return;

    const r = ROUTES[routeEl.value];
    if (!r) return;
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
      if (noteEl) noteEl.textContent = 'Estimation selon distance exacte';
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
