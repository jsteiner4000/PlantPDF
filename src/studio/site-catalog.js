/**
 * Eingaben für die Kataloge eines Lageplans – Standard-Symbole anpassen (Kürzel, Farbe, Name; in
 * den Einstellungen auch in der Galerie ausblenden), eigene Symbolarten, Linien- und Flächenarten,
 * eigene Gerätefelder, Spalten der Geräteliste und Darstellung. Dieselben Bausteine im Dokument
 * und in den Einstellungen; `ctx` wie in wiring-catalog.js.
 */
import { icon } from '../ui/icons.js';
import { escapeHtml, htmlToElement } from '../ui/dom.js';
import { GLYPH_IDS, LIST_COLUMNS, cleanListCols, STRINGS, SYMBOLS, T, WIRE_STYLES, WIRE_WIDTHS, newCustomSymbol, newDeviceField, newSiteStyle, symbolInfo, tx } from './model.js';
import { symbolIconSvg } from './site.js';
import { asT, biInputs, field, iconButton, input, seg } from './wiring-catalog.js';

const safeColor = (v, f = '#475569') => (/^#[0-9a-f]{6}$/i.test(String(v || '')) ? v : f);
const colorPick = (value, onPick, title = 'Farbe') => {
  const el = htmlToElement(`<input type="color" class="sd-color" value="${safeColor(value)}" title="${escapeHtml(title)}">`);
  el.addEventListener('change', () => onPick(el.value.toLowerCase()));
  return el;
};
const check = (label, on, onChange, hint = '') => {
  const row = htmlToElement(`<label class="sd-check"><input type="checkbox"${on ? ' checked' : ''}><span>${escapeHtml(label)}${hint ? `<small>${escapeHtml(hint)}</small>` : ''}</span></label>`);
  row.querySelector('input').addEventListener('change', (ev) => onChange(ev.target.checked));
  return row;
};

/** Standard-Symbole (ohne Richtfunk-Antenne) in Galerie-Reihenfolge. */
const BASE = () => SYMBOLS.filter((k) => !k.link);

/**
 * Standard-Symbole anpassen: je Art Kürzel und Farbe (leer: Standard); `gallery`: zusätzlich „in
 * der Galerie“ (Einstellungen). `target.kinds`: Art → { code, color }.
 */
export function kindsEditor(target, ctx, { gallery = false, images = {} } = {}) {
  const el = htmlToElement('<div class="sd-kinds"></div>');
  const hidden = new Set(target.hidden || []);
  for (const k of BASE()) {
    const own = target.kinds[k.id] || {};
    const row = htmlToElement('<div class="sd-kind"></div>');
    row.dataset.kind = k.id;
    const set = (prop, v, label, o = {}) =>
      ctx.commit(label, () => {
        const e = { ...(target.kinds[k.id] || {}) };
        if (v) e[prop] = v;
        else delete e[prop];
        if (Object.keys(e).length) target.kinds[k.id] = e;
        else delete target.kinds[k.id];
      }, o);
    const info = { ...k, ...own };
    row.append(
      htmlToElement(`<span class="sd-kind-ic">${symbolIconSvg(info, images, 22)}</span>`),
      htmlToElement(`<span class="sd-kind-n" title="${escapeHtml(tx(k.name, 'de'))}">${escapeHtml(tx(k.name, 'de'))}</span>`),
    );
    const code = input(own.code || '', (v) => set('code', v.trim(), 'Kürzel geändert', { key: 'kcode:' + k.id }), { placeholder: k.code, maxlength: 6 });
    code.classList.add('sd-kind-code');
    code.title = 'Kürzel vor der Nummer (leer: ' + k.code + ')';
    code.addEventListener('change', () => ctx.commit(null, () => {}, { rebuild: true }));
    const col = colorPick(own.color || k.color, (v) => set('color', v === k.color ? '' : v, 'Farbe geändert', { rebuild: true }), 'Farbe des Symbols');
    row.append(code, col);
    const reset = iconButton('undo', 'Auf Standard zurück', () => ctx.commit('Symbol zurückgesetzt', () => delete target.kinds[k.id], { rebuild: true }), !target.kinds[k.id]);
    row.appendChild(reset);
    if (gallery) {
      const box = htmlToElement(`<input type="checkbox" class="sd-kind-show" title="In der Galerie zeigen"${hidden.has(k.id) ? '' : ' checked'}>`);
      box.addEventListener('change', () =>
        ctx.commit(box.checked ? 'In der Galerie' : 'Aus der Galerie', () => {
          const h = new Set(target.hidden || []);
          if (box.checked) h.delete(k.id);
          else h.add(k.id);
          target.hidden = [...h];
        }, { rebuild: true }),
      );
      row.prepend(box);
      row.classList.add('with-show');
    }
    el.appendChild(row);
  }
  return el;
}

/**
 * Eigene Symbolarten als Karten: Name, Kürzel, Farbe, Bildzeichen oder eigenes Bild,
 * Erfassungsbereich, Netzwerkgerät. `opts.imageOf(c)` → Bild ({ data, w, h }) oder null;
 * `opts.pickImage()` → Bild (Vorgaben) bzw. Kennung (Dokument); `opts.used`: verwendete Arten.
 */
export function customEditor(target, ctx, opts = {}) {
  const el = htmlToElement('<div class="sd-cats wide"></div>');
  if (!target.custom.length) el.appendChild(htmlToElement('<div class="sd-empty">Noch keine eigene Symbolart.</div>'));
  for (const c of target.custom) el.appendChild(customCard(target, c, ctx, opts));
  const add = htmlToElement(`<button type="button" class="btn sd-add">${icon('plus', 's')}Eigene Symbolart</button>`);
  add.addEventListener('click', () => ctx.commit('Eigene Symbolart hinzugefügt', () => target.custom.push(newCustomSymbol(null, { glyph: 'camera', color: '#0f766e', code: 'ES' })), { rebuild: true }));
  el.appendChild(add);
  return el;
}

/** Karte einer eigenen Symbolart (auch im Eigenschaftenfeld des Lageplans). */
export function customCard(target, c, ctx, opts = {}) {
  const card = htmlToElement('<div class="sd-wcat sd-custom"></div>');
  card.dataset.id = c.id;
  const img = opts.imageOf ? opts.imageOf(c) : null;
  const info = { code: c.code, name: c.name, color: c.color, glyph: c.glyph || null, image: img ? 'x' : null, custom: true };
  const row = htmlToElement('<div class="sd-cat"></div>');
  const preview = htmlToElement(`<span class="sd-kind-ic">${symbolIconSvg(info, img ? { x: img } : {}, 26)}</span>`);
  const name = biInputs(ctx, c, 'name', 'cuname:' + c.id, 'Name geändert', 'z. B. Wärmebildkamera')[0];
  const used = opts.used && opts.used.has('custom:' + c.id);
  const del = iconButton('trash', used ? 'Entfernen (auch die gesetzten Symbole)' : 'Symbolart entfernen', () =>
    opts.onRemove ? opts.onRemove(c) : ctx.commit('Symbolart entfernt', () => (target.custom = target.custom.filter((x) => x !== c)), { rebuild: true }),
  );
  row.append(preview, name, del);
  row.classList.add('sd-custom-row');
  card.appendChild(row);
  if (ctx.langs.length > 1) card.appendChild(field('Name (Englisch)', ...biInputs(ctx, c, 'name', 'cuname:' + c.id, 'Name geändert').slice(1)));
  const two = htmlToElement('<div class="sd-two"></div>');
  const code = input(c.code, (v) => ctx.commit('Kürzel geändert', () => (c.code = v.trim() || 'ES'), { key: 'cucode:' + c.id }), { placeholder: 'ES', maxlength: 6 });
  code.addEventListener('change', () => ctx.commit(null, () => {}, { rebuild: true }));
  two.append(field('Kürzel', code));
  if (!img) two.append(field('Farbe', colorPick(c.color, (v) => ctx.commit('Farbe geändert', () => (c.color = v), { rebuild: true }))));
  card.appendChild(two);
  if (!img) {
    const glyphs = htmlToElement('<select class="fld"></select>');
    const names = new Map(SYMBOLS.map((k) => [k.glyph, tx(k.name, 'de')]));
    for (const [v, label] of [['', 'Kürzel als Zeichen'], ...GLYPH_IDS().map((g) => [g, names.get(g) || g])]) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = label;
      o.selected = (c.glyph || '') === v;
      glyphs.appendChild(o);
    }
    glyphs.addEventListener('change', () => ctx.commit('Bildzeichen geändert', () => (c.glyph = glyphs.value), { rebuild: true }));
    card.appendChild(field('Bildzeichen', glyphs));
  }
  if (opts.pickImage) {
    const acts = htmlToElement('<div class="sd-acts"></div>');
    const up = htmlToElement(`<button type="button" class="btn outline">${icon('image', 's')}${img ? 'Anderes Bild …' : 'Eigenes Bild …'}</button>`);
    up.addEventListener('click', async () => {
      const v = await opts.pickImage();
      if (v) ctx.commit('Bild gesetzt', () => (c.image = v), { rebuild: true });
    });
    acts.appendChild(up);
    if (img) {
      const rm = htmlToElement(`<button type="button" class="btn outline">${icon('trash', 's')}Bild entfernen</button>`);
      rm.addEventListener('click', () => ctx.commit('Bild entfernt', () => (c.image = null), { rebuild: true }));
      acts.appendChild(rm);
    }
    card.appendChild(acts);
  }
  card.append(
    check('Erfassungsbereich (wie Kamera/Melder)', c.fov, (v) => ctx.commit('Erfassungsbereich', () => (c.fov = v), { rebuild: true })),
    check('Netzwerkgerät (IP und Zugang in den Zugangsdaten)', c.net, (v) => ctx.commit('Netzwerkgerät', () => (c.net = v), { rebuild: true })),
  );
  return card;
}

