import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = 'c:/Users/Lenovo/Downloads/qhse_v11.html';
const out = path.join(__dirname, '../src/pages/fives/fives-v11-data.js');

const s = fs.readFileSync(src, 'utf8');
const start = s.indexOf('// ── Données Zones');
const end = s.indexOf('/* ══ MODULE 5S — FONCTIONS CRUD ══ */', start);
if (start < 0 || end < 0) {
  console.error('Data block not found', start, end);
  process.exit(1);
}

let block = s.slice(start, end).trim();
const file = `/** Auto-generated from qhse_v11.html — 5S seed data */\nexport function ensureFivesV11SeedData() {\n${block}\n}\n`;
fs.writeFileSync(out, file);
console.log('Wrote', out, file.length, 'bytes');
