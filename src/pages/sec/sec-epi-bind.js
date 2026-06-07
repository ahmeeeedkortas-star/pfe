/**
 * Événements partagés — module EPI (toutes sous-pages).
 */
import {
  closeModal,
  handleModalSave,
  mountModal,
  renderEmployeeForm,
  renderEpiAssignForm,
  renderEpiEditForm,
} from '../../components/sec/sec-epi-modals.js';
import { renderEmployeeTableRows } from '../../components/sec/sec-epi-ui.js';
import { epiLabel, statutEmployeEpi } from '../../data/sec-epi.data.js';
import {
  addControle,
  addNc,
  deleteEmployee,
  deleteNc,
  formatToday,
  fromInputDate,
  getEmployees,
  initSecEpiStore,
  nextControleId,
  nextNcId,
  removeEpiFromEmployee,
  renewEpi,
  updateNcStatus,
} from '../../data/sec-epi.store.js';

function epiRootPage() {
  return document.querySelector('[data-epi-root]')?.dataset?.page || 'sec-epi';
}

function reloadEpiPage() {
  window.reloadPage?.(epiRootPage());
}

function readEpiFilters() {
  return (
    window._epiFilter || {
      dep: document.getElementById('epi-f-dep')?.value || 'Tous',
      poste: document.getElementById('epi-f-poste')?.value || 'Tous',
      stat: document.getElementById('epi-f-stat')?.value || 'Tous',
      q: (document.getElementById('epi-fq')?.value || '').toLowerCase(),
    }
  );
}

export function filteredEmployees() {
  const { dep: fDep, poste: fPoste, stat: fStat, q } = readEpiFilters();
  return getEmployees().filter((emp) => {
    const st = statutEmployeEpi(emp);
    if (fDep !== 'Tous' && emp.dep !== fDep) return false;
    if (fPoste !== 'Tous' && emp.poste !== fPoste) return false;
    if (fStat !== 'Tous' && st.filter !== fStat && st.label !== fStat) return false;
    if (q && ![emp.nom, emp.id, emp.poste, emp.dep].join(' ').toLowerCase().includes(q)) return false;
    return true;
  });
}

function saveFilters() {
  window._epiFilter = readEpiFilters();
}

