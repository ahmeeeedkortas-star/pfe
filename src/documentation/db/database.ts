import Dexie, { type Table } from 'dexie';
import type {
  AppConfig,
  Document,
  DocumentVersion,
  NonConformity,
  ReadLog,
  User,
  ValidationLog,
} from '../types';

export class QhseDocDB extends Dexie {
  documents!: Table<Document, string>;
  versions!: Table<DocumentVersion, string>;
  users!: Table<User, string>;
  validationLogs!: Table<ValidationLog, string>;
  readLogs!: Table<ReadLog, string>;
  nonConformities!: Table<NonConformity, string>;
  config!: Table<{ id: string; value: AppConfig }, string>;
  meta!: Table<{ key: string; value: number }, string>;

  constructor() {
    super('qhse_documentation');
    this.version(1).stores({
      documents: 'id, code, status, type, process, zone, postId, updatedAt',
      versions: 'id, documentId, version',
      users: 'id, login',
      validationLogs: 'id, documentId, at',
      readLogs: 'id, documentId, userId',
      nonConformities: 'id, documentId',
      config: 'id',
      meta: 'key',
    });
    this.version(2).stores({
      users: 'id, login, role',
    });
  }
}

export const db = new QhseDocDB();
