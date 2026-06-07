/**
 * Analyse cause racine — 5 Pourquoi & diagramme 5M (Ishikawa).
 */

const CATS_5M = [
  { key: 'machine', label: 'Machine', icon: '⚙' },
  { key: 'methode', label: 'Méthode', icon: '📋' },
  { key: 'main', label: 'Main-d\'œuvre', icon: '👷' },
  { key: 'matiere', label: 'Matière', icon: '📦' },
  { key: 'milieu', label: 'Milieu', icon: '🌍' },
];

function ensure5P(key) {
  if (!window[key] || !Array.isArray(window[key])) {
    window[key] = ['', '', '', '', ''];
  }
  return window[key];
}

function ensure5M(key) {
  if (!window[key] || typeof window[key] !== 'object') {
    window[key] = { machine: [], methode: [], main: [], matiere: [], milieu: [] };
  }
  CATS_5M.forEach((c) => {
    if (!Array.isArray(window[key][c.key])) window[key][c.key] = [];
  });
  return window[key];
}

export function getWhyChain(key) {
  const arr = ensure5P(key).filter(Boolean);
  return arr.length ? arr.join(' → ') : '—';
}

export function get5MSummary(key) {
  const data = ensure5M(key);
  const parts = CATS_5M.flatMap((c) =>
    (data[c.key] || []).filter(Boolean).map((v) => `${c.label}: ${v}`)
  );
  return parts.length ? parts.join(' · ') : '—';
}

/**
 * @param {string} key - clé window (ex. 'rc_d4_why')
 * @param {string} [pageId] - refresh après saisie
 */
export function render5Pourquoi(key, pageId) {
  const arr = ensure5P(key);
  const chain = getWhyChain(key);

  const fields = arr
    .map(
      (val, i) => `
    <div class="fg" style="margin-bottom:8px">
      <label class="fl">Pourquoi ${i + 1} ${i === 0 ? '<span>*</span>' : ''}</label>
      <input class="fi" value="${escapeAttr(val)}"
        placeholder="Pourquoi ${i + 1}…"
        oninput="window['${key}'][${i}]=this.value;document.getElementById('why-chain-${key}').textContent=window.getWhyChain('${key}');">
    </div>`
    )
    .join('');

  return `
    <div style="font-size:10px;color:var(--muted);margin-bottom:10px">
      Chaîne causale : <strong id="why-chain-${key}" style="color:var(--navy)">${chain}</strong>
    </div>
    ${fields}
    <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px;margin-top:6px">
      <div style="font-size:9px;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:4px">Cause racine (dernier niveau)</div>
      <div style="font-size:11.5px;font-weight:600;color:#991b1b">${arr.filter(Boolean).pop() || '—'}</div>
    </div>`;
}

/**
 * @param {string} key - clé window (ex. 'nc_qrqc_5m')
 */
export function render5M(key, pageId) {
  const data = ensure5M(key);

  const grid = CATS_5M.map((c) => {
    const items = data[c.key] || [];
    const list = items
      .map(
        (item, idx) => `
      <label style="display:flex;align-items:center;gap:6px;font-size:10px;margin-bottom:4px;cursor:pointer">
        <input type="checkbox" checked
          onchange="if(!this.checked){window['${key}']['${c.key}'].splice(${idx},1);${pageId ? `goPage('${pageId}')` : ''}}">
        <span>${escapeHtml(item)}</span>
      </label>`
      )
      .join('');

    return `
    <div style="background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:10px">
      <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:6px">${c.icon} ${c.label}</div>
      ${list || '<div style="font-size:9px;color:var(--muted)">Aucune cause</div>'}
      <div style="display:flex;gap:4px;margin-top:6px">
        <input class="fi" id="5m-in-${key}-${c.key}" placeholder="Ajouter…" style="flex:1;font-size:10px">
        <button type="button" class="btn bsm"
          onclick="(function(){const v=document.getElementById('5m-in-${key}-${c.key}').value.trim();if(!v)return;window['${key}']['${c.key}'].push(v);${pageId ? `goPage('${pageId}')` : ''}})()">+</button>
      </div>
    </div>`;
  }).join('');

  return `
    <div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px;margin-bottom:10px">${grid}</div>
    <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;padding:10px">
      <div style="font-size:9px;font-weight:700;color:#1e40af;margin-bottom:4px">Synthèse 5M</div>
      <div style="font-size:11px">${get5MSummary(key)}</div>
    </div>`;
}

function escapeAttr(s) {
  return String(s ?? '').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function escapeHtml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
