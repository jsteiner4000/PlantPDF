/**
 * Dokumentationen von „Dokumentation erstellen“ (eigene IndexedDB „pdfix-studio“, unabhängig von der
 * Datenbank des PDF-Bearbeitens). Wie in Office:
 *
 * - `meta`/`data`: der zuletzt **gespeicherte** Stand je Projekt (Startseite „Zuletzt bearbeitet“),
 *   samt der PDF-Datei, in die gespeichert wird (`file`: { name, handle }). Geschrieben nur beim
 *   Speichern (und beim Öffnen einer PDF – deren Inhalt ist ja gespeichert).
 * - `auto`: automatische Sicherung der **ungespeicherten** Änderungen (AutoWiederherstellen). Sie
 *   wird beim Speichern bzw. „Nicht speichern“ gelöscht; bleibt eine übrig (Absturz, Fenster ohne
 *   Rückfrage geschlossen), bietet PlantPDF sie beim nächsten Öffnen zum Wiederherstellen an.
 *
 * `meta` (Kennung → { id, name, sub, modified, transient }) hält die Liste klein; `data` enthält das
 * Projekt samt Bildern. `transient`: nur zur Übergabe an einen neuen Tab (nicht in der Liste).
 * Eigene Vorlagen genauso in `tmeta` (mit kleinem Vorschaubild) und `tdata`.
 */
const DB_NAME = 'pdfix-studio';
const DB_VERSION = 4;

let dbPromise = null;

function db() {
  if (!dbPromise)
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (ev) => {
        const d = request.result;
        for (const name of ['meta', 'data', 'tmeta', 'tdata', 'auto', 'autometa']) if (!d.objectStoreNames.contains(name)) d.createObjectStore(name, { keyPath: 'id' });
        // Fassung 3 hatte die Sicherungen ohne eigene Liste: Liste einmalig nachtragen
        if (ev.oldVersion === 3) {
          const tx = request.transaction;
          const meta = tx.objectStore('autometa');
          tx.objectStore('auto').openCursor().onsuccess = (e) => {
            const cursor = e.target.result;
            if (!cursor) return;
            meta.put(autoMeta(cursor.value));
            cursor.continue();
          };
        }
      };
      request.onsuccess = () => {
        // ein neueres PlantPDF (anderer Tab) braucht die Datenbank in neuer Fassung: Platz machen
        request.result.onversionchange = () => {
          request.result.close();
          dbPromise = null;
        };
        resolve(request.result);
      };
      request.onerror = () => {
        dbPromise = null;
        reject(request.error);
      };
      request.onblocked = () => {
        dbPromise = null;
        reject(new Error('Datenbank blockiert'));
      };
    });
  return dbPromise;
}

function run(mode, fn, stores = ['meta', 'data']) {
  return db().then(
    (d) =>
      new Promise((resolve, reject) => {
        const tx = d.transaction(stores, mode);
        let result;
        Promise.resolve(fn(tx, (r) => (result = r))).catch(reject);
        tx.oncomplete = () => resolve(result);
        tx.onerror = () => reject(tx.error);
        tx.onabort = () => reject(tx.error);
      }),
  );
}

const req = (r) => new Promise((resolve, reject) => ((r.onsuccess = () => resolve(r.result)), (r.onerror = () => reject(r.error))));

/** Ein Datei-Handle lässt sich nicht immer ablegen (z. B. im Browser ohne Dateizugriff) – dann ohne. */
async function withHandle(write, file) {
  try {
    await write(file || null);
  } catch (err) {
    if (!file || !file.handle || (err && err.name !== 'DataCloneError')) throw err;
    await write({ name: file.name, handle: null });
  }
}

/**
 * Sichert ein Projekt (Kennung = project.id). `info`: { name, sub, file, transient } – `file` ist die
 * PDF-Datei, in die gespeichert wird; `transient` hält es aus der Liste heraus (Übergabe an einen Tab).
 */
export function saveDraft(project, info) {
  return withHandle(
    (file) =>
      run('readwrite', (tx) => {
        tx.objectStore('meta').put({ id: project.id, name: info.name, sub: info.sub || '', modified: project.modified || Date.now(), transient: !!info.transient });
        tx.objectStore('data').put({ id: project.id, project, file });
      }),
    info.file,
  );
}

/** Alle gespeicherten Dokumentationen, zuletzt bearbeitete zuerst (ohne Projektinhalt). */
export async function listDrafts() {
  try {
    const all = await run('readonly', (tx, done) => req(tx.objectStore('meta').getAll()).then(done));
    return (all || []).filter((d) => !d.transient).sort((a, b) => b.modified - a.modified);
  } catch {
    return [];
  }
}

