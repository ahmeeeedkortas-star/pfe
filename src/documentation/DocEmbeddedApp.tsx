import { useEffect } from 'react';
import { MemoryRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from './context/ConfigContext';
import { DocModuleLayout } from './components/layout/DocModuleLayout';
import { AdminPage } from './pages/AdminPage';
import { CreateDocumentPage } from './pages/CreateDocumentPage';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { DocumentHistoriquePage } from './pages/DocumentHistoriquePage';
import { DocumentPublicationPage } from './pages/DocumentPublicationPage';
import { DocumentValidationScreen } from './pages/DocumentValidationScreen';
import { DocumentWorkflowPage } from './pages/DocumentWorkflowPage';
import { KpiDetailPage } from './pages/KpiDetailPage';
import { LibraryPage } from './pages/LibraryPage';
import { SearchPage } from './pages/SearchPage';
import { TerrainPage } from './pages/TerrainPage';
import { ValidationPage } from './pages/ValidationPage';
import { ensureUsersSeeded } from './services/authService';
import { db } from './db/database';

const SESSION_KEY = 'qhse_doc_session';

async function ensureEmbeddedSession() {
  await ensureUsersSeeded();
  if (!localStorage.getItem(SESSION_KEY)) {
    const direction = await db.users.where('role').equals('Direction').first();
    if (direction) localStorage.setItem(SESSION_KEY, direction.id);
  }
}

function NavBridge({ path }: { path: string }) {
  const navigate = useNavigate();
  useEffect(() => {
    window.__DOC_NAV__ = navigate;
    navigate(path);
    return () => {
      delete window.__DOC_NAV__;
    };
  }, [path, navigate]);
  return null;
}

function DocRoutes() {
  return (
    <Routes>
      <Route element={<DocModuleLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="bibliotheque" element={<LibraryPage />} />
        <Route path="recherche" element={<SearchPage />} />
        <Route path="validation" element={<ValidationPage />} />
        <Route path="terrain" element={<TerrainPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="kpi" element={<KpiDetailPage />} />
        <Route path="documents/nouveau" element={<CreateDocumentPage />} />
        <Route path="documents/:id/workflow" element={<DocumentWorkflowPage />} />
        <Route path="documents/:id/historique" element={<DocumentHistoriquePage />} />
        <Route path="documents/:id/publication" element={<DocumentPublicationPage />} />
        <Route path="documents/:id/validation" element={<DocumentValidationScreen />} />
        <Route path="documents/:id" element={<DocumentDetailPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export function DocEmbeddedApp({ initialPath = '/bibliotheque' }: { initialPath?: string }) {
  return (
    <MemoryRouter initialEntries={[initialPath]} initialIndex={0}>
      <AuthProvider>
        <ConfigProvider>
          <NavBridge path={initialPath} />
          <DocRoutes />
        </ConfigProvider>
      </AuthProvider>
    </MemoryRouter>
  );
}

export { ensureEmbeddedSession };

declare global {
  interface Window {
    __DOC_NAV__?: (path: string) => void;
  }
}
