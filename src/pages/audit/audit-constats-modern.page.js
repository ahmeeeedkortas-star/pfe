/**
 * Constats audit — NC et AC uniquement.
 */
import { migrateAuditConstats } from './audit-store.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;');
}

function typeBadge(t) {
  if (t === 'NC') return '<span class="badge br">NC</span>';
  return '<span class="badge" style="background:#f5f3ff;color:#6d28d9;border:1px solid #ddd6fe">AC</span>';
}

function gravBadge(g) {
  if (g === 'Critique') return '<span class="badge br">Critique</span>';
  if (g === 'Majeure') return '<span class="badge" style="background:#fef2f2;color:#b91c1c">Majeure</span>';
  if (g === 'Mineure') return '<span class="badge by">Mineure</span>';
  return `<span class="badge bb">${esc(g)}</span>`;
}

function statBadge(s) {
  const m = { Ouvert: 'br', 'En cours': 'bb', Clôturé: 'bg3' };
  return `<span class="badge ${m[s] || 'by'}">${esc(s)}</span>`;
}

export function renderAuditConstatsModern() {
  migrateAuditConstats();
  const C = window.AUDIT_CONSTATS || [];
  const f = window.auditConstatFilter || { type: '', statut: '', q: '' };
  if (!window.auditConstatFilter) window.auditConstatFilter = f;

  let filtered = C.filter((c) => c.type === 'NC' || c.type === 'AC');
  if (f.type) filtered = filtered.filter((c) => c.type === f.type);
  if (f.statut) filtered = filtered.filter((c) => c.statut === f.statut);
  if (f.q) {
    const q = f.q.toLowerCase();
    filtered = filtered.filter((c) => [c.id, c.desc, c.processus, c.resp].join(' ').toLowerCase().includes(q));
  }
  filtered.sort((a, b) => {
    if (a.type !== b.type) return a.type === 'NC' ? -1 : 1;
    const g = { Critique: 0, Majeure: 1, Mineure: 2 };
    return (g[a.gravite] ?? 3) - (g[b.gravite] ?? 3);
  });

  const nc = C.filter((c) => c.type === 'NC');
  const ac = C.filter((c) => c.type === 'AC');
  const summary = `<span class="badge br">${nc.length} NC</span> <span class="badge" style="background:#f5f3ff;color:#6d28d9">${ac.length} AC</span> <span style="font-size:12px;color:var(--muted);margin-left:8px">${nc.filter((c) => c.statut !== 'Clôturé').length} NC ouvertes</span>`;

  const rows = filtered
    .map((c) => {
      const cid = JSON.stringify(c.id);
      return `<tr>
        <td style="font-family:monospace;font-size:10px">${esc(c.id)}</td>
        <td>${typeBadge(c.type)}</td>
        <td style="font-size:var(--fs-sm)">${esc(c.dateDetect)}</td>
        <td>${esc(c.processus)}</td>
        <td style="max-width:220px">${esc(c.desc)}</td>
        <td>${gravBadge(c.gravite)}</td>
        <td>${statBadge(c.statut)}</td>
        <td>${esc(c.resp)}</td>
        <td style="font-size:var(--fs-xs)">${esc(c.delai || '—')}</td>
        <td><div style="display:flex;gap:4px">
          ${c.statut !== 'Clôturé' ? `<button type="button" class="btn bsm bg2" onclick="auditCloseConstat(${cid})">✓</button>` : ''}
          <button type="button" class="btn bsm bp" onclick="auditNewAction()">+ Action</button>
        </div></td>
      </tr>`;
    })
    .join('');

  return `<div class="content xm-v11-surface" data-page="audit-constats">
    <div class="filter-bar"><div class="filter-bar-body">
      <div style="display:flex;align-items:center;gap:6px">${summary}</div>
      <input class="fi" placeholder="Rechercher…" value="${esc(f.q)}" style="min-width:180px" oninput="window.auditConstatFilter.q=this.value;reloadPage('audit-constats')">
      <select class="filter-sel" onchange="window.auditConstatFilter.type=this.value;reloadPage('audit-constats')">
        <option value="">NC + AC</option><option value="NC"${f.type === 'NC' ? ' selected' : ''}>NC</option><option value="AC"${f.type === 'AC' ? ' selected' : ''}>AC</option>
      </select>
      <select class="filter-sel" onchange="window.auditConstatFilter.statut=this.value;reloadPage('audit-constats')">
        <option value="">Tous statuts</option>${['Ouvert', 'En cours', 'Clôturé'].map((s) => `<option value="${s}"${f.statut === s ? ' selected' : ''}>${s}</option>`).join('')}
      </select>
      <button type="button" class="btn bsm" onclick="auditExport('constats')">Export CSV</button>
      <button type="button" class="btn bsm bp" onclick="auditNewConstat()">+ Nouveau constat</button>
    </div></div>
    <div class="card"><div class="ch"><span class="ct">Constats — Non-conformités (NC) & Axes d'amélioration (AC)</span></div>
      <div style="overflow-x:auto"><table class="tbl">
        <thead><tr><th>N°</th><th>Type</th><th>Date</th><th>Processus</th><th>Description</th><th>Criticité</th><th>Statut</th><th>Resp.</th><th>Délai</th><th></th></tr></thead>
        <tbody>${rows || '<tr><td colspan="10" style="text-align:center;color:var(--muted)">Aucun constat</td></tr>'}</tbody>
      </table></div>
    </div>
  </div>`;
}
