/**
 * Vorschau in Einstellungen › Vorgaben: ein Beispieldokument mit festen, realistischen Angaben, auf
 * das die gerade eingestellten Vorgaben angewandt werden – gesetzt wie jede Dokumentation. So ist
 * jede Einstellung sofort zu sehen, unabhängig vom geöffneten Dokument. Nichts wird gespeichert,
 * die Dokumentnummer zählt nicht weiter.
 */
import {
  T,
  formatDocNo,
  newAccess,
  newBox,
  newHint,
  newPin,
  newProject,
  newSite,
  newSymbol,
  newWiring,
  newShape,
  uid,
} from './model.js';
import { applyPresetsTo } from './presets.js';
import { renderDocument } from './render.js';

/** Seiten je Reiter: welche Seitenarten die Vorschau zeigt (mit Beschriftung darunter). */
const PAGES = {
  cover: [['cover', 'Deckblatt']],
  look: [['site', 'Inhaltsseite mit Kopf- und Fußzeile']],
  site: [
    ['site', 'Lageplan'],
    ['sitelegend', 'Legende'],
    ['sitelist', 'Geräteliste'],
  ],
  wiring: [
    ['diagram', 'Anschlussplan'],
    ['terminals', 'Klemmenplan'],
  ],
  access: [['access', 'Zugangsdaten']],
};

/** Beispielfirma, solange weder in den Vorgaben noch zuletzt eine Firma eingetragen war. */
const SAMPLE_COMPANY = { name: 'Ihre Firma GmbH', tagline: T('Sicherheitstechnik', 'Security systems'), logo: null };

function sampleSite(presets) {
  const site = newSite(presets);
  site.title = T('Lageplan', 'Site plan');
  // Maßstab: 40 m quer über den Plan – Längen und Flächen erscheinen in der Legende
  site.scale = { a: [0.05, 0.95], b: [0.95, 0.95], m: 40 };
  const put = (kind, x, y, extra = {}) => {
    const s = { ...newSymbol(kind, x, y, site), ...extra };
    site.symbols.push(s);
    return s;
  };
  const sample = (y) => {
    // eigene Gerätefelder: Beispielwerte, damit Spalte bzw. Bemerkung zu sehen sind
    for (const [i, f] of site.fields.entries()) {
      if (f.kinds.length && !f.kinds.includes(y.kind) && !(f.kinds.includes('custom') && y.kind.startsWith('custom:'))) continue;
      y.fields ||= {};
      y.fields[f.id] = `W-${String(i + 1).padStart(2, '0')}`;
    }
    return y;
  };
  sample(put('camera', 0.14, 0.3, { name: T('Einfahrt', 'Gate'), ip: '192.168.1.21', height: '3,5 m', dir: 90, angle: 70, range: 70, fov: true }));
  sample(put('camera', 0.86, 0.3, { name: T('Lager', 'Storage'), ip: '192.168.1.22', height: '4 m', dir: 270, angle: 70, range: 70, fov: true }));
  sample(put('motion', 0.5, 0.5, { name: T('Flur', 'Corridor'), bus: '1', addr: '12', group: 'MG 3', dir: 0, angle: 90, range: 45, fov: true }));
  sample(put('contact', 0.72, 0.62, { name: T('Tor', 'Door'), bus: '1', addr: '13' }));
  sample(put('recorder', 0.5, 0.8, { name: T('Rekorder', 'Recorder'), ip: '192.168.1.10' }));
  // eigene Symbolarten (aus den Vorgaben): je eine
  site.custom.forEach((c, i) => sample(put('custom:' + c.id, 0.3 + (i % 4) * 0.12, 0.62 + Math.floor(i / 4) * 0.07, { name: T(c.name.de || '', c.name.en || '') })));
  // Linienarten: Wege vom Rekorder zu den Kameras (je Art einer, mit Länge)
  const routes = [
    [[0.5, 0.8], [0.14, 0.8], [0.14, 0.3]],
    [[0.5, 0.8], [0.86, 0.8], [0.86, 0.3]],
    [[0.5, 0.8], [0.5, 0.5]],
    [[0.5, 0.8], [0.72, 0.62]],
  ];
  site.styles
    .filter((t) => !t.area)
    .forEach((t, i) => {
      const pts = routes[i % routes.length].map(([x, y]) => [x, Math.min(0.97, y + Math.floor(i / routes.length) * 0.03)]);
      site.shapes.push({ ...newShape('line', pts), style: t.id, showLen: false });
    });
  // Flächenarten: je eine Zone
  site.styles
    .filter((t) => t.area)
    .forEach((t, i) => {
      const x = 0.24 + (i % 2) * 0.3;
      const y = 0.06 + Math.floor(i / 2) * 0.16;
      const z = newShape('fence', [[x, y], [x + 0.24, y], [x + 0.24, y + 0.13], [x, y + 0.13]]);
      site.shapes.push({ ...z, closed: true, style: t.id, name: T(t.name.de || '', t.name.en || '') });
    });
  return site;
}

