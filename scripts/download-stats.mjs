/**
 * Download-Verlauf der Releases. GitHub nennt pro Setup-Datei nur die Gesamtzahl der Downloads
 * (`download_count`), keinen Zeitpunkt. Der Workflow `download-stats.yml` ruft deshalb alle paar
 * Minuten `record` auf: Ist eine Zahl seit der letzten Abfrage gestiegen, wird eine Zeile mit dem
 * Zeitfenster (seit … bis erkannt) in `downloads.csv` auf dem Branch `download-stats` angehängt.
 * Mitgezählt werden auch die Updates aus PlantPDF selbst (die App lädt das Setup von GitHub).
 *
 *   node scripts/download-stats.mjs                  Verlauf anzeigen (vom Branch download-stats)
 *   node scripts/download-stats.mjs --tage 7         nur die letzten 7 Tage
 *   node scripts/download-stats.mjs --datei x.csv    Verlauf aus einer lokalen Datei
 *   node scripts/download-stats.mjs record <ordner>  Abfrage + Aufzeichnung (für den Workflow)
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const REPO = 'jsteiner4000/PlantPDF';
export const BRANCH = 'download-stats';
export const CSV_HEADER = 'erkannt_utc,seit_utc,version,datei,downloads';
const RAW_CSV = `https://raw.githubusercontent.com/${REPO}/${BRANCH}/downloads.csv`;
const ZONE = 'Europe/Berlin';

/** Zählerstände aus der API-Antwort „releases“: { 'Datei.exe': { version, count } }. */
export function countsFromReleases(releases) {
  const counts = {};
  for (const r of Array.isArray(releases) ? releases : []) {
    if (!r || r.draft) continue;
    const version = String(r.tag_name || '').replace(/^v/i, '');
    for (const a of Array.isArray(r.assets) ? r.assets : []) {
      if (!a || !a.name) continue;
      counts[a.name] = { version, count: Math.max(0, Number(a.download_count) || 0) };
    }
  }
  return counts;
}

/**
 * Neue Downloads zwischen zwei Zählerständen. Dateien, die es vorher nicht gab, zählen ab 0
 * (neues Release). Sinkt eine Zahl (Datei ersetzt), entsteht keine Zeile.
 */
export function diffCounts(prev, next) {
  const rows = [];
  for (const [datei, { version, count }] of Object.entries(next)) {
    const before = prev[datei] ? prev[datei].count : 0;
    if (count > before) rows.push({ version, datei, downloads: count - before });
  }
  return rows.sort((a, b) => a.datei.localeCompare(b.datei));
}

/**
 * Beginn des Zeitfensters: der letzte erfolgreiche Lauf (`LETZTE_ABFRAGE`, Startzeit laut
 * Actions-API), sonst die letzte gespeicherte Änderung. Ein Lauf ohne neue Downloads wird nicht
 * committet, sein Zeitpunkt steht deshalb nur in der Actions-API.
 */
export function windowStart(checkedAt, lastRun) {
  const a = Date.parse(checkedAt);
  const b = Date.parse(lastRun);
  if (!(b > a)) return checkedAt;
  return new Date(b).toISOString().replace(/\.\d+Z$/, 'Z');
}

const csvField = (v) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

export const csvLine = (r) => [r.erkannt, r.seit, r.version, r.datei, r.downloads].map(csvField).join(',');

/** CSV → [{ erkannt, seit, version, datei, downloads }] (Kopfzeile wird übersprungen). */
export function parseCsv(text) {
  const rows = [];
  for (const line of String(text).split(/\r?\n/)) {
    if (!line.trim() || line.startsWith('erkannt_utc')) continue;
    const f = [];
    const re = /("(?:[^"]|"")*"|[^,]*)(,|$)/g;
    let m;
    while ((m = re.exec(line)) && f.length < 5) {
      f.push(m[1].startsWith('"') ? m[1].slice(1, -1).replace(/""/g, '"') : m[1]);
      if (m[2] === '') break;
    }
    rows.push({ erkannt: f[0], seit: f[1], version: f[2], datei: f[3], downloads: Number(f[4]) || 0 });
  }
  return rows;
}

