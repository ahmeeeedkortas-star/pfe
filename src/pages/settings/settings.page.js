/**
 * Paramètres plateforme — thème, préférences.
 */
import { getTheme, setTheme } from '../../core/theme.js';

export function renderSettingsPage() {
  const dark = getTheme() === 'dark';
  return `<div class="settings-page content-inner">
    <div class="card settings-card">
      <h2 class="settings-card__title">Paramètres</h2>
      <p class="settings-card__sub">Personnalisation de l'interface XPERT MECA</p>

      <section class="settings-section">
        <h3 class="settings-section__title">Apparence</h3>
        <div class="settings-row settings-row--theme">
          <div class="settings-row__text">
            <strong>Mode sombre</strong>
            <span>Interface sombre pour les modules. Désactivé : thème clair.</span>
          </div>
          <label class="xm-toggle" title="Activer / désactiver le mode sombre">
            <input type="checkbox" id="xm-theme-toggle" ${dark ? 'checked' : ''} aria-label="Mode sombre">
            <span class="xm-toggle__track"><span class="xm-toggle__thumb"></span></span>
          </label>
        </div>
        <p class="settings-hint" id="xm-theme-status">${dark ? 'Mode sombre activé' : 'Mode clair activé'}</p>
      </section>

      <section class="settings-section">
        <h3 class="settings-section__title">Recherche globale</h3>
        <p class="settings-card__sub" style="margin:0">Utilisez la barre en haut : modules, pages RC/NC, raccourcis clavier ↑ ↓ Entrée Échap.</p>
      </section>
    </div>
  </div>`;
}

export function bindSettingsPage() {
  const toggle = document.getElementById('xm-theme-toggle');
  const status = document.getElementById('xm-theme-status');
  if (!toggle) return;

  toggle.addEventListener('change', () => {
    const theme = toggle.checked ? 'dark' : 'light';
    setTheme(theme);
    if (status) {
      status.textContent = theme === 'dark' ? 'Mode sombre activé' : 'Mode clair activé';
    }
  });
}

