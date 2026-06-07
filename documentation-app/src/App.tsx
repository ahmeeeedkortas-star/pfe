import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ConfigProvider } from './context/ConfigContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import { AdminPage } from './pages/AdminPage';
import { CreateDocumentPage } from './pages/CreateDocumentPage';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { KpiDetailPage } from './pages/KpiDetailPage';
import { LibraryPage } from './pages/LibraryPage';
import { LoginPage } from './pages/LoginPage';
import { PublicDocumentPage } from './pages/PublicDocumentPage';
import { SearchPage } from './pages/SearchPage';
import { TerrainPage } from './pages/TerrainPage';
import { ValidationPage } from './pages/ValidationPage';

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <ConfigProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/public/:id" element={<PublicDocumentPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="bibliotheque" element={<LibraryPage />} />
                <Route path="recherche" element={<SearchPage />} />
                <Route path="validation" element={<ValidationPage />} />
                <Route path="terrain" element={<TerrainPage />} />
                <Route path="admin" element={<AdminPage />} />
                <Route path="kpi" element={<KpiDetailPage />} />
                <Route path="documents/nouveau" element={<CreateDocumentPage />} />
                <Route path="documents/:id" element={<DocumentDetailPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ConfigProvider>
      </AuthProvider>
    </HashRouter>
  );
}
