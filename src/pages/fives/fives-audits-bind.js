/**
 * Bindings — interface unifiée Audits & Planning 5S.
 */
import { persistFivesV11 } from './fives-persist.js';

function reload() {
  window.reloadPage?.('5s-audit');
}

function notifyUpcomingAudits() {
  const key = 'ss5_notif_day';
  const today = new Date().toDateString();
  if (sessionStorage.getItem(key) === today) return;
  sessionStorage.setItem(key, today);

  const now = new Date();
  const in7 = new Date(now);
  in7.setDate(in7.getDate() + 7);

  const upcoming = (window.SS5_AUDITS || []).filter((a) => {
    if (a.statut !== 'Planifié' && a.statut !== 'En retard') return false;
    const m = String(a.date).match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!m) return false;
    const d = new Date(+m[3], +m[2] - 1, +m[1]);
    return d >= now && d <= in7;
  });

  if (upcoming.length) {
    window.ss5Notify?.(
      `${upcoming.length} audit${upcoming.length > 1 ? 's' : ''} programmé${upcoming.length > 1 ? 's' : ''}`,
      upcoming.map((a) => `${a.date} — ${a.zone}`).slice(0, 3).join(' · '),
      'info'
    );
  }
}

export function bindFivesAuditsPage() {
  const root = document.getElementById('ss5-audits-root');
  if (!root || root.dataset.bound) return;
  root.dataset.bound = '1';

  notifyUpcomingAudits();

  root.addEventListener('click', (e) => {
    const t = e.target.closest('[data-ss5-aud-tab]');
    if (t) {
      window.ss5AudTab = t.dataset.ss5AudTab;
      reload();
      return;
    }

    const v = e.target.closest('[data-ss5-aud-view]');
    if (v) {
      window.ss5AudView = v.dataset.ss5AudView;
      reload();
      return;
    }

    if (e.target.closest('[data-ss5-cal-prev]')) {
      const m = window.ss5AudCalMonth ?? new Date().getMonth();
      const y = window.ss5AudCalYear ?? new Date().getFullYear();
      if (m === 0) {
        window.ss5AudCalMonth = 11;
        window.ss5AudCalYear = y - 1;
      } else window.ss5AudCalMonth = m - 1;
      reload();
      return;
    }

    if (e.target.closest('[data-ss5-cal-next]')) {
      const m = window.ss5AudCalMonth ?? new Date().getMonth();
      const y = window.ss5AudCalYear ?? new Date().getFullYear();
      if (m === 11) {
        window.ss5AudCalMonth = 0;
        window.ss5AudCalYear = y + 1;
      } else window.ss5AudCalMonth = m + 1;
      reload();
      return;
    }

    if (e.target.closest('[data-ss5-cal-today]')) {
      const n = new Date();
      window.ss5AudCalMonth = n.getMonth();
      window.ss5AudCalYear = n.getFullYear();
      reload();
      return;
    }

    if (e.target.closest('[data-ss5-new-audit]')) {
      window.ss5NewAudit?.();
      return;
    }

    if (e.target.closest('[data-ss5-new-zone]')) {
      const origReload = window.reloadPage;
      window.reloadPage = () => reload();
      window.ss5NewZone?.();
      setTimeout(() => {
        window.reloadPage = origReload;
        persistFivesV11();
        reload();
      }, 100);
      return;
    }

    if (e.target.closest('[data-ss5-new-resp]')) {
      const origReload = window.reloadPage;
      window.reloadPage = () => reload();
      window.ss5NewResp?.();
      setTimeout(() => {
        window.reloadPage = origReload;
        persistFivesV11();
        reload();
      }, 100);
      return;
    }

    if (e.target.closest('[data-ss5-export-excel]')) {
      window.ss5Export?.('planning');
      return;
    }

    if (e.target.closest('[data-ss5-export-print]')) {
      window.print();
      return;
    }

    if (e.target.closest('[data-ss5-aud-reset]')) {
      window.ss5AudFZ = 'Tous';
      window.ss5AudFS = 'Tous';
      window.ss5AudFA = 'Tous';
      window.ss5AudFQ = '';
      reload();
      return;
    }

    const id =
      e.target.closest('[data-ss5-audit-start]')?.dataset.ss5AuditStart ||
      e.target.closest('[data-ss5-audit-report]')?.dataset.ss5AuditReport ||
      e.target.closest('[data-ss5-audit-eval]')?.dataset.ss5AuditEval ||
      e.target.closest('[data-ss5-audit-edit]')?.dataset.ss5AuditEdit ||
      e.target.closest('[data-ss5-audit-validate]')?.dataset.ss5AuditValidate ||
      e.target.closest('[data-ss5-audit-delete]')?.dataset.ss5AuditDelete ||
      e.target.closest('[data-ss5-audit-detail]')?.dataset.ss5AuditDetail;

    if (id) {
      if (e.target.closest('[data-ss5-audit-start]')) window.ss5StartAudit?.(id);
      else if (e.target.closest('[data-ss5-audit-report]')) window.ss5ViewRapport?.(id);
      else if (e.target.closest('[data-ss5-audit-eval]')) window.ss5StartAudit?.(id);
      else if (e.target.closest('[data-ss5-audit-edit]')) window.ss5EditAudit?.(id);
      else if (e.target.closest('[data-ss5-audit-validate]')) window.ss5ValidateAudit?.(id);
      else if (e.target.closest('[data-ss5-audit-delete]')) window.ss5DeleteAuditQuick?.(id);
      else if (e.target.closest('[data-ss5-audit-detail]')) window.ss5ViewAuditDetail?.(id);
      return;
    }

    const zoneEdit = e.target.closest('[data-ss5-zone-edit]');
    if (zoneEdit) {
      window.ss5EditZone?.(zoneEdit.dataset.ss5ZoneEdit);
      return;
    }

    const fz = e.target.closest('[data-ss5-filter-zone]');
    if (fz) {
      window.ss5AudFZ = fz.dataset.ss5FilterZone;
      window.ss5AudView = 'liste';
      reload();
      return;
    }

    const fa = e.target.closest('[data-ss5-filter-auditor]');
    if (fa) {
      window.ss5AudFA = fa.dataset.ss5FilterAuditor;
      window.ss5AudView = 'liste';
      reload();
      return;
    }
  });

  root.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-ss5-aud-filter]');
    if (sel) {
      const k = sel.dataset.ss5AudFilter;
      if (k === 'zone') window.ss5AudFZ = sel.value;
      if (k === 'statut') window.ss5AudFS = sel.value;
      if (k === 'auditeur') window.ss5AudFA = sel.value;
      reload();
    }
  });

  const search = root.querySelector('[data-ss5-aud-search]');
  if (search) {
    let timer;
    search.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        window.ss5AudFQ = search.value;
        reload();
      }, 300);
    });
  }
}