/** Aufgeklappte Linienarten (bleibt beim Neuaufbau). */
const openStyles = new Set();

/** Linienart als kleine Vorschau (Linie bzw. Fläche). */
function stylePreview(t) {
  const w = { thin: 1.2, normal: 2, thick: 3.2 }[t.width] || 2;
  const dash = t.dash === 'dashed' ? ' stroke-dasharray="6 4"' : t.dash === 'dotted' ? ' stroke-dasharray="0.5 4" stroke-linecap="round"' : '';
  const c = safeColor(t.color);
  return t.area
    ? `<svg class="sd-wpre" viewBox="0 0 36 10" aria-hidden="true"><rect x="2" y="1.5" width="32" height="7" rx="1" fill="${c}" fill-opacity=".15" stroke="${c}" stroke-width="${w * 0.7}"${dash}/></svg>`
    : `<svg class="sd-wpre" viewBox="0 0 36 10" aria-hidden="true"><line x1="1" y1="5" x2="35" y2="5" stroke="${c}" stroke-width="${w}"${dash}/></svg>`;
}

/** Linien- und Flächenarten: Farbe, Name; aufklappbar Linie/Fläche, Linienstil, Stärke. */
export function stylesEditor(target, ctx) {
  const el = htmlToElement('<div class="sd-cats wide"></div>');
  for (const t of target.styles) {
    const card = htmlToElement('<div class="sd-wcat sd-style"></div>');
    card.dataset.id = t.id;
    const row = htmlToElement('<div class="sd-cat with-more"></div>');
    const used = ctx.used && ctx.used.has(t.id);
    const del = iconButton('trash', used ? 'Entfernen (Zeichnungen behalten ihre Farbe)' : 'Linienart entfernen', () =>
      ctx.commit('Linienart entfernt', () => {
        target.styles = target.styles.filter((x) => x !== t);
        if (ctx.onRemoveStyle) ctx.onRemoveStyle(t);
      }, { rebuild: true }),
    );
    const isOpen = openStyles.has(t.id);
    const more = iconButton(isOpen ? 'up' : 'down', isOpen ? 'Weniger' : 'Linie oder Fläche, Linienstil, Strichstärke', () => {
      if (isOpen) openStyles.delete(t.id);
      else openStyles.add(t.id);
      ctx.commit(null, () => {}, { rebuild: true });
    });
    row.append(colorPick(t.color, (v) => ctx.commit('Farbe geändert', () => (t.color = v), { rebuild: true })), ...biInputs(ctx, t, 'name', 'stname:' + t.id, 'Linienart umbenannt').slice(0, 1), more, del);
    card.appendChild(row);
    const sum = [t.area ? 'Fläche' : 'Linie', { solid: 'durchgezogen', dashed: 'gestrichelt', dotted: 'gepunktet' }[t.dash], { thin: 'dünn', normal: '', thick: 'dick' }[t.width]].filter(Boolean).join(' · ');
    card.appendChild(htmlToElement(`<div class="sd-wsum">${stylePreview(t)}<span>${escapeHtml(sum)}</span></div>`));
    if (isOpen) {
      const box = htmlToElement('<div class="sd-wdet"></div>');
      if (ctx.langs.length > 1) box.appendChild(field('Name (Englisch)', ...biInputs(ctx, t, 'name', 'stname:' + t.id, 'Linienart umbenannt').slice(1)));
      box.append(
        field('Für', seg([[false, 'Linien'], [true, 'Flächen (Zonen)']], t.area, (v) => ctx.commit('Art geändert', () => (t.area = v), { rebuild: true }))),
        field('Linienstil', seg(WIRE_STYLES, t.dash, (v) => ctx.commit('Linienstil geändert', () => (t.dash = v), { rebuild: true }))),
        field('Strichstärke', seg(WIRE_WIDTHS, t.width, (v) => ctx.commit('Strichstärke geändert', () => (t.width = v), { rebuild: true }))),
      );
      card.appendChild(box);
    }
    el.appendChild(card);
  }
  const add = htmlToElement(`<button type="button" class="btn sd-add">${icon('plus', 's')}Linien- oder Flächenart</button>`);
  add.addEventListener('click', () => {
    const t = newSiteStyle();
    openStyles.add(t.id);
    ctx.commit('Linienart hinzugefügt', () => target.styles.push(t), { rebuild: true });
  });
  el.append(add, htmlToElement('<p class="sd-note">An der Zeichnung wählbar (Linie, Freihand, Zaun bzw. Zone). Die Legende nennt die Art mit Gesamtlänge bzw. -fläche.</p>'));
  return el;
}

