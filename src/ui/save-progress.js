/**
 * Kurze Bestätigung nach dem Speichern: ein kleiner Ring läuft voll, der Haken zeichnet sich mit
 * Lichtpunkt (wie bei der Update-Anzeige) – direkt unter der Schaltfläche „Speichern“, ohne den
 * Bildschirm abzudecken und ohne Klicks abzufangen. Nach gut einer Sekunde blendet er aus.
 */
import { htmlToElement } from './dom.js';

const R = 52;
const LEN = 2 * Math.PI * R;
const CHECK = 'M42 61l12 12 25-26';
const reduced = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

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
