/**
 * Eingaben für Deckblatt und Seitengestaltung – dieselben Bausteine im Eigenschaftenfeld (für das
 * geöffnete Dokument) und in den Einstellungen (Vorgaben für neue Dokumente). `ctx` wie in
 * wiring-catalog.js: `commit(label, fn, { key, rebuild })`, `langs`.
 */
import { icon } from '../ui/icons.js';
import { escapeHtml, htmlToElement } from '../ui/dom.js';
import { FOOTER_PARTS, HOUSE_COLOR, LOGO_SIZES, MAX_CUSTOM_FIELDS, STRINGS, formatDocNo, newContact, newCoverField } from './model.js';
import { inkColor } from './svg.js';
import { asT, biInputs, field, iconButton, input, seg } from './wiring-catalog.js';

/** Bekannte Felder: Beschreibung in der Liste. */
const FIELD_HINT = {
  customer: 'Name des Kunden',
  address: 'Anschrift (mehrzeilig)',
  site: 'Anlage bzw. Objekt',
  date: 'Datum des Dokuments',
  technician: 'Wer die Anlage errichtet bzw. das Dokument erstellt hat',
  checked: 'Wer das Dokument geprüft hat',
  docNo: 'Dokumentnummer',
  version: 'Version bzw. Änderungsstand',
};

/** Überschrift eines Deckblatt-Felds (eigene, sonst die vorgegebene). */
export function fieldLabel(f, lang = 'de') {
  const own = f.title && (f.title[lang] || f.title.de);
  if (own) return own;
  if (f.custom) return 'Eigenes Feld';
  return STRINGS[f.key] ? STRINGS[f.key][lang] || STRINGS[f.key].de : f.key;
}

/** Hausfarben zur schnellen Wahl (dunkel genug für weiße Schrift auf Tabellenköpfen). */
const HOUSE_COLORS = [
  [HOUSE_COLOR, 'Dunkelblau (Standard)'],
  ['#0f4c81', 'Blau'],
  ['#0e6b5c', 'Petrol'],
  ['#2f6b2f', 'Grün'],
  ['#9b1c1c', 'Rot'],
  ['#9a3412', 'Orange'],
  ['#5b21b6', 'Violett'],
  ['#334155', 'Anthrazit'],
];

const check = (label, on, onChange, hint = '') => {
  const row = htmlToElement(`<label class="sd-check"><input type="checkbox"${on ? ' checked' : ''}><span>${escapeHtml(label)}${hint ? `<small>${escapeHtml(hint)}</small>` : ''}</span></label>`);
  row.querySelector('input').addEventListener('change', (ev) => onChange(ev.target.checked));
  return row;
};

