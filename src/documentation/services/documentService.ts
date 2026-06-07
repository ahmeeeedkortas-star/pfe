import { db } from '../db/database';
import { nextDocumentCode } from './configService';
import type {
  Document,
  DocumentFormInput,
  DocumentStatus,
  DocumentVersion,
  ValidationLog,
} from '../types';

const now = () => new Date().toISOString();

export async function listDocuments(): Promise<Document[]> {
  return db.documents.orderBy('updatedAt').reverse().toArray();
}

export async function getDocument(id: string): Promise<Document | undefined> {
  return db.documents.get(id);
}

export async function getVersions(documentId: string): Promise<DocumentVersion[]> {
  return db.versions.where('documentId').equals(documentId).sortBy('modifiedAt');
}

export async function searchDocuments(
  query: string,
  filters: { type?: string; process?: string; zone?: string; status?: string; isoNorm?: string }
): Promise<Document[]> {
  let rows = await listDocuments();
  const q = query.trim().toLowerCase();
  if (q) {
    rows = rows.filter(
      (d) =>
        d.title.toLowerCase().includes(q) ||
        d.code.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q)
    );
  }
  if (filters.type) rows = rows.filter((d) => d.type === filters.type);
  if (filters.process) rows = rows.filter((d) => d.process === filters.process);
  if (filters.zone) rows = rows.filter((d) => d.zone === filters.zone);
  if (filters.status) rows = rows.filter((d) => d.status === filters.status);
  if (filters.isoNorm) rows = rows.filter((d) => d.isoNorm === filters.isoNorm);
  return rows;
}

async function addVersion(
  doc: Document,
  content: string,
  status: DocumentStatus,
  modifiedBy: string,
  comment?: string
): Promise<DocumentVersion> {
  const v: DocumentVersion = {
    id: crypto.randomUUID(),
    documentId: doc.id,
    version: doc.currentVersion,
    content,
    status,
    modifiedBy,
    modifiedAt: now(),
    comment,
  };
  await db.versions.add(v);
  return v;
}

export async function createDocument(
  input: DocumentFormInput,
  userName: string,
  asDraft = true
): Promise<Document> {
  const code = await nextDocumentCode();
  const id = crypto.randomUUID();
  const status: DocumentStatus = asDraft ? 'Brouillon' : 'En attente QHSE';
  const doc: Document = {
    id,
    code,
    title: input.title.trim(),
    type: input.type,
    process: input.process,
    zone: input.zone,
    location: input.location,
    postId: input.postId,
    isoNorm: input.isoNorm,
    currentVersion: 'V1',
    status,
    responsible: input.responsible,
    createdAt: now(),
    updatedAt: now(),
    content: input.content,
    createdBy: userName,
  };
  await db.documents.add(doc);
  await addVersion(doc, input.content, status, userName);
  if (!asDraft) {
    await logValidation(doc.id, doc.currentVersion, 'Brouillon', status, 'submit', userName);
  }
  return doc;
}

export async function updateDraft(
  id: string,
  input: Partial<DocumentFormInput>,
  userName: string
): Promise<Document> {
  const doc = await getDocument(id);
  if (!doc) throw new Error('Document introuvable');
  if (doc.status !== 'Brouillon') throw new Error('Seuls les brouillons sont modifiables');
  const updated: Document = {
    ...doc,
    ...input,
    title: input.title?.trim() ?? doc.title,
    updatedAt: now(),
    content: input.content ?? doc.content,
  };
  await db.documents.put(updated);
  await addVersion(updated, updated.content, 'Brouillon', userName);
  return updated;
}

export async function submitForValidation(id: string, userName: string): Promise<Document> {
  const doc = await getDocument(id);
  if (!doc || doc.status !== 'Brouillon') throw new Error('Statut invalide');
  return transition(doc, 'En attente QHSE', userName, 'submit');
}

