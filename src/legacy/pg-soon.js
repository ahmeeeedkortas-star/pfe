/** @legacy */
function pgSoon(mod) {
  const labels={reunion:'Réunion QRQC',sec:'Sécurité SST',env:'Environnement',smi:'SMI / Documents',ind:'Indicateurs'};
  return `<div style="text-align:center;padding:80px 20px;color:var(--muted)">
    <div style="font-size:40px;margin-bottom:14px">🚧</div>
    <div style="font-size:16px;font-weight:600;color:var(--navy);margin-bottom:6px">Module ${labels[mod]||mod} en développement</div>
    <div style="font-size:13px">Ce module sera disponible prochainement.</div>
    <button class="btn bp" style="margin-top:18px" onclick="goHome()">← Retour à l'accueil</button>
  </div>`;
}

/* ════════════════════════════════════
   INIT
═══════════════════════════════════ */

window.pgSoon = pgSoon;
export { pgSoon };