export function bindSecEpi() {
  if (window.__secEpiBound) return;
  window.__secEpiBound = true;
  initSecEpiStore();

  document.addEventListener('input', (e) => {
    if (!e.target.closest('[data-epi-root]') || !e.target.matches('#epi-fq')) return;
    saveFilters();
    const tbody = document.getElementById('epi-tbody');
    const filtered = filteredEmployees();
    if (tbody) tbody.innerHTML = renderEmployeeTableRows(filtered, window.secEpiSelected);
    const cnt = document.getElementById('epi-cnt');
    if (cnt) cnt.textContent = `${filtered.length} employé(s)`;
  });

  document.addEventListener('change', (e) => {
    if (e.target.matches('[data-epi-nc-status]')) {
      updateNcStatus(e.target.dataset.epiNcStatus, e.target.value);
      window.xmToast?.('Statut mis à jour', e.target.value, 'check-circle', '#16a34a');
      return;
    }
    if (e.target.matches('[data-epi-filter]')) {
      saveFilters();
      reloadEpiPage();
    }
  });

  document.addEventListener('click', (e) => {
    const root = e.target.closest('[data-epi-root]');
    if (!root && !e.target.closest('[data-epi-modal-backdrop]')) return;

    if (e.target.closest('[data-epi-modal-close]') || e.target.matches('[data-epi-modal-backdrop]')) {
      closeModal();
      return;
    }
    if (handleModalSave(e)) return;

    if (e.target.closest('[data-epi-add-emp]')) {
      mountModal(renderEmployeeForm());
      return;
    }

    const histBtn = e.target.closest('[data-epi-hist]');
    if (histBtn) {
      window._epiHistFilter = { empId: histBtn.dataset.epiHist };
      window.goPage?.('sec-epi-historique');
      return;
    }

    const editEmp = e.target.closest('[data-epi-edit-emp]');
    if (editEmp) {
      const emp = getEmployees().find((x) => x.id === editEmp.dataset.epiEditEmp);
      if (emp) mountModal(renderEmployeeForm(emp));
      return;
    }

    const delEmp = e.target.closest('[data-epi-del-emp]');
    if (delEmp) {
      const id = delEmp.dataset.epiDelEmp;
      const emp = getEmployees().find((x) => x.id === id);
      if (emp && confirm(`Supprimer ${emp.nom} ?`)) {
        deleteEmployee(id);
        if (window.secEpiSelected === id) window.secEpiSelected = null;
        window.xmToast?.('Employé supprimé', '', 'check-circle', '#16a34a');
        reloadEpiPage();
      }
      return;
    }

    const addItem = e.target.closest('[data-epi-add-item]');
    if (addItem) {
      const emp = getEmployees().find((x) => x.id === addItem.dataset.epiAddItem);
      if (emp) mountModal(renderEpiAssignForm(emp));
      return;
    }

    const editItem = e.target.closest('[data-epi-edit-item]');
    if (editItem) {
      const emp = getEmployees().find((x) => x.id === editItem.dataset.epiEditItem);
      const epi = emp?.epi?.find((x) => x.id === editItem.dataset.epiType);
      if (emp && epi) mountModal(renderEpiEditForm(emp, epi));
      return;
    }

    const removeBtn = e.target.closest('[data-epi-remove]');
    if (removeBtn) {
      if (confirm('Retirer cet EPI ?')) {
        removeEpiFromEmployee(removeBtn.dataset.epiRemove, removeBtn.dataset.epiType);
        window.xmToast?.('EPI retiré', '', 'check-circle', '#16a34a');
        reloadEpiPage();
      }
      return;
    }

    const renewBtn = e.target.closest('[data-epi-renew]');
    if (renewBtn) {
      renewEpi(renewBtn.dataset.epiRenew, renewBtn.dataset.epiType);
      window.xmToast?.('EPI renouvelé (+2 ans)', epiLabel(renewBtn.dataset.epiType), 'check-circle', '#16a34a');
      reloadEpiPage();
      return;
    }

    const alertBtn = e.target.closest('[data-epi-alert]');
    if (alertBtn) {
      const emp = getEmployees().find((x) => x.id === alertBtn.dataset.epiAlert);
      if (emp) {
        window.secEpiSelected = emp.id;
        window._epiNcPrefill = {
          empId: emp.id,
          type: statutEmployeEpi(emp).code === 'aucun' ? "Absence d'EPI" : 'EPI non renouvelé',
          desc: `Alerte EPI — ${emp.nom}`,
        };
        window.goPage?.('sec-epi-nc');
      }
      return;
    }

    const sel = e.target.closest('[data-epi-select]');
    if (sel) {
      window.secEpiSelected = sel.getAttribute('data-epi-select');
      if (epiRootPage() === 'sec-epi') {
        saveFilters();
        reloadEpiPage();
      } else {
        window.goPage?.('sec-epi');
      }
      return;
    }

    const ncDel = e.target.closest('[data-epi-nc-del]');
    if (ncDel && confirm('Supprimer cette NC ?')) {
      deleteNc(ncDel.dataset.epiNcDel);
      reloadEpiPage();
      return;
    }

    const checkBtn = e.target.closest('[data-epi-check-val]');
    if (checkBtn) {
      const row = checkBtn.closest('[data-epi-check-item]');
      row.querySelectorAll('[data-epi-check-val]').forEach((b) => b.classList.remove('active-yes', 'active-no'));
      checkBtn.classList.add(checkBtn.dataset.epiCheckVal === 'oui' ? 'active-yes' : 'active-no');
      return;
    }

    if (e.target.closest('[data-epi-check-reset]')) {
      document.querySelectorAll('[data-epi-check-item]').forEach((row) => {
        row.querySelectorAll('[data-epi-check-val]').forEach((b) => b.classList.remove('active-yes', 'active-no'));
      });
      const obs = document.querySelector('[data-epi-check-obs]');
      if (obs) obs.value = '';
      return;
    }

    const checkRes = e.target.closest('[data-epi-check-result]');
    if (checkRes) {
      const mode = checkRes.getAttribute('data-epi-check-result');
      const empNom = document.querySelector('[data-epi-check-emp]')?.value;
      const emp = getEmployees().find((x) => x.nom === empNom);
      const observation = document.querySelector('[data-epi-check-obs]')?.value?.trim() || '';
      const checkDate = document.querySelector('[data-epi-check-date]')?.value;
      const fails = [];
      let okCount = 0;
      document.querySelectorAll('[data-epi-check-item]').forEach((row) => {
        if (row.querySelector('[data-epi-check-val="oui"].active-yes')) okCount += 1;
        if (row.querySelector('[data-epi-check-val="non"].active-no')) fails.push(epiLabel(row.dataset.epiCheckItem));
      });
      const total = document.querySelectorAll('[data-epi-check-item]').length;

      addControle({
        id: nextControleId(),
        d: checkDate ? fromInputDate(checkDate) : formatToday(),
        emp: empNom,
        empId: emp?.id,
        resultat: mode === 'conforme' ? 'Conforme' : 'Non conforme',
        items: `${okCount}/${total}`,
        observation: observation || (mode === 'conforme' ? 'RAS' : '—'),
        par: 'HSE',
      });

      if (mode === 'conforme') {
        window.xmToast?.('Contrôle conforme enregistré', empNom, 'check-circle', '#16a34a');
        return;
      }

      const descParts = [];
      if (fails.length) descParts.push(`Non-conformité : ${fails.join(', ')}`);
      if (observation) descParts.push(observation);
      const desc = descParts.join(' — ') || 'Contrôle checklist — non conforme';

      addNc({
        n: nextNcId(),
        d: formatToday(),
        emp: empNom,
        type: fails.length ? 'Non-port des EPI' : 'EPI endommagé',
        desc,
        par: 'HSE',
        s: 'Ouverte',
      });

      window._epiNcPrefill = null;
      window.xmToast?.('NC EPI créée automatiquement', desc.slice(0, 60), 'alert', '#dc2626');
      window.goPage?.('sec-epi-nc');
      return;
    }
  });

  document.addEventListener('submit', (e) => {
    const form = e.target.closest('[data-epi-nc-form]');
    if (!form || !e.target.closest('[data-epi-root]')) return;
    e.preventDefault();

    const empNom = form.querySelector('[name="emp"]')?.value;
    const type = window.readXmDynamicSelect?.('epi-nc-type', 'sec.epiTypes') || form.querySelector('[name="type"]')?.value;
    const desc = form.querySelector('[name="desc"]')?.value?.trim();
    if (!desc) {
      window.xmToast?.('Description requise', '', 'alert', '#dc2626');
      return;
    }

    addNc({
      n: nextNcId(),
      d: formatToday(),
      emp: empNom,
      type,
      desc,
      par: 'HSE',
      s: 'Ouverte',
    });
    window._epiNcPrefill = null;
    window.xmToast?.('NC EPI enregistrée', '', 'check-circle', '#16a34a');
    reloadEpiPage();
  });
}
