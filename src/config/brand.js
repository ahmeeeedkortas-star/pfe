/**
 * Identité visuelle XPERT MECA — logo et libellés plateforme.
 */
import logoUrl from '../data/image/logo.png';
import { BRAND_COLORS, exposeBrandColors } from './brand-colors.js';

export const BRAND_NAME = 'XPERT MECA';
export const BRAND_TAGLINE = 'Plateforme QHSE';
export const BRAND_LOGO_URL = logoUrl;
export { BRAND_COLORS };

/** Expose pour pages legacy (templates string). */
export function exposeBrandGlobals() {
  window.XM_BRAND_NAME = BRAND_NAME;
  window.XM_BRAND_TAGLINE = BRAND_TAGLINE;
  window.XM_LOGO_URL = BRAND_LOGO_URL;
  exposeBrandColors();
}
