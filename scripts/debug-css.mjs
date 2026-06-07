import fs from 'fs';
const html = fs.readFileSync('qhse.html', 'utf8');
const head = html.match(/<head>([\s\S]*?)<\/head>/i)?.[1];
console.log('head len', head?.length);
const styles = [...head.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1].trim());
console.log('count', styles.length);
styles.forEach((s, i) =>
  console.log(i, s.length, s.includes(':root'), s.includes('.topbar'), s.includes('<meta'))
);
