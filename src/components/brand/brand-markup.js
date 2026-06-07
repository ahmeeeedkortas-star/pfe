import { BRAND_NAME, BRAND_TAGLINE, BRAND_LOGO_URL } from '../../config/brand.js';

export function renderLogoImg(heightPx, { invert = false, framed = false, className = 'xm-brand-logo' } = {}) {
  const filter = invert
    ? 'filter:brightness(0) invert(1) drop-shadow(0 1px 6px rgba(96,165,250,.45));'
    : '';
  const frame = framed
    ? 'background:#fff;padding:4px 8px;border-radius:8px;border:1px solid var(--border);box-shadow:0 1px 3px rgba(15,23,42,.08);'
    : '';
  return `<img src="${BRAND_LOGO_URL}" class="${className}" style="height:${heightPx}px;width:auto;max-width:160px;object-fit:contain;display:block;${frame}${filter}" alt="${BRAND_NAME}" height="${heightPx}">`;
}

/** Bloc logo + textes (topbar claire). */
export function renderTopbarBrand() {
  return `
    ${renderLogoImg(38, { framed: true })}
    <div class="t-logo-text">
      <span class="t-logo-name">${BRAND_NAME}</span>
      <span class="t-logo-tag">${BRAND_TAGLINE}</span>
    </div>`;
}

/** En-tête sidebar (fond navy). */
export function renderSidebarBrand() {
  return `
    <div class="s-head s-head-brand">
      ${renderLogoImg(34, { framed: true })}
      <div class="s-head-brand-text">
        <strong>${BRAND_NAME}</strong>
        <span>${BRAND_TAGLINE}</span>
      </div>
    </div>`;
}
