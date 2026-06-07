/**
 * Thème clair / sombre — Paramètres.
 */
const STORAGE_KEY = 'xm-theme';

export function getTheme() {
  try {
    const t = localStorage.getItem(STORAGE_KEY);
    return t === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function setTheme(theme) {
  const next = theme === 'dark' ? 'dark' : 'light';
  applyTheme(next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    /* ignore */
  }
}

export function applyTheme(theme = 'light') {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle('xm-theme-dark', theme === 'dark');
  root.classList.toggle('xm-theme-light', theme !== 'dark');
}

export function initTheme() {
  applyTheme(getTheme());
  window.xmGetTheme = getTheme;
  window.xmSetTheme = setTheme;
  window.xmApplyTheme = applyTheme;
}
