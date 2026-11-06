/**
 * Vorgaben für neue Dokumentationen (Einstellungen › Vorgaben für Dokumentationen): Deckblatt
 * (Firma, Felder, Standardwerte, Dokumentnummer, feste Ansprechpartner, Wachschutz) und Kopf- und
 * Fußzeile. Ein neues Dokument übernimmt eine Kopie; spätere Änderungen an den Vorgaben lassen
 * bestehende Dokumente unberührt. Ohne Einstellungen gilt, was PlantPDF bisher tat.
 *
 * Die Vorgaben des Anschlussplans liegen in model.js (loadWiringPresets).
 */
import { T, cleanCoverFields, cleanPageLook, defaultCoverFields, defaultLook, formatDocNo, loadSitePresets, mergeSitePresets, newGuard, uid } from './model.js';

const COVER_KEY = 'pdfix.presets.cover';
const LOOK_KEY = 'pdfix.presets.look';
/** Zuletzt verwendete Firma (so tat es PlantPDF bisher: aus dem letzten Dokument). */
const COMPANY_KEY = 'pdfix.studio.company';

const IMAGE_RE = /^data:image\/(png|jpeg|webp|svg\+xml);base64,[A-Za-z0-9+/=]+$/;
const s = (v, max = 300) => (typeof v === 'string' ? v.slice(0, max) : '');
const bi = (v, max = 300) => (v && typeof v === 'object' ? T(s(v.de, max), s(v.en, max)) : typeof v === 'string' ? T(s(v, max), '') : T('', ''));
const copy = (v) => JSON.parse(JSON.stringify(v));

function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || 'null');
  } catch {
    return null;
  }
}
function write(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}
function remove(key) {
  try {
    localStorage.removeItem(key);
  } catch {}
}

function cleanImage(img) {
  if (!img || typeof img !== 'object' || typeof img.data !== 'string' || !IMAGE_RE.test(img.data)) return null;
  const w = Number(img.w);
  const h = Number(img.h);
  if (!(w > 0 && h > 0)) return null;
  return { mime: s(img.mime, 40), data: img.data, w, h };
}

/** Firma: { name, tagline, logo: { mime, data, w, h } | null }. */
function cleanCompany(raw) {
  if (!raw || typeof raw !== 'object') return null;
  return { name: s(raw.name, 200), tagline: bi(raw.tagline, 200), logo: cleanImage(raw.logo) };
}

/* ---------- Deckblatt ---------- */

export const defaultCoverPresets = () => ({
  /** null: wie bisher die Firma aus dem zuletzt bearbeiteten Dokument. */
  company: null,
  fields: defaultCoverFields(),
  technician: '',
  checked: '',
  version: '1.0',
  /** Dokumentnummer: Schema mit {JJJJ} {JJ} {MM} {TT} {NR}; `next` = nächste laufende Nummer. */
  docNo: { pattern: '', digits: 3, next: 1 },
  contacts: [],
  guard: newGuard(),
});

export function cleanCoverPresets(raw) {
  const d = defaultCoverPresets();
  const r = raw && typeof raw === 'object' ? raw : {};
  const no = r.docNo && typeof r.docNo === 'object' ? r.docNo : {};
  const int = (v, min, max, f) => (Number.isFinite(Number(v)) ? Math.max(min, Math.min(max, Math.round(Number(v)))) : f);
  const guard = r.guard && typeof r.guard === 'object' ? r.guard : {};
  return {
    company: cleanCompany(r.company),
    fields: cleanCoverFields(r.fields),
    technician: s(r.technician, 200),
    checked: s(r.checked, 200),
    version: typeof r.version === 'string' ? s(r.version, 40) : d.version,
    docNo: { pattern: s(no.pattern, 80), digits: int(no.digits, 1, 8, 3), next: int(no.next, 0, 99999999, 1) },
    contacts: (Array.isArray(r.contacts) ? r.contacts : [])
      .filter((c) => c && typeof c === 'object')
      .slice(0, 20)
      .map((c) => ({ id: typeof c.id === 'string' && /^[A-Za-z0-9_-]{1,64}$/.test(c.id) ? c.id : uid('c'), name: s(c.name, 200), role: s(c.role, 200), phone: s(c.phone, 80), email: s(c.email, 200) })),
    guard: Object.fromEntries(Object.keys(d.guard).map((k) => [k, s(guard[k], 300)])),
  };
}

