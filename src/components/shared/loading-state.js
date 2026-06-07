/**
 * États de chargement (spinner / skeleton).
 */
export function renderLoadingOverlay(message = 'Chargement…') {
  return `<div class="xm-loading-overlay" role="status" aria-live="polite">
    <div class="xm-loading-spinner"></div>
    <span>${message}</span>
  </div>`;
}

export function renderTableSkeleton(rows = 5, cols = 6) {
  return `<tbody class="xm-skeleton-tbody">${Array.from({ length: rows })
    .map(
      () =>
        `<tr>${Array.from({ length: cols })
          .map(() => `<td><div class="xm-skeleton-cell"></div></td>`)
          .join('')}</tr>`
    )
    .join('')}</tbody>`;
}

let overlayEl = null;

export function showLoading(message) {
  hideLoading();
  overlayEl = document.createElement('div');
  overlayEl.className = 'xm-loading-root';
  overlayEl.innerHTML = renderLoadingOverlay(message);
  document.body.appendChild(overlayEl);
}

export function hideLoading() {
  overlayEl?.remove();
  overlayEl = null;
}

/**
 * Simule un appel async (API ou préparation données).
 * @template T
 * @param {() => T | Promise<T>} fn
 * @param {{ message?: string, minMs?: number }} [opts]
 */
export async function withLoading(fn, opts = {}) {
  const { message = 'Chargement…', minMs = 280 } = opts;
  showLoading(message);
  const start = Date.now();
  try {
    return await fn();
  } finally {
    const wait = Math.max(0, minMs - (Date.now() - start));
    if (wait) await new Promise((r) => setTimeout(r, wait));
    hideLoading();
  }
}
