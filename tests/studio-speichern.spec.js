/**
 * Dokumentation speichern wie in Office: Speichern schreibt in die zugehörige PDF (nur beim ersten
 * Mal ein Speicherort), „Weiterbearbeiten“ aus einer PDF behält deren Namen und Datei, Schließen
 * mit ungespeicherten Änderungen fragt, nach dem Speichern kurz ein Haken, und die automatische
 * Sicherung bleibt unsichtbar – sie wird erst nach einem unerwarteten Ende beim Öffnen angeboten.
 */
import { test, expect } from '@playwright/test';
import { launch } from './helpers.js';

/** PDF-Erzeugung der Desktop-App nachbilden und einen Speichern-Dialog mit Datei-Handle (im Speicher). */
async function desktopLike(page, context) {
  await page.exposeFunction('__pdfixMakePdf', async (html) => {
    const printer = await context.newPage();
    try {
      await printer.setContent(html);
      return Buffer.from(await printer.pdf({ preferCSSPageSize: true, printBackground: true })).toString('base64');
    } finally {
      await printer.close();
    }
  });
  await page.evaluate(() => {
    window.__files = {};
    window.__picks = 0;
    // Methoden am Prototyp: das Handle lässt sich (wie in der Desktop-App) in IndexedDB ablegen
    class MemHandle {
      constructor(name) {
        this.kind = 'file';
        this.name = name;
      }
      async queryPermission() {
        return 'granted';
      }
      async getFile() {
        return new File([window.__files[this.name] || new Uint8Array()], this.name, { type: 'application/pdf' });
      }
      async createWritable() {
        const name = this.name;
        const parts = [];
        return {
          async write(data) {
            parts.push(data instanceof Uint8Array ? data : new Uint8Array(data));
          },
          async close() {
            window.__files[name] = new Uint8Array(await new Blob(parts).arrayBuffer());
          },
        };
      }
    }
    window.MemHandle = MemHandle;
    window.showSaveFilePicker = async (opts) => {
      window.__picks++;
      return new MemHandle(window.__nextName || opts.suggestedName);
    };
  });
}

const st = (page, fn, arg) => page.evaluate(fn, arg);

/** Rohzugriff auf die automatischen Sicherungen (Store „auto“). */
const autoRecords = (page) =>
  page.evaluate(
    () =>
      new Promise((resolve, reject) => {
        const open = indexedDB.open('pdfix-studio');
        open.onerror = () => reject(open.error);
        open.onsuccess = () => {
          const get = open.result.transaction('auto').objectStore('auto').getAll();
          get.onsuccess = () => {
            resolve(get.result.map((r) => ({ id: r.id, owner: r.owner, saved: r.saved, title: r.project.title.de })));
            open.result.close();
          };
        };
      }),
  );

async function newTech(page, title = 'Pumpenstation') {
  await page.locator('#wsDocs').click();
  await page.locator('.tpl[data-tpl="tech"]').click();
  await expect(page.locator('#prjTab')).toHaveClass(/on/);
  await st(page, (title) => window.pdfEditor.studio.change('Titel', (p) => (p.title = { de: title, en: '' })), title);
}

