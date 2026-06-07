/**
 * Export CSV côté client.
 */
export function exportRowsToCsv(filename, rows, columns) {
  if (!rows?.length) {
    window.xmToast?.('Aucune donnée à exporter', '', '⚠', '#f59e0b');
    return;
  }
  const header = columns.map((c) => c.label).join(';');
  const body = rows
    .map((row) =>
      columns
        .map((c) => {
          const v = typeof c.get === 'function' ? c.get(row) : row[c.key];
          const s = String(v ?? '').replace(/"/g, '""');
          return `"${s}"`;
        })
        .join(';')
    )
    .join('\n');
  const blob = new Blob(['\ufeff' + header + '\n' + body], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
  window.xmToast?.('Export CSV téléchargé', filename, '📥', '#2563eb');
}

export function printPageAsPdf(title = 'Export QHSE') {
  const page = document.querySelector('[data-page]');
  const table = page?.querySelector('.xm-export-table, .tbl, .odoo-list-table');
  if (!table) {
    const prev = document.title;
    document.title = title;
    window.print();
    document.title = prev;
    return;
  }
  const w = window.open('', '_blank', 'width=960,height=720');
  if (!w) {
    window.xmToast?.('Autorisez les pop-ups pour l\'export PDF', '', '⚠', '#f59e0b');
    return;
  }
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
    <style>body{font-family:Inter,Segoe UI,sans-serif;padding:24px;color:#0f172a}
    h1{font-size:18px;margin:0 0 16px}table{width:100%;border-collapse:collapse;font-size:10px}
    th,td{border:1px solid #cbd5e1;padding:6px 8px;text-align:left}th{background:#f1f5f9;font-weight:700}
    @media print{body{padding:12px}}</style></head><body>
    <h1>${title}</h1>${table.outerHTML}</body></html>`);
  w.document.close();
  w.focus();
  setTimeout(() => w.print(), 300);
}
