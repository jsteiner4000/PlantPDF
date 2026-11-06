/**
 * Vorgaben für Dokumentationen: Deckblatt (Firma, eigene Felder, Standardwerte, Dokumentnummer mit
 * Zähler, feste Ansprechpartner, Wachschutz) und Kopf-/Fußzeile (Hausfarbe, Logo, Inhalt, eigener
 * Text). Neue Dokumente übernehmen sie, bestehende bleiben; je Dokument ist alles änderbar.
 */
import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { launch } from './helpers.js';

const svgOf = async (page, i = 0) => {
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  return page.evaluate((i) => window.pdfEditor.studio.doc.pages[i].svg || '', i);
};
const project = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.pdfEditor.studio.project)));

async function openPresets(page, tab) {
  await page.evaluate(() => void window.pdfEditor.settings()); // nicht auf das Schließen warten
  await page.locator(`.set-btns [data-tab="${tab}"]`).click();
  const dlg = page.locator('.dlg', { has: page.locator('.pre-shell') });
  await expect(dlg).toBeVisible();
  return dlg;
}
async function closePresets(page, dlg) {
  await dlg.locator('.btn.primary', { hasText: 'Fertig' }).click();
  await page.locator('.dlg .btn.primary', { hasText: 'Fertig' }).click();
  await expect(page.locator('.dlg')).toHaveCount(0);
}
/** Dokumentation schließen (ohne zu speichern). */
async function closeDoc(page) {
  await page.evaluate(() => void window.pdfEditor.studio.close());
  const ask = page.locator('.dlg .btn', { hasText: 'Nicht speichern' });
  // die Rückfrage kommt nur bei Änderungen (und erst nach einem Moment)
  await expect
    .poll(async () => {
      if (await ask.isVisible()) await ask.click();
      return page.evaluate(() => !window.pdfEditor.studio.project);
    })
    .toBe(true);
}
async function newDocumentation(page) {
  if (await page.evaluate(() => !!window.pdfEditor.studio.project)) await closeDoc(page);
  await page.locator('#wsDocs').click();
  await page.locator('.tpl[data-tpl="documentation"]').click();
  await page.locator('.dlg .btn.primary', { hasText: 'Erstellen' }).click();
  await expect(page.locator('#prjTab')).toHaveClass(/on/);
}