/** Felder des Deckblatts: ein/aus, Reihenfolge, eigene Überschrift, eigene Felder. */
export function coverFieldsEditor(target, ctx, prop = 'coverFields') {
  const el = htmlToElement('<div class="sd-wcols"></div>');
  const list = target[prop];
  list.forEach((f, i) => {
    const row = htmlToElement('<div class="sd-wcol sd-cfield"></div>');
    row.dataset.key = f.key;
    const box = htmlToElement(`<input type="checkbox"${f.show ? ' checked' : ''} title="Auf dem Deckblatt zeigen">`);
    box.addEventListener('change', () => ctx.commit(box.checked ? 'Feld eingeblendet' : 'Feld ausgeblendet', () => (f.show = box.checked), { rebuild: true }));
    const name = input(asT(f, 'title').de, (v) => ctx.commit('Feld umbenannt', () => (asT(f, 'title').de = v), { key: 'cftitle:' + f.key }), {
      placeholder: f.custom ? 'Name des Felds, z. B. Auftrags-Nr.' : fieldLabel({ key: f.key }),
      maxlength: 60,
    });
    name.title = FIELD_HINT[f.key] || 'Eigenes Feld';
    const move = (d) =>
      ctx.commit('Felder umgestellt', () => {
        const j = i + d;
        [list[i], list[j]] = [list[j], list[i]];
      }, { rebuild: true });
    const tools = [iconButton('up', 'Nach oben', () => move(-1), i === 0), iconButton('down', 'Nach unten', () => move(1), i === list.length - 1)];
    if (f.custom) {
      row.classList.add('custom');
      tools.push(
        iconButton('trash', 'Feld entfernen', () =>
          ctx.commit('Feld entfernt', () => {
            target[prop] = target[prop].filter((x) => x !== f);
            if (ctx.onRemoveField) ctx.onRemoveField(f.key);
          }, { rebuild: true }),
        ),
      );
    }
    row.append(box, name, ...tools);
    el.appendChild(row);
    if (f.custom && ctx.langs.length > 1) {
      const en = htmlToElement('<div class="sd-cfield-en"></div>');
      en.append(...biInputs(ctx, f, 'title', 'cftitle:' + f.key, 'Feld umbenannt').slice(1));
      el.appendChild(en);
    }
  });
  const customs = list.filter((f) => f.custom).length;
  const add = htmlToElement(`<button type="button" class="btn sd-add">${icon('plus', 's')}Eigenes Feld</button>`);
  add.disabled = customs >= MAX_CUSTOM_FIELDS;
  if (add.disabled) add.title = `Höchstens ${MAX_CUSTOM_FIELDS} eigene Felder`;
  add.addEventListener('click', () => {
    const f = newCoverField();
    ctx.commit('Feld hinzugefügt', () => target[prop].push(f), { rebuild: true });
    // nach dem Neuaufbau: Name des neuen Felds markieren (gleich lostippen)
    const focus = () => {
      const fld = document.querySelector(`.sd-cfield[data-key="${f.key}"] .fld`);
      if (fld) fld.select();
      return !!fld;
    };
    if (!focus()) setTimeout(focus, 0);
  });
  el.append(add, htmlToElement('<p class="sd-note">Leere Felder erscheinen nicht auf dem Deckblatt. Leere Überschrift: die vorgegebene.</p>'));
  return el;
}

/** Kopf- und Fußzeile: Hausfarbe, Logo (Größe, Seite), Inhalt der Fußzeile, eigener Text. */
export function lookEditor(look, ctx) {
  const el = htmlToElement('<div class="sd-look"></div>');
  // Hausfarbe: Auswahl oder eigene Farbe (zu helle werden für Schrift abgedunkelt)
  const colors = htmlToElement('<div class="sd-swatches sd-house" role="radiogroup" aria-label="Hausfarbe"></div>');
  for (const [value, label] of HOUSE_COLORS) {
    const on = look.color.toLowerCase() === value;
    const b = htmlToElement(`<button type="button" role="radio" aria-checked="${on}" class="${on ? 'on' : ''}" style="--c:${value}" title="${escapeHtml(label)}" aria-label="${escapeHtml(label)}"></button>`);
    b.addEventListener('click', () => !on && ctx.commit('Hausfarbe geändert', () => (look.color = value), { rebuild: true }));
    colors.appendChild(b);
  }
  const own = htmlToElement(`<label class="sd-swatch-custom" title="Eigene Farbe"><input type="color" value="${escapeHtml(look.color)}" aria-label="Eigene Hausfarbe"></label>`);
  own.querySelector('input').addEventListener('change', (ev) => ctx.commit('Hausfarbe geändert', () => (look.color = ev.target.value.toLowerCase()), { rebuild: true }));
  colors.appendChild(own);
  el.appendChild(field('Hausfarbe', colors));
  const ink = inkColor(look.color);
  el.appendChild(
    htmlToElement(
      `<p class="sd-note">Für Überschriften, Linien und Tabellenköpfe.${ink !== look.color.toLowerCase() ? ` Diese Farbe ist für Schrift zu hell – PlantPDF nimmt einen dunkleren Ton (<i class="sd-dot" style="background:${ink}"></i>).` : ''}</p>`,
    ),
  );
  el.append(
    field('Logo – Größe', seg(LOGO_SIZES, look.logoSize, (v) => ctx.commit('Logogröße geändert', () => (look.logoSize = v), { rebuild: true }))),
    field('Logo – Seite', seg([['left', 'Links'], ['right', 'Rechts']], look.logoPos, (v) => ctx.commit('Logo verschoben', () => (look.logoPos = v), { rebuild: true }))),
  );
  const foot = htmlToElement('<div class="sd-footparts"></div>');
  for (const [key, label] of FOOTER_PARTS)
    foot.appendChild(check(label, look.footer[key], (v) => ctx.commit(v ? 'Fußzeile ergänzt' : 'Fußzeile gekürzt', () => (look.footer[key] = v), { rebuild: true })));
  el.appendChild(field('In der Fußzeile', foot));
  el.appendChild(field('Eigener Text in der Fußzeile', ...biInputs(ctx, look, 'footerText', 'foottext', 'Fußzeilentext geändert', 'z. B. Vertraulich – nur für den Kunden')));
  el.appendChild(htmlToElement('<p class="sd-note">Links steht die Firma, rechts das Dokument. Der eigene Text steht in der Mitte, sonst in einer zweiten Zeile.</p>'));
  return el;
}