/** Eigene Gerätefelder: Name und für welche Art (alle, eine Art, alle eigenen Symbole). */
export function fieldsEditor(target, ctx) {
  const el = htmlToElement('<div class="sd-cats wide"></div>');
  if (!target.fields.length) el.appendChild(htmlToElement('<div class="sd-empty">Noch kein eigenes Feld – z. B. „Kabel-Nr.“, „Montageart“ oder „Inventar-Nr.“.</div>'));
  for (const f of target.fields) {
    const card = htmlToElement('<div class="sd-wcat sd-dfield"></div>');
    card.dataset.id = f.id;
    const row = htmlToElement('<div class="sd-cat sd-dfield-row"></div>');
    const del = iconButton('trash', 'Feld entfernen (auch die eingetragenen Werte)', () =>
      ctx.commit('Feld entfernt', () => {
        target.fields = target.fields.filter((x) => x !== f);
        if (target.listCols) target.listCols = target.listCols.filter((c) => c.key !== 'f:' + f.id);
        if (ctx.onRemoveField) ctx.onRemoveField(f);
      }, { rebuild: true }),
    );
    row.append(...biInputs(ctx, f, 'label', 'dfname:' + f.id, 'Feld umbenannt', 'z. B. Kabel-Nr.').slice(0, 1), del);
    card.appendChild(row);
    if (ctx.langs.length > 1) card.appendChild(field('Name (Englisch)', ...biInputs(ctx, f, 'label', 'dfname:' + f.id, 'Feld umbenannt').slice(1)));
    const sel = htmlToElement('<select class="fld"></select>');
    const opts = [['', 'Alle Geräte'], ['custom', 'Alle eigenen Symbolarten'], ...BASE().map((k) => [k.id, tx(k.name, 'de')])];
    const current = f.kinds.length === 1 ? f.kinds[0] : '';
    for (const [v, label] of opts) {
      const o = document.createElement('option');
      o.value = v;
      o.textContent = label;
      o.selected = v === current;
      sel.appendChild(o);
    }
    sel.addEventListener('change', () => ctx.commit('Feld geändert', () => (f.kinds = sel.value ? [sel.value] : []), { rebuild: true }));
    card.appendChild(field('Für', sel));
    el.appendChild(card);
  }
  const add = htmlToElement(`<button type="button" class="btn sd-add">${icon('plus', 's')}Eigenes Feld</button>`);
  add.disabled = target.fields.length >= 12;
  add.addEventListener('click', () =>
    ctx.commit('Feld hinzugefügt', () => {
      const f = newDeviceField();
      target.fields.push(f);
      if (target.listCols) target.listCols = cleanListCols(target.listCols, target.fields);
    }, { rebuild: true }),
  );
  el.append(add, htmlToElement('<p class="sd-note">Werte trägt man am Symbol ein. In der Geräteliste: als eigene Spalte (unten einschalten) oder in der Bemerkung.</p>'));
  return el;
}