test('Vorgaben Deckblatt und Fußzeile: neue Dokumente übernehmen sie, die Nummer zählt weiter', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    // ein Dokument von vorher bleibt, wie es ist
    await newDocumentation(page);
    const before = await project(page);
    await closeDoc(page);

    let dlg = await openPresets(page, 'cover');
    await dlg.locator('.sd-company .fld').first().fill('Muster Sicherheitstechnik');
    await dlg.locator('.sd-add', { hasText: 'Eigenes Feld' }).click();
    await page.keyboard.type('Auftrags-Nr.');
    // „Version“ ausblenden, „Kunde“ umbenennen
    await dlg.locator('.sd-cfield[data-key="version"] input[type=checkbox]').uncheck();
    await dlg.locator('.sd-cfield[data-key="customer"] .fld').fill('Auftraggeber');
    await dlg.locator('.sd-grp', { hasText: 'Standardwerte' }).locator('.sd-f', { hasText: 'Techniker' }).locator('input').fill('J. Steiner');
    // Dokumentnummer: Schema über die Bausteine
    const no = dlg.locator('[data-f="docno"]');
    await no.fill('PL-');
    await dlg.locator('.sd-tokens button', { hasText: 'Jahr' }).click();
    await no.press('End');
    await no.pressSequentially('-');
    await dlg.locator('.sd-tokens button', { hasText: 'Laufende Nr.' }).click();
    await expect(no).toHaveValue('PL-{JJJJ}-{NR}');
    await expect(dlg.locator('.sd-docno-pre')).toHaveText('Nächste Nummer: PL-2026-001');
    await dlg.locator('.sd-add', { hasText: 'Ansprechpartner' }).click();
    await dlg.locator('.sd-contact .fld').first().fill('Notdienst 24/7');
    await dlg.locator('.sd-grp', { hasText: 'Wachschutz' }).locator('.sd-f', { hasText: 'Notruf' }).locator('input').fill('0800 123');
    // Reiter Kopf- und Fußzeile
    await dlg.locator('.pre-tab', { hasText: 'Kopf' }).click();
    await dlg.locator('.sd-house button[title="Petrol"]').click();
    await dlg.locator('.sd-f', { hasText: 'Logo – Seite' }).locator('button', { hasText: 'Links' }).click();
    await dlg.locator('.sd-check', { hasText: 'Dokument-Nr.' }).locator('input').check();
    await dlg.locator('.sd-f', { hasText: 'Eigener Text' }).locator('input').first().fill('Vertraulich');
    await closePresets(page, dlg);

    // neues Dokument: alles übernommen
    await newDocumentation(page);
    let p = await project(page);
    expect(p.company.name).toBe('Muster Sicherheitstechnik');
    expect(p.meta.technician).toBe('J. Steiner');
    expect(p.meta.docNo).toBe('PL-2026-001');
    expect(p.contacts.map((c) => c.name)).toEqual(['Notdienst 24/7']);
    expect(p.guard.phone).toBe('0800 123');
    expect(p.look).toMatchObject({ color: '#0e6b5c', logoPos: 'left', footer: { docNo: true }, footerText: { de: 'Vertraulich' } });
    const custom = p.coverFields.find((f) => f.custom);
    expect(custom.title.de, JSON.stringify(p.coverFields)).toBe('Auftrags-Nr.');

    // Deckblatt: umbenanntes Feld, ausgeblendete Version, eigenes Feld mit Wert
    await page.locator('.sd-f', { hasText: 'Auftraggeber' }).locator('input').fill('Stadtwerke');
    await page.locator('.sd-f', { hasText: 'Auftrags-Nr.' }).locator('input').fill('A-778');
    await expect(page.locator('.sd-f', { hasText: /^Version/ })).toHaveCount(0);
    let cover = await svgOf(page, 0);
    expect(cover).toContain('>Auftraggeber<');
    expect(cover).toContain('>Stadtwerke<');
    expect(cover).toContain('>Auftrags-Nr.<');
    expect(cover).toContain('>A-778<');
    expect(cover).not.toContain('>Version<');
    expect(cover).toContain('>Notdienst 24/7<');
    // Inhaltsseite: Hausfarbe, Dok.-Nr. und eigener Text in der Fußzeile
    const inner = await svgOf(page, 2);
    expect(inner).toContain('#0e6b5c');
    expect(inner).not.toContain('#1f3b4d');
    expect(inner).toContain('Dok.-Nr. PL-2026-001');
    expect(inner).toContain('>Vertraulich<');

    // nächstes Dokument: nächste Nummer
    await newDocumentation(page);
    p = await project(page);
    expect(p.meta.docNo).toBe('PL-2026-002');
    dlg = await openPresets(page, 'cover');
    await expect(dlg.locator('.sd-docno-pre')).toHaveText('Nächste Nummer: PL-2026-003');
    await closePresets(page, dlg);

    // das Dokument von vorher: unverändert (Felder, Gestaltung wie bisher)
    expect(before.look.color).toBe('#1f3b4d');
    expect(before.meta.docNo).toBe('');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Je Dokument: Felder anpassen, Kopf- und Fußzeile ändern; Export und Import aller Vorgaben', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await newDocumentation(page);
    await page.locator('.sd-f', { hasText: 'Kunde' }).locator('input').first().fill('Muster AG');
    await page.locator('.sd-f', { hasText: /^Version/ }).locator('input').fill('2.1');
    // Felder anpassen: „Version“ aus, „Datum“ nach oben, eigenes Feld
    await page.locator('[data-a="coverfields"]').click();
    const dlg = page.locator('.dlg', { has: page.locator('.sd-cf-dlg') });
    await dlg.locator('.sd-cfield[data-key="version"] input[type=checkbox]').uncheck();
    for (let i = 0; i < 3; i++) await dlg.locator('.sd-cfield[data-key="date"] button[title="Nach oben"]').click();
    await dlg.locator('.sd-add', { hasText: 'Eigenes Feld' }).click();
    await page.keyboard.type('Objekt-Nr.');
    await dlg.locator('.btn.primary', { hasText: 'Fertig' }).click();
    let p = await project(page);
    expect(p.coverFields.slice(0, 2).map((f) => f.key)).toEqual(['date', 'customer']);
    let cover = await svgOf(page, 0);
    expect(cover).not.toContain('>2.1<');
    expect(cover.indexOf('>Datum<')).toBeLessThan(cover.indexOf('>Kunde<'));
    // Rückgängig stellt die Felder wieder her
    await page.keyboard.press('Control+z');
    await page.keyboard.press('Control+z');
    // Kopf- und Fußzeile im Dokument
    const look = page.locator('.sd-grp', { has: page.locator('h4', { hasText: 'Kopf- und Fußzeile' }) });
    await look.locator('.sd-check', { hasText: 'Seitenzahl' }).locator('input').uncheck();
    await look.locator('.sd-f', { hasText: 'Logo – Größe' }).locator('button', { hasText: 'Groß' }).click();
    p = await project(page);
    expect(p.look.footer.page).toBe(false);
    expect(p.look.logoSize).toBe('L');
    const inner = await svgOf(page, 2);
    expect(inner).not.toMatch(/Seite \d+ von \d+/);
    // zu helle Hausfarbe: für Schrift abgedunkelt
    await look.locator('.sd-swatch-custom input').evaluate((el) => {
      el.value = '#ffe066';
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });
    const light = await svgOf(page, 2);
    expect(light).not.toContain('#ffe066');
    await expect(look.locator('.sd-note', { hasText: 'zu hell' })).toBeVisible();

    // Export (alle Reiter) und Import
    await closeDoc(page);
    let pre = await openPresets(page, 'look');
    await pre.locator('.sd-check', { hasText: 'Datum' }).locator('input').check();
    const download = page.waitForEvent('download');
    await pre.locator('button', { hasText: 'Exportieren' }).click();
    const file = await (await download).path();
    const data = JSON.parse(readFileSync(file, 'utf8'));
    expect(data).toMatchObject({ kind: 'plantpdf-vorgaben', version: 2 });
    expect(data.look.footer.date).toBe(true);
    expect(data.cover.fields.length).toBe(8);
    expect(data.wiring.categories.length).toBeGreaterThan(0);
    await pre.locator('button', { hasText: 'zurücksetzen' }).click();
    await page.locator('.dlg .btn.primary', { hasText: 'Zurücksetzen' }).click();
    await expect(pre.locator('.sd-check', { hasText: 'Datum' }).locator('input')).not.toBeChecked();
    const chooser = page.waitForEvent('filechooser');
    await pre.locator('button', { hasText: 'Importieren' }).click();
    await (await chooser).setFiles(file);
    await expect(pre.locator('.sd-check', { hasText: 'Datum' }).locator('input')).toBeChecked();
    await closePresets(page, pre);
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Laden prüft Felder und Fußzeile; ältere Dokumente bleiben wie bisher; Nummernschema', async () => {
  const m = await import('../src/studio/model.js');
  const base = m.newProject('documentation');
  // fremde bzw. kaputte Werte
  const raw = JSON.parse(JSON.stringify(base));
  raw.look = { color: 'red;evil', logoSize: 'XXL', logoPos: 'top', footer: { page: 'ja', docNo: true }, footerText: { de: '<b>x</b>', en: 5 } };
  raw.coverFields = [{ key: 'customer', show: false }, { key: 'evil' }, { key: 'xA1', title: { de: 'Eigen' }, custom: true }, { key: 'customer' }];
  raw.extra = { xA1: 'Wert', xZZ: 'weg', customer: 'nein' };
  const p = m.normalizeProject(raw);
  expect(p.look).toEqual({ ...m.defaultLook(), footer: { ...m.defaultLook().footer, docNo: true }, footerText: { de: '<b>x</b>', en: '5' } });
  expect(p.coverFields.map((f) => f.key)).toEqual(['customer', 'xA1', 'address', 'site', 'date', 'technician', 'checked', 'docNo', 'version']);
  expect(p.coverFields[0].show).toBe(false);
  expect(p.extra).toEqual({ xA1: 'Wert' });
  // ältere Dokumente (ohne die neuen Angaben): Standard, nichts geht verloren
  const old = JSON.parse(JSON.stringify(base));
  delete old.look;
  delete old.coverFields;
  delete old.extra;
  delete old.meta.checked;
  const q = m.normalizeProject(old);
  expect(q.look).toEqual(m.defaultLook());
  expect(q.coverFields).toEqual(m.defaultCoverFields());
  expect(q.meta.checked).toBe('');
  const up = JSON.parse(JSON.stringify(old));
  m.upgradeProject(up);
  expect(up.look).toEqual(m.defaultLook());
  expect(up.coverFields.length).toBe(8);
  // Schema der Dokumentnummer
  const d = new Date(2026, 2, 5);
  expect(m.formatDocNo('{JJJJ}-{NR}', 7, 3, d)).toBe('2026-007');
  expect(m.formatDocNo('A{JJ}{MM}{TT}/{NR}', 12, 2, d)).toBe('A260305/12');
  expect(m.formatDocNo('fest', 1, 3, d)).toBe('fest');
});

