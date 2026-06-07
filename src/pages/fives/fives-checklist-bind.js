/**
 * Bindings checklist 5S — sans rechargement page à chaque clic.
 */
import {
  applyScoresToZone,
  calcZoneScores,
  ensureClMeta,
  getClResponse,
  setClItemMeta,
  setClResponse,
  syncAuditFromZone,
} from './fives-checklist-store.js';
import { persistFivesV11 } from './fives-persist.js';

let bound = false;
let autosaveTimer = null;

function hint(msg) {
  const el = document.getElementById('ss5-cl-autosave');
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('is-saving', 'is-ok');
  if (/enregistr|auto|prêt/i.test(msg) && !/…/.test(msg)) el.classList.add('is-ok');
  if (/enregistrement/i.test(msg)) el.classList.add('is-saving');
}

function updateScoreUi(zoneId) {
  const { global, byPillar } = calcZoneScores(zoneId);
  const gEl = document.getElementById('ss5-global-score-val');
  if (gEl) gEl.textContent = String(global);
  Object.keys(byPillar).forEach((pk) => {
    const fill = document.querySelector(`[data-score-fill="${pk}"]`);
    const lbl = document.querySelector(`[data-score-label="${pk}"]`);
    if (fill) fill.style.width = `${byPillar[pk]}%`;
    if (lbl) lbl.textContent = `${byPillar[pk]}%`;
  });
  applyScoresToZone(zoneId);
}

function scheduleAutosave(zoneId, label = 'Enregistré') {
  clearTimeout(autosaveTimer);
  hint('Enregistrement…');
  autosaveTimer = setTimeout(() => {
    persistFivesV11();
    const t = new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    hint(`${label} — ${t}`);
  }, 600);
}

