import { db } from '../db/database';
import { getConfig } from './configService';
import type { AlertItem, Document, KpiSnapshot } from '../types';

function daysBetween(a: string, b: string): number {
  return Math.abs(new Date(b).getTime() - new Date(a).getTime()) / 86400000;
}

export async function computeKpis(): Promise<KpiSnapshot> {
  const docs = await db.documents.toArray();
  const config = await getConfig();
  const published = docs.filter((d) => d.status === 'Publié');
  const inValidation = docs.filter(
    (d) => d.status === 'En attente QHSE' || d.status === 'En attente Direction'
  );

  const latestByCode = new Map<string, Document>();
  for (const d of docs) {
    const key = d.code;
    const prev = latestByCode.get(key);
    if (!prev || new Date(d.updatedAt) > new Date(prev.updatedAt)) {
      latestByCode.set(key, d);
    }
  }
  const latest = [...latestByCode.values()];
  const upToDate = latest.filter((d) => d.status === 'Publié').length;
  const obsolete = latest.filter((d) => d.status === 'Archivé').length;
  const totalUnique = latest.length || 1;

  const logs = await db.validationLogs.toArray();
  const publishLogs = logs.filter((l) => l.toStatus === 'Publié');
  let avgValidationDays = 0;
  if (publishLogs.length) {
    const delays = await Promise.all(
      publishLogs.map(async (l) => {
        const first = await db.validationLogs
          .where('documentId')
          .equals(l.documentId)
          .filter((x) => x.action === 'submit')
          .first();
        if (!first) return 0;
        return daysBetween(first.at, l.at);
      })
    );
    avgValidationDays = delays.reduce((a, b) => a + b, 0) / delays.length;
  }

  const versionCounts = await Promise.all(
    [...new Set(docs.map((d) => d.id))].map(async (id) =>
      db.versions.where('documentId').equals(id).count()
    )
  );
  const avgVersions =
    versionCounts.length > 0
      ? versionCounts.reduce((a, b) => a + b, 0) / versionCounts.length
      : 0;

  const threshold = config.unreadDaysThreshold;
  const userReads = await db.readLogs.toArray();
  const readMap = new Map(userReads.map((r) => [`${r.documentId}`, r.readAt]));
  const unreadCount = published.filter((d) => {
    const last = readMap.get(d.id);
    if (!last) return true;
    return daysBetween(last, new Date().toISOString()) > threshold;
  }).length;

  const isoOk = published.filter((d) => {
    if (!d.reviewDueAt) return false;
    return new Date(d.reviewDueAt) > new Date();
  }).length;
  const isoCompliancePercent =
    published.length > 0 ? Math.round((isoOk / published.length) * 100) : 100;

  const typeMap = new Map<string, number>();
  for (const d of docs) {
    typeMap.set(d.type, (typeMap.get(d.type) ?? 0) + 1);
  }
  const byType = [...typeMap.entries()].map(([type, count]) => ({ type, count }));

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const consultations30d = (await db.readLogs.toArray()).filter(
    (r) => new Date(r.readAt) >= thirtyDaysAgo
  ).length;
  const activeUsers = await db.users.count();

  const monthLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];
  const validationsByMonth: { month: string; count: number }[] = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const y = d.getFullYear();
    const m = d.getMonth();
    const count = logs.filter((l) => {
      const t = new Date(l.at);
      return t.getFullYear() === y && t.getMonth() === m && l.action === 'approve';
    }).length;
    validationsByMonth.push({ month: monthLabels[m], count });
  }

  return {
    upToDatePercent: Math.round((upToDate / totalUnique) * 100),
    obsoletePercent: Math.round((obsolete / totalUnique) * 100),
    inValidationCount: inValidation.length,
    avgValidationDays: Math.round(avgValidationDays * 10) / 10,
    avgVersionsPerDoc: Math.round(avgVersions * 10) / 10,
    unreadCount,
    isoCompliancePercent,
    byType,
    totalDocuments: docs.length,
    publishedCount: published.length,
    activeUsers,
    consultations30d,
    upToDateCount: upToDate,
    obsoleteCount: obsolete,
    validationsByMonth,
  };
}

export async function computeAlerts(): Promise<AlertItem[]> {
  const docs = await db.documents.toArray();
  const alerts: AlertItem[] = [];
  const now = new Date();

  for (const d of docs) {
    if (d.status === 'En attente QHSE' || d.status === 'En attente Direction') {
      const days = daysBetween(d.updatedAt, now.toISOString());
      if (days > 7) {
        alerts.push({
          id: `val-${d.id}`,
          severity: 'warning',
          message: `Validation en retard (${Math.floor(days)} j) — ${d.code}`,
          documentId: d.id,
          documentCode: d.code,
        });
      }
    }
    if (d.reviewDueAt && new Date(d.reviewDueAt) < now && d.status === 'Publié') {
      alerts.push({
        id: `exp-${d.id}`,
        severity: 'critical',
        message: `Revue documentaire expirée — ${d.code}`,
        documentId: d.id,
        documentCode: d.code,
      });
    }
  }

  for (const d of docs) {
    if (!d.responsible?.trim()) {
      alerts.push({
        id: `resp-${d.id}`,
        severity: 'warning',
        message: `Sans responsable — ${d.code}`,
        documentId: d.id,
        documentCode: d.code,
      });
    }
  }

  if (!docs.length) {
    alerts.push({
      id: 'empty',
      severity: 'info',
      message: 'Aucun document enregistré. Créez votre premier document.',
    });
  }

  return alerts.slice(0, 20);
}
