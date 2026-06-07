/**
 * Clôture audit — récapitulatif programme annuel + validation.
 */
import { seedAudits } from '../../data/audits.data.js';
import { esc, auditToast, getAudits, statBadge, typeColor } from '../../components/audit/audit-utils.js';

export function renderAuditCloture() {
  seedAudits();
  const D = getAudits();
  const clos = D.filter((a) => a.statut === 'Clôturé');
  const open = D.filter((a) => a.statut !== 'Clôturé');
  const tx = D.length ? Math.round((clos.length / D.length) * 100) : 0;

  const rows = D.map(
    (a) => `<tr>
    <td><span style="font-weight:800;color:${typeColor(a.type)}">${esc(a.ref)}</span></td>
    <td>${esc(a.type)}</td>
    <td>${esc(a.dep)}</td>
    <td><span class="badge ${statBadge(a.statut)}">${esc(a.statut)}</span></td>
    <td style="font-weight:700">${a.score != null ? a.score + '%' : '—'}</td>
    <td>${a.ecarts ?? 0}</td>
    <td>${open.includes(a) ? `<button type="button" class="btn bsm bg2" data-audit-close-one="${esc(a.id)}">Clôturer</button>` : '✓'}</td>
  </tr>`
  ).join('');

  return `<div data-page="audit-cloture" class="xm-register xm-register--audit">
    <div class="audit-kpi-row" style="grid-template-columns:repeat(3,1fr);margin-bottom:14px">
      <div class="audit-kpi" style="background:#f0fdf4"><span style="font-size:18px">🏁</span><div class="audit-kpi-val" style="color:#16a34a">${clos.length}</div><div class="audit-kpi-lbl">Clôturés</div></div>
      <div class="audit-kpi" style="background:#fffbeb"><span style="font-size:18px">⏳</span><div class="audit-kpi-val" style="color:#d97706">${open.length}</div><div class="audit-kpi-lbl">À clôturer</div></div>
      <div class="audit-kpi" style="background:#eff6ff"><span style="font-size:18px">📈</span><div class="audit-kpi-val" style="color:#2563eb">${tx}%</div><div class="audit-kpi-lbl">Taux global</div></div>
    </div>
    <div class="audit-closure-bar" style="margin-bottom:14px">
      <div style="font-weight:700;margin-bottom:8px">Objectif annuel : 80% des audits clôturés</div>
      <div class="audit-closure-track"><div class="audit-closure-fill" style="width:${tx}%;background:${tx >= 80 ? '#16a34a' : '#f59e0b'}"></div><div class="audit-closure-marker" style="left:80%"></div></div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">État du programme d'audits</span>
        ${open.length ? `<button type="button" class="btn bsm bp" data-audit-close-all>Clôturer tous les audits en cours (${open.length})</button>` : ''}
      </div>
      <table class="tbl"><thead><tr><th>Réf.</th><th>Type</th><th>Dép.</th><th>Statut</th><th>Score</th><th>Écarts</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table>
    </div>
    ${tx >= 80 ? `<div class="card" style="background:#f0fdf4;border-color:#bbf7d0;text-align:center;padding:20px">
      <div style="font-size:28px;margin-bottom:8px">✅</div>
      <div style="font-weight:800;font-size:var(--fs-lg);color:#065f46">Objectif de clôture atteint</div>
      <p style="font-size:var(--fs-sm);color:#166534;margin-top:6px">Le programme d'audits ${new Date().getFullYear()} peut être validé.</p>
    </div>` : ''}
  </div>`;
}

let bound = false;
export function bindAuditCloture() {
  if (bound) return;
  bound = true;
  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-page="audit-cloture"]');
    if (!root) return;
    const one = e.target.closest('[data-audit-close-one]');
    if (one) {
      const a = getAudits().find((x) => x.id === one.dataset.auditCloseOne);
      if (a) {
        a.statut = 'Clôturé';
        a.prog = 100;
        auditToast(`${a.ref} clôturé`, '#16a34a');
        window.reloadPage?.('audit-cloture') ?? window.goPage?.('audit-cloture');
      }
      return;
    }
    if (e.target.closest('[data-audit-close-all]')) {
      getAudits().forEach((a) => {
        if (a.statut !== 'Clôturé') {
          a.statut = 'Clôturé';
          a.prog = 100;
        }
      });
      window.confettiBurst?.(window.innerWidth / 2, window.innerHeight / 3, 24);
      auditToast('Programme d\'audits clôturé', '#16a34a');
      window.reloadPage?.('audit-cloture') ?? window.goPage?.('audit-cloture');
    }
  });
}