async function transition(
  doc: Document,
  to: DocumentStatus,
  userName: string,
  action: ValidationLog['action'],
  comment?: string
): Promise<Document> {
  const from = doc.status;
  const updated: Document = {
    ...doc,
    status: to,
    updatedAt: now(),
    publishedAt: to === 'Publié' ? now() : doc.publishedAt,
    publishedBy: to === 'Publié' ? userName : doc.publishedBy,
  };
  if (to === 'Publié') {
    const review = new Date();
    review.setMonth(review.getMonth() + 12);
    updated.reviewDueAt = review.toISOString();
  }
  await db.documents.put(updated);
  await addVersion(updated, updated.content, to, userName, comment);
  await logValidation(doc.id, doc.currentVersion, from, to, action, userName, comment);
  return updated;
}

async function logValidation(
  documentId: string,
  versionId: string,
  fromStatus: DocumentStatus,
  toStatus: DocumentStatus,
  action: ValidationLog['action'],
  userName: string,
  comment?: string
): Promise<void> {
  await db.validationLogs.add({
    id: crypto.randomUUID(),
    documentId,
    versionId,
    fromStatus,
    toStatus,
    action,
    comment,
    userId: userName,
    userName,
    at: now(),
  });
}

export async function approveValidation(
  id: string,
  userName: string,
  comment?: string
): Promise<Document> {
  const doc = await getDocument(id);
  if (!doc) throw new Error('Document introuvable');
  if (doc.status === 'En attente QHSE') {
    return transition(doc, 'En attente Direction', userName, 'approve', comment);
  }
  if (doc.status === 'En attente Direction') {
    return transition(doc, 'Publié', userName, 'approve', comment);
  }
  throw new Error('Aucune validation en attente');
}

export async function rejectValidation(
  id: string,
  userName: string,
  comment: string
): Promise<Document> {
  const doc = await getDocument(id);
  if (!doc) throw new Error('Document introuvable');
  return transition(doc, 'Brouillon', userName, 'reject', comment);
}

export async function archiveDocument(id: string, userName: string): Promise<Document> {
  const doc = await getDocument(id);
  if (!doc || doc.status !== 'Publié') throw new Error('Seuls les documents publiés peuvent être archivés');
  return transition(doc, 'Archivé', userName, 'approve');
}

export async function createNewVersionDraft(id: string, userName: string): Promise<Document> {
  const doc = await getDocument(id);
  if (!doc) throw new Error('Document introuvable');
  const num = parseInt(doc.currentVersion.replace(/\D/g, ''), 10) || 1;
  const next = `V${num + 1}`;
  const updated: Document = {
    ...doc,
    currentVersion: next,
    status: 'Brouillon',
    updatedAt: now(),
  };
  await db.documents.put(updated);
  await addVersion(updated, updated.content, 'Brouillon', userName);
  return updated;
}

export async function restoreVersion(
  documentId: string,
  versionId: string,
  userName: string
): Promise<Document> {
  const version = await db.versions.get(versionId);
  const doc = await getDocument(documentId);
  if (!version || !doc) throw new Error('Introuvable');
  const draft = await createNewVersionDraft(documentId, userName);
  return updateDraft(draft.id, { content: version.content }, userName);
}

export async function deleteDraft(id: string): Promise<void> {
  const doc = await getDocument(id);
  if (!doc || doc.status !== 'Brouillon') throw new Error('Suppression impossible');
  await db.versions.where('documentId').equals(id).delete();
  await db.validationLogs.where('documentId').equals(id).delete();
  await db.readLogs.where('documentId').equals(id).delete();
  await db.nonConformities.where('documentId').equals(id).delete();
  await db.documents.delete(id);
}

export async function recordRead(documentId: string, userId: string): Promise<void> {
  const existing = await db.readLogs
    .where({ documentId, userId })
    .first();
  if (existing) {
    await db.readLogs.update(existing.id, { readAt: now() });
  } else {
    await db.readLogs.add({
      id: crypto.randomUUID(),
      documentId,
      userId,
      readAt: now(),
    });
  }
}

export async function addNonConformity(
  documentId: string,
  description: string,
  createdBy: string
): Promise<void> {
  await db.nonConformities.add({
    id: crypto.randomUUID(),
    documentId,
    description,
    createdBy,
    createdAt: now(),
  });
}

export function getPublicDocumentUrl(documentId: string): string {
  const base = typeof window !== 'undefined' ? window.location.origin : '';
  return `${base}/#/public/${documentId}`;
}
