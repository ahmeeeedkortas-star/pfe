/**
 * Notifications — correction panel hidden/display + icônes SVG.
 */
import { NOTIF_TYPE_COLOR, NOTIF_TYPE_ICON } from '../components/icons/xm-icons.js';
import { renderIcon } from '../components/icons/icon-render.js';

function notifPanel() {
  return document.getElementById('notif-panel');
}

function isPanelOpen() {
  const p = notifPanel();
  return p && !p.hidden;
}

function setPanelOpen(open) {
  const p = notifPanel();
  const btn = document.getElementById('notif-btn');
  if (!p) return;
  p.hidden = !open;
  if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}

function renderNotifIcon(type) {
  const name = NOTIF_TYPE_ICON[type] || 'info';
  const col = NOTIF_TYPE_COLOR[type] || NOTIF_TYPE_COLOR.info;
  return `<span class="xm-notif-icon" style="--ni-bg:${col.bg};--ni-border:${col.border};--ni-color:${col.accent}">
    ${renderIcon(name, { size: 18, stroke: 2.2 })}
  </span>`;
}

function renderNotifListModern() {
  const list = document.getElementById('notif-list');
  const data = window.NOTIFICATIONS;
  if (!list || !data) return;

  const unread = data.filter((n) => !n.read);
  const badge = document.getElementById('notif-badge');
  const txt = document.getElementById('notif-unread-txt');

  if (badge) {
    badge.textContent = String(unread.length);
    badge.hidden = unread.length === 0;
  }
  if (txt) {
    txt.textContent = unread.length
      ? `${unread.length} non lue${unread.length > 1 ? 's' : ''}`
      : 'Tout est lu';
  }

  list.innerHTML = data
    .map((n) => {
      const col = NOTIF_TYPE_COLOR[n.type] || NOTIF_TYPE_COLOR.info;
      const bg = n.read ? '#fff' : col.bg;
      const action = (n.action || '').replace(/'/g, "\\'");
      return `<button type="button" class="xm-notif-row${n.read ? ' is-read' : ''}" data-notif-id="${n.id}" data-notif-action="${action}"
        style="background:${bg}">
        ${renderNotifIcon(n.type)}
        <span class="xm-notif-body">
          <span class="xm-notif-title">${n.title}</span>
          <span class="xm-notif-text">${n.body}</span>
          <span class="xm-notif-time">${n.time}</span>
        </span>
        ${!n.read ? '<span class="xm-notif-dot" aria-hidden="true"></span>' : ''}
      </button>`;
    })
    .join('');
}

function patchNotifications() {
  window.renderNotifList = renderNotifListModern;

  window.toggleNotif = function toggleNotifXm() {
    if (typeof window.closeSearch === 'function') window.closeSearch();
    setPanelOpen(!isPanelOpen());
    if (isPanelOpen()) renderNotifListModern();
  };

  const prevRead = window.readNotif;
  window.readNotif = function readNotifXm(id, action) {
    const n = window.NOTIFICATIONS?.find((x) => x.id === id);
    if (n) n.read = true;
    renderNotifListModern();
    setPanelOpen(false);
    if (action && window.goPage) window.goPage(action);
    else if (prevRead) prevRead(id, action);
  };

  window.markAllRead = function markAllReadXm() {
    window.NOTIFICATIONS?.forEach((n) => {
      n.read = true;
    });
    renderNotifListModern();
  };

  document.addEventListener('click', (e) => {
    const row = e.target.closest('[data-notif-id]');
    if (row) {
      e.preventDefault();
      window.readNotif(Number(row.dataset.notifId), row.dataset.notifAction);
      return;
    }

    const wrap = document.getElementById('notif-wrap');
    if (wrap && !wrap.contains(e.target)) setPanelOpen(false);
  });

  renderNotifListModern();
}

export function initNotifBellButton() {
  const btn = document.getElementById('notif-btn');
  if (!btn || btn.dataset.xmBell) return;
  btn.dataset.xmBell = '1';
  btn.innerHTML = `${renderIcon('bell', { size: 20, stroke: 2 })}<span class="t-badge" id="notif-badge">3</span>`;
  btn.classList.add('xm-notif-btn');
}

export function installNotificationsUi() {
  initNotifBellButton();
  patchNotifications();
}
