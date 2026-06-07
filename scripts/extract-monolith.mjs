/**
 * Extrait qhse.html vers src/legacy/ et styles/legacy-bundle.css
 * Usage: node scripts/extract-monolith.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveSourceHtml } from './resolve-source.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const SRC = path.join(ROOT, 'src');
const source = resolveSourceHtml();
const html = fs.readFileSync(source.path, 'utf8');
console.log(`Source: ${source.name} (${(source.size / 1024).toFixed(0)} Ko)\n`);

const headHtml = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1] || html;
const styleParts = headHtml
  .split(/<style>/i)
  .slice(1)
  .map((p) => p.split(/<\/style>/i)[0].trim())
  .filter(Boolean);
const css =
  styleParts.find((s) => s.includes(':root') && s.includes('.topbar') && !s.includes('<meta')) ||
  styleParts.filter((s) => !s.includes('<meta')).sort((a, b) => b.length - a.length)[0];
if (!css) throw new Error('CSS introuvable dans <head>');

const scriptMatch = html.match(/<script>([\s\S]*)<\/script>\s*<\/body>/);
if (!scriptMatch) throw new Error('Script introuvable');
let js = scriptMatch[1];

const iPages = js.indexOf('const PAGES = {');
const iPgSoon = js.indexOf('function pgSoon(');
const iEnvHelpers = js.indexOf('/* ── ENV HELPERS ── */');
const iNotif = js.indexOf('const NOTIFICATIONS = [');
const iSearch = js.indexOf('const SEARCH_INDEX = [');

let coreJs = js.slice(0, iPages).trim();
let pagesJs = js.slice(iPages, iPgSoon).trim();
let pgSoonJs = js.slice(iPgSoon, iEnvHelpers).trim();
let envJs = js.slice(iEnvHelpers, iNotif).trim();
const notifJs = js.slice(iNotif, iSearch).trim();
const searchJs = js.slice(iSearch).trim();

// Retirer l'init goHome() — géré par src/app/init.js
envJs = envJs.replace(/\n\s*goHome\(\);\s*\n/, '\n');

// Retirer doublons ICONS/TITLES si on migre vers config (legacy garde les siens)
// STATE : utiliser objet mutable global
coreJs = coreJs.replace(/^let STATE = /m, 'let STATE = window.STATE = ');

const GLOBAL_EXPORTS = `
/* ── Exports globaux (compat templates onclick) ── */
Object.assign(window, {
  STATE, RC_DATA, NC_DATA, ICONS, TITLES,
  changeStatut, updateProg, deleteAction,
  showAddActionModal, confirmAddAction, openEditAction, saveEditAction,
  badgeG, badgeS, filterRC, filterNC,
  goHome, goModule, goPage, buildIconNav, setTopbar, switchTab,
  timelineHTML, actionsTableRC, kpiSideRC, kpiSideNC, renderChecklistNav,
});
`;

const pagesExport = `
window.PAGES = PAGES;
export { PAGES };
`;

const pgSoonExport = `
window.pgSoon = pgSoon;
export { pgSoon };
`;

const envExport = `
Object.assign(window, {
  envModal, envLbl, envSel, envInp, envTa, envG2, envDelItem,
  envActEdit, envAddAspect, envEditAspect, envAddDechet, envEditDechet,
  envAddChimique, envEditChimique, envAdd5S, envEdit5S,
  envAddUrgence, envEditUrgence, envAddEnvAction, envEditEnvAction,
});
`;

const notifExport = `
Object.assign(window, { NOTIFICATIONS, renderNotifList, toggleNotif, readNotif, markAllRead });
`;

const searchExport = `
Object.assign(window, {
  SEARCH_INDEX, searchIdx, doSearch, showSearchResults, execSearch,
  setSearchIdx, searchKeydown, clearSearch, closeSearch,
});
`;

function write(rel, content) {
  const p = path.join(SRC, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  fs.writeFileSync(p, content, 'utf8');
  console.log('  ✓', rel);
}

console.log('Extraction qhse.html → src/\n');

write('styles/legacy-bundle.css', css + '\n');

write(
  'legacy/core.js',
  `/** @legacy — core extrait de qhse.html */\n${coreJs}\n${GLOBAL_EXPORTS}\n`
);
write(
  'legacy/pages.js',
  `/** @legacy — registre des pages */\n${pagesJs}\n${pagesExport}\n`
);
write(
  'legacy/pg-soon.js',
  `/** @legacy */\n${pgSoonJs}\n${pgSoonExport}\n`
);
write(
  'legacy/env-helpers.js',
  `/** @legacy — environnement */\n${envJs}\n${envExport}\n`
);
write('legacy/notifications.js', `/** @legacy */\n${notifJs}\n${notifExport}\n`);
write('legacy/search.js', `/** @legacy */\n${searchJs}\n${searchExport}\n`);

console.log('\nTerminé. Lancez: npm install && npm run dev');
