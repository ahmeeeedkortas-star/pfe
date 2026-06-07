/**
 * API QHSE — Express + persistance JSON (complément au frontend localStorage).
 * Démarrage : npm run server
 */
import { loadEnv } from './load-env.js';

loadEnv();

import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, 'db.json');
const PORT = process.env.PORT || 3001;

function initDb() {
  if (fs.existsSync(DB_PATH)) return;
  const seed = { nc: [], rc: [], fives: { audits: [], actions: [] } };
  fs.writeFileSync(DB_PATH, JSON.stringify(seed, null, 2));
}

function readDb() {
  initDb();
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

function parseListQuery(q) {
  return {
    includeArchived: q.archived === '1',
    page: Math.max(1, parseInt(q.page, 10) || 1),
    pageSize: parseInt(q.pageSize, 10) || 0,
    status: q.status || 'Tous',
    q: q.q || '',
  };
}

function filterRows(rows, opts) {
  let list = rows.filter((r) => (opts.includeArchived ? r.deletedAt : !r.deletedAt));
  if (opts.status && opts.status !== 'Tous') {
    list = list.filter((r) => (r.s || r.status) === opts.status);
  }
  if (opts.q) {
    const q = opts.q.toLowerCase();
    list = list.filter((r) => JSON.stringify(r).toLowerCase().includes(q));
  }
  const total = list.length;
  if (opts.pageSize > 0) {
    const start = (opts.page - 1) * opts.pageSize;
    list = list.slice(start, start + opts.pageSize);
  }
  return { items: list, total };
}

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'qhse-api' }));

/** Rapport 8D RC → client (Gmail : ahmeeeedkortas@gmail.com si RC_BROADCAST_SMTP_PASS défini) */
app.post('/api/rc/send-broadcast', async (req, res) => {
  const { to, subject, html, text } = req.body || {};
  if (!to) return res.status(400).json({ error: 'Destinataire requis' });
  const { sendRcBroadcastMail } = await import('./rc-mail.js');
  const result = await sendRcBroadcastMail({
    to,
    subject: subject || 'Rapport 8D — XPERT MECA',
    html,
    text,
  });
  if (result.ok) return res.json(result);
  res.status(result.reason === 'smtp_not_configured' ? 503 : 500).json(result);
});

app.get('/api/:collection', (req, res) => {
  const db = readDb();
  const col = db[req.params.collection];
  if (!Array.isArray(col)) return res.status(404).json({ error: 'Collection inconnue' });
  res.json(filterRows(col, parseListQuery(req.query)));
});

app.post('/api/:collection', (req, res) => {
  const db = readDb();
  const key = req.params.collection;
  if (!Array.isArray(db[key])) return res.status(404).json({ error: 'Collection inconnue' });
  const row = { ...req.body, deletedAt: null, createdAt: new Date().toISOString() };
  db[key].push(row);
  writeDb(db);
  res.status(201).json(row);
});

app.patch('/api/:collection/:id', (req, res) => {
  const db = readDb();
  const key = req.params.collection;
  const idField = key === 'nc' || key === 'rc' ? 'n' : 'id';
  const idx = db[key]?.findIndex((r) => r[idField] === req.params.id);
  if (idx < 0) return res.status(404).json({ error: 'Introuvable' });
  db[key][idx] = { ...db[key][idx], ...req.body, updatedAt: new Date().toISOString() };
  writeDb(db);
  res.json(db[key][idx]);
});

app.post('/api/:collection/:id/archive', (req, res) => {
  const db = readDb();
  const key = req.params.collection;
  const idField = key === 'nc' || key === 'rc' ? 'n' : 'id';
  const row = db[key]?.find((r) => r[idField] === req.params.id);
  if (!row) return res.status(404).json({ error: 'Introuvable' });
  row.deletedAt = new Date().toISOString();
  writeDb(db);
  res.json(row);
});

app.post('/api/:collection/:id/restore', (req, res) => {
  const db = readDb();
  const key = req.params.collection;
  const idField = key === 'nc' || key === 'rc' ? 'n' : 'id';
  const row = db[key]?.find((r) => r[idField] === req.params.id);
  if (!row) return res.status(404).json({ error: 'Introuvable' });
  row.deletedAt = null;
  writeDb(db);
  res.json(row);
});

app.delete('/api/:collection/:id', (req, res) => {
  const db = readDb();
  const key = req.params.collection;
  const idField = key === 'nc' || key === 'rc' ? 'n' : 'id';
  db[key] = (db[key] || []).filter((r) => r[idField] !== req.params.id);
  writeDb(db);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`QHSE API http://localhost:${PORT}`);
});
