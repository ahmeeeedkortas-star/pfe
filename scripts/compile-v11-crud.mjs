import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = 'c:/Users/Lenovo/Downloads/qhse_v11.html';
const out = path.join(__dirname, '../src/pages/fives/fives-v11-crud.js');

const s = fs.readFileSync(src, 'utf8');
const start = s.indexOf('/* ══ MODULE 5S — FONCTIONS CRUD ══ */');
const end = s.indexOf('/* ════ FIN MODULE 5S ════ */', start);
if (start < 0 || end < 0) {
  console.error('CRUD block not found');
  process.exit(1);
}

let block = s.slice(start, end);
block = block.replace(/\/\* ══ MODULE 5S — FONCTIONS CRUD ══ \*\//, '');
block = block.replace(
  /document\.getElementById\(['"]content['"]\)\.innerHTML\s*=\s*PAGES\[['"]([^'"]+)['"]\]\(\)/g,
  'reloadPage("$1")',
);
block = block.replace(/PAGES\[['"]([^'"]+)['"]\]\(\)/g, 'reloadPage("$1")');

const file = `/** Auto-generated from qhse_v11.html — 5S CRUD + modals */\nexport function installFivesV11CrudFromV11() {\n${block}\n}\n`;
fs.writeFileSync(out, file);
console.log('Wrote', out, file.length, 'bytes');
