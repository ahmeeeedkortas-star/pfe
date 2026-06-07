/**
 * Export CSV / impression PDF (navigateur) — module CST.
 */
function escCsv(v) {
  const s = String(v ?? '').replace(/"/g, '""');
  return `"${s}"`;
}

export function downloadCstCsv(filename, headers, rows) {
  const lines = [headers.map(escCsv).join(';'), ...rows.map((r) => r.map(escCsv).join(';'))];
  const blob = new Blob(['\ufeff' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename.endsWith('.csv') ? filename : `${filename}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export function printCstTable(title) {
  const page = document.querySelector('[data-page^="cst-"]');
  const table = page?.querySelector('.cst-export-table, .tbl');
  if (!table) {
    window.print();
    return;
  }
  const w = window.open('', '_blank', 'width=900,height=700');
  if (!w) return;
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
    <style>body{font-family:Inter,sans-serif;padding:24px}h1{font-size:18px}table{width:100%;border-collapse:collapse;font-size:11px}
    th,td{border:1px solid #ccc;padding:6px 8px;text-align:left}th{background:#f1f5f9}</style></head><body>
    <h1>${title}</h1>${table.outerHTML}</body></html>`);
  w.document.close();
  w.focus();
  w.print();
}
