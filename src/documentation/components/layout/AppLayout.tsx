import { FileText, LayoutDashboard, LogOut, MapPin, Search, Settings, ShieldCheck } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const nav = [
  { to: '/', icon: LayoutDashboard, label: 'Tableau de bord' },
  { to: '/bibliotheque', icon: FileText, label: 'Bibliothèque' },
  { to: '/recherche', icon: Search, label: 'Recherche' },
  { to: '/validation', icon: ShieldCheck, label: 'Validation' },
  { to: '/terrain', icon: MapPin, label: 'Terrain' },
  { to: '/admin', icon: Settings, label: 'Configuration' },
];

export function AppLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <aside className="flex w-56 flex-col border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-800">QHSE</p>
          <p className="text-sm font-bold text-slate-900">Gestion documentaire</p>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {nav.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-blue-50 text-blue-800' : 'text-slate-600 hover:bg-slate-50'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-slate-200 p-3 text-xs text-slate-600">
          <p className="font-medium text-slate-800">{user?.displayName}</p>
          <p>{user?.role}</p>
          <button
            type="button"
            onClick={logout}
            className="mt-2 flex items-center gap-1 text-red-600 hover:underline"
          >
            <LogOut size={14} /> Déconnexion
          </button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
