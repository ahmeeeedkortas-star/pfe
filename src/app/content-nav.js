/**
 * Délégation [data-nav] — navigation sans onclick inline.
 */
import { bindRcListeFilters } from '../pages/rc/rc-liste.page.js';
import { bindRcActions } from '../pages/rc/rc-actions.page.js';
import { bindNcListeFilters } from '../pages/nc/nc-liste.page.js';
import { bindChecklistDelegation } from '../components/qhse/dynamic-checklist.js';
import { bindSecUrgenceDelegation } from '../pages/sec/sec-urgence.page.js';
import { bindSecDocsDelegation } from '../pages/sec/sec-docs.page.js';
import { bindAuditDocsDelegation } from '../pages/audit/audit-docs.page.js';

let filterScheduled = false;

function scheduleFilterBind() {
  if (filterScheduled) return;
  filterScheduled = true;
  requestAnimationFrame(() => {
    filterScheduled = false;
    if (document.getElementById('rc-tbody') && document.getElementById('rc-fq')) {
      bindRcListeFilters();
    }
    if (document.getElementById('nc-tbody') && document.getElementById('nc-fq')) {
      bindNcListeFilters();
    }
    if (document.querySelector('[data-page="rc-actions"]')) {
      bindRcActions();
    }
  });
}

export function bindContentNavigation({ goPage }) {
  const content = document.getElementById('content');
  if (!content) return;

  bindChecklistDelegation(content);
  bindSecUrgenceDelegation(content);
  bindSecDocsDelegation(content);
  bindAuditDocsDelegation(content);

  content.addEventListener('click', (e) => {
    if (e.target.closest('[data-sec-refresh-kpi]')) {
      window.reloadPage?.('sec-kpi');
      return;
    }
    const nav = e.target.closest('[data-nav]');
    if (nav) {
      e.preventDefault();
      goPage(nav.getAttribute('data-nav'));
      return;
    }
    if (
      e.target.closest(
        'button, a, input, textarea, select, label, [data-cl-rep], [data-cl-save], [data-cl-gen-nc], [data-cl-toggle-edit], [data-cl-save-info], [data-cl-photo], [data-cl-field], [data-cl-obs], [data-cl-open], [data-cl-del-inst], [data-cl-reg-open]'
      )
    ) {
      return;
    }
  });

  const observer = new MutationObserver(() => {
    scheduleFilterBind();
  });
  observer.observe(content, { childList: true });
}