const LIST_HINT = { type: 'Art des Geräts', name: 'Bezeichnung', ip: 'IP-Adresse (sonst in der Bemerkung)', height: 'Montagehöhe (sonst in der Bemerkung)', note: 'Bemerkung mit Bus, Meldegruppe, Kanal …' };
const LIST_LABEL = { type: STRINGS.type, name: STRINGS.name, ip: STRINGS.ipCol, height: STRINGS.heightCol, note: STRINGS.remark };

/** Spalten der Geräteliste: ein/aus, Reihenfolge, eigene Überschrift. */
export function listColsEditor(target, ctx) {
  const el = htmlToElement('<div class="sd-wcols"></div>');
  if (!target.listCols) {
    el.appendChild(htmlToElement('<p class="sd-note">Dieser Plan nutzt die bisherige Geräteliste (Nr., Typ, Bezeichnung, Bemerkung).</p>'));
    const b = htmlToElement(`<button type="button" class="btn outline">${icon('sparkle', 's')}Spalten einstellen</button>`);
    b.addEventListener('click', () =>
      ctx.commit('Spalten der Geräteliste', () => {
        target.listCols = Object.keys(LIST_COLUMNS).map((key) => ({ key, show: !['ip', 'height'].includes(key), title: T('', '') }));
        for (const f of target.fields || []) target.listCols.splice(target.listCols.length - 1, 0, { key: 'f:' + f.id, show: false, title: T('', '') });
      }, { rebuild: true }),
    );
    el.appendChild(b);
    return el;
  }
  const fields = new Map((target.fields || []).map((f) => ['f:' + f.id, f]));
  const list = target.listCols;
  list.forEach((c, i) => {
    const def = fields.has(c.key) ? fields.get(c.key).label : LIST_LABEL[c.key];
    if (!def) return;
    const row = htmlToElement('<div class="sd-wcol"></div>');
    row.dataset.key = c.key;
    const box = htmlToElement(`<input type="checkbox"${c.show ? ' checked' : ''} title="${escapeHtml(LIST_HINT[c.key] || 'Eigenes Feld als Spalte')}">`);
    box.addEventListener('change', () => ctx.commit(box.checked ? 'Spalte eingeblendet' : 'Spalte ausgeblendet', () => (c.show = box.checked), { rebuild: true }));
    const name = input(asT(c, 'title').de, (v) => ctx.commit('Spaltenüberschrift geändert', () => (asT(c, 'title').de = v), { key: 'lctitle:' + c.key }), { placeholder: tx(def, 'de') || 'Eigenes Feld', maxlength: 40 });
    const move = (d) =>
      ctx.commit('Spalten umgestellt', () => {
        const j = i + d;
        [list[i], list[j]] = [list[j], list[i]];
      }, { rebuild: true });
    row.append(box, name, iconButton('up', 'Nach links', () => move(-1), i === 0), iconButton('down', 'Nach rechts', () => move(1), i === list.length - 1));
    el.appendChild(row);
  });
  el.appendChild(htmlToElement('<p class="sd-note">Nr. steht immer vorn. IP, Höhe und eigene Felder ohne Werte fallen weg; ohne eigene Spalte stehen sie in der Bemerkung.</p>'));
  return el;
}

/** Darstellung neuer Lagepläne (Einstellungen). */
export function displayEditor(d, ctx) {
  const el = htmlToElement('<div class="sd-footparts"></div>');
  for (const [key, label] of [
    ['showNumbers', 'Nummern an den Symbolen'],
    ['showList', 'Geräteliste auf einer Folgeseite'],
    ['showBus', 'Bus/Adresse an den Symbolen („BM 3 · 1/12“)'],
    ['scaleBar', 'Maßstabsleiste im Plan'],
    ['photoSpotsInPdf', 'Fotostandorte in der fertigen PDF'],
  ])
    el.appendChild(check(label, d[key], (v) => ctx.commit('Darstellung geändert', () => (d[key] = v), { rebuild: true })));
  el.appendChild(field('Legende', seg([['below', 'Unter dem Plan'], ['page', 'Eigene Seite'], ['none', 'Keine']], d.legend, (v) => ctx.commit('Legende geändert', () => (d.legend = v), { rebuild: true }))));
  return el;
}

/** Symbolarten, die in einem Plan gesetzt sind. */
export const usedKinds = (site) => new Set(site.symbols.map((y) => y.kind));
export { symbolInfo };
