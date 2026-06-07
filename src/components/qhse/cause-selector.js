/**
 * Sélecteur de méthode d'analyse (5 Pourquoi / 5M) + rendu dynamique.
 */
import { render5Pourquoi, render5M, getWhyChain, get5MSummary } from './analysis-5p-5m.js';

/**
 * @param {string} methodKey - ex. 'rc_d4_method' → window[methodKey] = '5pourquoi' | '5M'
 * @param {string} dataPrefix - ex. 'rc_d4' → window[prefix+'_why'] ou window[prefix+'_5m']
 * @param {string} pageId - page pour refresh (goPage)
 */
export function renderCauseSelector(methodKey, dataPrefix, pageId) {
  if (!window[methodKey]) window[methodKey] = '5pourquoi';
  const method = window[methodKey];
  const whyKey = `${dataPrefix}_why`;
  const mKey = `${dataPrefix}_5m`;

  const body =
    method === '5M'
      ? render5M(mKey, pageId)
      : render5Pourquoi(whyKey, pageId);

  return `
  <div class="card" style="margin-bottom:12px;padding:12px 14px">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;flex-wrap:wrap;gap:8px">
      <div style="font-size:12px;font-weight:700;color:var(--navy)">Analyse des causes racines</div>
      <div style="display:flex;border:1px solid var(--border);border-radius:8px;overflow:hidden">
        <button type="button" class="btn bsm" style="border:none;border-radius:0;${method === '5pourquoi' ? 'background:var(--blue);color:#fff' : ''}"
          onclick="window['${methodKey}']='5pourquoi';goPage('${pageId}')">5 Pourquoi</button>
        <button type="button" class="btn bsm" style="border:none;border-radius:0;${method === '5M' ? 'background:var(--blue);color:#fff' : ''}"
          onclick="window['${methodKey}']='5M';goPage('${pageId}')">5M Ishikawa</button>
      </div>
    </div>
    ${body}
  </div>`;
}