export function installFivesAuditsGlobals() {
  window.ss5ViewAuditDetail = function ss5ViewAuditDetail(id) {
    const a = (window.SS5_AUDITS || []).find((x) => x.id === id);
    if (!a) return;
    const z = (window.SS5_ZONES || []).find((x) => x.zone === a.zone);
    window.ss5Modal?.(
      `Détails audit — ${a.id}`,
      `<div class="ss5-detail-grid">
        <div><span class="fl">Zone</span><strong>${a.zone}</strong></div>
        <div><span class="fl">Date</span><strong>${a.date}</strong></div>
        <div><span class="fl">Auditeur</span><strong>${a.auditeur}</strong></div>
        <div><span class="fl">Responsable zone</span><strong>${z?.resp || '—'}</strong></div>
        <div><span class="fl">Statut</span><strong>${a.statut}</strong></div>
        <div><span class="fl">Score</span><strong>${a.score != null ? `${a.score}%` : '—'}</strong></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:16px;flex-wrap:wrap">
        <button type="button" class="ss5-btn ss5-btn--primary ss5-btn--sm" onclick="ss5StartAudit(${JSON.stringify(id)})">Démarrer / Évaluer</button>
        <button type="button" class="ss5-btn ss5-btn--sm" onclick="ss5ViewRapport(${JSON.stringify(id)})">Rapport</button>
        <button type="button" class="ss5-btn ss5-btn--sm" onclick="ss5EditAudit(${JSON.stringify(id)})">Modifier</button>
      </div>`,
      'document.getElementById("ss5-modal")?.remove()'
    );
  };
}
