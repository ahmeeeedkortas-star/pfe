/**
 * Registre — toutes les checklists enregistrées (localStorage).
 */
import {
  formatChecklistSavedAt,
  listAllChecklistRecords,
  openChecklistRecord,
} from '../../data/sec-checklist-instances.js';
import { ensureSecData } from '../../data/sec-metrics.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function statutBadge(statut) {
  const map = {
    Validé: 'bg3',
    NC: 'by',
    Brouillon: 'bgr',
    'Non démarré': 'bgr',
  };
  return map[statut] || 'bgr';
}

export function renderSecChecklistRegistre() {
  ensureSecData();
  const rows = listAllChecklistRecords();
  const validated = rows.filter((r) => r.statut === 'Validé').length;
  const drafts = rows.filter((r) => r.data.savedAt && r.statut !== 'Validé').length;

  const tbody = rows.length
    ? rows
        .map(
          (r) => `<tr>
        <td style="font-size:10px;white-space:nowrap">${esc(formatChecklistSavedAt(r.savedAt))}</td>
        <td><strong>${esc(r.label)}</strong><br><span style="font-size:10px;color:var(--muted)">${esc(r.typeLabel)}</span></td>
        <td>${esc(r.inspecteur)}</td>
        <td style="text-align:center"><strong>${r.score.pct}%</strong><br><span style="font-size:10px;color:var(--muted)">${r.score.oui}/${r.score.total} OUI</span></td>
        <td><span class="badge ${statutBadge(r.statut)}">${esc(r.statut)}</span>${r.score.non ? ` <span class="badge br">${r.score.non} NC</span>` : ''}</td>
        <td style="white-space:nowrap">
          <button type="button" class="btn bsm bp" data-cl-reg-open="${esc(r.key)}">Ouvrir</button>
        </td>
      </tr>`
        )
        .join('')
    : `<tr><td colspan="6" style="text-align:center;padding:24px;color:var(--muted)">
        Aucun enregistrement. Créez une checklist et cliquez sur <strong>Sauvegarder</strong> ou <strong>Valider</strong>.
      </td></tr>`;

  return `<div data-page="sec-cl-registre">
    <div class="card" style="padding:12px 14px;margin-bottom:12px">
      <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">
        <div style="flex:1">
          <h2 style="margin:0;font-size:15px;font-weight:700">Registre des checklists</h2>
          <p style="margin:4px 0 0;font-size:11px;color:var(--muted)">
            Enregistrements locaux du navigateur · ${rows.length} fiche(s) · ${validated} validée(s) · ${drafts} brouillon(s)
          </p>
        </div>
        <button type="button" class="btn" data-nav="sec-checklists">← Checklists</button>
      </div>
    </div>
    <div class="card" style="padding:0;overflow:hidden">
      <table class="tbl">
        <thead><tr>
          <th>Dernière sauvegarde</th>
          <th>Équipement / Fiche</th>
          <th>Inspecteur</th>
          <th>Score</th>
          <th>Statut</th>
          <th></th>
        </tr></thead>
        <tbody>${tbody}</tbody>
      </table>
    </div>
    <p style="font-size:10px;color:var(--muted);margin-top:10px">
      Les données sont stockées dans ce navigateur (clé <code>xm_cl_data</code>). Utilisez <strong>Sauvegarder</strong> pour un brouillon ou <strong>Valider</strong> pour clôturer un contrôle.
    </p>
  </div>`;
}

let regBound = false;

export function bindSecChecklistRegistre() {
  if (regBound) return;
  regBound = true;
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-cl-reg-open]');
    if (!btn) return;
    e.preventDefault();
    openChecklistRecord(btn.dataset.clRegOpen);
  });
}