test('Schließen: Rückfrage bei Änderungen, „Nicht speichern“ hinterlässt nichts; ohne Änderungen keine Frage', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await newTech(page);
    await expect(page.locator('#prjDirty')).toBeVisible();
    // die automatische Sicherung läuft still im Hintergrund – nicht in „Zuletzt bearbeitet“
    await expect.poll(async () => (await autoRecords(page)).length).toBe(1);
    await page.locator('#bPrjClose').click();
    const dlg = page.locator('.dlg');
    await expect(dlg).toContainText('Dokumentation schließen');
    await expect(dlg).toContainText('Möchten Sie die Änderungen an Pumpenstation speichern');
    await expect(dlg.locator('.btn')).toHaveText(['Abbrechen', 'Nicht speichern', 'Speichern']);
    await dlg.locator('.btn', { hasText: 'Abbrechen' }).click();
    await expect(page.locator('#prjTab')).toHaveClass(/on/);

    await page.locator('#bPrjClose').click();
    await page.locator('.dlg .btn', { hasText: 'Nicht speichern' }).click();
    await expect(page.locator('#prjTab')).toBeHidden();
    await expect(page.locator('#recentList .rl-empty')).toBeVisible();
    expect(await autoRecords(page)).toEqual([]);

    // unverändert: schließt ohne Rückfrage
    await page.locator('.tpl[data-tpl="tech"]').click();
    await expect(page.locator('#prjDirty')).toBeHidden();
    await page.locator('#bPrjClose').click();
    await expect(page.locator('#prjTab')).toBeHidden();
    await expect(page.locator('.dlg')).toHaveCount(0);
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Speichern: einmal Speicherort wählen, danach direkt in dieselbe PDF; kurz der Haken „Gespeichert“', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await desktopLike(page, context);
    await newTech(page);
    await page.evaluate(() => (window.__nextName = 'Station Nord.pdf'));
    await page.keyboard.press('Control+s');
    await expect.poll(() => st(page, () => Object.keys(window.__files))).toEqual(['Station Nord.pdf']);
    expect(await st(page, () => window.__picks)).toBe(1);
    // Reiter heißt wie die Datei, gespeichert
    await expect(page.locator('#prjName')).toHaveText('Station Nord');
    await expect(page.locator('.savefx')).toBeVisible(); // kurzer Haken „Gespeichert“ unter Speichern
    await expect(page.locator('#prjDirty')).toBeHidden();

    // weitere Änderung: Strg+S schreibt ohne Dialog in dieselbe Datei
    const size = await st(page, () => window.__files['Station Nord.pdf'].length);
    await st(page, () => window.pdfEditor.studio.change('Titel', (p) => (p.title = { de: 'Pumpenstation Nord', en: '' })));
    await expect(page.locator('#prjDirty')).toBeVisible();
    await page.keyboard.press('Control+s');
    await expect(page.locator('#prjDirty')).toBeHidden();
    expect(await st(page, () => window.__picks)).toBe(1);
    expect(await st(page, () => window.__files['Station Nord.pdf'].length)).not.toBe(size);

    // Schließen mit Änderungen → Speichern: schließt, kurz der Haken
    await st(page, () => window.pdfEditor.studio.change('Titel', (p) => (p.title = { de: 'Pumpenstation Nord 2', en: '' })));
    await page.locator('#bPrjClose').click();
    await expect(page.locator('.dlg .hint')).toContainText('Station Nord.pdf');
    await page.locator('.dlg .btn.primary', { hasText: 'Speichern' }).click();
    const check = page.locator('.savefx');
    await expect(check).toHaveText('Gespeichert');
    await expect(check).toHaveAttribute('title', 'Station Nord.pdf');
    // klein, ohne den Bildschirm abzudecken, nach gut einer Sekunde wieder weg
    expect(await check.evaluate((el) => getComputedStyle(el).pointerEvents)).toBe('none');
    await expect(check).toHaveCount(0, { timeout: 3000 });
    await expect(page.locator('#prjTab')).toBeHidden();
    expect(await st(page, () => window.__picks)).toBe(1);
    // unter „Zuletzt bearbeitet“ mit dem Namen der Datei
    await expect(page.locator('#recentList .ri', { hasText: 'Station Nord' })).toBeVisible();
    expect(await autoRecords(page)).toEqual([]);
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Weiterbearbeiten aus einer PDF: Name der PDF bleibt, Speichern schreibt ohne Nachfrage hinein', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await desktopLike(page, context);
    await newTech(page, 'Anlage Müller');
    // als PDF erstellen (wie früher), dann schließen
    await page.evaluate(() => (window.__nextName = 'Müller 2026.pdf'));
    await page.keyboard.press('Control+s');
    await expect(page.locator('#prjDirty')).toBeHidden();
    await page.locator('#bPrjClose').click();
    await expect(page.locator('#prjTab')).toBeHidden();

    // die Datei im Bereich „PDF“ öffnen (mit Handle) und „Weiterbearbeiten“
    await page.evaluate(async () => {
      const handle = new window.MemHandle('Müller 2026.pdf');
      await window.pdfEditor.openBytes(window.__files['Müller 2026.pdf'], handle.name, handle);
    });
    await expect(page.locator('#sdOffer')).toContainText('wieder in diese Datei speichern');
    await page.locator('#sdOffer .btn.primary').click();
    // gleich alt wie der gespeicherte Stand: keine Rückfrage
    await expect(page.locator('.dlg')).toHaveCount(0);
    await expect(page.locator('#prjTab')).toHaveClass(/on/);
    await expect(page.locator('#prjName')).toHaveText('Müller 2026');
    await expect(page.locator('#prjDirty')).toBeHidden();

    const before = await st(page, () => window.__files['Müller 2026.pdf'].length);
    await st(page, () => window.pdfEditor.studio.change('Titel', (p) => (p.title = { de: 'Anlage Müller – Erweiterung', en: '' })));
    await page.locator('#bSave').click();
    await expect(page.locator('#prjDirty')).toBeHidden();
    expect(await st(page, () => window.__picks)).toBe(1); // nur das erste Speichern fragte
    expect(await st(page, () => window.__files['Müller 2026.pdf'].length)).not.toBe(before);
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});

