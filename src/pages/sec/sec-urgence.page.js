/**
 * Page Plan d'urgence SST — 3 onglets (Plans / Exercices / Contacts).
 */
import { seedUrgenceData } from '../../data/sec-urgence.data.js';
import { renderKpiBanner, renderTabBtn } from '../../components/icons/ui-helpers.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function badgeStatut(s) {
  if (s === 'Validé') return 'bg3';
  if (s === 'En révision') return 'by';
  return 'bb';
}

function planDetailHtml(plan) {
  if (!plan) return '<p style="color:var(--muted)">Sélectionnez un plan.</p>';
  const procs = (plan.procedures || [])
    .map(
      (p, i) =>
        `<div style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;font-size:11px">
      <span style="width:22px;height:22px;border-radius:50%;background:var(--red);color:#fff;font-size:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0">${i + 1}</span>
      <span>${esc(p)}</span></div>`
    )
    .join('');
  const equips = (plan.equipements || [])
    .map(
      ([nom, etat]) =>
        `<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;font-size:10.5px;padding:6px 8px;background:var(--bg);border-radius:6px;margin-bottom:4px">
      <span style="font-weight:600">${esc(nom)}</span><span style="color:var(--muted)">${esc(etat)}</span></div>`
    )
    .join('');
  const upcoming = (window.URG_EXERCICES || [])
    .filter((e) => e.statut === 'Planifié')
    .slice(0, 3)
    .map(
      (e) =>
        `<div style="font-size:10px;padding:6px 0;border-bottom:1px solid var(--border)"><b>${esc(e.nom)}</b><div style="color:var(--muted)">${esc(e.date)} · ${esc(e.type)}</div></div>`
    )
    .join('');
  return `<div class="card" style="border-left:3px solid var(--red)">
    <div class="ch"><span class="ct">${esc(plan.code)} — ${esc(plan.titre)}</span><span class="badge ${badgeStatut(plan.statut)}">${esc(plan.statut)}</span></div>
    <div style="font-size:10px;color:var(--muted);margin-bottom:10px">${esc(plan.type)} · ${esc(plan.version)} · ${esc(plan.responsable)} · ${esc(plan.date)}</div>
    <p style="font-size:11px;background:#fef2f2;padding:10px;border-radius:8px;margin-bottom:8px"><b>Objectif :</b> ${esc(plan.objectif)}</p>
    <p style="font-size:11px;background:#f8fafc;padding:10px;border-radius:8px;margin-bottom:12px"><b>Champ d'application :</b> ${esc(plan.champ)}</p>
    <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Procédures</div>
    ${procs || '<p style="font-size:10px;color:var(--muted)">Aucune procédure.</p>'}
    <div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin:12px 0 6px">Équipements</div>
    ${equips || '<p style="font-size:10px;color:var(--muted)">—</p>'}
    <div style="display:flex;gap:7px;margin-top:12px;flex-wrap:wrap">
      <button type="button" class="btn bsm" data-urg-edit-plan="${plan.id}">Modifier</button>
      <button type="button" class="btn bsm">Exporter PDF</button>
    </div>
  </div>
  ${upcoming ? `<div class="card" style="margin-top:10px"><div class="ct" style="margin-bottom:6px">Prochains exercices</div>${upcoming}</div>` : ''}`;
}

function calendarHtml(exos) {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  return `<div style="display:grid;grid-template-columns:repeat(12,1fr);gap:4px;margin-bottom:12px">
    ${months
      .map((mo, i) => {
        const has = exos.some((e) => {
          const p = (e.date || '').split('/');
          return p.length >= 2 && parseInt(p[1], 10) - 1 === i;
        });
        const done = exos.some((e) => {
          const p = (e.date || '').split('/');
          return p.length >= 2 && parseInt(p[1], 10) - 1 === i && e.statut === 'Réalisé';
        });
        const bg = done ? '#dcfce7' : has ? '#dbeafe' : '#f1f5f9';
        const c = done ? 'var(--green)' : has ? 'var(--blue)' : 'var(--muted)';
        return `<div style="text-align:center;padding:8px 4px;background:${bg};border-radius:6px;font-size:9px;color:${c}"><b>${mo}</b></div>`;
      })
      .join('')}
  </div>`;
}

function contactsHtml(contacts) {
  const cats = [...new Set(contacts.map((c) => c.cat))];
  return cats
    .map((cat) => {
      const rows = contacts
        .filter((c) => c.cat === cat)
        .map(
          (c) =>
            `<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid var(--border)">
          <span style="font-size:20px">${esc(c.ic || '📞')}</span>
          <div style="flex:1;min-width:0">
            <div style="font-weight:700;font-size:11px">${esc(c.nom)}</div>
            ${c.poste || c.email ? `<div style="font-size:9px;color:var(--muted)">${esc([c.poste, c.email].filter(Boolean).join(' · '))}</div>` : ''}
          </div>
          <span style="font-family:monospace;font-weight:700;color:var(--blue);font-size:12px">${esc(c.num)}</span>
          <button type="button" class="btn bsm" data-urg-edit-contact="${c.id}">✏</button>
        </div>`
        )
        .join('');
      return `<div class="card" style="margin-bottom:10px"><div class="ch"><span class="ct">${esc(cat)}</span>
        <button type="button" class="btn bsm" data-urg-add-contact-cat="${esc(cat)}">+ Contact</button></div>${rows}</div>`;
    })
    .join('');
}

