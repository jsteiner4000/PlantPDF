/**
 * Bestätigung nach dem Speichern, in zwei Stärken:
 * - `saveFlash`: beim Zwischendurch-Speichern ein kleiner Ring mit Haken direkt unter „Speichern“ –
 *   deckt nichts ab, fängt keine Klicks, nach gut einer Sekunde weg.
 * - `saveProgress`: beim Speichern an einen neu gewählten Ort und beim Speichern vor dem Schließen
 *   die Karte wie beim Update (Ring füllt sich, solange die PDF entsteht, dann der leuchtende Haken).
 */
import { escapeHtml, htmlToElement } from './dom.js';
import { RING_LEN, ringMarkup } from './update-banner.js';

const R = 52;
const LEN = 2 * Math.PI * R;
const CHECK = 'M42 61l12 12 25-26';

let current = null;

/** Haken „Gespeichert“ kurz zeigen; `title`: z. B. der Dateiname (Tooltip, Vorlesen). */
export function saveFlash(title = '') {
  current?.remove();
  const el = htmlToElement(
    `<div class="savefx" role="status" aria-live="polite">
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="savefxGrad" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="var(--acc)"/><stop offset="1" stop-color="var(--acc-line)"/></linearGradient>
          <linearGradient id="savefxCheck" gradientUnits="userSpaceOnUse" x1="42" y1="73" x2="79" y2="47"><stop offset="0" stop-color="var(--acc)"/><stop offset="1" stop-color="#7dd3fc"/></linearGradient>
        </defs>
        <circle class="savefx-track" cx="60" cy="60" r="${R}"/>
        <circle class="savefx-arc" cx="60" cy="60" r="${R}" stroke-dasharray="${LEN}" stroke-dashoffset="${LEN}"/>
        <path class="savefx-check" d="${CHECK}"/>
        <circle class="savefx-tip" r="5"><animateMotion dur="0.3s" begin="indefinite" fill="freeze" path="${CHECK}" calcMode="spline" keyPoints="0;1" keyTimes="0;1" keySplines="0.65 0 0.35 1"/></circle>
      </svg>
      <span>Gespeichert</span>
    </div>`,
  );
  if (title) el.title = title;
  // unter „Speichern“ (rechtsbündig), sonst oben rechts
  const btn = document.getElementById('bSave');
  const r = btn && btn.offsetParent ? btn.getBoundingClientRect() : null;
  el.style.top = (r ? r.bottom + 8 : 56) + 'px';
  el.style.right = (r ? Math.max(8, innerWidth - r.right) : 16) + 'px';
  document.body.appendChild(el);
  current = el;
  requestAnimationFrame(() =>
    requestAnimationFrame(() => {
      el.classList.add('in');
      if (!reduced()) setTimeout(() => el.querySelector('animateMotion')?.beginElement?.(), 260);
    }),
  );
  setTimeout(() => {
    el.classList.remove('in');
    setTimeout(() => {
      el.remove();
      if (current === el) current = null;
    }, 220);
  }, 1300);
  return el;
}

/* ---------- Große Karte ---------- */

const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Karte „… wird gespeichert“ zeigen. Ergebnis: { done(name), fail() } – `done` wartet, bis der Haken
 * gezeichnet ist und die Karte wieder zu ist.
 */
export function saveProgress(title, sub = 'Die PDF wird erstellt …') {
  const el = htmlToElement(
    `<div class="updx saving installing" role="dialog" aria-modal="true" aria-label="Speichern">
      <div class="updx-card">
        ${ringMarkup()}
        <h3>${escapeHtml(title)}</h3>
        <p class="updx-sub" aria-live="polite">${escapeHtml(sub)}</p>
      </div>
    </div>`,
  );
  document.body.appendChild(el);
  const arc = el.querySelector('.updx-arc');
  const started = performance.now();
  requestAnimationFrame(() => {
    el.classList.add('in');
    // langsam bis knapp vor voll – der Rest folgt, wenn die Datei geschrieben ist
    requestAnimationFrame(() => (arc.style.strokeDashoffset = String(RING_LEN * 0.14)));
  });
  const close = async () => {
    el.classList.remove('in');
    await wait(230);
    el.remove();
  };
  return {
    async done(name = '') {
      // nicht nur aufblitzen: der Ring ist mindestens kurz zu sehen
      const rest = 650 - (performance.now() - started);
      if (rest > 0) await wait(rest);
      el.classList.remove('installing');
      el.classList.add('installed');
      arc.style.strokeDashoffset = '0';
      el.querySelector('h3').textContent = 'Gespeichert';
      el.querySelector('.updx-sub').textContent = name ? `„${name}“` : 'Alles ist gesichert.';
      await wait(360);
      el.classList.add('done');
      if (!reduced()) el.querySelector('.updx-tip animateMotion')?.beginElement?.();
      await wait(reduced() ? 500 : 1150);
      await close();
    },
    fail: close,
  };
}
