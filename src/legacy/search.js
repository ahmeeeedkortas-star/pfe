/** @legacy — Recherche globale (modules, pages, RC, NC) */
const SEARCH_INDEX = [
  { type: 'module', icon: '✉', label: 'Réclamations Clients', sub: 'ISO 9001 · Module RC', action: () => goModule('rc') },
  { type: 'module', icon: '⚠', label: 'Non-Conformités', sub: 'QRQC · Suivi NC', action: () => goModule('nc') },
  { type: 'module', icon: '◈', label: 'Contexte & Stratégie', sub: 'SWOT · Risques · Politique', action: () => goModule('cst') },
  { type: 'module', icon: '✓', label: 'Audit ISO', sub: 'Planning · Checklists · Constats', action: () => goModule('audit') },
  { type: 'module', icon: '📄', label: 'Documentation', sub: 'Bibliothèque documentaire QHSE', action: () => goModule('doc') },
  { type: 'module', icon: '⭐', label: 'Audits 5S', sub: 'Tri · Ordonnancement · Zones', action: () => goModule('fives') },
  { type: 'module', icon: '🛡', label: 'Sécurité SST', sub: 'ISO 45001 · DUERP', action: () => goModule('sec') },
  { type: 'module', icon: '🌿', label: 'Environnement', sub: 'ISO 14001 · Tableau de bord', action: () => goModule('env') },
  { type: 'page', icon: '⚙', label: 'Paramètres', sub: 'Mode sombre · Préférences', action: () => goPage('settings') },
  { type: 'page', icon: '≡', label: 'Liste des RC', sub: 'Réclamations Clients', action: () => goPage('rc-liste') },
  { type: 'page', icon: '+', label: 'Nouvelle réclamation', sub: 'Créer une RC', action: () => goPage('rc-new') },
  { type: 'page', icon: '◈', label: 'Traitement 8D', sub: 'Processus 8D', action: () => goPage('rc-8d') },
  { type: 'page', icon: '↺', label: 'Actions RC', sub: "Plan d'actions réclamations", action: () => goPage('rc-actions') },
  { type: 'page', icon: '◉', label: 'KPI Réclamations', sub: 'Indicateurs RC', action: () => goPage('rc-kpi') },
  { type: 'page', icon: '≡', label: 'Liste des NC', sub: 'Non-Conformités', action: () => goPage('nc-liste') },
  { type: 'page', icon: '+', label: 'Nouvelle NC', sub: 'Créer une non-conformité', action: () => goPage('nc-new') },
  { type: 'page', icon: '◉', label: 'KPI Non-Conformités', sub: 'Indicateurs NC', action: () => goPage('nc-kpi') },
  { type: 'page', icon: '📊', label: 'SWOT', sub: 'Contexte & stratégie', action: () => goPage('cst-swot') },
  { type: 'page', icon: '⚡', label: 'Risques & opportunités', sub: 'Contexte & stratégie', action: () => goPage('cst-risques') },
  { type: 'page', icon: '📋', label: 'Politique QHSE', sub: 'Engagements · Objectifs', action: () => goPage('cst-politique') },
  { type: 'page', icon: '📊', label: 'Tableau de bord Audit', sub: 'Module Audit ISO', action: () => goPage('audit-tb') },
  { type: 'page', icon: '📚', label: 'Bibliothèque documents', sub: 'Gestion documentaire QHSE', action: () => goPage('doc-biblio') },
  { type: 'page', icon: '≡', label: 'Liste audits 5S', sub: 'Score zones · Niveaux', action: () => goPage('fives-liste') },
  { type: 'page', icon: '🌿', label: 'Tableau de bord Environnement', sub: 'ISO 14001', action: () => goPage('env-dash') },
  { type: 'page', icon: '🌿', label: 'Aspects environnementaux', sub: 'ISO 14001 · Impacts', action: () => goPage('env-aspects') },
  { type: 'page', icon: '♻', label: 'Gestion des déchets', sub: 'Valorisation · Traçabilité', action: () => goPage('env-dechets') },
  { type: 'page', icon: '⚡', label: 'Suivi des consommations', sub: 'Électricité · Eau · Air', action: () => goPage('env-conso') },
  { type: 'page', icon: '⚗', label: 'Produits chimiques', sub: 'FDS · Registre chimique', action: () => goPage('env-chimiques') },
  { type: 'page', icon: '🛡', label: 'KPI Sécurité SST', sub: 'ISO 45001', action: () => goPage('sec-kpi') },
  { type: 'page', icon: '📊', label: 'Analyse des risques SST', sub: 'Matrice GFDC', action: () => goPage('sec-risques') },
];

let searchIdx = -1;

function getSearchPanel() {
  return document.getElementById('search-panel');
}

function openSearchPanel() {
  const panel = getSearchPanel();
  if (!panel) return;
  panel.hidden = false;
  panel.removeAttribute('hidden');
}

function hideSearchPanel() {
  const panel = getSearchPanel();
  if (!panel) return;
  panel.hidden = true;
  panel.setAttribute('hidden', '');
}

function doSearch(q) {
  const btn = document.getElementById('search-clear');
  if (btn) {
    btn.hidden = !q.trim();
    btn.classList.toggle('is-visible', !!q.trim());
  }
  if (!q.trim()) {
    closeSearch();
    return;
  }
  showSearchResults(q);
}

