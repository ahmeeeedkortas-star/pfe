/**
 * Scène SVG industrielle — fond page d'accueil (machines spéciales · robotique · SMI).
 * Opacité faible : lisibilité du dashboard préservée.
 */
export function renderIndustrialHomeScene() {
  const s = 'stroke-linecap="round" stroke-linejoin="round" fill="none"';
  return `<svg class="home-scene-svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="hi-red" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#e21b24" stop-opacity="0.35"/>
        <stop offset="100%" stop-color="#e21b24" stop-opacity="0"/>
      </linearGradient>
      <linearGradient id="hi-steel" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#52525b" stop-opacity="0.2"/>
        <stop offset="100%" stop-color="#a1a1aa" stop-opacity="0.05"/>
      </linearGradient>
      <pattern id="hi-dots" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1" fill="#0a0a0a" opacity="0.04"/>
      </pattern>
    </defs>

    <rect width="1600" height="900" fill="url(#hi-dots)"/>

    <!-- Flux processus qualité (PDCA / amélioration continue) -->
    <g class="home-scene-flow" opacity="0.14" ${s} stroke="#e21b24" stroke-width="1.2">
      <path d="M200 120 H520 M360 120 V280 M520 200 H720 M720 200 V360 M580 360 H380 M380 360 V520"/>
      <circle cx="200" cy="120" r="6" fill="#e21b24" stroke="none" opacity="0.5"/>
      <circle cx="520" cy="200" r="6" fill="#e21b24" stroke="none" opacity="0.5"/>
      <circle cx="720" cy="360" r="6" fill="#e21b24" stroke="none" opacity="0.5"/>
      <circle cx="380" cy="520" r="6" fill="#e21b24" stroke="none" opacity="0.5"/>
      <text x="188" y="108" fill="#52525b" font-size="11" font-weight="600" font-family="system-ui,sans-serif">Plan</text>
      <text x="508" y="188" fill="#52525b" font-size="11" font-weight="600" font-family="system-ui,sans-serif">Do</text>
      <text x="708" y="348" fill="#52525b" font-size="11" font-weight="600" font-family="system-ui,sans-serif">Check</text>
      <text x="368" y="508" fill="#52525b" font-size="11" font-weight="600" font-family="system-ui,sans-serif">Act</text>
    </g>

    <!-- Schéma technique / cotations -->
    <g class="home-scene-schema" opacity="0.1" ${s} stroke="#3f3f46" stroke-width="1">
      <rect x="1180" y="80" width="320" height="200" rx="4"/>
      <line x1="1180" y1="130" x2="1500" y2="130"/>
      <line x1="1180" y1="180" x2="1500" y2="180"/>
      <line x1="1240" y1="80" x2="1240" y2="280"/>
      <line x1="1380" y1="80" x2="1380" y2="280"/>
      <path d="M1200 100 h80 M1200 100 v20 M1280 100 v20"/>
      <circle cx="1320" cy="155" r="28"/>
      <path d="M1292 155 h56 M1320 127 v56"/>
    </g>

    <!-- Ligne de production automatisée -->
    <g class="home-scene-line" opacity="0.12" ${s} stroke="#27272a" stroke-width="2">
      <path d="M80 620 H1520"/>
      <path d="M80 650 H1520"/>
      <rect x="200" y="600" width="120" height="70" rx="6" fill="url(#hi-steel)" stroke="#52525b"/>
      <rect x="420" y="600" width="120" height="70" rx="6" fill="url(#hi-steel)" stroke="#52525b"/>
      <rect x="640" y="600" width="120" height="70" rx="6" fill="url(#hi-steel)" stroke="#52525b"/>
      <rect x="860" y="600" width="120" height="70" rx="6" fill="url(#hi-steel)" stroke="#52525b"/>
      <rect x="1080" y="600" width="120" height="70" rx="6" fill="url(#hi-steel)" stroke="#52525b"/>
      <rect x="1300" y="600" width="120" height="70" rx="6" fill="url(#hi-steel)" stroke="#52525b"/>
      <circle class="home-scene-wheel" cx="260" cy="635" r="14" stroke="#e21b24" stroke-width="1.5"/>
      <circle class="home-scene-wheel" cx="480" cy="635" r="14" stroke="#e21b24" stroke-width="1.5"/>
      <circle class="home-scene-wheel" cx="700" cy="635" r="14" stroke="#e21b24" stroke-width="1.5"/>
    </g>

    <!-- Bras robotisé -->
    <g class="home-scene-robot" opacity="0.13" transform="translate(120,380)" ${s} stroke="#18181b" stroke-width="2.5">
      <rect x="0" y="200" width="100" height="24" rx="4" fill="#f4f4f5"/>
      <rect x="30" y="120" width="40" height="90" rx="4" fill="url(#hi-steel)"/>
      <path d="M50 120 L50 40 L140 20 L200 80 L160 140 L80 160 Z" fill="none"/>
      <circle cx="50" cy="120" r="10" fill="#e21b24" opacity="0.4" stroke="none"/>
      <circle cx="140" cy="20" r="8" fill="#fff" stroke="#e21b24" stroke-width="2"/>
      <path d="M200 80 L260 60 L280 100" stroke="#e21b24" stroke-width="2" opacity="0.6"/>
      <rect x="268" y="88" width="36" height="20" rx="3" stroke="#e21b24" opacity="0.5"/>
    </g>

    <!-- Machine spéciale / portique -->
    <g class="home-scene-machine" opacity="0.11" transform="translate(1050,320)" ${s} stroke="#27272a" stroke-width="2">
      <rect x="0" y="180" width="380" height="20" rx="2" fill="#e4e4e7"/>
      <rect x="20" y="40" width="24" height="160"/>
      <rect x="336" y="40" width="24" height="160"/>
      <rect x="60" y="0" width="260" height="28" rx="4"/>
      <rect x="140" y="28" width="100" height="50" rx="4" fill="url(#hi-steel)"/>
      <path d="M100 200 v80 M280 200 v80 M100 280 h180"/>
      <circle cx="190" cy="70" r="22" stroke="#e21b24" stroke-width="1.5" opacity="0.7"/>
      <path d="M175 70 h30 M190 55 v30" stroke="#e21b24" opacity="0.5"/>
    </g>

    <!-- Contrôle qualité / capteurs -->
    <g class="home-scene-qc" opacity="0.12" transform="translate(720,180)" ${s} stroke="#059669" stroke-width="1.5">
      <rect x="0" y="0" width="200" height="120" rx="8" stroke="#52525b"/>
      <path d="M20 90 L60 50 L100 70 L180 30" stroke="#e21b24" stroke-width="2"/>
      <circle cx="180" cy="30" r="5" fill="#e21b24"/>
      <text x="12" y="24" fill="#52525b" font-size="10" font-weight="700" font-family="monospace">KPI</text>
      <text x="12" y="108" fill="#52525b" font-size="9" font-family="system-ui,sans-serif">Contrôle · Mesure</text>
    </g>

    <!-- Anneau SMI -->
    <g class="home-scene-smi" opacity="0.09" transform="translate(1320,520)">
      <circle cx="0" cy="0" r="90" ${s} stroke="#e21b24" stroke-width="1.5"/>
      <circle cx="0" cy="0" r="60" ${s} stroke="#3f3f46" stroke-width="1"/>
      <text x="-42" y="6" fill="#52525b" font-size="14" font-weight="800" font-family="system-ui,sans-serif" letter-spacing="0.2em">SMI</text>
    </g>

    <!-- Halo marque -->
    <ellipse cx="400" cy="200" rx="280" ry="120" fill="url(#hi-red)" opacity="0.5"/>
    <ellipse cx="1200" cy="650" rx="320" ry="140" fill="url(#hi-red)" opacity="0.35"/>
  </svg>`;
}

/** Bandeaux ISO flottants */
export function renderHomeIsoStrip() {
  return `<div class="home-iso-float" aria-hidden="true">
    <span class="home-iso-chip home-iso-chip--9001">ISO 9001</span>
    <span class="home-iso-chip home-iso-chip--14001">ISO 14001</span>
    <span class="home-iso-chip home-iso-chip--45001">ISO 45001</span>
  </div>`;
}

/** Piliers SMI */
export function renderHomeSmiPillars() {
  const items = [
    { k: 'Qualité', iso: 'ISO 9001', c: '#e21b24' },
    { k: 'Environnement', iso: 'ISO 14001', c: '#059669' },
    { k: 'SST', iso: 'ISO 45001', c: '#ea580c' },
    { k: 'Amélioration continue', iso: 'PDCA', c: '#52525b' },
  ];
  return `<div class="home-smi-pillars">
    ${items
      .map(
        (p) => `<div class="home-smi-pillar" style="--pillar-color:${p.c}">
      <span class="home-smi-pillar__k">${p.k}</span>
      <span class="home-smi-pillar__iso">${p.iso}</span>
    </div>`
      )
      .join('')}
  </div>`;
}
