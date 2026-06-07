export function patchAuditModule() {
  if (window.ICONS?.audit) {
    window.ICONS.audit = [
      { id: 'audit-tb', icon: 'grid', lb: 'Tableau de bord', bg: '#EFF6FF', c: '#1E40AF' },
      { id: 'audit-planning', icon: 'calendar', lb: 'Planning', bg: '#F0FDF4', c: '#166534' },
      { id: 'audit-liste', icon: 'clipboard', lb: 'Audits', bg: '#EAF3DE', c: '#3B6D11' },
      { id: 'audit-checklist', icon: 'check-circle', lb: 'Checklists', bg: '#F5F3FF', c: '#5B21B6' },
      { id: 'audit-constats', icon: 'alert', lb: 'Constats', bg: '#FEF2F2', c: '#DC2626' },
      { id: 'audit-actions', icon: 'zap', lb: 'Actions', bg: '#FEF3C7', c: '#92400E' },
      { id: 'audit-docs', icon: 'file', lb: 'Documents & rapports', bg: '#EFF6FF', c: '#1E40AF' },
      { id: 'audit-auditeurs', icon: 'users', lb: 'Auditeurs', bg: '#F5F3FF', c: '#5B21B6' },
      { id: 'audit-config', icon: 'settings', lb: 'Configuration', bg: '#F8FAFC', c: '#475569' },
    ];
  }

  const auditTitles = {
    audit: ['Audit', 'Gestion des audits internes ISO', ''],
    'audit-tb': ['⊞ Dashboard & KPI Audit', 'Conformité · NC/AC · Notifications · Processus', `<button class="btn bp" onclick="auditNew()">+ Nouvel audit</button>`],
    'audit-planning': ['📅 Planning des audits', 'Programme annuel · Listes dynamiques', `<button class="btn bp" onclick="auditNew()">+ Planifier</button><button class="btn bsm" onclick="auditManageProcesses()">Processus</button><button class="btn bsm" onclick="auditManageTypes()">Types</button><button class="btn bsm" onclick="auditManageAuditors()">Auditeurs</button>`],
    'audit-liste': ['📋 Tous les audits', 'Registre complet · Filtres · Kanban / Liste', `<button class="btn bp" onclick="auditNew()">+ Nouvel audit</button>`],
    'audit-checklist': ['✓ Checklists ISO', 'Référentiels ISO 9001 · 14001 · 45001', `<button class="btn bp" onclick="auditNewChecklist()">+ Nouvelle checklist</button>`],
    'audit-constats': ["⚠ Constats d'audit", 'NC · Axes d\'amélioration (AC) · Criticité · Délais', `<button class="btn bp" onclick="auditNewConstat()">+ Nouveau constat</button>`],
    'audit-actions': ['⚡ Actions correctives', 'Suivi des actions · Délais · Progression', `<button class="btn bp" onclick="auditNewAction()">+ Nouvelle action</button>`],
    'audit-docs': ['📄 Documents & Preuves', 'Pièces jointes · Rapports · Enregistrements', `<button class="btn bp" onclick="auditAddDoc()">+ Ajouter</button>`],
    'audit-auditeurs': ['👥 Gestion des auditeurs', 'Liste dynamique · Habilitations', `<button class="btn bp" onclick="auditManageAuditors()">Gérer la liste</button><button class="btn bsm" onclick="auditNewAuditeur()">+ Ajouter</button>`],
    'audit-config': ["⚙ Configuration", "Référentiels · Types d'audit · Paramètres", ''],
  };

  if (window.TITLES) Object.assign(window.TITLES, auditTitles);
}
