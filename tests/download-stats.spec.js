import { test, expect } from '@playwright/test';
import {
  countsFromReleases,
  diffCounts,
  windowStart,
  csvLine,
  parseCsv,
} from '../scripts/download-stats.mjs';

/** Download-Verlauf (scripts/download-stats.mjs): Zählerstände, neue Downloads, Zeitfenster, CSV. */

const asset = (name, n) => ({ name, download_count: n });

test('Zählerstände aus den Releases', () => {
  const counts = countsFromReleases([
    { tag_name: 'v2.22.3', assets: [asset('PlantPDF-Setup-2.22.3.exe', 4)] },
    { tag_name: 'v2.23.0', draft: true, assets: [asset('PlantPDF-Setup-2.23.0.exe', 0)] },
  ]);
  expect(counts).toEqual({ 'PlantPDF-Setup-2.22.3.exe': { version: '2.22.3', count: 4 } });
});

test('Neue Downloads: gestiegen, neue Datei, gesunken', () => {
  const prev = {
    'a.exe': { version: '1.0.0', count: 4 },
    'b.exe': { version: '1.1.0', count: 3 },
  };
  const next = {
    'a.exe': { version: '1.0.0', count: 6 },
    'b.exe': { version: '1.1.0', count: 1 },
    'c.exe': { version: '1.2.0', count: 1 },
  };
  expect(diffCounts(prev, next)).toEqual([
    { version: '1.0.0', datei: 'a.exe', downloads: 2 },
    { version: '1.2.0', datei: 'c.exe', downloads: 1 },
  ]);
  expect(diffCounts(next, next)).toEqual([]);
});

test('Zeitfenster beginnt beim letzten erfolgreichen Lauf', () => {
  expect(windowStart('2026-10-27T10:00:00Z', '2026-10-27T21:30:12.345Z')).toBe('2026-10-27T21:30:12Z');
  // älterer oder fehlender Lauf: letzte gespeicherte Änderung
  expect(windowStart('2026-10-27T10:00:00Z', '2026-10-26T08:00:00Z')).toBe('2026-10-27T10:00:00Z');
  expect(windowStart('2026-10-27T10:00:00Z', '')).toBe('2026-10-27T10:00:00Z');
});

test('CSV hin und zurück', () => {
  const row = {
    erkannt: '2026-10-27T21:35:00Z',
    seit: '2026-10-27T21:30:00Z',
    version: '2.22.3',
    datei: 'a,"b".exe',
    downloads: 2,
  };
  expect(parseCsv(`erkannt_utc,seit_utc,version,datei,downloads\n${csvLine(row)}\n`)).toEqual([row]);
});
