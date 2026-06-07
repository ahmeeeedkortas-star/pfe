import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src = 'c:/Users/Lenovo/Downloads/qhse_v11.html';
const out = path.join(__dirname, '../src/pages/audit/audit-v11-data.js');

const s = fs.readFileSync(src, 'utf8');
const marker = '/* ── Données Audits ── */';
const start = s.indexOf(marker);
const end = s.indexOf('function auditModal(', start);
if (start < 0 || end < 0) {
  console.error('Audit data block not found', start, end);
  process.exit(1);
}

let block = s.slice(start, end);
const nl = block.indexOf('\n');
if (nl > -1) block = block.slice(nl + 1);
block = block.trim();

const file = `/** Auto-generated from qhse_v11.html — Audit seed data */\nexport function ensureAuditV11SeedData() {\n${block}\n}\n`;
fs.writeFileSync(out, file);
console.log('Wrote', out, file.length, 'bytes');

