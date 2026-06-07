/**
 * Diffusion rapport 8D au client — modale, envoi, aperçu.
 */
import { formatRcDate } from '../../data/rc.data.js';
import { ensureRc8dFields, findRcRecord } from '../../data/rc-8d-defaults.js';
import { updateRc } from '../../data/rc-repository.js';
import { normalizeActionType } from '../../components/qhse/action-types.js';
import { RC_BROADCAST_FROM_EMAIL, RC_BROADCAST_FROM_NAME } from '../../config/rc-broadcast.js';

function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/"/g, '&quot;');
}

function collectActions(rc, step) {
  const ref = rc.n;
  const fromRc =
    step === 7
      ? rc.d7Actions || []
      : step === 5
        ? rc.d5Actions || []
        : rc.d3Actions || [];

  const fromWf =
    step === 7
      ? window.rc_d7_acts || []
      : step === 5
        ? window.rc_d5_acts || []
        : window.rc_d3_acts || [];

  const fromRegistry = (window.RC_ACTIONS || []).filter((a) => {
    if (a.ref !== ref) return false;
    const t = normalizeActionType(a.type);
    if (step === 7) return t === 'Préventive';
    if (step === 5) return t === 'Corrective';
    return t === 'Immédiate';
  });

  const merged = [...fromRc, ...fromWf, ...fromRegistry];
  const seen = new Set();
  return merged.filter((a) => {
    const key = `${a.action || a.label || ''}|${a.resp || ''}`;
    if (!key.trim() || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function renderActionList(actions) {
  if (!actions.length) return '<p style="color:#94a3b8;font-size:11px">Aucune action enregistrée.</p>';
  return `<ul style="margin:0;padding-left:18px;font-size:11px;line-height:1.6">
    ${actions
      .map(
        (a) =>
          `<li><strong>${esc(a.action || a.label || '—')}</strong>${a.resp ? ` — ${esc(a.resp)}` : ''}${a.statut ? ` <em>(${esc(a.statut)})</em>` : ''}</li>`
      )
      .join('')}
  </ul>`;
}

export function buildRcBroadcastHtml(rc, step) {
  ensureRc8dFields(rc);
  const causes =
    rc.d4Causes5P?.length > 0
      ? rc.d4Causes5P.join(', ')
      : (window.rc_d4_why || []).filter(Boolean).join(' → ') || '—';

  const d2 = `
    <section style="margin-bottom:14px">
      <h4 style="margin:0 0 8px;font-size:12px;color:#1e40af">D2 — Description du problème</h4>
      <table style="width:100%;font-size:11px;border-collapse:collapse">
        <tr><td style="padding:4px 8px;color:#64748b;width:120px">Quoi</td><td>${esc(rc.d2What || rc.obj || '—')}</td></tr>
        <tr><td style="padding:4px 8px;color:#64748b">Où</td><td>${esc(rc.d2Where || '—')}</td></tr>
        <tr><td style="padding:4px 8px;color:#64748b">Quand</td><td>${esc(rc.d2When || rc.d || '—')}</td></tr>
        <tr><td style="padding:4px 8px;color:#64748b">Qui</td><td>${esc(rc.d2Who || '—')}</td></tr>
        <tr><td style="padding:4px 8px;color:#64748b">Quantité</td><td>${esc(rc.d2Qty || '—')}</td></tr>
      </table>
    </section>`;

  const d3 = `
    <section style="margin-bottom:14px">
      <h4 style="margin:0 0 8px;font-size:12px;color:#1e40af">D3 — Actions immédiates</h4>
      ${renderActionList(collectActions(rc, 3))}
    </section>`;

  const d4 = `
    <section style="margin-bottom:14px">
      <h4 style="margin:0 0 8px;font-size:12px;color:#1e40af">D4 — Cause racine</h4>
      <p style="margin:0 0 6px;font-size:11px"><strong>Cause principale :</strong> ${esc(rc.d4CauseMain || '—')}</p>
      <p style="margin:0;font-size:11px;color:#64748b">Analyse : ${esc(causes)}</p>
    </section>`;

  const d5 = `
    <section style="margin-bottom:14px">
      <h4 style="margin:0 0 8px;font-size:12px;color:#1e40af">D5 — Actions correctives</h4>
      ${renderActionList(collectActions(rc, 5))}
    </section>`;

  const d7 = `
    <section style="margin-bottom:14px">
      <h4 style="margin:0 0 8px;font-size:12px;color:#1e40af">D7 — Actions préventives</h4>
      ${renderActionList(collectActions(rc, 7))}
    </section>`;

  const header = `
    <div style="margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid #e2e8f0">
      <div style="font-size:16px;font-weight:800;color:#0f2044">Rapport 8D — ${esc(rc.n)}</div>
      <div style="font-size:11px;color:#64748b;margin-top:4px">Client : ${esc(rc.cl)} · Projet ${esc(rc.p)} · ${esc(rc.d)}</div>
    </div>`;

  if (step === 7) return `${header}${d2}${d4}${d7}`;
  return `${header}${d2}${d3}${d4}${d5}`;
}

function buildPlainTextReport(rc, step) {
  const html = buildRcBroadcastHtml(rc, step);
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<\/tr>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function sync8dActionsToRc(rc) {
  const map = [
    ['rc_d3_acts', 'd3Actions'],
    ['rc_d5_acts', 'd5Actions'],
    ['rc_d7_acts', 'd7Actions'],
  ];
  const patch = {};
  map.forEach(([wfKey, field]) => {
    const acts = window[wfKey];
    if (Array.isArray(acts) && acts.length) patch[field] = acts.map((a) => ({ ...a }));
  });
  if (Object.keys(patch).length) {
    updateRc(rc.n, patch);
    Object.assign(rc, patch);
  }
}

export function renderRcBroadcastFooter(rc, step) {
  if (!rc) return '';
  const ref = esc(rc.n);
  if (rc.broadcastSent) {
    return `<div class="rc-broadcast-bar" style="margin-top:14px;padding:12px 14px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap">
      <span style="font-size:11px;color:#16a34a;font-weight:600">✅ Envoyé le ${esc(rc.broadcastDate)}${rc.broadcastFrom ? ` · De : ${esc(rc.broadcastFrom)}` : ''}</span>
      <button type="button" class="btn bsm" onclick="rcOpenBroadcast('${ref}',${step})">Renvoyer</button>
    </div>`;
  }
  return `<div class="rc-broadcast-bar" style="margin-top:14px;padding:12px 14px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px">
    <button type="button" class="btn bp bsm" onclick="rcOpenBroadcast('${ref}',${step})">📧 Envoyer rapport au client</button>
  </div>`;
}

function closeModal() {
  document.getElementById('rc-broadcast-modal')?.remove();
}

export function rcOpenBroadcast(rcRef, step) {
  const rc = findRcRecord(rcRef);
  if (!rc) {
    window.xmToast?.('Réclamation introuvable', rcRef, 'alert', '#dc2626');
    return;
  }
  ensureRc8dFields(rc);
  const preview = buildRcBroadcastHtml(rc, step);
  const emailVal = esc(rc.emailClient || '');

  closeModal();
  const ov = document.createElement('div');
  ov.id = 'rc-broadcast-modal';
  ov.className = 'xm-modal-overlay';
  ov.innerHTML = `<div class="xm-modal xm-modal--wide" style="max-width:720px">
    <div class="xm-modal__head">
      <span class="xm-modal__title">📧 Rapport client — ${esc(rc.n)} (D${step})</span>
      <button type="button" class="xm-modal__close" data-rc-broadcast-close>✕</button>
    </div>
    <div class="xm-modal__body">
      <div style="font-size:11px;color:#64748b;margin-bottom:10px;padding:8px 10px;background:#f8fafc;border-radius:8px;border:1px solid #e2e8f0">
        <strong>Expéditeur :</strong> ${esc(RC_BROADCAST_FROM_NAME)} &lt;${esc(RC_BROADCAST_FROM_EMAIL)}&gt;
      </div>
      <label class="fl">Email client <span style="color:#dc2626">*</span></label>
      <input type="email" class="fi" id="rc-broadcast-email" placeholder="client@exemple.com" value="${emailVal}" required style="margin-bottom:12px">
      <div class="rc-broadcast-preview card" style="padding:16px;max-height:360px;overflow-y:auto;background:#fff" id="rc-broadcast-preview">${preview}</div>
    </div>
    <div class="xm-modal__foot">
      <button type="button" class="btn" data-rc-broadcast-close>Annuler</button>
      <button type="button" class="btn bsm" data-rc-broadcast-print>🖨 Imprimer</button>
      <button type="button" class="btn bp" data-rc-broadcast-send data-rc-ref="${esc(rc.n)}" data-rc-step="${step}">Envoyer</button>
    </div>
  </div>`;
  document.body.appendChild(ov);

  ov.addEventListener('click', async (e) => {
    if (e.target === ov || e.target.closest('[data-rc-broadcast-close]')) closeModal();
    if (e.target.closest('[data-rc-broadcast-print]')) {
      const w = window.open('', '_blank');
      if (w) {
        w.document.write(`<html><head><title>Rapport ${rc.n}</title></head><body>${preview}</body></html>`);
        w.document.close();
        w.print();
      }
    }
    const sendBtn = e.target.closest('[data-rc-broadcast-send]');
    if (sendBtn) {
      const email = document.getElementById('rc-broadcast-email')?.value?.trim() || '';
      if (!email) {
        window.xmToast?.('Email client requis', 'Saisissez l\'adresse du destinataire', 'alert', '#dc2626');
        return;
      }
      sendBtn.disabled = true;
      sendBtn.textContent = 'Envoi en cours…';
      const ok = await rcSendBroadcast(rc.n, step, email);
      if (ok) closeModal();
      else {
        sendBtn.disabled = false;
        sendBtn.textContent = 'Envoyer';
      }
    }
  });
}

export async function rcSendBroadcast(rcRef, step, email) {
  const rc = findRcRecord(rcRef);
  if (!rc) return false;

  if (!email) {
    window.xmToast?.('Email client requis', '', 'alert', '#dc2626');
    return false;
  }

  sync8dActionsToRc(rc);
  if (email !== rc.emailClient) {
    updateRc(rcRef, { emailClient: email });
    rc.emailClient = email;
  }

  const subject = `Rapport 8D — ${rc.n} — ${rc.cl} (D${step})`;
  const html = buildRcBroadcastHtml(rc, step);
  const text = `${buildPlainTextReport(rc, step)}\n\n---\n${RC_BROADCAST_FROM_NAME}\n${RC_BROADCAST_FROM_EMAIL}`;

  try {
    const res = await fetch('/api/rc/send-broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to: email, subject, html, text }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data.ok) {
      const msg =
        data.reason === 'smtp_not_configured'
          ? 'Serveur email non configuré — lancez npm run server avec le fichier .env'
          : data.error || data.reason || 'Échec envoi email';
      window.xmToast?.('Envoi impossible', msg, 'alert', '#dc2626');
      return false;
    }

    const patch = {
      broadcastSent: true,
      broadcastDate: formatRcDate(),
      broadcastFrom: RC_BROADCAST_FROM_EMAIL,
      emailClient: email,
      [`broadcastD${step}`]: true,
    };
    updateRc(rcRef, patch);
    Object.assign(rc, patch);

    window.xmToast?.(
      'Rapport envoyé au client',
      `${rcRef} → ${email} · De : ${RC_BROADCAST_FROM_EMAIL}`,
      'mail',
      '#2563eb'
    );
    window.pushNotif?.({
      titre: 'Rapport RC envoyé',
      msg: `${rcRef} → ${email} · De : ${RC_BROADCAST_FROM_EMAIL}`,
      type: 'info',
    });
    window.reloadPage?.('rc-8d') ?? window.goPage?.('rc-8d');
    return true;
  } catch (err) {
    window.xmToast?.(
      'Serveur indisponible',
      'Lancez npm run server (port 3001) puis réessayez.',
      'alert',
      '#dc2626'
    );
    return false;
  }
}

export function rcSave8dField(rcRef, field, value) {
  const patch = { [field]: value };
  updateRc(rcRef, patch);
  const rc = findRcRecord(rcRef);
  if (rc) rc[field] = value;
}

export function rcGoTo8dFromAction(ref, step) {
  window.STATE.currentRC = ref;
  window.STATE.d8Step = step;
  window.goPage?.('rc-8d');
}

export function installRcBroadcast() {
  window.ensureRc8dFields = ensureRc8dFields;
  window.findRcRecord = findRcRecord;
  window.rcOpenBroadcast = rcOpenBroadcast;
  window.rcSendBroadcast = (ref, step) => {
    const email = document.getElementById('rc-broadcast-email')?.value?.trim() || '';
    rcSendBroadcast(ref, step, email);
  };
  window.rcSave8dField = rcSave8dField;
  window.rcGoTo8dFromAction = rcGoTo8dFromAction;
  window.renderRcBroadcastFooter = renderRcBroadcastFooter;
  window.buildRcBroadcastHtml = buildRcBroadcastHtml;
}