/** Dokumentnummer: Schema mit Platzhaltern, Stellen der laufenden Nummer, nächste Nummer, Vorschau. */
export function docNoEditor(no, ctx) {
  const el = htmlToElement('<div class="sd-docno"></div>');
  const pattern = input(no.pattern, (v) => ctx.commit('Schema geändert', () => (no.pattern = v), { key: 'docnopattern', rebuild: false }), { placeholder: 'z. B. {JJJJ}-{NR}', maxlength: 80, mono: true });
  pattern.dataset.f = 'docno';
  const preview = htmlToElement('<p class="sd-note sd-docno-pre" aria-live="polite"></p>');
  const show = () => {
    preview.textContent = no.pattern ? `Nächste Nummer: ${formatDocNo(no.pattern, no.next, no.digits)}` : 'Kein Schema – die Dokumentnummer bleibt leer und wird von Hand eingetragen.';
  };
  pattern.addEventListener('input', show);
  const chips = htmlToElement('<div class="sd-chips sd-tokens"></div>');
  for (const [token, label] of [
    ['{JJJJ}', 'Jahr'],
    ['{MM}', 'Monat'],
    ['{TT}', 'Tag'],
    ['{NR}', 'Laufende Nr.'],
  ]) {
    const b = htmlToElement(`<button type="button" title="${escapeHtml(token)} einfügen">${escapeHtml(label)}</button>`);
    b.addEventListener('mousedown', (ev) => ev.preventDefault());
    b.addEventListener('click', () => {
      const at = pattern.selectionStart ?? pattern.value.length;
      const end = pattern.selectionEnd ?? at;
      pattern.value = pattern.value.slice(0, at) + token + pattern.value.slice(end);
      pattern.setSelectionRange(at + token.length, at + token.length);
      pattern.focus();
      pattern.dispatchEvent(new Event('input'));
    });
    chips.appendChild(b);
  }
  const number = (value, min, max, onSet, label) => {
    const n = htmlToElement(`<input class="fld num" type="number" min="${min}" max="${max}" step="1" aria-label="${escapeHtml(label)}">`);
    n.value = value;
    n.addEventListener('change', () => {
      const v = Math.round(Number(n.value));
      if (!Number.isFinite(v) || v < min || v > max) return void (n.value = value);
      onSet(v);
      show();
    });
    return n;
  };
  const two = htmlToElement('<div class="sd-two"></div>');
  two.append(
    field('Stellen der Nr.', number(no.digits, 1, 8, (v) => ctx.commit('Stellen geändert', () => (no.digits = v)), 'Stellen der laufenden Nummer')),
    field('Nächste Nr.', number(no.next, 0, 99999999, (v) => ctx.commit('Nächste Nummer geändert', () => (no.next = v)), 'Nächste laufende Nummer')),
  );
  el.append(field('Schema', pattern), chips, two, preview);
  show();
  return el;
}

