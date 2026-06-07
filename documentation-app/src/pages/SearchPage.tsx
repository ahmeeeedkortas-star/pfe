import { LibraryPage } from './LibraryPage';

/** Recherche intelligente — même UI que bibliothèque avec surlignage temps réel */
export function SearchPage() {
  return (
    <div>
      <p className="mb-4 text-sm text-slate-600">
        Recherche en temps réel sur titre, code et contenu. Filtres avancés (type, processus, zone, statut, norme ISO via bibliothèque).
      </p>
      <LibraryPage />
    </div>
  );
}
