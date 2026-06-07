import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = 'c:/Users/Lenovo/Downloads/qhse_v11.html';
const outDir = path.join(__dirname, '../src/modules-v11/generated');

if (!fs.existsSync(src)) {
  console.error('Missing', src);
  process.exit(1);
}

const s = fs.readFileSync(src, 'utf8');
const keys = [
  'doc-biblio',
  'doc-create',
  'doc-edit',
  'doc-read',
  'doc-workflow',
  'doc-history',
  'doc-valid',
  'doc-qr',
  'doc-acces',
  '5s-tb',
  '5s-planning',
  '5s-audit',
  '5s-checklist',
  '5s-actions',
  '5s-suivi',
  '5s-zones',
  '5s-responsables',
  '5s-rapports',
  '5s-exports',
  '5s-kpi',
  '5s-ecarts',
  'audit-tb',
  'audit-planning',
  'audit-liste',
  'audit-checklist',
  'audit-constats',
  'audit-actions',
  'audit-docs',
  'audit-kpi',
  'audit-auditeurs',
  'audit-config',
];

fs.mkdirSync(outDir, { recursive: true });

function extract(k) {
  const esc = k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`'${esc}':\\s*function\\s*\\(\\)\\s*\\{`, 'm');
  const m = s.match(re);
  if (!m) return null;
  let i = m.index + m[0].length - 1;
  let depth = 0;
  let j = i;
  while (j < s.length) {
    const c = s[j];
    if (c === '{') depth += 1;
    else if (c === '}') {
      depth -= 1;
      if (depth === 0) return s.slice(m.index, j + 1);
    }
    j += 1;
  }
  return null;
}

function transformBody(full) {
  let out = full.replace(/^'[^']+':\s*function\s*\(\)\s*\{/, '').replace(/\}\s*$/, '');
  // onclick="…getElementById('content').innerHTML=PAGES['page']()" inside '+ '…' strings
  out = out.replace(
    /document\.getElementById\\(\\'content\\'\\)\.innerHTML\s*=\s*PAGES\\\[\\'([^']+)\\'\\\]\(\)/g,
    "reloadPage(\\'$1\\')",
  );
  out = out.replace(
    /document\.getElementById\(['"]content['"]\)\.innerHTML\s*=\s*PAGES\[['"]([^'"]+)['"]\]\(\)/g,
    "reloadPage('$1')",
  );
  return out;
}

const map = {};
for (const k of keys) {
  const body = extract(k);
  if (!body) {
    console.log('MISS', k);
    continue;
  }
  const fnName = `v11_${k.replace(/-/g, '_')}`;
  const file = `/** Auto-generated from qhse_v11.html — do not edit by hand */\nexport function ${fnName}() {\n${transformBody(body)}\n}\n`;
  fs.writeFileSync(path.join(outDir, `${fnName}.js`), file);
  map[k] = fnName;
  console.log('OK', k, body.length);
}

const index = `${Object.values(map)
  .map((f) => `export { ${f} } from './${f}.js';`)
  .join('\n')}\n`;
fs.writeFileSync(path.join(outDir, 'index.js'), index);
console.log('Wrote', Object.keys(map).length, 'pages to', outDir);

for (const file of fs.readdirSync(outDir).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const fp = path.join(outDir, file);
  let code = fs.readFileSync(fp, 'utf8');
  const re = /document\.getElementById\(\\'content\\'\)\.innerHTML=PAGES\[\\'([^']+)\\'\]\(\)/g;
  code = code.replace(re, "reloadPage(\\'$1\\')");
  if (file === 'v11_doc_edit.js' && code.includes("PAGES['doc-create']")) {
    if (!code.includes("import { v11_doc_create }")) {
      code = code.replace(
        '/** Auto-generated',
        "import { v11_doc_create } from './v11_doc_create.js';\n/** Auto-generated",
      );
    }
    code = code.replace(/if\(!d\) return PAGES\['doc-create'\]\(\);/, 'if(!d) return v11_doc_create();');
  }
  fs.writeFileSync(fp, code);
}
