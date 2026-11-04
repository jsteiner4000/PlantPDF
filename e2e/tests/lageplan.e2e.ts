import { test } from '@e2e-dev/web';
import { expect } from 'e2e';

// Lageplan: Messen – nach dem Loslassen bleibt die Strecke stehen und lässt sich als Maßlinie behalten
test('Lageplan: gemessene Strecke als Maßlinie behalten', async ({ app, agent, browser }) => {
  await app.open();
  // Anlagendokumentation nur mit Lageplan vorauswählen (Auswahl wird sonst gemerkt)
  await browser.evaluate(() => localStorage.setItem('pdfix.docParts', JSON.stringify(['site'])));
  await agent.act('Wechsle in den Bereich „Dokumentation“ und lege eine neue Anlagendokumentation an (die vorausgewählten Teile übernehmen)');
  await expect(browser.locator('#prjTab')).toBeVisible();
  // Maßstab setzen (50 % der Planbreite = 100 m), damit „Messen“ angeboten wird
  await browser.evaluate(() => {
    const st = (window as any).pdfEditor.studio;
    const s = st.project.sections.find((x: any) => x.type === 'site');
    st.change('Maßstab', () => (s.scale = { a: [0.25, 0.5], b: [0.75, 0.5], m: 100 }));
    st.select({ kind: 'section', id: s.id });
  });
  await expect(browser.locator('.rb[data-act="measure"]')).toBeVisible();
  await agent.act('Klicke im Werkzeugband auf „Messen“ und ziehe dann im Lageplan mit gedrückter Maustaste eine waagerechte Strecke von etwa einem Viertel der Planbreite');
  await expect(browser.locator('#sdArm')).toContainText('Länge:');
  await agent.act('Bewege die Maus woanders hin und klicke dann auf „Als Maßlinie behalten“');
  const shapes = await browser.evaluate(() => {
    const st = (window as any).pdfEditor.studio;
    return st.project.sections.find((x: any) => x.type === 'site').shapes.map((z: any) => z.type);
  });
  expect(shapes).toEqual(['dim']);
  await agent.assert('Im Lageplan ist eine Maßlinie mit einer Längenangabe in Metern zu sehen');
});
