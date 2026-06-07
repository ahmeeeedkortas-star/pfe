/**
 * Composant Modal réutilisable (remplace les overlays inline du legacy).
 */
import { escapeHtml } from '../../utils/dom.js';

/**
 * @param {object} options
 * @param {string} options.id
 * @param {string} options.title
 * @param {string} options.bodyHtml
 * @param {string} [options.headerClass]
 * @param {() => void} [options.onClose]
 */
export function openModal({ id, title, bodyHtml, headerClass = 'modal__header--navy', onClose }) {
  closeModal(id);

  const overlay = document.createElement('div');
  overlay.id = id;
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true" aria-labelledby="${id}-title">
      <header class="modal__header ${headerClass}">
        <h2 id="${id}-title" style="font-size:13px;font-weight:700">${escapeHtml(title)}</h2>
        <button type="button" class="btn-icon modal-close" aria-label="Fermer" style="color:inherit">✕</button>
      </header>
      <div class="modal__body">${bodyHtml}</div>
    </div>`;

  const close = () => {
    overlay.remove();
    onClose?.();
  };

  overlay.querySelector('.modal-close')?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.body.appendChild(overlay);
  return { el: overlay, close };
}

export function closeModal(id) {
  document.getElementById(id)?.remove();
}