/** Firma für neue Dokumente: Logo, Name, Zusatz. `pickLogo` liefert ein Bild oder null. */
export function companyEditor(company, ctx, pickLogo) {
  const el = htmlToElement('<div class="sd-company"></div>');
  const logo = company.logo;
  const box = htmlToElement(
    `<div class="sd-logo${logo ? ' has' : ''}" role="button" tabindex="0" title="Logo hochladen (PNG, JPG oder SVG)">${
      logo ? `<img alt="Firmenlogo" src="${escapeHtml(logo.data)}">` : `${icon('image')}<span>Logo hochladen<small>PNG, JPG oder SVG</small></span>`
    }</div>`,
  );
  const pick = async () => {
    const img = await pickLogo();
    if (img) ctx.commit('Logo eingesetzt', () => (company.logo = img), { rebuild: true });
  };
  box.addEventListener('click', pick);
  box.addEventListener('keydown', (ev) => {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      pick();
    }
  });
  el.appendChild(field('Logo', box));
  if (logo) {
    const remove = htmlToElement(`<button type="button" class="btn sd-link">${icon('trash', 's')}Logo entfernen</button>`);
    remove.addEventListener('click', () => ctx.commit('Logo entfernt', () => (company.logo = null), { rebuild: true }));
    el.appendChild(remove);
  }
  el.append(
    field('Firmenname', input(company.name, (v) => ctx.commit('Firmenname geändert', () => (company.name = v), { key: 'coname' }), { placeholder: 'Steht in der Kopf- und Fußzeile', maxlength: 200 })),
    field('Zusatz', ...biInputs(ctx, company, 'tagline', 'cotag', 'Zusatz geändert', 'z. B. Sicherheitstechnik')),
  );
  return el;
}

/** Feste Ansprechpartner (kommen in jedes neue Dokument). */
export function contactsEditor(target, ctx) {
  const el = htmlToElement('<div class="sd-cats wide"></div>');
  if (!target.contacts.length) el.appendChild(htmlToElement('<div class="sd-empty">Keine festen Ansprechpartner.</div>'));
  for (const c of target.contacts) {
    const card = htmlToElement('<div class="sd-user sd-contact"></div>');
    card.dataset.id = c.id;
    const pair = (a, b) => {
      const p = htmlToElement('<div class="sd-two"></div>');
      p.append(a, b);
      return p;
    };
    const f = (label, prop, o = {}) => field(label, input(c[prop], (v) => ctx.commit('Ansprechpartner geändert', () => (c[prop] = v), { key: `ct${prop}:${c.id}` }), o));
    card.append(
      pair(f('Name', 'name', { maxlength: 200 }), f('Funktion', 'role', { placeholder: 'z. B. Notdienst', maxlength: 200 })),
      pair(f('Telefon', 'phone', { placeholder: '+49 …', maxlength: 80 }), f('E-Mail', 'email', { maxlength: 200 })),
    );
    const del = iconButton('trash', 'Ansprechpartner entfernen', () => ctx.commit('Ansprechpartner entfernt', () => (target.contacts = target.contacts.filter((x) => x !== c)), { rebuild: true }));
    del.classList.add('sd-user-del');
    card.appendChild(del);
    el.appendChild(card);
  }
  const add = htmlToElement(`<button type="button" class="btn sd-add">${icon('plus', 's')}Ansprechpartner</button>`);
  add.addEventListener('click', () => ctx.commit('Ansprechpartner hinzugefügt', () => target.contacts.push(newContact()), { rebuild: true }));
  el.appendChild(add);
  return el;
}
