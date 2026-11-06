/**
 * Datenmodell der Projektmappe („Dokumentation erstellen“).
 *
 * Ein Projekt beschreibt die komplette Kundendokumentation: Firmen- und Projektangaben, Sprache,
 * Schrift und eine geordnete Liste von Abschnitten (Deckblatt, Inhaltsverzeichnis, Anschlussplan,
 * später Lageplan, Fotos, Anleitungskapitel). Aus dem Projekt entstehen die Seiten (render/*) und
 * daraus die PDF; das Projekt selbst wird in der PDF mitgespeichert (export.js).
 *
 * Texte, die der Nutzer eingibt, sind zweisprachig: `{ de, en }` (siehe `tx`). Bilder liegen
 * getrennt in `project.images` (Kennung → { mime, data }), damit der Verlauf (Rückgängig) nur
 * kleine Daten kopiert.
 */

export const MODEL_VERSION = 1;

/** Sprachen eines Dokuments. */
export const LANGS = [
  { id: 'de', label: 'Deutsch' },
  { id: 'en', label: 'Englisch' },
  { id: 'de+en', label: 'Deutsch und Englisch' },
];

/** Schriften der Dokumente (Barlow: wie die Anleitungen; Helvetica: wie der Anschlussplan). */
export const FONTS = [
  { id: 'helvetica', label: 'Helvetica', css: 'Helvetica, Arial, "Liberation Sans", Arimo, sans-serif' },
  { id: 'barlow', label: 'Barlow', css: '"PDFix Barlow", Helvetica, Arial, sans-serif' },
];