async function fetchReleases() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'PlantPDF-download-stats' };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  const all = [];
  for (let page = 1; page < 50; page++) {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=100&page=${page}`, {
      headers,
    });
    if (!res.ok) throw new Error(`GitHub-API: ${res.status} ${res.statusText}`);
    const list = await res.json();
    all.push(...list);
    if (list.length < 100) break;
  }
  return all;
}

/** Abfrage und Aufzeichnung in <ordner>/state.json und <ordner>/downloads.csv. */
async function record(dir) {
  const statePath = path.join(dir, 'state.json');
  const csvPath = path.join(dir, 'downloads.csv');
  await mkdir(dir, { recursive: true });
  const state = JSON.parse(await readFile(statePath, 'utf8').catch(() => 'null'));
  const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
  const counts = countsFromReleases(await fetchReleases());
  let csv = await readFile(csvPath, 'utf8').catch(() => `${CSV_HEADER}\n`);
  if (!state) {
    // Erster Lauf: nur der Ausgangsstand, frühere Downloads haben keinen Zeitpunkt
    console.log(`Ausgangsstand gespeichert (${Object.keys(counts).length} Dateien).`);
  } else {
    const rows = diffCounts(state.counts || {}, counts);
    const seit = windowStart(state.checkedAt, process.env.LETZTE_ABFRAGE);
    for (const r of rows) csv += csvLine({ erkannt: now, seit, ...r }) + '\n';
    console.log(
      rows.length ? rows.map((r) => `+${r.downloads} ${r.datei}`).join('\n') : 'Keine neuen Downloads.',
    );
  }
  await writeFile(csvPath, csv);
  // Nur bei Änderungen schreiben, sonst entstünde bei jedem Lauf ein Commit
  const changed = !state || JSON.stringify(state.counts) !== JSON.stringify(counts);
  if (changed) await writeFile(statePath, JSON.stringify({ checkedAt: now, counts }, null, 2) + '\n');
}

const fmt = new Intl.DateTimeFormat('de-DE', {
  timeZone: ZONE,
  weekday: 'short',
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
});
const fmtTime = new Intl.DateTimeFormat('de-DE', { timeZone: ZONE, hour: '2-digit', minute: '2-digit' });
const fmtDay = new Intl.DateTimeFormat('de-DE', {
  timeZone: ZONE,
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

async function show(args) {
  const i = args.indexOf('--datei');
  const t = args.indexOf('--tage');
  let text;
  if (i >= 0) text = await readFile(args[i + 1], 'utf8');
  else {
    const res = await fetch(RAW_CSV, { headers: { 'User-Agent': 'PlantPDF-download-stats' } });
    if (res.status === 404) {
      console.log(`Noch kein Verlauf: Der Branch „${BRANCH}“ entsteht beim ersten Lauf des Workflows.`);
      return;
    }
    if (!res.ok) throw new Error(`${RAW_CSV}: ${res.status}`);
    text = await res.text();
  }
  let rows = parseCsv(text);
  if (t >= 0) {
    const since = Date.now() - Number(args[t + 1]) * 86_400_000;
    rows = rows.filter((r) => Date.parse(r.erkannt) >= since);
  }
  if (!rows.length) {
    console.log('Keine Downloads im Verlauf.');
    return;
  }
  console.log(`Downloads (Zeit: ${ZONE}; der Download liegt im Zeitfenster „zwischen … und …“)\n`);
  const perDay = new Map();
  for (const r of rows) {
    const von = new Date(r.seit);
    const bis = new Date(r.erkannt);
    const fenster = fmtDay.format(von) === fmtDay.format(bis) ? fmtTime.format(von) : fmt.format(von);
    console.log(
      `${fmt.format(bis)}  (zwischen ${fenster} und ${fmtTime.format(bis)})  ${r.version.padEnd(8)} +${r.downloads}  ${r.datei}`,
    );
    const day = fmtDay.format(bis);
    perDay.set(day, (perDay.get(day) || 0) + r.downloads);
  }
  console.log('\nPro Tag:');
  for (const [day, n] of perDay) console.log(`  ${day}  ${n}`);
  console.log(`\nSumme: ${rows.reduce((s, r) => s + r.downloads, 0)}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] || '').href) {
  const [cmd, ...rest] = process.argv.slice(2);
  (cmd === 'record' ? record(rest[0] || 'download-stats') : show(process.argv.slice(2))).catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
