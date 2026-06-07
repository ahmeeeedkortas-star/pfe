/**
 * Point d'entrée — Plateforme QHSE SMI
 */
import './styles/main.css';
import { initTheme } from './core/theme.js';
import { bootstrapEmptyPlatform } from './core/empty-platform.js';
import { initApp } from './app/init.js';

initTheme();
bootstrapEmptyPlatform();

initApp().catch((err) => {
  console.error('[QHSE] Échec initialisation:', err);
  document.getElementById('content').innerHTML = `
    <div class="card" style="margin:24px">
      <p style="color:var(--red);font-weight:600">Erreur de chargement</p>
      <p style="margin-top:8px;color:var(--muted)">Exécutez <code>npm run extract</code> puis <code>npm run dev</code>.</p>
      <pre style="margin-top:12px;font-size:10px;overflow:auto">${err.message}</pre>
    </div>`;
});
