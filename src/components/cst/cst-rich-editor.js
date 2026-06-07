/**
 * Éditeur riche léger (contenteditable) — Politique QHSE.
 */
import { esc } from './cst-utils.js';

const CMDS = [
  { cmd: 'bold', label: 'G', title: 'Gras' },
  { cmd: 'italic', label: 'I', title: 'Italique' },
  { cmd: 'underline', label: 'S', title: 'Souligné' },
  { cmd: 'strikeThrough', label: 'abc', title: 'Barré' },
  { sep: true },
  { cmd: 'undo', label: '↶', title: 'Annuler' },
  { cmd: 'redo', label: '↷', title: 'Rétablir' },
  { sep: true },
  { cmd: 'justifyLeft', label: '⟸', title: 'Aligner à gauche' },
  { cmd: 'justifyCenter', label: '≡', title: 'Centrer' },
  { cmd: 'justifyRight', label: '⟹', title: 'Aligner à droite' },
  { cmd: 'justifyFull', label: '☰', title: 'Justifier' },
  { sep: true },
  { cmd: 'formatBlock', arg: 'h1', label: 'H1', title: 'Titre principal' },
  { cmd: 'formatBlock', arg: 'h2', label: 'H2', title: 'Titre' },
  { cmd: 'formatBlock', arg: 'h3', label: 'H3', title: 'Sous-titre' },
  { cmd: 'formatBlock', arg: 'p', label: 'P', title: 'Paragraphe' },
  { sep: true },
  { cmd: 'insertUnorderedList', label: '•', title: 'Liste' },
  { cmd: 'insertOrderedList', label: '1.', title: 'Liste numérotée' },
  { sep: true },
  { action: 'table', label: '⊞', title: 'Tableau' },
  { action: 'tableRow', label: '+L', title: 'Ajouter ligne tableau' },
  { action: 'tableCol', label: '+C', title: 'Ajouter colonne tableau' },
  { action: 'image', label: '🖼', title: 'Image (URL)' },
  { action: 'link', label: '🔗', title: 'Lien' },
  { action: 'signature', label: '✍', title: 'Insérer signature' },
  { action: 'clear', label: 'Tx', title: 'Nettoyer format' },
];

export function renderRichEditorHtml(id, initialHtml = '') {
  const tools = CMDS.map((t) => {
    if (t.sep) return '<span class="cst-rich-sep"></span>';
    if (t.action) {
      return `<button type="button" class="cst-rich-btn" data-rich-action="${t.action}" data-rich-target="${esc(id)}" title="${esc(t.title)}">${t.label}</button>`;
    }
    return `<button type="button" class="cst-rich-btn" data-rich-cmd="${t.cmd}" data-rich-arg="${esc(t.arg || '')}" data-rich-target="${esc(id)}" title="${esc(t.title)}">${t.label}</button>`;
  }).join('');

  const extras = `
    <select class="fi cst-rich-ctl" data-rich-cmd-select="fontName" data-rich-target="${esc(id)}" title="Police">
      <option value="Inter">Inter</option>
      <option value="Arial">Arial</option>
      <option value="Calibri">Calibri</option>
      <option value="Times New Roman">Times New Roman</option>
    </select>
    <select class="fi cst-rich-ctl" data-rich-cmd-select="fontSize" data-rich-target="${esc(id)}" title="Taille">
      <option value="2">10</option>
      <option value="3" selected>12</option>
      <option value="4">14</option>
      <option value="5">18</option>
      <option value="6">24</option>
    </select>
    <input class="cst-rich-color" type="color" data-rich-color="foreColor" data-rich-target="${esc(id)}" title="Couleur texte" value="#1e293b">
    <button type="button" class="cst-rich-btn" data-rich-action="section" data-rich-target="${esc(id)}" title="Insérer section">§</button>
    <button type="button" class="cst-rich-btn" data-rich-action="subsection" data-rich-target="${esc(id)}" title="Insérer sous-section">§§</button>
  `;

  return `<div class="cst-rich-editor" data-rich-wrap="${esc(id)}">
    <div class="cst-rich-toolbar" role="toolbar">${tools}${extras}</div>
    <div class="cst-rich-body fi" id="${esc(id)}" contenteditable="true" role="textbox" aria-multiline="true">${initialHtml}</div>
  </div>`;
}

export function getRichEditorHtml(id) {
  return document.getElementById(id)?.innerHTML?.trim() || '';
}

function placeCaretAtEnd(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

function ensureEditorFocus(el) {
  if (!el) return;
  el.focus();
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0 || !el.contains(sel.anchorNode)) {
    placeCaretAtEnd(el);
  }
}

