/**
 * e2e-Tests (https://github.com/tester-army/e2e): Ein KI-Agent bedient die Browser-Fassung von
 * PlantPDF wie ein Mensch (agent.act / agent.assert), dazu exakte Prüfungen (expect). Die
 * Agent-Schritte laufen über das angemeldete Claude Code (Sonnet), es braucht keinen API-Schlüssel.
 *
 * Start: npm run test:e2e (baut dist/, startet den Webserver, schaltet die Telemetrie ab).
 * Die Desktop-App (Tabs, Fenster) prüfen die Playwright-Tests in tests/desktop.spec.js.
 */
import type { E2EConfig } from 'e2e';
import { web } from '@e2e-dev/web';
import { claudeCode } from '@e2e-dev/acp';
import { fileURLToPath } from 'node:url';

const serve = fileURLToPath(new URL('./serve.mjs', import.meta.url));

export default {
  targets: [
    {
      engine: web(),
      app: {
        url: 'http://127.0.0.1:4173/',
        command: { executable: process.execPath, args: [serve], log: '.e2e/logs/app.log', reuseExisting: true },
      },
    },
  ],
  agents: {
    default: {
      executor: claudeCode({ model: 'sonnet' }),
      maxSteps: 40,
      maxModelCalls: 40,
      context:
        'PlantPDF ist ein deutschsprachiger PDF-Editor (Browser-Fassung einer Windows-Desktop-App). Oben schaltet ein Umschalter zwischen den Bereichen „PDF“ (PDFs öffnen und bearbeiten) und „Dokumentation“ (Dokumentationen aus Vorlagen: Anlagendokumentation, Bedienungsanleitung, Technische Beschreibung, Anschlussplan). Im Browser gibt es keine PDF-Erzeugung: „Speichern“ legt die Dokumentation in der App ab (Liste „Zuletzt bearbeitet“); „Speichern unter“ öffnet den Druckdialog – nicht drucken. Keine Konten, keine Netzwerkfunktionen. Dateiauswahl-Dialoge des Systems kannst du nicht bedienen.',
    },
  },
} satisfies E2EConfig;
