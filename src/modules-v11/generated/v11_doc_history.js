/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_doc_history() {

  var D=window.DOC_DATA||[];
  var allHistory=[];
  D.forEach(function(d){(d.history||[]).forEach(function(h){allHistory.push({doc:d,h:h});});});
  allHistory.sort(function(a,b){return new Date(b.h.date.split('/').reverse().join('-'))-new Date(a.h.date.split('/').reverse().join('-'));});
  return `
  <div class="card" style="padding:0;overflow:hidden">
    <div class="ch" style="padding:12px 15px"><span class="ct">🕐 Historique des modifications</span><span style="font-size:10px;color:#94a3b8">${allHistory.length} entrées</span></div>
    <div style="overflow-x:auto">
      <table class="tbl">
        <thead><tr><th>Document</th><th>Type</th><th>Version</th><th>Date</th><th>Auteur</th><th>Motif de révision</th><th></th></tr></thead>
        <tbody>
          ${allHistory.map(({doc:d,h})=>`
          <tr>
            <td>
              <div style="font-size:11px;font-weight:700;color:#0f172a">${d.titre}</div>
              <div style="font-size:9.5px;color:#94a3b8">${d.id}</div>
            </td>
            <td style="font-size:10px;color:#64748b">${d.type}</td>
            <td><span style="background:#eff6ff;color:#2563eb;padding:2px 8px;border-radius:5px;font-size:10px;font-weight:700">${h.v}</span></td>
            <td style="font-size:10.5px;color:#64748b;white-space:nowrap">${h.date}</td>
            <td style="font-size:10.5px">${h.auteur}</td>
            <td style="font-size:10.5px;max-width:200px">${h.motif}</td>
            <td><button onclick="window.doc_sel='${d.id}';goPage('doc-read')" class="btn bsm">👁 Voir</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`;

}