export function bindFivesChecklistPage() {
  const root = document.getElementById('ss5-checklist-root');
  if (!root) return;

  const zoneId = root.dataset.zoneId;
  if (!zoneId) return;

  const zoneSelect = document.getElementById('ss5-cl-zone-select');
  if (zoneSelect && !zoneSelect.dataset.bound) {
    zoneSelect.dataset.bound = '1';
    zoneSelect.addEventListener('change', () => {
      window.ss5ClZone = zoneSelect.value;
      window.reloadPage?.('5s-checklist');
    });
  }

  const zonesBar = document.getElementById('ss5-cl-zones-bar');
  if (zonesBar && !zonesBar.dataset.bound) {
    zonesBar.dataset.bound = '1';
    zonesBar.addEventListener('click', (e) => {
      const curId = window.ss5ClZone || zoneId;
      const Z = window.SS5_ZONES || [];
      const cur = Z.find((z) => z.id === curId);

      if (e.target.closest('[data-ss5-cl-zone-add]')) {
        const origReload = window.reloadPage;
        window.reloadPage = () => origReload?.('5s-checklist');
        window.ss5NewZone?.();
        setTimeout(() => {
          window.reloadPage = origReload;
          persistFivesV11();
        }, 200);
        return;
      }
      if (!cur) return;

      if (e.target.closest('[data-ss5-cl-zone-edit]')) {
        window.ss5EditZone?.(cur.id);
        setTimeout(() => persistFivesV11(), 500);
        return;
      }

      if (e.target.closest('[data-ss5-cl-zone-rename]')) {
        const name = prompt('Nouveau nom de la zone :', cur.zone);
        if (name && name.trim()) {
          const old = cur.zone;
          cur.zone = name.trim();
          (window.SS5_AUDITS || []).forEach((a) => {
            if (a.zone === old) a.zone = cur.zone;
          });
          (window.SS5_ACTIONS || []).forEach((a) => {
            if (a.zone === old) a.zone = cur.zone;
          });
          persistFivesV11();
          window.reloadPage?.('5s-checklist');
          window.xmToast?.('Zone renommée', cur.zone, 'check-circle', '#16a34a');
        }
        return;
      }

      if (e.target.closest('[data-ss5-cl-zone-delete]')) {
        if (!confirm(`Supprimer la zone « ${cur.zone} » ?`)) return;
        window.SS5_ZONES = Z.filter((z) => z.id !== cur.id);
        delete window.SS5_CL_DATA?.[cur.id];
        delete window.SS5_CL_META?.[cur.id];
        window.ss5ClZone = window.SS5_ZONES[0]?.id || null;
        persistFivesV11();
        window.reloadPage?.('5s-checklist');
        window.xmToast?.('Zone supprimée', cur.zone, 'trash', '#dc2626');
      }
    });
  }

  function applyRowFilters() {
    const repF = document.getElementById('ss5-cl-filter-rep')?.value || '';
    const pilF = document.getElementById('ss5-cl-filter-pillar')?.value || '';
    let visible = 0;
    let total = 0;
    root.querySelectorAll('.ss5-cl-row').forEach((row) => {
      total += 1;
      const rep = row.dataset.rep || '';
      let show = true;
      if (repF === 'non' && rep !== 'non') show = false;
      if (repF === 'oui' && rep !== 'oui') show = false;
      if (repF === 'empty' && rep) show = false;
      if (repF === 'na' && rep !== 'na') show = false;
      if (pilF && row.dataset.pillar !== pilF) show = false;
      row.classList.toggle('is-filtered-out', !show);
      if (show) visible += 1;
    });
    root.querySelectorAll('.ss5-cl-pillar').forEach((sec) => {
      const pk = sec.dataset.pillar;
      if (!pilF || pilF === pk) {
        const rows = sec.querySelectorAll('.ss5-cl-row:not(.is-filtered-out)');
        sec.style.display = rows.length || !repF ? '' : 'none';
      } else sec.style.display = 'none';
    });
    const cnt = document.getElementById('ss5-cl-filter-count');
    if (cnt) cnt.textContent = repF || pilF ? `${visible}/${total} critères` : '';
  }

  if (!bound) {
    bound = true;
    document.addEventListener('click', (e) => {
      const act = e.target.closest('[data-ss5-action]');
      if (act && root.contains(act)) {
        const z = act.dataset.zone || zoneId;
        switch (act.dataset.ss5Action) {
          case 'validate':
            window.ss5ClValidateChecklist?.(z);
            break;
          case 'template':
            window.ss5ClManageTemplate?.();
            break;
          case 'sections':
            window.ss5ClManageSections?.();
            break;
          case 'ecarts':
            window.ss5ClGenerateEcarts?.(z);
            break;
          case 'report':
            window.ss5GenerateReportFromZone?.(z);
            break;
          case 'export':
            window.ss5ClExportChecklist?.(z);
            break;
          case 'filter-toggle': {
            const bar = document.getElementById('ss5-cl-filter-bar');
            const btn = document.getElementById('ss5-cl-filter-btn');
            bar?.classList.toggle('is-open');
            btn?.classList.toggle('is-active');
            break;
          }
          case 'filter-clear': {
            const repSel = document.getElementById('ss5-cl-filter-rep');
            const pilSel = document.getElementById('ss5-cl-filter-pillar');
            if (repSel) repSel.value = '';
            if (pilSel) pilSel.value = '';
            applyRowFilters();
            break;
          }
          default:
            break;
        }
        return;
      }

      const btn = e.target.closest('[data-ss5-set]');
      if (!btn) return;
      const z = btn.dataset.zone;
      const pk = btn.dataset.pk;
      const n = parseInt(btn.dataset.n, 10);
      const val = btn.dataset.val;
      setClResponse(z, pk, n, val);
      const row = btn.closest('.ss5-cl-row');
      const rep = getClResponse(z, pk, n);
      if (row) {
        row.querySelectorAll('.ss5-cl-btn').forEach((b) => {
          b.classList.remove('is-on', 'ok', 'nok', 'na');
          const v = b.dataset.val;
          if (v === rep) b.classList.add('is-on', v === 'oui' ? 'ok' : v === 'non' ? 'nok' : 'na');
        });
        row.style.background = rep === 'non' ? '#fff9f9' : rep === 'oui' ? '#f9fff9' : '#fff';
        row.dataset.rep = rep || '';
      }
      updateScoreUi(z);
      applyRowFilters();
      scheduleAutosave(z, 'Auto');
    });

    document.addEventListener('input', (e) => {
      const remark = e.target.closest('[data-ss5-remark]');
      if (remark) {
        setClItemMeta(remark.dataset.zone, remark.dataset.pk, parseInt(remark.dataset.n, 10), {
          remark: remark.value,
        });
        scheduleAutosave(remark.dataset.zone, 'Remarque');
        return;
      }
      const sec = e.target.closest('[data-ss5-section-note]');
      if (sec) {
        const meta = ensureClMeta(sec.dataset.zone);
        meta.sectionNotes[sec.dataset.pk] = sec.value;
        persistFivesV11();
        scheduleAutosave(sec.dataset.zone, 'Section');
      }
    });

    document.addEventListener('change', (e) => {
      const photo = e.target.closest('[data-ss5-photo]');
      if (!photo?.files?.[0]) return;
      const file = photo.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const z = photo.dataset.zone;
        const pk = photo.dataset.pk;
        const n = parseInt(photo.dataset.n, 10);
        setClItemMeta(z, pk, n, { photo: reader.result });
        window.reloadPage?.('5s-checklist');
      };
      reader.readAsDataURL(file);
    });
  }

  const saveBtn = document.getElementById('ss5-cl-save-btn');
  if (saveBtn && !saveBtn.dataset.bound) {
    saveBtn.dataset.bound = '1';
    saveBtn.addEventListener('click', () => {
      const meta = ensureClMeta(zoneId);
      meta.pointsForts = document.getElementById('ss5-points-forts')?.value || '';
      meta.axes = document.getElementById('ss5-axes')?.value || '';
      applyScoresToZone(zoneId);
      syncAuditFromZone(zoneId);
      persistFivesV11();
      window.ss5Notify?.('Checklist enregistrée', `Score ${calcZoneScores(zoneId).global}%`, 'success');
      hint('Enregistré');
    });
  }

  const pf = document.getElementById('ss5-points-forts');
  const ax = document.getElementById('ss5-axes');
  [pf, ax].forEach((el) => {
    if (!el || el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('input', () => {
      const meta = ensureClMeta(zoneId);
      if (el.id === 'ss5-points-forts') meta.pointsForts = el.value;
      else meta.axes = el.value;
      scheduleAutosave(zoneId, 'Auto');
    });
  });

  const repSel = document.getElementById('ss5-cl-filter-rep');
  const pilSel = document.getElementById('ss5-cl-filter-pillar');
  [repSel, pilSel].forEach((el) => {
    if (!el || el.dataset.bound) return;
    el.dataset.bound = '1';
    el.addEventListener('change', applyRowFilters);
  });

  applyRowFilters();
  hint('Sauvegarde automatique active');
}

