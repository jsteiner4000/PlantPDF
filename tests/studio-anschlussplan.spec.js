/**
 * Anschlussplan-Update: Leitungsarten mit Linienstil, Stärke, Kurzzeichen, Ader und Querschnitt;
 * mehrere frei beschriftete Kennzeichen je Baugruppe und Anschluss (in der Legende erklärt);
 * BMK und Hersteller/Typ; einstellbare Klemmenplan-Spalten; Legende/Klemmenplan/Hinweise
 * ausblendbar; Vorgaben in den Einstellungen (nur für neue Pläne, Export/Import); ältere Pläne
 * mit dem einen Kennzeichen „12 V“ werden übernommen.
 */
import { test, expect } from '@playwright/test';
import { PDFDocument, PDFName } from 'pdf-lib';
import { readFileSync } from 'node:fs';
import { launch } from './helpers.js';

const svgOf = async (page, i = 0) => {
  // die Seiten entstehen im nächsten Bild nach einer Änderung
  await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
  return page.evaluate((i) => window.pdfEditor.studio.doc.pages[i].svg || '', i);
};
const section = (page) => page.evaluate(() => JSON.parse(JSON.stringify(window.pdfEditor.studio.project.sections.find((s) => s.type === 'wiring'))));

/** Neuer Anschlussplan mit einer Baugruppe und zwei Anschlüssen (über das Modell, schnell). */
async function newPlan(page) {
  await page.locator('#wsDocs').click();
  await page.locator('.tpl[data-tpl="wiring"]').click();
  await expect(page.locator('#prjTab')).toHaveClass(/on/);
  await page.evaluate(() => {
    const st = window.pdfEditor.studio;
    const s = st.project.sections.find((x) => x.type === 'wiring');
    st.change('Beispiel', () => {
      s.boxes.push({ id: 'b1', title: { de: 'Torantrieb', en: '' }, lines: { de: 'Steuerplatine', en: '' }, cat: 'pwr', side: 'left', marks: [], bmk: '', make: { de: '', en: '' }, bus: false, parent: null, fill: false, fillColor: null, y: null, h: null, pinY: null, pinGap: null });
      s.hub.pins.push({ id: 'p1', name: 'X1.1', label: '', func: { de: 'Versorgung', en: '' }, box: 'b1', terminal: { de: 'Klemme 1', en: '' }, note: { de: '', en: '' }, wire: '', cross: '', marks: [] });
      s.hub.pins.push({ id: 'p2', name: 'X1.2', label: '', func: { de: 'Masse', en: '' }, box: 'b1', terminal: { de: 'Klemme 2', en: '' }, note: { de: '', en: '' }, wire: '', cross: '', marks: [] });
    });
  });
}

