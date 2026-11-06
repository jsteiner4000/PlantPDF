/**
 * Eingaben für Zugangsdaten: Bereiche an/aus, Spalten je Tabelle (ein/aus, Reihenfolge, eigene
 * Überschrift) und Auswahllisten (Rollen, Verschlüsselung, Dienste). Im Eigenschaftenfeld und in
 * den Einstellungen; `ctx` wie in wiring-catalog.js.
 */
import { escapeHtml, htmlToElement } from '../ui/dom.js';
import { ACCESS_BLOCKS, ACCESS_TABLES, tx } from './model.js';
import { asT, iconButton, input } from './wiring-catalog.js';

/** Bereiche, die in der PDF erscheinen. */
export function accessBlocksEditor(blocks, ctx) {
  const el = htmlToElement('<div class="sd-footparts"></div>');
  for (const b of ACCESS_BLOCKS) {
    const name = tx(b.title, 'de');
    const row = htmlToElement(`<label class="sd-check" data-block="${b.id}"><input type="checkbox"${blocks[b.id] ? ' checked' : ''}><span>${escapeHtml(name)}</span></label>`);
    row.querySelector('input').addEventListener('change', (ev) => ctx.commit(`${name} ${ev.target.checked ? 'ein' : 'aus'}`, () => (blocks[b.id] = ev.target.checked), { rebuild: true }));
    el.appendChild(row);
  }
  return el;
}

/** Spalten einer Tabelle: ein/aus (feste immer), Reihenfolge, eigene Überschrift. */
export function accessColsEditor(cols, block, ctx) {
  const el = htmlToElement('<div class="sd-wcols"></div>');
  el.dataset.table = block.id;
  const list = cols[block.id];
  const defs = new Map(block.columns.map((c) => [c.key, c]));
  list.forEach((c, i) => {
    const def = defs.get(c.key);
    if (!def) return;
    const row = htmlToElement('<div class="sd-wcol"></div>');
    row.dataset.key = c.key;
    const check = htmlToElement(`<input type="checkbox"${c.show || def.fixed ? ' checked' : ''} title="${def.fixed ? 'Immer zu sehen' : 'In der PDF zeigen'}">`);
    check.disabled = !!def.fixed;
    check.addEventListener('change', () => ctx.commit(check.checked ? 'Spalte eingeblendet' : 'Spalte ausgeblendet', () => (c.show = check.checked), { rebuild: true }));
    const name = input(asT(c, 'title').de, (v) => ctx.commit('Spaltenüberschrift geändert', () => (asT(c, 'title').de = v), { key: `acctitle:${block.id}:${c.key}` }), {
      placeholder: tx(def.label, 'de'),
      maxlength: 40,
    });
    const move = (d) =>
      ctx.commit('Spalten umgestellt', () => {
        const j = i + d;
        [list[i], list[j]] = [list[j], list[i]];
      }, { rebuild: true });
    row.append(check, name, iconButton('up', 'Nach links', () => move(-1), i === 0), iconButton('down', 'Nach rechts', () => move(1), i === list.length - 1));
    el.appendChild(row);
  });
  return el;
}

/** Spalten aller (eingeschalteten) Tabellen, je mit Überschrift. */
export function accessTablesEditor(target, ctx, onlyOn = false) {
  const el = htmlToElement('<div class="sd-acctables"></div>');
  for (const b of ACCESS_TABLES()) {
    if (onlyOn && !target.blocks[b.id]) continue;
    el.appendChild(htmlToElement(`<span class="sd-l">${escapeHtml(tx(b.title, 'de'))}</span>`));
    el.appendChild(accessColsEditor(target.cols, b, ctx));
  }
  el.appendChild(htmlToElement('<p class="sd-note">Spalten ohne Inhalt fallen beim Setzen weg. Leere Überschrift: die vorgegebene.</p>'));
  return el;
}

/** Auswahlliste als Textfeld: ein Eintrag je Zeile. */
export function listEditor(target, prop, ctx, placeholder = '') {
  const el = htmlToElement(`<textarea class="fld sd-list" rows="${Math.min(10, Math.max(3, target[prop].length + 1))}" spellcheck="false"></textarea>`);
  el.value = target[prop].join('\n');
  el.placeholder = placeholder;
  el.dataset.list = prop;
  el.addEventListener('input', () =>
    ctx.commit('Auswahlliste geändert', () => (target[prop] = el.value.split('\n').map((v) => v.trim()).filter(Boolean)), { key: 'list:' + prop }),
  );
  return el;
}
