/**
 * Einstellungen › Vorgaben für Dokumentationen: je Reiter die Vorgaben für neu angelegte Dokumente
 * – Deckblatt (Firma, Felder, Standardwerte, Dokumentnummer, feste Ansprechpartner, Wachschutz),
 * Kopf- und Fußzeile, Anschlussplan. Bestehende Dokumente bleiben, wie sie sind.
 * Als Datei weitergeben (Export/Import), damit Kollegen dieselben Vorgaben nutzen.
 */
import { icon } from '../ui/icons.js';
import { escapeHtml, htmlToElement } from '../ui/dom.js';
import { downloadBytes, pickFiles, showDialog, toast } from '../ui/dialogs.js';
import { cleanPageLook, cleanWiringPresets, defaultWiringPresets, loadWiringPresets, resetWiringPresets, saveWiringPresets } from './model.js';
import {
  PRESETS_FILE,
  cleanCoverPresets,
  defaultCoverPresets,
  defaultLookPresets,
  loadCoverPresets,
  loadLookPresets,
  rememberedCompany,
  resetCoverPresets,
  resetLookPresets,
  saveCoverPresets,
  saveLookPresets,
} from './presets.js';
import { categoriesEditor, columnsEditor, field, input, marksEditor, showEditor } from './wiring-catalog.js';
import { companyEditor, contactsEditor, coverFieldsEditor, docNoEditor, lookEditor } from './doc-catalog.js';
import { injectStudioCss, readImage } from './studio.js';

const TABS = [
  ['cover', 'Deckblatt', 'fitp'],
  ['look', 'Kopf- und Fußzeile', 'file'],
  ['wiring', 'Anschlussplan', 'wiring'],
];

/** Zuletzt geöffneter Reiter (in dieser Sitzung). */
let lastTab = 'cover';

export async function showPresetsDialog(tab = lastTab) {
  injectStudioCss();
  const state = { cover: loadCoverPresets(), look: loadLookPresets(), wiring: loadWiringPresets() };
  const SAVE = { cover: saveCoverPresets, look: saveLookPresets, wiring: saveWiringPresets };
  const RESET = {
    cover: () => (resetCoverPresets(), (state.cover = defaultCoverPresets())),
    look: () => (resetLookPresets(), (state.look = defaultLookPresets())),
    wiring: () => (resetWiringPresets(), (state.wiring = defaultWiringPresets())),
  };
  let current = TABS.some(([id]) => id === tab) ? tab : 'cover';
  const shell = htmlToElement('<div class="pre-shell"><div class="pre-tabs" role="tablist"></div><div class="pre-dlg sd-ibody" role="tabpanel"></div></div>');
  const tabs = shell.querySelector('.pre-tabs');
  const body = shell.querySelector('.pre-dlg');
  const save = (id) => {
    if (!SAVE[id](state[id])) toast('Die Vorgaben konnten nicht gespeichert werden (Speicher voll? Ein kleineres Logo hilft).', 'err', 6000);
  };

  const render = () => {
    lastTab = current;
    tabs.innerHTML = '';
    for (const [id, label, ic] of TABS) {
      const b = htmlToElement(`<button type="button" role="tab" class="pre-tab${id === current ? ' on' : ''}" aria-selected="${id === current}" data-tab="${id}">${icon(ic, 's')}${escapeHtml(label)}</button>`);
      b.addEventListener('click', () => {
        if (id === current) return;
        current = id;
        body.scrollTop = 0;
        render();
      });
      tabs.appendChild(b);
    }
    const keep = body.scrollTop;
    body.innerHTML = '';
    const ctx = {
      langs: ['de', 'en'],
      commit: (label, fn, o = {}) => {
        fn();
        save(current);
        if (o.rebuild) render();
      },
    };
    const group = (title, ...children) => {
      const el = htmlToElement(`<section class="sd-grp"><h4></h4></section>`);
      el.querySelector('h4').textContent = title;
      el.append(...children.filter(Boolean));
      body.appendChild(el);
      return el;
    };
    const note = (html) => htmlToElement(`<p class="sd-note">${html}</p>`);
    body.appendChild(note('Gilt für <b>neu angelegte</b> Dokumentationen. Bestehende bleiben, wie sie sind – dort lässt sich alles einzeln ändern.'));
    if (current === 'cover') coverTab(state.cover, ctx, group, note);
    else if (current === 'look') group('Kopf- und Fußzeile', lookEditor(state.look, ctx));
    else wiringTab(state.wiring, ctx, group, note);

    const foot = htmlToElement('<div class="pre-foot"></div>');
    const button = (label, ic, run) => {
      const b = htmlToElement(`<button type="button" class="btn outline">${icon(ic, 's')}${label}</button>`);
      b.addEventListener('click', run);
      foot.appendChild(b);
    };
    button('Exportieren …', 'export', () => {
      const data = JSON.stringify({ kind: PRESETS_FILE, version: 2, cover: state.cover, look: state.look, wiring: state.wiring }, null, 2);
      downloadBytes(new TextEncoder().encode(data), 'PlantPDF-Vorgaben.json', 'application/json');
      toast('Vorgaben als Datei gespeichert.');
    });
    button('Importieren …', 'open', async () => {
      const file = await pickFiles('.json,application/json');
      if (!file) return;
      try {
        const raw = JSON.parse(await file.text());
        if (!raw || raw.kind !== PRESETS_FILE || !(raw.wiring || raw.cover || raw.look)) throw new Error('kein Vorgaben-Paket');
        if (raw.wiring) state.wiring = cleanWiringPresets(raw.wiring);
        if (raw.cover) state.cover = cleanCoverPresets(raw.cover);
        if (raw.look) state.look = cleanPageLook(raw.look);
        for (const id of ['wiring', 'cover', 'look']) if (raw[id]) save(id);
        render();
        toast('Vorgaben übernommen.');
      } catch {
        toast('Diese Datei enthält keine PlantPDF-Vorgaben.', 'err', 5000);
      }
    });
    const name = TABS.find(([id]) => id === current)[1];
    button(`„${name}“ zurücksetzen`, 'undo', async () => {
      const ok = await showDialog({
        title: 'Vorgaben zurücksetzen',
        icon: 'warn',
        body: `Die Vorgaben für „${name}“ auf die eingebauten zurücksetzen? Bestehende Dokumentationen ändern sich nicht.`,
        buttons: [
          { label: 'Abbrechen', value: false },
          { label: 'Zurücksetzen', primary: true, value: true },
        ],
      });
      if (!ok) return;
      RESET[current]();
      render();
    });
    body.appendChild(foot);
    body.scrollTop = keep;
  };
  render();
  await showDialog({ title: 'Vorgaben für Dokumentationen', icon: 'binder', body: shell, buttons: [{ label: 'Fertig', primary: true, value: true }] });
}

