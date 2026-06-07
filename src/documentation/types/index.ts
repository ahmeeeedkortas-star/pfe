export type DocumentStatus =
  | 'Brouillon'
  | 'En attente QHSE'
  | 'En attente Direction'
  | 'Publié'
  | 'Archivé';

export type UserRole = 'Opérateur' | 'Qualité' | 'Ingénieur' | 'Direction';

export interface AppConfig {
  documentTypes: string[];
  processes: string[];
  zones: string[];
  posts: string[];
  isoNorms: string[];
  unreadDaysThreshold: number;
  isoReviewMonths: number;
  codePrefix: string;
}

export interface User {
  id: string;
  login: string;
  displayName: string;
  role: UserRole;
  password: string;
}

export interface DocumentVersion {
  id: string;
  documentId: string;
  version: string;
  content: string;
  status: DocumentStatus;
  modifiedBy: string;
  modifiedAt: string;
  comment?: string;
}

export interface NonConformity {
  id: string;
  documentId: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface ValidationLog {
  id: string;
  documentId: string;
  versionId: string;
  fromStatus: DocumentStatus;
  toStatus: DocumentStatus;
  action: 'submit' | 'approve' | 'reject';
  comment?: string;
  userId: string;
  userName: string;
  at: string;
}

export interface ReadLog {
  id: string;
  documentId: string;
  userId: string;
  readAt: string;
}

export interface Document {
  id: string;
  code: string;
  title: string;
  type: string;
  process: string;
  zone: string;
  location?: string;
  postId?: string;
  isoNorm?: string;
  currentVersion: string;
  status: DocumentStatus;
  responsible: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  publishedBy?: string;
  reviewDueAt?: string;
  content: string;
  createdBy: string;
}

export interface DocumentFormInput {
  title: string;
  type: string;
  process: string;
  zone: string;
  location?: string;
  postId?: string;
  isoNorm?: string;
  responsible: string;
  content: string;
}

export interface KpiSnapshot {
  upToDatePercent: number;
  obsoletePercent: number;
  inValidationCount: number;
  avgValidationDays: number;
  avgVersionsPerDoc: number;
  unreadCount: number;
  isoCompliancePercent: number;
  byType: { type: string; count: number }[];
  totalDocuments: number;
  publishedCount: number;
  activeUsers: number;
  consultations30d: number;
  upToDateCount: number;
  obsoleteCount: number;
  validationsByMonth: { month: string; count: number }[];
}

export interface AlertItem {
  id: string;
  severity: 'info' | 'warning' | 'critical';
  message: string;
  documentId?: string;
  documentCode?: string;
}
