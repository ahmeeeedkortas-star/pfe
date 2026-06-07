/**
 * Configuration Audit — listes dynamiques.
 */
function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;');
}

export function renderAuditConfigModern() {
  const notifs = window.AUDIT_NOTIFICATIONS || [];
  const procs = window.AUDIT_PROCESSES || [];
  const types = window.AUDIT_TYPES || [];
  const auds = (window.AUDIT_AUDITEURS || []).map((a) => a.nom);

  const tiles = [
    ['🔔', 'Notifications', 'Alertes échéance et retards', 'auditRefreshNotifications()', 'Actualiser'],
    ['📋', 'Processus', `${procs.length} entrées`, 'auditManageProcesses()', 'Gérer'],
    ['🏷', "Types d'audit", `${types.length} entrées`, 'auditManageTypes()', 'Gérer'],
    ['👤', 'Auditeurs', `${auds.length} entrées`, 'auditManageAuditors()', 'Gérer'],
  ]
    .map(
      ([ic, title, sub, fn, btn]) =>
        `<div class="card xm-config-tile">
          <span class="xm-config-tile__ic">${ic}</span>
          <div class="xm-config-tile__title">${esc(title)}</div>
          <div class="xm-config-tile__sub">${esc(sub)}</div>
          <button type="button" class="btn bsm bp" onclick="${fn}">${esc(btn)}</button>
        </div>`
    )
    .join('');

  return `<div class="content xm-v11-surface" data-page="audit-config">
    <p class="xm-page-lead">Gérez les listes utilisées dans les formulaires : ajout, modification et suppression directement depuis chaque champ (bouton ⚙) ou ci-dessous.</p>
    <div class="xm-config-grid">${tiles}</div>
    <section class="card" style="margin-top:16px">
      <div class="ch"><span class="ct">Alertes actives</span><span class="badge ${notifs.length ? 'br' : 'bb'}">${notifs.length}</span></div>
      ${notifs.length ? `<p class="xm-empty-hint" style="margin:0">${notifs.length} notification(s) — consultez le tableau de bord.</p>` : '<p class="xm-empty-hint">Aucune alerte.</p>'}
    </section>
  </div>`;
}