function coverTab(cover, ctx, group, note) {
  // Firma: ohne Eintrag wie bisher die aus dem zuletzt bearbeiteten Dokument
  const shown = cover.company || rememberedCompany() || { name: '', tagline: { de: '', en: '' }, logo: null };
  const companyCtx = {
    ...ctx,
    commit: (label, fn, o) => {
      if (!cover.company) cover.company = shown;
      ctx.commit(label, fn, o);
    },
  };
  const pickLogo = async () => {
    const file = await pickFiles('image/png,image/jpeg,image/svg+xml,image/webp');
    if (!file) return null;
    try {
      return await readImage(file, { max: 800 });
    } catch {
      toast('Das Bild konnte nicht gelesen werden (PNG, JPG oder SVG).', 'err', 5000);
      return null;
    }
  };
  group(
    'Firma',
    companyEditor(shown, companyCtx, pickLogo),
    note(cover.company ? 'Kommt in jedes neue Dokument.' : 'Noch nicht festgelegt: neue Dokumente übernehmen die Firma aus dem zuletzt bearbeiteten Dokument.'),
  );
  group('Felder des Deckblatts', coverFieldsEditor(cover, ctx, 'fields'));
  const text = (label, prop, placeholder = '') => field(label, input(cover[prop], (v) => ctx.commit(label, () => (cover[prop] = v), { key: 'cv:' + prop }), { placeholder, maxlength: 200 }));
  const two = htmlToElement('<div class="sd-two"></div>');
  two.append(text('Techniker', 'technician', 'z. B. Ihr Name'), text('Geprüft von', 'checked'));
  group('Standardwerte', two, text('Erste Version', 'version', '1.0'));
  group('Dokumentnummer', docNoEditor(cover.docNo, ctx), note('Jedes neue Dokument bekommt die nächste Nummer; im Dokument bleibt sie änderbar.'));
  group('Feste Ansprechpartner', note('Z. B. Ihr Notdienst – stehen in jedem neuen Dokument unter „Ansprechpartner“.'), contactsEditor(cover, ctx));
  const g = cover.guard;
  const gtext = (label, prop, placeholder = '') => field(label, input(g[prop], (v) => ctx.commit(label, () => (g[prop] = v), { key: 'gd:' + prop }), { placeholder, maxlength: 300 }));
  const gtwo = htmlToElement('<div class="sd-two"></div>');
  gtwo.append(gtext('Notruf', 'phone', '+49 …'), gtext('Kunden-/Objekt-Nr.', 'customerNo'));
  group('Wachschutz', gtext('Firma', 'company', 'z. B. Muster Sicherheitsdienst'), gtwo, gtext('Leitstelle / Aufschaltung', 'center'));
}

function wiringTab(presets, ctx, group, note) {
  group('Leitungsarten', categoriesEditor(presets, ctx));
  group('Kennzeichen', marksEditor(presets, ctx));
  group('Klemmenplan', columnsEditor(presets, ctx));
  group('Im Plan zeigen', showEditor(presets, ctx));
  group('Vorhandene Pläne', note('Im Dokument holt „Aus Einstellungen ergänzen“ fehlende Leitungsarten und Kennzeichen nach.'));
}
