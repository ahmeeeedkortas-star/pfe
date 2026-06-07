/** Champs métadonnées ISO — création / édition. */
import { renderXmDynamicSelect } from '../../core/dynamic-lists.js';
import { nextDocCode, todayFr } from './doc-store.js';

export function renderDocMetaFields(prefix, existing = null) {
  const code = existing?.code || nextDocCode(existing?.type);
  const version = existing?.version || 'V1.0';
  const dateRev = existing?.dateRevision || todayFr();

  return `
    <div class="doc-meta-field">
      <label class="doc-meta-label">Code document *</label>
      <input id="${prefix}code" class="fi" value="${code}" placeholder="Ex : PR-QUA-001" style="width:100%">
    </div>
    <div class="doc-meta-field">
      <label class="doc-meta-label">Titre *</label>
      <input id="${prefix}titre" class="fi" value="${existing?.titre ? String(existing.titre).replace(/"/g, '&quot;') : ''}" placeholder="Ex : Procédure contrôle qualité…" style="width:100%">
    </div>
    ${renderXmDynamicSelect({ id: `${prefix}type`, listKey: 'doc.types', label: 'Type de document', selected: existing?.type || 'Instruction' })}
    ${renderXmDynamicSelect({ id: `${prefix}proc`, listKey: 'doc.processes', label: 'Processus concerné', selected: existing?.processus || 'Qualité' })}
    ${renderXmDynamicSelect({ id: `${prefix}service`, listKey: 'doc.zones', label: 'Service concerné', selected: existing?.service || existing?.zone || 'Direction' })}
    <div class="doc-meta-field">
      <label class="doc-meta-label">Version</label>
      <input id="${prefix}version" class="fi" value="${version}" style="width:100%">
    </div>
    ${renderXmDynamicSelect({ id: `${prefix}auteur`, listKey: 'global.responsibles', label: 'Auteur', selected: existing?.auteur || existing?.resp || 'KORTAS.A' })}
    ${renderXmDynamicSelect({ id: `${prefix}approbateur`, listKey: 'global.responsibles', label: 'Approbateur', selected: existing?.approbateur || '' })}
    <div class="doc-meta-field">
      <label class="doc-meta-label">Date de révision</label>
      <input id="${prefix}date-revision" class="fi" value="${dateRev}" style="width:100%">
    </div>
    <div class="doc-meta-field">
      <label class="doc-meta-label">Description / périmètre</label>
      <textarea id="${prefix}desc" class="fi" placeholder="Objet et périmètre du document…" style="width:100%;min-height:72px;resize:vertical">${existing?.desc || ''}</textarea>
    </div>`;
}