export function installFivesChecklistGlobals() {
  window.ss5ClViewPhoto = function ss5ClViewPhoto(zoneId, pk, n) {
    const im = window.SS5_CL_META?.[zoneId]?.items?.[`${pk}-${n}`];
    if (!im?.photo) return;
    const w = window.open('', '_blank');
    if (w) {
      w.document.write(`<img src="${im.photo}" style="max-width:100%;height:auto">`);
      w.document.close();
    }
  };

  window.ss5GenerateReportFromZone = function ss5GenerateReportFromZone(zoneId) {
    applyScoresToZone(zoneId);
    const audit = syncAuditFromZone(zoneId);
    if (!audit) {
      window.xmToast?.('Impossible de générer le rapport', '', 'alert', '#dc2626');
      return;
    }
    window.ss5Notify?.('Rapport généré', audit.id, 'success');
    window.goPage?.('5s-rapports');
  };

  window.ss5ClValidateChecklist = function ss5ClValidateChecklist(zoneId) {
    const meta = ensureClMeta(zoneId);
    meta.pointsForts = document.getElementById('ss5-points-forts')?.value || '';
    meta.axes = document.getElementById('ss5-axes')?.value || '';
    const scores = calcZoneScores(zoneId);
    applyScoresToZone(zoneId);
    const audit = syncAuditFromZone(zoneId);
    if (audit) {
      audit.statut = 'Réalisé';
      audit.score = scores.global;
    }
    persistFivesV11();
    window.ss5Notify?.(
      'Checklist validée',
      `Score ${scores.global}% — audit ${audit?.id || ''}`,
      'success'
    );
    hint('Validée');
  };

  window.ss5ClExportChecklist = function ss5ClExportChecklist(zoneId) {
    const Z = (window.SS5_ZONES || []).find((z) => z.id === zoneId);
    const CL = window.SS5_CL_TEMPLATE || {};
    const D = window.SS5_CL_DATA?.[zoneId] || {};
    const lines = ['Pilier;#;Critère;Réponse;Remarque'];
    Object.keys(CL).forEach((pk) => {
      (CL[pk]?.items || []).forEach((it) => {
        const rep = typeof D[pk]?.[it.n] === 'object' ? D[pk][it.n]?.rep : D[pk]?.[it.n];
        const im = window.SS5_CL_META?.[zoneId]?.items?.[`${pk}-${it.n}`];
        lines.push(
          [pk, it.n, `"${String(it.label).replace(/"/g, '""')}"`, rep || '', `"${(im?.remark || '').replace(/"/g, '""')}"`].join(';')
        );
      });
    });
    const blob = new Blob(['\ufeff' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `checklist_5s_${(Z?.zone || zoneId).replace(/\s+/g, '_')}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
    window.xmToast?.('Export CSV généré', Z?.zone || zoneId, 'check-circle', '#16a34a');
  };
}