function insertHtmlAtCaret(el, html) {
  if (!el) return;
  ensureEditorFocus(el);
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) {
    el.insertAdjacentHTML('beforeend', html);
    return;
  }
  const range = sel.getRangeAt(0);
  range.deleteContents();
  const frag = range.createContextualFragment(html);
  const last = frag.lastChild;
  range.insertNode(frag);
  if (last) {
    const after = document.createRange();
    after.setStartAfter(last);
    after.collapse(true);
    sel.removeAllRanges();
    sel.addRange(after);
  }
}

export function bindRichEditor() {
  if (window.__cstRichBound) return;
  window.__cstRichBound = true;

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-rich-cmd], [data-rich-action]');
    if (!btn) return;
    const targetId = btn.dataset.richTarget;
    const el = document.getElementById(targetId);
    if (!el) return;
    ensureEditorFocus(el);

    if (btn.dataset.richCmd) {
      const arg = btn.dataset.richArg || null;
      document.execCommand(btn.dataset.richCmd, false, arg || undefined);
      return;
    }

    const action = btn.dataset.richAction;
    if (action === 'table') {
      const rows = Math.max(2, Math.min(8, parseInt(prompt('Nombre de lignes (2-8) :', '2') || '2', 10)));
      const cols = Math.max(2, Math.min(6, parseInt(prompt('Nombre de colonnes (2-6) :', '2') || '2', 10)));
      const head = `<tr>${Array.from({ length: cols }, (_, i) => `<th>Colonne ${i + 1}</th>`).join('')}</tr>`;
      const body = Array.from({ length: rows - 1 }, () => `<tr>${Array.from({ length: cols }, () => '<td></td>').join('')}</tr>`).join('');
      insertHtmlAtCaret(el, `<table class="cst-rich-table">${head}${body}</table><p><br></p>`);
    } else if (action === 'image') {
      const url = prompt('URL de l\'image :');
      if (url) insertHtmlAtCaret(el, `<img src="${esc(url)}" alt="" style="max-width:100%;height:auto;border-radius:6px">`);
    } else if (action === 'link') {
      const url = prompt('URL du lien :');
      if (url) document.execCommand('createLink', false, url);
    } else if (action === 'tableRow') {
      const cell = window.getSelection()?.anchorNode?.parentElement?.closest('td,th');
      const row = cell?.closest('tr');
      if (row && row.parentElement) {
        const cols = row.children.length;
        const newRow = document.createElement('tr');
        newRow.innerHTML = Array.from({ length: cols }, () => '<td></td>').join('');
        row.parentElement.insertBefore(newRow, row.nextSibling);
      }
    } else if (action === 'tableCol') {
      const cell = window.getSelection()?.anchorNode?.parentElement?.closest('td,th');
      const table = cell?.closest('table');
      const colIndex = cell ? [...cell.parentElement.children].indexOf(cell) : -1;
      if (table && colIndex >= 0) {
        [...table.querySelectorAll('tr')].forEach((tr) => {
          const isHead = tr.querySelector('th');
          const elTag = isHead ? 'th' : 'td';
          const newCell = document.createElement(elTag);
          newCell.textContent = '';
          tr.insertBefore(newCell, tr.children[colIndex + 1] || null);
        });
      }
    } else if (action === 'section') {
      insertHtmlAtCaret(el, '<h2>Nouvelle section</h2><p>Contenu de la section...</p>');
    } else if (action === 'subsection') {
      insertHtmlAtCaret(el, '<h3>Sous-section</h3><p>Détails...</p>');
    } else if (action === 'signature') {
      const nom = prompt('Nom signataire :');
      if (!nom) return;
      const role = prompt('Rôle / fonction :') || '';
      const date = new Date();
      const dd = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
      insertHtmlAtCaret(el, `<p><strong>Signature:</strong> ${esc(nom)} ${role ? `(${esc(role)})` : ''} — ${dd}</p>`);
    } else if (action === 'clear') {
      document.execCommand('removeFormat', false);
    }
  });

  document.addEventListener('change', (e) => {
    const sel = e.target.closest('[data-rich-cmd-select]');
    if (sel) {
      const targetId = sel.dataset.richTarget;
      const el = document.getElementById(targetId);
      if (!el) return;
      ensureEditorFocus(el);
      document.execCommand(sel.dataset.richCmdSelect, false, sel.value);
      return;
    }
    const color = e.target.closest('[data-rich-color]');
    if (color) {
      const targetId = color.dataset.richTarget;
      const el = document.getElementById(targetId);
      if (!el) return;
      ensureEditorFocus(el);
      document.execCommand(color.dataset.richColor, false, color.value);
    }
  });
}
