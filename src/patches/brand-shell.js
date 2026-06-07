/**
 * Applique le branding XPERT MECA sur la coque (topbar).
 */
import { exposeBrandGlobals } from '../config/brand.js';
import { renderTopbarBrand } from '../components/brand/brand-markup.js';

export function installBrandShell() {
  exposeBrandGlobals();

  const logoBlock = document.querySelector('.t-logo');
  if (logoBlock) {
    logoBlock.classList.add('xm-brand-block');
    logoBlock.style.width = 'auto';
    logoBlock.innerHTML = renderTopbarBrand();
  }

  document.title = 'XPERT MECA — Plateforme QHSE';
}
