# PlantPDF – Arbeitsregeln für Claude

## Arbeitsweise
- Bei Unklarheiten nachfragen – nichts erraten.
- Für einfache Teilaufgaben (Suchen, Lesen, Routinearbeit) günstigere Agenten/Modelle nutzen.
- Features und Fixes vollständig fertigstellen, nichts halb liegen lassen.
- Zum Verstehen des Projekts zuerst den Graphify-Wissensgraph nutzen (`graphify-out/`, wird beim Sitzungsstart aktualisiert).

## Sprache und Texte
- Alles auf Deutsch: Oberfläche, Commit-Nachrichten, Doku (README, LIESMICH).
- Commit-Titel kurz und für Nutzer verständlich; Details als Stichpunkte darunter.

## Versionen und Release
- Bei jeder Änderung die Version in `package.json` erhöhen (Patch für Fixes, Minor für neue Funktionen) und im Commit-Titel nennen („…; Version x.y.z“).
- Eine neue Version auf `main` setzt automatisch den Tag und startet das Release (`.github/workflows/auto-release.yml`); Updates kommen über GitHub-Releases.

## Qualität
- Zu neuen Funktionen Playwright-Tests schreiben bzw. anpassen; vor dem Push `npm test` ausführen.
- Instabile Tests richtig reparieren (auf den passenden Zustand warten), nicht abschalten.
- Fenstergrößen 900–1700 px prüfen, mit und ohne Desktop-Kopfzeile.
- Vor dem Commit `npm run format` (Prettier).

## Design und Bedienung
- Rückfragen und Meldungen im eigenen Stil der App, keine Systemdialoge.
- Weiche Animationen, Akzentfarbe; kein Flackern, kein schwarzes Bild.
- Verhalten wie in Office (Speichern, „Speichern unter“, Rückfrage beim Schließen).

## Rechtliches
- Urheber: Julius Steiner; alle Rechte beim Entwickler (LICENSE, Über-Dialog).
