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
  await page.locator(tab === 'look' ? '#setLook' : tab === 'wiring' ? '#setWiring' : '#setCover').click();
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
