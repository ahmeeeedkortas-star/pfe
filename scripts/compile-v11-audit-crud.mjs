import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = 'c:/Users/Lenovo/Downloads/qhse_v11.html';
const out = path.join(__dirname, '../src/pages/audit/audit-v11-crud.js');

const s = fs.readFileSync(src, 'utf8');
function extractFunction(signature) {
  const start = s.indexOf(signature);
  if (start < 0) return null;
  const brace = s.indexOf('{', start);
  if (brace < 0) return null;
  let depth = 0;
  for (let i = brace; i < s.length; i += 1) {
    const c = s[i];
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return s.slice(start, i + 1).trim();
    }
  }
  return null;
}

const viewFn = extractFunction('function auditView(');
const start = s.indexOf('function auditModal(');
const end = s.indexOf('/* ════ FIN MODULE AUDIT — DONNÉES ════ */', start);
if (!viewFn || start < 0 || end < 0) {
  console.error('Audit CRUD block not found');
  process.exit(1);
}
let block = s.slice(start, end).trim();
let view = viewFn;
view = view.replace(
  /document\.getElementById\(['"]content['"]\)\.innerHTML\s*=\s*PAGES\[['"]([^'"]+)['"]\]\(\)/g,
  'reloadPage("$1")',
);
block = block.replace(
  /document\.getElementById\(['"]content['"]\)\.innerHTML\s*=\s*PAGES\[['"]([^'"]+)['"]\]\(\)/g,
  'reloadPage("$1")',
);
block = block.replace(/PAGES\[['"]([^'"]+)['"]\]\(\)/g, 'reloadPage("$1")');

const file = `/** Auto-generated from qhse_v11.html — Audit CRUD + modals */\nexport function installAuditV11CrudFromV11() {\n${view}\n\n${block}\n}\n`;
fs.writeFileSync(out, file);
console.log('Wrote', out, file.length, 'bytes');