function showSearchResults(q) {
  const panel = getSearchPanel();
  if (!panel) return;
  const lq = q.toLowerCase().trim();
  if (!lq) {
    hideSearchPanel();
    return;
  }

  let results = SEARCH_INDEX.filter(
    (item) => item.label.toLowerCase().includes(lq) || item.sub.toLowerCase().includes(lq)
  );

  if (typeof RC_DATA !== 'undefined' && Array.isArray(RC_DATA)) {
    RC_DATA.filter((r) => [r.n, r.obj, r.cl, r.dep, r.r].join(' ').toLowerCase().includes(lq))
      .slice(0, 4)
      .forEach((r) => {
        results.push({
          type: 'rc',
          icon: '✉',
          label: `${r.n} — ${r.cl}`,
          sub: `RC · ${r.g} · ${r.s} · ${String(r.obj || '').slice(0, 48)}`,
          action: () => {
            if (typeof window.filterRC === 'function') window.filterRC(r.n);
            goPage('rc-liste');
          },
        });
      });
  }

  if (typeof NC_DATA !== 'undefined' && Array.isArray(NC_DATA)) {
    NC_DATA.filter((r) => [r.n, r.desc, r.dep, r.poste, r.r].join(' ').toLowerCase().includes(lq))
      .slice(0, 4)
      .forEach((r) => {
        results.push({
          type: 'nc',
          icon: '⚠',
          label: `${r.n} — ${r.dep}`,
          sub: `NC · ${r.g} · ${r.s} · ${String(r.desc || '').slice(0, 48)}`,
          action: () => {
            if (typeof window.filterNC === 'function') window.filterNC(r.n);
            goPage('nc-liste');
          },
        });
      });
  }

  window._xmSearchResults = results.slice(0, 12);
  searchIdx = -1;

  const typeLabel = { module: 'MODULE', page: 'PAGE', rc: 'RC', nc: 'NC' };
  const typeColor = { module: '#eff6ff', page: '#f0fdf4', rc: '#eff6ff', nc: '#fef2f2' };
  const typeBadge = { module: '#93c5fd', page: '#86efac', rc: '#60a5fa', nc: '#f87171' };

  openSearchPanel();

  if (!window._xmSearchResults.length) {
    panel.innerHTML = `<div class="search-panel__empty">
      <div class="search-panel__empty-icon" aria-hidden="true">🔍</div>
      Aucun résultat pour « <strong>${escapeHtml(q)}</strong> »
    </div>`;
    return;
  }

  const list = window._xmSearchResults;
  panel.innerHTML = `
    <div class="search-panel__head">
      ${list.length} résultat${list.length > 1 ? 's' : ''} pour « ${escapeHtml(q)} »
    </div>
    ${list
      .map(
        (item, i) => `
    <button type="button" class="sr-item" data-idx="${i}" data-search-idx="${i}">
      <span class="sr-item__icon" style="background:${typeColor[item.type] || '#f8fafc'}">${item.icon}</span>
      <span class="sr-item__body">
        <span class="sr-item__label">${escapeHtml(item.label)}</span>
        <span class="sr-item__sub">${escapeHtml(item.sub)}</span>
      </span>
      <span class="sr-item__badge" style="border-color:${typeBadge[item.type] || '#e5e7eb'};color:${typeBadge[item.type] || 'inherit'}">${typeLabel[item.type] || item.type.toUpperCase()}</span>
    </button>`
      )
      .join('')}`;

  panel.querySelectorAll('[data-search-idx]').forEach((el) => {
    el.addEventListener('click', () => execSearch(Number(el.dataset.searchIdx)));
    el.addEventListener('mouseenter', () => setSearchIdx(Number(el.dataset.searchIdx)));
  });
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function execSearch(idx) {
  const item = window._xmSearchResults?.[idx];
  if (item?.action) {
    item.action();
    clearSearch();
  }
}

function setSearchIdx(i) {
  searchIdx = i;
  document.querySelectorAll('.sr-item').forEach((el, idx) => {
    el.classList.toggle('is-active', idx === i);
  });
}

function searchKeydown(e) {
  const panel = getSearchPanel();
  if (!panel || panel.hidden) return;
  const items = document.querySelectorAll('.sr-item');
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    searchIdx = Math.min(searchIdx + 1, items.length - 1);
    setSearchIdx(searchIdx);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    searchIdx = Math.max(searchIdx - 1, 0);
    setSearchIdx(searchIdx);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (searchIdx >= 0) execSearch(searchIdx);
    else if (items.length) execSearch(0);
  } else if (e.key === 'Escape') {
    clearSearch();
  }
}

function clearSearch() {
  const inp = document.getElementById('search-input');
  const btn = document.getElementById('search-clear');
  const panel = getSearchPanel();
  if (inp) inp.value = '';
  if (btn) {
    btn.hidden = true;
    btn.classList.remove('is-visible');
  }
  hideSearchPanel();
  if (panel) panel.innerHTML = '';
  window._xmSearchResults = [];
  searchIdx = -1;
}

function closeSearch() {
  clearSearch();
}

Object.assign(window, {
  SEARCH_INDEX,
  searchIdx,
  doSearch,
  showSearchResults,
  execSearch,
  setSearchIdx,
  searchKeydown,
  clearSearch,
  closeSearch,
});
