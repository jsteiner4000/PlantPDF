/**
 * Kleiner Webserver für die e2e-Tests: liefert dist/ (die gebaute Browser-Fassung von PlantPDF)
 * unter http://127.0.0.1:4173 aus. Ohne weitere Pakete, auf Windows, macOS und Linux gleich.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT || 4173);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.txt': 'text/plain; charset=utf-8' };

createServer(async (req, res) => {
  const url = new URL(req.url, 'http://localhost');
  const file = path.join(DIST, decodeURIComponent(url.pathname === '/' ? '/PDF-Editor.html' : url.pathname));
  if (!file.startsWith(DIST + path.sep)) return res.writeHead(403).end();
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'content-type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Nicht gefunden');
  }
}).listen(PORT, '127.0.0.1', () => console.log(`PlantPDF (dist/) auf http://127.0.0.1:${PORT}`));
