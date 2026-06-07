/**
 * XPERT-MECA — animations, toasts, effets UI (spec v5).
 */

const REDUCED = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Pages données / formulaires : pas de transition lourde, stagger ni tilt 3D.
 * Inclut RC & NC (listes, fiches, actions, onglets).
 */
/** Pages métier : pas de transition lourde / tilt / stagger (évite gel & flash). */
export function isInteractivePage(pageId) {
  const p = pageId || window.STATE?.page || '';
  if (!p || p === 'accueil') return false;
  return (
    p.startsWith('sec-') ||
    p.startsWith('rc-') ||
    p.startsWith('nc-') ||
    p.startsWith('env-') ||
    p.startsWith('audit-') ||
    p.startsWith('cst-')
  );
}

function ensureToastRoot() {
  let root = document.getElementById('xm-toast');
  if (!root) {
    root = document.createElement('div');
    root.id = 'xm-toast';
    root.setAttribute('aria-live', 'polite');
    document.body.appendChild(root);
  }
  return root;
}

/** @param {string} msg @param {string} [sub] @param {string} [icon] @param {string} [color] */
export function xmToast(msg, sub = '', icon = '✓', color = '#2563eb') {
  const root = ensureToastRoot();
  const el = document.createElement('div');
  el.className = 'xm-toast-item';
  el.innerHTML = `
    <span style="font-size:20px;line-height:1">${icon}</span>
    <div style="flex:1;min-width:0">
      <div style="font-weight:700;font-size:12px;color:var(--navy)">${msg}</div>
      ${sub ? `<div style="font-size:10px;color:var(--muted);margin-top:2px">${sub}</div>` : ''}
    </div>`;
  el.style.borderLeft = `3px solid ${color}`;
  root.appendChild(el);
  setTimeout(() => {
    el.classList.add('is-out');
    setTimeout(() => el.remove(), 320);
  }, 3200);
}

export function confettiBurst(x, y, count = 28) {
  if (REDUCED()) return;
  const colors = ['#2563eb', '#16a34a', '#dc2626', '#ea580c', '#7c3aed', '#0ea5e9'];
  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.className = 'confetti-piece';
    const size = 6 + Math.random() * 6;
    p.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size * (Math.random() > 0.5 ? 1 : 0.5)}px;
      background:${colors[i % colors.length]};border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      pointer-events:none;z-index:9999;
      animation:confettiFall ${0.8 + Math.random() * 0.8}s ease-out forwards;
      transform:translate(${(Math.random() - 0.5) * 120}px,0)`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1800);
  }
}

export function particleBurst(x, y, color = '#2563eb') {
  if (REDUCED()) return;
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2;
    const d = 28 + Math.random() * 22;
    const p = document.createElement('span');
    p.className = 'particle';
    p.style.cssText = `
      position:fixed;left:${x}px;top:${y}px;width:6px;height:6px;border-radius:50%;
      background:${color};pointer-events:none;z-index:9998;
      --dx:${Math.cos(a) * d}px;--dy:${Math.sin(a) * d}px;
      animation:particleBurst 0.5s ease-out forwards`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 550);
  }
}

export function animateCountUp(el, delay = 0) {
  if (!el || REDUCED()) return;
  const text = (el.textContent || '').trim();
  if (!/^\d+([.,]\d+)?$/.test(text.replace(/\s/g, ''))) return;
  const raw = text.replace(',', '.');
  const target = parseFloat(raw);
  if (Number.isNaN(target)) return;
  const suffix = (el.textContent || '').replace(/[\d.,\s]/g, '');
  const start = performance.now() + delay;
  const dur = 800;
  const tick = (now) => {
    const t = Math.min(1, (now - start) / dur);
    if (t < 0) {
      requestAnimationFrame(tick);
      return;
    }
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const v = Math.round(target * eased);
    el.textContent = `${v}${suffix}`;
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

export function initTilt(card) {
  if (!card || card.dataset.tiltBound || REDUCED() || card.querySelector('.card-shine')) return;
  if (
    card.closest('[id^="cl-app-"]') ||
    card.closest('.no-tilt') ||
    card.closest('.is-interactive-page') ||
    card.closest('#content.is-interactive-page')
  ) {
    return;
  }
  card.dataset.tiltBound = '1';
  card.classList.add('card-3d');
  card.style.position = card.style.position || 'relative';
  const shine = document.createElement('div');
  shine.className = 'card-shine';
  card.appendChild(shine);
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(900px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
    shine.style.setProperty('--sx', `${(px + 0.5) * 100}%`);
    shine.style.setProperty('--sy', `${(py + 0.5) * 100}%`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
}

export function initMagnetic(btn) {
  if (!btn || btn.dataset.magBound || REDUCED()) return;
  if (btn.closest('[id^="cl-app-"]') || btn.hasAttribute('data-cl-rep')) return;
  btn.dataset.magBound = '1';
  btn.addEventListener('mousemove', (e) => {
    const r = btn.getBoundingClientRect();
    const dx = ((e.clientX - r.left) / r.width - 0.5) * 0.2;
    const dy = ((e.clientY - r.top) / r.height - 0.5) * 0.2;
    btn.style.transform = `translate(${dx * r.width}px, ${dy * r.height}px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
}

