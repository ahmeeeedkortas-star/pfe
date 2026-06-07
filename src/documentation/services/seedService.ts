/**
 * Données de test optionnelles — uniquement via bouton Admin « Créer des exemples ».
 * Aucun seed automatique au démarrage.
 */
import { db } from '../db/database';
import { getConfig, nextDocumentCode } from './configService';
import type { Document, DocumentStatus, DocumentVersion } from '../types';

const now = () => new Date().toISOString();

async function seedDocument(
  input: {
    title: string;
    type: string;
    process: string;
    zone: string;
    content: string;
    responsible: string;
    status: DocumentStatus;
    postId?: string;
    isoNorm?: string;
    publishedBy?: string;
  },
  userName: string
): Promise<void> {
  const code = await nextDocumentCode();
  const id = crypto.randomUUID();
  const published = input.status === 'Publié';
  const doc: Document = {
    id,
    code,
    title: input.title,
    type: input.type,
    process: input.process,
    zone: input.zone,
    postId: input.postId,
    isoNorm: input.isoNorm,
    currentVersion: 'V1',
    status: input.status,
    responsible: input.responsible,
    createdAt: now(),
    updatedAt: now(),
    publishedAt: published ? now() : undefined,
    publishedBy: published ? (input.publishedBy ?? userName) : undefined,
    reviewDueAt: published
      ? new Date(Date.now() + 365 * 86400000).toISOString()
      : undefined,
    content: input.content,
    createdBy: userName,
  };
  await db.documents.add(doc);
  const version: DocumentVersion = {
    id: crypto.randomUUID(),
    documentId: id,
    version: 'V1',
    content: input.content,
    status: input.status,
    modifiedBy: userName,
    modifiedAt: now(),
    comment: 'Version initiale (exemple)',
  };
  await db.versions.add(version);
}

export async function generateSampleData(userName: string): Promise<number> {
  const existing = await db.documents.count();
  if (existing > 0) return 0;

  const config = await getConfig();
  const typeSmi = config.documentTypes.find((t) => t === 'SMI') ?? config.documentTypes[0] ?? 'SMI';
  const typeProc =
    config.documentTypes.find((t) => t.includes('Procéd')) ?? config.documentTypes[1] ?? 'Procédures';
  const typeIt =
    config.documentTypes.find((t) => t.includes('Instruction')) ??
    config.documentTypes[2] ??
    'Instructions de travail';
  const typeEnr =
    config.documentTypes.find((t) => t.includes('Enregistr')) ??
    config.documentTypes[3] ??
    'Enregistrements';

  const processQhse = config.processes.find((p) => p.includes('QHSE')) ?? config.processes[0] ?? 'Management QHSE';
  const processProd = config.processes.find((p) => p === 'Production') ?? config.processes[1] ?? 'Production';
  const processAudit = config.processes.find((p) => p.includes('Audit')) ?? config.processes[3] ?? 'Audit interne';
  const zoneSiege = config.zones.find((z) => z === 'Siège') ?? config.zones[0] ?? 'Siège';
  const zoneAtelier =
    config.zones.find((z) => z.includes('Usinage')) ?? config.zones[1] ?? 'Atelier Usinage';
  const postCnc = config.posts.find((p) => p === 'CNC-01') ?? config.posts[0] ?? 'CNC-01';

  const samples = [
    {
      title: 'Politique QHSE',
      type: typeSmi,
      process: processQhse,
      zone: zoneSiege,
      content: '# Politique QHSE\n\nEngagement de la direction en matière de qualité, sécurité et environnement.',
      responsible: userName,
      status: 'Publié' as DocumentStatus,
      isoNorm: config.isoNorms[0],
    },
    {
      title: 'Audit interne',
      type: typeProc,
      process: processAudit,
      zone: zoneSiege,
      content: '# Procédure audit interne\n\nPlanification, réalisation et suivi des audits du SMI.',
      responsible: userName,
      status: 'En attente QHSE' as DocumentStatus,
      isoNorm: config.isoNorms[0],
    },
    {
      title: 'Instruction CNC',
      type: typeIt,
      process: processProd,
      zone: zoneAtelier,
      content:
        '# Instruction de réglage machine CNC\n\n## Sécurité\nPort des EPI obligatoire.\n\n## Réglage\n1. Vérifier le parc-outils\n2. Charger le programme\n3. Contrôle pièce pilote',
      responsible: userName,
      status: 'Publié' as DocumentStatus,
      postId: postCnc,
      isoNorm: config.isoNorms[0],
    },
    {
      title: 'Check-list 5S',
      type: typeEnr,
      process: processProd,
      zone: zoneAtelier,
      content: '# Check-list 5S — Poste CNC\n\n- [ ] Seiri\n- [ ] Seiton\n- [ ] Seiso\n- [ ] Seiketsu\n- [ ] Shitsuke',
      responsible: userName,
      status: 'Publié' as DocumentStatus,
      postId: postCnc,
    },
  ];

  for (const s of samples) {
    await seedDocument(s, userName);
  }

  return samples.length;
}

export async function clearAllData(): Promise<void> {
  await db.documents.clear();
  await db.versions.clear();
  await db.validationLogs.clear();
  await db.readLogs.clear();
  await db.nonConformities.clear();
  await db.meta.clear();
}
