/** @legacy — registre des pages */
const PAGES = {

/* ── ACCUEIL ── */
'accueil': () => `
<div class="home-wrap" style="margin:-16px -18px;min-height:calc(100vh - 48px - 46px)">

  <!-- ══ FOND ══ -->
  <div class="home-bg">
    <div class="home-grid-lines"></div>
    <!-- Glows -->
    <div class="home-glow" style="width:500px;height:500px;background:rgba(37,99,235,.16);top:-180px;left:-80px"></div>
    <div class="home-glow" style="width:400px;height:400px;background:rgba(220,38,38,.1);bottom:-150px;right:-80px"></div>
    <div class="home-glow" style="width:350px;height:350px;background:rgba(22,163,74,.08);top:40%;left:50%;transform:translate(-50%,-50%)"></div>
    <!-- Motif mécanique décoratif -->
    <svg style="position:absolute;top:15px;right:30px;opacity:.04" width="280" height="280" viewBox="0 0 280 280">
      <circle cx="140" cy="140" r="120" fill="none" stroke="#fff" stroke-width="1.5"/>
      <circle cx="140" cy="140" r="80" fill="none" stroke="#fff" stroke-width="1"/>
      <circle cx="140" cy="140" r="40" fill="none" stroke="#fff" stroke-width="1"/>
      <line x1="20" y1="140" x2="260" y2="140" stroke="#fff" stroke-width="1"/>
      <line x1="140" y1="20" x2="140" y2="260" stroke="#fff" stroke-width="1"/>
      <line x1="55" y1="55" x2="225" y2="225" stroke="#fff" stroke-width=".5"/>
      <line x1="225" y1="55" x2="55" y2="225" stroke="#fff" stroke-width=".5"/>
    </svg>
    <svg style="position:absolute;bottom:60px;left:20px;opacity:.035" width="200" height="200" viewBox="0 0 200 200">
      <rect x="15" y="15" width="170" height="170" rx="8" fill="none" stroke="#fff" stroke-width="1.5"/>
      <rect x="45" y="45" width="110" height="110" rx="5" fill="none" stroke="#fff" stroke-width="1"/>
      <line x1="15" y1="100" x2="185" y2="100" stroke="#fff" stroke-width=".8"/>
      <line x1="100" y1="15" x2="100" y2="185" stroke="#fff" stroke-width=".8"/>
      <circle cx="100" cy="100" r="25" fill="none" stroke="#fff" stroke-width="1.2"/>
    </svg>
  </div>

  <!-- ══ CONTENU ══ -->
  <div class="home-content">

    <!-- HEADER BRANDING -->
    <div class="home-header">
      <!-- Logo + nom -->
      <div style="display:flex;align-items:center;justify-content:center;gap:14px;margin-bottom:8px">
        <img src="src/data/image/logo.png" style="height:64px;width:auto;object-fit:contain;filter:brightness(0) invert(1) drop-shadow(0 2px 10px rgba(37,99,235,.6))" alt="XPERT-MECA">
        
        <div>
          <div style="font-size:30px;font-weight:900;color:#fff;letter-spacing:.1em;line-height:1;text-shadow:0 2px 20px rgba(37,99,235,.5)">XPERT-MECA</div>
          <div style="font-size:10px;font-weight:700;color:#dc2626;letter-spacing:.28em;text-transform:uppercase;margin-top:3px">Notre expérience fait la différence</div>
        </div>
      </div>
      <!-- Sous-titre -->
      <div style="font-size:11.5px;color:rgba(255,255,255,.4);font-weight:500;letter-spacing:.05em">Plateforme SMI · QHSE · ISO 9001 · ISO 14001 · ISO 45001</div>
      <!-- KPIs -->
      <div style="display:flex;gap:10px;justify-content:center;margin-top:14px;flex-wrap:wrap">
        ${[['3','🚨','Alertes critiques','#dc2626','rgba(220,38,38,.18)'],['8','⏰','Actions en retard','#f97316','rgba(249,115,22,.15)'],['94%','✅','Conformité globale','#16a34a','rgba(22,163,74,.15)'],['Mai 2026','📅','Période active','#60a5fa','rgba(96,165,250,.12)']].map(([v,ic,l,c,bg])=>`
        <div style="background:${bg};border:1px solid ${c}40;border-radius:9px;padding:7px 13px;display:flex;align-items:center;gap:8px;backdrop-filter:blur(10px)">
          <span style="font-size:14px">${ic}</span>
          <div><div style="font-size:14px;font-weight:700;color:${c};line-height:1;font-family:monospace">${v}</div><div style="font-size:9px;color:rgba(255,255,255,.45);margin-top:1px">${l}</div></div>
        </div>`).join('')}
      </div>
    </div>

    <!-- TITRE SECTION -->
    <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,.3);text-transform:uppercase;letter-spacing:.2em;margin-bottom:20px;animation:fadeUp .6s .1s ease both;opacity:0;animation-fill-mode:both">● Modules disponibles</div>

    <!-- ══ MODULES GRILLE ══ -->
    <div style="display:flex;gap:18px;justify-content:center;flex-wrap:wrap;width:100%;max-width:760px;animation:fadeUp .6s .15s ease both;opacity:0;animation-fill-mode:both">
      ${[
        {mod:'rc',  label:'Réclamations Clients',  sub:'ISO 9001 · 8D',  badge:7,  bc:'#dc2626',
          bg:'linear-gradient(145deg,#1e3a8a 0%,#1d4ed8 60%,#2563eb 100%)',
          shadow:'0 8px 28px rgba(37,99,235,.45)',
          icon:`<svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <!-- Client silhouette -->
            <circle cx="16" cy="13" r="6.5" fill="rgba(255,255,255,.85)"/>
            <path d="M4 37 C4 26 28 26 28 37" fill="rgba(255,255,255,.7)"/>
            <!-- Complaint speech bubble -->
            <rect x="24" y="3" width="19" height="15" rx="4.5" fill="rgba(255,255,255,.97)" stroke="rgba(255,255,255,.4)" stroke-width=".8"/>
            <path d="M26 18 L22 24 L32 18" fill="rgba(255,255,255,.97)"/>
            <!-- Exclamation mark inside bubble -->
            <line x1="33.5" y1="7" x2="33.5" y2="12.5" stroke="#1e40af" stroke-width="2.8" stroke-linecap="round"/>
            <circle cx="33.5" cy="15.5" r="1.6" fill="#1e40af"/>
          </svg>`},
        {mod:'nc',  label:'Non-Conformités',       sub:'QRQC · Suivi',   badge:12, bc:'#dc2626',
          bg:'linear-gradient(145deg,#7f1d1d 0%,#b91c1c 60%,#dc2626 100%)',
          shadow:'0 8px 28px rgba(220,38,38,.45)',
          icon:`<svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <!-- Industrial part / gear -->
            <circle cx="19" cy="23" r="13" fill="rgba(255,255,255,.12)" stroke="rgba(255,255,255,.6)" stroke-width="1.8" stroke-dasharray="5 2.5"/>
            <circle cx="19" cy="23" r="5.5" fill="rgba(255,255,255,.18)" stroke="rgba(255,255,255,.65)" stroke-width="1.8"/>
            <!-- Gear teeth -->
            <line x1="19" y1="8" x2="19" y2="11" stroke="rgba(255,255,255,.7)" stroke-width="3" stroke-linecap="round"/>
            <line x1="19" y1="35" x2="19" y2="38" stroke="rgba(255,255,255,.7)" stroke-width="3" stroke-linecap="round"/>
            <line x1="5" y1="23" x2="8" y2="23" stroke="rgba(255,255,255,.7)" stroke-width="3" stroke-linecap="round"/>
            <line x1="30" y1="23" x2="33" y2="23" stroke="rgba(255,255,255,.7)" stroke-width="3" stroke-linecap="round"/>
            <!-- Red rejection stamp circle -->
            <circle cx="34" cy="12" r="10" fill="rgba(220,38,38,.92)" stroke="rgba(255,255,255,.5)" stroke-width="1.5"/>
            <!-- X cross in rejection circle -->
            <line x1="29" y1="7" x2="39" y2="17" stroke="white" stroke-width="3.2" stroke-linecap="round"/>
            <line x1="39" y1="7" x2="29" y2="17" stroke="white" stroke-width="3.2" stroke-linecap="round"/>
          </svg>`},
        {mod:'audit', label:'Audit & Documentation', sub:'ISO · Checklist', badge:4, bc:'#0284c7',
          bg:'linear-gradient(145deg,#14532d 0%,#15803d 60%,#16a34a 100%)',
          shadow:'0 8px 28px rgba(22,163,74,.4)',
          icon:`<svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <!-- Clipboard body -->
            <rect x="4" y="8" width="24" height="33" rx="3.5" fill="rgba(255,255,255,.13)" stroke="rgba(255,255,255,.7)" stroke-width="1.8"/>
            <!-- Clipboard clip -->
            <rect x="12" y="5" width="8" height="7" rx="2" fill="rgba(255,255,255,.3)" stroke="rgba(255,255,255,.7)" stroke-width="1.5"/>
            <!-- Checklist lines with ticks -->
            <line x1="10" y1="17" x2="22" y2="17" stroke="rgba(255,255,255,.5)" stroke-width="1.3"/>
            <path d="M9 16 L10.5 17.5 L13 14.5" stroke="rgba(255,255,255,.9)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="10" y1="23" x2="22" y2="23" stroke="rgba(255,255,255,.5)" stroke-width="1.3"/>
            <path d="M9 22 L10.5 23.5 L13 20.5" stroke="rgba(255,255,255,.9)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="10" y1="29" x2="18" y2="29" stroke="rgba(255,255,255,.5)" stroke-width="1.3"/>
            <path d="M9 28 L10.5 29.5 L13 26.5" stroke="rgba(255,255,255,.55)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 0"/>
            <!-- Magnifying glass -->
            <circle cx="34" cy="32" r="9.5" fill="rgba(255,255,255,.13)" stroke="rgba(255,255,255,.92)" stroke-width="2.4"/>
            <circle cx="34" cy="32" r="5.5" fill="rgba(255,255,255,.15)"/>
            <line x1="40.8" y1="38.8" x2="45" y2="43" stroke="rgba(255,255,255,.92)" stroke-width="3" stroke-linecap="round"/>
          </svg>`},
        {mod:'sec', label:'Sécurité SST',           sub:'ISO 45001 · DUERP', badge:2, bc:'#ea580c',
          bg:'linear-gradient(145deg,#7c2d12 0%,#c2410c 60%,#ea580c 100%)',
          shadow:'0 8px 28px rgba(234,88,12,.42)',
          icon:`<svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <!-- Hard hat dome -->
            <path d="M23 5 C10 5 4 16 4 24 L42 24 C42 16 36 5 23 5 Z" fill="rgba(255,255,255,.88)"/>
            <!-- Dome highlight -->
            <path d="M12 13 C15 9 20 7 23 7 C27 7 31 9 34 13" stroke="rgba(255,255,255,.5)" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <!-- Orange stripe on dome -->
            <path d="M4 20 C4 20 23 17 42 20" stroke="rgba(234,88,12,.6)" stroke-width="3" fill="none"/>
            <!-- Brim -->
            <rect x="2" y="24" width="42" height="6.5" rx="3" fill="rgba(255,255,255,.82)"/>
            <!-- Safety cross on dome -->
            <line x1="23" y1="10" x2="23" y2="19" stroke="rgba(234,88,12,.75)" stroke-width="2.8" stroke-linecap="round"/>
            <line x1="18.5" y1="14.5" x2="27.5" y2="14.5" stroke="rgba(234,88,12,.75)" stroke-width="2.8" stroke-linecap="round"/>
            <!-- Chinstrap hint -->
            <path d="M10 30.5 C10 38 36 38 36 30.5" stroke="rgba(255,255,255,.5)" stroke-width="1.5" fill="none" stroke-dasharray="2.5 2"/>
          </svg>`},
        {mod:'env', label:'Environnement',           sub:'ISO 14001 · Impact', badge:3, bc:'#16a34a',
          bg:'linear-gradient(145deg,#064e3b 0%,#047857 60%,#059669 100%)',
          shadow:'0 8px 28px rgba(5,150,105,.4)',
          icon:`<svg width="46" height="46" viewBox="0 0 46 46" fill="none">
            <!-- Large organic leaf shape -->
            <path d="M23 41 C23 41 4 30 4 15 C4 15 14 3 28 8 C37 11 44 22 40 34 C37 41 23 41 23 41 Z" fill="rgba(255,255,255,.85)" stroke="rgba(255,255,255,.4)" stroke-width="1"/>
            <!-- Central vein -->
            <path d="M23 41 C21 31 12 19 8 13" stroke="rgba(5,100,70,.65)" stroke-width="2.2" stroke-linecap="round" fill="none"/>
            <!-- Secondary veins -->
            <path d="M14 30 C18 25 22 23 28 20" stroke="rgba(5,100,70,.45)" stroke-width="1.6" stroke-linecap="round" fill="none"/>
            <path d="M11 23 C16 19 20 18 26 15" stroke="rgba(5,100,70,.45)" stroke-width="1.6" stroke-linecap="round" fill="none"/>
            <path d="M10 17 C14 14 18 13 23 12" stroke="rgba(5,100,70,.35)" stroke-width="1.4" stroke-linecap="round" fill="none"/>
            <!-- Small recycling arrow -->
            <path d="M34 36 C38 33 40 28 38 23" stroke="rgba(255,255,255,.75)" stroke-width="2" stroke-linecap="round" fill="none"/>
            <polygon points="38,23 43,27 35,28" fill="rgba(255,255,255,.75)"/>
          </svg>`},
      ].map((m,i)=>`
      <div class="hmod" onclick="goModule('${m.mod}')" style="animation-delay:${.1+i*.07}s">
        <div class="hmod-wrap" style="background:${m.bg};box-shadow:${m.shadow}">
          <div class="hmod-shine"></div>
          ${m.icon}
          <div class="hmod-badge" style="background:${m.bc}">${m.badge}</div>
        </div>
        <div class="hmod-title">${m.label}</div>
        <div class="hmod-sub">${m.sub}</div>
      </div>`).join('')}
    </div>

    <!-- FOOTER INFO -->
    <div style="margin-top:auto;padding-top:22px;text-align:center;animation:fadeUp .6s .5s ease both;opacity:0;animation-fill-mode:both">
      <div style="font-size:10px;color:rgba(255,255,255,.2);letter-spacing:.06em">SMI · Plateforme QHSE — XPERT-MECA · Responsable QHSE : KORTAS.A</div>
    </div>

  </div>
</div>`,
/* ══════════════════════════════════════
   RC PAGES
══════════════════════════════════════ */
'rc-liste': () => {
  const total=RC_DATA.length, ouv=RC_DATA.filter(r=>r.s!=='Clôturée').length, crit=RC_DATA.filter(r=>r.g==='Critique').length, clo=RC_DATA.filter(r=>r.s==='Clôturée').length;
  const projs=[...new Set(RC_DATA.map(r=>r.p))].sort();
  const clients=[...new Set(RC_DATA.map(r=>r.cl))].sort();
  const rows=RC_DATA.map(r=>`<tr>
    <td><span class="link" onclick="goPage('rc-fiche')">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td><td><span style="background:#eff6ff;color:#1e40af;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:600">${r.p}</span></td><td><strong>${r.cl}</strong></td><td>${r.dep}</td>
    <td style="max-width:180px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.obj}">${r.obj}</td>
    <td><span class="badge ${badgeG(r.g)}">${r.g}</span></td>
    <td><span class="badge ${badgeS(r.s)}">${r.s}</span></td>
    <td>${r.r}</td><td>${r.dl}</td>
    <td><button class="btn bsm" onclick="goPage('rc-fiche')">Voir</button></td>
  </tr>`).join('');
  return `
  <!-- KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:12px">
    ${[['Total RC',total,'var(--blue)','📋'],['Ouvertes',ouv,'var(--orange)','🔓'],['Critiques',crit,'var(--red)','🚨'],['Clôturées',clo,'var(--green)','✅'],['Délai moyen','8,6 j','var(--navy)','⏱']].map(([l,v,c,ic])=>`
    <div style="background:var(--white);border:1px solid var(--border);border-radius:9px;padding:11px 12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">${ic}</span>
      <div><div style="font-size:20px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:10px;color:var(--muted);margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>

  <!-- Filtres dynamiques -->
  <div class="card" style="padding:10px 14px;margin-bottom:10px">
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:4px 9px;flex:1;min-width:180px">
        <span style="color:var(--muted)">🔍</span>
        <input id="rc-fq" placeholder="Rechercher N°, client, problème…" style="border:none;background:transparent;font-size:11px;color:var(--text);outline:none;width:100%;font-family:'Inter',sans-serif" oninput="filterRC()">
      </div>
      <select id="rc-fp" class="sel" onchange="filterRC()"><option value="Tous">Projet : Tous</option>${projs.map(p=>`<option value="${p}">${p}</option>`).join('')}</select>
      <select id="rc-fc" class="sel" onchange="filterRC()"><option value="Tous">Client : Tous</option>${clients.map(c=>`<option value="${c}">${c}</option>`).join('')}</select>
      <select id="rc-fs" class="sel" onchange="filterRC()"><option value="Tous">Statut : Tous</option><option>En traitement</option><option>En analyse</option><option>Ouvert</option><option>Clôturée</option></select>
      <select id="rc-fg" class="sel" onchange="filterRC()"><option value="Tous">Gravité : Tous</option><option>Critique</option><option>Majeure</option><option>Mineure</option></select>
      <button class="btn bsm" onclick="document.getElementById('rc-fq').value='';['rc-fp','rc-fc','rc-fs','rc-fg'].forEach(id=>document.getElementById(id).value='Tous');filterRC()">✕ Réinitialiser</button>
      <span id="rc-cnt" style="font-size:10px;color:var(--muted);margin-left:4px">${total} résultats</span>
    </div>
  </div>

  <!-- Table dynamique -->
  <div class="card" style="padding:0;overflow:hidden">
    <div style="overflow-x:auto">
      <table class="tbl" style="min-width:900px">
        <thead><tr>
          <th>N° RC</th><th>Date</th><th>Projet</th><th>Client</th><th>Département</th><th>Problème</th><th>Gravité</th><th>Statut</th><th>Responsable</th><th>Délai</th><th></th>
        </tr></thead>
        <tbody id="rc-tbody">${rows}</tbody>
      </table>
    </div>
  </div>`;
},

'rc-new': () => {
  return `
  <div class="card" style="max-width:760px;margin:0 auto">
    <div style="background:linear-gradient(135deg,#1e3a8a,#2563eb);border-radius:9px 9px 0 0;padding:16px 20px;margin:-15px -15px 18px">
      <div style="font-size:14px;font-weight:700;color:#fff">✉ Nouvelle Réclamation Client</div>
      <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:2px">Formulaire de déclaration · Numérotation automatique</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:13px">
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Projet *</label><select id="rcn-proj" class="fi" style="width:100%"><option>M077</option><option>M081</option><option>M085</option><option>M090</option><option>P002</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Client *</label><select id="rcn-cl" class="fi" style="width:100%"><option>Client A</option><option>Client B</option><option>Client C</option><option>Airbus</option><option>Safran</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Département</label><select id="rcn-dep" class="fi" style="width:100%"><option>BE Mécanique</option><option>Usinage</option><option>Assemblage</option><option>Qualité</option><option>Logistique</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Responsable</label><input id="rcn-resp" class="fi" placeholder="Ex: KORTAS.A" style="width:100%"></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Gravité *</label><select id="rcn-grav" class="fi" style="width:100%"><option>Critique</option><option>Majeure</option><option>Mineure</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Délai de traitement</label><select id="rcn-dl" class="fi" style="width:100%"><option>5 jours</option><option>10 jours</option><option>15 jours</option><option>30 jours</option></select></div>
      <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Titre de la réclamation *</label><input id="rcn-titre" class="fi" placeholder="Description courte du problème signalé…" style="width:100%"></div>
      <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Description détaillée</label><textarea id="rcn-desc" class="fi" placeholder="Décrire précisément le problème : symptômes, impact, contexte…" style="width:100%;min-height:80px;resize:vertical"></textarea></div>
    </div>
    <div style="margin-top:18px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center">
      <button class="btn" onclick="goPage('rc-liste')">← Annuler</button>
      <button class="btn bp" onclick="(()=>{const t=document.getElementById('rcn-titre').value.trim();if(!t){document.getElementById('rcn-titre').style.borderColor='#dc2626';return;}const n='RC-'+(RC_DATA.length+1).toString().padStart(3,'0');const now=new Date();const d=now.getDate().toString().padStart(2,'0')+'/'+(now.getMonth()+1).toString().padStart(2,'0')+'/'+now.getFullYear();RC_DATA.push({n,d,p:document.getElementById('rcn-proj').value,cl:document.getElementById('rcn-cl').value,dep:document.getElementById('rcn-dep').value,r:document.getElementById('rcn-resp').value||'Non assigné',g:document.getElementById('rcn-grav').value,s:'Ouvert',dl:document.getElementById('rcn-dl').value,obj:t,prog:0});alert('Réclamation '+n+' créée !');goPage('rc-liste');})()">✓ Créer la réclamation</button>
    </div>
  </div>`;
},

'rc-fiche': () => `
  <div class="g23">
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">Réclamation N° 001</span>
        <div style="display:flex;gap:5px;align-items:center"><span class="status-pill">EN TRAITEMENT</span><button class="btn bsm">✏</button><button class="btn bsm">⋮</button></div>
      </div>
      <div class="tabs">
        <div class="tab${STATE.ficheTab==='info'?' active':''}" onclick="STATE.ficheTab='info';document.getElementById('content').innerHTML=PAGES['rc-fiche']()">Informations</div>
        <div class="tab${STATE.ficheTab==='d8'?' active':''}" onclick="STATE.ficheTab='d8';document.getElementById('content').innerHTML=PAGES['rc-fiche']()">Traitement 8D</div>
        <div class="tab${STATE.ficheTab==='actions'?' active':''}" onclick="STATE.ficheTab='actions';document.getElementById('content').innerHTML=PAGES['rc-fiche']()">Actions</div>
        <div class="tab${STATE.ficheTab==='histo'?' active':''}" onclick="STATE.ficheTab='histo';document.getElementById('content').innerHTML=PAGES['rc-fiche']()">Historique</div>
      </div>
      ${STATE.ficheTab==='info'?`
        <div class="g2" style="gap:12px">
          <div>${[['Projet','M077'],['Client','Client A'],['Date','02/05/2024'],['Département','BE Mécanique'],['Responsable','KORTAS.A']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}<div class="drow"><span class="dk">Gravité</span><span class="badge br">Critique</span></div></div>
          <div><div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:4px">TITRE</div><div style="font-size:13px;font-weight:600;margin-bottom:9px">Erreur de dimension sur pièce usinée</div><div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:4px">DESCRIPTION</div><div style="font-size:11px;color:var(--muted);line-height:1.5;margin-bottom:9px">La pièce livrée présente un diamètre inférieur à la spécification du plan.</div><span style="color:var(--blue);font-size:11px;cursor:pointer">📎 photo_piece.jpg</span></div>
        </div>`:
      STATE.ficheTab==='d8'?`
        <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Progression traitement 8D</div>
        ${timelineHTML(['Équipe','Desc.','Actions','Cause','Corr.','Valid.','Prév.','Clôture'],3)}
        <div style="text-align:center;margin-top:11px"><button class="btn bp bsm" onclick="goPage('rc-8d')">Continuer le traitement 8D →</button></div>`:
      STATE.ficheTab==='actions'?actionsTableRC():
      `<div style="padding:20px 0;text-align:center;color:var(--muted)">3 modifications enregistrées</div>`}
    </div>
    ${kpiSideRC()}
  </div>`,

'rc-8d': () => {
  const names=['Équipe','Description','Actions imm.','Cause racine','Actions corr.','Validation','Prévention','Clôture'];
  const forms={
    1:`<div class="fgrid"><div class="fg"><label class="fl">Responsable qualité <span>*</span></label><select class="fi"><option>KORTAS.A</option></select></div><div class="fg"><label class="fl">Département <span>*</span></label><select class="fi"><option>BE Mécanique</option></select></div><div class="fg"><label class="fl">Chef d'équipe</label><select class="fi"><option>Y. Reda</option></select></div><div class="fg"><label class="fl">Date lancement</label><input type="date" class="fi" value="2024-05-02"></div><div class="fg full"><label class="fl">Membres équipe</label><input class="fi" value="M. Karim, H. Saldi"></div></div>`,
    2:`<div class="fgrid"><div class="fg"><label class="fl">Où ? <span>*</span></label><input class="fi" value="Poste d\'usinage - U5"></div><div class="fg"><label class="fl">Quand ?</label><input type="date" class="fi" value="2024-05-02"></div><div class="fg"><label class="fl">Pièces impactées</label><input class="fi" type="number" value="10"></div><div class="fg"><label class="fl">Statut</label><select class="fi"><option>Terminé</option></select></div><div class="fg full"><label class="fl">Description <span>*</span></label><textarea class="fi">Diamètre mesuré = 24,8 mm au lieu de 25 mm selon plan.</textarea></div></div>`,
    3:`<div class="fgrid"><div class="fg full"><label class="fl">Action immédiate <span>*</span></label><input class="fi" value="Blocage des pièces en cours"></div><div class="fg"><label class="fl">Type action</label><select class="fi"><option>Contention</option><option>Tri</option></select></div><div class="fg"><label class="fl">Responsable <span>*</span></label><select class="fi"><option>Y. Reda</option></select></div><div class="fg"><label class="fl">Date début</label><input type="date" class="fi" value="2024-05-02"></div><div class="fg"><label class="fl">Date fin prévue</label><input type="date" class="fi" value="2024-05-03"></div><div class="fg"><label class="fl">Statut</label><select class="fi"><option>Terminé</option></select></div></div>`,
    4:`<div class="fgrid"><div class="fg"><label class="fl">Méthode <span>*</span></label><select class="fi"><option>5 Pourquoi</option><option>Ishikawa</option></select></div><div class="fg"><label class="fl">Catégorie cause</label><select class="fi"><option>Conception</option><option>Process</option><option>Matière</option></select></div><div class="fg"><label class="fl">Validé par</label><select class="fi"><option>KORTAS.A</option></select></div><div class="fg"><label class="fl">Date validation</label><input type="date" class="fi" value="2024-05-04"></div><div class="fg full"><label class="fl">Cause racine <span>*</span></label><textarea class="fi">Erreur de cotation sur le plan</textarea></div></div>`,
    5:`<div class="fgrid"><div class="fg full"><label class="fl">Action corrective <span>*</span></label><input class="fi" value="Modifier plan et mettre à jour la nomenclature"></div><div class="fg"><label class="fl">Type</label><select class="fi"><option>Correction</option><option>Prévention</option></select></div><div class="fg"><label class="fl">Responsable <span>*</span></label><select class="fi"><option>M. Karim</option></select></div><div class="fg"><label class="fl">Priorité</label><select class="fi"><option>Haute</option></select></div><div class="fg"><label class="fl">Date début</label><input type="date" class="fi" value="2024-05-04"></div><div class="fg"><label class="fl">Date fin prévue</label><input type="date" class="fi" value="2024-05-07"></div></div>`,
    6:`<div class="fgrid"><div class="fg"><label class="fl">Test réalisé ? <span>*</span></label><div class="radio-row"><label><input type="radio" checked> Oui</label><label><input type="radio"> Non</label></div></div><div class="fg"><label class="fl">Résultat test <span>*</span></label><select class="fi"><option>OK</option><option>NOK</option></select></div><div class="fg"><label class="fl">Validé par</label><select class="fi"><option>KORTAS.A</option></select></div><div class="fg"><label class="fl">Date validation</label><input type="date" class="fi" value="2024-05-08"></div><div class="fg full"><label class="fl">Commentaire</label><textarea class="fi">Dimension conforme après mise à jour du plan.</textarea></div></div>`,
    7:`<div class="fgrid"><div class="fg full"><label class="fl">Action préventive <span>*</span></label><textarea class="fi">Mise à jour de la procédure de contrôle dimensionnel</textarea></div><div class="fg"><label class="fl">Mise à jour</label><select class="fi"><option>Procédure</option><option>AMDEC</option></select></div><div class="fg"><label class="fl">Formation nécessaire ?</label><div class="radio-row"><label><input type="radio" checked> Oui</label><label><input type="radio"> Non</label></div></div></div>`,
    8:`<div class="fgrid"><div class="fg full"><label class="fl">Résumé final <span>*</span></label><textarea class="fi">Action corrective et préventive réalisées. Problème résolu.</textarea></div><div class="fg"><label class="fl">Efficacité confirmée ?</label><div class="radio-row"><label><input type="radio" checked> Oui</label><label><input type="radio"> Non</label></div></div><div class="fg"><label class="fl">Date clôture</label><input type="date" class="fi" value="2024-05-12"></div><div class="fg"><label class="fl">Validé par</label><select class="fi"><option>KORTAS.A</option></select></div></div>`,
  };
  return `<div class="card">
    <div class="ch"><span class="ct">Traitement 8D — Réclamation N° 001</span></div>
    <div class="d8-bar">
      ${names.map((n,i)=>`<div class="d8s${i+1<STATE.d8Step?' done':i+1===STATE.d8Step?' active':''}" onclick="STATE.d8Step=${i+1};document.getElementById('content').innerHTML=PAGES['rc-8d']()">
        <div class="d8s-dot">${i+1<STATE.d8Step?'✓':'D'+(i+1)}</div>
        <div class="d8s-id">D${i+1}</div><div class="d8s-name">${n}</div>
      </div>`).join('')}
    </div>
    <div style="background:var(--bg);border-radius:7px;padding:8px 12px;margin-bottom:11px;font-size:12px;font-weight:500">D${STATE.d8Step} — ${names[STATE.d8Step-1]}</div>
    ${forms[STATE.d8Step]||''}
    <div style="display:flex;justify-content:space-between;margin-top:13px;padding-top:11px;border-top:1px solid var(--border)">
      <button class="btn" onclick="if(STATE.d8Step>1){STATE.d8Step--;document.getElementById('content').innerHTML=PAGES['rc-8d']()}" ${STATE.d8Step===1?'disabled':''}>← Précédent</button>
      ${STATE.d8Step<8?`<button class="btn bp" onclick="STATE.d8Step++;document.getElementById('content').innerHTML=PAGES['rc-8d']()">Suivant →</button>`:`<button class="btn bg2" onclick="goPage('rc-cloture')">Clôturer RC ✓</button>`}
    </div>
  </div>`;
},

'rc-actions': () => {
  if(!window.rcActView) window.rcActView='kanban';
  const view = window.rcActView;
  const fResp = window.rcActFResp||'Tous';
  const fType = window.rcActFType||'Tous';
  const fPrio = window.rcActFPrio||'Tous';
  const fRef  = window.rcActFRef||'Tous';
  const fQ    = window.rcActFQ||'';

  // FIX: isOverdue — date fin format DD/MM or DD/MM/YY
  const isOverdue = (fin, statut) => {
    if(statut==='Clôturée') return false;
    if(!fin||fin==='—') return false;
    const p = fin.split('/');
    if(p.length < 2) return false;
    const y = p[2] ? (p[2].length===2?'20'+p[2]:p[2]) : '2026';
    return new Date(y+'-'+p[1]+'-'+p[0]) < new Date('2026-05-17');
  };

  // FIX: filter on a copy of the array
  const all = window.RC_ACTIONS;
  const data = all.filter(a => {
    if(fResp!=='Tous' && a.resp!==fResp) return false;
    if(fType!=='Tous' && a.type!==fType) return false;
    if(fPrio!=='Tous' && a.prio!==fPrio) return false;
    if(fRef!=='Tous'  && a.ref!==fRef)  return false;
    if(fQ && ![a.action,a.ref,a.resp,a.desc].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });

  const total   = all.length;
  const done    = all.filter(a=>a.statut==='Clôturée').length;
  const enCours = all.filter(a=>a.statut==='En cours').length;
  const retard  = all.filter(a=>a.statut==='En retard'||isOverdue(a.fin,a.statut)).length;
  const aFaire  = all.filter(a=>a.statut==='À faire').length;
  const avgProg = Math.round(all.reduce((s,a)=>s+a.prog,0)/Math.max(all.length,1));
  const pctDone = Math.round(done/Math.max(total,1)*100);

  const resps = [...new Set(all.map(a=>a.resp))];
  const types = [...new Set(all.map(a=>a.type))];
  const refs  = [...new Set(all.map(a=>a.ref))];

  // FIX: typePill — use array index not split(':') on hex colors
  const TYPE_COLORS = {
    Contention: ['#dbeafe','#1e40af'],
    Correction: ['#fed7aa','#c2410c'],
    Prévention: ['#d1fae5','#065f46']
  };
  const typePill = t => {
    const [bg,c] = TYPE_COLORS[t]||['#f1f5f9','#64748b'];
    return `<span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:${bg};color:${c}">${t}</span>`;
  };

  const prioBadge = p => `<span class="badge ${ACT_PRIOS[p]||'bgr'}" style="font-size:8px">${p}</span>`;

  // FIX: progBar — always use numeric id, no string prefix
  const progBar = (prog, numId) => `
    <div style="margin:7px 0">
      <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:4px">
        <span style="font-weight:600">Progression</span>
        <span id="pv-${numId}" style="font-weight:800;color:${prog===100?'#16a34a':prog>=60?'#f59e0b':'#94a3b8'}">${prog}%</span>
      </div>
      <div style="height:6px;background:#f1f5f9;border-radius:10px;overflow:hidden">
        <div style="height:100%;width:${prog}%;background:${prog===100?'#16a34a':prog>=60?'#f59e0b':'#3b82f6'};border-radius:10px;transition:.4s"></div>
      </div>
      <input type="range" min="0" max="100" value="${prog}"
        oninput="updateProg('RC_ACTIONS',${numId},this.value,'rc-actions')"
        onchange="document.getElementById('content').innerHTML=PAGES['rc-actions']()"
        style="width:100%;margin-top:4px;accent-color:#2563eb;height:3px;cursor:pointer;opacity:.6">
    </div>`;

  // FIX: statBtn — clean template, no line breaks inside attribute strings
  const statBtn = (a, s) => {
    const active = a.statut===s;
    const bc = ACT_COL_COLOR[s];
    return `<button onclick="changeStatut('RC_ACTIONS',${a.id},'${s}','rc-actions')" style="font-size:8px;padding:2px 8px;border:1px solid ${active?bc:'#e2e8f0'};border-radius:20px;background:${active?bc:'#fff'};color:${active?'#fff':'#94a3b8'};cursor:pointer;font-family:'Inter',sans-serif;font-weight:${active?700:400};transition:.15s;white-space:nowrap">${s==='À faire'?'⏳':s==='En cours'?'⚡':s==='En retard'?'🚨':'✅'} ${s}</button>`;
  };

  // ── KANBAN CARD ──────────────────────────────────────────────────────────
  const card = a => {
    const over = isOverdue(a.fin, a.statut);
    // FIX: use RC_DATA (const) not window.RC_DATA
    const refData = RC_DATA.find(r=>r.n===a.ref);
    return `<div style="background:#fff;border:1.5px solid ${over?'#fca5a5':'#e2e8f0'};border-left:3px solid ${a.prio==='Critique'?'#dc2626':a.prio==='Haute'?'#f59e0b':'#94a3b8'};border-radius:10px;padding:12px;margin-bottom:9px;box-shadow:0 1px 4px rgba(0,0,0,.05);transition:all .18s;position:relative"
      onmouseover="this.style.boxShadow='0 5px 18px rgba(0,0,0,.10)';this.style.transform='translateY(-1px)'"
      onmouseout="this.style.boxShadow='0 1px 4px rgba(0,0,0,.05)';this.style.transform='none'">
      <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:7px">
        <div style="flex:1">
          <div style="font-size:11.5px;font-weight:700;color:#0f172a;line-height:1.4;margin-bottom:3px">${a.action}</div>
          <div style="font-size:9.5px;color:#94a3b8;line-height:1.4">${a.desc}</div>
        </div>
        <div style="display:flex;gap:3px;flex-shrink:0">
          <button onclick="openEditAction(${a.id})" title="Modifier" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;padding:3px 7px;font-size:11px;color:#64748b">✏</button>
          <button onclick="deleteAction('RC_ACTIONS',${a.id},'rc-actions')" title="Supprimer" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;padding:3px 7px;font-size:11px;color:#94a3b8">✕</button>
        </div>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
        ${typePill(a.type)}
        ${prioBadge(a.prio)}
        <span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:#eff6ff;color:#1e40af">${a.ref}</span>
        ${refData?`<span style="padding:2px 7px;border-radius:20px;font-size:8px;background:#f1f5f9;color:#64748b">${refData.cl}</span>`:''}
      </div>
      ${progBar(a.prog, a.id)}
      <div style="display:flex;justify-content:space-between;font-size:9.5px;color:#94a3b8;margin-top:4px;margin-bottom:8px">
        <span style="display:flex;align-items:center;gap:4px">
          <div style="width:16px;height:16px;border-radius:50%;background:#eff6ff;border:1.5px solid #bfdbfe;display:flex;align-items:center;justify-content:center;font-size:8px;font-weight:700;color:#1e40af">${a.resp.charAt(0)}</div>
          ${a.resp}
        </span>
        <span style="color:${over?'#dc2626':'#94a3b8'};font-weight:${over?700:400}">${over?'🚨':'⏰'} ${a.fin}${over?' Retard':''}</span>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:3px">${ACT_STATUTS.map(s=>statBtn(a,s)).join('')}</div>
    </div>`;
  };

  // ── TABLE ROW ────────────────────────────────────────────────────────────
  const tableRow = a => {
    const over = isOverdue(a.fin, a.statut);
    return `<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
      <td>
        <div style="font-weight:700;font-size:11px;color:#0f172a;margin-bottom:2px">${a.action}</div>
        <div style="font-size:9.5px;color:#94a3b8">${a.desc}</div>
      </td>
      <td>${typePill(a.type)}</td>
      <td><span style="font-weight:700;color:var(--blue);font-size:10px;background:#eff6ff;padding:2px 7px;border-radius:5px">${a.ref}</span></td>
      <td style="font-size:10.5px">${a.resp}</td>
      <td style="font-size:10px;color:#94a3b8">${a.debut||'—'}</td>
      <td style="font-size:10px;font-weight:${over?700:400};color:${over?'#dc2626':'#94a3b8'}">${a.fin}${over?' 🚨':''}</td>
      <td>
        <div style="display:flex;align-items:center;gap:6px">
          <div style="flex:1;height:5px;background:#f1f5f9;border-radius:5px;min-width:55px;overflow:hidden">
            <div style="height:100%;width:${a.prog}%;background:${a.prog===100?'#16a34a':a.prog>=60?'#f59e0b':'#3b82f6'};border-radius:5px;transition:.3s"></div>
          </div>
          <span style="font-size:10px;font-weight:700;color:${a.prog===100?'#16a34a':a.prog>=60?'#f59e0b':'#3b82f6'};min-width:28px">${a.prog}%</span>
        </div>
      </td>
      <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':(a.statut==='En retard'||over)?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
      <td>
        <div style="display:flex;gap:3px">
          <button onclick="openEditAction(${a.id})" class="btn bsm">✏</button>
          <select onchange="changeStatut('RC_ACTIONS',${a.id},this.value,'rc-actions')" class="sel" style="font-size:10px;padding:3px 5px;max-width:105px">
            ${ACT_STATUTS.map(s=>`<option${a.statut===s?' selected':''}>${s}</option>`).join('')}
          </select>
        </div>
      </td>
    </tr>`;
  };

  // ── TIMELINE ITEM ────────────────────────────────────────────────────────
  const timelineItem = a => {
    const over = isOverdue(a.fin, a.statut);
    const dot = a.statut==='Clôturée'?'#16a34a':a.statut==='En cours'?'#2563eb':over?'#dc2626':'#94a3b8';
    return `<div style="display:flex;gap:14px;position:relative">
      <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;width:14px">
        <div style="width:14px;height:14px;border-radius:50%;background:${dot};border:2px solid #fff;box-shadow:0 0 0 2px ${dot}40;flex-shrink:0;margin-top:4px;z-index:1"></div>
        <div style="width:2px;background:#e2e8f0;flex:1;min-height:16px;margin:4px 0"></div>
      </div>
      <div style="flex:1;background:#fff;border:1px solid ${over?'#fca5a5':'#e2e8f0'};border-radius:9px;padding:11px 13px;margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;gap:8px;margin-bottom:6px">
          <div style="flex:1">
            <div style="font-size:11.5px;font-weight:700;color:#0f172a;margin-bottom:2px">${a.action}</div>
            <div style="font-size:9.5px;color:#94a3b8">${a.desc}</div>
          </div>
          <div style="display:flex;gap:4px;flex-shrink:0">${typePill(a.type)} ${prioBadge(a.prio)}</div>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:10px;font-size:9.5px;color:#94a3b8;margin-bottom:8px">
          <span>🔗 <strong>${a.ref}</strong></span>
          <span>👤 ${a.resp}</span>
          <span style="color:${over?'#dc2626':'inherit'};font-weight:${over?700:400}">${over?'🚨':'⏰'} ${a.fin}</span>
          <span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':over?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span>
        </div>
        ${progBar(a.prog, a.id)}
      </div>
    </div>`;
  };

  // ── RENDER ───────────────────────────────────────────────────────────────
  return `
  <!-- KPI STRIP -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr) 1.3fr;gap:10px;margin-bottom:13px">
    ${[
      ['📋','Total',total,'#1e40af','#eff6ff'],
      ['⏳','À faire',aFaire,'#64748b','#f8fafc'],
      ['⚡','En cours',enCours,'#c2410c','#fff7ed'],
      ['🚨','En retard',retard,'#dc2626','#fef2f2'],
      ['✅','Clôturées',done,'#16a34a','#f0fdf4'],
    ].map(([ic,l,v,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:9.5px;color:${c};opacity:.7;margin-top:1px">${l}</div></div>
    </div>`).join('')}
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:12px;display:flex;align-items:center;gap:12px">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f1f5f9" stroke-width="8"/>
        <circle cx="26" cy="26" r="20" fill="none" stroke="${pctDone>=80?'#16a34a':pctDone>=50?'#f59e0b':'#3b82f6'}" stroke-width="8"
          stroke-dasharray="${2*Math.PI*20*pctDone/100} ${2*Math.PI*20}"
          stroke-dashoffset="${2*Math.PI*20*0.25}" stroke-linecap="round"/>
        <text x="26" y="30" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${pctDone}%</text>
      </svg>
      <div>
        <div style="font-size:12px;font-weight:700;color:#0f172a">Taux clôture</div>
        <div style="font-size:10px;color:#94a3b8;margin-top:2px">${done}/${total} actions</div>
        <div style="font-size:10px;color:#94a3b8">Moy. progression : ${avgProg}%</div>
      </div>
    </div>
  </div>

  <!-- TOOLBAR -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#2563eb':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1;min-width:180px;transition:.15s">
        <span style="color:#94a3b8;font-size:13px">🔍</span>
        <input placeholder="Rechercher action, RC, client, responsable…" value="${fQ}"
          oninput="window.rcActFQ=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.rcActFQ='';document.getElementById('content').innerHTML=PAGES['rc-actions']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0;line-height:1">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.rcActFRef=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()">
        <option value="Tous">🔗 RC : Toutes</option>${refs.map(r=>`<option${r===fRef?' selected':''}>${r}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.rcActFResp=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()">
        <option value="Tous">👤 Responsable</option>${resps.map(r=>`<option${r===fResp?' selected':''}>${r}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.rcActFType=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()">
        <option value="Tous">🏷 Type</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.rcActFPrio=this.value;document.getElementById('content').innerHTML=PAGES['rc-actions']()">
        <option value="Tous">⚡ Priorité</option>${['Critique','Haute','Normale'].map(p=>`<option${p===fPrio?' selected':''}>${p}</option>`).join('')}
      </select>
      ${(fQ||fResp!=='Tous'||fType!=='Tous'||fPrio!=='Tous'||fRef!=='Tous')?
        `<button onclick="window.rcActFResp='Tous';window.rcActFType='Tous';window.rcActFPrio='Tous';window.rcActFRef='Tous';window.rcActFQ='';document.getElementById('content').innerHTML=PAGES['rc-actions']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Effacer</button>`:''}
      <span style="font-size:10px;color:#94a3b8;white-space:nowrap">${data.length}/${total} action${total>1?'s':''}</span>
      <div style="display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-left:auto">
        ${[['kanban','⬛ Kanban'],['liste','≡ Liste'],['timeline','📅 Timeline']].map(([v,lb])=>`
        <button onclick="window.rcActView='${v}';document.getElementById('content').innerHTML=PAGES['rc-actions']()"
          style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view===v?'#1e40af':'transparent'};color:${view===v?'#fff':'#94a3b8'};transition:.15s">${lb}</button>`).join('')}
      </div>
      <button onclick="showAddActionModal('RC_ACTIONS','rc-actions')"
        style="background:linear-gradient(135deg,#1e40af,#2563eb);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 2px 8px rgba(37,99,235,.3);white-space:nowrap">
        + Ajouter action
      </button>
    </div>
  </div>

  ${data.length===0?`
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:48px;text-align:center">
      <div style="font-size:36px;margin-bottom:10px">🔍</div>
      <div style="font-size:14px;font-weight:600;color:#0f172a;margin-bottom:4px">Aucune action trouvée</div>
      <div style="font-size:11px;color:#94a3b8">Modifiez vos filtres ou <button onclick="showAddActionModal('RC_ACTIONS','rc-actions')" style="background:none;border:none;color:#2563eb;cursor:pointer;font-size:11px;font-family:'Inter',sans-serif;font-weight:600">ajoutez une action</button></div>
    </div>`

  : view==='kanban'?`
  <!-- ══ KANBAN VIEW ══ -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
    ${ACT_STATUTS.map(statut=>{
      // FIX: simple, clean filter per column — no duplicate logic
      const col = data.filter(a => {
        if(statut==='En retard') return a.statut==='En retard' || (isOverdue(a.fin,a.statut) && a.statut!=='Clôturée');
        if(statut==='À faire')  return a.statut==='À faire' && !isOverdue(a.fin,a.statut);
        if(statut==='En cours') return a.statut==='En cours' && !isOverdue(a.fin,a.statut);
        return a.statut===statut;
      });
      return `<div style="background:${ACT_COL_BG[statut]};border-radius:12px;padding:11px;min-height:220px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:11px">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:8px;height:8px;border-radius:50%;background:${ACT_COL_COLOR[statut]}"></div>
            <span style="font-size:11px;font-weight:700;color:#0f172a">${statut}</span>
          </div>
          <span style="background:#fff;border:1px solid ${ACT_COL_COLOR[statut]}50;border-radius:20px;padding:2px 9px;font-size:10px;font-weight:800;color:${ACT_COL_COLOR[statut]}">${col.length}</span>
        </div>
        ${col.map(a=>card(a)).join('')}
        <button onclick="showAddActionModal('RC_ACTIONS','rc-actions')"
          style="width:100%;padding:7px;border:1.5px dashed #cbd5e1;border-radius:8px;background:transparent;color:#94a3b8;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif;margin-top:2px"
          onmouseover="this.style.borderColor='#2563eb';this.style.color='#2563eb'"
          onmouseout="this.style.borderColor='#cbd5e1';this.style.color='#94a3b8'">+ Ajouter</button>
      </div>`;
    }).join('')}
  </div>`

  : view==='liste'?`
  <!-- ══ TABLE VIEW ══ -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="overflow-x:auto">
      <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
        <thead>
          <tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
            ${['Action & Description','Type','Réf. RC','Responsable','Début','Échéance','Progression','Statut',''].map(h=>`
            <th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>${data.map(a=>tableRow(a)).join('')}</tbody>
      </table>
    </div>
  </div>`

  :`
  <!-- ══ TIMELINE VIEW ══ -->
  <div style="display:grid;grid-template-columns:1fr 300px;gap:14px">
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:16px">
      <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:14px">📅 Chronologie des actions — triées par échéance</div>
      <!-- FIX: sort on a copy [...data] to avoid mutating the filtered array -->
      ${[...data].sort((a,b)=>{
        const toDate = s => { const p=s.split('/'); const y=p[2]?('20'+p[2]):2026; return new Date(y+'-'+(p[1]||'01')+'-'+(p[0]||'01')); };
        return toDate(a.fin)-toDate(b.fin);
      }).map(a=>timelineItem(a)).join('')}
      <div style="display:flex;align-items:center;gap:10px;margin-top:4px;padding-left:2px">
        <div style="width:14px;height:14px;border-radius:50%;background:#e2e8f0;flex-shrink:0"></div>
        <button onclick="showAddActionModal('RC_ACTIONS','rc-actions')"
          style="font-size:10px;color:#64748b;background:#f8fafc;border:1.5px dashed #cbd5e1;border-radius:7px;padding:6px 14px;cursor:pointer;font-family:'Inter',sans-serif">
          + Ajouter une action
        </button>
      </div>
    </div>
    <!-- Statistiques -->
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:10px">📊 Par type d'action</div>
        ${['Contention','Correction','Prévention'].map(t=>{
          const c=all.filter(a=>a.type===t).length;
          const colors={Contention:'#3b82f6',Correction:'#f59e0b',Prévention:'#16a34a'};
          return `<div style="margin-bottom:9px">
            <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:3px">
              <span style="font-weight:600;color:#0f172a">${t}</span>
              <span style="font-weight:700;color:${colors[t]}">${c}</span>
            </div>
            <div style="height:5px;background:#f1f5f9;border-radius:5px;overflow:hidden">
              <div style="height:100%;width:${Math.round(c/Math.max(total,1)*100)}%;background:${colors[t]};border-radius:5px"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:10px">👥 Charge par responsable</div>
        ${resps.map(r=>{
          const cnt=all.filter(a=>a.resp===r).length;
          const cntDone=all.filter(a=>a.resp===r&&a.statut==='Clôturée').length;
          return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
            <div style="width:24px;height:24px;border-radius:50%;background:#eff6ff;border:1.5px solid #bfdbfe;display:flex;align-items:center;justify-content:center;font-size:9.5px;font-weight:700;color:#1e40af;flex-shrink:0">${r.charAt(0)}</div>
            <div style="flex:1">
              <div style="font-size:10px;font-weight:600;color:#0f172a">${r}</div>
              <div style="font-size:9px;color:#94a3b8">${cnt} action${cnt>1?'s':''} · ${cntDone} clôturée${cntDone>1?'s':''}</div>
            </div>
            <span style="font-size:10px;font-weight:700;color:#1e40af">${Math.round(cntDone/Math.max(cnt,1)*100)}%</span>
          </div>`;
        }).join('')}
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:10px">🔗 Par réclamation RC</div>
        ${refs.map(r=>{
          const cnt=all.filter(a=>a.ref===r).length;
          const cDone=all.filter(a=>a.ref===r&&a.statut==='Clôturée').length;
          const refData=RC_DATA.find(d=>d.n===r);
          return `<div style="padding:8px 10px;background:#f8fafc;border-radius:8px;margin-bottom:6px;border-left:3px solid #3b82f6">
            <div style="display:flex;justify-content:space-between;margin-bottom:3px">
              <span style="font-size:10.5px;font-weight:700;color:#1e40af">${r}</span>
              <span style="font-size:9.5px;color:#94a3b8">${cDone}/${cnt}</span>
            </div>
            ${refData?`<div style="font-size:9px;color:#64748b;margin-bottom:4px">${refData.cl} · ${refData.g}</div>`:''}
            <div style="height:4px;background:#e2e8f0;border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${Math.round(cDone/Math.max(cnt,1)*100)}%;background:#3b82f6;border-radius:3px"></div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>
  </div>`}`;
},
'rc-kpi': () => {
  // Period selector state
  if(!window.rcKpiPer) window.rcKpiPer = 'trimestre';
  const per = window.rcKpiPer;
  const months = [['Jan',2],['Fév',3],['Mar',1],['Avr',4],['Mai',7],['Jun',0]];
  const maxVal = 10;
  const data8D = [['D1 Équipe','100%','bg3'],['D2 Problème','100%','bg3'],['D3 Confinement','100%','bg3'],['D4 Causes','85%','by'],['D5 Actions','60%','by'],['D6 Vérification','20%','br'],['D7 Préventif','0%','br'],['D8 Félicitations','0%','br']];
  const defauts = [['Erreur dimensionnelle',8,'#dc2626',80],['Défaut assemblage',5,'#ea580c',50],['Retard livraison',4,'#f59e0b',40],['Documentation NC',3,'#6366f1',30],['Mauvaise finition',2,'#06b6d4',20]];
  return `
  <!-- ═══════ HEADER DASHBOARD ═══════ -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
    <div>
      <div style="font-size:14px;font-weight:700;color:var(--navy)">📊 Tableau de bord KPI — Réclamations Clients</div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">ISO 9001 · Section 9.1.3 · Dernière mise à jour : 17/05/2026</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center">
      <div style="display:flex;background:#f1f5f9;border:1px solid var(--border);border-radius:7px;overflow:hidden">
        ${['mensuel','trimestre','annuel'].map(p=>`<button onclick="window.rcKpiPer='${p}';document.getElementById('content').innerHTML=PAGES['rc-kpi']()" style="padding:5px 12px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${'${p}'===per?'var(--blue)':'transparent'};color:${'${p}'===per?'#fff':'var(--muted)'};transition:.15s">${p.charAt(0).toUpperCase()+p.slice(1)}</button>`).join('')}
      </div>
      <button class="btn bsm" onclick="">📥 Exporter PDF</button>
    </div>
  </div>

  <!-- ═══════ ALERTE ═══════ -->
  <div id="rc-alert" style="display:flex;align-items:center;gap:10px;background:#fef2f2;border:1.5px solid #fca5a5;border-radius:9px;padding:10px 14px;margin-bottom:13px">
    <span style="font-size:20px">🚨</span>
    <div style="flex:1">
      <span style="font-size:11px;font-weight:700;color:#991b1b">OBJECTIF DÉPASSÉ — T2 2026 · </span>
      <span style="font-size:11px;color:#b91c1c">9 RC enregistrées au total · Objectif ≤ 2 RC/semestre · Dépassement : <strong>+7</strong></span>
    </div>
    <button onclick="document.getElementById('rc-alert').style.display='none'" style="background:none;border:none;color:#dc2626;cursor:pointer;font-size:15px;line-height:1">✕</button>
  </div>

  <!-- ═══════ KPI CARDS ROW ═══════ -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[
      ['Total RC','9','var(--blue)','📋','vs 5 (T1 2025)','↑'],
      ['Ouvertes','6','var(--orange)','🔓','En attente action','⚠'],
      ['Critiques','3','var(--red)','🚨','Traitement urgent','!'],
      ['Clôturées','3','var(--green)','✅','Taux : 33%','→'],
      ['Délai moyen','8,6 j','var(--navy)','⏱','Objectif ≤ 5j','↑'],
      ['Taux clôture','33%','#b91c1c','📊','Objectif ≥ 80%','↓'],
      ['RC répétitives','39%','#c2410c','🔁','Objectif ≤ 15%','↑'],
      ['Satisfaction','87%','var(--green)','⭐','Objectif ≥ 90%','→'],
    ].map(([l,v,c,ic,sub,arrow])=>`
    <div style="background:var(--white);border:1px solid var(--border);border-radius:10px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c};opacity:.7"></div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:16px">${ic}</span>
        <span style="font-size:10px;font-weight:700;color:${arrow==='↑'?'var(--red)':arrow==='↓'?'var(--green)':'var(--muted)'}">${arrow}</span>
      </div>
      <div style="font-size:22px;font-weight:700;color:${c};line-height:1;margin-bottom:3px;font-family:monospace">${v}</div>
      <div style="font-size:10px;font-weight:600;color:var(--navy);margin-bottom:2px">${l}</div>
      <div style="font-size:9px;color:var(--muted)">${sub}</div>
    </div>`).join('')}
  </div>

  <!-- ═══════ ROW 2 : CHARTS PRINCIPAUX ═══════ -->
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:13px">

    <!-- Évolution mensuelle bar chart -->
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">📈 Évolution mensuelle des RC — 2026</span>
        <span style="font-size:9px;color:var(--muted)">Objectif ≤ 1 RC/mois · Ligne bleue</span>
      </div>
      <div style="position:relative;padding:6px 0 22px">
        <!-- Grid lines -->
        <div style="position:absolute;left:0;right:0;top:6px;bottom:22px">
          ${[0,25,50,75].map(pct=>`<div style="position:absolute;left:0;right:0;bottom:${pct}%;border-top:1px dashed #e5e7eb"></div>`).join('')}
          <div style="position:absolute;left:0;right:0;bottom:${1/10*100}%;border-top:2px dashed #2563eb;opacity:.7"></div>
          <div style="position:absolute;right:4px;bottom:calc(${1/10*100}% + 3px);font-size:8px;color:#2563eb;font-weight:700">Obj. 1</div>
        </div>
        <!-- Bars -->
        <div style="display:flex;align-items:flex-end;gap:6px;height:100px;padding:0 4px;position:relative;z-index:1">
          ${months.map(([m,v])=>{
            const h=v>0?(v/maxVal*88):2; const c=v>1?'#dc2626':v>0?'#16a34a':'#e5e7eb';
            const cLight=v>1?'#fef2f2':v>0?'#f0fdf4':'#f9fafb';
            return`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
              <div style="font-size:10px;font-weight:700;color:${c}">${v||'—'}</div>
              <div style="width:100%;height:${h}px;background:${c};border-radius:4px 4px 0 0;position:relative;min-height:2px;background:linear-gradient(180deg,${c}dd,${c});box-shadow:0 2px 4px ${c}33"></div>
              <div style="font-size:9px;color:var(--muted);font-weight:500">${m}</div>
            </div>`;
          }).join('')}
          <!-- Jun forecast -->
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="font-size:9px;color:var(--muted)">?</div>
            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:4px 4px 0 0;border:1.5px dashed #9ca3af;box-sizing:border-box"></div>
            <div style="font-size:9px;color:var(--muted);font-weight:500">Jun</div>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:14px;justify-content:center;margin-top:4px;font-size:9.5px">
        <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;background:#16a34a;border-radius:2px"></div>Conforme ≤1</div>
        <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;background:#dc2626;border-radius:2px"></div>Dépassé &gt;1</div>
        <div style="display:flex;align-items:center;gap:4px"><div style="width:18px;height:0;border-top:2px dashed #2563eb"></div>Objectif</div>
      </div>
    </div>

    <!-- Donuts breakdown -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">🥧 Répartition des RC</div>
      <div style="display:flex;gap:12px;justify-content:center;align-items:center">
        <!-- Donut Statut -->
        <div style="text-align:center">
          <svg width="88" height="88" viewBox="0 0 88 88" style="display:block;margin:0 auto">
            <circle cx="44" cy="44" r="32" fill="none" stroke="#e5e7eb" stroke-width="11"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#ea580c" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.33} ${2*Math.PI*32}" stroke-dashoffset="${2*Math.PI*32*0.25}" stroke-linecap="butt"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#f59e0b" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.34} ${2*Math.PI*32}" stroke-dashoffset="${-2*Math.PI*32*0.08}" stroke-linecap="butt"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#16a34a" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.33} ${2*Math.PI*32}" stroke-dashoffset="${-2*Math.PI*32*0.42}" stroke-linecap="butt"/>
            <text x="44" y="40" text-anchor="middle" font-size="10" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">Statut</text>
            <text x="44" y="53" text-anchor="middle" font-size="8" fill="var(--muted)" font-family="Inter,sans-serif">9 RC</text>
          </svg>
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:3px;text-align:left">
            ${[['Ouvertes','33%','#ea580c'],['En cours','34%','#f59e0b'],['Clôturées','33%','#16a34a']].map(([l,v,c])=>`
            <div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:9px;color:var(--muted)">${l}</span><span style="font-size:9px;font-weight:700;color:${c};margin-left:auto">${v}</span></div>`).join('')}
          </div>
        </div>
        <div style="width:1px;height:90px;background:var(--border)"></div>
        <!-- Donut Gravité -->
        <div style="text-align:center">
          <svg width="88" height="88" viewBox="0 0 88 88" style="display:block;margin:0 auto">
            <circle cx="44" cy="44" r="32" fill="none" stroke="#e5e7eb" stroke-width="11"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#dc2626" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.33} ${2*Math.PI*32}" stroke-dashoffset="${2*Math.PI*32*0.25}" stroke-linecap="butt"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#f97316" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.34} ${2*Math.PI*32}" stroke-dashoffset="${-2*Math.PI*32*0.08}" stroke-linecap="butt"/>
            <circle cx="44" cy="44" r="32" fill="none" stroke="#22c55e" stroke-width="11" stroke-dasharray="${2*Math.PI*32*0.33} ${2*Math.PI*32}" stroke-dashoffset="${-2*Math.PI*32*0.42}" stroke-linecap="butt"/>
            <text x="44" y="40" text-anchor="middle" font-size="10" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">Gravité</text>
            <text x="44" y="53" text-anchor="middle" font-size="8" fill="var(--muted)" font-family="Inter,sans-serif">9 RC</text>
          </svg>
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:3px;text-align:left">
            ${[['Critique','33%','#dc2626'],['Majeure','34%','#f97316'],['Mineure','33%','#22c55e']].map(([l,v,c])=>`
            <div style="display:flex;align-items:center;gap:5px"><div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:9px;color:var(--muted)">${l}</span><span style="font-size:9px;font-weight:700;color:${c};margin-left:auto">${v}</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════ ROW 3 : OBJECTIFS TRIMESTRIELS + TOP DÉFAUTS ═══════ -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:13px">

    <!-- Objectifs trimestriels -->
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">🎯 Objectifs trimestriels 2026</span>
        <span style="font-size:9px;color:var(--muted)">ISO 9001 · Seuil ≤ 1 RC/trimestre</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        ${[['T1 2026','Jan–Mar','2','#ea580c','Dépassé','bo',40],['T2 2026','Avr–Jun','7','#dc2626','Dépassé','br',100],['T3 2026','Jul–Sep','—','#9ca3af','À venir','bgr',0],['T4 2026','Oct–Déc','—','#9ca3af','À venir','bgr',0]].map(([trim,period,val,c,statut,sc,pct])=>`
        <div style="border:1px solid var(--border);border-radius:9px;padding:11px;border-top:3px solid ${c}">
          <div style="font-size:10px;font-weight:700;color:var(--navy)">${trim}</div>
          <div style="font-size:9px;color:var(--muted);margin-bottom:8px">${period}</div>
          <div style="font-size:24px;font-weight:700;color:${c};font-family:monospace;line-height:1;margin-bottom:4px">${val}</div>
          <div style="font-size:9px;color:var(--muted);margin-bottom:6px">RC enregistrées</div>
          <div style="height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-bottom:5px;position:relative">
            <div style="height:100%;width:${Math.min(pct,100)}%;background:${c};border-radius:3px"></div>
            <div style="position:absolute;left:${1/7*100}%;top:0;bottom:0;width:1.5px;background:#1e40af"></div>
          </div>
          <span class="badge ${sc}" style="font-size:8.5px">${statut}</span>
        </div>`).join('')}
      </div>
    </div>

    <!-- Top défauts Pareto -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">📉 Analyse Pareto — Top défauts</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${defauts.map(([type,occ,c,pct])=>`
        <div style="display:flex;align-items:center;gap:8px">
          <div style="font-size:10.5px;color:var(--navy);flex:1;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${type}</div>
          <div style="display:flex;align-items:center;gap:5px;flex-shrink:0;width:140px">
            <div style="flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${pct}%;background:${c};border-radius:3px"></div>
            </div>
            <span style="font-size:10px;font-weight:700;color:${c};font-family:monospace;width:14px;text-align:right">${occ}</span>
          </div>
        </div>`).join('')}
      </div>
      <div style="margin-top:12px;padding-top:10px;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between">
        <span style="font-size:9.5px;color:var(--muted)">Pareto 80/20 : Top 2 défauts = <strong>59%</strong> des cas</span>
        <button class="btn bsm" onclick="goPage('rc-actions')">Actions →</button>
      </div>
    </div>
  </div>

  <!-- ═══════ ROW 4 : AVANCEMENT 8D + CLIENTS ═══════ -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">

    <!-- 8D Completion radar -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">⚙ Avancement processus 8D — RC-001</div>
      <div style="display:flex;flex-direction:column;gap:5px">
        ${data8D.map(([step,pct,sc])=>`
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:10px;color:var(--navy);font-weight:500;width:100px;flex-shrink:0">${step}</span>
          <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
            <div style="height:100%;width:${pct};background:${sc==='bg3'?'#16a34a':sc==='by'?'#f59e0b':'#e5e7eb'};border-radius:4px;transition:.3s"></div>
          </div>
          <span style="font-size:10px;font-family:monospace;font-weight:600;width:32px;text-align:right;color:${sc==='bg3'?'var(--green)':sc==='by'?'var(--orange)':'var(--muted)'}">${pct}</span>
        </div>`).join('')}
      </div>
      <div style="margin-top:10px;padding:8px;background:#f0fdf4;border-radius:7px;border:1px solid #bbf7d0;font-size:10px;color:var(--green);font-weight:600;text-align:center">
        🟢 D1–D3 complétés · D4–D5 en cours · D6–D8 à planifier
      </div>
    </div>

    <!-- Top clients -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">👥 RC par client — Classement</div>
      <table class="tbl">
        <thead><tr><th>Client</th><th style="text-align:center">RC</th><th style="text-align:center">Critique</th><th>Délai moy.</th><th>Statut</th></tr></thead>
        <tbody>
          ${[['Client A',4,2,'7,2 j','br','Critique'],['Client B',3,1,'9,4 j','bo','Élevé'],['Client C',1,0,'3,1 j','bg3','OK'],['Client D',1,0,'5,8 j','by','Moyen']].map(([cl,rc,crit,delai,sc,statut])=>`
          <tr>
            <td style="font-weight:600">${cl}</td>
            <td style="text-align:center">
              <div style="display:flex;align-items:center;justify-content:center;gap:4px">
                <div style="width:${rc/4*36}px;height:5px;background:${sc==='br'?'#dc2626':sc==='bo'?'#ea580c':'#16a34a'};border-radius:2px"></div>
                <span style="font-weight:700;font-size:11px">${rc}</span>
              </div>
            </td>
            <td style="text-align:center;font-weight:700;color:${crit>0?'var(--red)':'var(--green)'}">${crit}</td>
            <td style="font-family:monospace;font-size:10.5px">${delai}</td>
            <td><span class="badge ${sc}" style="font-size:9px">${statut}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <button class="btn" style="width:100%;margin-top:10px;font-size:11px" onclick="goPage('rc-liste')">📋 Voir toutes les RC →</button>
    </div>
  </div>`;
},

'rc-cloture': () => `
  <div style="max-width:520px;margin:0 auto">
    <div class="card" style="text-align:center;padding:32px 28px">
      <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#166534,#16a34a);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:26px;box-shadow:0 4px 16px rgba(22,163,74,.35)">✓</div>
      <div style="font-size:18px;font-weight:800;color:#0f172a;margin-bottom:6px">Réclamation clôturée avec succès</div>
      <div style="font-size:11px;color:#94a3b8;margin-bottom:20px">RC-001 · Client A · Clôturée le 15/05/2026 par KORTAS.A</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
        ${[['📅','Durée totale','13 jours'],['↺','Actions','3 / 3'],['✓','Efficacité','Confirmée']].map(([ic,l,v])=>`
        <div style="background:#f8fafc;border-radius:9px;padding:11px;border:1px solid #f1f5f9">
          <div style="font-size:18px;margin-bottom:4px">${ic}</div>
          <div style="font-size:15px;font-weight:800;color:#16a34a">${v}</div>
          <div style="font-size:9px;color:#94a3b8">${l}</div>
        </div>`).join('')}
      </div>
      <div style="background:#f0fdf4;border-radius:9px;padding:12px;border:1px solid #bbf7d0;margin-bottom:18px;text-align:left">
        <div style="font-size:10px;font-weight:700;color:#166534;margin-bottom:6px">📝 Synthèse de clôture</div>
        <div style="font-size:11px;color:#374151;line-height:1.6">Problème résolu suite à la recalibration de l'outil T12. Contrôle de 3 lots consécutifs : conformes. Client informé et satisfaction confirmée par email.</div>
      </div>
      <div style="display:flex;gap:8px;justify-content:center">
        <button class="btn" onclick="goPage('rc-liste')">← Retour à la liste</button>
        <button class="btn bp" onclick="goPage('rc-kpi')">📊 Voir les KPIs</button>
      </div>
    </div>
  </div>`,

'nc-liste': () => {
  const total=NC_DATA.length, ouv=NC_DATA.filter(r=>r.s!=='Clôturé').length, crit=NC_DATA.filter(r=>r.g==='Critique').length, clo=NC_DATA.filter(r=>r.s==='Clôturé').length;
  const projs=[...new Set(NC_DATA.map(r=>r.p))].sort();
  const deps=[...new Set(NC_DATA.map(r=>r.dep))].sort();
  const rows=NC_DATA.map(r=>`<tr>
    <td><span class="link" onclick="goPage('nc-fiche')">${r.n}</span></td>
    <td style="font-size:10px;color:var(--muted)">${r.d}</td>
    <td><span style="background:#eff6ff;color:#1e40af;border-radius:4px;padding:1px 6px;font-size:10px;font-weight:600">${r.p}</span></td>
    <td><strong>${r.dep}</strong></td><td style="color:var(--muted);font-size:10.5px">${r.poste}</td>
    <td style="max-width:160px;font-size:10.5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap" title="${r.desc}">${r.desc}</td>
    <td><span class="badge ${badgeG(r.g)}">${r.g}</span></td>
    <td><span class="badge ${badgeS(r.s)}">${r.s}</span></td>
    <td>${r.r}</td><td>${r.dl}</td>
    <td><button class="btn bsm" onclick="goPage('nc-fiche')">Voir</button></td>
  </tr>`).join('');
  return `
  <!-- KPI strip NC -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:12px">
    ${[['Total NC',total,'var(--blue)','⚠'],['En cours',ouv,'var(--orange)','⏳'],['Critiques',crit,'var(--red)','🚨'],['Clôturées',clo,'var(--green)','✅'],['Délai moyen','2,8 j','var(--navy)','⏱']].map(([l,v,c,ic])=>`
    <div style="background:var(--white);border:1px solid var(--border);border-radius:9px;padding:11px 12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:18px">${ic}</span>
      <div><div style="font-size:20px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:10px;color:var(--muted);margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>

  <!-- Filtres dynamiques NC -->
  <div class="card" style="padding:10px 14px;margin-bottom:10px">
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:4px 9px;flex:1;min-width:180px">
        <span style="color:var(--muted)">🔍</span>
        <input id="nc-fq" placeholder="Rechercher N°, description, poste…" style="border:none;background:transparent;font-size:11px;color:var(--text);outline:none;width:100%;font-family:'Inter',sans-serif" oninput="filterNC()">
      </div>
      <select id="nc-fp" class="sel" onchange="filterNC()"><option value="Tous">Projet : Tous</option>${projs.map(p=>`<option value="${p}">${p}</option>`).join('')}</select>
      <select id="nc-fd" class="sel" onchange="filterNC()"><option value="Tous">Département : Tous</option>${deps.map(d=>`<option value="${d}">${d}</option>`).join('')}</select>
      <select id="nc-fs" class="sel" onchange="filterNC()"><option value="Tous">Statut : Tous</option><option>En cours</option><option>Ouvert</option><option>Clôturé</option></select>
      <select id="nc-fg" class="sel" onchange="filterNC()"><option value="Tous">Gravité : Tous</option><option>Critique</option><option>Majeure</option><option>Mineure</option></select>
      <button class="btn bsm" onclick="document.getElementById('nc-fq').value='';['nc-fp','nc-fd','nc-fs','nc-fg'].forEach(id=>document.getElementById(id).value='Tous');filterNC()">✕ Réinitialiser</button>
      <span id="nc-cnt" style="font-size:10px;color:var(--muted);margin-left:4px">${total} résultats</span>
    </div>
  </div>

  <!-- Table NC dynamique -->
  <div class="card" style="padding:0;overflow:hidden">
    <div style="overflow-x:auto">
      <table class="tbl" style="min-width:920px">
        <thead><tr>
          <th>N° NC</th><th>Date</th><th>Projet</th><th>Département</th><th>Poste</th><th>Description</th><th>Gravité</th><th>Statut</th><th>Responsable</th><th>Délai</th><th></th>
        </tr></thead>
        <tbody id="nc-tbody">${rows}</tbody>
      </table>
    </div>
  </div>`;
},

'nc-new': () => {
  return `
  <div class="card" style="max-width:760px;margin:0 auto">
    <div style="background:linear-gradient(135deg,#7f1d1d,#dc2626);border-radius:9px 9px 0 0;padding:16px 20px;margin:-15px -15px 18px">
      <div style="font-size:14px;font-weight:700;color:#fff">⚠ Nouvelle Non-Conformité</div>
      <div style="font-size:10px;color:rgba(255,255,255,.6);margin-top:2px">Formulaire QRQC rapide · Numérotation automatique</div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:13px">
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Projet *</label><select id="ncn-proj" class="fi" style="width:100%"><option>M077</option><option>M081</option><option>M085</option><option>M090</option><option>P002</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Département *</label><select id="ncn-dep" class="fi" style="width:100%"><option>Usinage</option><option>Assemblage</option><option>BE Mécanique</option><option>Peinture</option><option>Magasin</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Poste / Machine</label><select id="ncn-poste" class="fi" style="width:100%"><option>Machine CN01</option><option>Machine CN02</option><option>Poste assemblage A1</option><option>Contrôle entrée</option><option>Contrôle final</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Gravité *</label><select id="ncn-grav" class="fi" style="width:100%"><option>Critique</option><option>Majeure</option><option>Mineure</option></select></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Responsable</label><input id="ncn-resp" class="fi" placeholder="Ex: KORTAS.A" style="width:100%"></div>
      <div><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Délai de traitement</label><select id="ncn-dl" class="fi" style="width:100%"><option>3 jours</option><option>5 jours</option><option>10 jours</option><option>15 jours</option></select></div>
      <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Description de la NC *</label><input id="ncn-desc" class="fi" placeholder="Ex: Cote Ø35h7 hors tolérance" style="width:100%"></div>
      <div style="grid-column:1/-1"><label style="font-size:10px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;display:block;margin-bottom:5px">Action immédiate</label><input id="ncn-action" class="fi" placeholder="Ex: Mise en écart, arrêt machine" style="width:100%"></div>
    </div>
    <div style="margin-top:18px;padding-top:14px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;align-items:center">
      <button class="btn" onclick="goPage('nc-liste')">← Annuler</button>
      <button class="btn btn-danger" onclick="(()=>{const d2=document.getElementById('ncn-desc').value.trim();if(!d2){document.getElementById('ncn-desc').style.borderColor='#dc2626';return;}const n='NC-'+(NC_DATA.length+1).toString().padStart(3,'0');const now=new Date();const d=now.getDate().toString().padStart(2,'0')+'/'+(now.getMonth()+1).toString().padStart(2,'0')+'/'+now.getFullYear();NC_DATA.push({n,d,p:document.getElementById('ncn-proj').value,dep:document.getElementById('ncn-dep').value,poste:document.getElementById('ncn-poste').value,r:document.getElementById('ncn-resp').value||'Non assigné',g:document.getElementById('ncn-grav').value,s:'Ouvert',dl:document.getElementById('ncn-dl').value,desc:d2,prog:0});alert('NC '+n+' déclarée !');goPage('nc-liste');})()">✓ Déclarer la NC</button>
    </div>
  </div>`;
},

'nc-fiche': () => `
  <div class="g23">
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">Non-Conformité N° 001</span>
        <div style="display:flex;gap:5px;align-items:center"><span style="background:#FCEBEB;color:var(--red);padding:3px 9px;border-radius:10px;font-size:10px;font-weight:700">EN COURS 🔴</span><button class="btn bsm">✏</button><button class="btn bsm">⋮</button></div>
      </div>
      <div class="tabs">
        <div class="tab${STATE.ficheTab==='info'?' active':''}" onclick="STATE.ficheTab='info';document.getElementById('content').innerHTML=PAGES['nc-fiche']()">Informations</div>
        <div class="tab${STATE.ficheTab==='qrqc'?' active':''}" onclick="STATE.ficheTab='qrqc';document.getElementById('content').innerHTML=PAGES['nc-fiche']()">QRQC</div>
        <div class="tab${STATE.ficheTab==='actions'?' active':''}" onclick="STATE.ficheTab='actions';document.getElementById('content').innerHTML=PAGES['nc-fiche']()">Actions</div>
        <div class="tab${STATE.ficheTab==='histo'?' active':''}" onclick="STATE.ficheTab='histo';document.getElementById('content').innerHTML=PAGES['nc-fiche']()">Historique</div>
      </div>
      ${STATE.ficheTab==='info'?`<div class="g2" style="gap:11px">
        <div>${[['Projet','M077'],['Département','Usinage'],['Poste','Machine CN01'],['Responsable','A. Ali'],['Date','02/05/2026'],['Qté','10 pièces']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}<div class="drow"><span class="dk">Gravité</span><span class="badge br">🔴 Critique</span></div><div class="drow"><span class="dk">Norme</span><span class="badge bb">ISO 9001</span></div></div>
        <div><div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:4px">TITRE</div><div style="font-size:13px;font-weight:600;margin-bottom:9px">Défaut dimension pièce</div><div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:4px">DESCRIPTION</div><div style="font-size:11px;color:var(--muted);line-height:1.5;margin-bottom:9px">Diamètre inférieur à la spécification du plan — 24,8 mm mesuré pour 25 mm requis.</div><span style="color:var(--blue);font-size:11px;cursor:pointer">📎 photo_piece.jpg</span></div>
      </div>`:
      STATE.ficheTab==='qrqc'?`
        <div style="font-size:11px;color:var(--muted);margin-bottom:8px">Progression traitement QRQC</div>
        ${timelineHTML(['Détection','Analyse','Action imm.','Clôture'],1)}
        <div style="text-align:center;margin-top:11px"><button class="btn bp bsm" onclick="goPage('nc-qrqc')">Continuer le traitement QRQC →</button></div>`:
      STATE.ficheTab==='actions'?`<table class="tbl"><thead><tr><th>Action</th><th>Type</th><th>Resp.</th><th>Statut</th><th>Progression</th></tr></thead><tbody>
        <tr><td>Arrêt machine CN01</td><td><span class="badge br">Contention</span></td><td>A. Ali</td><td><span class="badge bg3">✔ Terminé</span></td><td><div class="prog"><div class="pf" style="width:100%;background:var(--green)"></div></div></td></tr>
        <tr><td>Remplacement outil</td><td><span class="badge bo">Correction</span></td><td>M. Karim</td><td><span class="badge by">⏳ En cours</span></td><td><div class="prog"><div class="pf" style="width:60%;background:var(--yellow)"></div></div></td></tr>
        <tr><td>MAJ procédure contrôle</td><td><span class="badge bgr">Prévention</span></td><td>S. Yassine</td><td><span class="badge bgr">⛔ À faire</span></td><td><div class="prog"><div class="pf" style="width:0;background:#888"></div></div></td></tr>
      </tbody></table>`:
      `<div style="padding:18px 0;text-align:center;color:var(--muted)">2 modifications enregistrées</div>`}
    </div>
    ${kpiSideNC()}
  </div>`,

'nc-qrqc': () => {
  const snames=['Détection','Analyse rapide','Action immédiate','Clôture'];
  const qforms={
    1:`<div class="fgrid"><div class="fg full"><div style="background:#FCEBEB;border:1px solid #F7C1C1;border-radius:7px;padding:10px;display:flex;align-items:center;gap:9px;margin-bottom:4px"><div style="font-size:20px">🔴</div><div><div style="font-size:11px;font-weight:600;color:var(--red)">Problème détecté</div><div style="font-size:11px;font-weight:500;color:#501313">Pièce non conforme — Diamètre hors tolérances</div></div></div></div><div class="fg"><label class="fl">Détecté par</label><select class="fi"><option>A. Ali</option><option>O. Hamid</option></select></div><div class="fg"><label class="fl">Date détection</label><input type="date" class="fi" value="2026-05-02"></div><div class="fg"><label class="fl">Poste / Machine</label><input class="fi" value="Machine CN01" readonly style="background:var(--bg)"></div><div class="fg"><label class="fl">Quantité non conforme</label><input class="fi" type="number" value="10"></div><div class="fg full"><label class="fl">Description</label><textarea class="fi">Diamètre mesuré = 24,8 mm — Requis : 25 mm selon plan P-077-C</textarea></div></div>`,
    2:`<div class="fgrid"><div class="fg"><label class="fl">Cause principale <span>*</span></label><input class="fi" value="Outil usé — dérive progressive"></div><div class="fg"><label class="fl">Catégorie cause</label><select class="fi"><option>Machine / Outil</option><option>Méthode</option><option>Matière</option></select></div><div class="fg"><label class="fl">Méthode d'analyse</label><select class="fi"><option>Observation directe (QRQC)</option><option>5 Pourquoi</option><option>Ishikawa</option></select></div><div class="fg"><label class="fl">Responsable analyse</label><select class="fi"><option>A. Ali</option></select></div><div class="fg full"><label class="fl">Commentaire</label><textarea class="fi">Durée de vie outil dépassée — pas de contrôle périodique en place.</textarea></div></div>`,
    3:`<div style="display:flex;flex-direction:column;gap:9px">${[['Arrêt machine CN01','Contention','A. Ali','02/05','02/05'],['Remplacement outil usé','Correction','M. Karim','02/05','03/05'],['MAJ procédure contrôle','Prévention','S. Yassine','03/05','05/05']].map(([a,t,r,dd,df])=>`<div style="border:1px solid var(--border);border-radius:7px;padding:10px"><div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px"><span style="font-size:12px;font-weight:500">${a}</span><span class="badge ${t==='Contention'?'br':t==='Correction'?'bo':'bgr'}">${t}</span></div><div style="display:flex;gap:12px;font-size:11px;color:var(--muted)"><span>Resp: <strong style="color:var(--text)">${r}</strong></span><span>Début: ${dd}</span><span>Fin: ${df}</span></div></div>`).join('')}</div>`,
    4:`<div class="fgrid"><div class="fg full"><label class="fl">Résumé du traitement</label><textarea class="fi">Problème corrigé après remplacement de l'outil CN01. Contrôle dimensionnel conforme.</textarea></div><div class="fg"><label class="fl">Efficacité confirmée ?</label><div class="radio-row"><label><input type="radio" checked> ✔ Oui</label><label><input type="radio"> ✘ Non</label></div></div><div class="fg"><label class="fl">Date clôture</label><input type="date" class="fi" value="2026-05-05"></div><div class="fg"><label class="fl">Validé par</label><select class="fi"><option>Responsable qualité</option></select></div></div>`,
  };
  return `<div class="card">
    <div class="ch"><span class="ct">⚡ Traitement QRQC — NC N° 001</span></div>
    <div style="display:flex;align-items:center;gap:0;margin-bottom:13px">
      ${snames.map((n,i)=>`
        <div style="display:flex;flex-direction:column;align-items:center;flex:${i===0||i===snames.length-1?'none':'1'}">
          <div style="display:flex;align-items:center;width:100%">
            ${i>0?`<div style="flex:1;height:2px;background:${i<STATE.qrqcStep?'var(--blue)':'#e5e7eb'}"></div>`:''}
            <div style="width:28px;height:28px;border-radius:50%;background:${i+1<STATE.qrqcStep?'var(--green)':i+1===STATE.qrqcStep?'var(--blue)':'#e5e7eb'};color:${i+1<=STATE.qrqcStep?'#fff':'var(--muted)'};border:1.5px solid ${i+1<STATE.qrqcStep?'var(--green)':i+1===STATE.qrqcStep?'var(--blue)':'#d1d5db'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;cursor:pointer;flex-shrink:0" onclick="STATE.qrqcStep=${i+1};document.getElementById('content').innerHTML=PAGES['nc-qrqc']()">${i+1<STATE.qrqcStep?'✓':i+1}</div>
            ${i<snames.length-1?`<div style="flex:1;height:2px;background:${i+1<STATE.qrqcStep?'var(--blue)':'#e5e7eb'}"></div>`:''}
          </div>
          <div style="font-size:9px;color:${i+1===STATE.qrqcStep?'var(--blue)':i+1<STATE.qrqcStep?'var(--green)':'var(--muted)'};margin-top:4px;text-align:center;white-space:nowrap">${n}</div>
        </div>`).join('')}
    </div>
    <div style="background:var(--bg);border-radius:7px;padding:8px 12px;margin-bottom:11px;font-size:11px;font-weight:500">Étape ${STATE.qrqcStep}/4 — ${snames[STATE.qrqcStep-1]}</div>
    ${qforms[STATE.qrqcStep]||''}
    <div style="display:flex;justify-content:space-between;margin-top:13px;padding-top:11px;border-top:1px solid var(--border)">
      <button class="btn" onclick="if(STATE.qrqcStep>1){STATE.qrqcStep--;document.getElementById('content').innerHTML=PAGES['nc-qrqc']()}" ${STATE.qrqcStep===1?'disabled':''}>← Précédent</button>
      ${STATE.qrqcStep<4?`<button class="btn bp" onclick="STATE.qrqcStep++;document.getElementById('content').innerHTML=PAGES['nc-qrqc']()">Suivant →</button>`:`<button class="btn bg2" onclick="goPage('nc-cloture')">Clôturer NC ✓</button>`}
    </div>
  </div>`;
},

'nc-actions': () => {
  if(!window.ncActView) window.ncActView='kanban';
  const view = window.ncActView;
  const fResp = window.ncActFResp||'Tous';
  const fType = window.ncActFType||'Tous';
  const fPrio = window.ncActFPrio||'Tous';
  const fQ = window.ncActFQ||'';

  let data = window.NC_ACTIONS.filter(a=>{
    if(fResp!=='Tous'&&a.resp!==fResp) return false;
    if(fType!=='Tous'&&a.type!==fType) return false;
    if(fPrio!=='Tous'&&a.prio!==fPrio) return false;
    if(fQ&&![a.action,a.ref,a.resp,a.desc].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });

  const total=window.NC_ACTIONS.length, done=window.NC_ACTIONS.filter(a=>a.statut==='Clôturée').length,
    enCours=window.NC_ACTIONS.filter(a=>a.statut==='En cours').length,
    retard=window.NC_ACTIONS.filter(a=>a.statut==='En retard').length,
    avgProg=Math.round(window.NC_ACTIONS.reduce((s,a)=>s+a.prog,0)/Math.max(window.NC_ACTIONS.length,1));

  const resps=[...new Set(window.NC_ACTIONS.map(a=>a.resp))];
  const types=[...new Set(window.NC_ACTIONS.map(a=>a.type))];

  const statBtn = (a,s) => `<button onclick="changeStatut('NC_ACTIONS',${a.id},'${s}','nc-actions')" style="font-size:8.5px;padding:2px 7px;border:1px solid ${a.statut===s?ACT_COL_COLOR[s]:'var(--border)'};border-radius:4px;background:${a.statut===s?ACT_COL_COLOR[s]+'18':'#fff'};color:${a.statut===s?ACT_COL_COLOR[s]:'var(--muted)'};cursor:pointer;font-family:'Inter',sans-serif;font-weight:${a.statut===s?'700':'400'};transition:.12s">${s}</button>`;

  const card = (a) => `
  <div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:.15s" onmouseover="this.style.boxShadow='0 4px 14px rgba(0,0,0,.09)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,.04)'">
    <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:7px">
      <div style="flex:1"><div style="font-size:11.5px;font-weight:700;color:var(--navy);line-height:1.35;margin-bottom:3px">${a.action}</div><div style="font-size:9.5px;color:var(--muted);line-height:1.4">${a.desc}</div></div>
      <button onclick="deleteAction('NC_ACTIONS',${a.id},'nc-actions')" style="background:none;border:none;cursor:pointer;color:#d1d5db;font-size:14px;line-height:1;flex-shrink:0;padding:0" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='#d1d5db'">✕</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
      <span class="badge ${ACT_PRIOS[a.prio]||'bgr'}" style="font-size:8.5px">${a.prio}</span>
      <span class="badge ${ACT_TYPES_NC[a.type]||'bgr'}" style="font-size:8.5px">${a.type}</span>
      <span class="badge br" style="font-size:8.5px">${a.ref}</span>
    </div>
    <div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:3px"><span>Progression</span><span id="prog-val-${a.id}" style="font-weight:700;color:${a.prog===100?'var(--green)':a.prog>0?'var(--orange)':'var(--muted)'}">${a.prog}%</span></div>
      <input type="range" min="0" max="100" value="${a.prog}" oninput="updateProg('NC_ACTIONS',${a.id},this.value,'nc-actions')" onchange="document.getElementById('content').innerHTML=PAGES['nc-actions']()" style="width:100%;accent-color:${a.prog===100?'#16a34a':'#dc2626'};height:4px;cursor:pointer">
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:9.5px;color:var(--muted)"><span>👤 ${a.resp}</span><span>⏰ ${a.fin}</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:3px">${ACT_STATUTS.map(s=>statBtn(a,s)).join('')}</div>
  </div>`;

  return `
  <!-- KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin-bottom:12px">
    ${[['Total',total,'var(--blue)','📋'],['En cours',enCours,'var(--orange)','⚡'],['En retard',retard,'var(--red)','⏰'],['Clôturées',done,'var(--green)','✅'],['Avancement',avgProg+'%','#dc2626','📊']].map(([l,v,c,ic])=>`
    <div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:11px 12px;display:flex;align-items:center;gap:9px">
      <span style="font-size:18px">${ic}</span><div><div style="font-size:20px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:10px;color:var(--muted);margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>

  <!-- Toolbar -->
  <div class="card" style="padding:10px 14px;margin-bottom:10px">
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:4px 9px;flex:1;min-width:160px">
        <span style="color:var(--muted)">🔍</span>
        <input placeholder="Rechercher action, NC, responsable…" value="${fQ}" oninput="window.ncActFQ=this.value;document.getElementById('content').innerHTML=PAGES['nc-actions']()" style="border:none;background:transparent;font-size:11px;outline:none;width:100%;font-family:'Inter',sans-serif">
      </div>
      <select class="sel" onchange="window.ncActFResp=this.value;document.getElementById('content').innerHTML=PAGES['nc-actions']()"><option value="Tous">Resp. : Tous</option>${resps.map(r=>`<option${r===fResp?' selected':''}>${r}</option>`).join('')}</select>
      <select class="sel" onchange="window.ncActFType=this.value;document.getElementById('content').innerHTML=PAGES['nc-actions']()"><option value="Tous">Type : Tous</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}</select>
      <select class="sel" onchange="window.ncActFPrio=this.value;document.getElementById('content').innerHTML=PAGES['nc-actions']()"><option value="Tous">Priorité : Toutes</option>${['Critique','Haute','Normale'].map(p=>`<option${p===fPrio?' selected':''}>${p}</option>`).join('')}</select>
      <button class="btn bsm" onclick="window.ncActFResp='Tous';window.ncActFType='Tous';window.ncActFPrio='Tous';window.ncActFQ='';document.getElementById('content').innerHTML=PAGES['nc-actions']()">✕ Reset</button>
      <div style="display:flex;background:#f1f5f9;border:1px solid var(--border);border-radius:7px;overflow:hidden;margin-left:auto">
        <button onclick="window.ncActView='kanban';document.getElementById('content').innerHTML=PAGES['nc-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view==='kanban'?'var(--blue)':'transparent'};color:${view==='kanban'?'#fff':'var(--muted)'};transition:.15s">⬛ Kanban</button>
        <button onclick="window.ncActView='liste';document.getElementById('content').innerHTML=PAGES['nc-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view==='liste'?'var(--blue)':'transparent'};color:${view==='liste'?'#fff':'var(--muted)'};transition:.15s">≡ Liste</button>
      </div>
      <button class="btn bp bsm" onclick="showAddActionModal('NC_ACTIONS','nc-actions')">+ Ajouter action</button>
    </div>
  </div>

  ${view==='kanban'?`
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:11px">
    ${ACT_STATUTS.map(statut=>{
      const col=data.filter(a=>a.statut===statut);
      return `<div style="background:${ACT_COL_BG[statut]};border-radius:11px;padding:10px;min-height:180px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:11px;font-weight:700;color:var(--navy)">${statut==='À faire'?'⏳':statut==='En cours'?'⚡':statut==='En retard'?'🚨':'✅'} ${statut}</div>
          <span style="background:#fff;border:1px solid ${ACT_COL_COLOR[statut]}40;border-radius:10px;padding:1px 8px;font-size:10px;font-weight:700;color:${ACT_COL_COLOR[statut]}">${col.length}</span>
        </div>
        ${col.map(a=>card(a)).join('')}
      </div>`;
    }).join('')}
  </div>`:`
  <div class="card" style="padding:0;overflow:hidden"><div style="overflow-x:auto">
    <table class="tbl" style="min-width:800px"><thead><tr><th>Action</th><th>Type</th><th>Réf. NC</th><th>Responsable</th><th>Début</th><th>Fin prévue</th><th>Statut</th><th>Progression</th><th>Changer statut</th></tr></thead>
    <tbody>${data.map(a=>`<tr>
      <td style="font-weight:600;font-size:11px">${a.action}</td>
      <td><span class="badge ${ACT_TYPES_NC[a.type]||'bgr'}" style="font-size:8.5px">${a.type}</span></td>
      <td style="color:var(--red);font-weight:600;font-size:10px">${a.ref}</td>
      <td style="font-size:10.5px">${a.resp}</td><td style="font-size:10px;color:var(--muted)">${a.debut}</td><td style="font-size:10px;color:var(--muted)">${a.fin}</td>
      <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':a.statut==='En retard'?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
      <td><div style="display:flex;align-items:center;gap:5px"><div class="prog"><div class="pf" style="width:${a.prog}%;background:${a.prog===100?'var(--green)':a.prog>0?'var(--yellow)':'#888'}"></div></div><span style="font-size:10px;font-weight:600">${a.prog}%</span></div></td>
      <td><select onchange="changeStatut('NC_ACTIONS',${a.id},this.value,'nc-actions')" class="sel" style="font-size:10px;padding:3px 6px">${ACT_STATUTS.map(s=>`<option${a.statut===s?' selected':''}>${s}</option>`).join('')}</select></td>
    </tr>`).join('')}</tbody></table>
  </div></div>`}`;
},

'nc-kpi': () => {
  if(!window.ncKpiPer) window.ncKpiPer = 'trimestre';
  const per = window.ncKpiPer;
  const monthsNC = [['Jan',3],['Fév',4],['Mar',2],['Avr',5],['Mai',8],['Jun',0]];
  const maxNC = 12;
  const stages = [['Réception','35%','#dc2626',35],['Fabrication','42%','#ea580c',42],['Assemblage','15%','#f59e0b',15],['Livraison','8%','#16a34a',8]];
  const causesRC = [['Erreur opérateur','38%','#dc2626'],['Défaut matière','24%','#ea580c'],['Outillage','18%','#f59e0b'],['Procédure NC','12%','#6366f1'],['Autre','8%','#9ca3af']];
  return `
  <!-- Header -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
    <div>
      <div style="font-size:14px;font-weight:700;color:var(--navy)">📊 Tableau de bord KPI — Non-Conformités</div>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">ISO 9001 · Suivi QRQC · Mise à jour : 17/05/2026</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center">
      <div style="display:flex;background:#f1f5f9;border:1px solid var(--border);border-radius:7px;overflow:hidden">
        ${['mensuel','trimestre','annuel'].map(p=>`<button onclick="window.ncKpiPer='${p}';document.getElementById('content').innerHTML=PAGES['nc-kpi']()" style="padding:5px 12px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${'${p}'===per?'var(--blue)':'transparent'};color:${'${p}'===per?'#fff':'var(--muted)'};transition:.15s">${p.charAt(0).toUpperCase()+p.slice(1)}</button>`).join('')}
      </div>
      <button class="btn bsm">📥 Export</button>
    </div>
  </div>

  <!-- KPI Cards -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px">
    ${[['Total NC','8','var(--blue)','⚠','Cumul 2026',''],['Critiques','3','var(--red)','🚨','Traitement urgent','↑'],['Clôturées','2','var(--green)','✅','Taux : 25%','↓'],['En cours','6','var(--orange)','⏳','Suivi actif','→'],['Délai résol.','2,8 j','var(--navy)','⏱','Objectif ≤ 2j','↑'],['Taux détection','78%','#2563eb','🔍','En fabrication','→'],['NC répétitives','25%','#c2410c','🔁','Objectif ≤ 10%','↑'],['Efficacité QRQC','62%','var(--green)','🎯','Actions menées','→']].map(([l,v,c,ic,sub,arrow])=>`
    <div style="background:var(--white);border:1px solid var(--border);border-radius:10px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c};opacity:.7"></div>
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:16px">${ic}</span>
        <span style="font-size:10px;font-weight:700;color:${arrow==='↑'?'var(--red)':arrow==='↓'?'var(--green)':'var(--muted)'}">${arrow}</span>
      </div>
      <div style="font-size:22px;font-weight:700;color:${c};line-height:1;margin-bottom:3px;font-family:monospace">${v}</div>
      <div style="font-size:10px;font-weight:600;color:var(--navy);margin-bottom:2px">${l}</div>
      <div style="font-size:9px;color:var(--muted)">${sub}</div>
    </div>`).join('')}
  </div>

  <!-- Row 2 : Bar chart + Répartition -->
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:13px">
    <!-- Bar chart NC mensuel -->
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">📈 Évolution mensuelle des NC — 2026</span>
        <span style="font-size:9px;color:var(--muted)">Obj. ≤ 2 NC/mois · Ligne bleue</span>
      </div>
      <div style="position:relative;padding:6px 0 22px">
        <div style="position:absolute;left:0;right:0;top:6px;bottom:22px">
          ${[0,25,50,75].map(pct=>`<div style="position:absolute;left:0;right:0;bottom:${pct}%;border-top:1px dashed #e5e7eb"></div>`).join('')}
          <div style="position:absolute;left:0;right:0;bottom:${2/maxNC*100}%;border-top:2px dashed #2563eb;opacity:.7"></div>
          <div style="position:absolute;right:4px;bottom:calc(${2/maxNC*100}% + 3px);font-size:8px;color:#2563eb;font-weight:700">Obj. 2</div>
        </div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:100px;padding:0 4px;position:relative;z-index:1">
          ${monthsNC.map(([m,v])=>{
            const h=v>0?(v/maxNC*88):2; const c=v>2?'#dc2626':v>0?'#16a34a':'#e5e7eb';
            return`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
              <div style="font-size:10px;font-weight:700;color:${c}">${v||'—'}</div>
              <div style="width:100%;height:${h}px;background:linear-gradient(180deg,${c}dd,${c});border-radius:4px 4px 0 0;min-height:2px;box-shadow:0 2px 4px ${c}33"></div>
              <div style="font-size:9px;color:var(--muted);font-weight:500">${m}</div>
            </div>`;
          }).join('')}
          <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="font-size:9px;color:var(--muted)">?</div>
            <div style="width:100%;height:8px;background:#e5e7eb;border-radius:4px 4px 0 0;border:1.5px dashed #9ca3af;box-sizing:border-box"></div>
            <div style="font-size:9px;color:var(--muted)">Jun</div>
          </div>
        </div>
      </div>
      <div style="display:flex;gap:14px;justify-content:center;margin-top:4px;font-size:9.5px">
        <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;background:#16a34a;border-radius:2px"></div>≤ 2</div>
        <div style="display:flex;align-items:center;gap:4px"><div style="width:10px;height:10px;background:#dc2626;border-radius:2px"></div>&gt; 2</div>
        <div style="display:flex;align-items:center;gap:4px"><div style="width:18px;height:0;border-top:2px dashed #2563eb"></div>Objectif</div>
      </div>
    </div>

    <!-- Répartition donuts -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🥧 Répartition NC</div>
      <div style="display:flex;gap:10px;justify-content:center;align-items:center">
        <div style="text-align:center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="28" fill="none" stroke="#e5e7eb" stroke-width="10"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#dc2626" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.37} ${2*Math.PI*28}" stroke-dashoffset="${2*Math.PI*28*0.25}" stroke-linecap="butt"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#ea580c" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.38} ${2*Math.PI*28}" stroke-dashoffset="${-2*Math.PI*28*0.12}" stroke-linecap="butt"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#16a34a" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.25} ${2*Math.PI*28}" stroke-dashoffset="${-2*Math.PI*28*0.5}" stroke-linecap="butt"/>
            <text x="40" y="37" text-anchor="middle" font-size="9" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">Statut</text>
            <text x="40" y="47" text-anchor="middle" font-size="7" fill="var(--muted)" font-family="Inter,sans-serif">8 NC</text>
          </svg>
          <div style="display:flex;flex-direction:column;gap:3px;text-align:left;margin-top:4px">
            ${[['En cours','37%','#dc2626'],['Ouvert','38%','#ea580c'],['Clôturé','25%','#16a34a']].map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:7px;height:7px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:8.5px;color:var(--muted)">${l}</span><span style="font-size:8.5px;font-weight:700;color:${c};margin-left:auto">${v}</span></div>`).join('')}
          </div>
        </div>
        <div style="width:1px;height:90px;background:var(--border)"></div>
        <div style="text-align:center">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="28" fill="none" stroke="#e5e7eb" stroke-width="10"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#dc2626" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.37} ${2*Math.PI*28}" stroke-dashoffset="${2*Math.PI*28*0.25}" stroke-linecap="butt"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#f59e0b" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.38} ${2*Math.PI*28}" stroke-dashoffset="${-2*Math.PI*28*0.12}" stroke-linecap="butt"/>
            <circle cx="40" cy="40" r="28" fill="none" stroke="#22c55e" stroke-width="10" stroke-dasharray="${2*Math.PI*28*0.25} ${2*Math.PI*28}" stroke-dashoffset="${-2*Math.PI*28*0.5}" stroke-linecap="butt"/>
            <text x="40" y="37" text-anchor="middle" font-size="9" fill="var(--navy)" font-weight="700" font-family="Inter,sans-serif">Gravité</text>
            <text x="40" y="47" text-anchor="middle" font-size="7" fill="var(--muted)" font-family="Inter,sans-serif">8 NC</text>
          </svg>
          <div style="display:flex;flex-direction:column;gap:3px;text-align:left;margin-top:4px">
            ${[['Critique','37%','#dc2626'],['Majeure','38%','#f59e0b'],['Mineure','25%','#22c55e']].map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:7px;height:7px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:8.5px;color:var(--muted)">${l}</span><span style="font-size:8.5px;font-weight:700;color:${c};margin-left:auto">${v}</span></div>`).join('')}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Row 3 : Détection + Causes -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <!-- Stade de détection -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🔍 Stade de détection des NC</div>
      <div style="display:flex;flex-direction:column;gap:7px">
        ${stages.map(([stage,pct,c,val])=>`
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:10px;color:var(--navy);font-weight:600;width:90px;flex-shrink:0">${stage}</span>
          <div style="flex:1;height:18px;background:#f1f5f9;border-radius:5px;overflow:hidden;position:relative">
            <div style="position:absolute;left:0;top:0;bottom:0;width:${val}%;background:${c};border-radius:5px;display:flex;align-items:center;padding:0 6px;transition:.4s">
              <span style="font-size:9px;font-weight:700;color:#fff;white-space:nowrap">${pct}</span>
            </div>
          </div>
        </div>`).join('')}
      </div>
      <div style="margin-top:12px;padding:8px;background:#fef2f2;border-radius:7px;border:1px solid #fecaca;font-size:10px;color:#991b1b">
        ⚠ <strong>77% des NC</strong> détectées en interne — 8% seulement à la livraison ✅
      </div>
    </div>

    <!-- Causes racines -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🧩 Causes racines — Répartition</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        ${causesRC.map(([cause,pct,c])=>`
        <div style="display:flex;align-items:center;gap:8px">
          <div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div>
          <span style="font-size:10px;color:var(--navy);flex:1;font-weight:500">${cause}</span>
          <div style="width:90px;display:flex;align-items:center;gap:4px">
            <div style="flex:1;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden">
              <div style="height:100%;width:${pct};background:${c};border-radius:3px"></div>
            </div>
            <span style="font-size:10px;font-weight:700;color:${c};font-family:monospace;width:28px;text-align:right">${pct}</span>
          </div>
        </div>`).join('')}
      </div>
      <div style="margin-top:12px;padding:8px;background:#eff6ff;border-radius:7px;border:1px solid #bfdbfe;font-size:10px;color:#1e40af">
        📌 <strong>Action prioritaire :</strong> Formation opérateurs + revue AMDEC process
      </div>
    </div>
  </div>`;
},

'nc-cloture': () => `
  <div style="max-width:520px;margin:0 auto">
    <div class="card" style="text-align:center;padding:32px 28px">
      <div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#7f1d1d,#dc2626);display:flex;align-items:center;justify-content:center;margin:0 auto 14px;font-size:26px;box-shadow:0 4px 16px rgba(220,38,38,.35)">✓</div>
      <div style="font-size:18px;font-weight:800;color:#0f172a;margin-bottom:6px">Non-Conformité clôturée</div>
      <div style="font-size:11px;color:#94a3b8;margin-bottom:20px">NC-001 · Usinage · Clôturée le 14/05/2026</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:20px">
        ${[['📅','Durée totale','5 jours'],['↺','Actions','2 / 2'],['🔍','Cause racine','Identifiée']].map(([ic,l,v])=>`
        <div style="background:#f8fafc;border-radius:9px;padding:11px;border:1px solid #f1f5f9">
          <div style="font-size:18px;margin-bottom:4px">${ic}</div>
          <div style="font-size:15px;font-weight:800;color:#dc2626">${v}</div>
          <div style="font-size:9px;color:#94a3b8">${l}</div>
        </div>`).join('')}
      </div>
      <div style="background:#fef2f2;border-radius:9px;padding:12px;border:1px solid #fecaca;margin-bottom:18px;text-align:left">
        <div style="font-size:10px;font-weight:700;color:#991b1b;margin-bottom:6px">📝 Cause racine &amp; correction</div>
        <div style="font-size:11px;color:#374151;line-height:1.6">Usure prématurée outil T12 (vitesse d'avance excessive). Outil remplacé + programme CN modifié + formation opérateur. 10 pièces contrôlées : toutes conformes.</div>
      </div>
      <div style="display:flex;gap:8px;justify-content:center">
        <button class="btn" onclick="goPage('nc-liste')">← Retour à la liste</button>
        <button class="btn btn-danger" onclick="goPage('nc-kpi')">📊 Voir les KPIs</button>
      </div>
    </div>
  </div>`,

'audit-tb': () => {
  if(!window.AUDITS_DATA) PAGES['audit-liste']();
  const D=window.AUDITS_DATA||[];
  const clos=D.filter(a=>a.statut==='Clôturé');
  const avgScore=clos.length?Math.round(clos.reduce((s,a)=>s+a.score,0)/clos.length):0;
  const plan=D.filter(a=>a.statut==='Planifié').length;
  const inC=D.filter(a=>a.statut==='En cours').length;
  const totalEcarts=D.reduce((s,a)=>s+a.ecarts,0);
  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[['📋',D.length,'Total audits 2026','#2563eb','#eff6ff'],['✅',clos.length,'Clôturés','#16a34a','#f0fdf4'],['📊',avgScore+'%','Score moyen','#7c3aed','#f5f3ff'],['⚠',totalEcarts,'Écarts détectés','#dc2626','#fef2f2']].map(([ic,v,l,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:13px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:10px;color:${c};opacity:.75;margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">📊 Scores par département</span><button class="btn bsm" onclick="goPage('audit-liste')">Liste →</button></div>
      ${D.filter(a=>a.score!==null).map(a=>`
      <div style="margin-bottom:10px">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
          <span style="font-weight:600;color:#0f172a">${a.dep}</span>
          <div style="display:flex;align-items:center;gap:6px"><span style="font-size:9px;color:#94a3b8">${a.type}</span><span style="font-weight:800;color:${a.score>=90?'#16a34a':a.score>=70?'#f59e0b':'#dc2626'}">${a.score}%</span></div>
        </div>
        <div style="height:7px;background:#f1f5f9;border-radius:5px;overflow:hidden"><div style="height:100%;width:${a.score}%;background:${a.score>=90?'#16a34a':a.score>=70?'#f59e0b':'#dc2626'};border-radius:5px"></div></div>
      </div>`).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div class="card" style="margin-bottom:0">
        <div class="ch"><span class="ct">📅 Prochains audits planifiés</span><button class="btn bsm" onclick="goPage('audit-plan')">+ Planifier</button></div>
        ${D.filter(a=>a.statut==='Planifié').slice(0,3).map(a=>`
        <div style="padding:10px;background:#f8fafc;border-radius:9px;border:1px solid #f1f5f9;margin-bottom:7px;display:flex;align-items:center;gap:10px">
          <div style="width:34px;height:34px;border-radius:9px;background:#eff6ff;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">📅</div>
          <div style="flex:1"><div style="font-size:11px;font-weight:600;color:#0f172a">${a.type} — ${a.dep}</div><div style="font-size:9.5px;color:#94a3b8">${a.aud} · ${a.date}</div></div>
          <button class="btn bsm" onclick="goPage('audit-check')">→</button>
        </div>`).join('')||'<div style="text-align:center;padding:14px;color:#94a3b8;font-size:11px">Aucun audit planifié</div>'}
      </div>
      <div class="card" style="margin-bottom:0">
        <div class="ct" style="margin-bottom:10px">🎯 Accès rapide</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          ${[['📋','Liste audits','audit-liste'],['📅','Planifier','audit-plan'],['✓','Checklist','audit-check'],['📄','Rapport','audit-rapport']].map(([ic,lb,pg])=>`
          <button onclick="goPage('${pg}')" style="display:flex;align-items:center;gap:8px;padding:10px;background:#f8fafc;border:1.5px solid #e2e8f0;border-radius:9px;cursor:pointer;font-family:'Inter',sans-serif;font-size:11px;font-weight:600;color:#374151;transition:.15s" onmouseover="this.style.borderColor='#2563eb';this.style.background='#eff6ff'" onmouseout="this.style.borderColor='#e2e8f0';this.style.background='#f8fafc'"><span style="font-size:18px">${ic}</span>${lb}</button>`).join('')}
        </div>
      </div>
    </div>
  </div>`;
},

'audit-liste': () => `
  <div class="card" style="padding:11px 14px;margin-bottom:12px">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:10px">
      <select class="sel"><option>Type: Tous</option><option>Interne</option><option>ISO 9001</option><option>Sécurité</option><option>Environnement</option></select>
      <select class="sel"><option>Département: Tous</option><option>Usinage</option><option>Bureau d'études</option><option>Assemblage</option></select>
      <select class="sel"><option>Statut: Tous</option><option>Planifié</option><option>En cours</option><option>Clôturé</option></select>
      <input type="text" class="sel" placeholder="01/01/2024 – 31/12/2024" style="width:160px">
      <button class="btn bp bsm">Rechercher</button>
    </div>
    <table class="tbl"><thead><tr><th>N° Audit</th><th>Type</th><th>Département</th><th>Auditeur</th><th>Date prévue</th><th>Statut</th><th>NC</th><th></th></tr></thead>
    <tbody>
      ${[['A01','Interne','Usinage','KORTAS.A','05/05/2024','Planifié','—'],
         ['A02','ISO 9001','Bureau d\'études','Y. Reda','08/05/2024','En cours','2'],
         ['A03','Sécurité','Atelier','M. Karim','15/05/2024','Clôturé','4'],
         ['A04','Interne','Assemblage','S. Yassine','18/05/2024','Planifié','—'],
         ['A05','Environnement','Maintenance','H. Saidi','22/05/2024','En cours','1'],
      ].map(([n,t,dep,aud,date,s,nc])=>`<tr><td><span class="link" onclick="goPage('audit-check')">${n}</span></td><td>${t}</td><td>${dep}</td><td>${aud}</td><td>${date}</td><td><span class="badge ${s==='Clôturé'?'bg3':s==='Planifié'?'bb':'by'}">${s}</span></td><td style="font-weight:600;color:${nc!=='—'?'var(--red)':'var(--muted)'}">${nc}</td><td><button class="btn bsm" onclick="goPage('audit-check')">Voir</button></td></tr>`).join('')}
    </tbody></table>
    <div style="text-align:right;margin-top:10px;font-size:11px;color:var(--blue);cursor:pointer" onclick="goPage('audit-liste')">Voir tous les audits →</div>
  </div>`,

'audit-plan': () => `
  <div class="card" style="max-width:680px;margin:0 auto">
    <div class="ch"><span class="ct">Planification d\'un audit</span></div>
    <div class="fgrid">
      <div class="fg"><label class="fl">Type d'audit <span>*</span></label><select class="fi"><option>Interne</option><option>ISO 9001</option><option>Sécurité</option><option>Environnement</option></select></div>
      <div class="fg"><label class="fl">Département <span>*</span></label><select class="fi"><option>Usinage</option><option>Bureau d'études</option><option>Assemblage</option></select></div>
      <div class="fg"><label class="fl">Auditeur <span>*</span></label><select class="fi"><option>KORTAS.A</option><option>Y. Reda</option><option>M. Karim</option></select></div>
      <div class="fg"><label class="fl">Date prévue <span>*</span></label><input type="date" class="fi" value="2024-05-05"></div>
      <div class="fg full"><label class="fl">Objectif de l'audit</label><textarea class="fi">Vérifier la conformité des processus de production</textarea></div>
      <div class="fg full"><label class="fl">Checklist associée <span>*</span></label><select class="fi"><option>Checklist audit interne ISO 9001</option><option>Checklist sécurité SST</option><option>Checklist environnement</option></select></div>
      <div class="fg"><label class="fl">Participants</label><input class="fi" value="M. Karim, Y. Reda"></div>
      <div class="fg"><label class="fl">Durée prévue</label><select class="fi"><option>1 journée</option><option>Demi-journée</option><option>2 jours</option></select></div>
    </div>
    <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:13px;padding-top:11px;border-top:1px solid var(--border)">
      <button class="btn" onclick="goPage('audit-liste')">Annuler</button>
      <button class="btn bp" onclick="goPage('audit-check')">Enregistrer →</button>
    </div>
  </div>`,

'audit-check': () => `
  <div class="g2">
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">Audit A02 — ISO 9001</span>
        <div style="display:flex;align-items:center;gap:7px">
          <div style="background:#E6F1FB;border-radius:6px;padding:4px 10px;font-size:11px">
            <span style="color:var(--muted)">Progression</span>
            <span style="margin-left:6px;font-weight:600;color:var(--blue)">60%</span>
            <div style="height:4px;background:#e5e7eb;border-radius:2px;margin-top:3px;width:80px;overflow:hidden"><div style="height:100%;width:60%;background:var(--blue);border-radius:2px"></div></div>
          </div>
        </div>
      </div>
      <div style="font-size:11px;color:var(--muted);margin-bottom:10px">Audit: A02 — ISO 9001 | Auditeur: Y. Reda | Département: Bureau d'études</div>
      <table class="tbl">
        <thead><tr><th style="width:30px">N°</th><th>Question</th><th style="width:140px">Réponse</th><th>Commentaire</th><th style="width:50px">Preuve</th><th style="width:30px"></th></tr></thead>
        <tbody>
          ${[['Les procédures sont-elles disponibles ?','Conforme','Procédures disponibles et à jour'],
             ['Les enregistrements sont-ils maîtrisés ?','NC','Manque un enregistrement'],
             ['Les équipements sont-ils étalonnés ?','Conforme','Étalonnage à jour'],
             ['Les compétences du personnel sont-elles validées ?','NC','2 opérateurs sans formation'],
          ].map(([q,r,comm],i)=>`<tr>
            <td>${i+1}</td><td>${q}</td>
            <td><div style="display:flex;gap:4px">
              <span class="badge ${r==='Conforme'?'bg3':'br'}">${r}</span>
              <span class="badge bb" style="cursor:pointer;font-size:9px">NC</span>
              <span class="badge bgr" style="cursor:pointer;font-size:9px">Obs.</span>
            </div></td>
            <td style="color:var(--muted);font-size:11px">${comm}</td>
            <td><button class="btn bsm">📎</button></td>
            <td><span style="color:var(--muted);cursor:pointer">⋮</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid var(--border)">
        <button class="btn" onclick="goPage('audit-plan')">← Précédent</button>
        <button class="btn bp" onclick="goPage('audit-rapport')">Suivant →</button>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">Résumé audit</div>
        ${[['Points conformes','18','var(--green)'],['Non-conformités','3','var(--red)'],['Observations','2','var(--orange)'],['Points vérifiés','23','var(--navy)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;font-size:13px;color:${c}">${v}</span></div>`).join('')}
      </div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">Non-conformités détectées</div>
        ${[['NC01','Procédure non respectée','Critique'],['NC02','Enregistrement manquant','Majeure'],['NC03','Formation non à jour','Mineure']].map(([n,d,g])=>`<div style="padding:7px 0;border-bottom:1px solid var(--border)"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;font-weight:600;color:var(--blue)">${n}</span><span class="badge ${g==='Critique'?'br':g==='Majeure'?'bo':'bg3'}" style="font-size:9px">${g}</span></div><div style="font-size:10px;color:var(--muted)">${d}</div></div>`).join('')}
      </div>
    </div>
  </div>`,

'audit-rapport': () => `
  <div class="g2">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">Rapport d'Audit A02 — ISO 9001</span></div>
      <div class="g2" style="margin-bottom:12px">
        <div>
          <div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:7px">RÉSUMÉ</div>
          ${[['Points conformes','18','var(--green)'],['Non-conformités','3','var(--red)'],['Observations','2','var(--orange)'],['Points vérifiés','23','var(--navy)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c}">${v}</span></div>`).join('')}
        </div>
        <div>
          <div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:7px">NON-CONFORMITÉS</div>
          ${[['NC01','Procédure non respectée','Critique'],['NC02','Enregistrement manquant','Majeure'],['NC03','Formation non à jour','Mineure']].map(([n,d,g])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="display:flex;justify-content:space-between"><span style="font-size:11px;font-weight:600;color:var(--blue)">${n}</span><span class="badge ${g==='Critique'?'br':g==='Majeure'?'bo':'bg3'}" style="font-size:9px">${g}</span></div><div style="font-size:10px;color:var(--muted)">${d}</div></div>`).join('')}
        </div>
      </div>
      <div style="font-size:10px;font-weight:600;color:var(--muted);margin-bottom:8px">PLAN D'ACTIONS</div>
      <table class="tbl"><thead><tr><th>Action</th><th>Responsable</th><th>Échéance</th><th>Statut</th></tr></thead>
      <tbody>
        <tr><td>Mettre à jour la procédure</td><td>M. Karim</td><td>20/05/2024</td><td><span class="badge by">En cours</span></td></tr>
        <tr><td>Compléter les enregistrements</td><td>Y. Reda</td><td>18/05/2024</td><td><span class="badge bb">Ouverte</span></td></tr>
        <tr><td>Planifier formation opérateurs</td><td>S. Yassine</td><td>25/05/2024</td><td><span class="badge bb">Ouverte</span></td></tr>
      </tbody></table>
      <div style="display:flex;justify-content:space-between;margin-top:12px;padding-top:10px;border-top:1px solid var(--border)">
        <button class="btn" onclick="goPage('audit-check')">Retour checklist</button>
        <button class="btn bg2" onclick="goPage('audit-cloture')">Valider le rapport ✓</button>
      </div>
    </div>
    <div>
      <div class="card">
        <div class="ct" style="margin-bottom:10px">Auditeur & Validation</div>
        ${[['Auditeur','Y. Reda'],['Date audit','08/05/2024'],['Département','Bureau d\'études'],['Type','ISO 9001'],['Durée','1 journée']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}
      </div>
    </div>
  </div>`,

'audit-docs': () => `
  <div class="card">
    <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px;align-items:center">
      <select class="sel"><option>Type: Tous</option><option>Procédure</option><option>Instruction</option><option>Enregistrement</option></select>
      <select class="sel"><option>Statut: Tous</option><option>Validé</option><option>En révision</option><option>Brouillon</option></select>
      <select class="sel"><option>Département: Tous</option><option>Qualité</option><option>Production</option></select>
      <input class="sel" placeholder="Rechercher..." style="width:150px">
      <button class="btn bp bsm">Rechercher</button>
    </div>
    <table class="tbl"><thead><tr><th>Code</th><th>Nom du document</th><th>Type</th><th>Version</th><th>Statut</th><th>Date maj.</th><th></th></tr></thead>
    <tbody>
      ${[['PR01','Procédure Qualité','Procédure','V2','Validé','02/05/2024'],
         ['IN05','Instruction Montage','Instruction','V1','En révision','30/04/2024'],
         ['ENR04','Rapport Inspection','Enregistrement','V1','Validé','28/04/2024'],
         ['PR11','Gestion des NC','Procédure','V2','Validé','25/04/2024'],
         ['IN09','Instruction Contrôle','Instruction','V1','Brouillon','20/04/2024'],
      ].map(([c,n,t,v,s,d])=>`<tr><td style="color:var(--blue);font-weight:600">${c}</td><td>${n}</td><td>${t}</td><td>${v}</td><td><span class="badge ${s==='Validé'?'bg3':s==='En révision'?'by':'bgr'}">${s}</span></td><td>${d}</td><td><button class="btn bsm">Voir</button></td></tr>`).join('')}
    </tbody></table>
    <div style="text-align:center;margin-top:10px;font-size:11px;color:var(--blue);cursor:pointer">Voir tous les documents →</div>
  </div>`,

'audit-cloture': () => `
  <div class="card" style="max-width:450px;margin:0 auto;text-align:center;padding:28px">
    <div style="width:48px;height:48px;border-radius:50%;background:#dcfce7;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:20px;color:var(--green)">✓</div>
    <div style="font-size:15px;font-weight:700;margin-bottom:6px">Audit A02 clôturé avec succès</div>
    <div style="font-size:12px;color:var(--muted);margin-bottom:18px">Audit ISO 9001 — Bureau d'études — 08/05/2024</div>
    ${[['Type','ISO 9001'],['Département','Bureau d\'études'],['Auditeur','Y. Reda'],['NC détectées','3'],['Points conformes','18'],['Date clôture','08/05/2024'],['Validé par','KORTAS.A']].map(([k,v])=>`<div class="drow" style="text-align:left"><span class="dk">${k}</span><span style="font-weight:500;font-size:11px">${v}</span></div>`).join('')}
    <div style="display:flex;gap:8px;justify-content:center;margin-top:18px">
      <button class="btn" onclick="goPage('audit-liste')">← Retour à la liste</button>
      <button class="btn bp">Exporter PDF</button>
    </div>
  </div>`,

/* ── BIENTÔT ── */
'reunion': () => pgSoon('reunion'),
'env': () => { document.getElementById('content').innerHTML=PAGES['env-dash'](); return ''; },

/* ════ DONNÉES GLOBALES ENV ════ */
'_envInit': (() => {
  if(!window.ENV_ASPECTS_DATA) window.ENV_ASPECTS_DATA=[
    {id:'ASP-001',activite:'Usinage',aspect:'Huile usag\u00e9e',impact:'Pollution des sols',g:'\u00c9lev\u00e9',freq:4,crit:12,niv:'\u00c9lev\u00e9',s:'Actif',action:'Installer bac r\u00e9tention'},
    {id:'ASP-002',activite:'Peinture',aspect:'\u00c9missions COV',impact:'Pollution de l\u2019air',g:'Moyen',freq:3,crit:9,niv:'Moyen',s:'Actif',action:'Ventilation renforc\u00e9e'},
    {id:'ASP-003',activite:'Assemblage',aspect:'D\u00e9chets m\u00e9talliques',impact:'Ressources',g:'\u00c9lev\u00e9',freq:3,crit:9,niv:'\u00c9lev\u00e9',s:'Actif',action:'Tri et recyclage'},
    {id:'ASP-004',activite:'Maintenance',aspect:'Produits chimiques',impact:'Pollution sol\/eau',g:'\u00c9lev\u00e9',freq:2,crit:10,niv:'\u00c9lev\u00e9',s:'Actif',action:'Armoire s\u00e9curis\u00e9e'},
    {id:'ASP-005',activite:'Bureau',aspect:'Conso. papier',impact:'D\u00e9forestation',g:'Faible',freq:5,crit:5,niv:'Faible',s:'Actif',action:'D\u00e9mat\u00e9rialisation'},
    {id:'ASP-006',activite:'\u00c9nergie',aspect:'Conso. \u00e9lectricit\u00e9',impact:'\u00c9missions CO2',g:'Moyen',freq:4,crit:12,niv:'\u00c9lev\u00e9',s:'Actif',action:'LED + capteurs'},
  ];
  if(!window.ENV_DECHETS_DATA) window.ENV_DECHETS_DATA=[
    {id:'DEC-001',d:'15/05/2026',type:'M\u00e9talliques',desc:'Copeaux usinage',qte:120,unite:'kg',zone:'Usinage',stockOk:true,enlev:'15/05/2026',presta:'Eco Recycling',s:'Enlev\u00e9'},
    {id:'DEC-002',d:'12/05/2026',type:'Huiles usag\u00e9es',desc:'Huile de coupe',qte:85,unite:'L',zone:'Usinage',stockOk:true,enlev:'18/05/2026',presta:'Metal Green',s:'En attente'},
    {id:'DEC-003',d:'13/05/2026',type:'Cartons',desc:'Emballages',qte:200,unite:'kg',zone:'Magasin',stockOk:true,enlev:'15/05/2026',presta:'Veero Carton',s:'Enlev\u00e9'},
    {id:'DEC-004',d:'14/05/2026',type:'Plastiques',desc:'Films plastiques',qte:80,unite:'kg',zone:'Assemblage',stockOk:true,enlev:'20/05/2026',presta:'Plast Recycle',s:'En attente'},
    {id:'DEC-005',d:'16/05/2026',type:'Dangereux',desc:'Chiffons souill\u00e9s',qte:25,unite:'kg',zone:'Maintenance',stockOk:false,enlev:'---',presta:'Hazard Clean',s:'Non conforme'},
    {id:'DEC-006',d:'17/05/2026',type:'Dangereux',desc:'Solvants us\u00e9s',qte:40,unite:'L',zone:'Peinture',stockOk:false,enlev:'---',presta:'Hazard Clean',s:'Non conforme'},
  ];
  if(!window.ENV_CHIMIQUES_DATA) window.ENV_CHIMIQUES_DATA=[
    {id:'PC-001',prod:'Ac\u00e9tone',fam:'Solvant',qte:5,unite:'L',empl:'Magasin chimique',fds:true,exp:'10/06/2026',etat:'OK',danger:'Inflammable / Irritant'},
    {id:'PC-002',prod:'Huile soluble',fam:'Lubrifiant',qte:20,unite:'L',empl:'Usinage',fds:true,exp:'25/01/2026',etat:'P\u00e9rim\u00e9',danger:'Nocif pour l\u2019environnement'},
    {id:'PC-003',prod:'D\u00e9graissant',fam:'Nettoyant',qte:3,unite:'L',empl:'Maintenance',fds:true,exp:'25/07/2026',etat:'Stock bas',danger:'Irritant'},
    {id:'PC-004',prod:'Peinture industrielle',fam:'Peinture',qte:14,unite:'L',empl:'Atelier peinture',fds:false,exp:'30/05/2026',etat:'OK',danger:'Toxique / Inflammable'},
    {id:'PC-005',prod:'White spirit',fam:'Solvant',qte:7,unite:'L',empl:'Magasin chimique',fds:true,exp:'05/07/2026',etat:'OK',danger:'Inflammable'},
  ];
  if(!window.ENV_5S_DATA) window.ENV_5S_DATA=[
    {id:'AUD5S-001',zone:'Atelier Usinage',d:'16/05/2026',aud:'Ali Mohamed',t:4,r:3,n:4,s:2,m:3,score:16,niv:'Moyen',obs:'Zone de tri \u00e0 am\u00e9liorer'},
    {id:'AUD5S-002',zone:'Atelier Assemblage',d:'14/05/2026',aud:'Karim Sa\u00efd',t:5,r:4,n:4,s:4,m:4,score:21,niv:'Bon',obs:'Bonne organisation'},
    {id:'AUD5S-003',zone:'Magasin mati\u00e8res',d:'10/05/2026',aud:'Youssef Ahmed',t:3,r:2,n:2,s:3,m:2,score:12,niv:'Faible',obs:'Nettoyage insuffisant'},
    {id:'AUD5S-004',zone:'Zone Peinture',d:'10/05/2026',aud:'Ahmed Samir',t:3,r:3,n:4,s:4,m:3,score:17,niv:'Moyen',obs:'Standardisation en cours'},
  ];
  if(!window.ENV_URGENCES_DATA) window.ENV_URGENCES_DATA=[
    {id:'URG-001',type:'Fuite huile',zone:'Atelier usinage',sit:'D\u00e9versement huile machine',niv:'\u00c9lev\u00e9',action:'D\u00e9ployer absorbants, neutraliser',resp:'Ali Mohamed',equip:'Kit absorbants',s:'Actif'},
    {id:'URG-002',type:'Incendie chimique',zone:'Magasin chimique',sit:'Incendie solvants',niv:'Tr\u00e8s \u00e9lev\u00e9',action:'Extincteur CO2, \u00e9vacuation',resp:'HSE',equip:'Extincteur CO2',s:'Actif'},
    {id:'URG-003',type:'Pollution eau',zone:'Zone peinture',sit:'Ruissellement peinture',niv:'\u00c9lev\u00e9',action:'Barrage anti-pollution',resp:'KORTAS.A',equip:'Barrage + kit neutralisation',s:'Actif'},
    {id:'URG-004',type:'Fuite produit chimique',zone:'Maintenance',sit:'Fuite acide dilu\u00e9',niv:'Moyen',action:'EPI complet, kit absorption',resp:'KORTAS.A',equip:'Kit neutralisation acide',s:'Actif'},
  ];
  return null;
})(),

'env-dash': () => {
  if(!window.ENV_ASPECTS_DATA) PAGES['_envInit'];
  const nc5s = window.ENV_5S_DATA||[];
  const avg5s = nc5s.length ? Math.round(nc5s.reduce((s,a)=>s+a.score,0)/nc5s.length) : 0;
  const mois=[['Jan',280,145,380],['F\u00e9v',295,152,392],['Mar',270,138,368],['Avr',310,160,415],['Mai',298,152,405]];
  const maxEl=320, maxEau=175, maxAir=430;
  const decPts=[['M\u00e9talliques',45,'#64748b'],['Huiles usag\u00e9es',15,'#0284c7'],['Cartons',15,'#f59e0b'],['Plastiques',10,'#06b6d4'],['Dangereux',15,'#dc2626']];
  return `
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin-bottom:14px">
    ${[['♻','Déchets valorisés','12,45 t','↑ 8%','#16a34a','#f0fdf4'],['💧','Eau','152 m³','↓ 6%','#0284c7','#eff6ff'],['⚡','Électricité','25 430 kWh','↓ 3%','#7c3aed','#f5f3ff'],['🌿','Conformité','92%','≥ 90%','#16a34a','#f0fdf4'],['⭐','Score 5S',avg5s+'/25','Obj. 20/25','#f59e0b','#fffbeb']].map(([ic,l,v,sub,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c}"></div>
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:7px"><span style="font-size:16px">${ic}</span><span style="font-size:9.5px;color:${c};font-weight:700;text-transform:uppercase">${l}</span></div>
      <div style="font-size:23px;font-weight:800;color:${c};line-height:1">${v}</div>
      <div style="font-size:9.5px;color:${c};opacity:.7;margin-top:3px">${sub}</div>
    </div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px;margin-bottom:13px">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">📈 Évolution des consommations — 2026</span><button onclick="goPage('env-conso')" class="btn bsm">Détail →</button></div>
      <div style="position:relative;height:110px;padding:4px 4px 20px">
        <div style="position:absolute;inset:4px 4px 20px">
          ${[0,25,50,75,100].map(p=>`<div style="position:absolute;left:0;right:0;bottom:${p}%;border-top:1px dashed #f1f5f9"></div>`).join('')}
        </div>
        <div style="display:flex;align-items:flex-end;gap:5px;height:100%;position:relative;z-index:1">
          ${mois.map(([m,el,eau,air])=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="display:flex;align-items:flex-end;gap:2px;height:90px">
              <div style="width:9px;height:${el/maxEl*84}px;background:#7c3aed;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:9px;height:${eau/maxEau*60}px;background:#0284c7;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:9px;height:${air/maxAir*84}px;background:#16a34a;border-radius:3px 3px 0 0;opacity:.85"></div>
            </div>
            <div style="font-size:8px;color:#94a3b8">${m}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;font-size:9px">
        ${[['Élec','#7c3aed'],['Eau','#0284c7'],['Air','#16a34a']].map(([l,c])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:9px;height:9px;background:${c};border-radius:2px"></div>${l}</div>`).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🥧 Répartition des déchets — 12,45 t</div>
      <div style="display:flex;align-items:center;gap:12px;justify-content:center">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="31" fill="none" stroke="#f1f5f9" stroke-width="12"/>
          ${(()=>{let o=0.25;return decPts.map(([l,p,c])=>{const f=p/100,a=`<circle cx="44" cy="44" r="31" fill="none" stroke="${c}" stroke-width="12" stroke-dasharray="${2*Math.PI*31*f} ${2*Math.PI*31}" stroke-dashoffset="${-2*Math.PI*31*(o-0.25)}"/>`;o+=f;return a;}).join('');})()}
          <text x="44" y="41" text-anchor="middle" font-size="9" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">78%</text>
          <text x="44" y="51" text-anchor="middle" font-size="7" fill="#94a3b8" font-family="Inter,sans-serif">valorisé</text>
        </svg>
        <div style="flex:1;display:flex;flex-direction:column;gap:4px">
          ${decPts.map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:5px"><div style="width:7px;height:7px;border-radius:50%;background:${c}"></div><span style="font-size:9.5px;flex:1;color:#64748b">${l}</span><span style="font-size:9.5px;font-weight:700;color:${c}">${v}%</span></div>`).join('')}
        </div>
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">⭐ Audits 5S récents</span><button onclick="goPage('env-5s')" class="btn bsm">Voir tous →</button></div>
      <table class="tbl"><thead><tr><th>Zone</th><th>Date</th><th>Score</th><th>Niveau</th><th>Auditeur</th></tr></thead><tbody>
        ${nc5s.map(a=>`<tr>
          <td style="font-weight:600;font-size:11px">${a.zone}</td>
          <td style="font-size:10px;color:#94a3b8">${a.d}</td>
          <td><span style="font-weight:800;color:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'}">${a.score}/25</span></td>
          <td><span class="badge ${a.score>=18?'bg3':a.score>=12?'by':'br'}" style="font-size:8.5px">${a.score>=18?'🟢 Bon':a.score>=12?'🟡 Moyen':'🔴 Faible'}</span></td>
          <td style="font-size:10px">${a.aud}</td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">🎯 Actions environnementales</span><button onclick="goPage('env-actions')" class="btn bsm">Voir toutes →</button></div>
      <table class="tbl"><thead><tr><th>Action</th><th>Resp.</th><th>Statut</th></tr></thead><tbody>
        ${(window.ENV_ACTIONS||[]).slice(0,5).map(a=>`<tr>
          <td style="font-size:10.5px;font-weight:500;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.action}</td>
          <td style="font-size:10px">${a.resp}</td>
          <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':a.statut==='En retard'?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>`;
},

'env-aspects': () => {
  const D = window.ENV_ASPECTS_DATA||[];
  const fNiv=window.aspFNiv||'Tous', fAct=window.aspFAct||'Tous', fQ=window.aspFQ||'';
  const acts=[...new Set(D.map(a=>a.activite))];
  const F=D.filter(a=>{
    if(fNiv!=='Tous'&&a.niv!==fNiv) return false;
    if(fAct!=='Tous'&&a.activite!==fAct) return false;
    if(fQ&&![a.aspect,a.activite,a.impact,a.id].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const elv=D.filter(a=>a.niv==='Élevé').length, moy=D.filter(a=>a.niv==='Moyen').length, fai=D.filter(a=>a.niv==='Faible').length;
  const nivBadge=n=>`<span class="badge ${n==='Élevé'?'br':n==='Moyen'?'by':'bg3'}" style="font-size:8.5px">${n}</span>`;
  return `
  <div style="display:grid;grid-template-columns:repeat(3,1fr) 2fr;gap:10px;margin-bottom:13px">
    ${[['🔴 Élevé',elv,'#dc2626','#fef2f2'],['🟡 Moyen',moy,'#f59e0b','#fffbeb'],['🟢 Faible',fai,'#16a34a','#f0fdf4']].map(([l,v,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;text-align:center">
      <div style="font-size:26px;font-weight:800;color:${c};line-height:1;margin-bottom:3px">${v}</div>
      <div style="font-size:10px;font-weight:700;color:${c}">${l}</div>
    </div>`).join('')}
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:12px;display:flex;align-items:center;gap:12px">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f1f5f9" stroke-width="8"/>
        <circle cx="26" cy="26" r="20" fill="none" stroke="#dc2626" stroke-width="8" stroke-dasharray="${2*Math.PI*20*elv/Math.max(D.length,1)} ${2*Math.PI*20}" stroke-dashoffset="${2*Math.PI*20*0.25}" stroke-linecap="round"/>
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f59e0b" stroke-width="8" stroke-dasharray="${2*Math.PI*20*moy/Math.max(D.length,1)} ${2*Math.PI*20}" stroke-dashoffset="${-2*Math.PI*20*(elv/Math.max(D.length,1)-0.25)}" stroke-linecap="round"/>
        <circle cx="26" cy="26" r="20" fill="none" stroke="#16a34a" stroke-width="8" stroke-dasharray="${2*Math.PI*20*fai/Math.max(D.length,1)} ${2*Math.PI*20}" stroke-dashoffset="${-2*Math.PI*20*((elv+moy)/Math.max(D.length,1)-0.25)}" stroke-linecap="round"/>
        <text x="26" y="30" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${D.length}</text>
      </svg>
      <div style="flex:1">
        ${[['Élevé',elv,'#dc2626'],['Moyen',moy,'#f59e0b'],['Faible',fai,'#16a34a']].map(([l,v,c])=>`
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:5px">
          <div style="width:8px;height:8px;border-radius:50%;background:${c};flex-shrink:0"></div>
          <span style="font-size:10px;color:#64748b;flex:1">${l}</span>
          <div style="width:70px;height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${D.length?Math.round(v/D.length*100):0}%;background:${c};border-radius:3px"></div></div>
          <span style="font-size:10px;font-weight:700;color:${c};min-width:14px">${v}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#16a34a':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1;min-width:200px">
        <span style="color:#94a3b8">🔍</span>
        <input placeholder="Rechercher aspect, activité, impact…" value="${fQ}"
          oninput="window.aspFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-aspects']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.aspFQ='';document.getElementById('content').innerHTML=PAGES['env-aspects']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.aspFAct=this.value;document.getElementById('content').innerHTML=PAGES['env-aspects']()">
        <option value="Tous">🏭 Activité : Toutes</option>${acts.map(a=>`<option${a===fAct?' selected':''}>${a}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.aspFNiv=this.value;document.getElementById('content').innerHTML=PAGES['env-aspects']()">
        <option value="Tous">⚠ Niveau : Tous</option>${['Élevé','Moyen','Faible'].map(n=>`<option${n===fNiv?' selected':''}>${n}</option>`).join('')}
      </select>
      ${(fQ||fNiv!=='Tous'||fAct!=='Tous')?`<button onclick="window.aspFQ='';window.aspFNiv='Tous';window.aspFAct='Tous';document.getElementById('content').innerHTML=PAGES['env-aspects']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Effacer</button>`:''}
      <span style="font-size:10px;color:#94a3b8">${F.length}/${D.length}</span>
      <button onclick="envAddAspect()" style="background:linear-gradient(135deg,#064e3b,#16a34a);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto;box-shadow:0 2px 8px rgba(22,163,74,.3)">+ Nouvel aspect</button>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)"><div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
      <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
        ${['ID','Activité','Aspect env.','Impact potentiel','Gravité','Fréq.','Criticité','Niveau','Statut','Action',''].map(h=>`<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${F.map(a=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
        <td style="font-weight:700;font-size:10px;color:#16a34a;font-family:monospace">${a.id}</td>
        <td style="font-weight:600;font-size:11px">${a.activite}</td>
        <td style="font-size:11px">${a.aspect}</td>
        <td style="font-size:10.5px;color:#64748b;max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.impact}</td>
        <td>${nivBadge(a.g)}</td>
        <td style="text-align:center;font-weight:700;font-size:13px">${a.freq}</td>
        <td style="text-align:center"><span style="font-size:14px;font-weight:800;color:${a.crit>=10?'#dc2626':a.crit>=7?'#f59e0b':'#16a34a'}">${a.crit}</span></td>
        <td>${nivBadge(a.niv)}</td>
        <td><span class="badge bg3" style="font-size:8.5px">${a.s}</span></td>
        <td style="font-size:10px;color:#64748b;max-width:130px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.action}</td>
        <td><button onclick="envEditAspect('${a.id}')" class="btn bsm">✏</button></td>
      </tr>`).join('')}</tbody>
    </table>
  </div></div>`;
},

'env-dechets': () => {
  const D = window.ENV_DECHETS_DATA||[];
  const fType=window.decFType||'Tous', fStat=window.decFStat||'Tous', fQ=window.decFQ||'';
  const types=[...new Set(D.map(d=>d.type))];
  const F=D.filter(d=>{
    if(fType!=='Tous'&&d.type!==fType) return false;
    if(fStat!=='Tous'&&d.s!==fStat) return false;
    if(fQ&&![d.id,d.type,d.desc,d.zone,d.presta].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const totalKg=D.reduce((s,d)=>s+(d.unite==='kg'?d.qte:d.qte*0.85),0);
  const valorKg=D.filter(d=>d.s==='Enlevé').reduce((s,d)=>s+(d.unite==='kg'?d.qte:d.qte*0.85),0);
  const tc={'Métalliques':'#64748b','Huiles usagées':'#0284c7','Cartons':'#f59e0b','Plastiques':'#06b6d4','Dangereux':'#dc2626'};
  const nonConf=D.filter(d=>d.s==='Non conforme').length;
  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[['♻','Total déchets',totalKg.toFixed(0)+' kg','#64748b','#f8fafc','Cumul ce mois'],['✅','Valorisés',valorKg.toFixed(0)+' kg','#16a34a','#f0fdf4','Recyclés / enlevés'],['📊','Taux recyclage',Math.round(valorKg/Math.max(totalKg,1)*100)+'%','#0284c7','#eff6ff','Objectif ≥ 80%'],['⚠','Non conformes',nonConf,'#dc2626','#fef2f2','Action requise']].map(([ic,l,v,c,bg,sub])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:10px;font-weight:600;color:${c};opacity:.8;margin-top:1px">${l}</div><div style="font-size:9px;color:#94a3b8">${sub}</div></div>
    </div>`).join('')}
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#f59e0b':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1">
        <span style="color:#94a3b8">🔍</span>
        <input placeholder="Rechercher type, zone, prestataire…" value="${fQ}"
          oninput="window.decFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-dechets']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.decFQ='';document.getElementById('content').innerHTML=PAGES['env-dechets']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.decFType=this.value;document.getElementById('content').innerHTML=PAGES['env-dechets']()">
        <option value="Tous">♻ Type : Tous</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.decFStat=this.value;document.getElementById('content').innerHTML=PAGES['env-dechets']()">
        <option value="Tous">📋 Statut : Tous</option>${['Enlevé','En attente','Non conforme'].map(s=>`<option${s===fStat?' selected':''}>${s}</option>`).join('')}
      </select>
      ${(fQ||fType!=='Tous'||fStat!=='Tous')?`<button onclick="window.decFQ='';window.decFType='Tous';window.decFStat='Tous';document.getElementById('content').innerHTML=PAGES['env-dechets']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕</button>`:''}
      <span style="font-size:10px;color:#94a3b8">${F.length}/${D.length}</span>
      <button onclick="envAddDechet()" style="background:linear-gradient(135deg,#92400e,#f59e0b);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto">+ Nouveau déchet</button>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)"><div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
      <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
        ${['ID','Date','Type','Description','Quantité','Zone','Stockage','Enlèvement','Prestataire','Statut',''].map(h=>`<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${F.map(d=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
        <td style="font-weight:700;font-size:10px;color:#f59e0b;font-family:monospace">${d.id}</td>
        <td style="font-size:10px;color:#94a3b8">${d.d}</td>
        <td><span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:${(tc[d.type]||'#94a3b8')+'22'};color:${tc[d.type]||'#94a3b8'};border:1px solid ${(tc[d.type]||'#94a3b8')+'44'}">${d.type}</span></td>
        <td style="font-size:10.5px">${d.desc}</td>
        <td style="font-weight:700;font-family:monospace;font-size:11px">${d.qte} ${d.unite}</td>
        <td style="font-size:10px">${d.zone}</td>
        <td style="text-align:center;font-size:15px">${d.stockOk?'<span style="color:#16a34a">✓</span>':'<span style="color:#dc2626">✗</span>'}</td>
        <td style="font-size:10px;color:#94a3b8">${d.enlev}</td>
        <td style="font-size:10px">${d.presta}</td>
        <td><span class="badge ${d.s==='Enlevé'?'bg3':d.s==='En attente'?'by':'br'}" style="font-size:8.5px">${d.s}</span></td>
        <td><button onclick="envEditDechet('${d.id}')" class="btn bsm">✏</button></td>
      </tr>`).join('')}</tbody>
    </table>
  </div></div>`;
},

'env-conso': () => {
  if(!window.consoPer) window.consoPer='mensuel';
  const per=window.consoPer;
  const mD=[{m:'Mai 2026',el:25430,eau:152,air:4200,carb:400},{m:'Avr 2026',el:26100,eau:160,air:4350,carb:412},{m:'Mar 2026',el:24800,eau:148,air:4100,carb:395},{m:'Fév 2026',el:27000,eau:162,air:4400,carb:425},{m:'Jan 2026',el:25900,eau:155,air:4250,carb:408}];
  const c=mD[0], p=mD[1];
  const ev=(cv,pv)=>{const e=((cv-pv)/pv*100).toFixed(1);return{e,up:parseFloat(e)>0};};
  const eEl=ev(c.el,p.el), eEau=ev(c.eau,p.eau), eAir=ev(c.air,p.air), eCarb=ev(c.carb,p.carb);
  return `
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:13px;flex-wrap:wrap;gap:8px">
    <div><div style="font-size:14px;font-weight:700;color:#0f172a">⚡ Suivi des consommations</div><div style="font-size:10px;color:#94a3b8;margin-top:2px">Électricité · Eau · Air comprimé · Carburant — ISO 14001</div></div>
    <div style="display:flex;gap:6px">
      <div style="display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        ${['mensuel','trimestriel','annuel'].map(pp=>`<button onclick="window.consoPer='${pp}';document.getElementById('content').innerHTML=PAGES['env-conso']()" style="padding:5px 12px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${'${pp}'===per?'#16a34a':'transparent'};color:${'${pp}'===per?'#fff':'#94a3b8'};transition:.15s">${pp.charAt(0).toUpperCase()+pp.slice(1)}</button>`).join('')}
      </div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[[c.el,'kWh','Électricité','#7c3aed','#f5f3ff','⚡',eEl,24000,'kWh'],[c.eau,'m³','Eau','#0284c7','#eff6ff','💧',eEau,140,'m³'],[c.air,'m³','Air comprimé','#16a34a','#f0fdf4','💨',eAir,4000,'m³'],[c.carb,'L','Carburant','#f59e0b','#fffbeb','⛽',eCarb,380,'L']].map(([v,u,l,col,bg,ic,e,obj,ou])=>`
    <div style="background:${bg};border:1px solid ${col}33;border-radius:11px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${col}"></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:7px"><span style="font-size:18px">${ic}</span><span style="font-size:9.5px;font-weight:700;color:${e.up?'#dc2626':'#16a34a'}">${e.up?'↑':'↓'} ${Math.abs(e.e)}%</span></div>
      <div style="font-size:22px;font-weight:800;color:${col};line-height:1">${v.toLocaleString('fr')}</div>
      <div style="font-size:10px;color:${col};opacity:.7;margin:2px 0 6px">${u} · ${l}</div>
      <div style="font-size:9px;color:#94a3b8">Obj : ${obj.toLocaleString('fr')} ${ou}</div>
      <div style="height:4px;background:${col}22;border-radius:3px;overflow:hidden;margin-top:6px"><div style="height:100%;width:${Math.min(v/obj*100,100)}%;background:${v<=obj?col:'#dc2626'};border-radius:3px"></div></div>
      <div style="font-size:9px;font-weight:600;color:${v<=obj?col:'#dc2626'};margin-top:4px">${v<=obj?'✓ Objectif atteint':'✗ +'+(v-obj).toLocaleString('fr')+' '+ou+' dépassement'}</div>
    </div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:12px">
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:14px">📈 Évolution — 5 derniers mois</div>
      <div style="position:relative;height:120px;padding:0 4px 20px">
        <div style="position:absolute;inset:0 4px 20px 0">${[0,25,50,75,100].map(pp=>`<div style="position:absolute;left:0;right:0;bottom:${pp}%;border-top:1px dashed #f1f5f9"></div>`).join('')}</div>
        <div style="display:flex;align-items:flex-end;gap:6px;height:100%;position:relative;z-index:1">
          ${[...mD].reverse().map(d=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="display:flex;align-items:flex-end;gap:2px;height:100px">
              <div style="width:10px;height:${d.el/27000*90}px;background:#7c3aed;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:10px;height:${d.eau/175*60}px;background:#0284c7;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:10px;height:${d.air/4500*90}px;background:#16a34a;border-radius:3px 3px 0 0;opacity:.85"></div>
              <div style="width:10px;height:${d.carb/430*80}px;background:#f59e0b;border-radius:3px 3px 0 0;opacity:.85"></div>
            </div>
            <div style="font-size:8px;color:#94a3b8">${d.m.slice(0,3)}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:12px;justify-content:center;font-size:9px;margin-top:4px">
        ${[['Élec','#7c3aed'],['Eau','#0284c7'],['Air','#16a34a'],['Carburant','#f59e0b']].map(([l,col])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:9px;height:9px;background:${col};border-radius:2px"></div>${l}</div>`).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">📊 Comparaison mois/mois</div>
      <table class="tbl"><thead><tr><th>Type</th><th>Ce mois</th><th>Préc.</th><th>Évol.</th></tr></thead><tbody>
        ${[[c.el,p.el,'Élec. (kWh)','#7c3aed'],[c.eau,p.eau,'Eau (m³)','#0284c7'],[c.air,p.air,'Air (m³)','#16a34a'],[c.carb,p.carb,'Carb. (L)','#f59e0b']].map(([cv,pv,l,col])=>{
          const e=((cv-pv)/pv*100).toFixed(1);
          return `<tr><td style="font-size:10.5px;font-weight:600">${l}</td>
            <td style="font-weight:700;color:${col};font-family:monospace">${cv.toLocaleString('fr')}</td>
            <td style="color:#94a3b8;font-size:10px;font-family:monospace">${pv.toLocaleString('fr')}</td>
            <td><span style="font-size:10px;font-weight:700;color:${parseFloat(e)<0?'#16a34a':'#dc2626'}">${parseFloat(e)<0?'↓':'↑'} ${Math.abs(e)}%</span></td>
          </tr>`;
        }).join('')}
      </tbody></table>
      <div style="margin-top:10px;padding:9px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0;font-size:10px;color:#166534;font-weight:600">
        🎯 ${[[c.el,24000],[c.eau,140],[c.air,4000],[c.carb,380]].filter(([v,o])=>v<=o).length}/4 objectifs atteints ce mois
      </div>
    </div>
  </div>`;
},

'env-chimiques': () => {
  const D = window.ENV_CHIMIQUES_DATA||[];
  const fEtat=window.chimFEtat||'Tous', fFam=window.chimFFam||'Tous', fQ=window.chimFQ||'';
  const fams=[...new Set(D.map(d=>d.fam))];
  const selId=window.chimSelId||(D[0]&&D[0].id)||'';
  const F=D.filter(p=>{
    if(fEtat!=='Tous'&&p.etat!==fEtat) return false;
    if(fFam!=='Tous'&&p.fam!==fFam) return false;
    if(fQ&&![p.id,p.prod,p.fam,p.empl].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const sel=D.find(d=>d.id===selId)||D[0];
  const etats={OK:'bg3',Périmé:'br','Stock bas':'by'};
  const pictos={Solvant:'🧪',Lubrifiant:'🛢',Nettoyant:'🧴',Peinture:'🎨'};
  return `
  <div style="display:grid;grid-template-columns:1.6fr 1fr;gap:12px">
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
          <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#dc2626':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1">
            <span style="color:#94a3b8">🔍</span>
            <input placeholder="Rechercher produit, famille…" value="${fQ}"
              oninput="window.chimFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-chimiques']()"
              style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
            ${fQ?`<button onclick="window.chimFQ='';document.getElementById('content').innerHTML=PAGES['env-chimiques']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
          </div>
          <select class="sel" onchange="window.chimFFam=this.value;document.getElementById('content').innerHTML=PAGES['env-chimiques']()">
            <option value="Tous">🏷 Famille</option>${fams.map(f=>`<option${f===fFam?' selected':''}>${f}</option>`).join('')}
          </select>
          <select class="sel" onchange="window.chimFEtat=this.value;document.getElementById('content').innerHTML=PAGES['env-chimiques']()">
            <option value="Tous">📋 État</option>${['OK','Périmé','Stock bas'].map(e=>`<option${e===fEtat?' selected':''}>${e}</option>`).join('')}
          </select>
          ${(fQ||fFam!=='Tous'||fEtat!=='Tous')?`<button onclick="window.chimFQ='';window.chimFFam='Tous';window.chimFEtat='Tous';document.getElementById('content').innerHTML=PAGES['env-chimiques']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕</button>`:''}
          <button onclick="envAddChimique()" style="background:linear-gradient(135deg,#7f1d1d,#dc2626);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto">+ Nouveau produit</button>
        </div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
          <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
            ${['ID','Produit','Famille','Qté','Emplacement','FDS','Expir.','État',''].map(h=>`<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
          </tr></thead>
          <tbody>${F.map(p=>`<tr onclick="window.chimSelId='${p.id}';document.getElementById('content').innerHTML=PAGES['env-chimiques']()" style="cursor:pointer;background:${p.id===selId?'#f0fdf4':''}" onmouseover="if('${p.id}'!==window.chimSelId)this.style.background='#f8fafc'" onmouseout="if('${p.id}'!==window.chimSelId)this.style.background=''">
            <td style="font-weight:700;font-size:10px;color:#dc2626;font-family:monospace">${p.id}</td>
            <td><div style="display:flex;align-items:center;gap:6px"><span style="font-size:14px">${pictos[p.fam]||'⚗'}</span><span style="font-weight:600;font-size:11px">${p.prod}</span></div></td>
            <td style="font-size:10px;color:#64748b">${p.fam}</td>
            <td style="font-weight:700;font-family:monospace">${p.qte} ${p.unite}</td>
            <td style="font-size:10px">${p.empl}</td>
            <td style="text-align:center;font-size:14px">${p.fds?'<span style="color:#16a34a">✓</span>':'<span style="color:#dc2626">✗</span>'}</td>
            <td style="font-size:10px;color:${p.etat==='Périmé'?'#dc2626':'#94a3b8'};font-weight:${p.etat==='Périmé'?700:400}">${p.exp}</td>
            <td><span class="badge ${etats[p.etat]||'bgr'}" style="font-size:8.5px">${p.etat}</span></td>
            <td><button onclick="event.stopPropagation();envEditChimique('${p.id}')" class="btn bsm">✏</button></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
    </div>
    ${sel?`<div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
      <div style="font-size:11px;font-weight:700;color:#0f172a;margin-bottom:12px">🔬 Fiche produit — ${sel.prod}</div>
      <div style="background:linear-gradient(135deg,#fef2f2,#fff7ed);border:1px solid #fecaca;border-radius:10px;padding:16px;text-align:center;margin-bottom:12px">
        <div style="font-size:32px;margin-bottom:8px">${pictos[sel.fam]||'⚗'}</div>
        <div style="font-size:14px;font-weight:700;color:#0f172a">${sel.prod}</div>
        <div style="font-size:10px;color:#64748b;margin-top:2px">${sel.fam} · ${sel.id}</div>
        <div style="display:flex;justify-content:center;gap:8px;margin-top:10px;font-size:22px">🔥⚠💀</div>
        <div style="font-size:9px;color:#94a3b8;margin-top:4px">${sel.danger||'Voir FDS'}</div>
      </div>
      ${[['Famille',sel.fam],['Stock actuel',sel.qte+' '+sel.unite],['Zone stockage',sel.empl],['FDS',sel.fds?'✓ Disponible':'✗ Manquante'],['Expiration',sel.exp],['État',sel.etat]].map(([k,v])=>`
      <div style="display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid #f1f5f9">
        <span style="font-size:10px;color:#64748b;font-weight:600">${k}</span>
        <span style="font-size:11px;font-weight:700;color:${v.includes('✗')?'#dc2626':v.includes('✓')?'#16a34a':'#0f172a'}">${v}</span>
      </div>`).join('')}
      <div style="display:flex;gap:6px;margin-top:12px">
        <button class="btn" style="flex:1;font-size:10px">📄 Voir FDS</button>
        <button onclick="envEditChimique('${sel.id}')" class="btn bp" style="flex:1;font-size:10px">✏ Modifier</button>
      </div>
    </div>`:'<div class="card">Sélectionnez un produit</div>'}
  </div>`;
},

'env-5s': () => {
  const D = window.ENV_5S_DATA||[];
  const fQ=window.s5FQ||'', fNiv=window.s5FNiv||'Tous';
  const F=D.filter(a=>{
    if(fNiv!=='Tous'&&a.niv!==fNiv) return false;
    if(fQ&&![a.zone,a.aud,a.id].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const avg=D.length?Math.round(D.reduce((s,a)=>s+a.score,0)/D.length):0;
  const bon=D.filter(a=>a.niv==='Bon').length, moy=D.filter(a=>a.niv==='Moyen').length, fai=D.filter(a=>a.niv==='Faible').length;
  return `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[['Score moyen',avg+'/25','#f59e0b','#fffbeb','⭐'],['Bon ≥18',bon,'#16a34a','#f0fdf4','🟢'],['Moyen 12-17',moy,'#f59e0b','#fffbeb','🟡'],['Faible <12',fai,'#dc2626','#fef2f2','🔴']].map(([l,v,c,bg,ic])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:10px;font-weight:600;color:${c};opacity:.8;margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#f59e0b':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1">
        <span style="color:#94a3b8">🔍</span>
        <input placeholder="Rechercher zone, auditeur…" value="${fQ}"
          oninput="window.s5FQ=this.value;document.getElementById('content').innerHTML=PAGES['env-5s']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.s5FQ='';document.getElementById('content').innerHTML=PAGES['env-5s']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.s5FNiv=this.value;document.getElementById('content').innerHTML=PAGES['env-5s']()">
        <option value="Tous">⭐ Niveau</option>${['Bon','Moyen','Faible'].map(n=>`<option${n===fNiv?' selected':''}>${n}</option>`).join('')}
      </select>
      ${(fQ||fNiv!=='Tous')?`<button onclick="window.s5FQ='';window.s5FNiv='Tous';document.getElementById('content').innerHTML=PAGES['env-5s']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕</button>`:''}
      <span style="font-size:10px;color:#94a3b8">${F.length}/${D.length}</span>
      <button onclick="envAdd5S()" style="background:linear-gradient(135deg,#064e3b,#16a34a);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;margin-left:auto">+ Nouvel audit</button>
    </div>
  </div>
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)"><div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
      <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
        ${['ID','Zone / Atelier','Date','Auditeur','🗑 S1','📦 S2','🧹 S3','📋 S4','🔄 S5','Score /25','Niveau','Obs.',''].map(h=>`<th style="padding:8px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:center;white-space:nowrap;text-transform:uppercase;letter-spacing:.03em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${F.map(a=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
        <td style="font-weight:700;font-size:10px;color:#f59e0b;font-family:monospace;text-align:center">${a.id}</td>
        <td style="font-weight:600;font-size:11px;text-align:left">${a.zone}</td>
        <td style="font-size:10px;color:#94a3b8;text-align:center">${a.d}</td>
        <td style="font-size:10px;text-align:center">${a.aud}</td>
        ${[a.t,a.r,a.n,a.s,a.m].map(v=>`<td style="text-align:center"><span style="font-weight:700;font-size:12px;color:${v>=4?'#16a34a':v>=3?'#f59e0b':'#dc2626'}">${v}/5</span></td>`).join('')}
        <td style="text-align:center">
          <div style="display:inline-flex;align-items:center;gap:6px">
            <div style="width:38px;height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${a.score/25*100}%;background:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'};border-radius:3px"></div></div>
            <span style="font-weight:800;font-size:13px;color:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'}">${a.score}</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge ${a.niv==='Bon'?'bg3':a.niv==='Moyen'?'by':'br'}" style="font-size:8.5px">${a.niv==='Bon'?'🟢':a.niv==='Moyen'?'🟡':'🔴'} ${a.niv}</span></td>
        <td style="font-size:10px;color:#94a3b8;max-width:110px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;text-align:left" title="${a.obs||''}">${a.obs||'—'}</td>
        <td style="text-align:center"><button onclick="envEdit5S('${a.id}')" class="btn bsm">✏</button></td>
      </tr>`).join('')}</tbody>
    </table>
  </div></div>`;
},

'env-urgences': () => {
  const D = window.ENV_URGENCES_DATA||[];
  const fQ=window.urgFQ||'', fNiv=window.urgFNiv||'Tous';
  const F=D.filter(u=>{
    if(fNiv!=='Tous'&&u.niv!==fNiv) return false;
    if(fQ&&![u.type,u.zone,u.sit,u.resp].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });
  const eq=[{nom:'Kit absorbants',qte:8,loc:'Atelier usinage',dispo:true},{nom:'Extincteur CO2',qte:12,loc:'Magasin chimique',dispo:true},{nom:'Barrage anti-pollution',qte:3,loc:'Zone peinture',dispo:true},{nom:'Douche de sécurité',qte:2,loc:'Maintenance',dispo:true}];
  const ct=[{nom:'Ali Mohamed',role:'Responsable HSE',tel:'06 12 34 56 78',c:'#dc2626'},{nom:'Chef maintenance',role:'Maintenance',tel:'06 98 76 54 32',c:'#ea580c'},{nom:'Dr. Nadia',role:'Médecin du travail',tel:'06 55 23 11 22',c:'#16a34a'},{nom:'Youssef Ahmed',role:'Responsable sécurité',tel:'06 32 21 11 00',c:'#0284c7'}];
  const nivBadge=n=>`<span class="badge ${n==='Très élevé'||n==='Élevé'?'br':n==='Moyen'?'by':'bg3'}" style="font-size:8.5px">${n}</span>`;
  return `
  <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:12px">
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="display:flex;gap:8px;align-items:center">
          <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#dc2626':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1">
            <span style="color:#94a3b8">🔍</span>
            <input placeholder="Rechercher type, zone…" value="${fQ}"
              oninput="window.urgFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-urgences']()"
              style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
            ${fQ?`<button onclick="window.urgFQ='';document.getElementById('content').innerHTML=PAGES['env-urgences']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
          </div>
          <select class="sel" onchange="window.urgFNiv=this.value;document.getElementById('content').innerHTML=PAGES['env-urgences']()">
            <option value="Tous">⚠ Niveau</option>${['Très élevé','Élevé','Moyen','Faible'].map(n=>`<option${n===fNiv?' selected':''}>${n}</option>`).join('')}
          </select>
          <button onclick="envAddUrgence()" style="background:linear-gradient(135deg,#7f1d1d,#dc2626);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif">+ Nouvelle situation</button>
        </div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:12px;font-weight:700;color:#0f172a">🚨 Situations d'urgence recensées</div>
        <div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
          <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
            ${['ID','Type','Zone','Situation','Niveau','Action immédiate','Responsable',''].map(h=>`<th style="padding:8px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
          </tr></thead>
          <tbody>${F.map(u=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
            <td style="font-weight:700;font-size:10px;color:#dc2626;font-family:monospace">${u.id}</td>
            <td style="font-weight:600;font-size:11px">${u.type}</td>
            <td style="font-size:10px;color:#64748b">${u.zone}</td>
            <td style="font-size:10.5px;max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${u.sit}">${u.sit}</td>
            <td>${nivBadge(u.niv)}</td>
            <td style="font-size:10px;color:#64748b;max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis" title="${u.action}">${u.action}</td>
            <td style="font-size:10px">${u.resp}</td>
            <td><button onclick="envEditUrgence('${u.id}')" class="btn bsm">✏</button></td>
          </tr>`).join('')}</tbody>
        </table></div>
      </div>
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="padding:12px 16px;border-bottom:1px solid #f1f5f9;font-size:12px;font-weight:700;color:#0f172a">🧰 Équipements d'urgence</div>
        <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif"><thead><tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0">
          ${['Équipement','Qté','Localisation','Disponibilité'].map(h=>`<th style="padding:8px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
        </tr></thead><tbody>${eq.map(e=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
          <td style="font-weight:600;font-size:11px">${e.nom}</td>
          <td style="font-weight:700;font-size:13px;text-align:center">${e.qte}</td>
          <td style="font-size:10px;color:#64748b">${e.loc}</td>
          <td><span class="badge bg3" style="font-size:8.5px">✓ Disponible</span></td>
        </tr>`).join('')}</tbody></table>
      </div>
    </div>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:16px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
        <div style="font-size:12px;font-weight:700;color:#0f172a;margin-bottom:12px">📞 Contacts d'urgence</div>
        ${ct.map(c=>`<div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid #f1f5f9">
          <div style="width:36px;height:36px;border-radius:50%;background:${c.c}22;border:2px solid ${c.c}44;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;color:${c.c};flex-shrink:0">${c.nom.charAt(0)}</div>
          <div style="flex:1"><div style="font-size:11.5px;font-weight:700;color:#0f172a">${c.nom}</div><div style="font-size:9.5px;color:#94a3b8">${c.role}</div></div>
          <a href="tel:${c.tel}" style="font-size:10px;font-weight:700;color:${c.c};text-decoration:none;background:${c.c}11;padding:5px 10px;border-radius:6px;border:1px solid ${c.c}33">${c.tel}</a>
        </div>`).join('')}
      </div>
      <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:11px;padding:14px">
        <div style="font-size:11px;font-weight:700;color:#991b1b;margin-bottom:10px">🚨 Numéros nationaux d'urgence</div>
        ${[['SAMU','15','#dc2626'],['Pompiers','18','#ea580c'],['Police','17','#1e40af'],['DREAL','0800 711 411','#16a34a']].map(([l,n,c])=>`
        <div style="display:flex;justify-content:space-between;align-items:center;padding:6px 0;border-bottom:1px solid #fecaca40">
          <span style="font-size:10px;color:#64748b;font-weight:600">${l}</span>
          <span style="font-size:13px;font-weight:800;color:${c};font-family:monospace">${n}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
},

'env-actions': () => {
  if(!window.envActView) window.envActView='kanban';
  const view = window.envActView;
  const fPrio = window.envActFPrio||'Tous';
  const fType = window.envActFType||'Tous';
  const fStat = window.envActFStat||'Tous';
  const fQ    = window.envActFQ||'';

  if(!window.ENV_ACTIONS) window.ENV_ACTIONS=[
    {id:1,action:'Installer bac rétention huile',origine:'Aspect ASP-001',resp:'HSE',fin:'20/05/26',statut:'En cours',prio:'Critique',prog:45,type:'Technique',desc:'Bac 200L zone usinage CN01-CN03'},
    {id:2,action:'Réduire consommation eau -10%',origine:'Consommations',resp:'Maintenance',fin:'25/05/26',statut:'En cours',prio:'Haute',prog:30,type:'Optimisation',desc:'Détection fuites + régulateurs pression'},
    {id:3,action:'Trier déchets dangereux',origine:'Déchet DEC-005',resp:'Logistique',fin:'25/05/26',statut:'À faire',prio:'Critique',prog:0,type:'Opérationnel',desc:'Mise en conformité stockage DIS 2025-003'},
    {id:4,action:'Optimiser tri déchets métalliques',origine:'Déchet DEC-001',resp:'Logistique',fin:'30/05/26',statut:'En cours',prio:'Normale',prog:60,type:'Opérationnel',desc:'Nouveau container trié par alliage'},
    {id:5,action:'Sensibilisation environnement',origine:'Plan ISO 14001',resp:'RH',fin:'30/05/26',statut:'À faire',prio:'Normale',prog:0,type:'Formation',desc:'Session 2h tous opérateurs juin 2026'},
    {id:6,action:'Audit fournisseur chimiques',origine:'Produit PC-002',resp:'KORTAS.A',fin:'15/04/26',statut:'En retard',prio:'Haute',prog:20,type:'Audit',desc:'Audit conformité fournisseur acétone'},
    {id:7,action:'MAJ plan urgence env.',origine:'Urgence URG-003',resp:'HSE',fin:'10/04/26',statut:'En retard',prio:'Haute',prog:15,type:'Documentation',desc:'Révision procédure fuite peinture'},
    {id:8,action:'Renouvellement FDS produits',origine:'Produit PC-004',resp:'KORTAS.A',fin:'28/02/26',statut:'Clôturée',prio:'Haute',prog:100,type:'Administratif',desc:'18 FDS mises à jour — SDS Manager'},
    {id:9,action:'Installer LED atelier usinage',origine:'Consommations',resp:'Maintenance',fin:'30/06/26',statut:'À faire',prio:'Normale',prog:0,type:'Technique',desc:'Remplacement éclairage 120 points lumineux'},
    {id:10,action:'Formation tri sélectif',origine:'Plan ISO 14001',resp:'RH',fin:'15/06/26',statut:'Clôturée',prio:'Normale',prog:100,type:'Formation',desc:'Formation tri + affichage zones'},
  ];

  const all = window.ENV_ACTIONS;
  const data = all.filter(a=>{
    if(fPrio!=='Tous'&&a.prio!==fPrio) return false;
    if(fType!=='Tous'&&a.type!==fType) return false;
    if(fStat!=='Tous'&&a.statut!==fStat) return false;
    if(fQ&&![a.action,a.origine,a.resp,a.desc].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });

  const total=all.length, done=all.filter(a=>a.statut==='Clôturée').length,
    enC=all.filter(a=>a.statut==='En cours').length,
    ret=all.filter(a=>a.statut==='En retard').length,
    af=all.filter(a=>a.statut==='À faire').length;
  const avgP=Math.round(all.reduce((s,a)=>s+a.prog,0)/Math.max(total,1));
  const pctD=Math.round(done/Math.max(total,1)*100);

  const types=[...new Set(all.map(a=>a.type))].sort();
  const TC={Technique:'#1e40af',Optimisation:'#7c3aed',Opérationnel:'#065f46',Formation:'#92400e',Audit:'#c2410c',Documentation:'#991b1b',Administratif:'#475569'};
  const TB={Technique:'#dbeafe',Optimisation:'#f5f3ff',Opérationnel:'#d1fae5',Formation:'#fef3c7',Audit:'#ffedd5',Documentation:'#fce7f3',Administratif:'#f1f5f9'};
  const typePill=t=>`<span style="padding:2px 8px;border-radius:20px;font-size:8.5px;font-weight:700;background:${TB[t]||'#f1f5f9'};color:${TC[t]||'#475569'}">${t}</span>`;
  const prioBadge=p=>`<span class="badge ${p==='Critique'?'br':p==='Haute'?'bo':'bgr'}" style="font-size:8px">${p}</span>`;
  const statCols={'Clôturée':'#16a34a','En cours':'#2563eb','En retard':'#dc2626','À faire':'#64748b'};
  const statBGs={'Clôturée':'#f0fdf4','En cours':'#eff6ff','En retard':'#fef2f2','À faire':'#f8fafc'};

  const progBar=(prog,id)=>`
    <div style="margin:7px 0">
      <div style="display:flex;justify-content:space-between;font-size:9px;color:#94a3b8;margin-bottom:3px">
        <span style="font-weight:600">Progression</span>
        <span style="font-weight:800;color:${prog===100?'#16a34a':prog>=60?'#f59e0b':'#94a3b8'}">${prog}%</span>
      </div>
      <div style="height:6px;background:#f1f5f9;border-radius:10px;overflow:hidden">
        <div style="height:100%;width:${prog}%;background:${prog===100?'#16a34a':prog>=60?'#f59e0b':'#3b82f6'};border-radius:10px;transition:.4s"></div>
      </div>
      <input type="range" min="0" max="100" value="${prog}"
        oninput="(()=>{const a=window.ENV_ACTIONS.find(x=>x.id===${id});if(a){a.prog=parseInt(this.value);if(parseInt(this.value)===100)a.statut='Clôturée';}document.getElementById('pv${id}').textContent=this.value+'%';const b=this.parentNode.querySelector('div+div div');if(b)b.style.width=this.value+'%';})()"
        onchange="document.getElementById('content').innerHTML=PAGES['env-actions']()"
        style="width:100%;margin-top:3px;accent-color:#16a34a;height:3px;cursor:pointer;opacity:.6">
    </div>`;

  const statBtn=(a,s)=>{
  const active=a.statut===s;
  const bc=statCols[s]||'#64748b';
  return `<button onclick="(()=>{const x=window.ENV_ACTIONS.find(z=>z.id===${a.id});if(x){x.statut='${s}';if('${s}'==='Clôturée')x.prog=100;}document.getElementById('content').innerHTML=PAGES['env-actions']();})()"
    style="font-size:8px;padding:2px 8px;border:1px solid ${active?bc:'#e2e8f0'};border-radius:20px;background:${active?bc:'#fff'};color:${active?'#fff':'#94a3b8'};cursor:pointer;font-family:'Inter',sans-serif;font-weight:${active?700:400};transition:.15s">${s==='À faire'?'⏳':s==='En cours'?'⚡':s==='En retard'?'🚨':'✅'} ${s}</button>`;
};

  const card=a=>`
  <div style="background:#fff;border:1.5px solid ${a.statut==='En retard'?'#fca5a5':'#e2e8f0'};border-left:3px solid ${a.prio==='Critique'?'#dc2626':a.prio==='Haute'?'#f59e0b':'#94a3b8'};border-radius:10px;padding:12px;margin-bottom:9px;box-shadow:0 1px 4px rgba(0,0,0,.05);transition:all .18s"
    onmouseover="this.style.boxShadow='0 6px 20px rgba(0,0,0,.10)';this.style.transform='translateY(-1px)'"
    onmouseout="this.style.boxShadow='0 1px 4px rgba(0,0,0,.05)';this.style.transform='none'">
    <div style="display:flex;gap:6px;margin-bottom:7px">
      <div style="flex:1">
        <div style="font-size:11.5px;font-weight:700;color:#0f172a;line-height:1.4;margin-bottom:2px">${a.action}</div>
        <div style="font-size:9.5px;color:#94a3b8">${a.desc}</div>
      </div>
      <div style="display:flex;gap:3px;flex-shrink:0">
        <button onclick="envEditEnvAction(${a.id})" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;padding:3px 7px;font-size:11px;color:#64748b" title="Modifier">✏</button>
        <button onclick="(()=>{if(!confirm('Supprimer cette action ?'))return;const i=window.ENV_ACTIONS.findIndex(x=>x.id===${a.id});if(i>=0)window.ENV_ACTIONS.splice(i,1);document.getElementById('content').innerHTML=PAGES['env-actions']();})()" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;cursor:pointer;padding:3px 7px;font-size:11px;color:#94a3b8" title="Supprimer">✕</button>
      </div>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
      ${typePill(a.type)} ${prioBadge(a.prio)}
      <span style="padding:2px 8px;border-radius:20px;font-size:8px;background:#f1f5f9;color:#64748b">📋 ${a.origine}</span>
    </div>
    ${progBar(a.prog,a.id)}
    <div style="display:flex;justify-content:space-between;font-size:9.5px;color:#94a3b8;margin:4px 0 8px">
      <div style="display:flex;align-items:center;gap:4px">
        <div style="width:18px;height:18px;border-radius:50%;background:#eff6ff;border:1.5px solid #bfdbfe;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;color:#1e40af">${a.resp.charAt(0)}</div>
        ${a.resp}
      </div>
      <span style="color:${a.statut==='En retard'?'#dc2626':'#94a3b8'};font-weight:${a.statut==='En retard'?700:400}">⏰ ${a.fin}${a.statut==='En retard'?' 🚨':''}</span>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:3px">
      ${['À faire','En cours','En retard','Clôturée'].map(s=>statBtn(a,s)).join('')}
    </div>
  </div>`;

  const row=a=>`<tr onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
    <td><div style="font-weight:700;font-size:11px;color:#0f172a;margin-bottom:2px">${a.action}</div><div style="font-size:9.5px;color:#94a3b8">${a.desc}</div></td>
    <td>${typePill(a.type)}</td>
    <td style="font-size:10px;color:#64748b">${a.origine}</td>
    <td style="font-size:10.5px">${a.resp}</td>
    <td style="font-size:10px;color:${a.statut==='En retard'?'#dc2626':'#94a3b8'};font-weight:${a.statut==='En retard'?700:400}">${a.fin}${a.statut==='En retard'?' 🚨':''}</td>
    <td><div style="display:flex;align-items:center;gap:6px">
      <div style="flex:1;height:5px;background:#f1f5f9;border-radius:5px;min-width:55px;overflow:hidden"><div style="height:100%;width:${a.prog}%;background:${a.prog===100?'#16a34a':a.prog>=60?'#f59e0b':'#3b82f6'};border-radius:5px"></div></div>
      <span style="font-size:10px;font-weight:700;color:${a.prog===100?'#16a34a':a.prog>=60?'#f59e0b':'#3b82f6'}">${a.prog}%</span>
    </div></td>
    <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':a.statut==='En retard'?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
    <td>${prioBadge(a.prio)}</td>
    <td><div style="display:flex;gap:3px">
      <button onclick="envEditEnvAction(${a.id})" class="btn bsm">✏</button>
      <select onchange="(()=>{const x=window.ENV_ACTIONS.find(z=>z.id===${a.id});if(x){x.statut=this.value;if(this.value==='Clôturée')x.prog=100;}document.getElementById('content').innerHTML=PAGES['env-actions']();})()" class="sel" style="font-size:10px;padding:3px 5px;max-width:100px">
        ${['À faire','En cours','En retard','Clôturée'].map(s=>`<option${a.statut===s?' selected':''}>${s}</option>`).join('')}
      </select>
    </div></td>
  </tr>`;

  const aFaire2=data.filter(a=>a.statut==='À faire').length;
  const enC2=data.filter(a=>a.statut==='En cours').length;
  const ret2=data.filter(a=>a.statut==='En retard').length;
  const done2=data.filter(a=>a.statut==='Clôturée').length;

  return `
  <!-- ═══ KPI STRIP ═══ -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr) 1.3fr;gap:10px;margin-bottom:13px">
    ${[['📋',total,'Total','#1e40af','#eff6ff'],['⏳',af,'À faire','#64748b','#f8fafc'],['⚡',enC,'En cours','#c2410c','#fff7ed'],['🚨',ret,'En retard','#dc2626','#fef2f2'],['✅',done,'Clôturées','#16a34a','#f0fdf4']].map(([ic,v,l,c,bg])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:12px;display:flex;align-items:center;gap:10px">
      <span style="font-size:20px">${ic}</span>
      <div><div style="font-size:22px;font-weight:800;color:${c};line-height:1">${v}</div><div style="font-size:9.5px;color:${c};opacity:.75;margin-top:1px">${l}</div></div>
    </div>`).join('')}
    <!-- Donut global -->
    <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:12px;display:flex;align-items:center;gap:11px">
      <svg width="52" height="52" viewBox="0 0 52 52">
        <circle cx="26" cy="26" r="20" fill="none" stroke="#f1f5f9" stroke-width="8"/>
        ${(()=>{const d=[af,enC,ret,done];const cs=['#64748b','#2563eb','#dc2626','#16a34a'];let o=0.25;return d.map((v,i)=>{const f=v/Math.max(total,1);const a=`<circle cx="26" cy="26" r="20" fill="none" stroke="${cs[i]}" stroke-width="8" stroke-dasharray="${2*Math.PI*20*f} ${2*Math.PI*20}" stroke-dashoffset="${-2*Math.PI*20*(o-0.25)}" stroke-linecap="butt"/>`;o+=f;return a;}).join('');})()}
        <text x="26" y="30" text-anchor="middle" font-size="11" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${pctD}%</text>
      </svg>
      <div style="flex:1">
        <div style="font-size:12px;font-weight:700;color:#0f172a">Taux clôture</div>
        <div style="font-size:10px;color:#94a3b8">${done}/${total} · Moy. ${avgP}%</div>
      </div>
    </div>
  </div>

  <!-- ═══ TOOLBAR ═══ -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:11px 14px;margin-bottom:12px;box-shadow:0 1px 4px rgba(0,0,0,.04)">
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:6px;background:#f8fafc;border:1.5px solid ${fQ?'#16a34a':'#e2e8f0'};border-radius:8px;padding:5px 10px;flex:1;min-width:200px">
        <span style="color:#94a3b8">🔍</span>
        <input placeholder="Rechercher action, origine, responsable…" value="${fQ}"
          oninput="window.envActFQ=this.value;document.getElementById('content').innerHTML=PAGES['env-actions']()"
          style="border:none;background:transparent;font-size:11px;color:#0f172a;outline:none;width:100%;font-family:'Inter',sans-serif">
        ${fQ?`<button onclick="window.envActFQ='';document.getElementById('content').innerHTML=PAGES['env-actions']()" style="background:none;border:none;cursor:pointer;color:#94a3b8;font-size:13px;padding:0">✕</button>`:''}
      </div>
      <select class="sel" onchange="window.envActFType=this.value;document.getElementById('content').innerHTML=PAGES['env-actions']()">
        <option value="Tous">🏷 Type : Tous</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.envActFPrio=this.value;document.getElementById('content').innerHTML=PAGES['env-actions']()">
        <option value="Tous">⚡ Priorité</option>${['Critique','Haute','Normale'].map(p=>`<option${p===fPrio?' selected':''}>${p}</option>`).join('')}
      </select>
      <select class="sel" onchange="window.envActFStat=this.value;document.getElementById('content').innerHTML=PAGES['env-actions']()">
        <option value="Tous">📋 Statut</option>${['À faire','En cours','En retard','Clôturée'].map(s=>`<option${s===fStat?' selected':''}>${s}</option>`).join('')}
      </select>
      ${(fQ||fPrio!=='Tous'||fType!=='Tous'||fStat!=='Tous')?`<button onclick="window.envActFQ='';window.envActFPrio='Tous';window.envActFType='Tous';window.envActFStat='Tous';document.getElementById('content').innerHTML=PAGES['env-actions']()" class="btn bsm" style="background:#fef2f2;color:#dc2626;border-color:#fca5a5">✕ Effacer</button>`:''}
      <span style="font-size:10px;color:#94a3b8">${data.length}/${total}</span>
      <div style="display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;margin-left:auto">
        ${[['kanban','⬛ Kanban'],['liste','≡ Liste']].map(([v,lb])=>`<button onclick="window.envActView='${v}';document.getElementById('content').innerHTML=PAGES['env-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view===v?'#16a34a':'transparent'};color:${view===v?'#fff':'#94a3b8'};transition:.15s">${lb}</button>`).join('')}
      </div>
      <button onclick="envAddEnvAction()" style="background:linear-gradient(135deg,#064e3b,#16a34a);color:#fff;border:none;border-radius:8px;padding:6px 14px;font-size:11px;font-weight:700;cursor:pointer;font-family:'Inter',sans-serif;box-shadow:0 2px 8px rgba(22,163,74,.3);white-space:nowrap">+ Nouvelle action</button>
    </div>
  </div>

  ${data.length===0?`
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;padding:48px;text-align:center">
    <div style="font-size:36px;margin-bottom:10px">🌿</div>
    <div style="font-size:14px;font-weight:600;color:#0f172a;margin-bottom:4px">Aucune action trouvée</div>
    <div style="font-size:11px;color:#94a3b8">Modifiez les filtres ou ajoutez une nouvelle action</div>
  </div>`

  :view==='kanban'?`
  <!-- ═══ KANBAN ═══ -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
    ${['À faire','En cours','En retard','Clôturée'].map(statut=>{
      const col=data.filter(a=>a.statut===statut);
      return `<div style="background:${statBGs[statut]};border-radius:12px;padding:11px;min-height:200px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:11px">
          <div style="display:flex;align-items:center;gap:6px">
            <div style="width:8px;height:8px;border-radius:50%;background:${statCols[statut]}"></div>
            <span style="font-size:11px;font-weight:700;color:#0f172a">${statut}</span>
          </div>
          <span style="background:#fff;border:1px solid ${statCols[statut]}50;border-radius:20px;padding:2px 9px;font-size:10px;font-weight:800;color:${statCols[statut]}">${col.length}</span>
        </div>
        ${col.map(a=>card(a)).join('')}
        <button onclick="envAddEnvAction()" style="width:100%;padding:7px;border:1.5px dashed #cbd5e1;border-radius:8px;background:transparent;color:#94a3b8;font-size:10px;cursor:pointer;font-family:'Inter',sans-serif;margin-top:2px" onmouseover="this.style.borderColor='#16a34a';this.style.color='#16a34a'" onmouseout="this.style.borderColor='#cbd5e1';this.style.color='#94a3b8'">+ Ajouter</button>
      </div>`;
    }).join('')}
  </div>`

  :`
  <!-- ═══ TABLE ═══ -->
  <div style="background:#fff;border:1px solid #e2e8f0;border-radius:11px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,.04)"><div style="overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif">
      <thead><tr style="background:#f8fafc;border-bottom:1.5px solid #e2e8f0">
        ${['Action','Type','Origine','Responsable','Échéance','Progression','Statut','Priorité',''].map(h=>`<th style="padding:9px 12px;font-size:10px;font-weight:700;color:#64748b;text-align:left;white-space:nowrap;text-transform:uppercase;letter-spacing:.04em">${h}</th>`).join('')}
      </tr></thead>
      <tbody>${data.map(a=>row(a)).join('')}</tbody>
    </table>
  </div></div>`}`;
},

'env-kpi': () => {
  if(!window.envKpiPer) window.envKpiPer='mensuel';
  const per=window.envKpiPer;
  if(!window.ENV_ACTIONS||!window.ENV_ACTIONS.length) PAGES['env-actions']();

  const acts=window.ENV_ACTIONS||[];
  const total=acts.length, done=acts.filter(a=>a.statut==='Clôturée').length,
    enC=acts.filter(a=>a.statut==='En cours').length,
    ret=acts.filter(a=>a.statut==='En retard').length,
    af=acts.filter(a=>a.statut==='À faire').length;
  const avgP=Math.round(acts.reduce((s,a)=>s+a.prog,0)/Math.max(total,1));
  const pctD=Math.round(done/Math.max(total,1)*100);

  const moisEl=[280,295,270,310,298]; const moisEau=[142,152,138,162,152]; const moisAir=[4100,4350,3980,4400,4200];
  const moisLbls=['Jan','Fév','Mar','Avr','Mai'];
  const objEl=24000, objEau=140, objAir=4000, objCarb=380;
  const nc5s=window.ENV_5S_DATA||[];
  const avg5s=nc5s.length?Math.round(nc5s.reduce((s,a)=>s+a.score,0)/nc5s.length):0;
  const decPts=[['Métalliques',45,'#64748b'],['Huiles usagées',15,'#0284c7'],['Cartons',15,'#f59e0b'],['Plastiques',10,'#06b6d4'],['Dangereux',15,'#dc2626']];

  return `
  <!-- ═══ HEADER ═══ -->
  <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:8px">
    <div>
      <div style="font-size:14px;font-weight:700;color:#0f172a">📊 Tableau de bord KPI — Environnement ISO 14001</div>
      <div style="font-size:10px;color:#94a3b8;margin-top:2px">Indicateurs de performance · XPERT-MECA · Mai 2026</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center">
      <div style="display:flex;background:#f1f5f9;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
        ${['mensuel','trimestriel','annuel'].map(p=>`<button onclick="window.envKpiPer='${p}';document.getElementById('content').innerHTML=PAGES['env-kpi']()"
          style="padding:5px 12px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${p===per?'#16a34a':'transparent'};color:${p===per?'#fff':'#94a3b8'};transition:.15s">${p.charAt(0).toUpperCase()+p.slice(1)}</button>`).join('')}
      </div>
      <button class="btn bsm" onclick="">📥 Export PDF</button>
    </div>
  </div>

  <!-- ═══ ROW 1: 8 KPI CARDS ═══ -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:13px">
    ${[
      ['♻','Déchets valorisés','12,45 t','↑ 8% vs préc.','#16a34a','#f0fdf4','Taux valorisation : 78%','↓'],
      ['💧','Consommation eau','152 m³','↑ 8% vs objectif','#dc2626','#fef2f2','Obj. 140 m³ — dépassé','↑'],
      ['⚡','Électricité','25 430 kWh','↑ 6% vs objectif','#dc2626','#fef2f2','Obj. 24 000 kWh — dépassé','↑'],
      ['🌿','Conformité env.','92%','+ 2% vs objectif','#16a34a','#f0fdf4','Obj. ≥ 90% — atteint','↓'],
      ['⭐','Score 5S moyen',avg5s+'/25','Obj. 20/25','#f59e0b','#fffbeb',avg5s>=20?'✓ Objectif atteint':'Écart : '+(20-avg5s)+' pts','→'],
      ['♻','Taux recyclage déchets','78%','Obj. ≥ 80%','#f59e0b','#fffbeb','Proche objectif','→'],
      ['🎯','Actions clôturées',pctD+'%',done+'/'+total+' actions','#16a34a','#f0fdf4','Progression moy. : '+avgP+'%','↓'],
      ['🚨','Urgences env. actives','4','Plans à jour · Équip. OK','#ea580c','#fff7ed','Aucun incident ce mois','→'],
    ].map(([ic,l,v,sub,c,bg,hint,arr])=>`
    <div style="background:${bg};border:1px solid ${c}30;border-radius:11px;padding:13px;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${c}"></div>
      <div style="display:flex;justify-content:space-between;margin-bottom:6px">
        <span style="font-size:16px">${ic}</span>
        <span style="font-size:10px;font-weight:700;color:${arr==='↑'?'#dc2626':arr==='↓'?'#16a34a':'#94a3b8'}">${arr}</span>
      </div>
      <div style="font-size:22px;font-weight:800;color:${c};line-height:1;margin-bottom:3px">${v}</div>
      <div style="font-size:10px;font-weight:600;color:#0f172a;margin-bottom:2px">${l}</div>
      <div style="font-size:9px;color:${sub.includes('dépassé')?'#dc2626':sub.includes('atteint')?'#16a34a':'#94a3b8'}">${sub}</div>
      <div style="font-size:9px;color:#94a3b8;margin-top:2px;font-style:italic">${hint}</div>
    </div>`).join('')}
  </div>

  <!-- ═══ ROW 2: Bar chart consommations + Donut déchets ═══ -->
  <div style="display:grid;grid-template-columns:1.7fr 1fr;gap:12px;margin-bottom:13px">
    <div class="card" style="margin-bottom:0">
      <div class="ch">
        <span class="ct">📈 Évolution consommations — Jan–Mai 2026</span>
        <div style="display:flex;gap:8px;align-items:center">
          <span style="font-size:9px;color:#94a3b8">Rouge = dépassement objectif</span>
          <button onclick="goPage('env-conso')" class="btn bsm">Détail →</button>
        </div>
      </div>
      <div style="position:relative;height:130px;padding:4px 4px 22px">
        <div style="position:absolute;inset:4px 4px 22px 0">
          ${[0,25,50,75,100].map(p=>`<div style="position:absolute;left:0;right:0;bottom:${p}%;border-top:1px dashed #f1f5f9"></div>`).join('')}
          <div style="position:absolute;left:0;right:0;bottom:${objEl/27000*100}%;border-top:1.5px dashed #7c3aed55;"><span style="position:absolute;right:2px;top:-9px;font-size:7.5px;color:#7c3aed;font-weight:600">Obj. élec</span></div>
          <div style="position:absolute;left:0;right:0;bottom:${objEau/175*70}%;border-top:1.5px dashed #0284c755;"><span style="position:absolute;left:2px;top:-9px;font-size:7.5px;color:#0284c7;font-weight:600">Obj. eau</span></div>
        </div>
        <div style="display:flex;align-items:flex-end;gap:10px;height:100%;position:relative;z-index:1">
          ${moisLbls.map((_,i)=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px">
            <div style="display:flex;align-items:flex-end;gap:2px;height:108px">
              <div title="Élec: ${moisEl[i]}kWh" style="width:12px;height:${moisEl[i]/27000*100}px;background:${moisEl[i]>objEl?'#dc2626':'#7c3aed'};border-radius:3px 3px 0 0;opacity:.85"></div>
              <div title="Eau: ${moisEau[i]}m³" style="width:12px;height:${moisEau[i]/175*70}px;background:${moisEau[i]>objEau?'#dc2626':'#0284c7'};border-radius:3px 3px 0 0;opacity:.85"></div>
              <div title="Air: ${moisAir[i]}m³" style="width:12px;height:${moisAir[i]/4500*95}px;background:${moisAir[i]>objAir?'#f59e0b':'#16a34a'};border-radius:3px 3px 0 0;opacity:.85"></div>
            </div>
            <div style="font-size:8.5px;color:#94a3b8;font-weight:500">${moisLbls[i]}</div>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:14px;justify-content:center;font-size:9px;margin-top:4px;flex-wrap:wrap">
        ${[['Électricité','#7c3aed'],['Eau','#0284c7'],['Air comprimé','#16a34a'],['Dépassement','#dc2626']].map(([l,c])=>`<div style="display:flex;align-items:center;gap:4px"><div style="width:9px;height:9px;background:${c};border-radius:2px"></div>${l}</div>`).join('')}
      </div>
    </div>

    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:10px">🥧 Déchets — 12,45 t ce mois</div>
      <div style="display:flex;align-items:center;gap:12px;justify-content:center;margin-bottom:12px">
        <svg width="88" height="88" viewBox="0 0 88 88">
          <circle cx="44" cy="44" r="31" fill="none" stroke="#f1f5f9" stroke-width="12"/>
          ${(()=>{let o=0.25;return decPts.map(([l,p,c])=>{const f=p/100,a=`<circle cx="44" cy="44" r="31" fill="none" stroke="${c}" stroke-width="12" stroke-dasharray="${2*Math.PI*31*f} ${2*Math.PI*31}" stroke-dashoffset="${-2*Math.PI*31*(o-0.25)}"/>`;o+=f;return a;}).join('');})()}
          <text x="44" y="41" text-anchor="middle" font-size="10" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">78%</text>
          <text x="44" y="52" text-anchor="middle" font-size="7.5" fill="#94a3b8" font-family="Inter,sans-serif">valorisé</text>
        </svg>
        <div style="flex:1;display:flex;flex-direction:column;gap:5px">
          ${decPts.map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:5px">
            <div style="width:7px;height:7px;border-radius:50%;background:${c};flex-shrink:0"></div>
            <span style="font-size:9.5px;flex:1;color:#64748b">${l}</span>
            <div style="width:45px;height:4px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${v}%;background:${c};border-radius:3px"></div></div>
            <span style="font-size:9.5px;font-weight:700;color:${c};min-width:24px;text-align:right">${v}%</span>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;justify-content:space-between;padding:8px;background:#f0fdf4;border-radius:8px;border:1px solid #bbf7d0">
        <span style="font-size:10px;color:#166534;font-weight:600">9,8 t valorisées ✓</span>
        <span style="font-size:10px;color:#dc2626;font-weight:700">0,25 t dangereux</span>
      </div>
    </div>
  </div>

  <!-- ═══ ROW 3: Objectifs + Actions + 5S ═══ -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:13px">
    <!-- Objectifs ISO 14001 -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">🎯 Objectifs ISO 14001 — ${per.charAt(0).toUpperCase()+per.slice(1)}</div>
      ${[['Élec. (kWh)',25430,24000,false,'#7c3aed'],['Eau (m³)',152,140,false,'#0284c7'],['Air comprimé (m³)',4200,4000,false,'#16a34a'],['Carburant (L)',400,380,false,'#f59e0b'],['Taux recyclage (%)',78,80,true,'#16a34a'],['Conformité env. (%)',92,90,true,'#16a34a'],['Score 5S (/25)',avg5s,20,true,'#f59e0b']].map(([l,v,o,higher,c])=>{
        const ok=higher?v>=o:v<=o;
        const pct=Math.min(v/o*100,110);
        return `<div style="margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
            <span style="font-weight:600;color:#0f172a">${l}</span>
            <span style="font-weight:700;color:${ok?'#16a34a':'#dc2626'}">${v.toLocaleString('fr')} / ${o.toLocaleString('fr')}</span>
          </div>
          <div style="height:7px;background:#f1f5f9;border-radius:5px;overflow:hidden">
            <div style="height:100%;width:${Math.min(pct,100)}%;background:${ok?c:'#dc2626'};border-radius:5px;transition:.3s"></div>
          </div>
          <div style="font-size:9px;font-weight:600;color:${ok?'#16a34a':'#dc2626'};margin-top:2px">${ok?'✓ Atteint':'✗ Écart : '+Math.abs(v-o).toLocaleString('fr')}</div>
        </div>`;
      }).join('')}
    </div>

    <!-- Actions plan -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">↺ Plan d'actions ISO 14001</div>
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
        <svg width="72" height="72" viewBox="0 0 72 72">
          <circle cx="36" cy="36" r="26" fill="none" stroke="#f1f5f9" stroke-width="10"/>
          ${(()=>{const ds=[af,enC,ret,done];const cs=['#64748b','#2563eb','#dc2626','#16a34a'];let o=0.25;return ds.map((v,i)=>{const f=v/Math.max(total,1);const a=`<circle cx="36" cy="36" r="26" fill="none" stroke="${cs[i]}" stroke-width="10" stroke-dasharray="${2*Math.PI*26*f} ${2*Math.PI*26}" stroke-dashoffset="${-2*Math.PI*26*(o-0.25)}" stroke-linecap="butt"/>`;o+=f;return a;}).join('');})()}
          <text x="36" y="33" text-anchor="middle" font-size="10" fill="#0f172a" font-weight="800" font-family="Inter,sans-serif">${pctD}%</text>
          <text x="36" y="44" text-anchor="middle" font-size="7" fill="#94a3b8" font-family="Inter,sans-serif">clôturées</text>
        </svg>
        <div style="flex:1;display:flex;flex-direction:column;gap:5px">
          ${[['À faire',af,'#64748b'],['En cours',enC,'#2563eb'],['En retard',ret,'#dc2626'],['Clôturées',done,'#16a34a']].map(([l,v,c])=>`
          <div style="display:flex;align-items:center;gap:5px">
            <div style="width:8px;height:8px;border-radius:50%;background:${c}"></div>
            <span style="font-size:9.5px;flex:1;color:#64748b">${l}</span>
            <div style="width:45px;height:4px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${Math.round(v/Math.max(total,1)*100)}%;background:${c};border-radius:3px"></div></div>
            <span style="font-size:10px;font-weight:700;color:${c};min-width:14px">${v}</span>
          </div>`).join('')}
        </div>
      </div>
      <div style="font-size:10px;font-weight:700;color:#0f172a;margin-bottom:8px">⚡ Actions critiques en attente</div>
      ${acts.filter(a=>a.prio==='Critique'&&a.statut!=='Clôturée').slice(0,3).map(a=>`
      <div style="padding:8px 10px;background:#fef2f2;border-radius:8px;margin-bottom:6px;border-left:3px solid #dc2626;cursor:pointer" onclick="goPage('env-actions')">
        <div style="font-size:10.5px;font-weight:700;color:#0f172a;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.action}</div>
        <div style="display:flex;justify-content:space-between;align-items:center;font-size:9px">
          <span style="color:#94a3b8">${a.resp}</span>
          <span style="color:#dc2626;font-weight:600">⏰ ${a.fin}</span>
        </div>
        <div style="height:4px;background:#fee2e2;border-radius:3px;overflow:hidden;margin-top:5px"><div style="height:100%;width:${a.prog}%;background:#dc2626;border-radius:3px"></div></div>
      </div>`).join('')}
      <button onclick="goPage('env-actions')" class="btn" style="width:100%;margin-top:4px;font-size:10.5px">Voir toutes les actions →</button>
    </div>

    <!-- 5S KPI -->
    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">⭐ Scores 5S par zone</div>
      ${nc5s.map(a=>`
      <div style="margin-bottom:11px;cursor:pointer" onclick="goPage('env-5s')">
        <div style="display:flex;justify-content:space-between;font-size:10px;margin-bottom:4px">
          <span style="font-weight:600;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:130px">${a.zone}</span>
          <div style="display:flex;align-items:center;gap:5px;flex-shrink:0">
            <span class="badge ${a.niv==='Bon'?'bg3':a.niv==='Moyen'?'by':'br'}" style="font-size:8px">${a.niv}</span>
            <span style="font-weight:800;color:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'}">${a.score}/25</span>
          </div>
        </div>
        <div style="height:8px;background:#f1f5f9;border-radius:5px;overflow:hidden">
          <div style="height:100%;width:${a.score/25*100}%;background:${a.score>=18?'#16a34a':a.score>=12?'#f59e0b':'#dc2626'};border-radius:5px;transition:.4s"></div>
        </div>
        <div style="font-size:9px;color:#94a3b8;margin-top:2px">${a.aud} · ${a.d}</div>
      </div>`).join('')}
      <div style="display:flex;align-items:center;justify-content:space-between;padding:10px;background:${avg5s>=20?'#f0fdf4':'#fffbeb'};border-radius:8px;border:1px solid ${avg5s>=20?'#bbf7d0':'#fde68a'};margin-top:2px">
        <span style="font-size:11px;font-weight:700;color:${avg5s>=20?'#166534':'#92400e'}">Score moyen : ${avg5s}/25</span>
        <span style="font-size:11px;font-weight:700;color:${avg5s>=20?'#16a34a':'#f59e0b'}">${avg5s>=20?'✓ Objectif':'⚠ Obj. : 20'}</span>
      </div>
    </div>
  </div>

  <!-- ═══ ROW 4: Aspects + Conformité ═══ -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px">
    <div class="card" style="margin-bottom:0">
      <div class="ch"><span class="ct">🌿 Aspects env. — Top criticité</span><button onclick="goPage('env-aspects')" class="btn bsm">Détail →</button></div>
      <table class="tbl"><thead><tr><th>Aspect</th><th>Activité</th><th>Criticité</th><th>Niveau</th></tr></thead><tbody>
        ${(window.ENV_ASPECTS_DATA||[]).sort((a,b)=>b.crit-a.crit).slice(0,6).map(a=>`<tr>
          <td style="font-size:10.5px;font-weight:600;max-width:130px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${a.aspect}</td>
          <td style="font-size:10px;color:#64748b">${a.activite}</td>
          <td>
            <div style="display:flex;align-items:center;gap:5px">
              <div style="width:30px;height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${a.crit/12*100}%;background:${a.crit>=10?'#dc2626':a.crit>=7?'#f59e0b':'#16a34a'};border-radius:3px"></div></div>
              <span style="font-weight:800;font-size:12px;color:${a.crit>=10?'#dc2626':a.crit>=7?'#f59e0b':'#16a34a'}">${a.crit}</span>
            </div>
          </td>
          <td><span class="badge ${a.niv==='Élevé'?'br':a.niv==='Moyen'?'by':'bg3'}" style="font-size:8.5px">${a.niv}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>

    <div class="card" style="margin-bottom:0">
      <div class="ct" style="margin-bottom:12px">📋 Tableau de conformité réglementaire</div>
      ${[['ISO 14001:2015','Système de management env.','Conforme','bg3','#16a34a','92%'],['Arrêté préfectoral','Rejets atmosphériques','Conforme','bg3','#16a34a','100%'],['Directive déchets','Gestion déchets dangereux','Non conforme','br','#dc2626','65%'],['ICPE','Inspection des installations','En cours','by','#f59e0b','78%'],['Plan eau local','Gestion ressources eau','En cours','by','#f59e0b','74%'],['Bilan carbone','Émissions GES scope 1+2','Conforme','bg3','#16a34a','88%']].map(([ref,desc,statut,sc,c,prog])=>`
      <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid #f1f5f9">
        <div style="flex:1;min-width:0">
          <div style="font-size:10.5px;font-weight:600;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${ref}</div>
          <div style="font-size:9px;color:#94a3b8">${desc}</div>
        </div>
        <div style="display:flex;align-items:center;gap:7px;flex-shrink:0">
          <div style="width:50px;height:5px;background:#f1f5f9;border-radius:3px;overflow:hidden"><div style="height:100%;width:${prog};background:${c};border-radius:3px"></div></div>
          <span class="badge ${sc}" style="font-size:8.5px;white-space:nowrap">${statut}</span>
        </div>
      </div>`).join('')}
      <button onclick="goPage('env-urgences')" class="btn" style="width:100%;margin-top:10px;font-size:10.5px">🚨 Voir urgences env. →</button>
    </div>
  </div>`;
},

'smi':     () => pgSoon('smi'),
'ind':     () => pgSoon('ind'),

/* ══════════════════════════════════════
   🛡 MODULE SÉCURITÉ SST
══════════════════════════════════════ */
'sec-tb': () => `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
  ${[['🚨','3','Accidents de travail','#fef2f2','var(--red)'],['⚠','7','Incidents / Presque-acc.','#fff7ed','var(--orange)'],['🟢','12','Jours sans accident','#f0fdf4','var(--green)'],['📋','18/26','Checklists réalisées','#eff6ff','var(--blue)'],['🔴','2','Risques critiques','#fef2f2','var(--red)'],['⏰','4','Actions en retard','#fff7ed','var(--orange)'],['🎯','87%','Taux conformité SST','#f5f3ff','#7c3aed'],['🚒','3/5',"Exercices d'urgence",'#f0fdf4','var(--green)']].map(([ic,v,l,bg,c])=>`
  <div style="background:${bg};border:1px solid ${c.includes('red')?'#fecaca':c.includes('orange')?'#fed7aa':c.includes('green')?'#bbf7d0':c.includes('blue')?'#bfdbfe':c.includes('7c3')?'#ddd6fe':'#bfdbfe'};border-radius:10px;padding:12px;position:relative;overflow:hidden">
    <div style="font-size:15px;margin-bottom:5px">${ic}</div>
    <div style="font-size:20px;font-weight:700;color:${c};margin-bottom:2px">${v}</div>
    <div style="font-size:9.5px;color:var(--muted)">${l}</div>
  </div>`).join('')}
</div>
<div class="g23">
  <div>
    <div class="card">
      <div class="ch"><span class="ct">📈 Évolution des accidents — Jan à Mai 2026</span></div>
      <svg width="100%" height="100" viewBox="0 0 500 100">
        <defs><linearGradient id="gac" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2563eb" stop-opacity=".15"/><stop offset="100%" stop-color="#2563eb" stop-opacity="0"/></linearGradient></defs>
        ${[0,25,50,75].map(y=>`<line x1="40" y1="${8+y*.85}" x2="490" y2="${8+y*.85}" stroke="#dde4ef" stroke-width="1"/>`).join('')}
        ${[4,3,2,1,0].map((v,i)=>`<text x="35" y="${11+i*21}" text-anchor="end" font-size="9" fill="#6b7a99" font-family="Inter,sans-serif">${v}</text>`).join('')}
        ${['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'].map((m,i)=>`<text x="${48+i*38}" y="97" text-anchor="middle" font-size="9" fill="#6b7a99" font-family="Inter,sans-serif">${m}</text>`).join('')}
        <path d="M48,75 L86,63 L124,41 L162,58 L200,50 L238,80 L276,70 L314,50 L352,60 L390,65 L428,57 L466,50 L466,92 L48,92Z" fill="url(#gac)"/>
        <polyline points="48,75 86,63 124,41 162,58 200,50 238,80 276,70 314,50 352,60 390,65 428,57 466,50" fill="none" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>
        ${[[48,75],[86,63],[124,41],[162,58],[200,50],[238,80]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#2563eb" stroke="white" stroke-width="1.5"/>`).join('')}
        <polyline points="48,83 86,75 124,67 162,75 200,67 238,92" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,2"/>
      </svg>
      <div style="display:flex;gap:14px;justify-content:center;margin-top:6px">
        <div style="display:flex;align-items:center;gap:5px;font-size:10px"><div style="width:12px;height:2px;background:#2563eb"></div>Accidents totaux</div>
        <div style="display:flex;align-items:center;gap:5px;font-size:10px"><div style="width:12px;height:2px;background:#dc2626;border-top:2px dashed #dc2626"></div>Avec arrêt</div>
      </div>
    </div>
    <div class="g2">
      <div class="card" style="margin-bottom:0">
        <div class="ct" style="margin-bottom:9px">📋 Checklists du mois</div>
        ${[['🔥','Extincteurs','Conforme','var(--green)'],['🏥','Pharmacie','Observation','var(--orange)'],['🚗','Véhicule','En révision','var(--yellow)'],['🦺','EPI','Conforme','var(--green)'],['🚨','Évacuation','Conforme','var(--green)'],['⚙','Machine CN','Conforme','var(--green)']].map(([ic,n,s,c])=>`
        <div class="drow" onclick="goPage('sec-checklists')" style="cursor:pointer">
          <div style="display:flex;align-items:center;gap:6px"><span>${ic}</span><span style="font-weight:500;font-size:11px">${n}</span></div>
          <span style="font-size:9px;font-weight:700;color:${c};background:${c.includes('green')?'#f0fdf4':c.includes('orange')?'#fff7ed':'#fffbeb'};border-radius:4px;padding:2px 7px">${s}</span>
        </div>`).join('')}
      </div>
      <div class="card" style="margin-bottom:0">
        <div class="ct" style="margin-bottom:9px">⚠️ Risques à traiter</div>
        ${[['R-001','Pièce tournante','Atelier usinage','Critique','#fef2f2','var(--red)'],['R-003','Chute matériel','Magasin','Élevé','#fff7ed','var(--orange)'],['R-004','Électrocution','Maintenance','Élevé','#fff7ed','var(--orange)'],['R-007','Produits chimiques','Lab.','Moyen','#fffbeb','var(--yellow)']].map(([ref,r,z,niv,bg,c])=>`
        <div class="drow" onclick="goPage('sec-risques')" style="cursor:pointer">
          <div><div style="font-size:9.5px;font-weight:700;color:var(--blue);font-family:monospace">${ref}</div><div style="font-size:11px;font-weight:500">${r}</div><div style="font-size:9px;color:var(--muted)">${z}</div></div>
          <span style="font-size:9px;font-weight:700;color:${c};background:${bg};border-radius:4px;padding:2px 7px">${niv}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>
  <div>
    <div class="card">
      <div class="ct" style="margin-bottom:10px">📊 Répartition accidents par type</div>
      <div style="display:flex;justify-content:center;margin-bottom:10px">
        <svg width="120" height="120" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="44" fill="none" stroke="#dc2626" stroke-width="18" stroke-dasharray="${2*Math.PI*44*.40} ${2*Math.PI*44}" stroke-dashoffset="0"/>
          <circle cx="60" cy="60" r="44" fill="none" stroke="#ea580c" stroke-width="18" stroke-dasharray="${2*Math.PI*44*.25} ${2*Math.PI*44}" stroke-dashoffset="${-2*Math.PI*44*.40}"/>
          <circle cx="60" cy="60" r="44" fill="none" stroke="#2563eb" stroke-width="18" stroke-dasharray="${2*Math.PI*44*.20} ${2*Math.PI*44}" stroke-dashoffset="${-2*Math.PI*44*.65}"/>
          <circle cx="60" cy="60" r="44" fill="none" stroke="#16a34a" stroke-width="18" stroke-dasharray="${2*Math.PI*44*.15} ${2*Math.PI*44}" stroke-dashoffset="${-2*Math.PI*44*.85}"/>
          <text x="60" y="57" text-anchor="middle" font-size="10" font-weight="700" fill="#0f2044" font-family="Inter,sans-serif">TF</text>
          <text x="60" y="70" text-anchor="middle" font-size="13" font-weight="700" fill="#0f2044" font-family="monospace">2.45</text>
        </svg>
      </div>
      ${[['Coupure','40%','#dc2626'],['Chute','25%','#ea580c'],['Brûlure','20%','#2563eb'],['Autres','15%','#16a34a']].map(([l,v,c])=>`
      <div style="display:flex;align-items:center;gap:7px;padding:3px 0;font-size:10.5px">
        <div style="width:9px;height:9px;border-radius:50%;background:${c};flex-shrink:0"></div>
        <span style="flex:1">${l}</span><span style="font-weight:700;font-family:monospace">${v}</span>
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📊 Statut des actions sécurité</div>
      ${[['À faire','5','#6b7a99','20'],['En cours','8','#2563eb','32'],['En retard','4','#dc2626','16'],['Clôturées','8','#16a34a','32']].map(([l,v,c,p])=>`
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:7px">
        <span style="font-size:10px;width:58px;flex-shrink:0;color:var(--muted)">${l}</span>
        <div style="flex:1;height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${p}%;background:${c};border-radius:3px"></div></div>
        <span style="font-size:10px;font-weight:700;color:${c};width:14px;text-align:right;font-family:monospace">${v}</span>
      </div>`).join('')}
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">⚡ Actions urgentes</div>
      ${[["Installer protection machine CN",'Ali M.','20/05','var(--red)'],["Formation SST opérateurs",'RH','25/05','var(--orange)'],["Remplacement EPI usagés (gants)",'HSE','18/05','var(--red)'],["Exercice évacuation Bât. B",'HSE','30/05','var(--blue)']].map(([a,r,d,c])=>`
      <div style="padding:6px 0;border-bottom:1px solid var(--border)">
        <div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div>
        <div style="display:flex;justify-content:space-between"><span style="font-size:10px;color:var(--muted)">👤 ${r}</span><span style="font-size:10px;font-weight:600;color:${c}">⏰ ${d}</span></div>
      </div>`).join('')}
    </div>
  </div>
</div>`,

'sec-risques': () => {
  // Init data on first load
  if(!window.sst_risks){
    window.sst_risks=[
      {id:'R-001',zone:'Atelier usinage',unite:'Machine CN',processus:'Utilisation machine CN',danger:'Pièce tournante',risque:'Coupure',dommage:'Blessure grave — amputation',personnes:'Opérateurs CN (Atelier)',situation:'Normal',g:4,f:3,d:2,action:'Installer protection supplémentaire sur la machine (écran de protection renforcé)',respAction:'Ali M.',delai:'2025-06-15',resp:'Ali M.',statut:'Traitement',rr_g:3,rr_f:2,rr_d:2},
      {id:'R-002',zone:'Assemblage',unite:'Poste manu.',processus:'Assemblage manuel',danger:'Outils coupants',risque:'Blessure main',dommage:'Coupure superficielle',personnes:'Opérateurs assemblage',situation:'Normal',g:3,f:2,d:2,action:'Formation gestes et postures + gants anti-coupure',respAction:'Karim S.',delai:'2025-05-20',resp:'Karim S.',statut:'Clôturé',rr_g:1,rr_f:1,rr_d:1},
      {id:'R-003',zone:'Magasin',unite:'Rayonnage',processus:'Stockage et manutention',danger:'Chute matériel',risque:'Contusion',dommage:'Blessure tête / membre',personnes:'Magasiniers',situation:'Normal',g:3,f:3,d:3,action:'Sécuriser les rayonnages et limiter la hauteur de stockage',respAction:'Youssef A.',delai:'2025-06-01',resp:'Youssef A.',statut:'Ouvert',rr_g:2,rr_f:2,rr_d:2},
      {id:'R-004',zone:'Maintenance',unite:'Électricité',processus:'Intervention HT',danger:'Intervention HT',risque:'Électrocution',dommage:'Électrisation / Décès',personnes:'Techniciens maintenance',situation:'Anormal',g:5,f:2,d:2,action:'Procédure consignation / déconsignation obligatoire + habilitation',respAction:'HSE',delai:'2025-06-15',resp:'HSE',statut:'Traitement',rr_g:3,rr_f:1,rr_d:2},
      {id:'R-005',zone:'Bureau',unite:'Bureau',processus:'Travail écran',danger:'Travail assis',risque:'TMS / Fatigue',dommage:'Douleurs musculo-squelettiques',personnes:'Personnel bureau',situation:'Normal',g:2,f:4,d:2,action:'Ergonomie poste de travail + pauses régulières',respAction:'RH',delai:'2025-07-01',resp:'RH',statut:'Ouvert',rr_g:1,rr_f:2,rr_d:1},
      {id:'R-006',zone:'Atelier usinage',unite:'Produits',processus:'Utilisation solvants',danger:'Solvants chimiques',risque:'Intoxication',dommage:'Atteinte voies respiratoires',personnes:'Opérateurs CN (Atelier)',situation:'Normal',g:4,f:2,d:3,action:'EPI respiratoire obligatoire + ventilation renforcée',respAction:'HSE',delai:'2025-06-01',resp:'HSE',statut:'Ouvert',rr_g:2,rr_f:2,rr_d:2},
      {id:'R-007',zone:'Bâtiment B',unite:'Toiture',processus:'Travaux en hauteur',danger:'Travail en hauteur',risque:'Chute de hauteur',dommage:'Fracture grave / Décès',personnes:'Techniciens maintenance',situation:'Anormal',g:5,f:3,d:2,action:'EPC obligatoire (garde-corps) + formation travail en hauteur',respAction:'Mehdi R.',delai:'2025-06-30',resp:'Mehdi R.',statut:'Ouvert',rr_g:3,rr_f:2,rr_d:2},
    ];
    window.sst_selectedId=null;
    window.sst_step=1;
  }

  // Helper functions
  const getCrit=r=>r.g*r.f*r.d;
  const getNiv=c=>c>60?'Critique':c>30?'Élevé':c>10?'Moyen':'Faible';
  const getNivC=niv=>{
    if(niv==='Critique') return{bg:'#fef2f2',bc:'#fecaca',tc:'#991b1b'};
    if(niv==='Élevé')    return{bg:'#fff7ed',bc:'#fed7aa',tc:'#9a3412'};
    if(niv==='Moyen')    return{bg:'#fffbeb',bc:'#fde68a',tc:'#92400e'};
    return{bg:'#f0fdf4',bc:'#bbf7d0',tc:'#065f46'};
  };
  const getSC=s=>s==='Traitement'?'bb':s==='Clôturé'?'bg3':'bo';

  // Build rows
  const buildRows=()=>window.sst_risks.map(r=>{
    const c=getCrit(r),niv=getNiv(c),nc=getNivC(niv),sc=getSC(r.statut);
    const sel=r.id===window.sst_selectedId;
    return`<tr style="${sel?'background:#eff6ff;':''}cursor:pointer" onclick="sstSelect('${r.id}')">
      <td style="border-left:${sel?'3px solid var(--blue)':'3px solid transparent'};color:var(--blue);font-weight:700;font-family:monospace;font-size:10.5px">${r.id}</td>
      <td style="font-size:10px">${r.zone}</td>
      <td style="font-size:10px;color:var(--muted)">${r.unite}</td>
      <td style="font-weight:600">${r.danger}</td>
      <td style="color:var(--muted)">${r.risque}</td>
      <td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fef2f2;color:#991b1b;font-size:11px;font-weight:800;font-family:monospace">${r.g}</span></td>
      <td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fff7ed;color:#92400e;font-size:11px;font-weight:800;font-family:monospace">${r.f}</span></td>
      <td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#eff6ff;color:#1e40af;font-size:11px;font-weight:800;font-family:monospace">${r.d}</span></td>
      <td><span style="font-family:monospace;font-size:12px;font-weight:800;color:${nc.tc}">${c}</span></td>
      <td><span style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${niv}</span></td>
      <td style="font-size:10px">${r.resp}</td>
      <td><span class="badge ${sc}">${r.statut}</span></td>
      <td><button class="btn bsm" onclick="event.stopPropagation();sstSelect('${r.id}')">✏</button></td>
    </tr>`;
  }).join('');

  // Build heatmap
  const cellCounts={};
  window.sst_risks.forEach(r=>{const k=r.g+'-'+r.f;cellCounts[k]=(cellCounts[k]||0)+1;});
  const heatmap=[5,4,3,2,1].flatMap(f=>[1,2,3,4,5].map(g=>{
    const c=g*f;
    const bg=c>60?'#dc2626':c>30?'#f97316':c>10?'#f59e0b':'#10b981';
    const op=c>60?1:c>30?.8:c>10?.55:.4;
    const cnt=cellCounts[g+'-'+f]||0;
    const sel=window.sst_selectedId&&window.sst_risks.find(r=>r.id===window.sst_selectedId)?.g===g&&window.sst_risks.find(r=>r.id===window.sst_selectedId)?.f===f;
    return`<div onclick="sstFilterCell(${g},${f})" style="background:${bg};opacity:${op};border-radius:4px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:700;font-family:monospace;cursor:pointer;position:relative;transition:all .15s;${sel?'outline:2.5px solid var(--navy);opacity:1;':''}${cnt?'box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.5)':''}" title="G=${g}×F=${f}=${c}${cnt?' — '+cnt+' risque(s)':''}">
      ${cnt?`<div style="position:absolute;top:-4px;right:-4px;background:#0f2044;color:#fff;border-radius:50%;width:14px;height:14px;font-size:8px;font-weight:700;display:flex;align-items:center;justify-content:center;border:1.5px solid #fff">${cnt}</div>`:''}
      ${c}
    </div>`;
  })).join('');

  // Stats
  const stats={Critique:0,Élevé:0,Moyen:0,Faible:0};
  window.sst_risks.forEach(r=>stats[getNiv(getCrit(r))]++);
  const scColors={Critique:'#dc2626',Élevé:'#f97316',Moyen:'#f59e0b',Faible:'#10b981'};
  const statsHtml=Object.entries(stats).map(([n,v])=>`<div style="background:${scColors[n]}15;border:1px solid ${scColors[n]}30;border-radius:6px;padding:5px 7px;text-align:center"><div style="font-size:16px;font-weight:800;color:${scColors[n]};font-family:monospace">${v}</div><div style="font-size:8.5px;color:${scColors[n]};font-weight:600">${n}</div></div>`).join('');

  // Right panel content
  const buildRightPanel=()=>{
    if(!window.sst_selectedId) return`<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--muted);text-align:center;padding:30px"><div style="font-size:38px;margin-bottom:8px">📋</div><div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px">Sélectionner un risque</div><div style="font-size:11px">Cliquez sur une ligne du tableau<br>pour voir et modifier la fiche</div></div>`;
    const r=window.sst_risks.find(x=>x.id===window.sst_selectedId);
    if(!r) return '';
    const c=getCrit(r),niv=getNiv(c),nc=getNivC(niv);
    const rc=r.rr_g*r.rr_f*r.rr_d,rniv=getNiv(rc),rnc=getNivC(rniv);
    const step=window.sst_step;
    const STEPS=['Identification','Évaluation','Actions','Validation','Clôture'];
    const stepsHtml=STEPS.map((lbl,i)=>{
      const n=i+1,done=n<step,active=n===step;
      return(i>0?`<div style="flex:1;height:2px;background:${done?'var(--green)':'#e5e7eb'};margin-top:12px;transition:background .3s"></div>`:'')
        +`<div style="display:flex;flex-direction:column;align-items:center">
          <div onclick="sstGoStep(${n})" style="width:24px;height:24px;border-radius:50%;background:${done?'var(--green)':active?'var(--blue)':'var(--white)'};border:2px solid ${done?'var(--green)':active?'var(--blue)':'#e5e7eb'};color:${done||active?'#fff':'var(--muted)'};display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;cursor:pointer;transition:all .3s;${active?'box-shadow:0 0 0 4px rgba(37,99,235,.15)':''}">${done?'✓':n}</div>
          <div style="font-size:8px;color:${active?'var(--blue)':done?'var(--green)':'var(--muted)'};margin-top:3px;white-space:nowrap;font-weight:${active||done?'700':'400'}">${lbl}</div>
        </div>`;
    }).join('');

    // STEP content
    let stepBody='';
    const secTitle=(t)=>`<div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:.1em;padding-bottom:5px;border-bottom:1px solid var(--border);margin:13px 0 9px">${t}</div>`;
    const navBtns=`<div style="display:flex;gap:8px;padding-top:12px;border-top:1px solid var(--border);margin-top:6px">
      ${step>1?`<button class="btn bsm" onclick="sstGoStep(${step-1})">← Précédent</button>`:'<span></span>'}
      <div style="flex:1"></div>
      ${step<5?`<button class="btn bsm bp" onclick="sstGoStep(${step+1})">${step===4?'✓ Valider la fiche →':step===3?'→ Validation':step===2?'→ Actions correctives':'→ Évaluation initiale'}</button>`:''}
    </div>`;

    if(step===1){
      stepBody=`
        ${secTitle('Identification')}
        ${[['Zone',r.zone],['Unité',r.unite],['Processus',r.processus],['Danger',r.danger],['Risque',r.risque],['Dommage',r.dommage||'—'],['Personnes exposées',r.personnes||'—'],['Situation',r.situation]].map(([k,v])=>`<div class="drow" style="padding:4px 0"><span class="dk">${k}</span><span style="font-weight:600;font-size:11px;max-width:58%;text-align:right">${v}</span></div>`).join('')}
        ${secTitle('Modifier')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:13px">
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Zone</label>
            <select class="fi" onchange="sstUpdate('${r.id}','zone',this.value)">${['Atelier usinage','Assemblage','Maintenance','Bureau','Magasin','Bâtiment B'].map(z=>`<option${z===r.zone?' selected':''}>${z}</option>`).join('')}</select></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Statut</label>
            <select class="fi" onchange="sstUpdate('${r.id}','statut',this.value)">${['Ouvert','Traitement','Clôturé'].map(s=>`<option${s===r.statut?' selected':''}>${s}</option>`).join('')}</select></div>
          <div style="display:flex;flex-direction:column;gap:3px;grid-column:1/-1"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Danger</label><input class="fi" value="${r.danger}" onchange="sstUpdate('${r.id}','danger',this.value)"></div>
          <div style="display:flex;flex-direction:column;gap:3px;grid-column:1/-1"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Risque</label><input class="fi" value="${r.risque}" onchange="sstUpdate('${r.id}','risque',this.value)"></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Responsable</label>
            <select class="fi" onchange="sstUpdate('${r.id}','resp',this.value)">${['Ali M.','Karim S.','HSE','Youssef A.','RH','Mehdi R.'].map(s=>`<option${s===r.resp?' selected':''}>${s}</option>`).join('')}</select></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Situation</label>
            <select class="fi" onchange="sstUpdate('${r.id}','situation',this.value)">${['Normal','Anormal','Urgence'].map(s=>`<option${s===r.situation?' selected':''}>${s}</option>`).join('')}</select></div>
        </div>
        ${navBtns}`;
    }
    else if(step===2){
      stepBody=`
        ${secTitle('Scores actuels')}
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">
          ${[['G',r.g,'Gravité','#dc2626','#fef2f2'],['F',r.f,'Fréquence','#ea580c','#fff7ed'],['D',r.d,'Détection','#2563eb','#eff6ff'],['C',c,'Criticité',nc.tc,nc.bg]].map(([l,v,ll,cl,bg])=>`<div style="background:${bg};border-radius:8px;padding:10px;text-align:center"><div style="font-size:22px;font-weight:800;color:${cl};font-family:monospace;line-height:1">${v}</div><div style="font-size:8.5px;color:var(--muted);margin-top:3px">${ll}</div></div>`).join('')}
        </div>
        <div style="background:${nc.bg};border:1px solid ${nc.bc};border-radius:8px;padding:9px;text-align:center;margin-bottom:14px"><span style="font-size:11px;font-weight:700;color:${nc.tc}">${niv==='Critique'?'🔴':niv==='Élevé'?'🟠':niv==='Moyen'?'🟡':'🟢'} ${niv.toUpperCase()} — ${c>60?'Action immédiate':c>30?'Action nécessaire':'Surveiller'}</span></div>
        ${secTitle('Ajuster les valeurs GFDC')}
        <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:14px">
          ${[['g','Gravité (G)','#dc2626',r.g],['f','Fréquence (F)','#ea580c',r.f],['d','Détection (D)','#2563eb',r.d]].map(([field,lbl,col,val])=>`
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:6px"><span style="font-size:10.5px;font-weight:600;color:${col}">${lbl}</span><span id="live_${field}_${r.id}" style="font-family:monospace;font-weight:800;font-size:16px;color:${col}">${val}</span></div>
            <input type="range" min="1" max="5" value="${val}" style="-webkit-appearance:none;height:6px;border-radius:3px;outline:none;cursor:pointer;width:100%;background:linear-gradient(to right,${col} 0%,${col} ${(val-1)/4*100}%,#e5e7eb ${(val-1)/4*100}%)"
              oninput="sstLive('${r.id}','${field}',+this.value,this,'${col}','live_${field}_${r.id}')">
            <div style="display:flex;justify-content:space-between;font-size:8px;color:var(--muted);margin-top:3px"><span>1 — Min</span><span>3</span><span>5 — Max</span></div>
          </div>`).join('')}
        </div>
        <div id="sst_crit_preview_${r.id}"></div>
        ${navBtns}`;
    }
    else if(step===3){
      stepBody=`
        ${secTitle('Action corrective')}
        <label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;display:block;margin-bottom:5px">Action à mettre en œuvre <span style="color:var(--red)">*</span></label>
        <textarea class="fi" rows="3" style="margin-bottom:10px" onchange="sstUpdate('${r.id}','action',this.value)">${r.action||''}</textarea>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-bottom:14px">
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Responsable action</label>
            <select class="fi" onchange="sstUpdate('${r.id}','respAction',this.value)">${['Ali M.','Karim S.','HSE','Youssef A.','RH','Mehdi R.'].map(s=>`<option${s===r.respAction?' selected':''}>${s}</option>`).join('')}</select></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Délai</label><input class="fi" type="date" value="${r.delai||''}" onchange="sstUpdate('${r.id}','delai',this.value)"></div>
        </div>
        ${secTitle('Risque résiduel estimé (après action)')}
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:12px">
          ${[['G',r.rr_g,'Grav. rés.','#ea580c','#fff7ed'],['F',r.rr_f,'Fréq. rés.','#d97706','#fffbeb'],['D',r.rr_d,'Dét. rés.','#2563eb','#eff6ff'],['C',rc,'Crit. rés.',rnc.tc,rnc.bg]].map(([l,v,ll,cl,bg])=>`<div style="background:${bg};border-radius:7px;padding:8px;text-align:center"><div style="font-size:18px;font-weight:800;color:${cl};font-family:monospace;line-height:1">${v}</div><div style="font-size:8px;color:var(--muted);margin-top:2px">${ll}</div></div>`).join('')}
        </div>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:12px">
          ${[['rr_g','Gravité résiduelle','#ea580c',r.rr_g],['rr_f','Fréquence résiduelle','#d97706',r.rr_f],['rr_d','Détection résiduelle','#2563eb',r.rr_d]].map(([field,lbl,col,val])=>`
          <div>
            <div style="display:flex;justify-content:space-between;margin-bottom:5px"><span style="font-size:10px;font-weight:600;color:${col}">${lbl}</span><span id="live_${field}_${r.id}" style="font-family:monospace;font-weight:800;font-size:15px;color:${col}">${val}</span></div>
            <input type="range" min="1" max="5" value="${val}" style="-webkit-appearance:none;height:6px;border-radius:3px;outline:none;cursor:pointer;width:100%;background:linear-gradient(to right,${col} 0%,${col} ${(val-1)/4*100}%,#e5e7eb ${(val-1)/4*100}%)"
              oninput="sstLive('${r.id}','${field}',+this.value,this,'${col}','live_${field}_${r.id}')">
          </div>`).join('')}
        </div>
        <div id="sst_rr_preview_${r.id}"></div>
        ${navBtns}`;
    }
    else if(step===4){
      stepBody=`
        ${secTitle('Récapitulatif avant validation')}
        <div style="background:#f8fafc;border:1px solid var(--border);border-radius:9px;padding:12px;margin-bottom:12px">
          ${[['Risque',r.danger+' — '+r.risque],['Zone',r.zone],['Niveau initial',niv+' ('+c+')'],['Niveau résiduel',rniv+' ('+rc+')'],['Action corrective',r.action||'—'],['Responsable',r.respAction||'—'],['Délai',r.delai||'—']].map(([k,v])=>`<div class="drow" style="padding:4px 0"><span class="dk">${k}</span><span style="font-size:11px;font-weight:600;max-width:60%;text-align:right">${v}</span></div>`).join('')}
        </div>
        <div style="display:flex;align-items:center;gap:10px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;margin-bottom:12px">
          <span style="font-size:22px">✅</span>
          <div><div style="font-size:11px;font-weight:700;color:#065f46">Réduction du risque confirmée</div>
          <div style="font-size:10px;color:var(--muted);margin-top:2px">Score initial : <strong style="color:var(--orange)">${c}</strong> → Score résiduel : <strong style="color:var(--green)">${rc}</strong> — Réduction de <strong style="color:var(--green)">${Math.round((1-rc/c)*100)}%</strong></div></div>
        </div>
        ${secTitle('Validation')}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:13px">
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Validé par</label>
            <select class="fi"><option>KORTAS.A — Resp. QHSE</option><option>Direction</option><option>HSE</option></select></div>
          <div style="display:flex;flex-direction:column;gap:3px"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Date validation</label>
            <input class="fi" type="date" value="${new Date().toISOString().split('T')[0]}"></div>
          <div style="display:flex;flex-direction:column;gap:3px;grid-column:1/-1"><label style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase">Commentaire</label>
            <textarea class="fi" rows="2" placeholder="Observations éventuelles..."></textarea></div>
        </div>
        ${navBtns}`;
    }
    else{
      stepBody=`
        <div style="text-align:center;padding:22px 14px">
          <div style="width:56px;height:56px;border-radius:50%;background:#f0fdf4;border:3px solid var(--green);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:24px">✅</div>
          <div style="font-size:14px;font-weight:800;color:var(--navy);margin-bottom:4px">Fiche validée et clôturée</div>
          <div style="font-size:11px;color:var(--muted);margin-bottom:16px">${r.id} — ${r.danger}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;text-align:left;margin-bottom:14px">
            ${[['Zone',r.zone],['Danger',r.danger],['Risque initial',niv+' ('+c+')'],['Risque résiduel',rniv+' ('+rc+')'],['Action',r.action||'—'],['Responsable',r.respAction||'—']].map(([k,v])=>`<div style="background:#f8fafc;border:1px solid var(--border);border-radius:6px;padding:7px"><div style="font-size:8.5px;font-weight:700;color:var(--muted);margin-bottom:2px;text-transform:uppercase">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
          </div>
          <div style="display:flex;gap:7px;justify-content:center">
            <button class="btn bsm" onclick="sstUpdate('${r.id}','statut','Traitement');window.sst_step=3;sstRefresh()">← Rouvrir</button>
            <button class="btn bsm bp" onclick="sstToast('📄 Rapport PDF généré','#16a34a')">📄 PDF</button>
            <button class="btn bsm bg2" onclick="sstToast('📧 Fiche envoyée','#16a34a')">📧 Email</button>
          </div>
        </div>`;
    }

    return`
      <!-- FICHE HEADER -->
      <div style="padding:12px 15px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:10">
        <div>
          <div style="font-size:13px;font-weight:800;color:var(--navy)">${r.id} — ${r.danger}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:1px">${r.zone} · ${r.unite}</div>
        </div>
        <div style="display:flex;gap:5px;align-items:center">
          <span style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc};border-radius:6px;padding:3px 9px;font-size:10px;font-weight:700">${niv==='Critique'?'🔴':niv==='Élevé'?'🟠':niv==='Moyen'?'🟡':'🟢'} ${niv.toUpperCase()}</span>
          <button class="btn bsm" onclick="sstDelete('${r.id}')" style="color:var(--red);border-color:#fecaca">🗑</button>
        </div>
      </div>
      <!-- STEP BAR -->
      <div style="display:flex;align-items:center;padding:10px 15px;background:#f8fafc;border-bottom:1px solid var(--border)">${stepsHtml}</div>
      <!-- BODY -->
      <div style="padding:14px 15px">${stepBody}</div>`;
  };

  setTimeout(()=>{
    // Inject rows
    const tb=document.getElementById('sst_tbody');
    if(tb) tb.innerHTML=buildRows();
    // Inject right panel
    const rp=document.getElementById('sst_right');
    if(rp) rp.innerHTML=buildRightPanel();
  },0);

  // Expose global functions
  window.sstSelect=(id)=>{
    window.sst_selectedId=id;
    window.sst_step=1;
    const r=window.sst_risks.find(x=>x.id===id);
    if(r?.statut==='Clôturé') window.sst_step=5;
    else if(r?.statut==='Traitement') window.sst_step=3;
    sstRefresh();
  };
  window.sstGoStep=(step)=>{
    const r=window.sst_risks.find(x=>x.id===window.sst_selectedId);
    if(!r) return;
    if(step===3&&r.statut==='Ouvert') sstUpdate(r.id,'statut','Traitement');
    if(step===5){ sstUpdate(r.id,'statut','Clôturé'); sstToast('🎉 Fiche clôturée avec succès !','#16a34a'); }
    window.sst_step=step;
    sstRefresh();
  };
  window.sstUpdate=(id,field,val)=>{
    const r=window.sst_risks.find(x=>x.id===id);
    if(!r) return;
    r[field]=(['g','f','d','rr_g','rr_f','rr_d'].includes(field))?+val:val;
    sstRefresh();
  };
  window.sstLive=(id,field,val,slider,col,lblId)=>{
    window.sstUpdate(id,field,val);
    const lbl=document.getElementById(lblId);
    if(lbl) lbl.textContent=val;
    const pct=(val-1)/4*100;
    slider.style.background=`linear-gradient(to right,${col} 0%,${col} ${pct}%,#e5e7eb ${pct}%)`;
    const r=window.sst_risks.find(x=>x.id===id);
    if(!r) return;
    const c=r.g*r.f*r.d, niv=getNiv(c), nc=getNivC(niv);
    const rc=r.rr_g*r.rr_f*r.rr_d, rniv=getNiv(rc), rnc=getNivC(rniv);
    const prev=document.getElementById(['rr_g','rr_f','rr_d'].includes(field)?`sst_rr_preview_${id}`:`sst_crit_preview_${id}`);
    if(prev){
      if(['rr_g','rr_f','rr_d'].includes(field)){
        prev.innerHTML=`<div style="background:${rnc.bg};border:1px solid ${rnc.bc};border-radius:7px;padding:7px;text-align:center;margin-bottom:13px"><span style="font-size:11px;font-weight:700;color:${rnc.tc}">${rniv==='Critique'?'🔴':rniv==='Élevé'?'🟠':rniv==='Moyen'?'🟡':'🟢'} ${rniv.toUpperCase()} — Risque résiduel = ${rc}</span></div>`;
        // Update the 4 score boxes
        const boxes=document.querySelectorAll('#sst_right [data-rr]');
      } else {
        prev.innerHTML=`<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:7px;margin-bottom:13px;padding:9px;background:${nc.bg};border:1px solid ${nc.bc};border-radius:8px">
          ${[['G',r.g,'#dc2626'],['F',r.f,'#ea580c'],['D',r.d,'#2563eb'],['C',c,nc.tc]].map(([l,v,cl])=>`<div style="text-align:center"><div style="font-size:18px;font-weight:800;color:${cl};font-family:monospace">${v}</div><div style="font-size:8px;color:var(--muted)">${l}</div></div>`).join('')}
          <div style="grid-column:1/-1;text-align:center;font-weight:700;color:${nc.tc};font-size:11px;padding-top:5px;border-top:1px solid ${nc.bc}">${niv==='Critique'?'🔴':niv==='Élevé'?'🟠':niv==='Moyen'?'🟡':'🟢'} ${niv} — Criticité = ${c}</div>
        </div>`;
      }
    }
  };
  window.sstDelete=(id)=>{
    if(!confirm('Supprimer le risque '+id+' ?')) return;
    window.sst_risks=window.sst_risks.filter(r=>r.id!==id);
    window.sst_selectedId=null;
    sstToast('🗑 Risque '+id+' supprimé','#dc2626');
    sstRefresh();
  };
  window.sstFilterCell=(g,f)=>{
    const tb=document.getElementById('sst_tbody');
    if(!tb) return;
    const filtered=window.sst_risks.filter(r=>r.g===g&&r.f===f);
    sstToast('🗺 Filtre G='+g+' × F='+f+' — '+filtered.length+' risque(s)','#2563eb');
    const getCrit=r=>r.g*r.f*r.d;const getNiv=c=>c>60?'Critique':c>30?'Élevé':c>10?'Moyen':'Faible';
    const getNivC=niv=>{if(niv==='Critique')return{bg:'#fef2f2',bc:'#fecaca',tc:'#991b1b'};if(niv==='Élevé')return{bg:'#fff7ed',bc:'#fed7aa',tc:'#9a3412'};if(niv==='Moyen')return{bg:'#fffbeb',bc:'#fde68a',tc:'#92400e'};return{bg:'#f0fdf4',bc:'#bbf7d0',tc:'#065f46'};};
    const getSC=s=>s==='Traitement'?'bb':s==='Clôturé'?'bg3':'bo';
    tb.innerHTML=filtered.map(r=>{const c=getCrit(r),niv=getNiv(c),nc=getNivC(niv),sc=getSC(r.statut),sel=r.id===window.sst_selectedId;return`<tr style="${sel?'background:#eff6ff;':''}cursor:pointer" onclick="sstSelect('${r.id}')"><td style="border-left:${sel?'3px solid var(--blue)':'3px solid transparent'};color:var(--blue);font-weight:700;font-family:monospace;font-size:10.5px">${r.id}</td><td style="font-size:10px">${r.zone}</td><td style="font-size:10px;color:var(--muted)">${r.unite}</td><td style="font-weight:600">${r.danger}</td><td style="color:var(--muted)">${r.risque}</td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fef2f2;color:#991b1b;font-size:11px;font-weight:800;font-family:monospace">${r.g}</span></td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fff7ed;color:#92400e;font-size:11px;font-weight:800;font-family:monospace">${r.f}</span></td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#eff6ff;color:#1e40af;font-size:11px;font-weight:800;font-family:monospace">${r.d}</span></td><td><span style="font-family:monospace;font-size:12px;font-weight:800;color:${nc.tc}">${c}</span></td><td><span style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${niv}</span></td><td style="font-size:10px">${r.resp}</td><td><span class="badge ${sc}">${r.statut}</span></td><td><button class="btn bsm" onclick="event.stopPropagation();sstSelect('${r.id}')">✏</button></td></tr>`;}).join('');
    document.getElementById('sst_count').textContent=filtered.length+' risque(s) filtrés';
  };
  window.sstRefresh=()=>{ goPage('sec-risques'); };
  window.sstNewRisk=()=>{
    const id='R-'+(String(window.sst_risks.length+1).padStart(3,'0'));
    window.sst_risks.push({id,zone:'Atelier usinage',unite:'—',processus:'—',danger:'Nouveau danger',risque:'Nouveau risque',dommage:'—',personnes:'—',situation:'Normal',g:3,f:3,d:3,action:'',respAction:'HSE',delai:'',resp:'HSE',statut:'Ouvert',rr_g:2,rr_f:2,rr_d:2});
    window.sst_selectedId=id;
    window.sst_step=1;
    sstToast('✅ Risque '+id+' créé — Complétez la fiche','#16a34a');
    sstRefresh();
  };
  window.sstToast=(msg,color='#0f2044')=>{
    const d=document.createElement('div');
    d.style.cssText='position:fixed;bottom:22px;right:22px;background:'+color+';color:#fff;padding:11px 16px;border-radius:9px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:8px;font-family:Inter,sans-serif';
    d.innerHTML=msg;
    document.body.appendChild(d);
    setTimeout(()=>{d.style.transition='opacity .4s';d.style.opacity='0';setTimeout(()=>d.remove(),400);},2800);
  };
  window.sstApplyFilter=()=>{
    const z=document.getElementById('sst_fZone')?.value||'';
    const n=document.getElementById('sst_fNiv')?.value||'';
    const s=document.getElementById('sst_fStat')?.value||'';
    const q=(document.getElementById('sst_fSearch')?.value||'').toLowerCase();
    const getCrit=r=>r.g*r.f*r.d;const getNiv=c=>c>60?'Critique':c>30?'Élevé':c>10?'Moyen':'Faible';
    const getNivC=niv=>{if(niv==='Critique')return{bg:'#fef2f2',bc:'#fecaca',tc:'#991b1b'};if(niv==='Élevé')return{bg:'#fff7ed',bc:'#fed7aa',tc:'#9a3412'};if(niv==='Moyen')return{bg:'#fffbeb',bc:'#fde68a',tc:'#92400e'};return{bg:'#f0fdf4',bc:'#bbf7d0',tc:'#065f46'};};
    const getSC=s=>s==='Traitement'?'bb':s==='Clôturé'?'bg3':'bo';
    const filtered=window.sst_risks.filter(r=>{const c=getCrit(r),niv=getNiv(c);return(!z||r.zone===z)&&(!n||niv===n)&&(!s||r.statut===s)&&(!q||r.danger.toLowerCase().includes(q)||r.risque.toLowerCase().includes(q)||r.id.toLowerCase().includes(q));});
    const tb=document.getElementById('sst_tbody');
    if(tb) tb.innerHTML=filtered.map(r=>{const c=getCrit(r),niv=getNiv(c),nc=getNivC(niv),sc=getSC(r.statut),sel=r.id===window.sst_selectedId;return`<tr style="${sel?'background:#eff6ff;':''}cursor:pointer" onclick="sstSelect('${r.id}')"><td style="border-left:${sel?'3px solid var(--blue)':'3px solid transparent'};color:var(--blue);font-weight:700;font-family:monospace;font-size:10.5px">${r.id}</td><td style="font-size:10px">${r.zone}</td><td style="font-size:10px;color:var(--muted)">${r.unite}</td><td style="font-weight:600">${r.danger}</td><td style="color:var(--muted)">${r.risque}</td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fef2f2;color:#991b1b;font-size:11px;font-weight:800;font-family:monospace">${r.g}</span></td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#fff7ed;color:#92400e;font-size:11px;font-weight:800;font-family:monospace">${r.f}</span></td><td style="text-align:center"><span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:18px;border-radius:4px;background:#eff6ff;color:#1e40af;font-size:11px;font-weight:800;font-family:monospace">${r.d}</span></td><td><span style="font-family:monospace;font-size:12px;font-weight:800;color:${nc.tc}">${c}</span></td><td><span style="background:${nc.bg};color:${nc.tc};border:1px solid ${nc.bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${niv}</span></td><td style="font-size:10px">${r.resp}</td><td><span class="badge ${sc}">${r.statut}</span></td><td><button class="btn bsm" onclick="event.stopPropagation();sstSelect('${r.id}')">✏</button></td></tr>`;}).join('');
    document.getElementById('sst_count').textContent=filtered.length<window.sst_risks.length?filtered.length+'/'+window.sst_risks.length+' risques':'';
  };

  return `
<style>
.sst-layout{display:flex;height:calc(100vh - 170px);overflow:hidden;margin:-16px -18px}
.sst-left{width:55%;display:flex;flex-direction:column;overflow:hidden;border-right:1px solid var(--border)}
.sst-right{width:45%;overflow-y:auto;background:var(--white)}
.sst-filter-bar{background:var(--white);border-bottom:1px solid var(--border);padding:8px 14px;display:flex;gap:7px;align-items:center;flex-shrink:0;flex-wrap:wrap}
.sst-table-area{flex:1;overflow-y:auto;padding:11px 14px}
.tbl tr.sst-sel td{background:#eff6ff}
.sst-hc{border-radius:4px;width:28px;height:28px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:8px;font-weight:700;font-family:monospace;cursor:pointer;position:relative;transition:all .15s}
.sst-hc:hover{transform:scale(1.12);z-index:2;box-shadow:0 2px 8px rgba(0,0,0,.25)}
input[type=range].sst-slider{-webkit-appearance:none;height:6px;border-radius:3px;outline:none;cursor:pointer;width:100%}
input[type=range].sst-slider::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--blue);cursor:pointer;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.2)}
</style>
<div class="sst-layout">
  <!-- LEFT -->
  <div class="sst-left">
    <div class="sst-filter-bar">
      <select class="sel" id="sst_fZone" onchange="sstApplyFilter()">
        <option value="">Zone: Toutes</option>
        ${['Atelier usinage','Assemblage','Maintenance','Bureau','Magasin','Bâtiment B'].map(z=>`<option>${z}</option>`).join('')}
      </select>
      <select class="sel" id="sst_fNiv" onchange="sstApplyFilter()">
        <option value="">Niveau: Tous</option><option>Critique</option><option>Élevé</option><option>Moyen</option><option>Faible</option>
      </select>
      <select class="sel" id="sst_fStat" onchange="sstApplyFilter()">
        <option value="">Statut: Tous</option><option>Ouvert</option><option>Traitement</option><option>Clôturé</option>
      </select>
      <input class="sel" id="sst_fSearch" placeholder="🔍 Rechercher..." style="width:130px" oninput="sstApplyFilter()">
      <button class="btn bsm" onclick="document.getElementById('sst_fZone').value='';document.getElementById('sst_fNiv').value='';document.getElementById('sst_fStat').value='';document.getElementById('sst_fSearch').value='';sstApplyFilter()">✕</button>
      <span id="sst_count" style="font-size:10px;color:var(--muted)"></span>
      <div style="margin-left:auto;display:flex;gap:5px;font-size:9.5px">
        ${[['#fef2f2','#fecaca','#991b1b','Critique (>60)'],['#fff7ed','#fed7aa','#9a3412','Élevé (31–60)'],['#fffbeb','#fde68a','#92400e','Moyen (11–30)'],['#f0fdf4','#bbf7d0','#065f46','Faible (1–10)']].map(([bg,bc,c,l])=>`<span style="background:${bg};color:${c};border:1px solid ${bc};padding:2px 7px;border-radius:4px;font-weight:700">${l}</span>`).join('')}
      </div>
    </div>
    <div class="sst-table-area">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px">
        <div style="font-size:12px;font-weight:700;color:var(--navy)">📋 Registre des risques SST — <span id="sst_total">${window.sst_risks?window.sst_risks.length:7} risques identifiés</span></div>
        <div style="display:flex;gap:6px">
          <button class="btn bsm bp" onclick="sstNewRisk()">+ Nouveau risque</button>
          <button class="btn bsm" onclick="sstToast('📥 Export Excel en cours...','#16a34a')">📥 Export</button>
        </div>
      </div>
      <table class="tbl">
        <thead><tr>
          <th>ID</th><th>Zone</th><th>Unité</th><th>Danger</th><th>Risque</th>
          <th style="text-align:center">G</th><th style="text-align:center">F</th><th style="text-align:center">D</th>
          <th>Criticité</th><th>Niveau</th><th>Resp.</th><th>Statut</th><th></th>
        </tr></thead>
        <tbody id="sst_tbody"></tbody>
      </table>

      <!-- HEATMAP -->
      <div class="card" style="margin-top:12px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px">
          <span class="ct">🗺 Matrice de criticité — Heatmap G × F</span>
          <span style="font-size:9px;color:var(--muted)">Cliquer pour filtrer</span>
        </div>
        <div style="display:flex;gap:12px;align-items:flex-start">
          <div>
            <div style="display:flex;align-items:flex-end;gap:5px">
              <div style="display:flex;flex-direction:column;justify-content:space-between;height:142px;padding:2px 0;margin-right:2px">
                ${[5,4,3,2,1].map(v=>`<div style="font-size:8.5px;color:var(--muted)">F=${v}</div>`).join('')}
              </div>
              <div>
                <div style="display:grid;grid-template-columns:repeat(5,28px);grid-template-rows:repeat(5,28px);gap:2px">${heatmap}</div>
                <div style="display:flex;justify-content:space-between;padding:3px 0 0;width:144px">
                  ${[1,2,3,4,5].map(v=>`<div style="font-size:8.5px;color:var(--muted);width:28px;text-align:center">G=${v}</div>`).join('')}
                </div>
              </div>
            </div>
          </div>
          <div style="flex:1">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:5px;margin-bottom:9px">${statsHtml}</div>
            <div style="display:flex;flex-direction:column;gap:4px">
              ${[['#dc2626','Critique (>60)'],['#f97316','Élevé (31–60)'],['#f59e0b','Moyen (11–30)'],['#10b981','Faible (1–10)']].map(([c,l])=>`<div style="display:flex;align-items:center;gap:6px;font-size:9.5px"><div style="width:11px;height:11px;border-radius:3px;background:${c}"></div>${l}</div>`).join('')}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- RIGHT PANEL -->
  <div class="sst-right" id="sst_right">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--muted);text-align:center;padding:30px">
      <div style="font-size:38px;margin-bottom:8px">📋</div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:4px">Sélectionner un risque</div>
      <div style="font-size:11px">Cliquez sur une ligne du tableau<br>pour voir et modifier la fiche</div>
    </div>
  </div>
</div>`;
},

'sec-checklists': () => `
<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:11px;margin-bottom:13px">
  ${[['🔥','Extincteurs','CH-EXT-001','Sécurité incendie','Mensuelle','V2','Validé','#f0fdf4','#bbf7d0','var(--green)','15/05/2025','15/06/2025',100,'sec-cl-ext'],
     ['🏥','Pharmacie','CH-PHAR-001','Premiers secours','Mensuelle','V1','Observation','#fff7ed','#fed7aa','var(--orange)','15/05/2025','15/06/2025',78,'sec-cl-phar'],
     ['🚗','Véhicule','CH-VEH-001','Transport','Hebdomadaire','V3','En révision','#fffbeb','#fde68a','var(--yellow)','10/05/2025','17/05/2025',65,'sec-cl-veh'],
     ['🦺','EPI','CH-EPI-001','Équipements','Mensuelle','V2','Observation','#fff7ed','#fed7aa','var(--orange)','08/05/2025','08/06/2025',82,'sec-cl-epi'],
     ['🚨','Évacuation','CH-EVAQ-001','Sécurité incendie','Trimestrielle','V1','Validé','#f0fdf4','#bbf7d0','var(--green)','05/05/2025','05/08/2025',100,'sec-cl-evaq'],
     ['⚙','Machines / SST','CH-MACH-001','Équipements','Mensuelle','V1','Validé','#f0fdf4','#bbf7d0','var(--green)','01/05/2025','01/06/2025',92,'sec-cl-sst'],
  ].map(([ic,nom,code,cat,freq,ver,statut,bg,bc,c,dern,proch,pct,pid])=>`
  <div style="background:var(--white);border:1px solid var(--border);border-radius:10px;overflow:hidden;cursor:pointer;transition:all .15s;box-shadow:0 1px 3px rgba(0,0,0,.04)" onmouseover="this.style.boxShadow='0 5px 18px rgba(0,0,0,.09)';this.style.transform='translateY(-2px)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,.04)';this.style.transform='none'">
    <div style="height:3px;background:${c}"></div>
    <div style="padding:11px 12px;display:flex;align-items:flex-start;gap:9px;border-bottom:1px solid var(--border)">
      <div style="width:34px;height:34px;border-radius:8px;background:${bg};display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">${ic}</div>
      <div style="flex:1"><div style="font-weight:700;font-size:11.5px;color:var(--navy)">${nom}</div><div style="font-size:9px;color:var(--muted)">${code} · ${cat}</div></div>
      <span style="background:${bg};color:${c};border:1px solid ${bc};border-radius:4px;padding:2px 7px;font-size:9px;font-weight:700">${statut}</span>
    </div>
    <div style="padding:10px 12px">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:9px">
        ${[['Fréquence',freq],['Version',ver],['Dernière',dern],['Prochaine',proch]].map(([k,v])=>`<div style="background:var(--bg);border-radius:5px;padding:5px 7px"><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div><div style="font-size:8.5px;color:var(--muted)">${k}</div></div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:7px;margin-bottom:8px">
        <div style="flex:1;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${pct}%;background:${c};border-radius:3px"></div></div>
        <span style="font-size:10px;font-weight:700;color:${c}">Conformité ${pct}%</span>
      </div>
      <div style="display:flex;gap:6px"><button class="btn" style="flex:1;font-size:10px" onclick="goPage('${pid}')">👁 Voir</button><button class="btn bp" style="flex:1;font-size:10px" onclick="goPage('${pid}')">✏ Remplir</button></div>
    </div>
  </div>`).join('')}
</div>
<div class="g23">
  <div class="card">
    <div class="ch"><span class="ct">🔥 Détail — Checklist Extincteurs (CH-EXT-001)</span><div style="display:flex;gap:6px;align-items:center"><span class="badge bg3">Validé — V2</span><button class="btn bsm bp" onclick="goPage('sec-cl-ext')">✏ Remplir</button></div></div>
    <div class="fgrid" style="grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px">
      ${[['Site','XPERT-MECA'],['ID Checklist','CH-EXT-001'],['Extincteur N°','EXT-05'],['Type','Poudre ABC'],['Emplacement','Atelier Usinage — Zone 1'],['Date inspection','15/05/2025'],['Inspecteur','Ali Mohamed'],['Prochaine inspection','15/06/2025']].map(([k,v])=>`<div><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:3px">${k}</div><div style="background:var(--bg);border:1px solid var(--border);border-radius:5px;padding:5px 7px;font-size:11px;font-weight:500">${v}</div></div>`).join('')}
    </div>
    <table class="tbl">
      <thead><tr><th>N°</th><th>Élément à vérifier</th><th>Oui</th><th>Non</th><th>Observation</th><th>État</th></tr></thead>
      <tbody>
        ${[['1','Extincteur approprié au bon endroit','✓','','OK'],['2','Accessibilité et visibilité correctes','✓','','OK'],['3',"Instructions d'utilisation lisibles",'✓','','Légèrement usées'],['4','Goupille bien en place','✓','','OK'],['5','Pression indicateur correcte (zone verte)','✓','','Pression correcte'],['6','Absence de dommage ou corrosion','','✗','À vérifier — traces suspectes'],['7',"Aucune obstruction du tuyau d'évacuation",'✓','','OK'],['8',"Carte d'inspection en place et à jour",'✓','','Valide jusqu\'au 06/2025'],['9','Fiche signalétique disponible','✓','','Disponible']].map(([n,e,ou,non,obs])=>`<tr>
          <td style="font-family:monospace;color:var(--muted)">${n}</td>
          <td style="font-weight:500">${e}</td>
          <td style="text-align:center;color:var(--green);font-weight:700;font-size:13px">${ou}</td>
          <td style="text-align:center;color:var(--red);font-weight:700;font-size:13px">${non}</td>
          <td style="color:var(--muted);font-size:10px">${obs}</td>
          <td style="text-align:center">${ou?'<span style="color:var(--green)">✓</span>':'<span style="color:var(--red)">✗</span>'}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px">
      <div><div style="font-size:9px;font-weight:600;color:var(--muted);margin-bottom:4px">OBSERVATION GÉNÉRALE</div><textarea class="fi" rows="2">RAS — Extincteur en bon état général. Point 6 à surveiller.</textarea></div>
      <div class="upload-box"><div style="font-size:20px;margin-bottom:5px">📷</div><div style="font-weight:600;margin-bottom:2px">Ajouter des photos</div><div style="font-size:10px">JPG, PNG — max 5Mo</div><div style="margin-top:5px;font-size:10px;color:var(--blue)">3 photo(s) jointe(s)</div></div>
    </div>
    <div style="display:flex;gap:7px;margin-top:10px">
      <button class="btn" style="flex:1">💾 Sauvegarder</button>
      <button class="btn bp" style="flex:1">📄 Exporter PDF</button>
      <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer NC</button>
    </div>
  </div>
  <div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🦺 Checklist EPI — CH-EPI-001</div>
      ${[['Département','Atelier Usinage'],['Poste','Opérateur CN'],['Responsable','Ali Mohamed'],['Date','15/05/2025']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500">${v}</span></div>`).join('')}
      <table class="tbl" style="margin-top:8px">
        <thead><tr><th>EPI</th><th>Oblig.</th><th>Dispo.</th><th>Conforme</th><th>Bon état</th><th>État</th></tr></thead>
        <tbody>${[['Casque de sécurité','Oui','Oui','Oui','Oui','OK'],['Lunettes de protection','Oui','Oui','Oui','Oui','OK'],['Gants de protection','Oui','Oui','Non','Oui','Alerte'],['Chaussures de sécurité','Oui','Oui','Oui','Oui','OK'],['Protection auditive','Non','Non','—','—','OK'],['Gilet haute visibilité','Oui','Oui','Oui','Oui','OK']].map(([epi,ob,di,co,be,e])=>`<tr>
          <td style="font-weight:500">${epi}</td>
          ${[ob,di,co,be].map(v=>`<td><span class="badge ${v==='Oui'?'bg3':v==='Non'?'br':'bgr'}">${v}</span></td>`).join('')}
          <td><span class="badge ${e==='OK'?'bg3':'br'}">${e}</span></td>
        </tr>`).join('')}</tbody>
      </table>
      <div style="display:flex;gap:7px;margin-top:9px"><button class="btn" style="flex:1">💾 Enregistrer</button><button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer NC</button></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">Résultats globaux — Inspection</div>
      ${[['Résultat global','Conforme','bg3'],['Criticité','Normale','bgr'],['Signature inspecteur','Ali Mohamed — ✓','bb'],['Signature HSE','A. Hadj-Ali — ✓','bb'],['Prochaine inspection','15/06/2025','bo']].map(([k,v,c])=>`<div class="drow"><span class="dk">${k}</span><span class="badge ${c}">${v}</span></div>`).join('')}
    </div>
  </div>
</div>`,

'sec-accidents': () => {
  /* ══ DATA ══ */
  if(!window.acc_data){
    window.acc_data = [
      {id:'A-2025-003',type:'Accident',date:'2025-05-20',heure:'10:30',employe:'Ali Mohammed',matricule:'OP-CN-2209',fonction:'Opérateur CN',anciennete:'3 ans',dept:'Usinage',lieu:'Atelier Usinage, Machine CN 05',blessure:'Coupure main gauche',gravite:'Grave',arret:'Oui',jours:7,temoins:'Ahmed Samir',soins:'Oui — sur site',desc:"Lors du changement de pièce sur la machine CN 05, l'opérateur a été blessé à la main gauche par la pièce en cours d'usinage.",pourquoi:["La main de l'opérateur a touché la pièce en rotation","Il n'y avait pas de protège-main en place","La protection a été retirée pour faciliter le changement","Absence de procédure de verrouillage (consignation)"],causeRacine:'Formation insuffisante et procédure consignation manquante',actions:[{titre:'Installer protection machine CN',resp:'HSE',delai:'2025-05-31',statut:'En cours'},{titre:'Former opérateurs à la consignation',resp:'RH + HSE',delai:'2025-06-15',statut:'Planifié'},{titre:'Créer procédure de consignation',resp:'HSE',delai:'2025-06-20',statut:'Planifié'}],statut:'En cours',step:3},
      {id:'A-2025-002',type:'Accident',date:'2025-05-05',heure:'14:15',employe:'Karim Saïd',matricule:'MT-AS-1104',fonction:'Monteur',anciennete:'5 ans',dept:'Assemblage',lieu:'Poste AS3',blessure:'Chute plein pied',gravite:'Légère',arret:'Non',jours:0,temoins:'Youssef A.',soins:'Oui — sur site',desc:'L\'opérateur a glissé sur le sol mouillé suite à une fuite non signalée.',pourquoi:['L\'opérateur a glissé sur le sol','Le sol était mouillé suite à une fuite','Absence de signalisation sol glissant'],causeRacine:'Absence de procédure de nettoyage et signalisation inadéquate',actions:[{titre:'Nettoyer et sécher le sol',resp:'Maintenance',delai:'2025-05-05',statut:'Clôturé'},{titre:'Installer panneaux sol glissant',resp:'HSE',delai:'2025-05-10',statut:'Clôturé'}],statut:'Clôturé',step:5},
      {id:'A-2025-001',type:'Accident',date:'2025-04-12',heure:'09:20',employe:'Youssef Ahmed',matricule:'EL-MT-0892',fonction:'Électricien',anciennete:'7 ans',dept:'Maintenance',lieu:'Local technique B',blessure:'Brûlure avant-bras',gravite:'Moyenne',arret:'Non',jours:0,temoins:'—',soins:'Oui — sur site',desc:'Contact accidentel avec surface chaude lors d\'une intervention sur équipement en température.',pourquoi:['Contact accidentel avec surface chaude','Absence de gant haute température','Procédure non respectée'],causeRacine:'Non-respect des EPI lors d\'intervention sur équipement en température',actions:[{titre:'Former aux EPI haute température',resp:'HSE',delai:'2025-04-30',statut:'Clôturé'}],statut:'Clôturé',step:5},
      {id:'I-2025-007',type:'Incident',date:'2025-05-18',heure:'08:45',employe:'Mehdi Rais',matricule:'LOG-MG-2210',fonction:'Magasinier',anciennete:'2 ans',dept:'Magasin',lieu:'Allée stockage B',blessure:'Presque-accident',gravite:'—',arret:'—',jours:0,temoins:'Ali M.',soins:'Non',desc:'Une charge a failli tomber du rayonnage lors d\'un déplacement de palette.',pourquoi:['Une charge a failli tomber du rayonnage','Le rayonnage était surchargé','Absence de contrôle des charges maximales'],causeRacine:'Absence de contrôle régulier du chargement des rayonnages',actions:[{titre:'Audit complet des rayonnages',resp:'HSE',delai:'2025-05-25',statut:'Planifié'},{titre:'Apposer étiquettes charge max.',resp:'Logistique',delai:'2025-05-30',statut:'Planifié'}],statut:'Ouvert',step:1},
    ];
    window.acc_sel = null;
    window.acc_view = 'list'; // 'list' | 'new'
    window.acc_newStep = 1;
    window.acc_detailTab = 'info'; // 'info'|'causes'|'actions'|'files'
  }

  const STEPS = ['Déclaré','Analyse','Actions','Validation','Clôture'];
  const gColor = g => g==='Grave'?{bg:'#fef2f2',tc:'#991b1b',bc:'#fecaca'}:g==='Moyenne'?{bg:'#fff7ed',tc:'#9a3412',bc:'#fed7aa'}:g==='Légère'?{bg:'#f0fdf4',tc:'#065f46',bc:'#bbf7d0'}:{bg:'#f9fafb',tc:'#6b7a99',bc:'#e5e7eb'};
  const sColor = s => s==='Clôturé'?'bg3':s==='En cours'?'by':s==='Ouvert'?'bb':'bgr';
  const fmtDate = d => { if(!d) return '—'; const p=d.split('-'); return p[2]+'/'+p[1]+'/'+p[0]; };

  /* ══ BUILD TABLE ROWS ══ */
  const buildRows = () => window.acc_data.map(a => {
    const gc=gColor(a.gravite), sc=sColor(a.statut), isSel=a.id===window.acc_sel;
    return `<tr onclick="accSelect('${a.id}')" style="cursor:pointer;${isSel?'background:#eff6ff;':''}" onmouseover="if('${a.id}'!=='${window.acc_sel||''}')this.style.background='#f8fafc'" onmouseout="if('${a.id}'!=='${window.acc_sel||''}')this.style.background=''">
      <td style="border-left:${isSel?'3px solid var(--blue)':'3px solid transparent'};font-family:monospace;font-weight:700;color:var(--blue);font-size:10.5px">${a.id}</td>
      <td><span class="badge ${a.type==='Accident'?'br':'bb'}" style="font-size:9px">${a.type}</span></td>
      <td style="font-size:10px">${fmtDate(a.date)}</td>
      <td style="font-family:monospace;font-size:10px">${a.heure}</td>
      <td style="font-weight:600">${a.employe}</td>
      <td style="font-size:10px;color:var(--muted)">${a.dept}</td>
      <td style="font-size:11px">${a.blessure}</td>
      <td><span style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc};border-radius:5px;padding:2px 7px;font-size:9px;font-weight:700">${a.gravite}</span></td>
      <td><span class="badge ${a.arret==='Oui'?'br':a.arret==='Non'?'bg3':'bgr'}" style="font-size:9px">${a.arret==='Oui'?'Oui — '+a.jours+'j':a.arret}</span></td>
      <td><span class="badge ${sc}">${a.statut}</span></td>
      <td><button class="btn bsm" onclick="event.stopPropagation();accSelect('${a.id}')">Voir →</button></td>
    </tr>`;
  }).join('');

  /* ══ BUILD RIGHT PANEL ══ */
  const buildRight = () => {
    if(window.acc_view==='new') return buildNewForm();
    if(!window.acc_sel) return `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--muted);text-align:center;padding:30px">
      <div style="font-size:40px">🚑</div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:5px">Sélectionner un dossier</div>
      <div style="font-size:11px">Cliquez sur une ligne pour voir<br>la fiche et le workflow</div>
      <button class="btn bp bsm" style="margin-top:10px" onclick="accNewView()">+ Déclarer un accident</button>
    </div>`;
    const a = window.acc_data.find(x=>x.id===window.acc_sel);
    if(!a) return '';
    const gc=gColor(a.gravite);
    const step=a.step||1;
    // Step indicator
    const stepBar = STEPS.map((l,i)=>{
      const n=i+1, done=n<step, active=n===step;
      return (i>0?`<div style="flex:1;height:2px;background:${done?'var(--green)':'#e5e7eb'};margin-top:12px;transition:background .3s"></div>`:'')
        +`<div style="display:flex;flex-direction:column;align-items:center">
          <div onclick="accGoStep('${a.id}',${n})" title="${l}" style="width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;cursor:pointer;transition:all .3s;
            background:${done?'var(--green)':active?'var(--blue)':'#e5e7eb'};
            color:${done||active?'#fff':'var(--muted)'};
            border:2px solid ${done?'var(--green)':active?'var(--blue)':'#e5e7eb'};
            box-shadow:${active?'0 0 0 4px rgba(37,99,235,.15)':'none'}">${done?'✓':n}</div>
          <div style="font-size:8px;margin-top:3px;white-space:nowrap;color:${active?'var(--blue)':done?'var(--green)':'var(--muted)'};font-weight:${active||done?'700':'400'}">${l}</div>
        </div>`;
    }).join('');

    // Detail tabs
    const tabs = ['info','causes','actions','files'];
    const tabLabels = ['Informations','Analyse 5P','Actions','Fichiers'];
    const tabBar = tabs.map((t,i)=>`<div onclick="accSetTab('${t}')" style="padding:6px 11px;font-size:11px;cursor:pointer;color:${window.acc_detailTab===t?'var(--blue)':'var(--muted)'};border-bottom:2px solid ${window.acc_detailTab===t?'var(--blue)':'transparent'};margin-bottom:-1px;font-weight:${window.acc_detailTab===t?'600':'400'};transition:all .12s">${tabLabels[i]}</div>`).join('');

    // Tab content
    let tabContent='';
    if(window.acc_detailTab==='info'){
      tabContent=`
        <div style="display:flex;flex-direction:column;gap:0">
          ${[['Employé',a.employe],['Matricule',a.matricule],['Fonction',a.fonction],['Ancienneté',a.anciennete],['Département',a.dept],['Date & Heure',fmtDate(a.date)+' — '+a.heure],['Lieu',a.lieu],['Type blessure',a.blessure],['Gravité',a.gravite],['Avec arrêt',a.arret==='Oui'?'Oui — '+a.jours+' jour(s)':a.arret],['Témoins',a.temoins],['Premiers soins',a.soins]].map(([k,v])=>`
          <div class="drow" style="padding:4px 0">
            <span class="dk">${k}</span>
            <span style="font-weight:600;font-size:11px;max-width:60%;text-align:right">${v}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:9px;padding:9px;background:#f8fafc;border:1px solid var(--border);border-radius:7px">
          <div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:4px">Description</div>
          <div style="font-size:11px;line-height:1.5;color:var(--text)">${a.desc}</div>
        </div>`;
    } else if(window.acc_detailTab==='causes'){
      tabContent=`
        <div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:9px">Méthode des 5 Pourquoi</div>
        ${a.pourquoi.map((p,i)=>`
        <div style="padding:7px 10px 7px 12px;border-left:3px solid ${i<a.pourquoi.length-1?'#bfdbfe':'#fecaca'};background:${i<a.pourquoi.length-1?'#f8fafc':'#fef9f9'};border-radius:0 7px 7px 0;margin-bottom:6px">
          <div style="font-size:9px;font-weight:700;color:${i<a.pourquoi.length-1?'var(--blue)':'var(--red)'};text-transform:uppercase;margin-bottom:2px">Pourquoi ${i+1}</div>
          <div style="font-size:11px;font-weight:500">${p}</div>
        </div>`).join('')}
        <div style="background:#fef2f2;border:1px solid #fecaca;border-radius:8px;padding:10px;margin-top:5px">
          <div style="font-size:9px;font-weight:700;color:var(--red);text-transform:uppercase;margin-bottom:4px">🎯 Cause racine identifiée</div>
          <div style="font-size:11.5px;font-weight:600;color:#991b1b">${a.causeRacine}</div>
        </div>`;
    } else if(window.acc_detailTab==='actions'){
      tabContent=`
        ${a.actions.map((act,i)=>`
        <div style="background:#f8fafc;border:1px solid var(--border);border-radius:8px;padding:10px;margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px">
            <span style="font-size:11px;font-weight:600;flex:1">${act.titre}</span>
            <span class="badge ${act.statut==='Clôturé'?'bg3':act.statut==='En cours'?'bb':'bgr'}" style="font-size:9px;margin-left:6px">${act.statut}</span>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:9.5px;color:var(--muted);margin-bottom:7px">
            <span>👤 ${act.resp}</span><span>⏰ ${fmtDate(act.delai)}</span>
          </div>
          ${act.statut!=='Clôturé'?`<button onclick="accCloseAction('${a.id}',${i})" style="width:100%;padding:5px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:5px;color:var(--green);font-size:10px;font-weight:600;cursor:pointer;font-family:Inter,sans-serif">✓ Marquer comme clôturé</button>`:'<div style="text-align:center;font-size:10px;color:var(--green);font-weight:600">✅ Action clôturée</div>'}
        </div>`).join('')}
        <button onclick="accAddAction('${a.id}')" class="btn" style="width:100%;font-size:11px;margin-top:4px">+ Ajouter une action</button>`;
    } else {
      tabContent=`
        <div style="border:1.5px dashed var(--border);border-radius:8px;padding:18px;text-align:center;background:#fafbfc;margin-bottom:10px;cursor:pointer">
          <div style="font-size:22px;margin-bottom:6px">📎</div>
          <div style="font-weight:600;margin-bottom:3px;font-size:12px">Déposer vos fichiers</div>
          <div style="font-size:10px;color:var(--muted)">Photos, rapports, témoignages — JPG, PDF</div>
          <button class="btn bsm" style="margin-top:8px">Parcourir</button>
        </div>
        <div style="font-size:11px;color:var(--muted);margin-bottom:6px">2 fichier(s) joint(s)</div>
        ${[['photo_accident.jpg','Photo','120 Ko'],['rapport_medical.pdf','Rapport','240 Ko']].map(([n,t,s])=>`
        <div style="display:flex;align-items:center;gap:8px;padding:7px 9px;background:#f8fafc;border:1px solid var(--border);border-radius:6px;margin-bottom:6px">
          <span style="font-size:18px">${t==='Photo'?'🖼':'📄'}</span>
          <div style="flex:1"><div style="font-size:11px;font-weight:500">${n}</div><div style="font-size:9.5px;color:var(--muted)">${t} · ${s}</div></div>
          <button class="btn bsm">👁</button>
        </div>`).join('')}`;
    }

    const isClosed = a.statut==='Clôturé';
    return `
      <!-- FICHE HEADER -->
      <div style="padding:12px 15px;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:10">
        <div>
          <div style="font-size:13px;font-weight:800;color:var(--navy)">${a.id} — ${a.employe}</div>
          <div style="font-size:10px;color:var(--muted);margin-top:1px">${a.dept} · ${fmtDate(a.date)} · ${a.heure}</div>
        </div>
        <div style="display:flex;gap:5px;align-items:center">
          <span style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc};border-radius:6px;padding:3px 9px;font-size:10px;font-weight:700">${a.gravite}</span>
          <span class="badge ${sColor(a.statut)}">${a.statut}</span>
          <button onclick="accDelete('${a.id}')" class="btn bsm" style="color:var(--red);border-color:#fecaca">🗑</button>
        </div>
      </div>
      <!-- WORKFLOW -->
      <div style="display:flex;align-items:center;padding:10px 15px;background:#f8fafc;border-bottom:1px solid var(--border);flex-shrink:0">${stepBar}</div>
      ${!isClosed?`<div style="padding:8px 15px;background:var(--white);border-bottom:1px solid var(--border);display:flex;gap:6px">
        <button onclick="accGoStep('${a.id}',${Math.max(1,step-1)})" class="btn bsm" ${step<=1?'disabled style="opacity:.4"':''}>← Précédent</button>
        <div style="flex:1"></div>
        ${step<5?`<button onclick="accGoStep('${a.id}',${step+1})" class="btn bsm bp">${step===4?'✓ Valider & Clôturer →':'Étape suivante : '+STEPS[step]+' →'}</button>`:''}
      </div>`:`<div style="padding:8px 15px;background:#f0fdf4;border-bottom:1px solid #bbf7d0;text-align:center;font-size:10px;font-weight:700;color:var(--green)">✅ Dossier clôturé — <span onclick="accGoStep('${a.id}',3)" style="cursor:pointer;text-decoration:underline;color:var(--blue)">Rouvrir</span></div>`}
      <!-- DETAIL TABS -->
      <div style="display:flex;border-bottom:1px solid var(--border);padding:0 15px;background:var(--white)">${tabBar}</div>
      <!-- TAB CONTENT -->
      <div style="padding:13px 15px">${tabContent}</div>
      <!-- FOOTER ACTIONS -->
      <div style="padding:10px 15px;border-top:1px solid var(--border);display:flex;gap:7px;position:sticky;bottom:0;background:var(--white)">
        <button class="btn bsm" style="flex:1" onclick="accToast('💾 Brouillon sauvegardé','#6b7a99')">💾 Brouillon</button>
        <button class="btn bsm bp" style="flex:1" onclick="accToast('✅ Dossier enregistré','#16a34a')">✓ Enregistrer</button>
        <button class="btn bsm" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca" onclick="accToast('📄 Rapport PDF généré','#16a34a')">📄 PDF</button>
      </div>`;
  };

  /* ══ NEW FORM ══ */
  const buildNewForm = () => {
    const ns = window.acc_newStep||1;
    const stepLabels=['Informations','Analyse des causes','Actions correctives','Pièces jointes'];
    const stepBar = stepLabels.map((l,i)=>{
      const n=i+1,done=n<ns,active=n===ns;
      return (i>0?`<div style="flex:1;height:2px;background:${done?'var(--blue)':'#e5e7eb'};margin-top:10px"></div>`:'')
        +`<div style="display:flex;flex-direction:column;align-items:center">
          <div style="width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:700;cursor:pointer;
            background:${done?'var(--blue)':active?'var(--blue)':'#e5e7eb'};
            color:${done||active?'#fff':'var(--muted)'};border:2px solid ${done?'var(--blue)':active?'var(--blue)':'#e5e7eb'};
            ${active?'box-shadow:0 0 0 3px rgba(37,99,235,.15)':''}">${done?'✓':n}</div>
          <div style="font-size:8px;margin-top:3px;white-space:nowrap;color:${active?'var(--blue)':done?'var(--muted)':'var(--muted)'};font-weight:${active?'700':'400'}">${l}</div>
        </div>`;
    }).join('');

    let body='';
    if(ns===1){
      body=`<div style="display:grid;grid-template-columns:1fr 1fr;gap:9px">
        <div class="fg"><label class="fl">Employé <span>*</span></label><input class="fi" id="na_emp" placeholder="Nom complet"></div>
        <div class="fg"><label class="fl">Matricule</label><input class="fi" id="na_mat" placeholder="Ex: OP-CN-2209"></div>
        <div class="fg"><label class="fl">Département <span>*</span></label><select class="fi" id="na_dept"><option>Usinage</option><option>Assemblage</option><option>Maintenance</option><option>Magasin</option><option>Bureau</option></select></div>
        <div class="fg"><label class="fl">Fonction</label><input class="fi" id="na_fonc" placeholder="Ex: Opérateur CN"></div>
        <div class="fg"><label class="fl">Type d'événement <span>*</span></label><select class="fi" id="na_type"><option>Accident de travail</option><option>Incident</option><option>Presque-accident</option></select></div>
        <div class="fg"><label class="fl">Gravité <span>*</span></label><select class="fi" id="na_grav"><option>Légère</option><option>Moyenne</option><option>Grave</option><option>Mortelle</option></select></div>
        <div class="fg"><label class="fl">Date <span>*</span></label><input class="fi" type="date" id="na_date" value="${new Date().toISOString().split('T')[0]}"></div>
        <div class="fg"><label class="fl">Heure</label><input class="fi" type="time" id="na_heure" value="08:00"></div>
        <div class="fg"><label class="fl">Avec arrêt?</label><select class="fi" id="na_arret"><option value="Non">Non</option><option value="Oui">Oui</option></select></div>
        <div class="fg"><label class="fl">Jours perdus</label><input class="fi" type="number" id="na_jours" value="0" min="0"></div>
        <div class="fg" style="grid-column:1/-1"><label class="fl">Lieu <span>*</span></label><input class="fi" id="na_lieu" placeholder="Ex: Atelier Usinage, Poste CN05"></div>
        <div class="fg" style="grid-column:1/-1"><label class="fl">Type de blessure <span>*</span></label><input class="fi" id="na_blessure" placeholder="Ex: Coupure main gauche"></div>
        <div class="fg" style="grid-column:1/-1"><label class="fl">Description détaillée <span>*</span></label><textarea class="fi" rows="3" id="na_desc" placeholder="Décrire le déroulement de l'accident..."></textarea></div>
        <div class="fg"><label class="fl">Témoins</label><input class="fi" id="na_temoins" placeholder="Noms des témoins"></div>
        <div class="fg"><label class="fl">Premiers soins?</label><select class="fi" id="na_soins"><option>Non</option><option>Oui — sur site</option><option>Hospitalisation</option></select></div>
      </div>`;
    } else if(ns===2){
      body=`<div style="font-size:10px;color:var(--muted);margin-bottom:10px">Identifier les causes profondes par la méthode des 5 Pourquoi</div>
      ${[1,2,3,4].map(i=>`<div class="fg" style="margin-bottom:9px"><label class="fl">Pourquoi ${i} ${i===1?'<span style="color:var(--red)">*</span>':''}</label><input class="fi" id="na_p${i}" placeholder="Pourquoi ${i}..."></div>`).join('')}
      <div class="fg" style="margin-bottom:9px"><label class="fl" style="color:var(--red)">Cause racine identifiée <span>*</span></label><textarea class="fi" rows="2" id="na_cr" placeholder="Cause profonde identifiée après analyse..."></textarea></div>`;
    } else if(ns===3){
      body=`<div style="font-size:10px;color:var(--muted);margin-bottom:10px">Définir au moins une action corrective</div>
      <div id="na_actions_list">
        ${[['Installer protection machine CN','HSE','2025-05-31'],['Former opérateurs à la consignation','RH + HSE','2025-06-15']].map((act,i)=>`
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:7px;margin-bottom:7px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:9px">
          <input class="fi" value="${act[0]}" placeholder="Action corrective...">
          <input class="fi" value="${act[1]}" placeholder="Responsable">
          <input class="fi" type="date" value="${act[2]}">
        </div>`).join('')}
      </div>
      <button onclick="accAddNewAction()" class="btn" style="width:100%;font-size:10px;margin-top:4px">+ Ajouter une action</button>`;
    } else {
      body=`<div style="border:1.5px dashed var(--border);border-radius:8px;padding:20px;text-align:center;background:#fafbfc;margin-bottom:10px;cursor:pointer">
        <div style="font-size:28px;margin-bottom:8px">📎</div>
        <div style="font-weight:600;margin-bottom:3px">Ajouter des pièces jointes</div>
        <div style="font-size:10px;color:var(--muted);margin-top:4px">Photos du lieu, rapport médical, témoignages...</div>
        <button class="btn bsm" style="margin-top:9px">Parcourir</button>
      </div>
      <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:8px;padding:10px;text-align:center;font-size:11px;color:#065f46;font-weight:600">
        ✅ Dossier prêt à être enregistré
      </div>`;
    }

    return `
      <div style="padding:13px 15px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;background:var(--white);z-index:10">
        <div>
          <div style="font-size:13px;font-weight:800;color:var(--navy)">📋 Déclarer un accident / incident</div>
          <div style="font-size:10px;color:var(--muted);margin-top:1px">Étape ${ns}/${stepLabels.length} — ${stepLabels[ns-1]}</div>
        </div>
        <button onclick="window.acc_view='list';window.acc_newStep=1;accRefresh()" class="btn bsm" style="font-size:14px;padding:2px 8px">✕</button>
      </div>
      <div style="display:flex;align-items:center;padding:10px 15px;background:#f8fafc;border-bottom:1px solid var(--border)">${stepBar}</div>
      <div style="padding:14px 15px">${body}</div>
      <div style="padding:10px 15px;border-top:1px solid var(--border);display:flex;gap:7px;position:sticky;bottom:0;background:var(--white)">
        ${ns>1?`<button onclick="window.acc_newStep=${ns-1};accRefresh()" class="btn bsm">← Précédent</button>`:'<span></span>'}
        <div style="flex:1"></div>
        ${ns<4?`<button onclick="window.acc_newStep=${ns+1};accRefresh()" class="btn bsm bp">Suivant : ${stepLabels[ns]} →</button>`:`<button onclick="accSaveNew()" class="btn bsm bg2">✅ Enregistrer la déclaration</button>`}
      </div>`;
  };

  /* ══ KPI CARDS ══ */
  const totalAcc = window.acc_data.filter(a=>a.type==='Accident').length;
  const avecArret = window.acc_data.filter(a=>a.arret==='Oui').length;
  const joursTotal = window.acc_data.reduce((s,a)=>s+(+a.jours||0),0);
  const incidents = window.acc_data.filter(a=>a.type==='Incident').length;

  /* ══ EXPOSE GLOBALS ══ */
  setTimeout(()=>{
    const tb=document.getElementById('acc_tbody');
    if(tb) tb.innerHTML=buildRows();
    const rp=document.getElementById('acc_right');
    if(rp) rp.innerHTML=buildRight();
    // Counts
    const cnt=document.getElementById('acc_cnt');
    if(cnt) cnt.textContent=window.acc_data.length+' dossier(s)';
  },0);

  window.accSelect=(id)=>{
    window.acc_sel=id;
    window.acc_view='list';
    window.acc_detailTab='info';
    accRefresh();
  };
  window.accGoStep=(id,step)=>{
    const a=window.acc_data.find(x=>x.id===id);
    if(!a) return;
    a.step=step;
    if(step===5){ a.statut='Clôturé'; accToast('🎉 Dossier '+id+' clôturé !','#16a34a'); }
    else if(step>=3 && a.statut==='Ouvert') a.statut='En cours';
    accRefresh();
  };
  window.accSetTab=(tab)=>{ window.acc_detailTab=tab; accRefresh(); };
  window.accCloseAction=(id,idx)=>{
    const a=window.acc_data.find(x=>x.id===id);
    if(a&&a.actions[idx]) a.actions[idx].statut='Clôturé';
    accToast('✅ Action clôturée','#16a34a');
    accRefresh();
  };
  window.accAddAction=(id)=>{
    const a=window.acc_data.find(x=>x.id===id);
    if(a){ a.actions.push({titre:'Nouvelle action',resp:'HSE',delai:new Date().toISOString().split('T')[0],statut:'Planifié'}); }
    window.acc_detailTab='actions';
    accToast('➕ Action ajoutée','#2563eb');
    accRefresh();
  };
  window.accDelete=(id)=>{
    if(!confirm('Supprimer le dossier '+id+' ?')) return;
    window.acc_data=window.acc_data.filter(x=>x.id!==id);
    window.acc_sel=null;
    accToast('🗑 Dossier '+id+' supprimé','#dc2626');
    accRefresh();
  };
  window.accNewView=()=>{ window.acc_view='new'; window.acc_newStep=1; accRefresh(); };
  window.accAddNewAction=()=>{
    const list=document.getElementById('na_actions_list');
    if(!list) return;
    const div=document.createElement('div');
    div.style='display:grid;grid-template-columns:2fr 1fr 1fr;gap:7px;margin-bottom:7px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:9px';
    div.innerHTML=`<input class="fi" placeholder="Action corrective..."><input class="fi" placeholder="Responsable"><input class="fi" type="date" value="${new Date().toISOString().split('T')[0]}">`;
    list.appendChild(div);
  };
  window.accSaveNew=()=>{
    const emp=(document.getElementById('na_emp')?.value||'').trim()||'Employé';
    const dept=document.getElementById('na_dept')?.value||'Usinage';
    const type=document.getElementById('na_type')?.value||'Accident de travail';
    const grav=document.getElementById('na_grav')?.value||'Légère';
    const date=document.getElementById('na_date')?.value||new Date().toISOString().split('T')[0];
    const heure=document.getElementById('na_heure')?.value||'08:00';
    const arret=document.getElementById('na_arret')?.value||'Non';
    const jours=+(document.getElementById('na_jours')?.value||0);
    const lieu=document.getElementById('na_lieu')?.value||'—';
    const blessure=document.getElementById('na_blessure')?.value||'—';
    const desc=document.getElementById('na_desc')?.value||'—';
    const temoins=document.getElementById('na_temoins')?.value||'—';
    const soins=document.getElementById('na_soins')?.value||'Non';
    const p1=document.getElementById('na_p1')?.value||'';
    const p2=document.getElementById('na_p2')?.value||'';
    const p3=document.getElementById('na_p3')?.value||'';
    const p4=document.getElementById('na_p4')?.value||'';
    const cr=document.getElementById('na_cr')?.value||'—';
    const year=new Date().getFullYear();
    const nb=String(window.acc_data.filter(a=>a.id.startsWith('A-'+year)||a.id.startsWith('I-'+year)).length+1).padStart(3,'0');
    const prefix=type==='Accident de travail'?'A':'I';
    const newId=`${prefix}-${year}-${nb}`;
    window.acc_data.unshift({
      id:newId,type:type==='Accident de travail'?'Accident':'Incident',
      date,heure,employe:emp,matricule:document.getElementById('na_mat')?.value||'—',
      fonction:document.getElementById('na_fonc')?.value||'—',anciennete:'—',
      dept,lieu,blessure,gravite:grav,arret,jours,temoins,soins,desc,
      pourquoi:[p1,p2,p3,p4].filter(Boolean),causeRacine:cr,
      actions:[{titre:'Action à définir',resp:'HSE',delai:new Date().toISOString().split('T')[0],statut:'Planifié'}],
      statut:'Ouvert',step:1
    });
    window.acc_view='list';
    window.acc_sel=newId;
    window.acc_newStep=1;
    window.acc_detailTab='info';
    accToast('✅ Dossier '+newId+' créé','#16a34a');
    accRefresh();
  };
  window.accFilter=()=>{
    const q=(document.getElementById('acc_search')?.value||'').toLowerCase();
    const st=document.getElementById('acc_fstat')?.value||'';
    const gr=document.getElementById('acc_fgrav')?.value||'';
    const dt=document.getElementById('acc_fdept')?.value||'';
    const filtered=window.acc_data.filter(a=>
      (!q||a.employe.toLowerCase().includes(q)||a.id.toLowerCase().includes(q)||a.blessure.toLowerCase().includes(q)||a.dept.toLowerCase().includes(q))
      &&(!st||a.statut===st)&&(!gr||a.gravite===gr)&&(!dt||a.dept===dt)
    );
    const tb=document.getElementById('acc_tbody');
    if(tb){
      const fmtDate=d=>{if(!d)return'—';const p=d.split('-');return p[2]+'/'+p[1]+'/'+p[0];};
      const gColor=g=>g==='Grave'?{bg:'#fef2f2',tc:'#991b1b',bc:'#fecaca'}:g==='Moyenne'?{bg:'#fff7ed',tc:'#9a3412',bc:'#fed7aa'}:g==='Légère'?{bg:'#f0fdf4',tc:'#065f46',bc:'#bbf7d0'}:{bg:'#f9fafb',tc:'#6b7a99',bc:'#e5e7eb'};
      const sColor=s=>s==='Clôturé'?'bg3':s==='En cours'?'by':s==='Ouvert'?'bb':'bgr';
      tb.innerHTML=filtered.map(a=>{const gc=gColor(a.gravite),sc=sColor(a.statut),isSel=a.id===window.acc_sel;return`<tr onclick="accSelect('${a.id}')" style="cursor:pointer;${isSel?'background:#eff6ff;':''}" onmouseover="if('${a.id}'!=='${window.acc_sel||''}')this.style.background='#f8fafc'" onmouseout="if('${a.id}'!=='${window.acc_sel||''}')this.style.background=''"><td style="border-left:${isSel?'3px solid var(--blue)':'3px solid transparent'};font-family:monospace;font-weight:700;color:var(--blue);font-size:10.5px">${a.id}</td><td><span class="badge ${a.type==='Accident'?'br':'bb'}" style="font-size:9px">${a.type}</span></td><td style="font-size:10px">${fmtDate(a.date)}</td><td style="font-family:monospace;font-size:10px">${a.heure}</td><td style="font-weight:600">${a.employe}</td><td style="font-size:10px;color:var(--muted)">${a.dept}</td><td style="font-size:11px">${a.blessure}</td><td><span style="background:${gc.bg};color:${gc.tc};border:1px solid ${gc.bc};border-radius:5px;padding:2px 7px;font-size:9px;font-weight:700">${a.gravite}</span></td><td><span class="badge ${a.arret==='Oui'?'br':a.arret==='Non'?'bg3':'bgr'}" style="font-size:9px">${a.arret==='Oui'?'Oui — '+a.jours+'j':a.arret}</span></td><td><span class="badge ${sc}">${a.statut}</span></td><td><button class="btn bsm" onclick="event.stopPropagation();accSelect('${a.id}')">Voir →</button></td></tr>`;}).join('');
      const cnt=document.getElementById('acc_cnt');
      if(cnt) cnt.textContent=filtered.length<window.acc_data.length?filtered.length+'/'+window.acc_data.length+' dossier(s)':window.acc_data.length+' dossier(s)';
    }
  };
  window.accRefresh=()=>{ goPage('sec-accidents'); };
  window.accToast=(msg,color='#0f2044')=>{
    const d=document.createElement('div');
    d.style=`position:fixed;bottom:22px;right:22px;background:${color};color:#fff;padding:11px 16px;border-radius:9px;font-size:12px;font-weight:600;z-index:9999;box-shadow:0 6px 20px rgba(0,0,0,.25);font-family:Inter,sans-serif`;
    d.textContent=msg;
    document.body.appendChild(d);
    setTimeout(()=>{d.style.transition='opacity .4s';d.style.opacity='0';setTimeout(()=>d.remove(),400);},2800);
  };

  return `
<style>
.acc-layout{display:flex;height:calc(100vh - 170px);overflow:hidden;margin:-16px -18px}
.acc-left{width:58%;display:flex;flex-direction:column;overflow:hidden;border-right:1px solid var(--border)}
.acc-right{width:42%;overflow-y:auto;background:var(--white)}
.acc-filter{background:var(--white);border-bottom:1px solid var(--border);padding:8px 14px;display:flex;gap:7px;flex-wrap:wrap;align-items:center;flex-shrink:0}
.acc-table-area{flex:1;overflow-y:auto;padding:11px 14px}
</style>

<!-- KPI ROW -->
<div style="display:grid;grid-template-columns:repeat(6,1fr);gap:9px;margin-bottom:13px">
  ${[['🚨',totalAcc,'Accidents','#fef2f2','var(--red)'],['⚠',incidents,'Incidents','#fff7ed','var(--orange)'],['📅',avecArret,'Avec arrêt','#fef2f2','var(--red)'],['🗓',joursTotal,'Jours perdus','#fff7ed','var(--orange)'],['📊','2.45','Taux fréquence (TF)','#eff6ff','var(--blue)'],['🟢','12','Jours sans accident','#f0fdf4','var(--green)']].map(([ic,v,l,bg,c])=>`
  <div style="background:${bg};border-radius:9px;padding:11px;text-align:center;cursor:pointer">
    <div style="font-size:15px;margin-bottom:4px">${ic}</div>
    <div style="font-size:18px;font-weight:800;color:${c};font-family:monospace;margin-bottom:2px">${v}</div>
    <div style="font-size:9px;color:var(--muted)">${l}</div>
  </div>`).join('')}
</div>

<div class="acc-layout">
  <!-- LEFT -->
  <div class="acc-left">
    <div class="acc-filter">
      <input class="sel" id="acc_search" placeholder="🔍 Employé, N° dossier..." style="width:150px" oninput="accFilter()">
      <select class="sel" id="acc_fstat" onchange="accFilter()">
        <option value="">Statut: Tous</option><option>Ouvert</option><option>En cours</option><option>Clôturé</option>
      </select>
      <select class="sel" id="acc_fgrav" onchange="accFilter()">
        <option value="">Gravité: Tous</option><option>Légère</option><option>Moyenne</option><option>Grave</option><option>Mortelle</option>
      </select>
      <select class="sel" id="acc_fdept" onchange="accFilter()">
        <option value="">Département: Tous</option>
        ${['Usinage','Assemblage','Maintenance','Magasin','Bureau'].map(d=>`<option>${d}</option>`).join('')}
      </select>
      <button class="btn bsm" onclick="document.getElementById('acc_search').value='';document.getElementById('acc_fstat').value='';document.getElementById('acc_fgrav').value='';document.getElementById('acc_fdept').value='';accFilter()">✕</button>
      <span id="acc_cnt" style="font-size:10px;color:var(--muted)"></span>
    </div>
    <div class="acc-table-area">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:9px">
        <span style="font-size:12px;font-weight:700;color:var(--navy)">📋 Registre des accidents & incidents</span>
        <div style="display:flex;gap:6px">
          <button class="btn bsm bp" onclick="accNewView()">+ Déclarer un accident</button>
          <button class="btn bsm" onclick="accToast('📥 Export Excel','#16a34a')">📥 Export</button>
        </div>
      </div>
      <table class="tbl">
        <thead><tr>
          <th>N° Dossier</th><th>Type</th><th>Date</th><th>Heure</th>
          <th>Employé</th><th>Département</th><th>Blessure</th>
          <th>Gravité</th><th>Arrêt</th><th>Statut</th><th></th>
        </tr></thead>
        <tbody id="acc_tbody"></tbody>
      </table>

      <!-- MINI STATS -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:13px">
        <div class="card" style="margin-bottom:0">
          <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Accidents par département</div>
          ${['Usinage','Assemblage','Maintenance','Magasin'].map(d=>{
            const cnt=window.acc_data.filter(a=>a.dept===d).length;
            const pct=Math.round(cnt/Math.max(window.acc_data.length,1)*100);
            return`<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
              <span style="font-size:10px;flex:1">${d}</span>
              <div style="width:60px;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${pct}%;background:var(--red);border-radius:3px"></div></div>
              <span style="font-size:10px;font-weight:700;font-family:monospace;color:var(--red);width:14px">${cnt}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="card" style="margin-bottom:0">
          <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Par gravité</div>
          ${[['Grave','var(--red)'],['Moyenne','var(--orange)'],['Légère','var(--green)'],['—','var(--muted)']].map(([g,c])=>{
            const cnt=window.acc_data.filter(a=>a.gravite===g).length;
            return`<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
              <span style="font-size:10px;flex:1">${g}</span>
              <div style="width:60px;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${Math.round(cnt/Math.max(window.acc_data.length,1)*100)}%;background:${c};border-radius:3px"></div></div>
              <span style="font-size:10px;font-weight:700;font-family:monospace;color:${c};width:14px">${cnt}</span>
            </div>`;
          }).join('')}
        </div>
        <div class="card" style="margin-bottom:0">
          <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Par statut</div>
          ${[['Ouvert','var(--blue)'],['En cours','var(--orange)'],['Clôturé','var(--green)']].map(([s,c])=>{
            const cnt=window.acc_data.filter(a=>a.statut===s).length;
            return`<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px">
              <span style="font-size:10px;flex:1">${s}</span>
              <div style="width:60px;height:5px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${Math.round(cnt/Math.max(window.acc_data.length,1)*100)}%;background:${c};border-radius:3px"></div></div>
              <span style="font-size:10px;font-weight:700;font-family:monospace;color:${c};width:14px">${cnt}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- RIGHT -->
  <div class="acc-right" id="acc_right">
    <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:10px;color:var(--muted);text-align:center;padding:30px">
      <div style="font-size:40px">🚑</div>
      <div style="font-size:13px;font-weight:700;color:var(--navy);margin-bottom:5px">Sélectionner un dossier</div>
      <div style="font-size:11px">Cliquez sur une ligne pour voir<br>la fiche et le workflow</div>
      <button onclick="accNewView()" class="btn bp bsm" style="margin-top:10px">+ Déclarer un accident</button>
    </div>
  </div>
</div>`;
},

'sec-urgence': () => `
<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
  ${[['🔥','4',"Plans d'urgence actifs",'#fef2f2','var(--red)'],['🚒','3/5','Exercices réalisés 2025','#f0fdf4','var(--green)'],['📞','6',"Contacts d'urgence",'#eff6ff','var(--blue)'],['📅','2','Exercices planifiés','#fff7ed','var(--orange)']].map(([ic,v,l,bg,c])=>`<div style="background:${bg};border-radius:9px;padding:12px;text-align:center"><div style="font-size:20px;margin-bottom:5px">${ic}</div><div style="font-size:20px;font-weight:700;color:${c};margin-bottom:2px">${v}</div><div style="font-size:9.5px;color:var(--muted)">${l}</div></div>`).join('')}
</div>
<div class="g23">
  <div>
    <div class="card">
      <div class="ch"><span class="ct">📋 Registre des plans d'urgence</span><button class="btn bp bsm">+ Nouveau plan</button></div>
      <table class="tbl">
        <thead><tr><th>Code</th><th>Titre du plan</th><th>Type</th><th>Création</th><th>Version</th><th>Validé par</th><th>Statut</th><th></th></tr></thead>
        <tbody>${[["PU-INC-01","Plan d'incendie",'Incendie','01/01/2025','V2','Dir. HSE','Validé'],["PU-EVA-01","Plan d'évacuation",'Évacuation','01/01/2025','V1','Dir. HSE','Validé'],['PU-ACC-01','Plan accident chimique','Chimique','15/02/2025','V1','HSE','En révision'],['PU-SIS-01','Plan de séisme','Séisme','10/05/2025','V1','Dir.','Validé'],['PU-ELE-01','Risque électrique','Électrique','20/03/2025','V2','HSE + Maint.','Validé']].map(([c,n,t,d,v,resp,s])=>`<tr>
          <td style="color:var(--blue);font-weight:700;font-family:monospace;font-size:10px">${c}</td><td style="font-weight:500">${n}</td>
          <td><span class="badge ${t==='Incendie'?'br':t==='Évacuation'?'bo':t==='Chimique'?'by':t==='Électrique'?'by':'bb'}">${t}</span></td>
          <td style="font-size:10px;color:var(--muted)">${d}</td><td style="font-family:monospace">${v}</td><td style="font-size:10px">${resp}</td>
          <td><span class="badge ${s==='Validé'?'bg3':'by'}">${s}</span></td>
          <td><button class="btn bsm">Voir</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:11px">📅 Calendrier exercices d'urgence — 2025</div>
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:6px;margin-bottom:11px">
        ${['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'].map((m,i)=>{
          const ex={0:'Incendie',2:'Évacuation',5:'SST',8:'Incendie',11:'Simulation'}[i];
          const done=[0,2].includes(i), planned=[5,8,11].includes(i);
          return`<div style="background:${ex?done?'#f0fdf4':planned?'#eff6ff':'var(--bg)':'var(--bg)'};border:1px solid ${ex?done?'#86efac':planned?'#93c5fd':'var(--border)':'var(--border)'};border-radius:7px;padding:7px;text-align:center">
            <div style="font-size:10px;font-weight:700;color:${ex?done?'var(--green)':planned?'var(--blue)':'var(--muted)':'var(--muted)'}">${m}</div>
            ${ex?`<div style="font-size:8px;color:${done?'var(--green)':planned?'var(--blue)':'var(--muted)'};margin-top:2px;line-height:1.2">${ex}</div><div style="font-size:10px;margin-top:2px">${done?'✅':'📅'}</div>`:`<div style="font-size:9px;color:var(--muted);margin-top:3px">—</div>`}
          </div>`;
        }).join('')}
      </div>
      <table class="tbl">
        <thead><tr><th>Exercice</th><th>Type</th><th>Date prévue</th><th>Responsable</th><th>Participants</th><th>Statut</th><th>Résultat</th></tr></thead>
        <tbody>${[["Exercice incendie Bât. A",'Incendie','15/01/2025','HSE','45','Réalisé','Conforme'],["Exercice évacuation générale",'Évacuation','20/03/2025','HSE','120','Réalisé','Observation'],["Formation 1ers secours",'SST / PRAP','10/06/2025','Infirmière','12','Planifié','—'],["Exercice incendie Bât. B",'Incendie','15/09/2025','HSE','60','Planifié','—'],["Simulation urgence annuelle",'Multi-risques','10/12/2025','Dir. + HSE','150','Planifié','—']].map(([n,t,d,r,p,s,res])=>`<tr>
          <td style="font-weight:500">${n}</td>
          <td><span class="badge ${t.includes('Incendie')?'br':t.includes('Évacuation')?'bo':t.includes('SST')?'bb':'by'}">${t}</span></td>
          <td style="font-size:10px">${d}</td><td style="font-size:10px">${r}</td><td style="font-family:monospace;text-align:center">${p}</td>
          <td><span class="badge ${s==='Réalisé'?'bg3':s==='Planifié'?'bb':'bo'}">${s}</span></td>
          <td>${res==='—'?`<span style="color:var(--muted)">—</span>`:`<span class="badge ${res==='Conforme'?'bg3':'bo'}">${res}</span>`}</td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
  </div>
  <div>
    <div class="card" style="border-left:3px solid var(--red)">
      <div class="ch"><span class="ct">🔥 PU-INC-01 — Plan d'incendie</span><span class="badge bg3">Validé — V2</span></div>
      ${[["Objectif","Définir procédures en cas d'incendie et protection des biens"],["Champ application","Tous les ateliers et bureaux XPERT-MECA"],['Responsable plan','A. Hadj-Ali — Responsable HSE'],['Approbateur','Directeur Général'],['Date mise à jour','01/01/2025'],['Version','V2'],['Prochaine révision','01/01/2026']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500;font-size:11px">${v}</span></div>`).join('')}
      <div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;margin:9px 0 6px">Procédures clés</div>
      ${["1. Déclencher l'alarme incendie immédiatement","2. Appeler le 18 (Pompiers) et le 15 (SAMU)","3. Guider l'évacuation vers les sorties de secours","4. Rejoindre le point de rassemblement (Parking A)","5. Ne jamais utiliser les ascenseurs","6. Prévenir le Responsable HSE et Directeur"].map(p=>`<div style="font-size:10.5px;padding:4px 0;border-bottom:1px solid var(--border);display:flex;gap:5px"><span style="color:var(--blue);font-weight:700;flex-shrink:0">›</span>${p}</div>`).join('')}
      <div style="font-size:9px;font-weight:700;color:var(--muted);text-transform:uppercase;margin:9px 0 6px">Équipements d'urgence</div>
      ${[["Extincteurs","28 unités — vérifiés 15/05"],["RIA","6 unités — conformes"],["Détecteurs de fumée","42 unités — testés"],["Issues de secours","12 sorties balisées"],["Point rassemblement","Parking A — balisé"]].map(([k,v])=>`<div class="drow"><span style="font-weight:500">${k}</span><span style="font-size:10px;color:var(--green)">✓ ${v}</span></div>`).join('')}
      <div style="display:flex;gap:7px;margin-top:9px"><button class="btn" style="flex:1">✏ Modifier</button><button class="btn bp" style="flex:1">📄 PDF</button></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📞 Contacts d'urgence</div>
      ${[["🚒 Pompiers",'18','Urgence'],["🚑 SAMU",'15','Urgence'],["👮 Police",'17','Urgence'],["🛡 HSE — A. Hadj-Ali",'06 12 34 56 78','Interne'],["👤 Directeur Général",'06 98 76 54 32','Interne'],["🏥 Infirmière de site",'Poste 102','Interne'],["⚡ Maintenance",'Poste 210','Interne']].map(([n,t,c])=>`<div class="drow"><div><div style="font-weight:500;font-size:11px">${n}</div><div style="font-size:9.5px;color:var(--muted)">${c}</div></div><span style="font-weight:700;color:var(--blue);font-family:monospace;font-size:12px">${t}</span></div>`).join('')}
    </div>
  </div>
</div>`,

'sec-actions': () => {
  if(!window.secActView) window.secActView='kanban';
  const view = window.secActView;
  const fResp = window.secActFResp||'Tous';
  const fType = window.secActFType||'Tous';
  const fPrio = window.secActFPrio||'Tous';
  const fQ = window.secActFQ||'';

  let data = window.SEC_ACTIONS.filter(a=>{
    if(fResp!=='Tous'&&a.resp!==fResp) return false;
    if(fType!=='Tous'&&a.type!==fType) return false;
    if(fPrio!=='Tous'&&a.prio!==fPrio) return false;
    if(fQ&&![a.action,a.source,a.resp,a.desc].join(' ').toLowerCase().includes(fQ.toLowerCase())) return false;
    return true;
  });

  const total=window.SEC_ACTIONS.length, done=window.SEC_ACTIONS.filter(a=>a.statut==='Clôturée').length,
    enCours=window.SEC_ACTIONS.filter(a=>a.statut==='En cours').length,
    retard=window.SEC_ACTIONS.filter(a=>a.statut==='En retard').length,
    avgProg=Math.round(window.SEC_ACTIONS.reduce((s,a)=>s+a.prog,0)/Math.max(window.SEC_ACTIONS.length,1));

  const resps=[...new Set(window.SEC_ACTIONS.map(a=>a.resp))];
  const types=[...new Set(window.SEC_ACTIONS.map(a=>a.type))];

  const typeColor = {Technique:'#eff6ff',Formation:'#f5f3ff',Documentation:'#fff7ed',Inspection:'#f0fdf4',Équipement:'#fef3c7',Exercice:'#fef2f2',Administratif:'#f1f5f9'};
  const typeText = {Technique:'#1e40af',Formation:'#7c3aed',Documentation:'#c2410c',Inspection:'#15803d',Équipement:'#92400e',Exercice:'#991b1b',Administratif:'#475569'};

  const statBtn = (a,s) => `<button onclick="changeStatut('SEC_ACTIONS',${a.id},'${s}','sec-actions')" style="font-size:8.5px;padding:2px 7px;border:1px solid ${a.statut===s?ACT_COL_COLOR[s]:'var(--border)'};border-radius:4px;background:${a.statut===s?ACT_COL_COLOR[s]+'18':'#fff'};color:${a.statut===s?ACT_COL_COLOR[s]:'var(--muted)'};cursor:pointer;font-family:'Inter',sans-serif;font-weight:${a.statut===s?'700':'400'};transition:.12s">${s}</button>`;

  const card = (a) => `
  <div style="background:#fff;border:1px solid var(--border);border-left:3px solid ${a.prio==='Critique'?'#dc2626':a.prio==='Haute'?'#ea580c':'#94a3b8'};border-radius:9px;padding:11px;margin-bottom:8px;box-shadow:0 1px 3px rgba(0,0,0,.04);transition:.15s" onmouseover="this.style.boxShadow='0 4px 14px rgba(0,0,0,.09)'" onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,.04)'">
    <div style="display:flex;align-items:flex-start;gap:6px;margin-bottom:7px">
      <div style="flex:1"><div style="font-size:11.5px;font-weight:700;color:var(--navy);line-height:1.35;margin-bottom:3px">${a.action}</div><div style="font-size:9.5px;color:var(--muted);line-height:1.4">${a.desc}</div></div>
      <button onclick="deleteAction('SEC_ACTIONS',${a.id},'sec-actions')" style="background:none;border:none;cursor:pointer;color:#d1d5db;font-size:14px;line-height:1;flex-shrink:0;padding:0" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='#d1d5db'">✕</button>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:4px;margin-bottom:8px">
      <span class="badge ${ACT_PRIOS[a.prio]||'bgr'}" style="font-size:8.5px">${a.prio}</span>
      <span style="padding:2px 7px;border-radius:5px;font-size:8.5px;font-weight:600;background:${typeColor[a.type]||'#f1f5f9'};color:${typeText[a.type]||'#64748b'};border:1px solid ${typeColor[a.type]||'#f1f5f9'}">${a.type}</span>
      <span class="badge bgr" style="font-size:8.5px">${a.source}</span>
    </div>
    <div style="margin-bottom:8px">
      <div style="display:flex;justify-content:space-between;font-size:9px;color:var(--muted);margin-bottom:3px"><span>Progression</span><span id="prog-val-${a.id}" style="font-weight:700;color:${a.prog===100?'var(--green)':a.prog>0?'var(--orange)':'var(--muted)'}">${a.prog}%</span></div>
      <input type="range" min="0" max="100" value="${a.prog}" oninput="updateProg('SEC_ACTIONS',${a.id},this.value,'sec-actions')" onchange="document.getElementById('content').innerHTML=PAGES['sec-actions']()" style="width:100%;accent-color:${a.prog===100?'#16a34a':'#ea580c'};height:4px;cursor:pointer">
    </div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;font-size:9.5px;color:var(--muted)"><span>👤 ${a.resp}</span><span style="color:${a.statut==='En retard'?'var(--red)':'var(--muted)'}">⏰ ${a.fin}${a.statut==='En retard'?' 🚨':''}</span></div>
    <div style="display:flex;flex-wrap:wrap;gap:3px">${ACT_STATUTS.map(s=>statBtn(a,s)).join('')}</div>
  </div>`;

  return `
  <!-- KPI strip -->
  <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:9px;margin-bottom:12px">
    ${[['Total',total,'var(--blue)','🎯'],['En cours',enCours,'var(--orange)','⚡'],['En retard',retard,'var(--red)','⏰'],['Clôturées',done,'var(--green)','✅'],['À faire',window.SEC_ACTIONS.filter(a=>a.statut==='À faire').length,'var(--muted)','📋'],['Avancement',avgProg+'%','#7c3aed','📊']].map(([l,v,c,ic])=>`
    <div style="background:#fff;border:1px solid var(--border);border-radius:9px;padding:10px 11px;display:flex;align-items:center;gap:8px">
      <span style="font-size:16px">${ic}</span><div><div style="font-size:18px;font-weight:700;color:${c};line-height:1">${v}</div><div style="font-size:9px;color:var(--muted);margin-top:1px">${l}</div></div>
    </div>`).join('')}
  </div>

  <!-- Toolbar -->
  <div class="card" style="padding:10px 14px;margin-bottom:10px">
    <div style="display:flex;gap:7px;flex-wrap:wrap;align-items:center">
      <div style="display:flex;align-items:center;gap:5px;background:#f8fafc;border:1px solid var(--border);border-radius:7px;padding:4px 9px;flex:1;min-width:160px">
        <span style="color:var(--muted)">🔍</span>
        <input placeholder="Rechercher action, source, responsable…" value="${fQ}" oninput="window.secActFQ=this.value;document.getElementById('content').innerHTML=PAGES['sec-actions']()" style="border:none;background:transparent;font-size:11px;outline:none;width:100%;font-family:'Inter',sans-serif">
      </div>
      <select class="sel" onchange="window.secActFResp=this.value;document.getElementById('content').innerHTML=PAGES['sec-actions']()"><option value="Tous">Resp. : Tous</option>${resps.map(r=>`<option${r===fResp?' selected':''}>${r}</option>`).join('')}</select>
      <select class="sel" onchange="window.secActFType=this.value;document.getElementById('content').innerHTML=PAGES['sec-actions']()"><option value="Tous">Type : Tous</option>${types.map(t=>`<option${t===fType?' selected':''}>${t}</option>`).join('')}</select>
      <select class="sel" onchange="window.secActFPrio=this.value;document.getElementById('content').innerHTML=PAGES['sec-actions']()"><option value="Tous">Priorité : Toutes</option>${['Critique','Haute','Normale'].map(p=>`<option${p===fPrio?' selected':''}>${p}</option>`).join('')}</select>
      <button class="btn bsm" onclick="window.secActFResp='Tous';window.secActFType='Tous';window.secActFPrio='Tous';window.secActFQ='';document.getElementById('content').innerHTML=PAGES['sec-actions']()">✕ Reset</button>
      <div style="display:flex;background:#f1f5f9;border:1px solid var(--border);border-radius:7px;overflow:hidden;margin-left:auto">
        <button onclick="window.secActView='kanban';document.getElementById('content').innerHTML=PAGES['sec-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view==='kanban'?'var(--blue)':'transparent'};color:${view==='kanban'?'#fff':'var(--muted)'};transition:.15s">⬛ Kanban</button>
        <button onclick="window.secActView='liste';document.getElementById('content').innerHTML=PAGES['sec-actions']()" style="padding:5px 11px;font-size:10px;font-weight:600;border:none;cursor:pointer;font-family:'Inter',sans-serif;background:${view==='liste'?'var(--blue)':'transparent'};color:${view==='liste'?'#fff':'var(--muted)'};transition:.15s">≡ Liste</button>
      </div>
      <button class="btn bp bsm" onclick="showAddActionModal('SEC_ACTIONS','sec-actions')">+ Nouvelle action</button>
    </div>
  </div>

  ${view==='kanban'?`
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:11px">
    ${ACT_STATUTS.map(statut=>{
      const col=data.filter(a=>a.statut===statut);
      return `<div style="background:${ACT_COL_BG[statut]};border-radius:11px;padding:10px;min-height:180px">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
          <div style="font-size:11px;font-weight:700;color:var(--navy)">${statut==='À faire'?'⏳':statut==='En cours'?'⚡':statut==='En retard'?'🚨':'✅'} ${statut}</div>
          <span style="background:#fff;border:1px solid ${ACT_COL_COLOR[statut]}40;border-radius:10px;padding:1px 8px;font-size:10px;font-weight:700;color:${ACT_COL_COLOR[statut]}">${col.length}</span>
        </div>
        ${col.map(a=>card(a)).join('')}
      </div>`;
    }).join('')}
  </div>`:`
  <div class="card" style="padding:0;overflow:hidden"><div style="overflow-x:auto">
    <table class="tbl" style="min-width:850px"><thead><tr><th>Action SST</th><th>Type</th><th>Source</th><th>Responsable</th><th>Priorité</th><th>Fin prévue</th><th>Statut</th><th>Progression</th><th>Changer statut</th></tr></thead>
    <tbody>${data.map(a=>`<tr>
      <td style="font-weight:600;font-size:11px">${a.action}</td>
      <td><span style="padding:2px 7px;border-radius:5px;font-size:8.5px;font-weight:600;background:${typeColor[a.type]||'#f1f5f9'};color:${typeText[a.type]||'#64748b'}">${a.type}</span></td>
      <td style="font-size:10px;color:var(--muted)">${a.source}</td>
      <td style="font-size:10.5px">${a.resp}</td>
      <td><span class="badge ${ACT_PRIOS[a.prio]||'bgr'}" style="font-size:8.5px">${a.prio}</span></td>
      <td style="font-size:10px" class="${a.statut==='En retard'?'td-red':''}">${a.fin}${a.statut==='En retard'?' 🚨':''}</td>
      <td><span class="badge ${a.statut==='Clôturée'?'bg3':a.statut==='En cours'?'by':a.statut==='En retard'?'br':'bgr'}" style="font-size:8.5px">${a.statut}</span></td>
      <td><div style="display:flex;align-items:center;gap:5px"><div class="prog"><div class="pf" style="width:${a.prog}%;background:${a.prog===100?'var(--green)':a.prog>0?'var(--yellow)':'#888'}"></div></div><span style="font-size:10px;font-weight:600">${a.prog}%</span></div></td>
      <td><select onchange="changeStatut('SEC_ACTIONS',${a.id},this.value,'sec-actions')" class="sel" style="font-size:10px;padding:3px 6px">${ACT_STATUTS.map(s=>`<option${a.statut===s?' selected':''}>${s}</option>`).join('')}</select></td>
    </tr>`).join('')}</tbody></table>
  </div></div>`}`;
},

'sec-docs': () => `
<div class="g23">
  <div>
    <div class="card">
      <div class="ch"><span class="ct">📄 Registre documentaire SST</span><button class="btn bp bsm">+ Nouveau document</button></div>
      <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px;align-items:center">
        <select class="sel"><option>Catégorie: Toutes</option><option>Sécurité</option><option>Procédure</option><option>Plan urgence</option></select>
        <select class="sel"><option>Statut: Tous</option><option>Validé</option><option>En révision</option><option>Archivé</option></select>
        <input class="sel" placeholder="🔍 Rechercher..." style="width:140px">
      </div>
      <table class="tbl">
        <thead><tr><th>Code</th><th>Nom du document</th><th>Catégorie</th><th>Type</th><th>Version</th><th>Auteur</th><th>Date MAJ</th><th>Statut</th><th>Validation</th><th></th></tr></thead>
        <tbody>${[['SST-PR-001','Procédure travail en hauteur','Sécurité','Procédure','V2','A. Hadj-Ali','10/05/2025','Validé','Dir. Qualité'],['SST-IN-002','Consignes machine CN','Sécurité','Instruction','V1','Ali M.','05/05/2025','Validé','HSE'],['SST-FP-003','Fiche poste opérateur','RH / SST','Fiche','V1','RH','01/05/2025','Validé','HSE + RH'],['SST-PU-001','Plan prévention incendie','Plan urgence','Plan','V2','HSE','01/01/2025','Validé','Dir. Général'],['SST-PR-005','Procédure urgence chimique','Sécurité','Procédure','V1','HSE','15/02/2025','En révision','En attente'],['SST-IN-006','Guide utilisation EPI','Équipements','Instruction','V2','HSE','20/04/2025','Validé','HSE'],['SST-CL-007','Checklist extincteurs v1','Sécurité incendie','Checklist','V1','HSE','01/01/2025','Archivé','—'],['SST-CL-008','Checklist extincteurs v2','Sécurité incendie','Checklist','V2','HSE','01/03/2025','Validé','HSE']].map(([code,n,cat,t,v,a,d,s,val])=>`<tr>
          <td style="color:var(--blue);font-weight:700;font-family:monospace;font-size:10px">${code}</td>
          <td style="font-weight:500">${n}</td><td style="font-size:10px;color:var(--muted)">${cat}</td><td style="font-size:10px">${t}</td>
          <td style="font-family:monospace">${v}</td><td style="font-size:10px">${a}</td><td style="font-size:10px">${d}</td>
          <td><span class="badge ${s==='Validé'?'bg3':s==='En révision'?'by':s==='Archivé'?'bgr':'bb'}">${s}</span></td>
          <td style="font-size:10px">${val}</td>
          <td style="display:flex;gap:3px"><button class="btn bsm">👁</button><button class="btn bsm">📥</button><button class="btn bsm">✏</button></td>
        </tr>`).join('')}</tbody>
      </table>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🕑 Historique de révisions — SST-CL-008 / Checklist Extincteurs</div>
      ${[['V2 (Actuelle)','02/03/2025','A. Hadj-Ali','Ajout point N°9 — Fiche signalétique · Mise à jour fréquence à mensuelle','Validé'],['V1','01/01/2025','A. Hadj-Ali','Version initiale — 8 points de contrôle','Archivé']].map(([v,d,a,m,s])=>`<div style="display:flex;gap:12px;padding:9px 0;border-bottom:1px solid var(--border)"><div style="flex-shrink:0"><div style="font-family:monospace;font-size:11px;font-weight:700;color:var(--blue)">${v}</div><div style="font-size:9px;color:var(--muted)">${d}</div></div><div style="flex:1"><div style="font-size:10.5px;font-weight:600;margin-bottom:3px">👤 ${a}</div><div style="font-size:10px;color:var(--muted)">${m}</div></div><div><span class="badge ${s==='Validé'?'bg3':'bgr'}">${s}</span></div></div>`).join('')}
    </div>
  </div>
  <div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">👁 Aperçu — SST-PR-001</div>
      <div style="background:var(--bg);border:1px solid var(--border);border-radius:8px;padding:20px;text-align:center;height:180px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:7px">
        <div style="font-size:36px">📄</div>
        <div style="font-weight:600;color:var(--navy)">Procédure travail en hauteur</div>
        <div style="font-size:10px">SST-PR-001 — V2 — 10/05/2025</div>
        <div style="font-size:10px;color:var(--muted)">PDF · 2,4 Mo · 12 pages</div>
        <div style="display:flex;gap:8px;margin-top:4px"><button class="btn bsm bp">📥 Télécharger</button><button class="btn bsm">👁 Prévisualiser</button></div>
      </div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🔄 Workflow de validation</div>
      <div style="display:flex;align-items:center;margin-bottom:10px">
        ${['Rédaction','Révision','Approbation','Publication'].map((l,i)=>`
        ${i>0?`<div style="flex:1;height:2px;background:${i<3?'var(--green)':'#e5e7eb'}"></div>`:''}
        <div style="display:flex;flex-direction:column;align-items:center">
          <div style="width:26px;height:26px;border-radius:50%;background:${i<3?'var(--green)':i===3?'var(--blue)':'#e5e7eb'};color:${i<=3?'#fff':'var(--muted)'};display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700">${i<3?'✓':i+1}</div>
          <div style="font-size:8px;color:var(--muted);margin-top:2px;white-space:nowrap">${l}</div>
        </div>`).join('')}
      </div>
      ${[['Rédigé par','A. Hadj-Ali — HSE'],['Révisé par','Karim Saïd — Qualité'],['Approuvé par','Dir. Qualité — ✓'],['Statut actuel','Validé et publié']].map(([k,v])=>`<div class="drow"><span class="dk">${k}</span><span style="font-weight:500;font-size:11px">${v}</span></div>`).join('')}
      <div style="display:flex;gap:7px;margin-top:9px"><button class="btn" style="flex:1">✏ Réviser</button><button class="btn bg2" style="flex:1">✓ Valider</button><button class="btn" style="flex:1">📁 Archiver</button></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📊 Statistiques documentaires</div>
      ${[['Validés','18','var(--green)'],['En révision','3','var(--orange)'],['Brouillons','2','var(--muted)'],['Archivés','7','#94a3b8'],['Total','30','var(--navy)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><div style="display:flex;align-items:center;gap:7px"><div style="width:70px;height:5px;background:#e5e7eb;border-radius:2px;overflow:hidden"><div style="height:100%;width:${parseInt(v)/30*100}%;background:${c};border-radius:2px"></div></div><span style="font-weight:700;color:${c};font-family:monospace;font-size:11px">${v}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

'sec-kpi': () => `
<div style="display:flex;gap:8px;margin-bottom:12px;align-items:center;flex-wrap:wrap">
  <select class="sel"><option>Période: Ce mois (Mai 2026)</option><option>Mois précédent</option><option>Trimestre</option><option>Année</option></select>
  <select class="sel"><option>Comparer à: Mois précédent</option><option>Même mois N-1</option></select>
  <button class="btn bp bsm">Actualiser</button>
  <button class="btn bsm" style="margin-left:auto">📥 Exporter Excel</button>
  <button class="btn bp bsm">📄 Rapport PDF</button>
</div>

<!-- ════ BLOC OBJECTIFS SST ════ -->
<div class="card" style="margin-bottom:13px;border-top:3px solid #dc2626">
  <div class="ch">
    <div>
      <span class="ct">🎯 Objectifs Sécurité SST — Suivi mensuel</span>
      <div style="font-size:10px;color:var(--muted);margin-top:2px">Fréquence de suivi : <strong>Mensuelle</strong> · Période : Mai 2026 · Référentiel : ISO 45001</div>
    </div>
    <div style="display:flex;gap:6px;align-items:center">
      <span style="background:#f0fdf4;color:#065f46;border:1px solid #bbf7d0;border-radius:5px;padding:3px 9px;font-size:10px;font-weight:700">4/5 Objectifs atteints ✓</span>
      <button class="btn bsm">📥 Exporter</button>
    </div>
  </div>

  <!-- Tableau des objectifs -->
  <table class="tbl" style="margin-bottom:14px">
    <thead>
      <tr>
        <th style="width:32px">N°</th>
        <th>Indicateur de sécurité</th>
        <th style="text-align:center;width:80px">Objectif</th>
        <th style="text-align:center;width:80px">Réalisé</th>
        <th style="text-align:center;width:90px">Fréquence</th>
        <th style="width:110px">Progression</th>
        <th style="text-align:center;width:80px">Statut</th>
        <th style="width:120px">Tendance / Action</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background:#fffbeb">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">01</td>
        <td>
          <div style="font-weight:600;font-size:11px">🟡 Accidents de travail de faible gravité</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Blessures légères — Soins sans arrêt de travail</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#92400e">2</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#d97706">2</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden;position:relative">
              <div style="height:100%;width:100%;background:#d97706;border-radius:4px"></div>
              <div style="position:absolute;top:0;bottom:0;left:100%;width:2px;background:var(--navy);z-index:2"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:#d97706;white-space:nowrap">2 / Obj 2</span>
          </div>
        </td>
        <td style="text-align:center"><span style="background:#fffbeb;color:#92400e;border:1px solid #fde68a;border-radius:5px;padding:2px 8px;font-size:9px;font-weight:700">⚠ Limite atteinte</span></td>
        <td><span style="font-size:9.5px;color:#92400e;font-weight:500">→ Surveillance renforcée</span></td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">02</td>
        <td>
          <div style="font-weight:600;font-size:11px">🟠 Accidents de travail de moyenne gravité</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Blessures avec arrêt de travail court (&lt; 30 jours)</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#065f46">0</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#16a34a">0</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:0%;background:var(--green);border-radius:4px"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:var(--green);white-space:nowrap">0 / Obj 0</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge bg3" style="font-size:9px">✅ Atteint</span></td>
        <td><span style="font-size:9.5px;color:var(--green);font-weight:500">↓ Maintenir</span></td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">03</td>
        <td>
          <div style="font-weight:600;font-size:11px">🔴 Accidents de travail de forte gravité</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Blessures graves — Arrêt long / Invalidité / Décès</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#065f46">0</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#16a34a">0</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:0%;background:var(--green);border-radius:4px"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:var(--green);white-space:nowrap">0 / Obj 0</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge bg3" style="font-size:9px">✅ Atteint</span></td>
        <td><span style="font-size:9.5px;color:var(--green);font-weight:500">↓ Maintenir</span></td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">04</td>
        <td>
          <div style="font-weight:600;font-size:11px">🔥 Accidents d'incendie</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Tout départ de feu ou sinistre incendie sur site</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#065f46">0</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#16a34a">0</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:0%;background:var(--green);border-radius:4px"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:var(--green);white-space:nowrap">0 / Obj 0</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge bg3" style="font-size:9px">✅ Atteint</span></td>
        <td><span style="font-size:9.5px;color:var(--green);font-weight:500">↓ Maintenir</span></td>
      </tr>
      <tr style="background:#f0fdf4">
        <td style="font-family:monospace;color:var(--muted);font-size:10px;font-weight:700">05</td>
        <td>
          <div style="font-weight:600;font-size:11px">☣ Accidents de déversement de produits dangereux</div>
          <div style="font-size:9.5px;color:var(--muted);margin-top:1px">Tout déversement accidentel de produit chimique / dangereux</div>
        </td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:13px;color:#065f46">0</span></td>
        <td style="text-align:center"><span style="font-family:monospace;font-weight:700;font-size:15px;color:#16a34a">0</span></td>
        <td style="text-align:center"><span class="badge by" style="font-size:9px">Mensuelle</span></td>
        <td>
          <div style="display:flex;align-items:center;gap:5px">
            <div style="flex:1;height:7px;background:#e5e7eb;border-radius:4px;overflow:hidden">
              <div style="height:100%;width:0%;background:var(--green);border-radius:4px"></div>
            </div>
            <span style="font-size:9px;font-weight:700;color:var(--green);white-space:nowrap">0 / Obj 0</span>
          </div>
        </td>
        <td style="text-align:center"><span class="badge bg3" style="font-size:9px">✅ Atteint</span></td>
        <td><span style="font-size:9.5px;color:var(--green);font-weight:500">↓ Maintenir</span></td>
      </tr>
    </tbody>
  </table>

  <!-- Légende + synthèse visuelle -->
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px">
    <!-- Scorecard global -->
    <div style="background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1px solid #86efac;border-radius:9px;padding:12px;text-align:center">
      <div style="font-size:10px;font-weight:700;color:#065f46;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px">Score global objectifs</div>
      <div style="font-size:30px;font-weight:700;color:#16a34a;font-family:monospace;line-height:1">4/5</div>
      <div style="font-size:9px;color:#065f46;margin-top:2px;margin-bottom:8px">Objectifs atteints ce mois</div>
      <div style="height:7px;background:rgba(255,255,255,.6);border-radius:4px;overflow:hidden">
        <div style="height:100%;width:80%;background:#16a34a;border-radius:4px"></div>
      </div>
      <div style="font-size:9px;color:#065f46;margin-top:3px;font-weight:700">80% de conformité</div>
    </div>
    <!-- Synthèse par catégorie -->
    <div style="background:var(--white);border:1px solid var(--border);border-radius:9px;padding:12px">
      <div style="font-size:10px;font-weight:700;color:var(--navy);margin-bottom:8px">Synthèse par niveau de gravité</div>
      ${[['🟡 Faible gravité','2 / Obj 2','Limite atteinte','#d97706','#fffbeb'],['🟠 Moyenne gravité','0 / Obj 0','Conforme','#16a34a','#f0fdf4'],['🔴 Forte gravité','0 / Obj 0','Conforme','#16a34a','#f0fdf4'],['🔥 Incendie','0 / Obj 0','Conforme','#16a34a','#f0fdf4'],['☣ Déversement','0 / Obj 0','Conforme','#16a34a','#f0fdf4']].map(([l,v,s,c,bg])=>`
      <div style="display:flex;align-items:center;gap:6px;padding:3px 0;border-bottom:1px solid var(--border)">
        <span style="font-size:10px;flex:1">${l}</span>
        <span style="font-family:monospace;font-size:10px;font-weight:700;color:${c}">${v}</span>
        <span style="background:${bg};color:${c};border-radius:4px;padding:1px 6px;font-size:8.5px;font-weight:700">${s}</span>
      </div>`).join('')}
    </div>
    <!-- Alertes & actions -->
    <div style="background:#fffbeb;border:1px solid #fde68a;border-radius:9px;padding:12px">
      <div style="font-size:10px;font-weight:700;color:#92400e;margin-bottom:8px">⚠ Points de vigilance</div>
      <div style="padding:7px;background:#fff;border-radius:6px;border-left:3px solid #d97706;margin-bottom:7px">
        <div style="font-size:10px;font-weight:700;color:#92400e">Accidents faible gravité à la limite</div>
        <div style="font-size:9.5px;color:var(--muted);margin-top:2px">2 accidents enregistrés = objectif max.<br>Tout nouvel accident dépasserait l'objectif.</div>
      </div>
      <div style="font-size:9.5px;color:#065f46;font-weight:600;margin-bottom:4px">✅ Points positifs :</div>
      <div style="font-size:9.5px;color:var(--muted)">• 0 accident grave / mortel<br>• 0 incendie sur site<br>• 0 déversement dangereux<br>• 4 objectifs sur 5 atteints</div>
    </div>
  </div>
</div>

<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px">
  ${[['#eff6ff','#bfdbfe','#1e40af','📐','2.45','Taux de fréquence (TF)','+12% vs N-1'],['#f5f3ff','#ddd6fe','#5b21b6','📏','0.78','Taux de gravité (TG)','-3% vs N-1'],['#fef2f2','#fecaca','#991b1b','🚨','3','Accidents avec arrêt','-33% vs N-1'],['#fff7ed','#fed7aa','#9a3412','⚠','7',"Incidents & presque-acc.",'+17% vs N-1'],['#f0fdf4','#bbf7d0','#065f46','📅','12','Jours sans accident','+9% vs N-1'],['#eff6ff','#bfdbfe','#1e40af','✅','18/26','Checklists réalisées','Taux 69%'],['#f0fdf4','#bbf7d0','#065f46','🎯','87%','Conformité sécurité','+3% vs N-1'],['#fff7ed','#fed7aa','#9a3412','🚒','3/5',"Exercices d'urgence",'60% réalisés']].map(([bg,bc,tc,ic,v,l,t])=>`
  <div style="background:${bg};border:1px solid ${bc};border-radius:9px;padding:12px;position:relative;overflow:hidden">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:7px">
      <div style="font-size:14px">${ic}</div>
      <div style="font-size:9px;font-weight:600;color:${tc}">${t}</div>
    </div>
    <div style="font-size:20px;font-weight:700;color:${tc};font-family:monospace;margin-bottom:2px">${v}</div>
    <div style="font-size:9.5px;color:var(--muted)">${l}</div>
  </div>`).join('')}
</div>
<div class="g2" style="margin-bottom:12px">
  <div class="card">
    <div class="ch"><span class="ct">📈 Évolution TF & TG — 12 mois glissants</span></div>
    <svg width="100%" height="110" viewBox="0 0 500 110">
      <defs><linearGradient id="gtf2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#2563eb" stop-opacity=".15"/><stop offset="100%" stop-color="#2563eb" stop-opacity="0"/></linearGradient></defs>
      ${[0,30,60,90].map(y=>`<line x1="35" y1="${10+y}" x2="490" y2="${10+y}" stroke="#dde4ef" stroke-width="1"/>`).join('')}
      ${[3,2,1,0].map((v,i)=>`<text x="30" y="${14+i*30}" text-anchor="end" font-size="9" fill="#6b7a99" font-family="Inter,sans-serif">${v}</text>`).join('')}
      ${['J','F','M','A','M','J','J','A','S','O','N','D'].map((m,i)=>`<text x="${48+i*38}" y="107" text-anchor="middle" font-size="9" fill="#6b7a99" font-family="Inter,sans-serif">${m}</text>`).join('')}
      <path d="M48,70 L86,75 L124,50 L162,65 L200,55 L238,80 L276,70 L314,55 L352,65 L390,70 L428,60 L466,55 L466,100 L48,100Z" fill="url(#gtf2)"/>
      <polyline points="48,70 86,75 124,50 162,65 200,55 238,80 276,70 314,55 352,65 390,70 428,60 466,55" fill="none" stroke="#2563eb" stroke-width="2" stroke-linejoin="round"/>
      <polyline points="48,85 86,90 124,80 162,88 200,78 238,92 276,85 314,78 352,85 390,90 428,82 466,78" fill="none" stroke="#7c3aed" stroke-width="1.5" stroke-dasharray="4,2"/>
      ${[[48,70],[86,75],[124,50],[162,65],[200,55],[238,80]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="3" fill="#2563eb" stroke="white" stroke-width="1.5"/>`).join('')}
    </svg>
    <div style="display:flex;gap:14px;justify-content:center;margin-top:5px">
      <div style="display:flex;align-items:center;gap:5px;font-size:10px"><div style="width:12px;height:2px;background:#2563eb"></div>TF (Taux fréquence)</div>
      <div style="display:flex;align-items:center;gap:5px;font-size:10px"><div style="width:12px;height:2px;background:#7c3aed;border-top:2px dashed #7c3aed"></div>TG (Taux gravité)</div>
    </div>
  </div>
  <div class="card">
    <div class="ch"><span class="ct">🎯 Taux de réalisation des checklists</span></div>
    <div style="display:flex;justify-content:center;align-items:center;gap:20px;padding:10px 0">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="46" fill="none" stroke="#e5e7eb" stroke-width="15"/>
        <circle cx="60" cy="60" r="46" fill="none" stroke="#16a34a" stroke-width="15" stroke-dasharray="${2*Math.PI*46*.69} ${2*Math.PI*46}" stroke-dashoffset="${2*Math.PI*46*.25}" stroke-linecap="round"/>
        <circle cx="60" cy="60" r="46" fill="none" stroke="#dc2626" stroke-width="15" stroke-dasharray="${2*Math.PI*46*.31} ${2*Math.PI*46}" stroke-dashoffset="${-2*Math.PI*46*.44}" stroke-linecap="round"/>
        <text x="60" y="56" text-anchor="middle" font-size="11" fill="#6b7a99" font-family="Inter,sans-serif">Réalisées</text>
        <text x="60" y="72" text-anchor="middle" font-size="20" font-weight="700" fill="#0f2044" font-family="monospace">69%</text>
      </svg>
      <div>
        ${[['Réalisées','18','#16a34a'],['Non réalisées','8','#dc2626'],['En cours','0','#6b7a99']].map(([l,v,c])=>`<div style="display:flex;align-items:center;gap:7px;margin-bottom:6px"><div style="width:9px;height:9px;border-radius:50%;background:${c};flex-shrink:0"></div><span style="font-size:10.5px;flex:1">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
        <div style="font-size:10px;color:var(--muted);margin-top:5px">Objectif: 26 checklists / mois</div>
        <div style="margin-top:5px;height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:69%;background:var(--green);border-radius:3px"></div></div>
      </div>
    </div>
  </div>
</div>
<div class="g2">
  <div class="card">
    <div class="ct" style="margin-bottom:9px">📊 Top 5 non-conformités par checklist</div>
    ${[['Checklist Extincteurs',2,'var(--red)','35%'],['Checklist EPI',2,'var(--orange)','35%'],['Checklist Pharmacie',1,'var(--orange)','18%'],['Checklist Véhicule',1,'var(--yellow)','18%'],['Checklist SST',0,'var(--green)','0%']].map(([n,v,c,p],i)=>`<div style="display:flex;align-items:center;gap:8px;margin-bottom:7px"><span style="font-size:10px;color:var(--muted);width:14px;font-weight:700">${i+1}</span><span style="flex:1;font-weight:500;font-size:11px">${n}</span><div style="width:80px;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden"><div style="height:100%;width:${p};background:${c};border-radius:3px"></div></div><span style="font-weight:700;color:${c};font-size:11px;font-family:monospace;width:16px;text-align:right">${v}</span></div>`).join('')}
  </div>
  <div class="card">
    <div class="ct" style="margin-bottom:9px">🎯 Indicateurs clés vs objectifs</div>
    <table class="tbl">
      <thead><tr><th>Indicateur</th><th>Réalisé</th><th>Objectif</th><th>Écart</th><th>Tendance</th></tr></thead>
      <tbody>${[['TF (Taux fréquence)','2.45','&lt; 2.0','+0.45','↑ Dégradé'],['TG (Taux gravité)','0.78','&lt; 1.0','-0.22','↓ Bon'],['Jours sans accident','12','&gt; 30','-18','→ À améliorer'],['Conformité SST','87%','&gt; 90%','-3%','↑ Progression'],['Exercices urgence','60%','100%','-40%','→ En cours'],['Checklists réalisées','69%','95%','-26%','↑ Progression']].map(([ind,r,obj,ec,t])=>`<tr>
        <td style="font-weight:500">${ind}</td>
        <td style="font-family:monospace;font-weight:700">${r}</td>
        <td style="color:var(--muted)">${obj}</td>
        <td style="font-weight:600;color:${ec.startsWith('+')?'var(--orange)':'var(--green)'}">${ec}</td>
        <td style="font-weight:600;color:${t.includes('Dégradé')?'var(--red)':t.includes('Bon')?'var(--green)':'var(--orange)'}">${t}</td>
      </tr>`).join('')}</tbody>
    </table>
  </div>
  <div class="card">
    <div class="ct" style="margin-bottom:9px">🔔 Alertes prioritaires</div>
    ${[['br','🔴','Risque R-001 non traité — Criticité 24 — Atelier usinage'],['br','🔴',"Exercice évacuation Bât. B en retard — Prévu 15/04"],['bo','🟠','TF supérieur à objectif mensuel — Action corrective requise'],['bo','🟠','Checklist EPI non conforme — Gants à remplacer'],['by','🟡','Formation SST opérateurs planifiée — 25/05/2025'],['bb','🔵',"3 exercices d'urgence réalisés sur 5 prévus en 2025"]].map(([cls,ic,msg])=>`<div class="drow" style="padding:5px 0"><div style="display:flex;align-items:flex-start;gap:6px;font-size:10.5px"><span>${ic}</span><span>${msg}</span></div></div>`).join('')}
  </div>
  <div class="card">
    <div class="ct" style="margin-bottom:9px">📊 Répartition accidents par département</div>
    <svg width="100%" height="90" viewBox="0 0 380 90">
      ${[['Usinage',3,35,'#dc2626'],['Maintenance',2,24,'#ea580c'],['Assemblage',1,12,'#2563eb'],['Logistique',1,12,'#7c3aed'],['Bureau',0,0,'#94a3b8']].map(([dep,v,pct,c],i)=>`<g transform="translate(0,${i*17})"><text x="0" y="12" font-size="10" fill="#6b7a99" font-family="Inter,sans-serif">${dep}</text><rect x="72" y="3" width="${pct*2.3}" height="9" rx="3" fill="${c}" opacity=".8"/><text x="${72+pct*2.3+5}" y="12" font-size="10" font-weight="700" fill="${c}" font-family="monospace">${v}</text></g>`).join('')}
    </svg>
  </div>
</div>`,

/* ══════════════════════════════════════
   🔥 CHECKLIST EXTINCTEURS — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-ext': () => `
${renderChecklistNav('sec-cl-ext')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#7c2d12,#c2410c);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🔥</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist Extincteurs — CH-EXT-001</div><div style="font-size:10px;opacity:.75">Sécurité incendie · Mensuelle · Version V2 · Inspecteur : Ali Mohamed</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">92%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">9/9</div><div style="font-size:8px;opacity:.7">Points</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-EXT-001'],['Type extincteur','Poudre ABC'],['N° extincteur','EXT-05'],['Emplacement','Atelier Usinage — Zone 1'],['Date inspection','15/05/2025'],['Inspecteur','Ali Mohamed'],['Dernière inspection','15/04/2025'],['Prochaine inspection','15/06/2025'],['Site','XPERT-MECA']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">✅ Points de contrôle</span><div style="display:flex;align-items:center;gap:6px"><span class="badge bg3">8 Oui</span><span class="badge br">1 Non</span></div></div>
      <table class="tbl">
        <thead><tr><th style="width:26px">N°</th><th>Élément à vérifier</th><th style="width:55px">Oui</th><th style="width:50px">Non</th><th>Observation</th><th style="width:38px">État</th></tr></thead>
        <tbody>
          ${[
            [1,"Extincteur approprié au bon endroit et bien signalisé",true,false,"Emplacement conforme au plan de sécurité",'ok'],
            [2,"Extincteur accessible — allée dégagée, hauteur correcte",true,false,"Accessible en moins de 30 secondes",'ok'],
            [3,"Instructions d'utilisation lisibles et en bon état",true,false,"Légèrement usées — à remplacer lors du prochain contrôle",'obs'],
            [4,"Goupille de sécurité bien en place et non déclenchée",true,false,"RAS",'ok'],
            [5,"Pression indicateur dans la zone verte (entre 12 et 16 bar)",true,false,"Pression correcte : 14 bar",'ok'],
            [6,"Absence de dommage visible, corrosion ou déformation",false,true,"Traces suspectes sur la base — à vérifier lors du prochain entretien",'ko'],
            [7,"Aucune obstruction du tuyau d'évacuation ou de la tête",true,false,"RAS",'ok'],
            [8,"Carte d'inspection présente et dernière visite < 12 mois",true,false,"Valide jusqu'au 06/2025",'ok'],
            [9,"Fiche signalétique disponible à proximité",true,false,"Disponible et lisible",'ok'],
          ].map(([n,e,ou,non,obs,st])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${e}</td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${ou?'#dcfce7':'#f1f5f9'};border:2px solid ${ou?'var(--green)':'#e5e7eb'}">
                <input type="radio" name="q${n}" style="display:none" ${ou?'checked':''}><span style="font-size:12px;color:var(--green)">${ou?'✓':''}</span>
              </label>
            </td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${non?'#fee2e2':'#f1f5f9'};border:2px solid ${non?'var(--red)':'#e5e7eb'}">
                <input type="radio" name="q${n}" style="display:none" ${non?'checked':''}><span style="font-size:12px;color:var(--red)">${non?'✗':''}</span>
              </label>
            </td>
            <td style="font-size:10px;color:var(--muted)">${obs}</td>
            <td style="text-align:center"><span style="font-size:14px">${st==='ok'?'✅':st==='ko'?'🔴':'🟡'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:11px;background:${i===1?'#fff7ed':'var(--bg)'};border:1px solid ${i===1?'#fed7aa':'var(--border)'};border-radius:6px;padding:5px 9px"><input type="radio" name="res" ${i===1?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Observation générale</div>
          <textarea class="fi" rows="2" style="resize:none">RAS — Extincteur en bon état général. Point 6 (corrosion base) à surveiller au prochain contrôle.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer NC</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider &amp; Enregistrer</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo de l'extincteur</div>
      <div style="background:linear-gradient(135deg,#fff7ed,#fef2f2);border:2px dashed #fed7aa;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🧯</div>
        <div style="font-weight:600;color:#9a3412;margin-bottom:4px">EXT-05 — Poudre ABC</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Atelier Usinage — Zone 1</div>
        <button class="btn bsm">📷 Ajouter photo</button>
      </div>
      <div style="margin-top:8px;padding:7px;background:#fef2f2;border:1px solid #fecaca;border-radius:6px">
        <div style="font-size:9px;font-weight:700;color:var(--red);margin-bottom:2px">⚠ Point 6 — Corrosion détectée</div>
        <div style="font-size:10px;color:#991b1b">Traces suspectes sur la base de l'extincteur. Surveillance requise.</div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé de l'inspection</div>
      ${[['Points vérifiés','9','var(--navy)'],['Conformes','8','var(--green)'],['Non-conformes','1','var(--red)'],['Observations','1','var(--orange)'],['Conformité','89%','var(--orange)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:89%;background:var(--orange);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📅 Prochaines actions</div>
      ${[["Surveiller corrosion base",'HSE','15/06/2025','bo'],["Remplacer instructions usées",'Ali M.','15/06/2025','by'],["Prochain contrôle annuel",'HSE','15/11/2025','bb']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   🏥 CHECKLIST PHARMACIE — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-phar': () => `
${renderChecklistNav('sec-cl-phar')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#065f46,#059669);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🏥</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist Boîte de Pharmacie — CH-PHAR-001</div><div style="font-size:10px;opacity:.75">Premiers secours · Mensuelle · Version V1 · Responsable : Ahmed Samir</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">78%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">10/10</div><div style="font-size:8px;opacity:.7">Produits</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-PHAR-001'],['Emplacement','Atelier Usinage'],['Responsable','Ahmed Samir'],['Date inspection','10/04/2025'],['Dernière inspection','10/03/2025'],['Prochaine inspection','10/05/2025'],['N° pharmacie','PH-001'],['Site','XPERT-MECA'],['Statut','⚠ Observation']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">💊 Contenu de la boîte de pharmacie</span><div style="display:flex;gap:6px"><span class="badge bg3">8 OK</span><span class="badge bo">2 Alerte</span></div></div>
      <table class="tbl">
        <thead><tr><th>N°</th><th>Désignation</th><th>Catégorie</th><th style="text-align:center">Qté</th><th style="text-align:center">Qté min.</th><th>Date expiration</th><th>État</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            [1,'Compresses stériles','Pansement',10,5,'03/2027','ok','—'],
            [2,'Bandes','Pansement',4,3,'04/2027','ok','—'],
            [3,'Sparadrap','Pansement',2,1,'05/2026','ok','—'],
            [4,'Bétadine','Désinfectant',1,1,'09/2026','ok','—'],
            [5,'Alcool 70°','Désinfectant',2,1,'10/2026','ok','—'],
            [6,'Gants jetables','Protection',20,10,'—','ok','—'],
            [7,'Masques chirurgicaux','Protection',15,10,'01/2026','ok','—'],
            [8,'Pansements adhésifs','Pansement',15,10,'01/2026','alerte','🔴 Remplacer'],
            [9,'Sérum physiologique','Désinfectant',2,1,'11/2025','alerte','🔴 Remplacer'],
            [10,'Ciseaux','Matériel',1,1,'—','ok','—'],
          ].map(([n,nom,cat,qty,qmin,exp,st,action])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${nom}</td>
            <td style="font-size:10px;color:var(--muted)">${cat}</td>
            <td style="text-align:center;font-family:monospace;font-weight:700;color:${qty<qmin?'var(--red)':'var(--navy)'}">${qty}</td>
            <td style="text-align:center;font-family:monospace;color:var(--muted)">${qmin}</td>
            <td style="font-size:10px;color:${exp.includes('2025')?'var(--red)':exp==='—'?'var(--muted)':'var(--muted)'}">${exp}</td>
            <td><span class="badge ${st==='ok'?'bg3':'br'}" style="font-size:9px">${st==='ok'?'✅ OK':'⚠ Alerte'}</span></td>
            <td style="font-size:10px;color:${action.includes('Remplacer')?'var(--red)':'var(--muted)'}">
              ${action.includes('Remplacer')?`<button class="btn bsm" style="background:#fef2f2;color:var(--red);border-color:#fecaca;font-size:9px">${action}</button>`:action}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:11px;background:${i===1?'#fff7ed':'var(--bg)'};border:1px solid ${i===1?'#fed7aa':'var(--border)'};border-radius:6px;padding:5px 9px"><input type="radio" name="res2" ${i===1?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Action requise</div>
          <textarea class="fi" rows="2" style="resize:none;border-color:var(--orange)">Remplacement des éléments en alerte — pansements adhésifs et sérum physiologique périmés.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer commande</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider &amp; Enregistrer</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo de la pharmacie</div>
      <div style="background:linear-gradient(135deg,#ecfdf5,#d1fae5);border:2px dashed #6ee7b7;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🏥</div>
        <div style="font-weight:600;color:#065f46;margin-bottom:4px">PH-001 — Atelier Usinage</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Dernière photo : 10/04/2025</div>
        <button class="btn bsm">📷 Mettre à jour</button>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé</div>
      ${[['Produits vérifiés','10','var(--navy)'],['Conformes','8','var(--green)'],['En alerte','2','var(--red)'],['Périmés','1','var(--red)'],['Conformité','80%','var(--orange)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:80%;background:var(--orange);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🛒 Actions de réapprovisionnement</div>
      ${[["Pansements adhésifs × 20",'HSE / Achats','15/04/2025','br'],["Sérum physiologique × 2",'HSE / Achats','15/04/2025','br'],["Vérification stock gants",'Ahmed Samir','10/05/2025','by']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   ⚙ CHECKLIST SST / MACHINES — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-sst': () => `
${renderChecklistNav('sec-cl-sst')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#1e3a8a,#1d4ed8);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">⚙</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist SST — CH-MACH-001</div><div style="font-size:10px;opacity:.75">Sécurité au travail · Mensuelle · Version V1 · Responsable : Youssef Ahmed</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">92%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">8/8</div><div style="font-size:8px;opacity:.7">Points</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-MACH-001'],['Emplacement','Atelier Assemblage'],['Responsable','Youssef Ahmed'],['Date inspection','15/05/2025'],['Dernière inspection','15/04/2025'],['Prochaine inspection','15/06/2025'],['Zone','Zone B — Assemblage'],['Département','Production'],['Statut','✅ Validé']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">✅ Points de contrôle SST</span><div style="display:flex;gap:6px"><span class="badge bg3">7 Oui</span><span class="badge bo">1 RAS</span></div></div>
      <table class="tbl">
        <thead><tr><th style="width:26px">N°</th><th>Élément à vérifier</th><th style="width:55px">Oui</th><th style="width:50px">Non</th><th>Observation</th><th style="width:38px">État</th></tr></thead>
        <tbody>
          ${[
            [1,"Présence d'un secouriste formé dans l'équipe",true,false,"2 secouristes formés — Ali & Karim",'ok'],
            [2,"Trousse de secours complète et accessible",true,false,"Conforme — vérifiée 15/04",'ok'],
            [3,"Affichage des consignes de premiers secours",true,false,"Affiché sur le poste B-03",'ok'],
            [4,"Numéros d'urgence affichés (15, 17, 18, N° site)",true,false,"Affichés à l'entrée et au poste",'ok'],
            [5,"Brancard disponible et en bon état",true,false,"Brancard disponible — salle de repos",'ok'],
            [6,"Zone premiers secours propre et dégagée",true,false,"RAS",'ok'],
            [7,"Registre des interventions à jour",true,false,"Dernière MAJ 13/05",'ok'],
            [8,"Exercices de premiers secours réalisés",true,false,"Exercice le 01/05/2025",'obs'],
          ].map(([n,e,ou,non,obs,st])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${e}</td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${ou?'#dcfce7':'#f1f5f9'};border:2px solid ${ou?'var(--green)':'#e5e7eb'}">
                <input type="radio" name="qs${n}" style="display:none" ${ou?'checked':''}><span style="font-size:12px;color:var(--green)">${ou?'✓':''}</span>
              </label>
            </td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${non?'#fee2e2':'#f1f5f9'};border:2px solid ${non?'var(--red)':'#e5e7eb'}">
                <input type="radio" name="qs${n}" style="display:none" ${non?'checked':''}><span style="font-size:12px;color:var(--red)">${non?'✗':''}</span>
              </label>
            </td>
            <td style="font-size:10px;color:var(--muted)">${obs}</td>
            <td style="text-align:center"><span style="font-size:14px">${st==='ok'?'✅':st==='ko'?'🔴':'🟡'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:11px;background:${i===0?'#f0fdf4':'var(--bg)'};border:1px solid ${i===0?'#bbf7d0':'var(--border)'};border-radius:6px;padding:5px 9px"><input type="radio" name="ressst" ${i===0?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Observation générale</div>
          <textarea class="fi" rows="2" style="resize:none">RAS — Zone SST conforme. Exercice premiers secours réalisé le 01/05.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider &amp; Enregistrer</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo du poste SST</div>
      <div style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border:2px dashed #93c5fd;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🛡️</div>
        <div style="font-weight:600;color:#1e40af;margin-bottom:4px">Zone SST — Bâtiment B</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Inspection : 15/05/2025</div>
        <button class="btn bsm">📷 Ajouter photo</button>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé</div>
      ${[['Points vérifiés','8','var(--navy)'],['Conformes','7','var(--green)'],['Observations','1','var(--orange)'],['Non-conformes','0','var(--muted)'],['Conformité','92%','var(--green)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:92%;background:var(--green);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📅 Prochaines actions</div>
      ${[["Planifier prochain exercice secours",'HSE','01/06/2025','bb'],["Vérification annuelle brancard",'Infirmière','01/07/2025','by']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   🚗 CHECKLIST VÉHICULE — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-veh': () => `
${renderChecklistNav('sec-cl-veh')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#374151,#1f2937);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🚗</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist Véhicule — CH-VEH-001</div><div style="font-size:10px;opacity:.75">Transport · Hebdomadaire · Version V3 · Conducteur : Karim Saïd</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">65%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700;color:#fbbf24">⚠</div><div style="font-size:8px;opacity:.7">En révision</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-VEH-001'],['Véhicule','123 uuu 4667'],['Conducteur','Karim Saïd'],['Département','Logistique'],['Kilométrage','58 450 km'],['Date inspection','15/05/2025'],['Dernière inspection','10/04/2025'],['Prochaine inspection','15/05/2025'],['Statut','⚠ En révision']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">🔧 Contrôles techniques</span><div style="display:flex;gap:6px"><span class="badge bg3">12 OK</span><span class="badge br">1 À vérifier</span></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--border);border-radius:8px;overflow:hidden">
        ${[
          ['Pneus (état et pression)',true,false,'ok'],['Freins',true,false,'ok'],
          ['Éclairage (phares, feux stop, clignotants)',true,false,'ok'],['Klaxon',true,false,'ok'],
          ['Niveau huile moteur',true,false,'ok'],['Niveau liquide refroidissement',true,false,'ok'],
          ['Essuie-glaces',true,false,'ok'],['Ceintures de sécurité',true,false,'ok'],
          ['Rétroviseurs',true,false,'ok'],['Trousse de secours',true,false,'ok'],
          ['Extincteur',true,false,'ok'],['Batterie',false,true,'ko'],
          ['Clignotants',true,false,'ok'],
        ].map(([e,ou,non,st],i)=>`<div style="padding:7px 10px;border-right:${i%2===0?'1px solid var(--border)':'none'};border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;background:${st==='ko'?'#fef2f2':''}">
          <span style="font-size:10.5px;font-weight:${st==='ko'?'700':''};color:${st==='ko'?'var(--red)':'var(--navy)'}">${e}</span>
          <div style="display:flex;gap:4px;align-items:center">
            ${ou?`<span style="background:#dcfce7;border-radius:4px;padding:2px 7px;font-size:9px;color:var(--green);font-weight:700">✓ Oui</span>`:
              `<span style="background:#fee2e2;border-radius:4px;padding:2px 7px;font-size:9px;color:var(--red);font-weight:700;display:flex;align-items:center;gap:3px">✗ Non <span style="font-size:8px">⚠ À vérifier</span></span>`}
          </div>
        </div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">📄 Documents administratifs</span></div>
      ${[['Assurance valide','Oui','Échéance 12/12/2025','bg3'],['Visite technique valide','Oui','Échéance 20/09/2025','bg3'],['Carte grise disponible','Oui','OK','bg3'],['Permis conducteur valide','Oui','Validité 2028','bg3']].map(([doc,v,detail,sc])=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--border)"><span style="font-weight:500;font-size:11px">${doc}</span><div style="display:flex;align-items:center;gap:6px"><span class="badge ${sc}">${v}</span><span style="font-size:10px;color:var(--muted)">${detail}</span></div></div>`).join('')}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:11px;padding-top:11px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:10px;background:${i===1?'#fff7ed':'var(--bg)'};border:1px solid ${i===1?'#fed7aa':'var(--border)'};border-radius:6px;padding:5px 7px"><input type="radio" name="resveh" ${i===1?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Action requise</div>
          <textarea class="fi" rows="2" style="resize:none;border-color:var(--orange)">Batterie à vérifier. Contrôle préventif recommandé avant prochain départ.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Bloquer véhicule</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo du véhicule</div>
      <div style="background:linear-gradient(135deg,#f8fafc,#f1f5f9);border:2px dashed #cbd5e1;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🚐</div>
        <div style="font-weight:600;color:#374151;margin-bottom:4px">123 uuu 4667</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Logistique · 58 450 km</div>
        <button class="btn bsm">📷 Voir les 4 photos</button>
      </div>
      <div style="margin-top:8px;padding:7px;background:#fffbeb;border:1px solid #fde68a;border-radius:6px">
        <div style="font-size:9px;font-weight:700;color:var(--yellow);margin-bottom:2px">⚠ Batterie — À vérifier</div>
        <div style="font-size:10px;color:#92400e">Vérifier et remplacer si nécessaire avant le prochain trajet.</div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé</div>
      ${[['Points vérifiés','13','var(--navy)'],['Conformes','12','var(--green)'],['À vérifier','1','var(--orange)'],['Non-conformes','0','var(--muted)'],['Conformité','92%','var(--orange)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:92%;background:var(--orange);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🔧 Actions maintenance</div>
      ${[["Vérification batterie",'Maintenance','20/05/2025','br'],["Prochain entretien kilométrique",'Maintenance','60000 km','by'],["Contrôle technique",'Logistique','20/09/2025','bb']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   🦺 CHECKLIST EPI — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-epi': () => `
${renderChecklistNav('sec-cl-epi')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#d97706,#b45309);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🦺</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist EPI — CH-EPI-001</div><div style="font-size:10px;opacity:.75">Équipements de protection individuelle · Mensuelle · Version V2 · Responsable : Ali Mohamed</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">82%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">7/7</div><div style="font-size:8px;opacity:.7">EPI</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-EPI-001'],['Département','Atelier Usinage'],['Poste','Opérateur CN'],['Responsable','Ali Mohamed'],['Date inspection','15/05/2025'],['Dernière inspection','08/04/2025'],['Prochaine inspection','08/06/2025'],['Risques couverts','Coupure, Bruit, Projection'],['Statut','⚠ Observation']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">🦺 Équipements de protection individuelle</span><div style="display:flex;gap:6px"><span class="badge bg3">6 OK</span><span class="badge br">1 Alerte</span></div></div>
      <table class="tbl">
        <thead>
          <tr><th>N°</th><th>EPI</th><th style="text-align:center">Obligatoire</th><th style="text-align:center">Disponible</th><th style="text-align:center">Bon état</th><th style="text-align:center">Conforme</th><th>Date validité</th><th>État</th><th>Action</th></tr>
        </thead>
        <tbody>
          ${[
            [1,'🪖 Casque de sécurité','Oui','Oui','Oui','Oui','06/2026','ok','—'],
            [2,'🥽 Lunettes de protection','Oui','Oui','Oui','Oui','09/2025','ok','—'],
            [3,'🧤 Gants de protection','Oui','Oui','Non','Oui','—','alerte','🔴 Remplacer'],
            [4,'👟 Chaussures de sécurité','Oui','Oui','Oui','Oui','12/2025','ok','—'],
            [5,'🎧 Protection auditive','Non','Non','—','—','—','ok','—'],
            [6,'😷 Masque anti-poussière','Non','Oui','Oui','Oui','03/2026','ok','—'],
            [7,'🦺 Gilet haute visibilité','Oui','Oui','Oui','Oui','—','ok','—'],
          ].map(([n,epi,ob,di,be,co,exp,st,action])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${epi}</td>
            <td style="text-align:center"><span class="badge ${ob==='Oui'?'bg3':'bgr'}" style="font-size:9px">${ob}</span></td>
            <td style="text-align:center"><span class="badge ${di==='Oui'?'bg3':'bgr'}" style="font-size:9px">${di}</span></td>
            <td style="text-align:center"><span class="badge ${be==='Oui'?'bg3':be==='Non'?'br':'bgr'}" style="font-size:9px">${be}</span></td>
            <td style="text-align:center"><span class="badge ${co==='Oui'?'bg3':co==='—'?'bgr':'br'}" style="font-size:9px">${co}</span></td>
            <td style="font-size:10px;color:${exp.includes('2025')?'var(--orange)':exp==='—'?'var(--muted)':'var(--muted)'}">${exp}</td>
            <td><span style="font-size:14px">${st==='ok'?'✅':'🔴'}</span></td>
            <td style="font-size:10px">
              ${action.includes('Remplacer')?`<button class="btn bsm" style="background:#fef2f2;color:var(--red);border-color:#fecaca;font-size:9px">${action}</button>`:action}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:10px;background:${i===1?'#fff7ed':'var(--bg)'};border:1px solid ${i===1?'#fed7aa':'var(--border)'};border-radius:6px;padding:5px 7px"><input type="radio" name="resepi" ${i===1?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Action requise</div>
          <textarea class="fi" rows="2" style="resize:none;border-color:var(--orange)">Gants de protection usés — Remplacer immédiatement avant prochain poste.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn" style="flex:1;background:#fef2f2;color:var(--red);border-color:#fecaca">⚠ Générer commande EPI</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photos des EPI</div>
      <div style="background:linear-gradient(135deg,#fffbeb,#fef3c7);border:2px dashed #fbbf24;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:54px;margin-bottom:8px">🦺🥽🧤</div>
        <div style="font-weight:600;color:#92400e;margin-bottom:4px">Équipements Opérateur CN</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">Atelier Usinage · 15/05/2025</div>
        <button class="btn bsm">📷 Voir les 2 photos</button>
      </div>
      <div style="margin-top:8px;padding:7px;background:#fef2f2;border:1px solid #fecaca;border-radius:6px">
        <div style="font-size:9px;font-weight:700;color:var(--red);margin-bottom:2px">🔴 Gants de protection — État NON conforme</div>
        <div style="font-size:10px;color:#991b1b">Gants de protection usés — Remplacement immédiat requis.</div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé EPI</div>
      ${[['EPI vérifiés','7','var(--navy)'],['Conformes','6','var(--green)'],['Non conformes','1','var(--red)'],['Obligatoires manquants','0','var(--muted)'],['Conformité','86%','var(--orange)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:86%;background:var(--orange);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">🛒 Commande EPI</div>
      ${[["Gants anti-coupures × 10 paires",'HSE / Achats','18/05/2025','br'],["Renouvellement lunettes × 3",'HSE','30/05/2025','by'],["Audit annuel EPI",'HSE','01/07/2025','bb']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

/* ══════════════════════════════════════
   🚨 CHECKLIST ÉVACUATION — REMPLISSAGE
══════════════════════════════════════ */
'sec-cl-evaq': () => `
${renderChecklistNav('sec-cl-evaq')}
<div style="display:flex;gap:10px;align-items:center;background:linear-gradient(135deg,#991b1b,#dc2626);border-radius:10px;padding:11px 16px;margin-bottom:13px;color:#fff">
  <span style="font-size:24px">🚨</span>
  <div style="flex:1"><div style="font-size:13px;font-weight:700">Checklist Évacuation Incendie — CH-EVAQ-001</div><div style="font-size:10px;opacity:.75">Sécurité incendie · Trimestrielle · Version V1 · Responsable : HSE</div></div>
  <div style="display:flex;gap:6px">
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">100%</div><div style="font-size:8px;opacity:.7">Conformité</div></div>
    <div style="background:rgba(255,255,255,.15);border-radius:6px;padding:5px 11px;text-align:center"><div style="font-size:15px;font-weight:700">10/10</div><div style="font-size:8px;opacity:.7">Points</div></div>
  </div>
</div>
<div class="g23">
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ch"><span class="ct">📋 Informations générales</span></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[['Code','CH-EVAQ-001'],['Emplacement','Bâtiment Principal'],['Responsable','A. Hadj-Ali — HSE'],['Date inspection','05/05/2025'],['Dernière inspection','08/04/2025'],['Prochaine inspection','05/08/2025'],['Fréquence','Trimestrielle'],['Version','V1'],['Statut','✅ Validé']].map(([k,v])=>`<div style="background:var(--bg);border:1px solid var(--border);border-radius:6px;padding:7px 9px"><div style="font-size:9px;font-weight:600;color:var(--muted);text-transform:uppercase;margin-bottom:2px">${k}</div><div style="font-size:11px;font-weight:600;color:var(--navy)">${v}</div></div>`).join('')}
      </div>
    </div>
    <div class="card">
      <div class="ch"><span class="ct">✅ Points de contrôle — Évacuation incendie</span><div style="display:flex;gap:6px"><span class="badge bg3">10 Conformes</span></div></div>
      <table class="tbl">
        <thead><tr><th style="width:26px">N°</th><th>Élément à vérifier</th><th style="width:55px">Oui</th><th style="width:50px">Non</th><th>Observation</th><th style="width:38px">État</th></tr></thead>
        <tbody>
          ${[
            [1,"Issues de secours dégagées et accessibles (largeur ≥ 90 cm)",true,false,"Dégagées — 3 issues vérifiées",'ok'],
            [2,"Signalisation des sorties visible et en bon état",true,false,"OK",'ok'],
            [3,"Éclairage de secours fonctionnel (test autonomie > 1h)",true,false,"Testé — autonomie 1h20",'ok'],
            [4,"Plan d'évacuation affiché à chaque niveau et visible",true,false,"5 plans affichés",'ok'],
            [5,"Extincteurs accessibles à proximité des issues",true,false,"Conformes — vérifiés 15/05",'ok'],
            [6,"Alarme incendie fonctionnelle (test déclenchement)",true,false,"Parking principal — balisé",'ok'],
            [7,"Point de rassemblement identifié et balisé",true,false,"Parking principal — balisé",'ok'],
            [8,"Exercices d'évacuation réalisés (≥ 2 / an)",true,false,"Dernier le 20/04/2025",'ok'],
            [9,"Responsables d'évacuation identifiés et formés",true,false,"Équipe formée — 6 personnes",'ok'],
            [10,"Portes coupe-feu fonctionnelles et non bloquées",true,false,"RAS",'ok'],
          ].map(([n,e,ou,non,obs,st])=>`<tr>
            <td style="font-family:monospace;color:var(--muted);font-size:10px">${n}</td>
            <td style="font-weight:500;font-size:11px">${e}</td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${ou?'#dcfce7':'#f1f5f9'};border:2px solid ${ou?'var(--green)':'#e5e7eb'}">
                <input type="radio" name="qev${n}" style="display:none" ${ou?'checked':''}><span style="font-size:12px;color:var(--green)">${ou?'✓':''}</span>
              </label>
            </td>
            <td style="text-align:center">
              <label style="cursor:pointer;display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:50%;background:${non?'#fee2e2':'#f1f5f9'};border:2px solid ${non?'var(--red)':'#e5e7eb'}">
                <input type="radio" name="qev${n}" style="display:none" ${non?'checked':''}><span style="font-size:12px;color:var(--red)">${non?'✗':''}</span>
              </label>
            </td>
            <td style="font-size:10px;color:var(--muted)">${obs}</td>
            <td style="text-align:center"><span style="font-size:14px">✅</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:13px;padding-top:12px;border-top:1px solid var(--border)">
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Résultat global</div>
          <div style="display:flex;gap:7px">${['✅ Conforme','⚠ Observation','🔴 Non-conforme'].map((l,i)=>`<label style="display:flex;align-items:center;gap:5px;cursor:pointer;font-size:10px;background:${i===0?'#f0fdf4':'var(--bg)'};border:1px solid ${i===0?'#bbf7d0':'var(--border)'};border-radius:6px;padding:5px 7px"><input type="radio" name="resevaq" ${i===0?'checked':''}>${l}</label>`).join('')}</div>
        </div>
        <div><div style="font-size:10px;font-weight:700;color:var(--muted);text-transform:uppercase;margin-bottom:6px">Observation générale</div>
          <textarea class="fi" rows="2" style="resize:none">RAS — Système d'évacuation pleinement conforme ISO 45001. Exercice réalisé le 20/04/2025.</textarea>
        </div>
      </div>
      <div style="display:flex;gap:7px;margin-top:11px">
        <button class="btn" style="flex:1" onclick="goPage('sec-checklists')">✕ Annuler</button>
        <button class="btn" style="flex:1">💾 Brouillon</button>
        <button class="btn bp" style="flex:2" onclick="goPage('sec-checklists')">✅ Valider &amp; Enregistrer</button>
      </div>
    </div>
  </div>
  <div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📷 Photo — Issues de secours</div>
      <div style="background:linear-gradient(135deg,#fef2f2,#ffe4e6);border:2px dashed #fca5a5;border-radius:10px;padding:24px;text-align:center">
        <div style="font-size:64px;margin-bottom:8px">🚪</div>
        <div style="font-weight:600;color:#991b1b;margin-bottom:4px">Bâtiment Principal</div>
        <div style="font-size:10px;color:var(--muted);margin-bottom:10px">3 issues vérifiées le 05/05/2025</div>
        <button class="btn bsm">📷 Voir les 3 photos</button>
      </div>
      <div style="margin-top:8px;padding:7px;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px">
        <div style="font-size:9px;font-weight:700;color:var(--green);margin-bottom:2px">✅ Système d'évacuation conforme</div>
        <div style="font-size:10px;color:#065f46">Toutes les issues et signalisations conformes à la réglementation.</div>
      </div>
    </div>
    <div class="card" style="margin-bottom:12px">
      <div class="ct" style="margin-bottom:9px">📊 Résumé</div>
      ${[['Points vérifiés','10','var(--navy)'],['Conformes','10','var(--green)'],['Observations','0','var(--muted)'],['Non-conformes','0','var(--muted)'],['Conformité','100%','var(--green)']].map(([l,v,c])=>`<div class="drow"><span class="dk">${l}</span><span style="font-weight:700;color:${c};font-family:monospace">${v}</span></div>`).join('')}
      <div style="height:7px;background:#e5e7eb;border-radius:3px;overflow:hidden;margin-top:9px"><div style="height:100%;width:100%;background:var(--green);border-radius:3px"></div></div>
    </div>
    <div class="card">
      <div class="ct" style="margin-bottom:9px">📅 Programme évacuation 2025</div>
      ${[["Exercice évacuation Bât. B",'HSE','15/06/2025','bb'],["Exercice général annuel",'Dir. + HSE','10/10/2025','bb'],["Prochaine inspection",'HSE','05/08/2025','bg3']].map(([a,r,d,sc])=>`<div style="padding:5px 0;border-bottom:1px solid var(--border)"><div style="font-weight:500;font-size:11px;margin-bottom:2px">${a}</div><div style="display:flex;justify-content:space-between"><span style="font-size:9.5px;color:var(--muted)">👤 ${r}</span><span class="badge ${sc}" style="font-size:8.5px">⏰ ${d}</span></div></div>`).join('')}
    </div>
  </div>
</div>`,

'smi': () => pgSoon('smi'),
'ind': () => pgSoon('ind'),

};

window.PAGES = PAGES;
export { PAGES };