/** Firma der zuletzt bearbeiteten Dokumentation (falls in den Vorgaben keine eingetragen ist). */
export function rememberedCompany() {
  const raw = read(COMPANY_KEY);
  return raw ? cleanCompany(raw) : null;
}

export function rememberCompany(company) {
  try {
    const value = JSON.stringify(company);
    if (localStorage.getItem(COMPANY_KEY) !== value) localStorage.setItem(COMPANY_KEY, value);
  } catch {}
}

export const loadCoverPresets = () => cleanCoverPresets(read(COVER_KEY));
export const saveCoverPresets = (p) => write(COVER_KEY, cleanCoverPresets(p));
export const resetCoverPresets = () => remove(COVER_KEY);

/* ---------- Kopf- und Fußzeile ---------- */

export const loadLookPresets = () => cleanPageLook(read(LOOK_KEY));
export const saveLookPresets = (p) => write(LOOK_KEY, cleanPageLook(p));
export const resetLookPresets = () => remove(LOOK_KEY);
export const defaultLookPresets = defaultLook;

/* ---------- Übernehmen ---------- */

/** Firma (aus den Vorgaben, sonst die zuletzt verwendete) ins Projekt; das Logo kommt zu den Bildern. */
function applyCompany(project, company) {
  if (!company) return;
  project.company.name = company.name;
  project.company.tagline = copy(company.tagline);
  if (company.logo) {
    const id = uid('img');
    project.images[id] = copy(company.logo);
    project.company.logo = id;
  }
}

/** Nächste Dokumentnummer vergeben (zählt weiter); leer, wenn kein Schema eingestellt ist. */
export function takeDocNo() {
  const cover = loadCoverPresets();
  if (!cover.docNo.pattern) return '';
  const value = formatDocNo(cover.docNo.pattern, cover.docNo.next, cover.docNo.digits);
  if (/\{NR\}/.test(cover.docNo.pattern)) {
    cover.docNo.next += 1;
    saveCoverPresets(cover);
  }
  return value;
}

/**
 * Vorgaben auf ein neu angelegtes Dokument anwenden: Firma und Logo, Deckblatt-Felder,
 * Standardwerte, Dokumentnummer, feste Ansprechpartner, Wachschutz, Kopf- und Fußzeile.
 */
export function applyDocPresets(project) {
  const cover = loadCoverPresets();
  applyCompany(project, cover.company || rememberedCompany());
  project.coverFields = copy(cover.fields);
  if (cover.technician) project.meta.technician = cover.technician;
  if (cover.checked) project.meta.checked = cover.checked;
  project.meta.version = cover.version;
  const no = takeDocNo();
  if (no) project.meta.docNo = no;
  project.contacts = [...project.contacts, ...cover.contacts.map((c) => ({ ...copy(c), id: uid('c') }))];
  for (const [k, v] of Object.entries(cover.guard)) if (v) project.guard[k] = v;
  project.look = loadLookPresets();
  // eigene Symbolarten der Vorgaben in die Lagepläne (Bilder ins Projekt)
  const site = loadSitePresets();
  for (const s of project.sections) if (s.type === 'site') mergeSitePresets(s, { ...site, styles: [], fields: [], kinds: {} }, project.images);
  return project;
}

/* ---------- Datei (Export/Import) ---------- */

export const PRESETS_FILE = 'plantpdf-vorgaben';
