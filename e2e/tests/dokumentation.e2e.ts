import { describe, test } from '@e2e-dev/web';
import { expect } from 'e2e';

// Dokumentation: anlegen, ändern, Rückfrage beim Schließen, Speichern mit kleinem Haken, Bereichswechsel
describe('Dokumentation', () => {
  test('Schließen fragt bei Änderungen; Abbrechen hält offen, Nicht speichern verwirft', async ({ app, agent, screen, browser }) => {
    await app.open();
    await agent.act('Wechsle oben in den Bereich „Dokumentation“ und lege eine neue Bedienungsanleitung an');
    await expect(browser.locator('#prjTab')).toBeVisible();
    await agent.act('Ändere in den Eigenschaften rechts den Titel bzw. Produktnamen der Anleitung auf „Testanleitung Tor“');
    await expect(browser.locator('#prjDirty')).toBeVisible();
    await browser.locator('#bPrjClose').tap();
    await expect(browser.locator('.dlg')).toContainText('Möchten Sie die Änderungen');
    await agent.assert('Ein Dialog „Dokumentation schließen“ fragt, ob die Änderungen gespeichert werden sollen, mit den Knöpfen Abbrechen, Nicht speichern und Speichern');
    await screen.getByRole('button', 'Abbrechen').tap();
    await expect(browser.locator('#prjTab')).toBeVisible();
    await browser.locator('#bPrjClose').tap();
    await screen.getByRole('button', 'Nicht speichern').tap();
    await expect(browser.locator('#prjTab')).toBeHidden();
    await agent.assert('Die Startseite des Bereichs Dokumentation zeigt unter „Zuletzt bearbeitet“ keine Dokumentation an');
  });

  test('Speichern zeigt kurz einen Haken und legt die Dokumentation unter „Zuletzt bearbeitet“ ab', async ({ app, agent, browser }) => {
    await app.open();
    await agent.act('Wechsle in den Bereich „Dokumentation“ und lege eine neue „Technische Beschreibung“ an');
    await expect(browser.locator('#prjTab')).toBeVisible();
    await agent.act('Ändere den Titel des Dokuments in den Projekteigenschaften auf „Pumpenstation Süd“');
    await expect(browser.locator('#prjDirty')).toBeVisible();
    await browser.keyboard.press('Control+s');
    await expect(browser.locator('.savefx')).toBeVisible();
    await expect(browser.locator('#prjDirty')).toBeHidden();
    await browser.locator('#bPrjClose').tap();
    await expect(browser.locator('#prjTab')).toBeHidden();
    await agent.assert('Unter „Zuletzt bearbeitet“ steht ein Eintrag „Pumpenstation Süd“');
  });

  test('Bereichswechsel: zurück zur Dokumentation ist sie unverändert offen', async ({ app, agent, browser }) => {
    await app.open();
    await agent.act('Wechsle in den Bereich „Dokumentation“ und lege einen neuen „Anschlussplan“ an');
    await expect(browser.locator('#prjTab')).toBeVisible();
    await agent.act('Wechsle oben mit dem Umschalter in den Bereich „PDF“ und danach wieder zurück in den Bereich „Dokumentation“');
    await expect(browser.locator('#prjTab')).toBeVisible();
    await agent.assert('Der Anschlussplan ist weiterhin geöffnet: In der Mitte sind seine Seiten zu sehen und der Umschalter oben steht auf „Dokumentation“');
  });
});