function sampleWiring(presets) {
  const w = newWiring(presets);
  w.system = T('Torsteuerung', 'Gate control');
  w.hub = { name: T('Steuerung', 'Controller'), short: T('Steuerung', 'Controller'), model: T('', ''), note: T('', ''), pins: [] };
  const cats = w.categories;
  const cat = (i) => (cats[i % cats.length] || cats[0]).id;
  const marks = w.marks.map((k) => k.id);
  const box = (title, lines, c, side, extra = {}) => {
    const b = { ...newBox(c, side), title: T(title), lines: T(lines), ...extra };
    w.boxes.push(b);
    return b;
  };
  const b1 = box('Lichtschranke', 'Relaisausgang gegen GND', cat(1), 'left', { marks: marks.slice(0, 1), bmk: '-B1', make: T('Satel ACTIVA-6') });
  const b2 = box('Schlüsselschalter', 'Schließer gegen GND', cat(0), 'left', { bmk: '-S1' });
  const b3 = box('Signalleuchte', 'Rot / Grün', cat(2), 'right', { marks: marks.slice(1, 2), bmk: '-P1' });
  const b4 = box('Netzteil 12 V DC', 'Versorgt Steuerung und Lichtschranke', cat(3), 'bottom', { marks: marks.slice(0, 1) });
  const pin = (name, func, b, terminal, extra = {}) => w.hub.pins.push({ ...newPin(name, b.id), func: T(func), terminal: T(terminal), ...extra });
  pin('X1.1', 'Lichtschranke', b1, 'Kontakt 1', { wire: '', cross: '' });
  pin('X1.2', 'Schlüsselschalter', b2, 'Kontakt 2');
  pin('X2.1', 'Leuchte Rot', b3, 'IN1', { marks: marks.slice(1, 2) });
  pin('X3.1', 'Versorgung', b4, '+12 V');
  if (cats[4]) {
    const b5 = box('Bus-Modul', 'RS-485', cat(4), 'right', { bus: true });
    pin('X4.1', 'Bus A/B', b5, 'A/B');
  }
  w.hints = [{ ...newHint(cat(1)), title: T('Lichtschranke'), text: T('Kontakt geschlossen bedeutet Strahl frei, offen bedeutet unterbrochen.') }];
  return w;
}

function sampleAccess(presets) {
  const a = newAccess(presets);
  const dev = (name, ip, extra = {}) => ({
    id: uid('d'),
    sym: null,
    name: T(name),
    ip,
    web: '443',
    user: 'admin',
    password: 'Muster#26',
    role: 'Administrator',
    users: [],
    note: T(''),
    model: '',
    serial: '',
    mac: '',
    firmware: '',
    location: T(''),
    ...extra,
  });
  a.devices.push(
    dev('Rekorder (NVR)', '192.168.1.10', { model: 'Hikvision DS-7608', serial: 'DS7608-0001', mac: 'AA:BB:CC:00:00:10', firmware: 'V4.71', location: T('Technikraum'), users: [{ id: uid('n'), user: 'bediener', password: 'Bedien#1', role: 'Bediener' }] }),
    dev('Kamera Einfahrt', '192.168.1.21', { model: 'Hikvision DS-2CD2', serial: 'DS2CD-0021', mac: 'AA:BB:CC:00:00:21', firmware: 'V5.7', location: T('Hof'), note: T('Bewegungserkennung aktiv') }),
  );
  a.network = { subnet: '255.255.255.0', gateway: '192.168.1.1', dns: '192.168.1.1', dhcp: '192.168.1.100 – 192.168.1.199', vlan: '20', note: T('Eigenes Netz für die Videoanlage') };
  a.wifi.push({ id: uid('w'), link: null, ssid: 'Halle2-Technik', key: 'WLAN#Beispiel', security: presets.security[0] || 'WPA2', note: T('2,4 GHz') });
  a.remote.push({ id: uid('r'), service: presets.services.find((s) => /hik/i.test(s)) || presets.services[0] || 'VPN', address: 'Geräte-ID 123456789', user: 'service', password: 'Fern#2026', note: T('Nur nach Rücksprache') });
  return a;
}

/**
 * Beispieldokument mit den Vorgaben aus `state` ({ cover, look, site, wiring, access }); liefert
 * die Seiten für den Reiter `tab`: [{ label, svg, land }].
 */
export function previewPages(state, tab) {
  const project = newProject('documentation');
  project.title = T('Anlagendokumentation', 'System documentation');
  Object.assign(project.meta, {
    customer: 'Muster GmbH',
    address: 'Musterstraße 1\n12345 Musterstadt',
    site: 'Einbruchmeldeanlage Halle 2',
    technician: 'M. Mustermann',
  });
  project.contacts = [{ id: uid('c'), name: 'Herr Beispiel', role: 'Haustechnik', phone: '+49 123 45678', email: 'technik@muster.de' }];
  const cover = state.cover;
  const docNo = cover.docNo.pattern ? formatDocNo(cover.docNo.pattern, cover.docNo.next, cover.docNo.digits) : 'D-2026-001';
  project.sections = [{ id: uid('s'), type: 'cover' }, sampleSite(state.site), sampleWiring(state.wiring), sampleAccess(state.access)];
  applyPresetsTo(project, { cover, look: state.look, site: state.site, docNo, company: SAMPLE_COMPANY });
  // eigene Deckblatt-Felder: Beispielwert
  for (const f of project.coverFields) if (f.custom) project.extra[f.key] = 'Beispiel';
  if (!project.meta.checked && project.coverFields.some((f) => f.key === 'checked' && f.show)) project.meta.checked = 'E. Prüfer';
  // Zugangsdaten: Passwörter wie eingestellt (Vorschau zeigt sonst Punkte)
  const doc = renderDocument(project);
  const out = [];
  for (const [kind, label] of PAGES[tab] || PAGES.cover) {
    const pages = doc.pages.filter((p) => p.kind === kind);
    pages.slice(0, 2).forEach((p, i) => out.push({ label: pages.length > 1 ? `${label} (${i + 1})` : label, svg: p.svg, land: !!p.land }));
  }
  return out;
}
