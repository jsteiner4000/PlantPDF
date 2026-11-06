/**
 * Eingaben für die Kataloge eines Anschlussplans – Leitungsarten, Kennzeichen, Spalten des
 * Klemmenplans und was der Plan zeigt. Dieselben Bausteine dienen im Eigenschaftenfeld (für das
 * geöffnete Dokument) und in den Einstellungen (Vorgaben für neue Dokumentationen).
 *
 * `ctx.commit(label, fn, { key, rebuild })` führt eine Änderung aus (`fn` ändert das Ziel); `key`
 * fasst Tippen zu einem Schritt zusammen, `rebuild` baut die Eingaben neu auf. `ctx.langs`: die
 * Sprachen der Texte (['de'] oder ['de', 'en']). `ctx.used`: Kennungen, die im Plan verwendet werden
 * (nicht löschbar).
 */
import { icon } from '../ui/icons.js';
import { escapeHtml, htmlToElement } from '../ui/dom.js';
import { STRINGS, T, TERMINAL_COLUMNS, WIRE_STYLES, WIRE_WIDTHS, newCategory, newMarking, tx } from './model.js';

/** Aderfarben nach IEC 60757 (Vorschläge; frei eingebbar). */
const WIRE_COLORS = [
  ['BK', 'schwarz'],
  ['BN', 'braun'],
  ['RD', 'rot'],
  ['OG', 'orange'],
  ['YE', 'gelb'],
  ['GN', 'grün'],
  ['BU', 'blau'],
  ['VT', 'violett'],
  ['GY', 'grau'],
  ['WH', 'weiß'],
  ['PK', 'rosa'],
  ['GNYE', 'grün-gelb'],
  ['RD/BK', 'rot/schwarz'],
  ['WH/BN', 'weiß/braun'],
];
const CROSS_SECTIONS = ['0,14 mm²', '0,22 mm²', '0,5 mm²', '0,75 mm²', '1,0 mm²', '1,5 mm²', '2,5 mm²', '4 mm²', '0,6 mm (J-Y(St)Y)', '0,8 mm (J-Y(St)Y)'];

const COLUMN_HINT = {
  pin: 'Immer zu sehen',
  func: 'Funktion des Anschlusses',
  target: 'Baugruppe (mit BMK), an die er führt',
  connected: 'Klemme an der Baugruppe',
  wire: 'Aderfarbe (sonst die der Leitungsart)',
  cross: 'Querschnitt (sonst der der Leitungsart)',
  marks: 'Kennzeichen von Anschluss und Baugruppe',
  remark: 'Bemerkung',
};

const safeColor = (v, fallback = '#5b6b7a') => (/^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(String(v || '')) ? v : fallback);
export const asT = (obj, prop) => {
  if (typeof obj[prop] !== 'object' || obj[prop] == null) obj[prop] = T(obj[prop] || '', '');
  return obj[prop];
};

/** Aufgeklappte Leitungsarten (bleibt beim Neuaufbau). */
const open = new Set();

export function field(label, ...controls) {
  const el = htmlToElement(`<label class="sd-f"><span class="sd-l">${escapeHtml(label)}</span></label>`);
  el.append(...controls);
  return el;
}

export function input(value, onInput, { placeholder = '', list = '', mono = false, maxlength = 0 } = {}) {
  const el = document.createElement('input');
  el.type = 'text';
  el.className = 'fld' + (mono ? ' mono' : '');
  el.value = value ?? '';
  el.placeholder = placeholder;
  el.autocomplete = 'off';
  el.spellcheck = false;
  if (maxlength) el.maxLength = maxlength;
  if (list) el.setAttribute('list', list);
  el.addEventListener('input', () => onInput(el.value));
  el.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' || ev.key === 'Enter') el.blur();
  });
  return el;
}

/** Zweisprachiges Feld (je Sprache eine Eingabe). */
export function biInputs(ctx, obj, prop, key, label, placeholder = '') {
  const value = asT(obj, prop);
  return ctx.langs.map((lang) => {
    const el = input(value[lang], (v) => ctx.commit(label, () => (asT(obj, prop)[lang] = v), { key: `${key}:${lang}` }), {
      placeholder: (lang === 'en' && value.de) || placeholder,
    });
    if (ctx.langs.length < 2) return el;
    const wrap = htmlToElement(`<span class="sd-bi" data-lang="${lang.toUpperCase()}"></span>`);
    wrap.appendChild(el);
    return wrap;
  });
}

