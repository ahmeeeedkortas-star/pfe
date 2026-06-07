/**
 * Données de test optionnelles — uniquement via bouton utilisateur.
 * Aucun seed automatique au démarrage.
 */
import { db } from '../db/database';
import { getConfig } from './configService';
import { createDocument } from './documentService';

export async function generateSampleData(userName: string): Promise<number> {
  const existing = await db.documents.count();
  if (existing > 0) return 0;

  const config = await getConfig();
  const type = config.documentTypes[0] ?? 'Type A';
  const process = config.processes[0] ?? 'Processus A';
  const zone = config.zones[0] ?? 'Zone A';

  const samples = [
    {
      title: 'Document exemple 1',
      content: '# Exemple\n\nContenu markdown de démonstration.',
      responsible: userName,
    },
    {
      title: 'Document exemple 2',
      content: '## Procédure\n\nÉtapes à compléter par l\'utilisateur.',
      responsible: userName,
    },
  ];

  for (const s of samples) {
    await createDocument(
      {
        title: s.title,
        type,
        process,
        zone,
        responsible: s.responsible,
        content: s.content,
      },
      userName,
      true
    );
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
