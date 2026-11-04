import { test } from '@e2e-dev/web';
import { expect } from 'e2e';
import { readFileSync } from 'node:fs';

// Beispiel-PDF der Playwright-Tests (tests/fixtures/dokument.pdf)
const DOKUMENT_PDF_B64 = readFileSync(new URL('../../tests/fixtures/dokument.pdf', import.meta.url)).toString('base64');

// PDF: bearbeiten, Rückfrage beim Schließen im Stil der App
test('PDF: nach einer Änderung fragt Schließen im Stil der App', async ({ app, agent, screen, browser }) => {
  await app.open();
  await browser.evaluate(async (b64) => {
    const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
    await (window as any).pdfEditor.openBytes(bytes, 'dokument.pdf', null);
  }, DOKUMENT_PDF_B64);
  await expect(browser.locator('#docTab')).toBeVisible();
  await agent.act('Füge auf der ersten Seite ein neues Textfeld mit dem Text „Prüfvermerk“ ein');
  await expect(browser.locator('#dirtyDot')).toBeVisible();
  await browser.locator('#bClose').tap();
  await agent.assert('Ein Dialog „Dokument schließen“ fragt, ob die Änderungen an dokument.pdf gespeichert werden sollen');
  await screen.getByRole('button', 'Nicht speichern').tap();
  await expect(browser.locator('#docTab')).toBeHidden();
});
