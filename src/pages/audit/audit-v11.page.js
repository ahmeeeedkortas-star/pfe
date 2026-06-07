import { ensureAuditV11SeedData } from './audit-v11-data.js';
import { installAuditV11CrudFromV11 } from './audit-v11-crud.js';
import { enhanceAuditV11Crud } from './audit-enhance-crud.js';
import { renderAuditDashboard } from './audit-dashboard.page.js';
import { renderAuditConstatsModern } from './audit-constats-modern.page.js';
import { renderAuditChecklistModern } from './audit-checklist-modern.page.js';
import { renderAuditDocsModern } from './audit-docs-modern.page.js';
import { renderAuditConfigModern } from './audit-config-modern.page.js';
import {
  v11_audit_planning,
  v11_audit_liste,
  v11_audit_actions,
  v11_audit_auditeurs,
} from '../../modules-v11/generated/index.js';

export function ensureAuditV11Data() {
  ensureAuditV11SeedData();
}

export function installAuditV11Crud() {
  ensureAuditV11Data();
  installAuditV11CrudFromV11();
  enhanceAuditV11Crud();
}

function wrap(fn) {
  return () => {
    ensureAuditV11Data();
    return fn();
  };
}

export const renderAuditV11Dashboard = wrap(renderAuditDashboard);
export const renderAuditV11Planning = wrap(v11_audit_planning);
export const renderAuditV11Liste = wrap(v11_audit_liste);
export const renderAuditV11Checklist = wrap(renderAuditChecklistModern);
export const renderAuditV11Constats = wrap(renderAuditConstatsModern);
export const renderAuditV11Actions = wrap(v11_audit_actions);
export const renderAuditV11Docs = wrap(renderAuditDocsModern);
export const renderAuditV11Auditeurs = wrap(v11_audit_auditeurs);
export const renderAuditV11Config = wrap(renderAuditConfigModern);
