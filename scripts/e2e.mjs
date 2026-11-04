#!/usr/bin/env node
/**
 * Startet die e2e-Tests (e2e/e2e.config.ts) ohne Telemetrie an den Hersteller. Weitere Argumente
 * gehen an „e2e run“, z. B. node scripts/e2e.mjs tests/pdf.e2e.ts --retries 0
 */
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(ROOT, 'node_modules', 'e2e', 'dist', 'cli', 'bin.js');
const child = spawn(process.execPath, [cli, 'run', ...process.argv.slice(2)], {
  cwd: path.join(ROOT, 'e2e'),
  stdio: 'inherit',
  env: { ...process.env, E2E_TELEMETRY_DISABLED: '1' },
});
child.on('exit', (code, signal) => process.exit(signal ? 1 : (code ?? 1)));
