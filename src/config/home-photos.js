/**
 * Arrière-plan page d'accueil — photo usine / Industry 4.0.
 */
const local = (name) => `/home/${name}`;

/** Photo plein écran (public/home/factory-hero.png) */
export const HOME_HERO_BG = local('factory-hero.png');

/** Fond accueil unifié — atelier robotisé / usine (fichiers dans public/home/) */
export const HOME_UNIFIED_BG = local('factory-hero.png');
export const HOME_UNIFIED_BG_ALT = local('bg-platform.jpg');
export const HOME_UNIFIED_BG_ALT2 = local('industrial-hero.jpg');

export const HOME_ISO_BADGES = [
  { code: 'ISO 9001', title: 'Qualité', color: '#000080' },
  { code: 'ISO 14001', title: 'Environnement', color: '#22c55e' },
  { code: 'ISO 45001', title: 'SST', color: '#f97316' },
];

/** @typedef {{ id: string; label: string; topic: string; src: string; fallback: string; position?: string }} HomePhotoPanel */

/** @type {HomePhotoPanel[]} */
export const HOME_PHOTO_PANELS = [
  {
    id: 'robotics',
    label: 'Robotique',
    topic: 'Bras robotisés · cellules automatisées',
    src: local('robotics.jpg'),
    fallback:
      'https://images.unsplash.com/photo-1565043666747-69f6646db940?auto=format&fit=crop&w=1200&q=85',
    position: 'center 40%',
  },
  {
    id: 'automation',
    label: 'Automatisation',
    topic: 'Lignes de production · Industry 4.0',
    src: local('automation.jpg'),
    fallback:
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85',
    position: 'center center',
  },
  {
    id: 'machines',
    label: 'Machines spéciales',
    topic: 'Conception · fabrication sur mesure',
    src: local('special-machines.jpg'),
    fallback:
      'https://images.unsplash.com/photo-1504917593497-b003c963b148?auto=format&fit=crop&w=1200&q=85',
    position: 'center 35%',
  },
  {
    id: 'engineering',
    label: 'Ingénierie mécanique',
    topic: 'Études · plans · assemblage',
    src: local('mechanical-engineering.jpg'),
    fallback:
      'https://images.unsplash.com/photo-1581092918056-0cdbc059417a?auto=format&fit=crop&w=1200&q=85',
    position: 'center 30%',
  },
  {
    id: 'quality',
    label: 'Management qualité',
    topic: 'ISO 9001 · contrôle · SMI',
    src: local('quality-smi.jpg'),
    fallback:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85',
    position: 'center 25%',
  },
  {
    id: 'qhse',
    label: 'QHSE',
    topic: 'ISO 14001 · ISO 45001 · SST',
    src: local('qhse-sst-env.jpg'),
    fallback:
      'https://images.unsplash.com/photo-1504307651259-828c8a5e288c?auto=format&fit=crop&w=1200&q=85',
    position: 'center 40%',
  },
];

function photoUrls(panel) {
  return [panel.src, panel.fallback].map((u) => `url('${u}')`).join(', ');
}

/** Arrière-plan unique (remplace la mosaïque 6 panneaux). */
export function renderHomePhotoMosaic() {
  return `<div class="home-hero-bg" role="presentation" style="background-image:url('${HOME_HERO_BG}')"></div>`;
}

/** Fond photo pleine page — usine / robots / atelier (image locale garantie). */
export function renderHomeUnifiedBackground() {
  const alt = HOME_UNIFIED_BG_ALT;
  const alt2 = HOME_UNIFIED_BG_ALT2;
  return `<img
    class="home-hero-bg-img home-hero-bg--unified"
    src="${HOME_UNIFIED_BG}"
    alt=""
    loading="eager"
    decoding="async"
    fetchpriority="high"
    onerror="if(!this.dataset.fbk){this.dataset.fbk='1';this.src='${alt}';}else if(this.dataset.fbk==='1'){this.dataset.fbk='2';this.src='${alt2}';}"
  />`;
}

export function renderHomeIsoBar() {
  return `<div class="home-iso-bar" aria-label="Normes ISO">
    ${HOME_ISO_BADGES.map(
      (b) => `
    <div class="home-iso-bar__item" style="--iso-color:${b.color}">
      <span class="home-iso-bar__code">${b.code}</span>
      <span class="home-iso-bar__title">${b.title}</span>
    </div>`
    ).join('')}
  </div>`;
}

export const HOME_PHOTO_LAYERS = [];

export function renderPhotoLayer() {
  return '';
}