function spawnRipple(target, x, y) {
  const r = document.createElement('span');
  r.className = 'btn-ripple';
  const size = Math.max(target.offsetWidth, target.offsetHeight);
  r.style.width = r.style.height = `${size}px`;
  r.style.left = `${x - target.offsetWidth / 2}px`;
  r.style.top = `${y - target.offsetHeight / 2}px`;
  target.style.position = 'relative';
  target.style.overflow = 'hidden';
  target.appendChild(r);
  setTimeout(() => r.remove(), 600);
}

export function staggerContent(container) {
  if (!container || REDUCED() || container.classList.contains('is-interactive-page')) return;
  const filtered = [...container.querySelectorAll('.card')]
    .filter((el) => !el.closest('[id^="cl-app-"]'))
    .slice(0, 8);
  filtered.forEach((el, i) => {
    el.classList.add('stagger-in');
    el.style.animationDelay = `${Math.min(i * 0.03, 0.2)}s`;
  });
  container.querySelectorAll('[data-count-up]').forEach((el, i) => animateCountUp(el, i * 40));
}

import { clearContentMotionStyles } from '../core/page-refresh.js';

export { clearContentMotionStyles };

/** Transition contenu — rendu instantané (évite flash, opacity bloquée, tilt). */
export async function animatePageSwap(container, renderHtml, pageId) {
  if (!container) return renderHtml();
  const light = isInteractivePage(pageId || window.STATE?.page);
  const noHeavy =
    REDUCED() ||
    light ||
    document.documentElement.classList.contains('xm-no-heavy-motion');

  if (light) container.classList.add('is-interactive-page');
  else container.classList.remove('is-interactive-page');

  clearContentMotionStyles(container);
  container.classList.remove('is-page-exit', 'is-page-enter', 'pg-morph');
  container.style.pointerEvents = 'none';

  const html = await renderHtml();
  if (html != null && html !== '') container.innerHTML = html;

  clearContentMotionStyles(container);
  container.style.pointerEvents = '';

  if (!noHeavy) staggerContent(container);

  return html;
}

let scanScheduled = false;
let tiltCount = 0;
const TILT_MAX = 28;

function scanNode(node) {
  if (node.nodeType !== 1) return;
  const content = document.getElementById('content');
  if (!content || content.classList.contains('is-interactive-page')) return;

  const root = node.id === 'content' ? node : node.closest?.('#content') || node;
  if (root.id !== 'content' && node.id !== 'content') {
    if (node.classList?.contains('card') && !node.closest('[id^="cl-app-"]') && tiltCount < TILT_MAX) {
      initTilt(node);
      tiltCount++;
    }
    return;
  }
  root.querySelectorAll?.('.card').forEach((card) => {
    if (!card.closest('[id^="cl-app-"]') && tiltCount < TILT_MAX) {
      initTilt(card);
      tiltCount++;
    }
  });
  root.querySelectorAll?.('.btn.bp, .btn.bg2, .btn-danger').forEach((btn) => {
    if (btn.closest('[id^="cl-app-"]') || btn.hasAttribute('data-cl-rep')) return;
    const t = (btn.textContent || '').trim();
    if (t.length > 0 && t.length < 24) initMagnetic(btn);
  });
  root.querySelectorAll?.('[data-count-up]').forEach((el, i) => animateCountUp(el, i * 40));
}

export function installXmMotion() {
  window.xmToast = xmToast;
  window.confettiBurst = confettiBurst;
  window.particleBurst = particleBurst;
  window.animateCountUp = animateCountUp;

  /* Tilt 3D / magnétisme désactivés — source de bugs d'affichage sur cartes et boutons */
  if (document.documentElement.classList.contains('xm-no-heavy-motion')) {
    return;
  }

  document.addEventListener(
    'click',
    (e) => {
      const btn = e.target.closest('.btn, button');
      if (!btn || btn.disabled) return;
      if (
        btn.hasAttribute('data-cl-rep') ||
        btn.closest('[id^="cl-app-"]') ||
        (btn.closest('.is-interactive-page') && !btn.closest('.xm-v11-surface'))
      ) {
        return;
      }
      const rect = btn.getBoundingClientRect();
      spawnRipple(btn, e.clientX - rect.left, e.clientY - rect.top);
      if (btn.classList.contains('bp') || btn.classList.contains('bg2') || btn.classList.contains('btn-danger')) {
        if (!isInteractivePage()) particleBurst(e.clientX, e.clientY);
      }
    },
    { passive: true }
  );

  const content = document.getElementById('content');
  if (content) {
    const mo = new MutationObserver(() => {
      if (scanScheduled) return;
      scanScheduled = true;
      requestAnimationFrame(() => {
        scanScheduled = false;
        tiltCount = 0;
        scanNode(content);
      });
    });
    mo.observe(content, { childList: true, subtree: true });
  }
}
