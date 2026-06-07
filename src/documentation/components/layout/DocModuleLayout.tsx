import { Outlet } from 'react-router-dom';

/** Shell minimal : navigation via la barre d'icônes plateforme (doc-dash, doc-liste, …). */
export function DocModuleLayout() {
  return (
    <div className="doc-embedded w-full">
      <div className="doc-embedded-content">
        <Outlet />
      </div>
    </div>
  );
}