export function renderSecUrgence() {
  seedUrgenceData();
  const plans = window.URG_PLANS || [];
  const exos = window.URG_EXERCICES || [];
  const contacts = window.URG_CONTACTS || [];
  const tab = window.urgTab ?? 0;
  const selId = window.urgSelectedPlan ?? plans[0]?.id;
  const plan = plans.find((p) => p.id === selId) || plans[0];

  const exDone = exos.filter((e) => e.statut === 'Réalisé').length;
  const kpiHtml = `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
    ${renderKpiBanner('Plans actifs', plans.length, 'var(--red)', 'flame', '#fef2f2')}
    ${renderKpiBanner('Exercices réalisés', `${exDone}/${exos.length}`, 'var(--green)', 'check-circle', '#f0fdf4')}
    ${renderKpiBanner('Contacts', contacts.length, 'var(--blue)', 'phone', '#eff6ff')}
    ${renderKpiBanner('Planifiés', exos.filter((e) => e.statut === 'Planifié').length, 'var(--orange)', 'calendar', '#fff7ed')}
  </div>`;

  const tabBar = `<div style="display:flex;gap:6px;margin-bottom:12px;align-items:center;flex-wrap:wrap">
    ${renderTabBtn('Plans', 'clipboard', tab === 0, 'data-urg-tab="0"')}
    ${renderTabBtn('Exercices', 'calendar', tab === 1, 'data-urg-tab="1"')}
    ${renderTabBtn('Contacts', 'phone', tab === 2, 'data-urg-tab="2"')}
    ${tab === 0 ? '<button type="button" class="btn bp bsm" data-urg-add-plan style="margin-left:auto">+ Nouveau plan</button>' : ''}
  </div>`;

  let body = '';
  if (tab === 0) {
    const list = plans
      .map(
        (p) =>
          `<div data-urg-plan="${p.id}" style="padding:10px 12px;border-bottom:1px solid var(--border);cursor:pointer;background:${p.id === plan?.id ? '#fef2f2' : 'transparent'}">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">
          <div><div style="font-weight:700;font-size:11px">${esc(p.titre)}</div><div style="font-size:9px;color:var(--muted)">${esc(p.code)} · ${esc(p.type)}</div></div>
        <span class="badge ${badgeStatut(p.statut)}">${esc(p.statut)}</span></div></div>`
      )
      .join('');
    body = `<div class="g23"><div><div class="card" style="padding:0">${list}</div></div><div>${planDetailHtml(plan)}</div></div>`;
  } else if (tab === 1) {
    body = `${calendarHtml(exos)}<div class="card"><div class="ch"><span class="ct">Exercices</span><button type="button" class="btn bp bsm" data-urg-add-exo>+ Planifier</button></div>
      <table class="tbl"><thead><tr><th>Nom</th><th>Type</th><th>Date</th><th>Resp.</th><th>Part.</th><th>Statut</th><th>Résultat</th><th></th></tr></thead><tbody>${exos
        .map(
          (e) =>
            `<tr><td>${esc(e.nom)}</td><td>${esc(e.type)}</td><td>${esc(e.date)}</td><td>${esc(e.resp)}</td><td>${e.participants}</td>
        <td>${esc(e.statut)}</td><td>${esc(e.resultat)}</td><td><button type="button" class="btn bsm" data-urg-edit-exo="${e.id}">✏</button></td></tr>`
        )
        .join('')}</tbody></table></div>`;
  } else {
    body = contactsHtml(contacts);
  }

  return kpiHtml + tabBar + body;
}

export function bindSecUrgenceDelegation(root) {
  if (!root || root.dataset.urgBound) return;
  root.dataset.urgBound = '1';
  root.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('[data-urg-tab]');
    if (tabBtn) {
      window.urgTab = Number(tabBtn.dataset.urgTab);
      window.reloadPage?.('sec-urgence') ?? window.goPage?.('sec-urgence');
      return;
    }
    const planEl = e.target.closest('[data-urg-plan]');
    if (planEl) {
      window.urgViewPlan?.(Number(planEl.dataset.urgPlan));
      return;
    }
    if (e.target.closest('[data-urg-add-plan]')) window.urgAddPlan?.();
    const editPlan = e.target.closest('[data-urg-edit-plan]');
    if (editPlan) window.urgEditPlan?.(Number(editPlan.dataset.urgEditPlan));
    if (e.target.closest('[data-urg-add-exo]')) window.urgAddExercice?.();
    const editExo = e.target.closest('[data-urg-edit-exo]');
    if (editExo) window.urgEditExercice?.(Number(editExo.dataset.urgEditExo));
    if (e.target.closest('[data-urg-add-contact]')) window.urgEditContact?.(0);
    const editCt = e.target.closest('[data-urg-edit-contact]');
    if (editCt) window.urgEditContact?.(Number(editCt.dataset.urgEditContact));
  });
}
