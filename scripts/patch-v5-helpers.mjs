/**
 * Injecte renderCauseSelector / renderActionsEditor dans 8D et QRQC.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

function patch(filePath, rules) {
  let s = fs.readFileSync(filePath, 'utf8');
  let n = 0;
  for (const [re, repl] of rules) {
    if (re.test(s)) {
      s = s.replace(re, repl);
      n++;
    }
  }
  fs.writeFileSync(filePath, s);
  console.log('  ✓', path.basename(filePath), `(${n})`);
}

console.log('Patch v5 helpers:\n');

patch(path.join(ROOT, 'src/legacy/pages/rc.pages.js'), [
  [
    /    4:`<motion-div class="fgrid">[\s\S]*?Erreur de cotation sur le plan<\/textarea><\/div><\/div>`/,
    "    4:`${typeof renderCauseSelector==='function'?renderCauseSelector('rc_d4_method','rc_d4','rc-8d'):''}`",
  ],
  [
    /    4:`<div class="fgrid">[\s\S]*?Erreur de cotation sur le plan<\/textarea><\/div><\/div>`/,
    "    4:`${typeof renderCauseSelector==='function'?renderCauseSelector('rc_d4_method','rc_d4','rc-8d'):''}`",
  ],
  [
    /    5:`<div class="fgrid"><div class="fg full"><label class="fl">Action corrective[\s\S]*?value="2024-05-07"><\/div><\/div>`/,
    "    5:`${typeof renderActionsEditor==='function'?renderActionsEditor('rc_d5','rc-8d'):''}`",
  ],
]);

patch(path.join(ROOT, 'src/legacy/pages/nc.pages.js'), [
  [
    /    2:`<div class="fgrid">[\s\S]*?pas de contrôle périodique en place\.<\/textarea><\/div><\/div>`/,
    "    2:`${typeof renderCauseSelector==='function'?renderCauseSelector('nc_qrqc_method','nc_qrqc','nc-qrqc'):''}`",
  ],
]);
