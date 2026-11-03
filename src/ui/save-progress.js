/**
 * Anzeige beim Speichern vor dem Schließen: dieselbe Karte wie beim Update (Ring, danach der
 * leuchtende Haken). Der Ring füllt sich langsam, solange die PDF entsteht, läuft am Ende voll,
 * der Haken zeichnet sich – dann schließt die Karte. Der Fortschritt ist nicht messbar, deshalb
 * ohne Prozentzahl.
 */
import { escapeHtml, htmlToElement } from './dom.js';
import { RING_LEN, ringMarkup } from './update-banner.js';

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