test('Kennzeichen: mehrere je Baugruppe, frei beschriftet (360 V), am Anschluss; Legende mit Erklärung', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await newPlan(page);
    // Vorgaben: 12 V DC, 24 V DC, 230 V AC, USV
    expect((await section(page)).marks.map((k) => k.label)).toEqual(['12 V DC', '24 V DC', '230 V AC', 'USV']);
    await page.evaluate(() => window.pdfEditor.studio.select({ kind: 'box', id: 'b1', section: window.pdfEditor.studio.project.sections.find((s) => s.type === 'wiring').id }));
    const chips = page.locator('.sd-grp', { has: page.locator('h4', { hasText: /^Kennzeichen$/ }) }).locator('.sd-chips');
    await chips.locator('button', { hasText: '12 V DC' }).click();
    await chips.locator('button', { hasText: 'USV' }).click();
    // frei beschriftet: „Neu“ → Text → Enter
    await chips.locator('button', { hasText: 'Neu' }).click();
    await page.locator('.sd-newmark .fld').fill('360 V DC');
    await page.keyboard.press('Enter');
    let s = await section(page);
    const box = s.boxes[0];
    expect(box.marks.map((id) => s.marks.find((k) => k.id === id).label)).toEqual(['12 V DC', 'USV', '360 V DC']);
    let svg = await svgOf(page);
    for (const label of ['12 V DC', 'USV', '360 V DC']) expect(svg).toContain(`>${label}<`);
    expect(svg).toContain('Versorgung 12 V DC'); // Erklärung in der Legende
    expect(svg).not.toContain('>24 V DC<'); // unbenutzte Kennzeichen nicht in der Legende

    // Kennzeichen an einem Anschluss (an seiner Leitung) und Aderfarbe
    await page.evaluate(() => window.pdfEditor.studio.select({ kind: 'pin', id: 'p2', section: window.pdfEditor.studio.project.sections.find((s) => s.type === 'wiring').id }));
    await page.locator('.sd-f', { hasText: 'Kennzeichen an der Leitung' }).locator('button', { hasText: '24 V DC' }).click();
    await page.locator('.sd-f', { hasText: 'Aderfarbe' }).locator('input').fill('BU');
    s = await section(page);
    expect(s.hub.pins[1].marks).toHaveLength(1);
    expect(s.hub.pins[1].wire).toBe('BU');
    svg = await svgOf(page);
    expect(svg).toContain('>24 V DC<');
    expect(svg).toContain('Versorgung 24 V DC');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Leitungsart: Linienstil, Stärke, Kurzzeichen, Ader, Querschnitt; BMK und Hersteller/Typ; Klemmenplan-Spalten', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await newPlan(page);
    const id = await page.evaluate(() => window.pdfEditor.studio.project.sections.find((s) => s.type === 'wiring').id);
    await page.evaluate((id) => window.pdfEditor.studio.select({ kind: 'section', id }), id);
    // Leitungsart „Versorgung“ aufklappen und einstellen
    const card = page.locator('.sd-wcat[data-id="pwr"]');
    await card.locator('button[title^="Linienstil"]').click();
    await card.locator('.sd-seg button', { hasText: 'Gestrichelt' }).click();
    await card.locator('.sd-seg button', { hasText: 'Dick' }).click();
    await card.locator('.sd-f', { hasText: 'Kurzzeichen' }).locator('input').fill('V+');
    await card.locator('.sd-f', { hasText: 'Aderfarbe' }).locator('input').fill('RD/BK');
    await card.locator('.sd-f', { hasText: 'Querschnitt' }).locator('input').fill('0,75 mm²');
    const s = await section(page);
    expect(s.categories.find((c) => c.id === 'pwr')).toMatchObject({ style: 'dashed', width: 'thick', code: 'V+', wire: 'RD/BK', cross: '0,75 mm²' });
    let svg = await svgOf(page);
    expect(svg).toContain('stroke-dasharray'); // gestrichelte Leitung
    expect(svg).toContain('>V+<'); // Kurzzeichen an der Leitung
    expect(svg).toContain('Versorgung (V+ · RD/BK · 0,75 mm²)'); // Legende

    // BMK und Hersteller/Typ an der Baugruppe
    await page.evaluate((id) => window.pdfEditor.studio.select({ kind: 'box', id: 'b1', section: id }), id);
    await page.locator('.sd-f', { hasText: 'BMK' }).locator('input').fill('-M1');
    await page.locator('.sd-f', { hasText: 'Hersteller / Typ' }).locator('input').first().fill('Came ZBX');
    svg = await svgOf(page);
    expect(svg).toContain('>-M1<');
    expect(svg).toContain('>Came ZBX<');

    // Klemmenplan: Spalten Baugruppe, Ader, Querschnitt (aus der Leitungsart); eine ausblenden, eine umbenennen
    const terms = async () => {
      await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
      return page.evaluate(() => window.pdfEditor.studio.doc.pages.filter((p) => p.kind === 'terminals').map((p) => p.svg).join(''));
    };
    let t = await terms();
    for (const head of ['>Baugruppe<', '>Ader<', '>Querschnitt<', '>-M1 Torantrieb<', '>RD/BK<', '>0,75 mm²<']) expect(t).toContain(head);
    expect(t).not.toContain('>Kennzeichen<'); // leer → entfällt
    await page.evaluate((id) => window.pdfEditor.studio.select({ kind: 'section', id }), id);
    await page.locator('.sd-wcol[data-key="cross"] input[type="checkbox"]').uncheck();
    await page.locator('.sd-wcol[data-key="wire"] input.fld').fill('Aderfarbe');
    t = await terms();
    expect(t).not.toContain('>Querschnitt<');
    expect(t).toContain('>Aderfarbe<');

    // Legende, Klemmenplan ausblenden
    await page.locator('.sd-check', { hasText: 'Legende unter dem Schaltbild' }).locator('input').uncheck();
    expect(await svgOf(page)).not.toContain('>Legende<');
    await page.locator('.sd-check', { hasText: 'Klemmenplan' }).locator('input').uncheck();
    expect(await terms()).not.toContain('X1.1');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Einstellungen › Vorgaben: eigene Leitungsart und Kennzeichen nur für neue Pläne; Export und Import', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await newPlan(page); // vorher angelegt: bleibt, wie er ist
    await page.evaluate(() => void window.pdfEditor.settings()); // nicht auf das Schließen warten
    await page.locator('#setWiring').click();
    const dlg = page.locator('.dlg', { has: page.locator('.pre-dlg') });
    await expect(dlg).toBeVisible();
    // eigene Leitungsart
    await dlg.locator('.sd-add', { hasText: 'Leitungsart' }).click();
    const card = dlg.locator('.sd-wcat:not(.sd-wmark)').last();
    await card.locator('.sd-cat input.fld').fill('Brandmelder-Ring');
    await card.locator('.sd-seg button', { hasText: 'Gepunktet' }).click();
    await card.locator('.sd-f', { hasText: 'Aderfarbe' }).locator('input').fill('RD');
    // eigenes Kennzeichen
    await dlg.locator('.sd-add', { hasText: 'Kennzeichen' }).click();
    await dlg.locator('.sd-wmark').last().locator('.sd-cat input.fld').fill('360 V DC');
    // Export
    const download = page.waitForEvent('download');
    await dlg.locator('button', { hasText: 'Exportieren' }).click();
    const file = await (await download).path();
    const exported = JSON.parse(readFileSync(file, 'utf8'));
    expect(exported.kind).toBe('plantpdf-vorgaben');
    expect(exported.wiring.categories.some((c) => c.name.de === 'Brandmelder-Ring' && c.style === 'dotted' && c.wire === 'RD')).toBe(true);
    await dlg.locator('.btn.primary', { hasText: 'Fertig' }).click();
    await page.locator('.dlg .btn.primary', { hasText: 'Fertig' }).click();

    // der bestehende Plan ist unverändert …
    let s = await section(page);
    expect(s.categories.some((c) => tx(c) === 'Brandmelder-Ring')).toBe(false);
    // … „Aus Einstellungen ergänzen“ holt die neuen Einträge
    await page.evaluate(() => window.pdfEditor.studio.select({ kind: 'section', id: window.pdfEditor.studio.project.sections.find((x) => x.type === 'wiring').id }));
    await page.locator('button', { hasText: 'Aus Einstellungen ergänzen' }).click();
    s = await section(page);
    expect(s.categories.some((c) => tx(c) === 'Brandmelder-Ring')).toBe(true);
    expect(s.marks.some((k) => k.label === '360 V DC')).toBe(true);

    // ein neuer Plan bringt sie mit
    const fresh = await page.evaluate(() => {
      const st = window.pdfEditor.studio;
      st.addSection('wiring');
      const w = st.project.sections.filter((x) => x.type === 'wiring').pop();
      return { cats: w.categories.map((c) => c.name.de), marks: w.marks.map((k) => k.label) };
    });
    expect(fresh.cats).toContain('Brandmelder-Ring');
    expect(fresh.marks).toContain('360 V DC');

    // Zurücksetzen, dann die exportierte Datei importieren
    await page.evaluate(() => void window.pdfEditor.settings()); // nicht auf das Schließen warten
    await page.locator('#setWiring').click();
    await dlg.locator('button', { hasText: 'Auf Standard zurücksetzen' }).click();
    await page.locator('.dlg .btn.primary', { hasText: 'Zurücksetzen' }).click();
    const names = () => dlg.locator('.sd-wcat:not(.sd-wmark) .sd-cat input.fld').evaluateAll((els) => els.map((e) => e.value));
    await expect.poll(names).not.toContain('Brandmelder-Ring');
    const chooser = page.waitForEvent('filechooser');
    await dlg.locator('button', { hasText: 'Importieren' }).click();
    await (await chooser).setFiles(file);
    await expect.poll(names).toContain('Brandmelder-Ring');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

/** Name einer Leitungsart (deutsch). */
function tx(c) {
  return c.name && typeof c.name === 'object' ? c.name.de : c.name;
}

test('Ältere Pläne: das eine Kennzeichen „12 V“ wird zur Liste, der Klemmenplan behält seine Spalten', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    const doc = await PDFDocument.create();
    doc.addPage([595, 842]);
    const project = {
      id: 'prjalt1',
      lang: 'de',
      font: 'helvetica',
      title: { de: 'Alt', en: '' },
      company: { name: 'Firma' },
      images: {},
      meta: {},
      sections: [
        {
          id: 'salt1',
          type: 'wiring',
          categories: [{ id: 'pwr', name: { de: 'Versorgung', en: '' }, color: '#b45309' }],
          badge: { label: '12 V', color: '#b45309', text: { de: 'Direkt aus dem Netzteil.', en: '' } },
          hub: { name: { de: 'Zentrale', en: '' }, pins: [{ id: 'p1', name: 'E1', func: { de: 'Melder', en: '' }, box: 'b1', terminal: { de: '', en: '' } }] },
          boxes: [{ id: 'b1', title: { de: 'Melder', en: '' }, cat: 'pwr', side: 'left', badge: true }],
          hints: [],
        },
      ],
    };
    const stream = doc.context.flateStream(new TextEncoder().encode(JSON.stringify(project)), { Type: 'PDFixProject' });
    doc.catalog.set(PDFName.of('PDFixProject'), doc.context.register(stream));
    const bytes = await doc.save();
    await page.evaluate(async (b64) => {
      const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
      await window.pdfEditor.openBytes(bytes, 'alt.pdf', null);
    }, Buffer.from(bytes).toString('base64'));
    await page.locator('#sdOffer .btn.primary').click();
    await page.locator('.dlg .btn.primary').first().click(); // „nachträglich geändert“ bestätigen
    await expect(page.locator('#studio')).toBeVisible();
    const s = await section(page);
    expect(s.marks).toHaveLength(1);
    expect(s.marks[0]).toMatchObject({ label: '12 V', color: '#b45309' });
    expect(s.boxes[0].marks).toEqual([s.marks[0].id]);
    expect(s.columns).toBe(null);
    expect(s.categories[0]).toMatchObject({ style: 'solid', width: 'normal' });
    const svg = await svgOf(page);
    expect(svg).toContain('>12 V<');
    expect(svg).toContain('Direkt aus dem Netzteil.');
    const terms = await page.evaluate(() => window.pdfEditor.studio.doc.pages.filter((p) => p.kind === 'terminals').map((p) => p.svg).join(''));
    expect(terms).toContain('>Angeschlossen an<');
    expect(terms).not.toContain('>Baugruppe<');
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});