export function seg(options, current, onPick) {
  const el = htmlToElement('<div class="sd-seg" role="radiogroup"></div>');
  for (const [value, text] of options) {
    const b = htmlToElement(`<button type="button" role="radio" aria-checked="${value === current}" class="${value === current ? 'on' : ''}">${escapeHtml(text)}</button>`);
    b.addEventListener('click', () => value !== current && onPick(value));
    el.appendChild(b);
  }
  return el;
}

export function colorInput(value, onInput, title = 'Farbe') {
  const el = htmlToElement(`<input type="color" class="sd-color" value="${safeColor(value)}" title="${escapeHtml(title)}">`);
  el.addEventListener('input', () => onInput(el.value));
  return el;
}

export function iconButton(name, title, run, disabled = false) {
  const b = htmlToElement(`<button type="button" class="btn ic" title="${escapeHtml(title)}">${icon(name, 's')}</button>`);
  b.disabled = disabled;
  b.addEventListener('click', run);
  return b;
}

function datalist(id, entries) {
  if (document.getElementById(id)) return null;
  const el = document.createElement('datalist');
  // dauerhaft im Dokument: auch Felder anderer Formulare (Anschluss) nutzen die Vorschläge
  document.body.appendChild(el);
  el.id = id;
  for (const [value, label] of entries) {
    const o = document.createElement('option');
    o.value = value;
    if (label) o.label = label;
    el.appendChild(o);
  }
  return null;
}

/** Vorschläge für Aderfarbe und Querschnitt bereitstellen. */
export function ensureWireLists() {
  datalist('sdWireColors', WIRE_COLORS);
  datalist('sdCrossSections', CROSS_SECTIONS.map((v) => [v, '']));
}

/** Linienmuster als kleine Vorschau. */
function preview(cat) {
  const w = { thin: 1.2, normal: 2, thick: 3.2 }[cat.width] || 2;
  const dash = cat.style === 'dashed' ? ' stroke-dasharray="6 4"' : cat.style === 'dotted' ? ' stroke-dasharray="0.5 4" stroke-linecap="round"' : '';
  return `<svg class="sd-wpre" viewBox="0 0 36 10" aria-hidden="true"><line x1="1" y1="5" x2="35" y2="5" stroke="${safeColor(cat.color)}" stroke-width="${w}"${dash}/></svg>`;
}

