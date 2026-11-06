/**
 * Einstellungen › Vorgaben für Dokumentationen: Leitungsarten, Kennzeichen, Spalten des
 * Klemmenplans und was ein Anschlussplan zeigt – für neu angelegte Dokumentationen (bestehende
 * bleiben, wie sie sind; im Dokument holt „Aus Einstellungen ergänzen“ Fehlendes nach).
 * Als Datei weitergeben (Export/Import), damit Kollegen dieselben Vorgaben nutzen.
 */
import { icon } from '../ui/icons.js';
import { htmlToElement } from '../ui/dom.js';
import { downloadBytes, pickFiles, showDialog, toast } from '../ui/dialogs.js';
import { cleanWiringPresets, defaultWiringPresets, loadWiringPresets, resetWiringPresets, saveWiringPresets } from './model.js';
import { categoriesEditor, columnsEditor, marksEditor, showEditor } from './wiring-catalog.js';
import { injectStudioCss } from './studio.js';

const FILE_KIND = 'plantpdf-vorgaben';

export async function showPresetsDialog() {
  injectStudioCss();
  let presets = loadWiringPresets();
  const body = htmlToElement('<div class="pre-dlg sd-ibody"></div>');
  const save = () => {
    if (!saveWiringPresets(presets)) toast('Die Vorgaben konnten nicht gespeichert werden.', 'err', 5000);
  };
  const render = () => {
    const keep = body.scrollTop;
    body.innerHTML = '';
    const ctx = {
      langs: ['de', 'en'],
      commit: (label, fn, o = {}) => {
        fn();
        save();
        if (o.rebuild) render();
      },
    };
    const group = (title, ...children) => {
      const el = htmlToElement(`<section class="sd-grp"><h4></h4></section>`);
      el.querySelector('h4').textContent = title;
      el.append(...children);
      body.appendChild(el);
    };
    body.appendChild(
      htmlToElement(
        '<p class="sd-note">Gilt für <b>neu angelegte</b> Anschlusspläne. Bestehende Dokumentationen bleiben, wie sie sind – dort ergänzt „Aus Einstellungen ergänzen“ fehlende Einträge.</p>',
      ),
    );
    group('Leitungsarten', categoriesEditor(presets, ctx));
    group('Kennzeichen', marksEditor(presets, ctx));
    group('Klemmenplan', columnsEditor(presets, ctx));
    group('Im Plan zeigen', showEditor(presets, ctx));
    const foot = htmlToElement('<div class="pre-foot"></div>');
    const button = (label, ic, run) => {
      const b = htmlToElement(`<button type="button" class="btn outline">${icon(ic, 's')}${label}</button>`);
      b.addEventListener('click', run);
      foot.appendChild(b);
    };
    button('Exportieren …', 'export', () => {
      const data = JSON.stringify({ kind: FILE_KIND, version: 1, wiring: presets }, null, 2);
      downloadBytes(new TextEncoder().encode(data), 'PlantPDF-Vorgaben.json', 'application/json');
      toast('Vorgaben als Datei gespeichert.');
    });
    button('Importieren …', 'open', async () => {
      const file = await pickFiles('.json,application/json');
      if (!file) return;
      try {
        const raw = JSON.parse(await file.text());
        if (!raw || raw.kind !== FILE_KIND || !raw.wiring) throw new Error('kein Vorgaben-Paket');
        presets = cleanWiringPresets(raw.wiring);
        save();
        render();
        toast('Vorgaben übernommen.');
      } catch {
        toast('Diese Datei enthält keine PlantPDF-Vorgaben.', 'err', 5000);
      }
    });
    button('Auf Standard zurücksetzen', 'undo', async () => {
      const ok = await showDialog({
        title: 'Vorgaben zurücksetzen',
        icon: 'warn',
        body: 'Leitungsarten, Kennzeichen und Klemmenplan-Spalten auf die eingebauten Vorgaben zurücksetzen? Bestehende Dokumentationen ändern sich nicht.',
        buttons: [
          { label: 'Abbrechen', value: false },
          { label: 'Zurücksetzen', primary: true, value: true },
        ],
      });
      if (!ok) return;
      resetWiringPresets();
      presets = defaultWiringPresets();
      render();
    });
    body.appendChild(foot);
    body.scrollTop = keep;
  };
  render();
  await showDialog({ title: 'Vorgaben für Dokumentationen – Anschlussplan', icon: 'wiring', body, buttons: [{ label: 'Fertig', primary: true, value: true }] });
}
