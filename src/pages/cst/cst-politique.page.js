/**
 * Politique QHSE — éditeur Word-like + métadonnées.
 */
import { seedCst, getCstPolitique } from '../../data/cst.data.js';
import { esc } from '../../components/cst/cst-utils.js';
import { printCstTable } from '../../components/cst/cst-export.js';
import { renderRichEditorHtml } from '../../components/cst/cst-rich-editor.js';
import { bindPolitiqueActions } from '../../components/cst/cst-politique-actions.js';
import { matchesPeriod } from '../../components/cst/cst-entity-revisions.js';
import {
  getTraceFilter,
  renderModuleHistoryPanel,
  renderTraceHistoryBtn,
  renderTraceToolbar,
} from '../../components/cst/cst-trace-ui.js';

export function renderCstPolitique() {
  seedCst();
  const p = getCstPolitique() || {};
  const html = p.contenuHtml || `<p>${esc(p.texte || '')}</p>`;
  const status = p.statut || 'Brouillon';
  const axes = (p.axes || [])
    .map((ax, i) => {
      const col = i % 3 === 0 ? '#2563eb' : i % 3 === 1 ? '#dc2626' : '#16a34a';
      return `<div class="cst-pol-axe-card" style="border-left-color:${col}">
        <div class="cst-pol-axe-head">
          <span class="cst-pol-axe-ic">${esc(ax.ic || '•')}</span>
          <strong>${esc(ax.titre || 'Axe')}</strong>
          <button type="button" class="btn bsm" data-cst-pol-del-axe="${i}" title="Supprimer">−</button>
        </div>
        <p>${esc(ax.texte || '')}</p>
      </div>`;
    })
    .join('');
  const signatures = (p.signatures || [])
    .map(
      (s) =>
        `<div class="cst-pol-sign-row"><strong>${esc(s.nom || '—')}</strong><span>${esc(s.role || '')}</span><span>${esc(s.date || '')}</span></div>`
    )
    .join('');

  const trace = getTraceFilter('cst-politique');
  const revisions = (p.revisions || [])
    .filter((r) => matchesPeriod(r.date, trace.period))
    .map((r) => {
      const sc = r.statut === 'Validée' || r.statut === 'Publié' ? 'bg3' : 'bb';
      const archived = r.statut === 'Archivée' || r.statut === 'Obsolète';
      return `<div class="cst-pol-rev${archived ? ' cst-pol-rev--archived' : ''}"><span class="cst-pol-rev-v">${esc(r.version)}</span><span>${esc(r.date)}</span><span class="badge ${sc}">${esc(r.statut)}</span><span style="font-size:var(--fs-xs);color:var(--muted)">${esc(r.note || r.auteur || '')}</span></div>`;
    })
    .join('');

  return `<div data-page="cst-politique" class="xm-register xm-register--cst cst-pol-word">
    <div class="cst-pol-banner">
      <div>
        <div class="cst-pol-banner-kicker">ISO 9001 / 14001 / 45001</div>
        <div class="cst-pol-banner-title">${esc(p.titre || 'Politique du Systeme de Management Integre')}</div>
        <div class="cst-pol-banner-meta">Créé le ${esc(p.dateCreation || '—')} · MAJ ${esc(p.dateMiseAJour || '—')} · Version ${esc(p.revision || 'V01')} · Par ${esc(p.updatedBy || p.signataire || '—')}</div>
      </div>
      <div class="cst-toolbar-actions">
        <button type="button" class="btn bsm" data-cst-pol-edit-toggle onclick="window.cstPolFocusEditor?.()">✏ Editer</button>
        <button type="button" class="btn bsm" data-cst-pol-add-axe onclick="window.cstPolAddAxe?.()">+ Axe</button>
      </div>
    </div>
    <div class="cst-pol-layout">
      <div class="card cst-pol-card">
      <div class="cst-pol-header">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;flex-wrap:wrap">
          <div>
            <div class="cst-pol-header-title">${esc(p.titre || 'Politique QHSE')}</div>
            <div class="cst-pol-header-sub">${esc(p.sousTitre || '')}</div>
          </div>
          <div class="cst-toolbar-actions">
            <button type="button" class="btn bsm" data-cst-pol-edit-toggle onclick="window.cstPolFocusEditor?.()">✏ Modifier</button>
            <button type="button" class="btn bsm bp" data-cst-pol-save onclick="window.cstPolSave?.()">💾 Enregistrer</button>
            <button type="button" class="btn bsm bg2" data-cst-pol-publish onclick="window.cstPolPublish?.()">📢 Publier version</button>
            <button type="button" class="btn bsm" data-cst-pol-export-pdf onclick="window.cstPolExportPdf?.()">PDF</button>
            <button type="button" class="btn bsm" data-cst-pol-export-word onclick="window.cstPolExportWord?.()">Word</button>
            <button type="button" class="btn bsm" data-cst-pol-print onclick="window.cstPolPrint?.()">🖨 Imprimer</button>
          </div>
        </div>
      </div>
      <div class="cst-pol-meta-board">
        <div><span>Version</span><strong id="cst-pol-meta-ver">${esc(p.revision || 'V01')}</strong></div>
        <div><span>Mise à jour</span><strong id="cst-pol-meta-upd">${esc(p.dateMiseAJour || '—')}</strong></div>
        <div><span>Dernière publication</span><strong id="cst-pol-meta-pub">${esc(p.dernierePublication || p.dateSignature || '—')}</strong></div>
        <div><span>Statut</span><strong><span class="badge ${status === 'Publié' ? 'bg3' : 'bb'}" id="cst-pol-meta-status">${esc(status)}</span></strong></div>
      </div>
      <div class="cst-pol-editor-wrap">
        ${renderRichEditorHtml('cst_pol_inline_editor', html)}
        <div class="cst-pol-autosave" id="cst-pol-autosave-state">Autosave actif</div>
      </div>
      <div class="cst-pol-axes-wrap">
        <div class="ch"><span class="ct">Axes de la politique</span></div>
        ${axes || '<div style="font-size:var(--fs-sm);color:var(--muted)">Aucun axe.</div>'}
      </div>
      <div class="cst-pol-sign">
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
          <strong>Signatures d'approbation</strong>
          <button type="button" class="btn bsm" data-cst-pol-add-signature onclick="window.cstPolAddSignature?.()">+ Ajouter signature</button>
        </div>
        <div id="cst-pol-signatures" style="margin-top:8px">${signatures || '<div style="font-size:var(--fs-sm);color:var(--muted)">Aucune signature</div>'}</div>
      </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px">
        <div class="card">
          <div class="ch"><span class="ct">Informations document</span></div>
          <div class="cst-pol-info-row"><span>Date de creation</span><strong>${esc(p.dateCreation || '—')}</strong></div>
          <div class="cst-pol-info-row"><span>Date mise a jour</span><strong>${esc(p.dateMiseAJour || '—')}</strong></div>
          <div class="cst-pol-info-row"><span>Version actuelle</span><strong>${esc(p.revision || 'V01')}</strong></div>
          <div class="cst-pol-info-row"><span>Signataire</span><strong>${esc(p.signataire || '—')}</strong></div>
          <div class="cst-pol-info-row"><span>Organisation</span><strong>XPERT-MECA</strong></div>
          <div style="display:flex;gap:8px;margin-top:8px">
            <button type="button" class="btn bsm" data-cst-pol-meta onclick="window.cstPolOpenMeta?.()">✏ Modifier infos</button>
            <button type="button" class="btn bsm bg2" data-cst-pol-publish onclick="window.cstPolPublish?.()">+ Révision</button>
          </div>
        </div>
        <div class="card">
          <div class="ch"><span class="ct">Historique des révisions</span>${renderTraceHistoryBtn('politique', 'POL')}</div>
          ${renderTraceToolbar('cst-politique', { responsableLabel: 'Responsable', statuts: ['Publié', 'Brouillon', 'Validée', 'Archivée'] })}
          ${revisions || '<p style="font-size:var(--fs-sm);color:var(--muted)">Aucune révision</p>'}
        </div>
      </div>
    </div>
    ${renderModuleHistoryPanel('cst-politique')}
  </div>`;
}

export function afterRenderCstPolitique() {
  bindPolitiqueActions();
  requestAnimationFrame(() => {
    const c = document.getElementById('content');
    if (c) c.style.pointerEvents = '';
  });
}

export function exportCstPolitiquePdf() {
  printCstTable('Politique QHSE — XPERT MECA');
}
