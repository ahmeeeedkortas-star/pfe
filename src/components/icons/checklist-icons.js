/**
 * Icônes SVG pour cartes checklists (remplace emojis dans les en-têtes).
 */
import { renderIcon } from './icon-render.js';

const CL_ICON = {
  ext: 'fire',
  sst: 'hardhat',
  phar: 'pill',
  veh: 'truck',
  epi: 'vest',
  evaq: 'siren',
};

export function renderChecklistHeaderIcon(key, size = 28) {
  const name = CL_ICON[key] || 'clipboard';
  return `<span class="xm-icon-card" style="--tile-bg:rgba(255,255,255,.2);--tile-color:#fff;width:${size + 12}px;height:${size + 12}px;border-color:rgba(255,255,255,.25)">${renderIcon(name, { size, stroke: 2.2 })}</span>`;
}