/** Leitungsarten: Farbe, Name, aufklappbar Linienstil, Stärke, Kurzzeichen, Ader, Querschnitt. */
export function categoriesEditor(target, ctx) {
  const el = htmlToElement('<div class="sd-cats wide"></div>');
  ensureWireLists();
  for (const cat of target.categories) {
    const card = htmlToElement('<div class="sd-wcat"></div>');
    card.dataset.id = cat.id;
    const row = htmlToElement('<div class="sd-cat"></div>');
    row.append(
      colorInput(cat.color, (v) => ctx.commit('Farbe geändert', () => (cat.color = v), { key: 'catcolor:' + cat.id })),
      ...biInputs(ctx, cat, 'name', 'catname:' + cat.id, 'Leitungsart umbenannt').slice(0, 1),
    );
    const isOpen = open.has(cat.id);
    const more = iconButton(isOpen ? 'up' : 'down', isOpen ? 'Weniger' : 'Linienstil, Kurzzeichen, Ader, Querschnitt', () => {
      if (isOpen) open.delete(cat.id);
      else open.add(cat.id);
      ctx.commit(null, () => {}, { rebuild: true });
    });
    const used = ctx.used && ctx.used.has(cat.id);
    const del = iconButton('trash', used ? 'Wird noch verwendet' : 'Leitungsart entfernen', () =>
      ctx.commit('Leitungsart entfernt', () => (target.categories = target.categories.filter((c) => c !== cat)), { rebuild: true }),
    );
    del.disabled = used || target.categories.length < 2;
    row.append(more, del);
    row.classList.add('with-more');
    card.appendChild(row);
    const summary = [cat.code, cat.wire, cat.cross].map((v) => String(v || '').trim()).filter(Boolean).join(' · ');
    card.appendChild(htmlToElement(`<div class="sd-wsum">${preview(cat)}<span>${escapeHtml(summary)}</span></div>`));
    if (isOpen) {
      const box = htmlToElement('<div class="sd-wdet"></div>');
      if (ctx.langs.length > 1) box.appendChild(field('Name (Englisch)', ...biInputs(ctx, cat, 'name', 'catname:' + cat.id, 'Leitungsart umbenannt').slice(1)));
      box.append(
        field('Linienstil', seg(WIRE_STYLES, cat.style || 'solid', (v) => ctx.commit('Linienstil geändert', () => (cat.style = v), { rebuild: true }))),
        field('Strichstärke', seg(WIRE_WIDTHS, cat.width || 'normal', (v) => ctx.commit('Strichstärke geändert', () => (cat.width = v), { rebuild: true }))),
      );
      const two = htmlToElement('<div class="sd-two"></div>');
      two.append(
        field('Kurzzeichen', input(cat.code, (v) => ctx.commit('Kurzzeichen geändert', () => (cat.code = v), { key: 'catcode:' + cat.id }), { placeholder: 'z. B. BUS', maxlength: 12 })),
        field('Aderfarbe', input(cat.wire, (v) => ctx.commit('Aderfarbe geändert', () => (cat.wire = v), { key: 'catwire:' + cat.id }), { placeholder: 'z. B. RD/BK', list: 'sdWireColors', maxlength: 24 })),
      );
      box.append(
        two,
        field('Querschnitt', input(cat.cross, (v) => ctx.commit('Querschnitt geändert', () => (cat.cross = v), { key: 'catcross:' + cat.id }), { placeholder: 'z. B. 0,75 mm²', list: 'sdCrossSections', maxlength: 24 })),
        htmlToElement('<p class="sd-note">Das Kurzzeichen steht an der Leitung; Aderfarbe und Querschnitt stehen in der Legende und im Klemmenplan.</p>'),
      );
      card.appendChild(box);
    }
    el.appendChild(card);
  }
  const add = htmlToElement(`<button type="button" class="btn sd-add">${icon('plus', 's')}Leitungsart</button>`);
  add.addEventListener('click', () => {
    const cat = newCategory();
    open.add(cat.id);
    ctx.commit('Leitungsart hinzugefügt', () => target.categories.push(cat), { rebuild: true });
  });
  el.appendChild(add);
  return el;
}

/** Kennzeichen: Text, Farbe, Erklärung in der Legende. */
export function marksEditor(target, ctx) {
  const el = htmlToElement('<div class="sd-cats wide"></div>');
  if (!target.marks.length) el.appendChild(htmlToElement('<div class="sd-empty">Noch kein Kennzeichen.</div>'));
  for (const k of target.marks) {
    const card = htmlToElement('<div class="sd-wcat sd-wmark"></div>');
    card.dataset.id = k.id;
    const row = htmlToElement('<div class="sd-cat"></div>');
    const used = ctx.used && ctx.used.has(k.id);
    const del = iconButton('trash', used ? 'Entfernen (wird auch an den Baugruppen entfernt)' : 'Kennzeichen entfernen', () =>
      ctx.commit('Kennzeichen entfernt', () => {
        target.marks = target.marks.filter((x) => x !== k);
        if (ctx.onRemoveMark) ctx.onRemoveMark(k.id);
      }, { rebuild: true }),
    );
    row.append(
      colorInput(k.color, (v) => ctx.commit('Farbe geändert', () => (k.color = v), { key: 'markcolor:' + k.id })),
      input(k.label, (v) => ctx.commit('Kennzeichen geändert', () => (k.label = v), { key: 'marklabel:' + k.id }), { placeholder: 'z. B. 360 V DC', maxlength: 24 }),
      del,
    );
    card.appendChild(row);
    card.appendChild(field('Erklärung in der Legende', ...biInputs(ctx, k, 'text', 'marktext:' + k.id, 'Erklärung geändert', 'z. B. Versorgung aus dem 360-V-Netzteil')));
    el.appendChild(card);
  }
  const add = htmlToElement(`<button type="button" class="btn sd-add">${icon('plus', 's')}Kennzeichen</button>`);
  add.addEventListener('click', () => ctx.commit('Kennzeichen hinzugefügt', () => target.marks.push(newMarking({ label: 'Neu' })), { rebuild: true }));
  el.appendChild(add);
  return el;
}

