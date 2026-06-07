/** Auto-generated from qhse_v11.html — do not edit by hand */
export function v11_audit_config() {

  return '<div class="content"><div class="card"><div class="ch"><span class="ct">⚙ Configuration du module Audit</span></div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">'
      +[['📋','Référentiels','Gérer les normes ISO et référentiels','#0284c7','#eff6ff'],['👥','Auditeurs','Gérer les habilitations','#7c3aed','#f5f3ff'],['⚠','Types de constats','NC · OBS · BP · Recommandations','#dc2626','#fef2f2'],['📅','Fréquences','Cycles et fréquences d\'audit','#16a34a','#f0fdf4'],['📊','KPI & Objectifs','Définir les seuils et objectifs','#f59e0b','#fffbeb'],['🔔','Notifications','Alertes et rappels automatiques','#ea580c','#fff7ed']]
        .map(function(e){return '<div style="background:'+e[4]+';border:1px solid '+e[3]+'25;border-radius:11px;padding:16px;text-align:center"><div style="font-size:28px;margin-bottom:7px">'+e[0]+'</div><div style="font-size:12px;font-weight:700;color:'+e[3]+';margin-bottom:4px">'+e[1]+'</div><div style="font-size:10px;color:#94a3b8;margin-bottom:11px;line-height:1.4">'+e[2]+'</div><button class="btn" style="width:100%;background:'+e[3]+';color:#fff;border-color:'+e[3]+'" onclick="xmToast(\''+e[1]+'\',\'Fonctionnalité disponible\',\'⚙\',\''+e[3]+'\')">Configurer</button></div>';}).join('')
    +'</div></div></div>';

}