test('Vorgaben Zugangsdaten: Bereiche, Spalten (Reihenfolge, Name), Passwörter, Auswahllisten', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    const dlg = await openPresets(page, 'access');
    // Netzwerk ein, Fernzugriff aus
    await dlg.locator('[data-block="network"] input').check();
    await dlg.locator('[data-block="remote"] input').uncheck();
    // Geräte-Zugänge: „Rolle“ aus, „IP-Adresse“ nach vorn und umbenannt
    const dev = dlg.locator('.sd-wcols[data-table="devices"]');
    await dev.locator('.sd-wcol[data-key="role"] input[type=checkbox]').uncheck();
    await dev.locator('.sd-wcol[data-key="ip"] button[title="Nach links"]').click();
    await dev.locator('.sd-wcol[data-key="ip"] .fld').fill('IP');
    await dlg.locator('.sd-check', { hasText: 'Passwörter und Schlüssel' }).locator('input').check();
    await dlg.locator('textarea[data-list="services"]').fill('Hik-Connect\nMeine Cloud\n\nHik-Connect');
    await dlg.locator('textarea[data-list="roles"]').fill('Admin\nKunde');
    await closePresets(page, dlg);

    await newDocumentation(page);
    let a = await page.evaluate(() => JSON.parse(JSON.stringify(window.pdfEditor.studio.project.sections.find((s) => s.type === 'access'))));
    expect(a.blocks).toMatchObject({ network: true, remote: false });
    expect(a.showPasswords).toBe(true);
    expect(a.cols.devices.slice(0, 2).map((c) => c.key)).toEqual(['ip', 'name']);
    expect(a.cols.devices.find((c) => c.key === 'role').show).toBe(false);
    // Gerät mit Rolle und IP: Kopf der Tabelle in eingestellter Reihenfolge, Rolle fehlt
    const index = await page.evaluate(() => {
      const st = window.pdfEditor.studio;
      const s = st.project.sections.find((x) => x.type === 'access');
      st.change('Gerät', () => s.devices.push({ id: 'd1', sym: null, name: { de: 'Rekorder', en: '' }, ip: '10.0.0.5', web: '', user: 'admin', password: 'geheim', role: 'Admin', users: [], note: { de: '', en: '' }, model: '', serial: '', mac: '', firmware: '', location: { de: '', en: '' } }));
      return st.doc.pages.findIndex((p) => p.section === s.id);
    });
    let svg = await svgOf(page, index);
    expect(svg).toContain('>IP<');
    expect(svg.indexOf('>IP<')).toBeLessThan(svg.indexOf('>Gerät<'));
    expect(svg).not.toContain('>Rolle<');
    expect(svg).toContain('>geheim<');
    // Auswahllisten am Gerät bzw. Fernzugriff
    const services = await page.evaluate(() => [...document.querySelectorAll('#sdServices option')].map((o) => o.value));
    await page.evaluate(() => window.pdfEditor.studio.select({ kind: 'device', id: 'd1', section: window.pdfEditor.studio.project.sections.find((s) => s.type === 'access').id }));
    const roles = await page.evaluate(() => [...document.querySelectorAll('#sdRoles option')].map((o) => o.value));
    expect(roles).toEqual(['Admin', 'Kunde']);
    expect(services).toBeDefined();
    await page.evaluate(() => {
      const st = window.pdfEditor.studio;
      const s = st.project.sections.find((x) => x.type === 'access');
      st.change('Fernzugriff', () => s.remote.push({ id: 'r1', service: '', address: '', user: '', password: '', note: { de: '', en: '' } }));
      st.select({ kind: 'remote', id: 'r1', section: s.id });
    });
    await expect.poll(() => page.evaluate(() => [...document.querySelectorAll('#sdServices option')].map((o) => o.value))).toEqual(['Hik-Connect', 'Meine Cloud']);

    // im Dokument: Spalte wieder einblenden
    await page.evaluate(() => window.pdfEditor.studio.select({ kind: 'section', id: window.pdfEditor.studio.project.sections.find((s) => s.type === 'access').id }));
    const cols = page.locator('.sd-grp', { has: page.locator('h4', { hasText: 'Spalten' }) });
    await cols.locator('.sd-wcols[data-table="devices"] .sd-wcol[data-key="role"] input[type=checkbox]').check();
    svg = await svgOf(page, index);
    expect(svg).toContain('>Rolle<');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Zugangsdaten älterer Dokumente: ausgeblendete Spalten bleiben ausgeblendet', async () => {
  const m = await import('../src/studio/model.js');
  const p = m.newProject('documentation');
  const a = JSON.parse(JSON.stringify(p.sections.find((s) => s.type === 'access')));
  delete a.cols;
  a.hide = { devices: ['role', 'web'], hardware: [], wifi: ['note'], remote: 'kaputt' };
  const q = m.normalizeProject({ ...JSON.parse(JSON.stringify(p)), sections: [a] });
  const cols = q.sections[0].cols;
  const shown = (t) => cols[t].filter((c) => c.show).map((c) => c.key);
  expect(shown('devices')).toEqual(['name', 'ip', 'user', 'password', 'note']);
  expect(shown('hardware')).toContain('location');
  expect(shown('wifi')).toEqual(['ssid', 'key', 'security']);
  expect(shown('remote').length).toBe(5);
  expect(q.sections[0].hide).toBeUndefined();
  // fremde Spalten und Überschriften werden geprüft; feste Spalten bleiben sichtbar
  const r = m.cleanAccessCols({ devices: [{ key: 'name', show: false, title: { de: 'X'.repeat(99) } }, { key: 'evil' }] });
  expect(r.devices[0]).toMatchObject({ key: 'name', show: true });
  expect(r.devices[0].title.de.length).toBe(40);
  expect(r.devices.map((c) => c.key)).not.toContain('evil');
  expect(r.devices.length).toBe(7);
  // Vorgaben: Listen ohne Doppelte und Leere
  const pre = m.cleanAccessPresets({ roles: ['A', ' A ', '', 5, 'B'], blocks: { network: true, evil: true } });
  expect(pre.roles).toEqual(['A', 'B']);
  expect(pre.blocks).toEqual({ devices: true, hardware: true, network: true, wifi: true, remote: true });
});