export function loadDraft(id) {
  return loadDraftRecord(id).then((r) => r && r.project);
}

/** Gespeicherter Stand samt Datei und Kennzeichen: { project, file, transient } oder undefined. */
export function loadDraftRecord(id) {
  return run('readonly', (tx, done) =>
    Promise.all([req(tx.objectStore('data').get(id)), req(tx.objectStore('meta').get(id))]).then(([r, m]) =>
      done(r && { project: r.project, file: r.file || null, transient: !!(m && m.transient) }),
    ),
  );
}

/* ---------- Automatische Sicherung (ungespeicherte Änderungen) ---------- */

/**
 * `info`: { owner (Fenster bzw. HANDOFF), name, file, saved (es gibt einen gespeicherten Stand),
 * handoff ({ dirty, commit, fileWarn } bei der Übergabe an einen neuen Tab), key (Kennung, sonst
 * die des Projekts; Übergaben liegen unter `handoffKey(id)`, getrennt von der Sicherung) }.
 */
export function putAutosave(project, info) {
  return withHandle(
    (file) =>
      run(
        'readwrite',
        (tx) => {
          const record = { id: info.key || project.id, project, owner: info.owner, name: info.name, file, saved: !!info.saved, handoff: info.handoff || null, time: Date.now() };
          tx.objectStore('auto').put(record);
          tx.objectStore('autometa').put(autoMeta(record));
        },
        AUTO,
      ),
    info.file,
  );
}

/** Die Sicherungen liegen in `auto` (mit Projekt und Bildern), ihre kleine Liste in `autometa`. */
const AUTO = ['auto', 'autometa'];

/** Eintrag der Liste: alles außer dem Projekt (die Startseite lädt so keine Bilder). */
function autoMeta({ id, project, owner, name, saved, handoff, time }) {
  return { id, project: project && project.id, owner, name, saved: !!saved, handoff: handoff || null, time };
}

export function loadAutosave(id) {
  return run('readonly', (tx, done) => req(tx.objectStore('auto').get(id)).then(done), ['auto']);
}

export function deleteAutosave(id) {
  return run(
    'readwrite',
    (tx) => {
      tx.objectStore('auto').delete(id);
      tx.objectStore('autometa').delete(id);
    },
    AUTO,
  );
}

/** Besitzer einer Übergabe an einen neuen Tab (kein Fenster) und ihre Kennung. */
export const HANDOFF = 'handoff';
export const handoffKey = (id) => 'h:' + id;

/** Nicht abgeholte Sicherungen werden nach 14 Tagen gelöscht. */
const MAX_AGE = 14 * 24 * 3600 * 1000;

/** Alle automatischen Sicherungen ohne Projektinhalt: [{ id, project (Kennung), owner, name, saved, handoff, time }]; zu alte fallen weg. */
export async function listAutosaves() {
  // nur die kleine Liste lesen – nicht die Projekte samt Bildern
  const all = await run('readonly', (tx, done) => req(tx.objectStore('autometa').getAll()).then(done), ['autometa']);
  const now = Date.now();
  const out = [];
  for (const m of all || []) {
    if (now - m.time > MAX_AGE) deleteAutosave(m.id).catch(() => {});
    else out.push(m);
  }
  return out.sort((a, b) => b.time - a.time);
}

export function deleteDraft(id) {
  return run('readwrite', (tx) => {
    tx.objectStore('meta').delete(id);
    tx.objectStore('data').delete(id);
  });
}

/* ---------- Eigene Vorlagen ---------- */

const TPL = ['tmeta', 'tdata'];

/** Sichert eine Vorlage. `info`: { id, name, sub, thumb } (thumb: SVG der ersten Seite). */
export function saveTemplate(project, info) {
  return run(
    'readwrite',
    (tx) => {
      tx.objectStore('tmeta').put({ id: info.id, name: info.name, sub: info.sub || '', thumb: info.thumb || '', modified: Date.now() });
      tx.objectStore('tdata').put({ id: info.id, project });
    },
    TPL,
  );
}

/** Alle eigenen Vorlagen, neueste zuerst (ohne Projektinhalt). */
export async function listTemplates() {
  try {
    const all = await run('readonly', (tx, done) => req(tx.objectStore('tmeta').getAll()).then(done), TPL);
    return (all || []).sort((a, b) => b.modified - a.modified);
  } catch {
    return [];
  }
}

export function loadTemplate(id) {
  return run('readonly', (tx, done) => req(tx.objectStore('tdata').get(id)).then((r) => done(r && r.project)), TPL);
}

export function deleteTemplate(id) {
  return run(
    'readwrite',
    (tx) => {
      tx.objectStore('tmeta').delete(id);
      tx.objectStore('tdata').delete(id);
    },
    TPL,
  );
}