/** Spalten des Klemmenplans: ein/aus, Reihenfolge, eigene Überschrift. */
export function columnsEditor(target, ctx) {
  const el = htmlToElement('<div class="sd-wcols"></div>');
  if (!target.columns) {
    el.appendChild(htmlToElement('<p class="sd-note">Dieser Plan nutzt noch den bisherigen Klemmenplan (Pin, Funktion, Angeschlossen an, Bemerkung).</p>'));
    const b = htmlToElement(`<button type="button" class="btn outline">${icon('sparkle', 's')}Spalten einstellen</button>`);
    b.addEventListener('click', () =>
      ctx.commit('Spalten des Klemmenplans', () => {
        target.columns = TERMINAL_COLUMNS.map((c) => ({ key: c.key, show: ['pin', 'func', 'connected', 'remark'].includes(c.key), title: T('', '') }));
      }, { rebuild: true }),
    );
    el.appendChild(b);
    return el;
  }
  target.columns.forEach((c, i) => {
    const row = htmlToElement('<div class="sd-wcol"></div>');
    row.dataset.key = c.key;
    const check = htmlToElement(`<input type="checkbox"${c.show || c.key === 'pin' ? ' checked' : ''} title="${escapeHtml(COLUMN_HINT[c.key] || '')}">`);
    check.disabled = c.key === 'pin';
    check.addEventListener('change', () => ctx.commit(check.checked ? 'Spalte eingeblendet' : 'Spalte ausgeblendet', () => (c.show = check.checked), { rebuild: true }));
    const def = STRINGS[c.key] ? STRINGS[c.key].de : c.key;
    const name = input(asT(c, 'title').de, (v) => ctx.commit('Spaltenüberschrift geändert', () => (asT(c, 'title').de = v), { key: 'coltitle:' + c.key }), { placeholder: def, maxlength: 40 });
    name.title = COLUMN_HINT[c.key] || '';
    const move = (d) =>
      ctx.commit('Spalten umgestellt', () => {
        const j = i + d;
        [target.columns[i], target.columns[j]] = [target.columns[j], target.columns[i]];
      }, { rebuild: true });
    row.append(check, name, iconButton('up', 'Nach links', () => move(-1), i === 0), iconButton('down', 'Nach rechts', () => move(1), i === target.columns.length - 1));
    el.appendChild(row);
  });
  el.appendChild(htmlToElement('<p class="sd-note">Spalten ohne Inhalt fallen beim Setzen weg. Leere Überschrift: die vorgegebene.</p>'));
  return el;
}

/** Was der Plan zeigt. */
export function showEditor(target, ctx) {
  const el = htmlToElement('<div></div>');
  const items = [
    ['legend', 'Legende unter dem Schaltbild'],
    ['terminals', 'Klemmenplan (Belegung der Anschlüsse)'],
    ['hints', 'Hinweise zur Verdrahtung'],
  ];
  for (const [key, label] of items) {
    const row = htmlToElement(`<label class="sd-check"><input type="checkbox"${target.show[key] !== false ? ' checked' : ''}><span>${escapeHtml(label)}</span></label>`);
    row.querySelector('input').addEventListener('change', (ev) => ctx.commit(ev.target.checked ? 'Eingeblendet' : 'Ausgeblendet', () => (target.show[key] = ev.target.checked), { rebuild: true }));
    el.appendChild(row);
  }
  return el;
}

/** Name einer Leitungsart für Listen. */
export const catName = (cat, lang = 'de') => tx(cat.name, lang) || 'Ohne Namen';
