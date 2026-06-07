import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

const CANDIDATES = ['qhse_v5__2_.html', 'qhse_v5.html', 'qhse.html'];

export function resolveSourceHtml() {
  for (const name of CANDIDATES) {
    const p = path.join(ROOT, name);
    if (fs.existsSync(p)) {
      const stat = fs.statSync(p);
      return { path: p, name, size: stat.size };
    }
  }
  throw new Error(`Aucune source HTML trouvée. Placez qhse_v5__2_.html à la racine.`);
}