let seq = 0;
/** Kurze, eindeutige Kennung (Zufall aus crypto – Math.random bleibt unberührt). */
export const uid = (prefix = 'x') =>
  `${prefix}${Date.now().toString(36)}${(seq++).toString(36)}${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;

/** Zweisprachiger Text. */
export const T = (de = '', en = '') => ({ de, en });

/** Text in der Sprache `lang` ('de' | 'en'); fehlt die Übersetzung, gilt der andere Text. */
export function tx(value, lang = 'de') {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return (lang === 'en' ? value.en || value.de : value.de || value.en) || '';
}

/** Feste Beschriftungen der Dokumente in beiden Sprachen. */
export const STRINGS = {
  pageOf: T('Seite {n} von {total}', 'Page {n} of {total}'),
  toc: T('Inhalt', 'Contents'),
  wiring: T('Anschlussplan', 'Wiring diagram'),
  wiringOverview: T('Übersicht der Anschlüsse', 'Connection overview'),
  wiringTerminals: T('Klemmenplan und Hinweise', 'Terminal plan and notes'),
  pinTable: T('Belegung der Anschlüsse', 'Pin assignment'),
  pinTableOf: T('Belegung der {name}-Anschlüsse', '{name} pin assignment'),
  pin: T('Pin', 'Pin'),
  func: T('Funktion', 'Function'),
  connected: T('Angeschlossen an', 'Connected to'),
  remark: T('Bemerkung', 'Remark'),
  target: T('Baugruppe', 'Module'),
  wire: T('Ader', 'Wire'),
  cross: T('Querschnitt', 'Cross-section'),
  marks: T('Kennzeichen', 'Marking'),
  hints: T('Hinweise zur Verdrahtung', 'Wiring notes'),
  legend: T('Legende', 'Legend'),
  seePage: T(
    'Die genauen Klemmen und alle Hinweise zur Verdrahtung stehen auf Seite {page}.',
    'Exact terminals and all wiring notes are on page {page}.',
  ),
  documentation: T('Anlagendokumentation', 'System documentation'),
  customer: T('Kunde', 'Customer'),
  address: T('Anschrift', 'Address'),
  site: T('Anlage', 'System'),
  date: T('Datum', 'Date'),
  technician: T('Techniker', 'Technician'),
  docNo: T('Dokument-Nr.', 'Document no.'),
  version: T('Version', 'Version'),
  checked: T('Geprüft von', 'Checked by'),
  contacts: T('Ansprechpartner', 'Contacts'),
  guard: T('Wachschutz', 'Security service'),
  guardCompany: T('Firma', 'Company'),
  guardPhone: T('Notruf', 'Emergency line'),
  guardNo: T('Kunden-/Objekt-Nr.', 'Customer/site no.'),
  guardCenter: T('Leitstelle', 'Monitoring centre'),
  projectData: T('Projektangaben', 'Project data'),
  access: T('Zugangsdaten', 'Access data'),
  continued: T('Fortsetzung', 'continued'),
  sitePlan: T('Lageplan', 'Site plan'),
  deviceList: T('Geräteliste', 'Device list'),
  fence: T('Zaun', 'Fence'),
  radioLink: T('Richtfunk', 'Radio link'),
  radioTo: T('Richtfunk zu {to}', 'Radio link to {to}'),
  radioBase: T('Richtfunk-Basis für {to}', 'Radio link base for {to}'),
  scale: T('Maßstab', 'Scale'),
  nr: T('Nr.', 'No.'),
  ipCol: T('IP-Adresse', 'IP address'),
  heightCol: T('Montagehöhe', 'Mounting height'),
  type: T('Typ', 'Type'),
  name: T('Bezeichnung', 'Designation'),
  photos: T('Fotodokumentation', 'Photo documentation'),
  photo: T('Foto', 'Photo'),
  chapters: T('Anleitung', 'Manual'),
  figure: T('Abbildung', 'Figure'),
  table: T('Tabelle', 'Table'),
  section: T('Abschnitt', 'Section'),
  figurePending: T('Abbildung folgt', 'Figure to follow'),
  refMissing: T('(Verweis fehlt)', '(missing reference)'),
  tone: {
    note: T('Hinweis', 'Note'),
    warn: T('Achtung', 'Caution'),
    danger: T('Vorsicht', 'Warning'),
    open: T('Offen', 'Open'),
  },
  setting: T('Einstellung', 'Setting'),
  value: T('Wert', 'Value'),
  secretsHidden: T(
    'Passwörter und Schlüssel sind in dieser Fassung ausgeblendet.',
    'Passwords and keys are hidden in this version.',
  ),
};

/** Beschriftung `key` für die Sprache `lang`, Platzhalter {x} aus `vars`. */
export function str(key, lang, vars = {}) {
  return tx(STRINGS[key], lang).replace(/\{(\w+)\}/g, (_, k) => (vars[k] ?? '') + '');
}

/** Sprachen, in denen das Dokument erscheint (Reihenfolge = Darstellung). */
export const langsOf = (project) => (project.lang === 'de+en' ? ['de', 'en'] : [project.lang || 'de']);

/* ---------- Anschlussplan ---------- */

/** Linienstile und Strichstärken der Leitungsarten. */
export const WIRE_STYLES = [
  ['solid', 'Durchgezogen'],
  ['dashed', 'Gestrichelt'],
  ['dotted', 'Gepunktet'],
];
export const WIRE_WIDTHS = [
  ['thin', 'Dünn'],
  ['normal', 'Normal'],
  ['thick', 'Dick'],
];

/**
 * Leitungsart: Name, Zeichenfarbe, Linienstil, Strichstärke, Kurzzeichen (steht an der Leitung) und
 * reale Kabeldaten (Aderfarbe, Querschnitt – Legende und Klemmenplan).
 */
export const newCategory = (over = {}) => ({
  id: uid('c'),
  name: T('Neue Leitung', 'New line'),
  color: '#5b6b7a',
  style: 'solid',
  width: 'normal',
  code: '',
  wire: '',
  cross: '',
  ...over,
});

/** Leitungsarten eines neuen Plans (neutral benannt, im Plan frei änderbar). */
export const DEFAULT_CATEGORIES = () => [
  newCategory({ id: 'sig', name: T('Signal', 'Signal'), color: '#1f3b4d' }),
  newCategory({ id: 'ls', name: T('Eingang', 'Input'), color: '#15803d' }),
  newCategory({ id: 'led', name: T('Ausgang', 'Output'), color: '#b91c1c' }),
  newCategory({ id: 'pwr', name: T('Versorgung', 'Supply'), color: '#b45309' }),
  newCategory({ id: 'bus', name: T('Bus / Daten', 'Bus / data'), color: '#6d28d9', style: 'dashed' }),
];

/** Kennzeichen (frei beschriftetes Schild, z. B. „12 V DC“, „USV“): Text, Farbe, Erklärung in der Legende. */
export const newMarking = (over = {}) => ({ id: uid('k'), label: '', color: '#b45309', text: T('', ''), ...over });

/** Kennzeichen eines neuen Plans. */
export const DEFAULT_MARKS = () => [
  newMarking({ id: 'k12', label: '12 V DC', color: '#b45309', text: T('Versorgung 12 V DC', '12 V DC supply') }),
  newMarking({ id: 'k24', label: '24 V DC', color: '#c2410c', text: T('Versorgung 24 V DC', '24 V DC supply') }),
  newMarking({ id: 'k230', label: '230 V AC', color: '#b91c1c', text: T('Netzspannung 230 V AC', 'Mains 230 V AC') }),
  newMarking({ id: 'kusv', label: 'USV', color: '#0f766e', text: T('Über USV versorgt', 'Supplied via UPS') }),
];

/**
 * Spalten des Klemmenplans. `fixed`: immer zu sehen. Andere Spalten ohne Inhalt fallen beim Setzen
 * weg (lesbar auf A4). `w`: Gewicht der Breite.
 */
export const TERMINAL_COLUMNS = [
  { key: 'pin', w: 1.15, fixed: true },
  { key: 'func', w: 2.6 },
  { key: 'target', w: 2.1 },
  { key: 'connected', w: 2.1 },
  { key: 'wire', w: 1.2 },
  { key: 'cross', w: 1.25 },
  { key: 'marks', w: 1.5 },
  { key: 'remark', w: 2.6 },
];
/** Spalten älterer Pläne (vor den einstellbaren Spalten). */
export const LEGACY_COLUMNS = ['pin', 'func', 'connected', 'remark'];

export const defaultColumns = () => TERMINAL_COLUMNS.map((c) => ({ key: c.key, show: true, title: T('', '') }));

/** Was ein Anschlussplan zeigt. */
export const defaultShow = () => ({ legend: true, terminals: true, hints: true });

/** Vorgaben für neue Anschlusspläne (Einstellungen › Vorgaben), wenn nichts eingestellt ist. */
export const defaultWiringPresets = () => ({
  categories: DEFAULT_CATEGORIES(),
  marks: DEFAULT_MARKS(),
  columns: defaultColumns(),
  show: defaultShow(),
});

const PRESETS_KEY = 'pdfix.presets.wiring';

/** Vorgaben aus den Einstellungen (bereinigt); fehlen sie, die eingebauten. */
export function loadWiringPresets() {
  try {
    const raw = JSON.parse(localStorage.getItem(PRESETS_KEY) || 'null');
    if (raw) return cleanWiringPresets(raw);
  } catch {}
  return defaultWiringPresets();
}

export function saveWiringPresets(presets) {
  try {
    localStorage.setItem(PRESETS_KEY, JSON.stringify(cleanWiringPresets(presets)));
    return true;
  } catch {
    return false;
  }
}

export function resetWiringPresets() {
  try {
    localStorage.removeItem(PRESETS_KEY);
  } catch {}
}

/** Vorgaben (aus Datei oder Speicher) prüfen: nur bekannte Felder, begrenzte Längen. */
export function cleanWiringPresets(raw) {
  const d = defaultWiringPresets();
  const ids = new Set();
  const id = (v, prefix) => {
    let out = typeof v === 'string' && ID_RE.test(v) && !ids.has(v) ? v : uid(prefix);
    while (ids.has(out)) out = uid(prefix);
    ids.add(out);
    return out;
  };
  const r = raw && typeof raw === 'object' ? raw : {};
  const categories = cleanCategories(r.categories, id);
  return {
    categories: categories.length ? categories : d.categories,
    marks: Array.isArray(r.marks) ? cleanMarks(r.marks, id) : d.marks,
    columns: cleanColumns(r.columns) || d.columns,
    show: cleanShow(r.show),
  };
}

function cleanCategories(list, id) {
  return (Array.isArray(list) ? list : [])
    .filter((c) => c && typeof c === 'object')
    .slice(0, 60)
    .map((c) => ({
      id: id(c.id, 'c'),
      name: toT(c.name),
      color: str_(c.color, 9) || '#5b6b7a',
      style: oneOf(c.style, ['solid', 'dashed', 'dotted'], 'solid'),
      width: oneOf(c.width, ['thin', 'normal', 'thick'], 'normal'),
      code: str_(c.code, 12),
      wire: str_(c.wire, 24),
      cross: str_(c.cross, 24),
    }));
}

function cleanMarks(list, id) {
  return list
    .filter((k) => k && typeof k === 'object')
    .slice(0, 60)
    .map((k) => ({ id: id(k.id, 'k'), label: str_(k.label, 24), color: str_(k.color, 9) || '#b45309', text: toT(k.text) }));
}

/** Spalten des Klemmenplans; null = wie früher (vier feste Spalten). */
function cleanColumns(list) {
  if (!Array.isArray(list)) return null;
  const seen = new Set();
  const out = [];
  for (const c of list) {
    if (!c || typeof c !== 'object' || seen.has(c.key) || !TERMINAL_COLUMNS.some((t) => t.key === c.key)) continue;
    seen.add(c.key);
    out.push({ key: c.key, show: c.key === 'pin' ? true : c.show !== false, title: toT(c.title) });
  }
  // neue Spalten späterer Fassungen hinten anfügen (ausgeblendet)
  for (const t of TERMINAL_COLUMNS) if (!seen.has(t.key)) out.push({ key: t.key, show: false, title: T('', '') });
  return out;
}

const cleanShow = (v) => {
  const o = v && typeof v === 'object' ? v : {};
  return { legend: o.legend !== false, terminals: o.terminals !== false, hints: o.hints !== false };
};

/**
 * Anschlusspläne älterer Fassungen im Speicher auf den aktuellen Aufbau bringen (an Ort und Stelle):
 * das eine Kennzeichen (`badge`) wird zur Liste `marks`, fehlende Felder bekommen Standardwerte.
 * Gespeicherte Projekte erledigt das Bereinigen beim Laden (cleanWiring); dies hier deckt Projekte
 * ab, die direkt geöffnet werden.
 */
export function upgradeProject(project) {
  // Deckblatt-Felder, Kopf- und Fußzeile (ältere Dokumente: wie bisher)
  if (!Array.isArray(project.coverFields)) project.coverFields = cleanCoverFields(project.coverFields);
  if (!project.extra || typeof project.extra !== 'object') project.extra = {};
  if (!project.look || typeof project.look !== 'object') project.look = cleanPageLook(project.look);
  if (project.meta && typeof project.meta.checked !== 'string') project.meta.checked = '';
  for (const s of project.sections || []) {
    if (s.type === 'site') {
      s.kinds ||= {};
      s.styles ||= [];
      s.fields ||= [];
      if (s.listCols === undefined) s.listCols = null;
      for (const c of s.custom || []) {
        c.color ||= '#475569';
        c.glyph ??= '';
        c.fov ??= false;
        c.net ??= false;
      }
    }
    if (s.type === 'access' && !s.cols) {
      s.cols = cleanAccessCols(null, { hardware: ['location'], ...(s.hide || {}) });
      delete s.hide;
    }
    if (s.type !== 'wiring') continue;
    for (const c of s.categories || []) {
      c.style ||= 'solid';
      c.width ||= 'normal';
      c.code ??= '';
      c.wire ??= '';
      c.cross ??= '';
    }
    if (!Array.isArray(s.marks)) {
      const old = s.badge && typeof s.badge === 'object' ? s.badge : { label: '12 V', color: '#b45309', text: T('', '') };
      const mark = newMarking({ label: old.label || '', color: old.color || '#b45309', text: old.text && typeof old.text === 'object' ? old.text : T(old.text || '', '') });
      s.marks = mark.label ? [mark] : [];
      for (const b of s.boxes || []) b.marks = b.badge && mark.label ? [mark.id] : [];
      delete s.badge;
    }
    for (const b of s.boxes || []) {
      if (!Array.isArray(b.marks)) b.marks = [];
      delete b.badge;
      b.bmk ??= '';
      if (!b.make || typeof b.make !== 'object') b.make = T(b.make || '', '');
    }
    for (const p of (s.hub && s.hub.pins) || []) {
      p.wire ??= '';
      p.cross ??= '';
      if (!Array.isArray(p.marks)) p.marks = [];
    }
    if (s.columns === undefined) s.columns = null;
    if (!s.show || typeof s.show !== 'object') s.show = defaultShow();
  }
  return project;
}

/**
 * Leitungsarten und Kennzeichen aus den Vorgaben ergänzen, die im Plan noch fehlen (gleiche Kennung
 * oder gleicher Name/Text gilt als vorhanden). Ergebnis: Anzahl der ergänzten Einträge.
 */
export function mergeWiringPresets(section, presets) {
  let added = 0;
  const catKey = (c) => (tx(c.name, 'de') || '').trim().toLowerCase();
  for (const c of presets.categories) {
    if (section.categories.some((x) => x.id === c.id || catKey(x) === catKey(c))) continue;
    section.categories.push(copy(c));
    added++;
  }
  section.marks ||= [];
  for (const k of presets.marks) {
    if (section.marks.some((x) => x.id === k.id || (x.label || '').trim() === (k.label || '').trim())) continue;
    section.marks.push(copy(k));
    added++;
  }
  return added;
}

/** Kopie der Vorgaben für einen neuen Plan (eigene Kennungen nur, wo nötig). */
const copy = (v) => JSON.parse(JSON.stringify(v));

/**
 * Neue Baugruppe. Lage und Größe ergeben sich automatisch; `y` (pt unter der Oberkante der
 * Steuerung), `h` (Mindesthöhe), `pinY` (erste Leitung, pt unter der Oberkante) und `pinGap`
 * setzt das Verschieben im Plan bzw. das Beispiel.
 */
export function newBox(cat = 'sig', side = 'left') {
  return {
    id: uid('b'),
    title: T('', ''),
    lines: T('', ''),
    cat,
    side,
    /** Kennzeichen (Kennungen aus `section.marks`) */
    marks: [],
    /** Betriebsmittelkennzeichen, z. B. „-K1“ (optional) */
    bmk: '',
    /** Hersteller / Typ (optional, eigene Zeile im Kasten) */
    make: T('', ''),
    bus: false,
    parent: null,
    fill: side === 'bottom',
    fillColor: null,
    y: null,
    h: null,
    pinY: null,
    pinGap: null,
  };
}

/** Neuer Anschluss der Steuerung. */
export const newPin = (name = '', box = null) => ({
  id: uid('p'),
  name,
  label: '',
  func: T('', ''),
  box,
  terminal: T('', ''),
  note: T('', ''),
  /** Aderfarbe und Querschnitt; leer = wie die Leitungsart */
  wire: '',
  cross: '',
  /** Kennzeichen dieses Anschlusses (an seiner Leitung) */
  marks: [],
});

/** Neuer Hinweis. */
export const newHint = (cat = 'sig') => ({ id: uid('h'), cat, title: T('', ''), text: T('', '') });

/** Leerer Anschlussplan: eine zentrale Baugruppe, Leitungsarten, sonst nichts. */
export function newWiring(presets = loadWiringPresets()) {
  const p = copy(presets);
  return {
    id: uid('s'),
    type: 'wiring',
    system: T('', ''),
    categories: p.categories,
    marks: p.marks,
    columns: p.columns,
    show: p.show,
    hub: { name: T('Steuerung', 'Controller'), short: T('', ''), model: T('', ''), note: T('', ''), pins: [] },
    boxes: [],
    hints: [],
  };
}

/* ---------- Lageplan ---------- */

/**
 * Symbole für den Lageplan. `code` = Kürzel für die Nummerierung (K 1, BM 2 …), `fov` = hat einen
 * Erfassungsbereich (Winkel/Reichweite in pt auf der Seite), `glyph` = Name des Bildzeichens in
 * site.js.
 */
export const SYMBOLS = [
  { id: 'camera', code: 'K', name: T('Kamera', 'Camera'), color: '#1d4ed8', glyph: 'camera', fov: { angle: 90, range: 90 } },
  { id: 'motion', code: 'BM', name: T('Bewegungsmelder', 'Motion detector'), color: '#b91c1c', glyph: 'motion', fov: { angle: 90, range: 60 } },
  { id: 'smoke', code: 'RM', name: T('Rauchmelder', 'Smoke detector'), color: '#c2410c', glyph: 'smoke' },
  { id: 'contact', code: 'MK', name: T('Öffnungsmelder', 'Door/window contact'), color: '#0f766e', glyph: 'contact' },
  { id: 'glass', code: 'GB', name: T('Glasbruchmelder', 'Glass-break detector'), color: '#0e7490', glyph: 'glass' },
  { id: 'barrier', code: 'LS', name: T('Lichtschranke', 'Light barrier'), color: '#15803d', glyph: 'barrier' },
  { id: 'siren', code: 'SI', name: T('Sirene', 'Siren'), color: '#a21caf', glyph: 'siren' },
  { id: 'keypad', code: 'BT', name: T('Bedienteil', 'Keypad'), color: '#475569', glyph: 'keypad' },
  { id: 'panel', code: 'AZ', name: T('Alarmzentrale', 'Alarm panel'), color: '#1f3b4d', glyph: 'panel' },
  { id: 'keyswitch', code: 'SS', name: T('Schlüsselschalter', 'Key switch'), color: '#7c3aed', glyph: 'keyswitch' },
  { id: 'access', code: 'ZK', name: T('Zutrittsleser', 'Access reader'), color: '#0369a1', glyph: 'access' },
  { id: 'opener', code: 'TÖ', name: T('Türöffner', 'Door opener'), color: '#9a3412', glyph: 'opener' },
  { id: 'intercom', code: 'TS', name: T('Türsprechstelle', 'Door intercom'), color: '#4d7c0f', glyph: 'intercom' },
  { id: 'router', code: 'NW', name: T('Router / Switch', 'Router / switch'), color: '#334155', glyph: 'router' },
  { id: 'recorder', code: 'NVR', name: T('Rekorder', 'Recorder'), color: '#1e3a8a', glyph: 'recorder' },
  { id: 'ap', code: 'AP', name: T('Access Point', 'Access point'), color: '#0369a1', glyph: 'ap' },
  // Installation: Module, Masten, Kästen (Galerie-Gruppe „Installation“)
  { id: 'mgm', code: 'MGM', name: T('Meldegruppenmodul', 'Zone module'), color: '#9f1239', glyph: 'mgm', group: 'infra' },
  { id: 'mast', code: 'MA', name: T('Mast', 'Pole'), color: '#57534e', glyph: 'mast', group: 'infra' },
  { id: 'cabinet', code: 'SK', name: T('Schaltkasten', 'Control cabinet'), color: '#b45309', glyph: 'cabinet', group: 'infra' },
  { id: 'junction', code: 'AK', name: T('Anschlusskasten', 'Junction box'), color: '#78716c', glyph: 'junction', group: 'infra' },
  { id: 'rack', code: 'NS', name: T('Netzwerkschrank', 'Network rack'), color: '#1e293b', glyph: 'rack', group: 'infra' },
  // Fotostandort: wo ein Foto der Fotodokumentation aufgenommen wurde (Nummer = Foto, „F 3“)
  { id: 'photo', code: 'F', name: T('Fotostandort', 'Photo location'), color: '#0d9488', glyph: 'photo', fov: { angle: 60, range: 50 } },
  // Station einer Richtfunkstrecke: wird über „Richtfunk“ gesetzt, nicht einzeln in der Galerie
  { id: 'radio', code: 'RF', name: T('Richtfunk-Antenne', 'Radio link antenna'), color: '#0891b2', glyph: 'radio', link: true },
];

/** Farben für Zeichnungen, Zäune und Zonen (wie die Markierungsfarben in Vorschau). */
export const SHAPE_COLORS = [
  ['#1d4ed8', 'Blau'],
  ['#b91c1c', 'Rot'],
  ['#15803d', 'Grün'],
  ['#c2410c', 'Orange'],
  ['#7c3aed', 'Violett'],
  ['#0891b2', 'Türkis'],
  ['#475569', 'Grau'],
  ['#16181d', 'Schwarz'],
];

/** Zeichnungsarten: gerade Linie, Freihand, Zaun (geschlossen = Zone). */
export const SHAPE_TYPES = {
  line: T('Linie', 'Line'),
  free: T('Freihand', 'Freehand'),
  fence: T('Zaun', 'Fence'),
  zone: T('Zone', 'Zone'),
  dim: T('Maßlinie', 'Dimension'),
};

export const newShape = (type, pts, color = type === 'fence' ? '#15803d' : '#1d4ed8') => ({
  id: uid('z'),
  type,
  pts,
  closed: false,
  color,
  name: T('', ''),
  showLen: true,
});

/** Richtfunkstrecke: `from` = Station (bei Punkt-zu-Mehrpunkt die Basis), `to` = Gegenstellen. */
export const newLink = (mode, from, to = []) => ({ id: uid('l'), mode, from, to, band: '', ssid: '', key: '' });

/** Leerer Lageplan (Darstellung, Linienarten, Gerätefelder, Geräteliste nach den Vorgaben). */
export function newSite(presets = loadSitePresets()) {
  const d = presets.display;
  return {
    id: uid('s'),
    type: 'site',
    title: T('Lageplan', 'Site plan'),
    bg: { image: null, rotate: 0, fit: 'contain', fade: 0 },
    symbols: [],
    /** Eigene Symbolarten: { id, image (Bild) | null, name, code, color, glyph, fov, net }. */
    custom: [],
    /** Angepasste Standard-Symbole: Art → { code, color, name }. */
    kinds: copyJson(presets.kinds),
    /** Linien- und Flächenarten (Kabelweg, Sperrbereich …) für Zeichnungen. */
    styles: copyJson(presets.styles),
    /** Eigene Gerätefelder: { id, label, kinds ([] = alle) } – Werte am Symbol in `fields`. */
    fields: copyJson(presets.fields),
    /** Spalten der Geräteliste (null: bisherige Liste Nr., Typ, Bezeichnung, Bemerkung). */
    listCols: copyJson(presets.listCols),
    shapes: [],
    links: [],
    /** Maßstab: Bezugsstrecke a–b (Anteile der Planfläche) mit ihrer Länge in Metern, oder null. */
    scale: null,
    scaleBar: d.scaleBar,
    /** Plan ausdünnen: Art → 'faded' (blass) oder 'hidden' (aus); fehlt = normal. */
    thin: {},
    showNumbers: d.showNumbers,
    showList: d.showList,
    /** Bus/Adresse an den Symbolen im Plan („BM 3 · 1/12“) */
    showBus: d.showBus,
    photoSpotsInPdf: d.photoSpotsInPdf,
    /** Legende in der PDF: 'below' (unter dem Plan, sonst eigene Seite), 'page' oder 'none' */
    legend: d.legend,
  };
}

const copyJson = (v) => JSON.parse(JSON.stringify(v));

/* ---------- Lageplan: Kataloge und Vorgaben ---------- */

/** Linien- bzw. Flächenart für Zeichnungen: Name, Farbe, Linienstil, Stärke; `area` = für Zonen. */
export const newSiteStyle = (over = {}) => ({ id: uid('t'), name: T('Neue Linienart', 'New line type'), color: '#c2410c', dash: 'solid', width: 'normal', area: false, ...over });

export const DEFAULT_SITE_STYLES = () => [
  newSiteStyle({ id: 'tkabel', name: T('Kabelweg', 'Cable route'), color: '#c2410c' }),
  newSiteStyle({ id: 'trohr', name: T('Leerrohr (geplant)', 'Conduit (planned)'), color: '#475569', dash: 'dashed' }),
  newSiteStyle({ id: 'tsperr', name: T('Sperrbereich', 'Restricted area'), color: '#b91c1c', dash: 'dashed', area: true }),
  newSiteStyle({ id: 'tueberw', name: T('Überwachungsbereich', 'Monitored area'), color: '#1d4ed8', area: true }),
];

/** Eigenes Gerätefeld (z. B. „Kabel-Nr.“, „Montageart“): für alle Arten oder ausgewählte. */
export const newDeviceField = (over = {}) => ({ id: uid('f'), label: T('Neues Feld', 'New field'), kinds: [], ...over });

/** Spalten der Geräteliste: feste Breite in pt (Bemerkung: der Rest). Eigene Felder: 'f:<id>'. */
export const LIST_COLUMNS = { type: 106, name: 146, ip: 84, height: 58, note: 0 };
export const LIST_FIELD_W = 84;
export const defaultListCols = () => [
  { key: 'type', show: true, title: T('', '') },
  { key: 'name', show: true, title: T('', '') },
  { key: 'ip', show: false, title: T('', '') },
  { key: 'height', show: false, title: T('', '') },
  { key: 'note', show: true, title: T('', '') },
];

export const defaultSiteDisplay = () => ({ showNumbers: true, showList: true, showBus: false, scaleBar: true, photoSpotsInPdf: true, legend: 'below' });

/** Vorgaben für neue Lagepläne (Einstellungen › Vorgaben), wenn nichts eingestellt ist. */
export const defaultSitePresets = () => ({
  display: defaultSiteDisplay(),
  /** Standard-Symbole anpassen: Art → { code, color, name }. */
  kinds: {},
  /** In der Galerie ausgeblendete Standard-Symbole. */
  hidden: [],
  /** Eigene Symbolarten (Bild als { mime, data, w, h } oder Bildzeichen). */
  custom: [],
  styles: DEFAULT_SITE_STYLES(),
  fields: [],
  listCols: defaultListCols(),
});

const SITE_PRESETS_KEY = 'pdfix.presets.site';
const HEX6 = /^#[0-9a-f]{6}$/i;
const KEY_RE = /^[A-Za-z0-9_-]{1,64}$/;

/** Bildzeichen, die ein eigenes Symbol nutzen kann (die der Standard-Symbole). */
export const GLYPH_IDS = () => [...new Set(SYMBOLS.map((x) => x.glyph))];

function cleanKinds(raw) {
  const out = {};
  if (!raw || typeof raw !== 'object') return out;
  for (const k of SYMBOLS.map((x) => x.id)) {
    const o = raw[k];
    if (!o || typeof o !== 'object') continue;
    const e = {};
    const code = str_(o.code, 6).trim();
    if (code) e.code = code;
    if (HEX6.test(o.color || '')) e.color = o.color.toLowerCase();
    if (o.name && typeof o.name === 'object' && (str_(o.name.de).trim() || str_(o.name.en).trim())) e.name = T(str_(o.name.de, 60), str_(o.name.en, 60));
    if (Object.keys(e).length) out[k] = e;
  }
  return out;
}

function cleanStyles(list, ids = new Set()) {
  return (Array.isArray(list) ? list : [])
    .filter((t) => t && typeof t === 'object')
    .slice(0, 30)
    .map((t) => {
      let id = typeof t.id === 'string' && KEY_RE.test(t.id) && !ids.has(t.id) ? t.id : uid('t');
      while (ids.has(id)) id = uid('t');
      ids.add(id);
      return {
        id,
        name: toT(t.name),
        color: HEX6.test(t.color || '') ? t.color : '#c2410c',
        dash: oneOf(t.dash, ['solid', 'dashed', 'dotted'], 'solid'),
        width: oneOf(t.width, ['thin', 'normal', 'thick'], 'normal'),
        area: t.area === true,
      };
    });
}

function cleanFields(list, ids = new Set()) {
  const kinds = new Set(SYMBOLS.map((x) => x.id));
  return (Array.isArray(list) ? list : [])
    .filter((f) => f && typeof f === 'object')
    .slice(0, 12)
    .map((f) => {
      let id = typeof f.id === 'string' && KEY_RE.test(f.id) && !ids.has(f.id) ? f.id : uid('f');
      while (ids.has(id)) id = uid('f');
      ids.add(id);
      const label = f.label && typeof f.label === 'object' ? T(str_(f.label.de, 40), str_(f.label.en, 40)) : T(str_(f.label, 40), '');
      return { id, label, kinds: (Array.isArray(f.kinds) ? f.kinds : []).filter((k) => typeof k === 'string' && (kinds.has(k) || k === 'custom')).slice(0, 40) };
    });
}

/** Spalten der Geräteliste prüfen: bekannte und eigene Felder; fehlende hinten an (eigene aus). */
export function cleanListCols(list, fields) {
  if (!Array.isArray(list)) return null;
  const allowed = new Set([...Object.keys(LIST_COLUMNS), ...fields.map((f) => 'f:' + f.id)]);
  const out = [];
  for (const c of list) {
    if (!c || typeof c !== 'object' || !allowed.has(c.key) || out.some((x) => x.key === c.key)) continue;
    const title = c.title && typeof c.title === 'object' ? T(str_(c.title.de, 40), str_(c.title.en, 40)) : T('', '');
    out.push({ key: c.key, show: c.show !== false, title });
  }
  for (const c of defaultListCols()) if (!out.some((x) => x.key === c.key)) out.splice(c.key === 'note' ? out.length : Math.max(0, out.length - 1), 0, c);
  for (const f of fields) if (!out.some((x) => x.key === 'f:' + f.id)) out.splice(Math.max(0, out.findIndex((x) => x.key === 'note')), 0, { key: 'f:' + f.id, show: false, title: T('', '') });
  return out;
}

const PRESET_IMAGE_RE = /^data:image\/(png|jpeg|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;

/** Eigene Symbolart prüfen; `image`: Kennung eines Bilds (Dokument) bzw. das Bild (Vorgaben). */
function cleanCustom(c, imageOk) {
  return {
    name: toT(c.name),
    code: str_(c.code, 6).trim() || 'ES',
    color: HEX6.test(c.color || '') ? c.color : '#475569',
    glyph: GLYPH_IDS().includes(c.glyph) ? c.glyph : '',
    fov: c.fov === true,
    net: c.net === true,
    image: imageOk(c.image),
  };
}

export function cleanSitePresets(raw) {
  const d = defaultSitePresets();
  const r = raw && typeof raw === 'object' ? raw : {};
  const disp = r.display && typeof r.display === 'object' ? r.display : {};
  const fields = Array.isArray(r.fields) ? cleanFields(r.fields) : d.fields;
  const ids = new Set();
  const img = (v) => (v && typeof v === 'object' && typeof v.data === 'string' && PRESET_IMAGE_RE.test(v.data) && v.w > 0 && v.h > 0 ? { mime: str_(v.mime, 40), data: v.data, w: Number(v.w), h: Number(v.h) } : null);
  return {
    display: {
      showNumbers: typeof disp.showNumbers === 'boolean' ? disp.showNumbers : true,
      showList: typeof disp.showList === 'boolean' ? disp.showList : true,
      showBus: disp.showBus === true,
      scaleBar: typeof disp.scaleBar === 'boolean' ? disp.scaleBar : true,
      photoSpotsInPdf: typeof disp.photoSpotsInPdf === 'boolean' ? disp.photoSpotsInPdf : true,
      legend: oneOf(disp.legend, ['below', 'page', 'none'], 'below'),
    },
    kinds: cleanKinds(r.kinds),
    hidden: (Array.isArray(r.hidden) ? r.hidden : []).filter((k) => SYMBOLS.some((x) => x.id === k && !x.link)),
    custom: (Array.isArray(r.custom) ? r.custom : [])
      .filter((c) => c && typeof c === 'object')
      .slice(0, 40)
      .map((c) => {
        let id = typeof c.id === 'string' && KEY_RE.test(c.id) && !ids.has(c.id) ? c.id : uid('u');
        while (ids.has(id)) id = uid('u');
        ids.add(id);
        return { id, ...cleanCustom(c, img) };
      }),
    styles: Array.isArray(r.styles) ? cleanStyles(r.styles) : d.styles,
    fields,
    listCols: cleanListCols(Array.isArray(r.listCols) ? r.listCols : d.listCols, fields),
  };
}

export function loadSitePresets() {
  try {
    const raw = JSON.parse(localStorage.getItem(SITE_PRESETS_KEY) || 'null');
    if (raw) return cleanSitePresets(raw);
  } catch {}
  return defaultSitePresets();
}

export function saveSitePresets(presets) {
  try {
    localStorage.setItem(SITE_PRESETS_KEY, JSON.stringify(cleanSitePresets(presets)));
    return true;
  } catch {
    return false;
  }
}

export function resetSitePresets() {
  try {
    localStorage.removeItem(SITE_PRESETS_KEY);
  } catch {}
}

/**
 * Fehlendes aus den Vorgaben in einen Lageplan übernehmen: eigene Symbolarten (Bilder kommen zu
 * `images`), Linienarten, Gerätefelder (je nach Name), angepasste Standard-Symbole (nur, wo der
 * Plan nichts Eigenes hat). Liefert die Zahl der ergänzten Einträge.
 */
export function mergeSitePresets(site, presets, images) {
  let added = 0;
  const same = (a, b) => (tx(a, 'de') || '').trim().toLowerCase() === (tx(b, 'de') || '').trim().toLowerCase();
  site.custom ||= [];
  site.styles ||= [];
  site.fields ||= [];
  site.kinds ||= {};
  for (const c of presets.custom) {
    if (site.custom.some((x) => x.id === c.id || (same(x.name, c.name) && x.code === c.code))) continue;
    let image = null;
    if (c.image) {
      image = uid('img');
      images[image] = copyJson(c.image);
    }
    site.custom.push({ ...copyJson(c), id: site.custom.some((x) => x.id === c.id) ? uid('u') : c.id, image });
    added++;
  }
  for (const t of presets.styles) {
    if (site.styles.some((x) => x.id === t.id || same(x.name, t.name))) continue;
    site.styles.push(copyJson(t));
    added++;
  }
  for (const f of presets.fields) {
    if (site.fields.some((x) => x.id === f.id || same(x.label, f.label))) continue;
    site.fields.push(copyJson(f));
    if (site.listCols) site.listCols = cleanListCols(site.listCols, site.fields);
    added++;
  }
  for (const [k, v] of Object.entries(presets.kinds))
    if (!site.kinds[k]) {
      site.kinds[k] = copyJson(v);
      added++;
    }
  return added;
}

/** Linien- bzw. Flächenart einer Zeichnung (oder null). */
export const shapeStyle = (site, z) => (z.style && (site.styles || []).find((t) => t.id === z.style)) || null;

/** Eigene Felder, die zu einer Symbolart gehören. */
export const fieldsFor = (site, kind) =>
  (site.fields || []).filter((f) => !f.kinds.length || f.kinds.includes(kind) || (f.kinds.includes('custom') && String(kind).startsWith('custom:')));

/** Netzwerkgerät (Zugangsdaten)? Standard-Arten nach Liste, eigene nach Einstellung. */
export function isNetSymbol(site, kind) {
  if (NET_KINDS.includes(kind)) return true;
  const id = typeof kind === 'string' && kind.startsWith('custom:') ? kind.slice(7) : null;
  return !!(id && site && (site.custom || []).some((c) => c.id === id && c.net));
}

/** Neues Symbol an der Stelle (x, y) – Anteile der Planfläche (0–1). */
export function newSymbol(kind, x = 0.5, y = 0.5, site = null) {
  const info = site ? symbolInfo(site, kind) : SYMBOLS.find((s) => s.id === kind);
  return {
    id: uid('y'),
    kind,
    x,
    y,
    name: T('', ''),
    note: T('', ''),
    ip: '',
    scale: 1,
    fov: !!(info && info.fov),
    dir: 0,
    angle: info && info.fov ? info.fov.angle : 90,
    range: info && info.fov ? info.fov.range : 60,
    ...(kind === 'mgm' ? { groups: 2 } : {}),
  };
}

/** Eigenes Symbol (Bild aus `project.images`). */
export const newCustomSymbol = (image = null, over = {}) => ({ id: uid('u'), image, name: T('Eigenes Symbol', 'Custom symbol'), code: 'ES', color: '#475569', glyph: '', fov: false, net: false, ...over });

/** Angaben zu einem Symbolart: { code, name, color, glyph, fov, image } oder null. */
export function symbolInfo(site, kind) {
  const base = SYMBOLS.find((s) => s.id === kind);
  if (base) {
    // angepasst (Kürzel, Farbe, Name) – je Lageplan
    const own = site && site.kinds && site.kinds[kind];
    return own ? { ...base, ...own } : base;
  }
  const id = typeof kind === 'string' && kind.startsWith('custom:') ? kind.slice(7) : null;
  const custom = id && site.custom.find((c) => c.id === id);
  if (!custom) return null;
  return {
    code: custom.code || 'ES',
    name: custom.name,
    color: custom.color || '#475569',
    glyph: custom.glyph || null,
    image: custom.image || null,
    fov: custom.fov ? { angle: 90, range: 60 } : null,
    custom: true,
  };
}

/**
 * Symbole einer Art in Nummernfolge. `seq` (gesetzt beim Ändern der Nummer oder „Neu
 * nummerieren“) bestimmt die Folge; Symbole ohne `seq` (neu gesetzt) kommen danach in der
 * Reihenfolge der Liste. Die Liste selbst bleibt die Zeichenreihenfolge.
 */
/**
 * Kürzel für die Nummer: das der Art; beim Meldegruppenmodul mit der Zahl der Meldegruppen
 * („MGM-2“ → MGM-2-1, MGM-2-2 …; jeder Typ zählt für sich).
 */
export function symbolCode(site, sym) {
  const info = symbolInfo(site, sym.kind);
  // Fotostandorte zählen nicht mit: ihre Nummer ist die des Fotos (photoLabels)
  if (!info || sym.kind === 'photo') return null;
  return sym.kind === 'mgm' ? `MGM-${sym.groups || 2}` : info.code;
}

/** Trenner zwischen Kürzel und Nummer: „K 1“, aber „MGM-2-1“. */
export const codeSep = (code) => (code.startsWith('MGM-') ? '-' : ' ');

function numberedGroups(site) {
  const groups = new Map();
  site.symbols.forEach((sym, i) => {
    const code = symbolCode(site, sym);
    if (!code) return;
    if (!groups.has(code)) groups.set(code, []);
    groups.get(code).push({ sym, key: Number.isInteger(sym.seq) ? sym.seq : 1e6 + i, i });
  });
  for (const list of groups.values()) list.sort((a, b) => a.key - b.key || a.i - b.i);
  return new Map([...groups].map(([code, list]) => [code, list.map((e) => e.sym)]));
}

/**
 * Bei mehreren Lageplänen zählen die Nummern durch: Anzahl je Kürzel in den Plänen davor
 * (Reihenfolge der Projektmappe). Ohne Projekt beginnt jeder Plan bei 1.
 */
function codeOffsets(site, project) {
  const out = new Map();
  if (!project) return out;
  for (const s of project.sections) {
    if (s === site) break;
    if (s.type === 'site') for (const [code, list] of numberedGroups(s)) out.set(code, (out.get(code) || 0) + list.length);
  }
  return out;
}

/** Nummern der Symbole: Kennung → „K 1“ (je Kürzel lückenlos, über alle Lagepläne durchgehend). */
/** `forPdf`: nur Fotos zählen, die in die fertige PDF kommen. */
export function symbolLabels(site, project = null, forPdf = false) {
  const off = codeOffsets(site, project);
  const out = new Map();
  for (const [code, list] of numberedGroups(site)) list.forEach((sym, i) => out.set(sym.id, `${code}${codeSep(code)}${(off.get(code) || 0) + i + 1}`));
  if (site.symbols.some((y) => y.kind === 'photo')) {
    const nums = photoNumbers(project, forPdf);
    for (const y of site.symbols) if (y.kind === 'photo') out.set(y.id, photoLabel(nums.get(y.id)));
  }
  return out;
}

/** Nummern der Fotos je verknüpftem Symbol: Kennung → [3, 4] (wie in der Fotodokumentation). */
export function photoNumbers(project, forPdf = false) {
  const out = new Map();
  for (const s of project ? project.sections : [])
    if (s.type === 'photos' && !(forPdf && s.inPdf === false)) s.items.forEach((p, i) => p.link && (out.get(p.link) || out.set(p.link, []).get(p.link)).push(i + 1));
  return out;
}

/** „F 3“, „F 3, 5“, „F 3–5“; ohne Foto nur „F“. */
function photoLabel(list) {
  if (!list || !list.length) return 'F';
  list = [...new Set(list)].sort((a, b) => a - b);
  const parts = [];
  for (let i = 0; i < list.length; i++) {
    let j = i;
    while (j + 1 < list.length && list[j + 1] === list[j] + 1) j++;
    parts.push(j > i + 1 ? `${list[i]}–${list[j]}` : j === i + 1 ? `${list[i]}, ${list[j]}` : `${list[i]}`);
    i = j;
  }
  return `F ${parts.join(', ')}`;
}

/** Alle Symbole in Nummernfolge (je Art zusammen, Arten in der Reihenfolge ihres ersten Auftretens). */
export function symbolsInOrder(site) {
  return [...numberedGroups(site).values()].flat();
}

/**
 * Nummer eines Symbols: { code, n, first, last } – `n` wie im Plan (durchgehend), `first`/`last`
 * der Bereich dieser Art in diesem Plan; oder null.
 */
export function symbolNumber(site, sym, project = null) {
  const code = symbolCode(site, sym);
  const list = code && numberedGroups(site).get(code);
  if (!list) return null;
  const off = codeOffsets(site, project).get(code) || 0;
  return { code, sep: codeSep(code), n: off + list.indexOf(sym) + 1, first: off + 1, last: off + list.length, count: list.length };
}

/** Nummer ändern: das Symbol rückt an Stelle `n`, die übrigen rücken nach (lückenlos). */
export function setSymbolNumber(site, sym, n) {
  const list = numberedGroups(site).get(symbolCode(site, sym));
  if (!list) return;
  list.splice(list.indexOf(sym), 1);
  list.splice(Math.max(0, Math.min(list.length, Math.round(n) - 1)), 0, sym);
  list.forEach((y, i) => (y.seq = i));
}

/** Nach Wechsel von Art oder Typ: in der neuen Gruppe hinten anstellen. */
export function appendToGroup(site, sym) {
  delete sym.seq;
  const list = numberedGroups(site).get(symbolCode(site, sym));
  if (!list) return;
  list.splice(list.indexOf(sym), 1);
  list.push(sym);
  list.forEach((y, i) => (y.seq = i));
}

/**
 * Alle Arten neu nummerieren nach Lage im Plan: zeilenweise von oben nach unten, in der Zeile
 * von links nach rechts (Symbole mit kaum unterschiedlicher Höhe gelten als eine Zeile).
 */
export function renumberByPosition(site, row = 0.06) {
  for (const list of numberedGroups(site).values()) {
    const sorted = [...list].sort((a, b) => a.y - b.y);
    const rows = [];
    for (const y of sorted) {
      const last = rows.at(-1);
      if (last && y.y - last[0].y < row) last.push(y);
      else rows.push([y]);
    }
    rows.flatMap((r) => r.sort((a, b) => a.x - b.x)).forEach((y, i) => (y.seq = i));
  }
}

/* ---------- Lageplan ↔ Zugangsdaten ---------- */

/** Symbolarten mit Netzwerkzugang: erscheinen automatisch in „Zugangsdaten › Geräte-Zugänge“. */
export const NET_KINDS = ['camera', 'recorder', 'radio', 'router', 'ap', 'intercom', 'access', 'panel'];

/** Melder und Teilnehmer der Alarmanlage: Bus, Adresse, Meldegruppe und Bereich (auch eigene Symbole). */
export const BUS_KINDS = ['motion', 'smoke', 'contact', 'glass', 'barrier', 'siren', 'keypad', 'keyswitch', 'access', 'opener'];
export const isBusKind = (kind) => BUS_KINDS.includes(kind) || String(kind).startsWith('custom:');

/** Arten mit Montagehöhe. */
export const isHeightKind = (kind) => kind === 'camera' || kind === 'mast' || kind === 'radio' || kind === 'ap' || isBusKind(kind);

/** Montage- und Anschlussangaben eines Symbols (Texte; leer = nicht angegeben). */
export const SYMBOL_DETAILS = { bus: 20, addr: 20, group: 40, area: 60, channel: 10, height: 20 };

/** Angaben, die zur (neuen) Art nicht passen, entfernen: Bus-Felder nur bei Meldern, Rekorder nur bei Kameras. */
export function dropDetails(y) {
  if (!isBusKind(y.kind)) for (const k of ['bus', 'addr', 'group', 'area']) delete y[k];
  if (y.kind !== 'camera') for (const k of ['nvr', 'channel']) delete y[k];
  if (!isHeightKind(y.kind)) delete y.height;
}

/** Anzeigename eines Symbols: eigene Bezeichnung, sonst „K 1 Kamera“. */
function symbolName(site, sym, labels) {
  const info = symbolInfo(site, sym.kind);
  const own = sym.name || T('', '');
  const fallback = (lang) => [labels.get(sym.id), info ? tx(info.name, lang) : ''].filter(Boolean).join(' ');
  return { de: own.de || fallback('de'), en: own.en || (own.de ? '' : fallback('en')) };
}

/** Zugangsdaten-Eintrag eines Symbols (über alle Abschnitte) oder null. */
export function deviceOf(project, symId) {
  for (const s of project.sections) if (s.type === 'access') for (const d of s.devices) if (d.sym === symId) return d;
  return null;
}

/** WLAN-Eintrag einer Richtfunkstrecke oder null. */
export function wifiOf(project, linkId) {
  for (const s of project.sections) if (s.type === 'access') for (const w of s.wifi) if (w.link === linkId) return w;
  return null;
}

/**
 * Hält Lageplan und Zugangsdaten gleich (läuft nach jeder Änderung): Jedes Netzwerkgerät im
 * Lageplan hat einen Eintrag unter „Geräte-Zugänge“ (Name folgt dem Symbol), jede Richtfunkstrecke
 * mit SSID oder Schlüssel einen WLAN-Eintrag. Fehlt der Abschnitt Zugangsdaten, wird er angelegt.
 * Verschwindet ein Symbol, bleibt sein Eintrag als gewöhnliches Gerät erhalten (keine Daten gehen
 * verloren); gelöscht wird er mit dem Symbol über die Oberfläche.
 */
/**
 * Hat ein Geräte-Eintrag eigene Angaben? Name und Standort setzt der Lageplan selbst – sie zählen
 * nicht. Geräte aus dem Lageplan stehen erst mit eigenen Angaben in den Zugangsdaten.
 */
export function deviceHasData(d) {
  const t = (v) => (v && typeof v === 'object' ? `${v.de || ''}${v.en || ''}` : String(v || '')).trim();
  return (
    ['ip', 'web', 'user', 'password', 'role', 'note', 'model', 'serial', 'mac', 'firmware'].some((k) => t(d[k])) ||
    (d.users || []).some((u) => t(u.user) || t(u.password) || t(u.role))
  );
}

/**
 * Lageplan und Zugangsdaten abgleichen. Geräte aus dem Lageplan (Netzwerkgeräte) bekommen erst
 * einen Eintrag, wenn etwas eingetragen ist: `drafts` (Kennung des Symbols → Entwurf) hält die
 * Angaben bis dahin; ein Entwurf mit Angaben wird übernommen, ein Eintrag ohne Angaben entfernt.
 */
export function syncAccess(project, drafts = null, keep = null) {
  const sites = project.sections.filter((s) => s.type === 'site');
  const syms = [];
  const links = [];
  for (const site of sites) {
    const labels = symbolLabels(site, project);
    for (const y of site.symbols) if (isNetSymbol(site, y.kind)) syms.push({ y, name: symbolName(site, y, labels), site, labels });
    for (const l of site.links) if (l.ssid || l.key) links.push({ l, site, labels });
  }
  const symIds = new Set(syms.map((x) => x.y.id));
  // Entwürfe mit Angaben übernehmen
  const adopt = drafts ? [...drafts.values()].filter((d) => symIds.has(d.sym) && deviceHasData(d) && !deviceOf(project, d.sym)) : [];
  const wanted = adopt.length || links.length || syms.some(({ y }) => y.ip);
  let access = project.sections.find((s) => s.type === 'access');
  if (!access) {
    if (!wanted) return 0;
    access = newAccess();
    const last = project.sections.lastIndexOf(sites[sites.length - 1]);
    project.sections.splice(last + 1, 0, access);
  }
  // neue Einträge nach der Nummer einsortieren (die übrige Reihenfolge bleibt, auch selbst verschobene)
  const rank = new Map(sites.flatMap((site) => symbolsInOrder(site)).map((y, i) => [y.id, i]));
  const place = (d) => {
    const r = rank.get(d.sym) ?? Infinity;
    const at = access.devices.findIndex((x) => x.sym && rank.has(x.sym) && rank.get(x.sym) > r);
    access.devices.splice(at < 0 ? access.devices.length : at, 0, d);
  };
  for (const d of adopt) {
    place(d);
    drafts.delete(d.sym);
  }
  const all = project.sections.filter((s) => s.type === 'access');
  for (const s of all) for (const d of s.devices) if (d.sym && !symIds.has(d.sym)) d.sym = null;
  // Einträge aus dem Lageplan ohne eigene Angaben entfallen (der Entwurf bleibt für die Eingabe);
  // ein selbst eingetragener Standort (anders als der Titel des Lageplans) zählt als Angabe
  const siteOf = new Map(syms.map(({ y, site }) => [y.id, tx(site.title, 'de')]));
  const ownLocation = (d) => !!(d.location && d.location.de && d.location.de !== siteOf.get(d.sym));
  for (const s of all)
    s.devices = s.devices.filter((d) => {
      if (!d.sym || d.id === keep || deviceHasData(d) || ownLocation(d)) return true;
      if (drafts) drafts.set(d.sym, d);
      return false;
    });
  for (const { y, name, site } of syms) {
    let d = deviceOf(project, y.id);
    // frühere IP an der Antenne: Eintrag anlegen
    if (!d && y.ip) {
      d = { ...newDevice(), sym: y.id };
      place(d);
    }
    if (!d) continue;
    if (d.name.de !== name.de || d.name.en !== name.en) d.name = name;
    // frühere IP an der Antenne in den Eintrag übernehmen
    if (y.ip) {
      if (!d.ip) d.ip = y.ip;
      delete y.ip;
    }
    const where = tx(site.title, 'de');
    if (!d.location.de && where) d.location = { de: where, en: tx(site.title, 'en') === where ? '' : tx(site.title, 'en') };
  }
  const linkIds = new Set(links.map((x) => x.l.id));
  for (const s of all) s.wifi = s.wifi.filter((w) => !w.link || linkIds.has(w.link));
  for (const { l, labels } of links) {
    let w = wifiOf(project, l.id);
    if (!w) {
      const ends = [l.from, ...l.to].map((i) => labels.get(i)).filter(Boolean).join(l.mode === 'ptp' ? ' ↔ ' : ', ');
      w = { ...newWifi(), link: l.id, note: T(`Richtfunk ${ends}`, `Radio link ${ends}`) };
      access.wifi.push(w);
    }
    if (w.ssid !== l.ssid) w.ssid = l.ssid;
    if (w.key !== l.key) w.key = l.key;
  }
  return adopt.length;
}

/* ---------- Ansprechpartner und Wachschutz (Deckblatt) ---------- */

export const newContact = () => ({ id: uid('c'), name: '', role: '', phone: '', email: '' });
export const newGuard = () => ({ company: '', phone: '', customerNo: '', center: '' });

/* ---------- Fotodokumentation ---------- */

export const PHOTO_LAYOUTS = [1, 2, 4, 6];

export const newPhotos = () => ({
  id: uid('s'),
  type: 'photos',
  title: T('Fotodokumentation', 'Photo documentation'),
  perPage: 4,
  showDate: true,
  inPdf: true,
  items: [],
});

export const newPhoto = (image, date = '') => ({ id: uid('f'), image, caption: T('', ''), date, link: null });

/** Alle Symbole des Projekts mit ihrer Nummer: [{ id, label, name, section }] (für Fotoverknüpfungen). */
export function projectSymbols(project, lang = 'de') {
  const out = [];
  for (const s of project.sections) {
    if (s.type !== 'site') continue;
    const labels = symbolLabels(s, project);
    for (const sym of s.symbols) {
      const info = symbolInfo(s, sym.kind);
      if (!info) continue;
      out.push({ id: sym.id, label: labels.get(sym.id), name: tx(sym.name, lang) || tx(info.name, lang), section: s.id });
    }
  }
  return out;
}

/** Ohne Verweis verwendete Bilder entfernen (z. B. ersetzte Hintergründe, entfernte Fotos). */
export function pruneImages(project) {
  const used = new Set();
  const text = JSON.stringify({ ...project, images: undefined });
  for (const id of Object.keys(project.images || {})) if (text.includes(`"${id}"`)) used.add(id);
  const images = {};
  for (const id of used) images[id] = project.images[id];
  return { ...project, images };
}

/** Hat ein Abschnitt keinen Inhalt? (leere Abschnitte bleiben in der fertigen PDF weg) */
export function isEmptySection(section) {
  if (section.type === 'wiring') return !section.boxes.length && !section.hub.pins.length && !section.hints.length;
  if (section.type === 'access')
    return (
      !section.devices.length &&
      !section.wifi.length &&
      !section.remote.length &&
      !Object.entries(section.network).some(([, v]) => (typeof v === 'object' ? tx(v) : String(v || '').trim()))
    );
  if (section.type === 'site') return !section.symbols.length && !section.bg.image && !section.shapes.length;
  if (section.type === 'photos') return !section.items.length;
  if (section.type === 'chapters') return !section.blocks.length;
  return false;
}

/* ---------- Anleitung / Technische Beschreibung ---------- */

/** Bausteine eines Kapitels (`preset` = Tabelle mit vorbelegter Kopfzeile). */
export const BLOCK_TYPES = [
  { id: 'h', label: 'Überschrift', icon: 'text' },
  { id: 'p', label: 'Absatz', icon: 'al' },
  { id: 'ul', label: 'Aufzählung', icon: 'list' },
  { id: 'steps', label: 'Handlungsschritte', icon: 'pnum' },
  { id: 'callout', label: 'Hinweis / Warnung', icon: 'warn' },
  { id: 'figure', label: 'Abbildung', icon: 'image' },
  { id: 'figsteps', label: 'Abbildung mit Schritten', icon: 'pages' },
  { id: 'cards', label: 'Schritte mit Fotos', icon: 'image', manual: true },
  { id: 'signs', label: 'Zeichenerklärung', icon: 'info', manual: true },
  { id: 'table', label: 'Tabelle', icon: 'field' },
  { id: 'faults', label: 'Störungstabelle', icon: 'field', table: true },
  { id: 'parts', label: 'Positionsliste', icon: 'field', table: true },
  { id: 'scope', label: 'Lieferumfang', icon: 'field', table: true },
  { id: 'code', label: 'Codeblock', icon: 'edit' },
  { id: 'formula', label: 'Formel', icon: 'text' },
];

/** Tonarten der Hinweiskästen (Farben wie im Anschlussplan). */
export const TONES = [
  { id: 'note', color: '#2e6e8e' },
  { id: 'warn', color: '#b45309' },
  { id: 'danger', color: '#b91c1c' },
  { id: 'open', color: '#6b7280' },
];

/** Kopfzeilen und Spaltenbreiten der Tabellenvorlagen. */
const TABLE_PRESETS = {
  faults: { head: ['Störung', 'Mögliche Ursache', 'Abhilfe'], en: ['Fault', 'Cause', 'Remedy'], weights: [1.1, 1.4, 1.6] },
  parts: { head: ['Pos.', 'Bezeichnung'], en: ['Item', 'Designation'], weights: [0.5, 4] },
  scope: { head: ['Menge', 'Bezeichnung'], en: ['Quantity', 'Item'], weights: [0.6, 4] },
  table: { head: ['Spalte 1', 'Spalte 2'], en: ['Column 1', 'Column 2'], weights: [1, 1] },
};

export function newBlock(type, extra = {}) {
  const id = uid('k');
  if (type === 'h') return { id, type, level: 1, text: T('', ''), ...extra };
  if (type === 'p' || type === 'ul') return { id, type, text: T('', ''), ...extra };
  if (type === 'steps') return { id, type, text: T('', ''), ...extra };
  if (type === 'callout') return { id, type, tone: 'note', title: T('', ''), text: T('', ''), ...extra };
  if (type === 'figure') return { id, type, image: null, caption: T('', ''), width: 'full', marks: [], legend: true, aside: { title: T('', ''), text: T('', '') }, ...extra };
  if (type === 'cards') return { id, type, items: [newCard(), newCard()], ...extra };
  if (type === 'signs') return { id, type, ...extra };
  if (type === 'figsteps') return { id, type, image: null, caption: T('', ''), text: T('', ''), ...extra };
  if (type === 'code') return { id, type, text: '', ...extra };
  if (type === 'formula') return { id, type, text: '', ...extra };
  const preset = TABLE_PRESETS[type] || TABLE_PRESETS.table;
  return {
    id,
    type: 'table',
    preset: type,
    caption: T('', ''),
    head: [...preset.head],
    rows: [preset.head.map(() => '')],
    weights: [...preset.weights],
    en: { head: [...(preset.en || preset.head.map(() => ''))], rows: [preset.head.map(() => '')] },
    ...extra,
  };
}

/** Position auf einer Abbildung: Punkt (Anteile des Bildes), Kreis links/rechts, Bauteil und Beschreibung. */
export const newMark = (x = 0.5, y = 0.5) => ({ id: uid('m'), x, y, side: 'auto', ly: null, name: T('', ''), desc: T('', '') });

/** Karte der „Schritte mit Fotos“: Foto, Titel, Text. */
export const newCard = () => ({ id: uid('c'), image: null, title: T('', ''), text: T('', ''), fill: false });

/** Angaben des Deckblatts im Stil „Bedienungsanleitung“ (Titel = Projekttitel, Logo = Firmenlogo). */
export const newManualMeta = () => ({
  kicker: T('Bedienungsanleitung', 'Operating instructions'),
  subtitle: T('', ''),
  cover: null,
  modelLabel: T('Ausführung', 'Model'),
  model: '',
  note: T('Technische Änderungen vorbehalten.', 'Subject to technical modifications.'),
  version: '',
  date: '',
  accent: '#0c4061',
  accent2: '#0c4061',
});

export function newChapters(kind = 'manual') {
  return {
    id: uid('s'),
    type: 'chapters',
    kind,
    title: kind === 'tech' ? T('Technische Beschreibung', 'Technical description') : T('Bedienungsanleitung', 'User manual'),
    numbering: true,
    blocks: [],
  };
}

/**
 * Startinhalt der Bedienungsanleitung im Stil des Vorbilds: Sicherheit (Zeichenerklärung,
 * Sicherheitshinweise, Verwendung), Geräteübersicht mit Lieferumfang, Bedienung, Störungen.
 * Alle Texte sind neutrale Platzhalter.
 */
export function starterManual() {
  const s = newChapters('manual');
  const h = (de, en, level = 1) => newBlock('h', { level, text: T(de, en) });
  const ul = (de, en) => newBlock('ul', { text: T(de, en) });
  s.blocks = [
    h('Sicherheit', 'Safety'),
    h('Hinweise in dieser Anleitung', 'Notices in this manual', 2),
    newBlock('signs'),
    h('Sicherheitshinweise', 'Safety instructions', 2),
    newBlock('callout', {
      tone: 'danger',
      text: T('Beschreiben Sie hier die wichtigste Gefahr und wie man sie vermeidet.', 'Describe the most important hazard here and how to avoid it.'),
    }),
    ul('Erster Sicherheitshinweis.\nZweiter Sicherheitshinweis.', 'First safety instruction.\nSecond safety instruction.'),
    h('Bestimmungsgemäße Verwendung', 'Intended use', 2),
    ul('Wofür das Gerät bestimmt ist.\nWofür es nicht verwendet werden darf.', 'What the device is intended for.\nWhat it must not be used for.'),
    h('Geräteübersicht und Lieferumfang', 'Overview and items supplied'),
    newBlock('figure', { caption: T('Gerät, Gesamtansicht', 'Device, overall view') }),
    h('Lieferumfang', 'Items supplied', 2),
    newBlock('scope', { rows: [['1 ×', 'Gerät'], ['1 ×', 'Bedienungsanleitung']], en: { head: ['Quantity', 'Item'], rows: [['', 'Device'], ['', 'Operating instructions']] } }),
    h('Inbetriebnahme', 'Getting started'),
    newBlock('cards'),
    h('Störungen beheben', 'Troubleshooting'),
    newBlock('faults', { en: { head: ['Fault', 'Cause', 'Remedy'], rows: [['', '', '']] } }),
  ];
  return s;
}

/** Startinhalt der Vorlagen „Bedienungsanleitung“ und „Technische Beschreibung“. */
export function starterChapters(kind) {
  const s = newChapters(kind);
  const h = (de, en, level = 1) => newBlock('h', { level, text: T(de, en) });
  const p = (de, en = '') => newBlock('p', { text: T(de, en) });
  if (kind === 'tech') {
    s.blocks = [
      h('Aufgabe und Einsatz', 'Purpose and use'),
      p('Hier beschreiben: wofür die Anlage gebaut wurde und wo sie eingesetzt wird.'),
      h('Aufbau', 'Design'),
      p('Hauptkomponenten und ihr Zusammenspiel.'),
      newBlock('table', { preset: 'table', head: ['Komponente', 'Typ', 'Bemerkung'], rows: [['', '', '']], weights: [1.2, 1.2, 2] }),
      h('Funktionsbeschreibung', 'Functional description'),
      p('Ablauf und Betriebszustände.'),
      newBlock('callout', { tone: 'open', title: T('Offene Punkte', 'Open items'), text: T('Noch zu klären oder nachzureichen.', '') }),
    ];
  } else {
    s.blocks = [
      h('Zu dieser Anleitung', 'About this manual'),
      p('Kurz erklären, für wen die Anleitung ist und was sie beschreibt.'),
      h('Sicherheitshinweise', 'Safety'),
      newBlock('callout', { tone: 'danger', text: T('Hier die wichtigsten Warnhinweise nennen.', 'List the most important warnings here.') }),
      h('Bedienung', 'Operation'),
      newBlock('steps', { text: T('Erster Schritt\nZweiter Schritt\nDritter Schritt', '') }),
      h('Störungen', 'Troubleshooting'),
      newBlock('faults'),
    ];
  }
  return s;
}

/* ---------- Zugangsdaten ---------- */

/**
 * Tabellen der Zugangsdaten mit ihren Spalten: `w` = Breitenanteil, `mono` = Festbreitenschrift
 * (IP, MAC, Passwörter), `secret` = wird ausgeblendet, wenn Passwörter nicht mit in die PDF sollen,
 * `bi` = zweisprachiger Text, `fixed` = Spalte immer sichtbar.
 */
export const ACCESS_BLOCKS = [
  {
    id: 'devices',
    list: 'devices',
    title: T('Geräte-Zugänge', 'Device access'),
    columns: [
      { key: 'name', label: T('Gerät', 'Device'), w: 3, bi: true, bold: true, fixed: true },
      { key: 'ip', label: T('IP-Adresse', 'IP address'), w: 2.3, mono: true },
      { key: 'web', label: T('Port / Web', 'Port / web'), w: 2.2, mono: true },
      { key: 'user', label: T('Benutzer', 'User'), w: 1.9, mono: true },
      { key: 'password', label: T('Passwort', 'Password'), w: 2.1, mono: true, secret: true },
      { key: 'role', label: T('Rolle', 'Role'), w: 1.6 },
      { key: 'note', label: T('Bemerkung', 'Remark'), w: 3, bi: true },
    ],
  },
  {
    id: 'hardware',
    list: 'devices',
    title: T('Gerätedaten', 'Device data'),
    columns: [
      { key: 'name', label: T('Gerät', 'Device'), w: 3, bi: true, bold: true, fixed: true },
      { key: 'model', label: T('Hersteller / Typ', 'Make / model'), w: 3 },
      { key: 'serial', label: T('Seriennummer', 'Serial number'), w: 2.4, mono: true },
      { key: 'mac', label: T('MAC-Adresse', 'MAC address'), w: 2.7, mono: true },
      { key: 'firmware', label: T('Firmware', 'Firmware'), w: 1.8, mono: true },
      { key: 'location', label: T('Standort', 'Location'), w: 2.4, bi: true },
    ],
  },
  {
    id: 'network',
    title: T('Netzwerk', 'Network'),
    fields: [
      { key: 'subnet', label: T('Subnetzmaske', 'Subnet mask'), mono: true },
      { key: 'gateway', label: T('Gateway', 'Gateway'), mono: true },
      { key: 'dns', label: T('DNS-Server', 'DNS server'), mono: true },
      { key: 'dhcp', label: T('DHCP-Bereich', 'DHCP range'), mono: true },
      { key: 'vlan', label: T('VLAN', 'VLAN'), mono: true },
      { key: 'note', label: T('Bemerkung', 'Remark'), bi: true },
    ],
  },
  {
    id: 'wifi',
    list: 'wifi',
    title: T('WLAN', 'Wi-Fi'),
    columns: [
      { key: 'ssid', label: T('WLAN-Name (SSID)', 'Network name (SSID)'), w: 3, bold: true, fixed: true },
      { key: 'key', label: T('Schlüssel', 'Key'), w: 3, mono: true, secret: true },
      { key: 'security', label: T('Verschlüsselung', 'Security'), w: 2 },
      { key: 'note', label: T('Bemerkung', 'Remark'), w: 3, bi: true },
    ],
  },
  {
    id: 'remote',
    list: 'remote',
    title: T('Fernzugriff', 'Remote access'),
    columns: [
      { key: 'service', label: T('Dienst', 'Service'), w: 2.6, bold: true, fixed: true },
      { key: 'address', label: T('Adresse / ID', 'Address / ID'), w: 3.2, mono: true },
      { key: 'user', label: T('Benutzer', 'User'), w: 1.9, mono: true },
      { key: 'password', label: T('Passwort', 'Password'), w: 2.1, mono: true, secret: true },
      { key: 'note', label: T('Bemerkung', 'Remark'), w: 3, bi: true },
    ],
  },
];

/** Neue Zugangsdaten nach den Vorgaben (sonst: alle Bereiche außer „Netzwerk“, Passwörter ausgeblendet). */
export function newAccess(presets = loadAccessPresets()) {
  return {
    id: uid('s'),
    type: 'access',
    title: T('Zugangsdaten', 'Access data'),
    showPasswords: presets.showPasswords,
    blocks: { ...presets.blocks },
    /** Spalten je Tabelle: Reihenfolge, ein/aus, eigene Überschrift (leere Spalten entfallen ohnehin). */
    cols: JSON.parse(JSON.stringify(presets.cols)),
    devices: [],
    network: { subnet: '', gateway: '', dns: '', dhcp: '', vlan: '', note: T('', '') },
    wifi: [],
    remote: [],
  };
}

export const newDevice = () => ({
  id: uid('d'),
  /** Verknüpftes Gerät im Lageplan (Kennung des Symbols) oder null. */
  sym: null,
  name: T('', ''),
  ip: '',
  web: '',
  user: '',
  password: '',
  role: '',
  /** Weitere Benutzer: [{ id, user, password, role }] (der erste steht in user/password/role). */
  users: [],
  note: T('', ''),
  model: '',
  serial: '',
  mac: '',
  firmware: '',
  location: T('', ''),
});

export const newWifi = () => ({ id: uid('w'), link: null, ssid: '', key: '', security: 'WPA2', note: T('', '') });

export const newUser = () => ({ id: uid('n'), user: '', password: '', role: '' });

/** Rollen zur Auswahl (frei änderbar; eigene Liste in den Vorgaben). */
export const ROLES = ['Administrator', 'Errichter', 'Bediener', 'Nur ansehen', 'Wartung'];
/** Verschlüsselung eines WLANs (Auswahl). */
export const WIFI_SECURITY = ['WPA2', 'WPA3', 'WPA2/WPA3', 'WPA', 'WEP', 'Offen'];
/** Dienste für den Fernzugriff (Vorschläge, frei eingebbar). */
export const REMOTE_SERVICES = ['DDNS', 'Portfreigabe', 'VPN', 'Hersteller-Cloud', 'Hik-Connect', 'DMSS (Dahua)', 'TeamViewer', 'AnyDesk', 'Fernwartung', 'Weboberfläche'];

/** Tabellen der Zugangsdaten (Bereiche mit Spalten). */
export const ACCESS_TABLES = () => ACCESS_BLOCKS.filter((b) => b.columns);

/** Spalten je Tabelle; `hide` (ältere Dokumente): ausgeblendete Spalten. */
export const defaultAccessCols = (hide = { hardware: ['location'] }) =>
  Object.fromEntries(
    ACCESS_TABLES().map((b) => {
      const hidden = Array.isArray(hide[b.id]) ? hide[b.id] : [];
      return [b.id, b.columns.map((c) => ({ key: c.key, show: !!c.fixed || !hidden.includes(c.key), title: T('', '') }))];
    }),
  );

/** Spalten prüfen: bekannte in gewählter Reihenfolge, fehlende hinten an, feste immer sichtbar. */
export function cleanAccessCols(raw, hide) {
  const d = defaultAccessCols(hide && typeof hide === 'object' ? hide : undefined);
  if (!raw || typeof raw !== 'object') return d;
  const out = {};
  for (const b of ACCESS_TABLES()) {
    const known = new Map(b.columns.map((c) => [c.key, c]));
    const list = [];
    for (const c of Array.isArray(raw[b.id]) ? raw[b.id] : []) {
      if (!c || typeof c !== 'object' || !known.has(c.key) || list.some((x) => x.key === c.key)) continue;
      const title = c.title && typeof c.title === 'object' ? T(str_(c.title.de, 40), str_(c.title.en, 40)) : T('', '');
      list.push({ key: c.key, show: !!known.get(c.key).fixed || c.show !== false, title });
    }
    for (const c of d[b.id]) if (!list.some((x) => x.key === c.key)) list.push(c);
    out[b.id] = list;
  }
  return out;
}

/** Überschrift einer Spalte der Zugangsdaten (eigene, sonst die vorgegebene). */
export function accessColLabel(def, conf) {
  const own = conf && conf.title;
  if (!own || !(own.de || own.en)) return def.label;
  return T(own.de || def.label.de, own.en || def.label.en);
}

/** Vorgaben für neue Zugangsdaten (Einstellungen › Vorgaben), wenn nichts eingestellt ist. */
export const defaultAccessPresets = () => ({
  blocks: { devices: true, hardware: true, network: false, wifi: true, remote: true },
  cols: defaultAccessCols(),
  showPasswords: false,
  roles: [...ROLES],
  security: [...WIFI_SECURITY],
  services: [...REMOTE_SERVICES],
});

const ACCESS_PRESETS_KEY = 'pdfix.presets.access';

/** Auswahlliste prüfen: Texte, ohne Doppelte und Leere, höchstens 40. */
const cleanList = (v, fallback) =>
  Array.isArray(v)
    ? [...new Set(v.filter((x) => typeof x === 'string').map((x) => x.trim().slice(0, 60)).filter(Boolean))].slice(0, 40)
    : [...fallback];

export function cleanAccessPresets(raw) {
  const d = defaultAccessPresets();
  const r = raw && typeof raw === 'object' ? raw : {};
  const blocks = r.blocks && typeof r.blocks === 'object' ? r.blocks : {};
  return {
    blocks: Object.fromEntries(Object.keys(d.blocks).map((k) => [k, typeof blocks[k] === 'boolean' ? blocks[k] : d.blocks[k]])),
    cols: cleanAccessCols(r.cols),
    showPasswords: r.showPasswords === true,
    roles: cleanList(r.roles, d.roles),
    security: cleanList(r.security, d.security),
    services: cleanList(r.services, d.services),
  };
}

export function loadAccessPresets() {
  try {
    const raw = JSON.parse(localStorage.getItem(ACCESS_PRESETS_KEY) || 'null');
    if (raw) return cleanAccessPresets(raw);
  } catch {}
  return defaultAccessPresets();
}

export function saveAccessPresets(presets) {
  try {
    localStorage.setItem(ACCESS_PRESETS_KEY, JSON.stringify(cleanAccessPresets(presets)));
    return true;
  } catch {
    return false;
  }
}

export function resetAccessPresets() {
  try {
    localStorage.removeItem(ACCESS_PRESETS_KEY);
  } catch {}
}

export const newRemote = () => ({ id: uid('r'), service: '', address: '', user: '', password: '', note: T('', '') });

/** Kopie des Projekts ohne Passwörter/Schlüssel in Zugangsdaten, die sie nicht zeigen sollen. */
export function withoutSecrets(project, show = null) {
  const copy = JSON.parse(JSON.stringify({ ...project, images: undefined }));
  copy.images = project.images;
  for (const s of copy.sections) {
    if (s.type !== 'access' || (show ?? s.showPasswords)) continue;
    for (const block of ACCESS_BLOCKS)
      for (const col of block.columns || [])
        if (col.secret)
          for (const row of s[block.list] || []) {
            row[col.key] = '';
            for (const u of row.users || []) if (col.key in u) u[col.key] = '';
          }
    s.secretsRemoved = true;
  }
  return copy;
}

/* ---------- Deckblatt-Felder, Kopf- und Fußzeile ---------- */

/** Felder des Deckblatts (Werte in `project.meta`), in der Reihenfolge eines neuen Dokuments. */
export const COVER_FIELDS = ['customer', 'address', 'site', 'date', 'technician', 'checked', 'docNo', 'version'];
/** Höchstzahl eigener Felder (Deckblatt bleibt lesbar). */
export const MAX_CUSTOM_FIELDS = 8;

export const defaultCoverFields = () => COVER_FIELDS.map((key) => ({ key, show: true, title: T('', '') }));
export const newCoverField = () => ({ key: uid('x'), show: true, title: T('Neues Feld', 'New field'), custom: true });

const FIELD_KEY_RE = /^x[A-Za-z0-9_-]{1,40}$/;

/** Deckblatt-Felder prüfen: bekannte in gewählter Reihenfolge, eigene (höchstens 8), fehlende hinten an. */
export function cleanCoverFields(list) {
  if (!Array.isArray(list)) return defaultCoverFields();
  const seen = new Set();
  const out = [];
  let custom = 0;
  for (const f of list) {
    if (!f || typeof f !== 'object' || seen.has(f.key)) continue;
    const isCustom = FIELD_KEY_RE.test(f.key || '');
    if (!isCustom && !COVER_FIELDS.includes(f.key)) continue;
    if (isCustom && ++custom > MAX_CUSTOM_FIELDS) continue;
    seen.add(f.key);
    const title = f.title && typeof f.title === 'object' ? T(str_(f.title.de, 60), str_(f.title.en, 60)) : T('', '');
    out.push(isCustom ? { key: f.key, show: f.show !== false, title, custom: true } : { key: f.key, show: f.show !== false, title });
  }
  for (const key of COVER_FIELDS) if (!seen.has(key)) out.push({ key, show: true, title: T('', '') });
  return out;
}

/** Hausfarbe eines neuen Dokuments (das Dunkelblau des Vorbilds). */
export const HOUSE_COLOR = '#1f3b4d';
export const LOGO_SIZES = [
  ['S', 'Klein'],
  ['M', 'Mittel'],
  ['L', 'Groß'],
];
/** Bausteine der Fußzeile: links die Firma, rechts das Dokument. */
export const FOOTER_PARTS = [
  ['company', 'Firmenname', 'left'],
  ['tagline', 'Zusatz der Firma', 'left'],
  ['title', 'Dokumenttitel', 'right'],
  ['docNo', 'Dokument-Nr.', 'right'],
  ['version', 'Version', 'right'],
  ['date', 'Datum', 'right'],
  ['page', 'Seitenzahl („Seite 2 von 9“)', 'right'],
];

export const defaultLook = () => ({
  color: HOUSE_COLOR,
  logoSize: 'M',
  logoPos: 'right',
  footer: { company: true, tagline: true, title: true, docNo: false, version: false, date: false, page: true },
  footerText: T('', ''),
});

/** Kopf- und Fußzeile prüfen (fehlt etwas: wie bisher). */
export function cleanPageLook(raw) {
  const d = defaultLook();
  if (!raw || typeof raw !== 'object') return d;
  const footer = raw.footer && typeof raw.footer === 'object' ? raw.footer : {};
  return {
    color: /^#[0-9a-f]{6}$/i.test(raw.color || '') ? raw.color.toLowerCase() : d.color,
    logoSize: oneOf(raw.logoSize, ['S', 'M', 'L'], 'M'),
    logoPos: oneOf(raw.logoPos, ['left', 'right'], 'right'),
    footer: Object.fromEntries(FOOTER_PARTS.map(([k]) => [k, typeof footer[k] === 'boolean' ? footer[k] : d.footer[k]])),
    footerText: raw.footerText && typeof raw.footerText === 'object' ? T(str_(raw.footerText.de, 160), str_(raw.footerText.en, 160)) : T('', ''),
  };
}

/** Dokumentnummer aus dem Schema: {JJJJ} {JJ} {MM} {TT} und {NR} (laufende Nummer mit `digits` Stellen). */
export function formatDocNo(pattern, nr, digits = 3, date = new Date()) {
  const pad = (v, k) => String(v).padStart(k, '0');
  return String(pattern || '')
    .replace(/\{JJJJ\}/g, String(date.getFullYear()))
    .replace(/\{JJ\}/g, pad(date.getFullYear() % 100, 2))
    .replace(/\{MM\}/g, pad(date.getMonth() + 1, 2))
    .replace(/\{TT\}/g, pad(date.getDate(), 2))
    .replace(/\{NR\}/g, pad(Math.max(0, Math.round(nr) || 0), Math.max(1, Math.min(8, Math.round(digits) || 1))));
}

/* ---------- Projekt ---------- */

/** Vorlagen für neue Projekte. */
export const TEMPLATES = [
  {
    id: 'documentation',
    title: T('Anlagendokumentation', 'System documentation'),
    desc: 'Deckblatt, Inhalt, Lageplan, Anschlussplan, Zugangsdaten, Fotos',
    sections: () => [
      { id: uid('s'), type: 'cover' },
      { id: uid('s'), type: 'toc' },
      newSite(),
      newWiring(),
      newAccess(),
      newPhotos(),
    ],
  },
  {
    id: 'manual',
    title: T('Bedienungsanleitung', 'User manual'),
    desc: 'Deckblatt, Sicherheit, Geräteübersicht, Schritte mit Fotos und Störungstabelle – zweisprachig',
    design: 'manual',
    lang: 'de+en',
    font: 'barlow',
    sections: () => [{ id: uid('s'), type: 'cover' }, starterManual()],
  },
  {
    id: 'tech',
    title: T('Technische Beschreibung', 'Technical description'),
    desc: 'Aufgabe, Aufbau, Funktion, technische Daten und offene Punkte',
    sections: () => [{ id: uid('s'), type: 'cover' }, { id: uid('s'), type: 'toc' }, starterChapters('tech')],
  },
  {
    id: 'wiring',
    title: T('Anschlussplan', 'Wiring diagram'),
    desc: 'Blockschaltbild mit Leitungsarten, Klemmenplan und Hinweisen',
    sections: () => [newWiring()],
  },
];

/** Teile der Anlagendokumentation, die man beim Anlegen wählen kann (Reihenfolge wie im Dokument). */
export const DOC_PARTS = [
  { id: 'cover', label: 'Deckblatt', icon: 'fitp' },
  { id: 'site', label: 'Lageplan', hint: 'mit Geräteliste', icon: 'map' },
  { id: 'wiring', label: 'Anschlussplan', icon: 'wiring' },
  { id: 'access', label: 'Zugangsdaten', icon: 'key' },
  { id: 'photos', label: 'Fotodokumentation', icon: 'camera' },
];

/**
 * Nur die gewählten Teile übernehmen. Das Inhaltsverzeichnis kommt automatisch dazu, sobald
 * mindestens zwei Inhaltsteile gewählt sind.
 */
function pickParts(sections, parts) {
  const content = parts.filter((p) => p !== 'cover').length;
  return sections.filter((s) => (s.type === 'toc' ? content >= 2 : parts.includes(s.type)));
}

export function newProject(templateId = 'documentation', opts = {}) {
  const template = TEMPLATES.find((t) => t.id === templateId) || TEMPLATES[0];
  const sections = template.sections();
  return {
    v: MODEL_VERSION,
    id: uid('prj'),
    template: template.id,
    lang: opts.lang || template.lang || 'de',
    font: opts.font || template.font || 'helvetica',
    /** Gestaltung: 'classic' oder 'manual' (Bedienungsanleitung im Stil des Vorbilds). */
    design: template.design || 'classic',
    manual: newManualMeta(),
    title: template.design === 'manual' ? T('Produktname', 'Product name') : template.title,
    company: { name: '', tagline: T('', ''), logo: null },
    meta: {
      customer: '',
      address: '',
      site: '',
      date: new Date().toISOString().slice(0, 10),
      technician: '',
      checked: '',
      docNo: '',
      version: '1.0',
    },
    /** Felder des Deckblatts: Reihenfolge, ein/aus, eigene Überschrift, eigene Felder (Werte in `extra`). */
    coverFields: defaultCoverFields(),
    extra: {},
    /** Kopf- und Fußzeile: Hausfarbe, Logo, Inhalt der Fußzeile. */
    look: defaultLook(),
    /** Ansprechpartner des Kunden: [{ id, name, role, phone, email }] */
    contacts: [],
    /** Wachschutz: Firma, Notruf, Kunden-/Objektnummer, Leitstelle/Aufschaltung */
    guard: newGuard(),
    sections: opts.parts ? pickParts(sections, opts.parts) : sections,
    /** Freie Bilder und QR-Codes: { id, kind: 'image'|'qr', section, page, x, y, w, h, … } */
    overlays: [],
    images: {},
    created: Date.now(),
    modified: Date.now(),
  };
}

/* ---------- Laden und Prüfen ---------- */

const ID_RE = /^[A-Za-z0-9_-]{1,64}$/;
const IMAGE_RE = /^data:image\/(png|jpeg|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
const str_ = (v, max = 4000) => (typeof v === 'string' ? v.slice(0, max) : typeof v === 'number' ? String(v) : '');
const bool = (v) => v === true;
const num = (v) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(-5000, Math.min(5000, v)) : null);
const toT = (v) =>
  typeof v === 'string' ? T(str_(v), '') : v && typeof v === 'object' ? T(str_(v.de), str_(v.en)) : T('', '');
const oneOf = (v, list, fallback) => (list.includes(v) ? v : fallback);
const hasImg = (images, key) => typeof key === 'string' && Object.hasOwn(images, key);

/**
 * Prüft ein geladenes Projekt (Entwurf oder aus einer PDF) und bringt es auf den aktuellen Stand:
 * unbekannte Felder entfallen, Kennungen werden geprüft (sonst neu vergeben und Verweise
 * nachgezogen), Texte sind Zeichenketten, Bilder nur eingebettete PNG/JPG/WebP/SVG. So gelangt aus
 * einer fremden PDF nichts in die Oberfläche, was dort nicht hingehört.
 */
export function normalizeProject(raw) {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.sections)) throw new Error('Kein PlantPDF-Projekt');
  const used = new Set();
  const id = (v, prefix) => {
    let out = typeof v === 'string' && ID_RE.test(v) && !used.has(v) ? v : uid(prefix);
    while (used.has(out)) out = uid(prefix);
    used.add(out);
    return out;
  };
  const base = newProject('wiring');
  const images = Object.create(null);
  for (const [key, img] of Object.entries(raw.images && typeof raw.images === 'object' ? raw.images : {})) {
    if (!ID_RE.test(key) || !img || typeof img.data !== 'string' || !IMAGE_RE.test(img.data)) continue;
    const w = num(img.w);
    const h = num(img.h);
    if (!(w > 0 && h > 0)) continue;
    images[key] = { mime: str_(img.mime, 40), data: img.data, w, h };
  }
  const company = raw.company && typeof raw.company === 'object' ? raw.company : {};
  const meta = raw.meta && typeof raw.meta === 'object' ? raw.meta : {};
  const project = {
    v: MODEL_VERSION,
    id: id(raw.id, 'prj'),
    template: oneOf(raw.template, TEMPLATES.map((t) => t.id), 'documentation'),
    lang: oneOf(raw.lang, LANGS.map((l) => l.id), 'de'),
    font: oneOf(raw.font, FONTS.map((f) => f.id), 'helvetica'),
    title: toT(raw.title),
    company: {
      name: str_(company.name, 200),
      tagline: toT(company.tagline),
      logo: hasImg(images, company.logo) ? company.logo : null,
    },
    meta: Object.fromEntries(Object.keys(base.meta).map((k) => [k, str_(meta[k], 1000)])),
    coverFields: cleanCoverFields(raw.coverFields),
    extra: {},
    look: cleanPageLook(raw.look),
    contacts: (Array.isArray(raw.contacts) ? raw.contacts : [])
      .filter((c) => c && typeof c === 'object')
      .slice(0, 50)
      .map((c) => ({ id: id(c.id, 'c'), name: str_(c.name, 200), role: str_(c.role, 200), phone: str_(c.phone, 80), email: str_(c.email, 200) })),
    guard: Object.fromEntries(Object.keys(newGuard()).map((k) => [k, str_(raw.guard && typeof raw.guard === 'object' ? raw.guard[k] : '', 300)])),
    design: oneOf(raw.design, ['classic', 'manual'], 'classic'),
    manual: cleanManualMeta(raw.manual, images),
    sections: [],
    images,
    created: num(raw.created) ?? Date.now(),
    modified: typeof raw.modified === 'number' && Number.isFinite(raw.modified) ? raw.modified : Date.now(),
  };
  for (const s of raw.sections) {
    if (!s || typeof s !== 'object') continue;
    if (s.type === 'cover' || s.type === 'toc') project.sections.push({ id: id(s.id, 's'), type: s.type });
    else if (s.type === 'wiring') project.sections.push(cleanWiring(s, id));
    else if (s.type === 'access') project.sections.push(cleanAccess(s, id));
    else if (s.type === 'site') project.sections.push(cleanSite(s, id, images));
    else if (s.type === 'photos') project.sections.push(cleanPhotos(s, id, images));
    else if (s.type === 'chapters') project.sections.push(cleanChapters(s, id, images));
    else continue;
    // Seitenformat je Abschnitt (Deckblatt und Inhalt immer hoch)
    if (s.landscape === true && s.type !== 'cover' && s.type !== 'toc') project.sections.at(-1).landscape = true;
  }
  // Werte eigener Deckblatt-Felder: nur zu Feldern, die es gibt
  const extra = raw.extra && typeof raw.extra === 'object' ? raw.extra : {};
  for (const f of project.coverFields) if (f.custom && typeof extra[f.key] === 'string') project.extra[f.key] = str_(extra[f.key], 1000);
  project.overlays = cleanOverlays(raw.overlays, project.sections, images, id);
  // Fotoverknüpfungen nur auf Symbole, die es gibt
  const symbolIds = new Set(project.sections.flatMap((s) => (s.type === 'site' ? s.symbols.map((y) => y.id) : [])));
  for (const s of project.sections) if (s.type === 'photos') for (const p of s.items) if (p.link && !symbolIds.has(p.link)) p.link = null;
  return project;
}

/** Freie Bilder und QR-Codes: nur auf vorhandenen Abschnitten, Maße auf der Seite begrenzt. */
function cleanOverlays(list, sections, images, id) {
  const ids = new Set(sections.map((s) => s.id));
  return (Array.isArray(list) ? list : [])
    .filter((o) => o && typeof o === 'object' && ids.has(o.section) && (o.kind === 'qr' || (o.kind === 'image' && hasImg(images, o.image))))
    .slice(0, 500)
    .map((o) => ({
      id: id(o.id, 'o'),
      kind: o.kind,
      section: o.section,
      page: Math.round(clamp(o.page, 0, 999, 0)),
      x: clamp(o.x, -200, 1000, 42),
      y: clamp(o.y, -200, 1000, 120),
      w: clamp(o.w, 8, 900, 100),
      h: clamp(o.h, 8, 900, 100),
      ...(o.kind === 'image' ? { image: o.image } : { src: typeof o.src === 'string' && ID_RE.test(o.src) ? o.src : null, text: str_(o.text, 2000), caption: o.caption !== false }),
    }));
}

function cleanManualMeta(m, images) {
  const d = newManualMeta();
  if (!m || typeof m !== 'object') return d;
  const hex = (v, f) => (/^#[0-9a-f]{6}$/i.test(v) ? v : f);
  return {
    kicker: m.kicker ? toT(m.kicker) : d.kicker,
    subtitle: toT(m.subtitle),
    cover: hasImg(images, m.cover) ? m.cover : null,
    modelLabel: m.modelLabel ? toT(m.modelLabel) : d.modelLabel,
    model: str_(m.model, 200),
    note: m.note ? toT(m.note) : d.note,
    version: str_(m.version, 40),
    date: str_(m.date, 40),
    accent: hex(m.accent, d.accent),
    accent2: hex(m.accent2, d.accent2),
  };
}

function cleanWiring(s, id) {
  const d = newWiring();
  const remap = new Map();
  const boxId = (v) => {
    const out = id(v, 'b');
    if (typeof v === 'string') remap.set(v, out);
    return out;
  };
  // Leitungsarten und Kennzeichen: Kennungen nur je Plan eindeutig (Baugruppen verweisen darauf)
  const local = new Set();
  const lid = (v, prefix) => {
    let out = typeof v === 'string' && ID_RE.test(v) && !local.has(v) ? v : uid(prefix);
    while (local.has(out)) out = uid(prefix);
    local.add(out);
    return out;
  };
  const categories = cleanCategories(Array.isArray(s.categories) ? s.categories : d.categories, lid);
  // Kennzeichen: früher genau eines je Plan (`badge`, an Baugruppen mit `badge: true`)
  let marks;
  let legacyMark = null;
  if (Array.isArray(s.marks)) marks = cleanMarks(s.marks, lid);
  else {
    const old = s.badge && typeof s.badge === 'object' ? s.badge : null;
    const label = old ? str_(old.label, 24) : '12 V';
    legacyMark = { id: lid('kalt', 'k'), label, color: (old && str_(old.color, 9)) || '#b45309', text: old ? toT(old.text) : T('Baugruppe wird direkt aus dem 12-V-Netzteil versorgt.', 'Module is supplied directly from the 12 V power supply.') };
    marks = legacyMark.label ? [legacyMark] : [];
  }
  const markIds = new Set(marks.map((k) => k.id));
  const markList = (v) => (Array.isArray(v) ? [...new Set(v.filter((x) => typeof x === 'string' && markIds.has(x)))] : []);
  const boxes = (Array.isArray(s.boxes) ? s.boxes : [])
    .filter((b) => b && typeof b === 'object')
    .map((b) => ({
      ...newBox(),
      id: boxId(b.id),
      title: toT(b.title),
      lines: toT(b.lines),
      cat: str_(b.cat, 64),
      side: oneOf(b.side, ['left', 'right', 'bottom'], 'left'),
      marks: Array.isArray(b.marks) ? markList(b.marks) : legacyMark && bool(b.badge) && markIds.has(legacyMark.id) ? [legacyMark.id] : [],
      bmk: str_(b.bmk, 24),
      make: toT(b.make),
      bus: bool(b.bus),
      parent: typeof b.parent === 'string' ? b.parent : null,
      fill: bool(b.fill),
      fillColor: b.fillColor ? str_(b.fillColor, 9) : null,
      y: num(b.y),
      h: num(b.h),
      pinY: num(b.pinY),
      pinGap: num(b.pinGap),
    }));
  // Verweise auf umbenannte Kennungen nachziehen; Unterbaugruppen eines unteren Kastens lösen
  for (const b of boxes) {
    b.parent = b.parent != null && remap.has(b.parent) ? remap.get(b.parent) : null;
    const parent = boxes.find((x) => x.id === b.parent);
    if (!parent || parent.side === 'bottom' || parent === b) b.parent = null;
  }
  const hub = s.hub && typeof s.hub === 'object' ? s.hub : {};
  const pins = (Array.isArray(hub.pins) ? hub.pins : [])
    .filter((p) => p && typeof p === 'object')
    .map((p) => ({
      id: id(p.id, 'p'),
      name: str_(p.name, 40),
      label: str_(p.label, 40),
      func: toT(p.func),
      box: typeof p.box === 'string' && remap.has(p.box) ? remap.get(p.box) : null,
      terminal: toT(p.terminal),
      note: toT(p.note),
      wire: str_(p.wire, 24),
      cross: str_(p.cross, 24),
      marks: markList(p.marks),
    }));
  return {
    id: id(s.id, 's'),
    type: 'wiring',
    system: toT(s.system),
    categories: categories.length ? categories : d.categories,
    marks,
    // ältere Pläne: Klemmenplan wie bisher (vier Spalten)
    columns: cleanColumns(s.columns),
    show: cleanShow(s.show),
    hub: { name: toT(hub.name), short: toT(hub.short), model: toT(hub.model), note: toT(hub.note), pins },
    boxes,
    hints: (Array.isArray(s.hints) ? s.hints : [])
      .filter((h) => h && typeof h === 'object')
      .map((h) => ({ id: id(h.id, 'h'), cat: str_(h.cat, 64), title: toT(h.title), text: toT(h.text) })),
  };
}

const clamp = (v, lo, hi, fallback) => (typeof v === 'number' && Number.isFinite(v) ? Math.max(lo, Math.min(hi, v)) : fallback);
const DATE_RE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

/** Werte eigener Gerätefelder: nur bekannte Felder, Texte begrenzt. */
function cleanFieldValues(v, ids) {
  if (!v || typeof v !== 'object') return {};
  const out = {};
  for (const [k, val] of Object.entries(v)) if (ids.has(k) && str_(val).trim()) out[k] = str_(val, 200);
  return Object.keys(out).length ? { fields: out } : {};
}

function cleanSite(s, id, images) {
  const d = newSite(defaultSitePresets());
  const bg = s.bg && typeof s.bg === 'object' ? s.bg : {};
  const renamed = new Map();
  // eigene Symbolarten: mit Bild oder als Bildzeichen in eigener Farbe
  const custom = (Array.isArray(s.custom) ? s.custom : [])
    .filter((c) => c && typeof c === 'object')
    .slice(0, 60)
    .map((c) => {
      const out = { id: id(c.id, 'u'), ...cleanCustom(c, (v) => (hasImg(images, v) ? v : null)) };
      if (typeof c.id === 'string' && !renamed.has(c.id)) renamed.set(c.id, out.id);
      return out;
    });
  const styles = cleanStyles(s.styles);
  const styleIds = new Set(styles.map((t) => t.id));
  const fields = cleanFields(s.fields);
  const fieldIds = new Set(fields.map((f) => f.id));
  const kinds = new Set(SYMBOLS.map((x) => x.id));
  /** Symbolart prüfen; eigene Arten folgen ihrer (ggf. neu vergebenen) Kennung. */
  const kindOf = (k) => {
    if (typeof k !== 'string') return null;
    if (kinds.has(k)) return k;
    const to = k.startsWith('custom:') ? renamed.get(k.slice(7)) : null;
    return to ? 'custom:' + to : null;
  };
  const symbols = (Array.isArray(s.symbols) ? s.symbols : [])
    .filter((y) => y && typeof y === 'object' && kindOf(y.kind))
    .map((y) => cleanLook(y, {
      id: id(y.id, 'y'),
      kind: kindOf(y.kind),
      x: clamp(y.x, 0, 1, 0.5),
      y: clamp(y.y, 0, 1, 0.5),
      name: toT(y.name),
      note: toT(y.note),
      ip: str_(y.ip, 80),
      scale: clamp(y.scale, 0.5, 2.5, 1),
      fov: bool(y.fov),
      dir: clamp(y.dir, -360, 720, 0),
      angle: clamp(y.angle, 5, 360, 90),
      range: clamp(y.range, 10, 600, 60),
      ...(Number.isInteger(y.seq) && y.seq >= 0 && y.seq < 100000 ? { seq: y.seq } : {}),
      ...(y.kind === 'mgm' ? { groups: Number.isInteger(y.groups) && y.groups >= 1 && y.groups <= 99 ? y.groups : 2 } : {}),
      ...Object.fromEntries(Object.entries(SYMBOL_DETAILS).filter(([k]) => str_(y[k]).trim()).map(([k, max]) => [k, str_(y[k], max)])),
      ...(typeof y.nvr === 'string' && ID_RE.test(y.nvr) ? { nvr: y.nvr } : {}),
      ...cleanFieldValues(y.fields, fieldIds),
    }, true));
  const point = (q) => (Array.isArray(q) && q.length === 2 ? [clamp(q[0], 0, 1, 0), clamp(q[1], 0, 1, 0)] : null);
  const shapes = (Array.isArray(s.shapes) ? s.shapes : [])
    .filter((z) => z && typeof z === 'object' && ['line', 'free', 'fence', 'dim'].includes(z.type) && Array.isArray(z.pts))
    .map((z) => cleanLook(z, {
      id: id(z.id, 'z'),
      type: z.type,
      pts: z.pts.slice(0, 4000).map(point).filter(Boolean),
      closed: z.type === 'fence' && bool(z.closed),
      color: /^#[0-9a-f]{6}$/i.test(z.color) ? z.color : '#1d4ed8',
      name: toT(z.name),
      showLen: z.showLen !== false,
      ...(styleIds.has(z.style) ? { style: z.style } : {}),
    }))
    .filter((z) => z.pts.length >= 2)
    .map((z) => (z.type === 'dim' ? { ...z, pts: z.pts.slice(0, 2) } : z));
  for (const z of shapes) if (z.closed && z.pts.length < 3) z.closed = false;
  const stations = new Set(symbols.filter((y) => y.kind === 'radio').map((y) => y.id));
  const links = (Array.isArray(s.links) ? s.links : [])
    .filter((l) => l && typeof l === 'object')
    .map((l) => cleanLook(l, {
      id: id(l.id, 'l'),
      mode: l.mode === 'ptmp' ? 'ptmp' : 'ptp',
      from: l.from,
      to: (Array.isArray(l.to) ? l.to : []).filter((t) => stations.has(t) && t !== l.from),
      band: str_(l.band, 40),
      ssid: str_(l.ssid, 80),
      key: str_(l.key, 200),
    }))
    .filter((l) => stations.has(l.from) && l.to.length);
  for (const l of links) if (l.mode === 'ptp') l.to = l.to.slice(0, 1);
  return {
    id: id(s.id, 's'),
    type: 'site',
    title: toT(s.title || d.title),
    bg: {
      image: hasImg(images, bg.image) ? bg.image : null,
      rotate: oneOf(bg.rotate, [0, 90, 180, 270], 0),
      fit: oneOf(bg.fit, ['contain', 'cover'], 'contain'),
      fade: clamp(bg.fade, 0, 0.8, 0),
    },
    symbols,
    custom,
    kinds: cleanKinds(s.kinds),
    styles,
    fields,
    listCols: cleanListCols(s.listCols, fields),
    shapes,
    links,
    scale: cleanScale(s.scale),
    scaleBar: s.scaleBar !== false,
    thin: Object.fromEntries(
      Object.entries(s.thin && typeof s.thin === 'object' ? s.thin : {})
        .filter(([k, v]) => typeof k === 'string' && k.length < 60 && (v === 'faded' || v === 'hidden'))
        .slice(0, 100),
    ),
    showNumbers: s.showNumbers !== false,
    showList: s.showList !== false,
    showBus: bool(s.showBus),
    photoSpotsInPdf: s.photoSpotsInPdf !== false,
    legend: oneOf(s.legend, ['below', 'page', 'none'], 'below'),
  };
}

/** Darstellung je Objekt: Ebene, Aufhellen; Symbole zusätzlich Beschriftung und Erfassungsbereich. */
const FADES = [0, 0.4, 0.7];
function cleanLook(o, out, sym = false) {
  if (typeof o.layer === 'number' && Number.isFinite(o.layer)) out.layer = Math.max(-1e6, Math.min(1e6, o.layer));
  if (FADES.includes(o.fade) && o.fade) out.fade = o.fade;
  if (sym) {
    if (['left', 'right', 'top', 'bottom', 'none'].includes(o.labelPos)) out.labelPos = o.labelPos;
    if (o.cone === 'outline') out.cone = 'outline';
  }
  return out;
}

function cleanScale(v) {
  if (!v || typeof v !== 'object' || !Array.isArray(v.a) || !Array.isArray(v.b)) return null;
  const pt = (q) => [clamp(q[0], 0, 1, 0), clamp(q[1], 0, 1, 0)];
  const m = Number(v.m);
  if (!(m > 0 && m < 1e6)) return null;
  const a = pt(v.a);
  const b = pt(v.b);
  return a[0] === b[0] && a[1] === b[1] ? null : { a, b, m };
}

const TABLE_IDS = new Set(['table', 'faults', 'parts', 'scope']);

function cleanChapters(s, id, images) {
  const d = newChapters(s.kind === 'tech' ? 'tech' : 'manual');
  const cell = (v) => str_(v, 600);
  const blocks = [];
  for (const b of Array.isArray(s.blocks) ? s.blocks : []) {
    if (!b || typeof b !== 'object') continue;
    const base = { id: id(b.id, 'k'), type: b.type };
    if (b.type === 'h') blocks.push({ ...base, level: oneOf(b.level, [1, 2, 3], 1), text: toT(b.text) });
    else if (b.type === 'p') blocks.push({ ...base, text: toT(b.text), ...(b.small === true ? { small: true } : {}) });
    else if (b.type === 'ul' || b.type === 'steps') blocks.push({ ...base, text: toT(b.text) });
    else if (b.type === 'signs') blocks.push(base);
    else if (b.type === 'cards')
      blocks.push({
        ...base,
        items: (Array.isArray(b.items) ? b.items : [])
          .filter((c) => c && typeof c === 'object')
          .slice(0, 40)
          .map((c) => ({ id: id(c.id, 'c'), image: hasImg(images, c.image) ? c.image : null, title: toT(c.title), text: toT(c.text), fill: c.fill === true })),
      });
    else if (b.type === 'callout')
      blocks.push({ ...base, tone: oneOf(b.tone, TONES.map((t) => t.id), 'note'), title: toT(b.title), text: toT(b.text) });
    else if (b.type === 'figure')
      blocks.push({
        ...base,
        image: hasImg(images, b.image) ? b.image : null,
        caption: toT(b.caption),
        width: oneOf(b.width, ['full', 'half', 'side'], 'full'),
        marks: (Array.isArray(b.marks) ? b.marks : [])
          .filter((m) => m && typeof m === 'object')
          .slice(0, 60)
          .map((m) => ({
            id: id(m.id, 'm'),
            x: clamp(m.x, 0, 1, 0.5),
            y: clamp(m.y, 0, 1, 0.5),
            side: oneOf(m.side, ['auto', 'l', 'r'], 'auto'),
            ly: typeof m.ly === 'number' ? clamp(m.ly, -0.2, 1.2, null) : null,
            name: toT(m.name),
            desc: toT(m.desc),
          })),
        legend: b.legend !== false,
        aside: { title: toT(b.aside && b.aside.title), text: toT(b.aside && b.aside.text) },
      });
    else if (b.type === 'figsteps')
      blocks.push({ ...base, image: hasImg(images, b.image) ? b.image : null, caption: toT(b.caption), text: toT(b.text) });
    else if (b.type === 'code' || b.type === 'formula') blocks.push({ ...base, text: str_(b.text, 8000) });
    else if (b.type === 'table') {
      const cols = Math.max(1, Math.min(6, Array.isArray(b.head) ? b.head.length : 2));
      const head = Array.from({ length: cols }, (_, i) => cell(Array.isArray(b.head) ? b.head[i] : ''));
      const rows = (Array.isArray(b.rows) ? b.rows : []).slice(0, 200).map((r) => Array.from({ length: cols }, (_, i) => cell(Array.isArray(r) ? r[i] : '')));
      const weights = Array.from({ length: cols }, (_, i) => clamp(Array.isArray(b.weights) ? b.weights[i] : 1, 0.2, 10, 1));
      // englische Fassung der Zellen (zweisprachige Bedienungsanleitung)
      const en = b.en && typeof b.en === 'object' ? b.en : {};
      const enHead = Array.from({ length: cols }, (_, i) => cell(Array.isArray(en.head) ? en.head[i] : ''));
      const enRows = rows.map((_, r) => Array.from({ length: cols }, (_, i) => cell(Array.isArray(en.rows) && Array.isArray(en.rows[r]) ? en.rows[r][i] : '')));
      blocks.push({ ...base, preset: TABLE_IDS.has(b.preset) ? b.preset : 'table', caption: toT(b.caption), head, rows, weights, en: { head: enHead, rows: enRows } });
    }
  }
  return {
    id: id(s.id, 's'),
    type: 'chapters',
    kind: d.kind,
    title: toT(s.title || d.title),
    numbering: s.numbering !== false,
    blocks,
  };
}

function cleanPhotos(s, id, images) {
  const d = newPhotos();
  const items = (Array.isArray(s.items) ? s.items : [])
    .filter((p) => p && typeof p === 'object' && hasImg(images, p.image))
    .map((p) => ({
      id: id(p.id, 'f'),
      image: p.image,
      caption: toT(p.caption),
      date: typeof p.date === 'string' && DATE_RE.test(p.date) ? p.date : '',
      link: typeof p.link === 'string' && ID_RE.test(p.link) ? p.link : null,
    }));
  return {
    id: id(s.id, 's'),
    type: 'photos',
    title: toT(s.title || d.title),
    perPage: oneOf(s.perPage, PHOTO_LAYOUTS, 4),
    showDate: s.showDate !== false,
    inPdf: s.inPdf !== false,
    items,
  };
}

function cleanAccess(s, id) {
  const d = newAccess(defaultAccessPresets());
  const blocks = s.blocks && typeof s.blocks === 'object' ? s.blocks : {};
  const hide = s.hide && typeof s.hide === 'object' ? s.hide : {};
  const network = s.network && typeof s.network === 'object' ? s.network : {};
  const list = (rows, make, prefix) =>
    (Array.isArray(rows) ? rows : [])
      .filter((r) => r && typeof r === 'object')
      .map((r) => {
        const out = make();
        for (const [k, v] of Object.entries(out))
          if (k === 'id') out.id = id(r.id, prefix);
          else if (k === 'sym' || k === 'link') out[k] = typeof r[k] === 'string' && ID_RE.test(r[k]) ? r[k] : null;
          else if (k === 'users')
            out.users = (Array.isArray(r.users) ? r.users : [])
              .filter((u) => u && typeof u === 'object')
              .slice(0, 50)
              .map((u) => ({ id: id(u.id, 'n'), user: str_(u.user, 200), password: str_(u.password, 500), role: str_(u.role, 80) }));
          else out[k] = typeof v === 'object' ? toT(r[k]) : str_(r[k], 500);
        return out;
      });
  return {
    id: id(s.id, 's'),
    type: 'access',
    title: toT(s.title || d.title),
    showPasswords: bool(s.showPasswords),
    blocks: Object.fromEntries(Object.keys(d.blocks).map((k) => [k, k in blocks ? bool(blocks[k]) : d.blocks[k]])),
    // Spalten; ältere Dokumente: aus den ausgeblendeten Spalten (`hide`)
    cols: cleanAccessCols(s.cols, s.cols ? null : { hardware: ['location'], ...hide }),
    devices: list(s.devices, newDevice, 'd'),
    network: Object.fromEntries(Object.entries(d.network).map(([k, v]) => [k, typeof v === 'object' ? toT(network[k]) : str_(network[k], 200)])),
    wifi: list(s.wifi, newWifi, 'w'),
    remote: list(s.remote, newRemote, 'r'),
    ...(s.secretsRemoved ? { secretsRemoved: true } : {}),
  };
}

/** Name eines Abschnitts für Listen und das Inhaltsverzeichnis. */
export function sectionTitle(section, lang = 'de') {
  if (section.type === 'cover') return lang === 'en' ? 'Cover' : 'Deckblatt';
  if (section.type === 'toc') return str('toc', lang);
  if (section.type === 'wiring') {
    const sys = tx(section.system, lang);
    return str('wiring', lang) + (sys ? ' ' + sys : '');
  }
  if (section.type === 'access') return tx(section.title, lang) || str('access', lang);
  if (section.type === 'site') return tx(section.title, lang) || str('sitePlan', lang);
  if (section.type === 'photos') return tx(section.title, lang) || str('photos', lang);
  if (section.type === 'chapters') return tx(section.title, lang) || str('chapters', lang);
  return section.type;
}

/** Dateiname-tauglicher Titel des Projekts. */
export function projectName(project) {
  const site = project.meta.site || project.meta.customer;
  const main = project.sections.find((s) => s.type === 'wiring');
  const base = tx(project.title, langsOf(project)[0]);
  if (project.template === 'wiring' && main) return sectionTitle(main, langsOf(project)[0]);
  return site ? `${base} ${site}` : base;
}
