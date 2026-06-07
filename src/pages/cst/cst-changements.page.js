/**
 * Gestion des changements.
 */
import { seedCst, getCstChangements } from '../../data/cst.data.js';
import { esc, riskLevelBadge, cstStatutBadge } from '../../components/cst/cst-utils.js';

export function renderCstChangements() {
  seedCst();
  const rows = getCstChangements()
    .map(
      (c) => `<tr>
      <td class="reg-id">${esc(c.id)}</td>
      <td style="font-weight:600">${esc(c.changement)}</td>
      <td>${esc(c.origine)}</td>
      <td style="font-size:var(--fs-sm)">${esc(c.impact)}</td>
      <td>${riskLevelBadge(c.niveau)}</td>
      <td>${cstStatutBadge(c.statut)}</td>
      <td>${esc(c.delai)}</td>
      <td><button type="button" class="btn bsm" data-cst-chg-edit="${esc(c.id)}">✏</button></td>
    </tr>`
    )
    .join('');

  return `<div data-page="cst-changements" class="xm-register xm-register--cst">
    <div class="card">
      <div class="ch"><span class="ct">Gestion des changements</span><button type="button" class="btn bsm bp" data-cst-chg-add>+ Nouveau changement</button></div>
      <table class="tbl"><thead><tr><th>ID</th><th>Changement</th><th>Origine</th><th>Impact</th><th>Niveau</th><th>Statut</th><th>Échéance</th><th></th></tr></thead>
      <tbody>${rows}</tbody></table>
    </div>
  </div>`;
}
