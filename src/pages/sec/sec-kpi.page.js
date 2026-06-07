/**
 * sec-kpi — Tableau de bord & KPI SST (données live).
 */
import { getSecKpiMetrics } from '../../data/sec-metrics.js';
import { renderKpiCardCenter } from '../../components/icons/ui-helpers.js';
import { renderChecklistHeaderIcon } from '../../components/icons/checklist-icons.js';
import { renderIcon } from '../../components/icons/icon-render.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function donutSvg(pct, color, size = 72) {
  const r = (size - 8) / 2;
  const c = 2 * Math.PI * r;
  const off = c * (1 - Math.min(100, pct) / 100);
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="#e5e7eb" stroke-width="6"/>
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${color}" stroke-width="6"
      stroke-dasharray="${c}" stroke-dashoffset="${off}" stroke-linecap="round" transform="rotate(-90 ${size / 2} ${size / 2})"/>
    <text x="50%" y="50%" text-anchor="middle" dy=".35em" font-size="13" font-weight="800" fill="${color}">${pct}%</text>
  </svg>`;
}

export function renderSecKpi() {
  const m = getSecKpiMetrics();
  const maxMonth = Math.max(...m.monthCounts, 1);
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];

  const heatCells = [];
  for (let g = 5; g >= 1; g--) {
    for (let f = 1; f <= 5; f++) {
      const n = m.risks.filter((r) => r.g === g && r.f === f).length;
      const bg = n >= 2 ? '#dc2626' : n === 1 ? '#f97316' : '#e5e7eb';
      const fg = n ? '#fff' : 'var(--muted)';
      heatCells.push(
        `<div title="G${g}×F${f}: ${n}" style="background:${bg};border-radius:4px;min-height:22px;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:${fg}">${n || ''}</div>`
      );
    }
  }

  const urgentActs = m.acts
    .filter((a) => a.statut === 'En retard' || a.prio === 'Critique')
    .slice(0, 3);

  const objectifs = [
    ['TF — Accidents faible gravité', 2, m.accidents, '#d97706'],
    ['TG — Accidents grave', 0, m.accidents, 'var(--green)'],
    ['Conformité actions', 85, m.pctConf, m.pctConf >= 85 ? 'var(--green)' : 'var(--orange)'],
    ['Exercices urgence', 3, m.exDone, m.exDone >= 3 ? 'var(--green)' : 'var(--red)'],
  ]
    .map(([l, obj, val, c]) => {
      const pct = obj ? Math.min(100, Math.round((val / obj) * 100)) : 0;
      return `<div style="margin-bottom:8px">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px"><span>${esc(l)}</span><b style="color:${c}">${val} / ${obj}</b></div>
        <div style="height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="width:${pct}%;height:100%;background:${c}"></div></div>
      </div>`;
    })
    .join('');

  return `
  <div class="card" style="padding:10px 14px;margin-bottom:12px;display:flex;gap:8px;flex-wrap:wrap;align-items:center">
    <select class="sel"><option>Période : Mai 2026</option><option>Trimestre</option><option>Année</option></select>
    <select class="sel"><option>Comparer : mois précédent</option></select>
    <button type="button" class="btn bp bsm" data-sec-refresh-kpi>Actualiser</button>
    <button type="button" class="btn bsm" style="margin-left:auto;display:inline-flex;align-items:center;gap:6px">${renderIcon('download', { size: 14 })} Export</button>
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
    ${renderKpiCardCenter('Accidents', m.accidents, 'var(--red)', 'siren', 'sec-accidents')}
    ${renderKpiCardCenter('Incidents', m.incidents, 'var(--orange)', 'alert', 'sec-accidents')}
    ${renderKpiCardCenter('Jours sans accident', m.jsa, 'var(--green)', 'award')}
    ${renderKpiCardCenter('Checklists validées', `${m.clValidated}/${m.clTotal}`, 'var(--blue)', 'clipboard', 'sec-checklists')}
    ${renderKpiCardCenter('Risques critiques', m.critRisks, 'var(--red)', 'alert', 'sec-risques')}
    ${renderKpiCardCenter('Actions en retard', m.retardActs, 'var(--orange)', 'clock', 'sec-actions')}
    ${renderKpiCardCenter('Taux conformité actions', `${m.pctConf}%`, 'var(--blue)', 'target', 'sec-actions')}
    ${renderKpiCardCenter('Exercices réalisés', `${m.exDone}/${m.exs.length || 0}`, 'var(--navy)', 'flame', 'sec-urgence')}
  </div>

  <div class="g23" style="margin-bottom:12px">
    <div class="card">
      <div class="ct" style="margin-bottom:10px">🎯 Objectifs SST</div>
      ${objectifs}
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:8px">📈 Évolution accidents / incidents 2026</div>
      <div style="display:flex;align-items:flex-end;gap:4px;height:100px">
        ${m.monthCounts
          .map((v, i) => {
            const h = Math.round((v / maxMonth) * 90) || 4;
            return `<div style="flex:1;text-align:center"><div style="height:${h}px;background:var(--blue);border-radius:3px 3px 0 0;margin:0 auto;width:80%"></div><div style="font-size:8px;color:var(--muted);margin-top:2px">${months[i]}</div></div>`;
          })
          .join('')}
      </div>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:12px">
    <div class="card" style="text-align:center;padding:14px">
      <div class="ct">Indicateurs TF / TG</div>
      <div style="display:flex;justify-content:center;gap:16px;margin-top:8px">
        <div><div style="font-size:10px;color:var(--muted)">TF</div><div style="font-weight:800;color:var(--orange)">${m.tf}</div></div>
        <div><div style="font-size:10px;color:var(--muted)">TG</div><div style="font-weight:800;color:var(--green)">${m.tg}</div></div>
      </div>
      <div style="font-size:10px;color:var(--muted);margin-top:8px">Jours arrêt cumulés : ${m.joursArret}</div>
    </div>
    <div class="card" style="text-align:center;padding:14px">
      <div class="ct">Répartition événements</div>
      <div style="display:flex;justify-content:center;margin:8px 0">${donutSvg(m.accidents + m.incidents + m.pa ? Math.round((m.accidents / (m.accidents + m.incidents + m.pa || 1)) * 100) : 0, '#dc2626', 80)}</div>
      ${[
        ['Accident', m.accidents, '#dc2626'],
        ['Incident', m.incidents, '#ea580c'],
        ['PA', m.pa, '#eab308'],
      ]
        .map(([l, v, c]) => `<div class="drow"><span>${l}</span><span style="font-weight:700;color:${c}">${v}</span></div>`)
        .join('')}
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:8px">Actions SST</div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;font-size:9px;text-align:center;margin-bottom:8px">
        <div><b style="color:var(--green)">${m.doneActs}</b><div style="color:var(--muted)">Clôturées</div></div>
        <div><b style="color:var(--blue)">${m.actsProg}</b><div style="color:var(--muted)">En cours</div></div>
        <div><b style="color:var(--orange)">${m.retardActs}</b><div style="color:var(--muted)">Retard</div></div>
        <div><b>${m.actsTodo}</b><div style="color:var(--muted)">À faire</div></div>
      </div>
      <div style="height:6px;background:#e5e7eb;border-radius:3px;margin-bottom:8px"><div style="width:${m.pctConf}%;height:100%;background:var(--blue);border-radius:3px"></div></div>
      <div class="ct" style="margin-bottom:6px;font-size:10px">Urgentes</div>
      ${
        urgentActs.length
          ? urgentActs
              .map(
                (a) =>
                  `<div style="font-size:10.5px;padding:6px 0;border-bottom:1px solid var(--border)"><b>${esc(a.action)}</b><div style="color:var(--muted)">${esc(a.statut)} · ${esc(a.resp)}</div></div>`
              )
              .join('')
          : '<p style="font-size:10px;color:var(--green)">Aucune action urgente</p>'
      }
      <button type="button" class="btn bsm bp" style="margin-top:8px;width:100%" data-nav="sec-actions">Voir toutes →</button>
    </div>
  </div>

  <div class="g23">
    <div class="card">
      <div class="ct" style="margin-bottom:8px">Heatmap risques G×F</div>
      <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px">${heatCells.join('')}</div>
      <button type="button" class="btn bsm" style="margin-top:10px" data-nav="sec-risques">Ouvrir registre risques →</button>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:8px">État des checklists</div>
      ${m.clCards
        .slice(0, 8)
        .map((c) => {
          const col =
            c.statut === 'Validé' ? 'var(--green)' : c.statut === 'NC' ? 'var(--red)' : 'var(--orange)';
          return `<div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;font-size:10px;margin-bottom:2px"><span style="display:flex;align-items:center;gap:6px">${renderChecklistHeaderIcon(c.key, 16)} ${esc(c.cfg.title)}</span><b style="color:${col}">${c.score.pct}%</b></div>
          <div style="height:5px;background:#e5e7eb;border-radius:2px"><div style="width:${c.score.pct}%;height:100%;background:${col};border-radius:2px"></div></div>
        </div>`;
        })
        .join('')}
      <button type="button" class="btn bsm bp" style="margin-top:8px;width:100%" data-nav="sec-checklists">Toutes les checklists →</button>
    </div>
  </div>`;
}