test('Vorgaben Lageplan: eigene Symbolart, angepasste Standard-Symbole, Linienart, Gerätefeld, Geräteliste', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    const dlg = await openPresets(page, 'site');
    // eigene Symbolart (Bildzeichen, Kürzel)
    await dlg.locator('.sd-add', { hasText: 'Eigene Symbolart' }).click();
    const card = dlg.locator('.sd-custom').last();
    await card.locator('.sd-cat input.fld').first().fill('Wärmebildkamera');
    await card.locator('.sd-f', { hasText: 'Kürzel' }).locator('input').fill('WB');
    await card.locator('.sd-check', { hasText: 'Netzwerkgerät' }).locator('input').check();
    // Standard-Symbole: Kamera heißt „CAM“, Sirene nicht in der Galerie
    await dlg.locator('.sd-kind[data-kind="camera"] .sd-kind-code').fill('CAM');
    await dlg.locator('.sd-kind[data-kind="siren"] .sd-kind-show').uncheck();
    // Linienart „Glasfaser“, gepunktet
    await dlg.locator('.sd-add', { hasText: 'Linien- oder Flächenart' }).click();
    const st = dlg.locator('.sd-style').last();
    await st.locator('.sd-cat input.fld').first().fill('Glasfaser');
    await st.locator('.sd-seg button', { hasText: 'Gepunktet' }).click();
    // Gerätefeld „Kabel-Nr.“ als Spalte der Geräteliste
    await dlg.locator('.sd-add', { hasText: 'Eigenes Feld' }).click();
    await dlg.locator('.sd-dfield .sd-cat input.fld').first().fill('Kabel-Nr.');
    const fieldKey = await dlg.locator('.sd-wcol[data-key^="f:"]').getAttribute('data-key');
    await dlg.locator(`.sd-wcol[data-key="${fieldKey}"] input[type=checkbox]`).check();
    await dlg.locator('.sd-f', { hasText: 'Legende' }).locator('button', { hasText: 'Eigene Seite' }).click();
    await closePresets(page, dlg);

    await newDocumentation(page);
    let site = await page.evaluate(() => JSON.parse(JSON.stringify(window.pdfEditor.studio.project.sections.find((s) => s.type === 'site'))));
    expect(site.custom.map((c) => [c.code, c.net])).toEqual([['WB', true]]);
    expect(site.kinds.camera).toEqual({ code: 'CAM' });
    expect(site.styles.map((t) => t.name.de)).toContain('Glasfaser');
    expect(site.fields.map((f) => f.label.de)).toEqual(['Kabel-Nr.']);
    expect(site.legend).toBe('page');
    // Galerie: Sirene fehlt, Wärmebildkamera ist da
    await page.evaluate(() => {
      const st = window.pdfEditor.studio;
      st.symbolMenu(document.body, st.project.sections.find((s) => s.type === 'site'));
    });
    const tiles = page.locator('.sd-gallery .sd-symbol span');
    await expect(tiles.filter({ hasText: 'Wärmebildkamera' })).toHaveCount(1);
    await expect(tiles.filter({ hasText: 'Sirene' })).toHaveCount(0);
    await page.keyboard.press('Escape');

    // Kamera und Wärmebildkamera setzen, Kabel-Nr. eintragen, Linie mit „Glasfaser“
    const ids = await page.evaluate(() => {
      const st = window.pdfEditor.studio;
      const s = st.project.sections.find((x) => x.type === 'site');
      const glas = s.styles.find((t) => t.name.de === 'Glasfaser').id;
      st.change('Test', () => {
        s.symbols.push({ id: 'yc', kind: 'camera', x: 0.2, y: 0.2, name: { de: 'Tor', en: '' }, note: { de: '', en: '' }, ip: '', scale: 1, fov: false, dir: 0, angle: 90, range: 60 });
        s.symbols.push({ id: 'yw', kind: 'custom:' + s.custom[0].id, x: 0.6, y: 0.6, name: { de: 'Hof', en: '' }, note: { de: '', en: '' }, ip: '', scale: 1, fov: false, dir: 0, angle: 90, range: 60 });
        s.shapes.push({ id: 'zg', type: 'line', pts: [[0.1, 0.9], [0.9, 0.9]], closed: false, color: '#1d4ed8', name: { de: '', en: '' }, showLen: true, style: glas });
      });
      st.select({ kind: 'sym', id: 'yc', section: s.id });
      return { section: s.id, page: st.doc.pages.findIndex((p) => p.section === s.id) };
    });
    await page.locator('.sd-grp', { hasText: 'Weitere Angaben' }).locator('.sd-f', { hasText: 'Kabel-Nr.' }).locator('input').fill('W-12');
    // Wärmebildkamera ist Netzwerkgerät: Zugang am Symbol
    await page.evaluate((sec) => window.pdfEditor.studio.select({ kind: 'sym', id: 'yw', section: sec }), ids.section);
    await expect(page.locator('.sd-grp', { has: page.locator('h4', { hasText: /^Zugang$/ }) })).toBeVisible();
    const plan = await svgOf(page, ids.page);
    expect(plan).toContain('>CAM 1<');
    expect(plan).toContain('>WB 1<');
    expect(plan).toContain('stroke-dasharray="0.1 3.2"'); // gepunktete Glasfaser
    const legend = await svgOf(page, ids.page + 1); // Legende auf eigener Seite
    expect(legend).toContain('Glasfaser');
    const list = await svgOf(page, ids.page + 2);
    expect(list).toContain('>Kabel-Nr.<');
    expect(list).toContain('>W-12<');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Lageplan im Dokument: Linienart an der Zeichnung, Spalten der Geräteliste, aus Einstellungen ergänzen', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await newDocumentation(page);
    const ids = await page.evaluate(() => {
      const st = window.pdfEditor.studio;
      const s = st.project.sections.find((x) => x.type === 'site');
      st.change('Test', () => {
        s.symbols.push({ id: 'yc', kind: 'camera', x: 0.2, y: 0.2, name: { de: 'Tor', en: '' }, note: { de: '', en: '' }, ip: '10.1.1.9', scale: 1, fov: false, dir: 0, angle: 90, range: 60, height: '4 m' });
        s.shapes.push({ id: 'zz', type: 'fence', pts: [[0.5, 0.1], [0.8, 0.1], [0.8, 0.4]], closed: true, color: '#15803d', name: { de: 'Lager', en: '' }, showLen: true });
      });
      st.select({ kind: 'shape', id: 'zz', section: s.id });
      return { section: s.id, page: st.doc.pages.findIndex((p) => p.section === s.id) };
    });
    // Zone als „Sperrbereich“: ohne Zaunpfosten, in der Legende
    await page.locator('.sd-f', { hasText: 'Flächenart' }).locator('select').selectOption({ label: 'Sperrbereich' });
    let plan = await svgOf(page, ids.page);
    expect(plan).toContain('Sperrbereich');
    expect(plan).not.toContain('r="1.7"'); // keine Zaunpfosten
    // Spalten der Geräteliste: IP und Montagehöhe als eigene Spalten
    await page.evaluate((sec) => window.pdfEditor.studio.select({ kind: 'section', id: sec }), ids.section);
    await page.locator('[data-a="sitecatalog"]').click();
    const dlg = page.locator('.dlg', { has: page.locator('.sd-site-dlg') });
    await dlg.locator('.sd-wcol[data-key="ip"] input[type=checkbox]').check();
    await dlg.locator('.sd-wcol[data-key="height"] input[type=checkbox]').check();
    let list = await svgOf(page, ids.page + 1);
    expect(list).toContain('>IP-Adresse<');
    expect(list).toContain('>10.1.1.9<');
    expect(list).toContain('>4 m<');
    expect(list).not.toContain('IP 10.1.1.9'); // nicht doppelt in der Bemerkung
    // Linienart entfernen: die Zone behält die Farbe, wird wieder zum Zaun
    const i = await dlg.locator('.sd-style .sd-cat input.fld').evaluateAll((els) => els.findIndex((e) => e.value === 'Sperrbereich'));
    await dlg.locator('.sd-style').nth(i).locator('.sd-cat .btn').last().click();
    let shape = await page.evaluate(() => window.pdfEditor.studio.project.sections.find((x) => x.type === 'site').shapes[0]);
    expect(shape.style).toBeUndefined();
    expect(shape.color).toBe('#b91c1c');
    // aus den Einstellungen ergänzen: die entfernte Art kommt zurück
    await dlg.locator('button', { hasText: 'Aus Einstellungen ergänzen' }).click();
    await expect.poll(() => dlg.locator('.sd-style .sd-cat input.fld').evaluateAll((els) => els.map((e) => e.value))).toContain('Sperrbereich');
    await dlg.locator('.btn.primary', { hasText: 'Fertig' }).click();
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Lageplan: Laden prüft Kataloge; ältere Pläne behalten ihre Geräteliste', async () => {
  const m = await import('../src/studio/model.js');
  const p = m.newProject('documentation');
  const site = JSON.parse(JSON.stringify(p.sections.find((s) => s.type === 'site')));
  // älterer Plan: ohne Kataloge
  for (const k of ['kinds', 'styles', 'fields', 'listCols']) delete site[k];
  site.custom = [{ id: 'u1', image: 'fehlt', name: { de: 'Alt', en: '' }, code: 'AL' }];
  let q = m.normalizeProject({ ...JSON.parse(JSON.stringify(p)), sections: [site] }).sections[0];
  expect(q.listCols).toBeNull();
  expect(q.styles).toEqual([]);
  expect(q.custom[0]).toMatchObject({ code: 'AL', image: null, color: '#475569', glyph: '' });
  // fremde Werte
  const bad = {
    ...site,
    kinds: { camera: { code: 'TOOLONGCODE', color: 'red' }, evil: { code: 'X' } },
    styles: [{ id: 't1', name: { de: 'Kabel' }, dash: 'wild', width: 'x', color: '#zzz', area: 'ja' }],
    fields: [{ id: 'f1', label: { de: 'Kabel-Nr.' }, kinds: ['camera', 'evil'] }],
    listCols: [{ key: 'f:f1', show: true }, { key: 'evil' }, { key: 'note' }],
    shapes: [
      { id: 'z1', type: 'line', pts: [[0, 0], [1, 1]], style: 't1' },
      { id: 'z2', type: 'line', pts: [[0, 0], [1, 1]], style: 'unbekannt' },
    ],
    symbols: [{ id: 'y1', kind: 'camera', x: 0.5, y: 0.5, fields: { f1: 'W-1', f9: 'weg' } }],
  };
  q = m.normalizeProject({ ...JSON.parse(JSON.stringify(p)), sections: [bad] }).sections[0];
  expect(q.kinds).toEqual({ camera: { code: 'TOOLON' } });
  expect(q.styles[0]).toMatchObject({ id: 't1', dash: 'solid', width: 'normal', color: '#c2410c', area: false });
  expect(q.fields[0].kinds).toEqual(['camera']);
  expect(q.listCols.map((c) => c.key)).toEqual(['f:f1', 'type', 'name', 'ip', 'height', 'note']);
  expect(q.shapes.map((z) => z.style)).toEqual(['t1', undefined]);
  expect(q.symbols[0].fields).toEqual({ f1: 'W-1' });
  // Ergänzen: zählt nur Fehlendes
  const fresh = m.newSite(m.defaultSitePresets());
  const images = {};
  const pre = m.cleanSitePresets({ custom: [{ id: 'uw', name: { de: 'WB' }, code: 'WB', glyph: 'camera' }], fields: [{ id: 'fk', label: { de: 'Kabel-Nr.' } }] });
  expect(m.mergeSitePresets(fresh, pre, images)).toBe(2);
  expect(m.mergeSitePresets(fresh, pre, images)).toBe(0);
  expect(fresh.listCols.some((c) => c.key === 'f:fk')).toBe(true);
});

