/**
 * Découpe src/legacy/pages.js en chunks par module (lazy-load).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pagesPath = path.join(__dirname, '../src/legacy/pages.js');
const outDir = path.join(__dirname, '../src/legacy/pages');

const raw = fs.readFileSync(pagesPath, 'utf8');
const start = raw.indexOf('const PAGES = {');
const end = raw.lastIndexOf('\n};');
if (start < 0 || end < 0) throw new Error('PAGES introuvable');

const body = raw.slice(start + 'const PAGES = {'.length, end).trim();

const sections = [
  { file: 'home.pages.js', marker: '/* ── ACCUEIL ── */', until: '/* ══════════════════════════════════════\n   RC PAGES' },
  { file: 'rc.pages.js', marker: '/* ══════════════════════════════════════\n   RC PAGES', until: "'nc-liste'" },
  { file: 'nc.pages.js', marker: "'nc-liste'", until: "'audit-tb'" },
  { file: 'audit.pages.js', marker: "'audit-tb'", until: '/* ── BIENTÔT ── */' },
  {
    file: 'env.pages.js',
    marker: '/* ── BIENTÔT ── */',
    until: '/* ══════════════════════════════════════\n   🛡 MODULE SÉCURITÉ SST',
  },
  {
    file: 'sec.pages.js',
    marker: '/* ══════════════════════════════════════\n   🛡 MODULE SÉCURITÉ SST',
    until: "'smi': () => pgSoon('smi'),",
    append: ",\n'ind': () => pgSoon('ind')",
  },
];

function sliceBetween(text, from, until) {
  const i = text.indexOf(from);
  if (i < 0) throw new Error(`Marker not found: ${from.slice(0, 40)}…`);
  const j = until ? text.indexOf(until, i) : text.length;
  if (j < 0) throw new Error(`Until not found after ${from.slice(0, 30)}…`);
  return text.slice(i, j).trim().replace(/,\s*$/, '');
}

fs.mkdirSync(outDir, { recursive: true });

for (const { file, marker, until, append } of sections) {
  let chunk = sliceBetween(body, marker, until);
  if (append) chunk += append;
  const content = `/** @legacy — ${file} (lazy) */\nexport default {\n${chunk}\n};\n`;
  fs.writeFileSync(path.join(outDir, file), content);
  console.log('  ✓ legacy/pages/' + file, `(${(content.length / 1024).toFixed(0)} Ko)`);
}

console.log('\nChunks créés. Mettez à jour init.js pour utiliser page-registry.js');