test('Automatische Sicherung: nach unerwartetem Ende beim Öffnen „Wiederherstellen“ bzw. „Verwerfen“; nie gespeicherte beim Start', async ({ browser }) => {
  const { page, context, errors } = await launch(browser, 'neubau');
  try {
    await newTech(page, 'Halle 3');
    await page.keyboard.press('Control+s'); // Browser: gespeicherter Stand in der App
    await expect(page.locator('#prjDirty')).toBeHidden();
    const id = await st(page, () => window.pdfEditor.studio.project.id);

    // Änderung, automatisch gesichert – dann „Absturz“: Sicherung gehört einem beendeten Fenster
    const crash = async (title) => {
      await st(page, (title) => window.pdfEditor.studio.change('Titel', (p) => (p.title = { de: title, en: '' })), title);
      await st(page, () => window.pdfEditor.studio.flush());
      await page.evaluate(
        () =>
          new Promise((resolve) => {
            const open = indexedDB.open('pdfix-studio');
            open.onsuccess = () => {
              const store = open.result.transaction('auto', 'readwrite').objectStore('auto');
              store.getAll().onsuccess = (e) => {
                for (const r of e.target.result) store.put({ ...r, owner: 'wbeendet' });
                store.transaction.oncomplete = () => (open.result.close(), resolve());
              };
            };
          }),
      );
      // Fenster weg, ohne Rückfrage und ohne Aufräumen
      await st(page, () => {
        const s = window.pdfEditor.studio;
        s.savedSnap = s.snap;
        s.hasAuto = false;
        return s.close();
      });
    };
    await crash('Halle 3 – geändert');
    await expect(page.locator('#recentList .ri', { hasText: 'Halle 3' })).toContainText('ungespeicherte Änderungen gesichert');

    // Öffnen: Rückfrage, Wiederherstellen → geänderter Stand, ungespeichert
    await page.locator('#recentList .ri', { hasText: 'Halle 3' }).click();
    const dlg = page.locator('.dlg');
    await expect(dlg).toContainText('Ungespeicherte Änderungen gefunden');
    await dlg.locator('.btn', { hasText: 'Wiederherstellen' }).click();
    expect(await st(page, () => window.pdfEditor.studio.project.title.de)).toBe('Halle 3 – geändert');
    await expect(page.locator('#prjDirty')).toBeVisible();
    // die Sicherung gehört jetzt diesem Fenster
    await expect.poll(async () => (await autoRecords(page)).map((r) => r.owner !== 'wbeendet')).toEqual([true]);

    // noch einmal – diesmal verwerfen: der gespeicherte Stand öffnet, die Sicherung ist weg
    await crash('Halle 3 – ausprobiert');
    await page.locator('#recentList .ri', { hasText: 'Halle 3' }).click();
    await dlg.locator('.btn', { hasText: 'Verwerfen' }).click();
    expect(await st(page, () => window.pdfEditor.studio.project.title.de)).toBe('Halle 3');
    await expect(page.locator('#prjDirty')).toBeHidden();
    expect(await autoRecords(page)).toEqual([]);
    expect(await st(page, () => window.pdfEditor.studio.project.id)).toBe(id);
    await page.locator('#bPrjClose').click();

    // nie gespeicherte Dokumentation: nur als Sicherung vorhanden – beim Start angeboten
    await newTech(page, 'Probe');
    await crash('Probe 2');
    await expect(page.locator('#recentList .ri', { hasText: 'Probe' })).toHaveCount(0);
    await st(page, () => {
      window.__offer = window.pdfEditor.offerRecovery();
    });
    await expect(dlg).toContainText('Dokumentation wiederherstellen');
    await expect(dlg).toContainText('Probe 2');
    await dlg.locator('.btn', { hasText: 'Wiederherstellen' }).click();
    await expect(page.locator('#prjTab')).toHaveClass(/on/);
    expect(await st(page, () => window.pdfEditor.studio.project.title.de)).toBe('Probe 2');
    await expect(page.locator('#prjDirty')).toBeVisible();
    expect(errors).toEqual([]);
  } finally {
    await context.close();
  }
});