test('Vorschau in den Vorgaben: Beispielseiten je Reiter, sofort aktualisiert, Nummer zählt nicht', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    const dlg = await openPresets(page, 'cover');
    const sheets = dlg.locator('.pre-page .pre-sheet');
    const captions = () => dlg.locator('.pre-page figcaption').allTextContents();
    const first = () => sheets.first().innerHTML();
    await expect(sheets).toHaveCount(1);
    await expect.poll(captions).toEqual(['Deckblatt']);
    expect(await first()).toContain('Muster GmbH'); // Beispieldaten
    // Feld umbenennen und Nummernschema: sofort in der Vorschau
    await dlg.locator('.sd-cfield[data-key="customer"] .fld').fill('Auftraggeber');
    await dlg.locator('[data-f="docno"]').fill('PL-{JJJJ}-{NR}');
    await expect.poll(first).toContain('>Auftraggeber<');
    await expect.poll(first).toContain('PL-2026-001');
    // Hausfarbe und Fußzeilentext
    await dlg.locator('.pre-tab', { hasText: 'Kopf' }).click();
    await expect.poll(captions).toEqual(['Inhaltsseite mit Kopf- und Fußzeile']);
    await dlg.locator('.sd-house button[title="Rot"]').click();
    await dlg.locator('.sd-f', { hasText: 'Eigener Text' }).locator('input').first().fill('Vertraulich');
    await expect.poll(first).toContain('#9b1c1c');
    await expect.poll(first).toContain('>Vertraulich<');
    // Lageplan: Plan, Legende bzw. Geräteliste; eigenes Feld als Spalte
    await dlg.locator('.pre-tab', { hasText: 'Lageplan' }).click();
    await expect.poll(captions).toEqual(['Lageplan', 'Geräteliste']);
    await dlg.locator('.sd-add', { hasText: 'Eigenes Feld' }).click();
    await dlg.locator('.sd-dfield .sd-cat input.fld').first().fill('Kabel-Nr.');
    const key = await dlg.locator('.sd-wcol[data-key^="f:"]').getAttribute('data-key');
    await dlg.locator(`.sd-wcol[data-key="${key}"] input[type=checkbox]`).check();
    await expect.poll(() => sheets.nth(1).innerHTML()).toContain('>Kabel-Nr.<');
    await expect.poll(() => sheets.nth(1).innerHTML()).toContain('>W-01<');
    // Anschlussplan und Zugangsdaten
    await dlg.locator('.pre-tab', { hasText: 'Anschlussplan' }).click();
    await expect.poll(captions).toEqual(['Anschlussplan', 'Klemmenplan']);
    await dlg.locator('.pre-tab', { hasText: 'Zugangsdaten' }).click();
    await expect.poll(captions).toEqual(['Zugangsdaten']);
    await expect.poll(first).not.toContain('Muster#26'); // Passwörter verborgen
    await dlg.locator('.sd-check', { hasText: 'Passwörter und Schlüssel' }).locator('input').check();
    await expect.poll(first).toContain('Muster#26');
    await closePresets(page, dlg);
    // die Vorschau zählt die Dokumentnummer nicht weiter
    await newDocumentation(page);
    expect(await page.evaluate(() => window.pdfEditor.studio.project.meta.docNo)).toBe('PL-2026-001');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});
