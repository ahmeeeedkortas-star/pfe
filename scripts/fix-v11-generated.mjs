import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/modules-v11/generated');
const re = /document\.getElementById\(\\'content\\'\)\.innerHTML=PAGES\[\\'([^']+)\\'\]\(\)/g;

for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.js') && f !== 'index.js')) {
  const fp = path.join(dir, file);
  let code = fs.readFileSync(fp, 'utf8');
  const next = code.replace(re, "reloadPage(\\'$1\\')");
  if (file === 'v11_doc_edit.js' && next.includes("PAGES['doc-create']")) {
    const patched = next
      .replace("import { v11_doc_create }", "import { v11_doc_create }")
      .replace(/if\(!d\) return PAGES\['doc-create'\]\(\);/, 'if(!d) return v11_doc_create();');
    if (!patched.includes("import { v11_doc_create }")) {
      fs.writeFileSync(
        fp,
        patched.replace(
          '/** Auto-generated',
          "import { v11_doc_create } from './v11_doc_create.js';\n/** Auto-generated",
        ),
      );
    } else {
      fs.writeFileSync(fp, patched);
    }
    console.log('fixed doc_edit');
  } else if (next !== code) {
    fs.writeFileSync(fp, next);
    console.log('fixed', file);
  }
}
