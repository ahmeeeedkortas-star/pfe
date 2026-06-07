import { StrictMode } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { DocEmbeddedApp, ensureEmbeddedSession } from './DocEmbeddedApp';
import './index.css';

let root: Root | null = null;

export async function mountDocumentationModule(
  container: HTMLElement,
  initialPath = '/bibliotheque'
): Promise<() => void> {
  await ensureEmbeddedSession();
  if (root) {
    root.unmount();
    root = null;
  }
  container.innerHTML = '';
  container.className = 'doc-module-root';
  root = createRoot(container);
  root.render(
    <StrictMode>
      <DocEmbeddedApp initialPath={initialPath} />
    </StrictMode>
  );

  return () => {
    root?.unmount();
    root = null;
    delete window.__DOC_NAV__;
  };
}

export function navigateDocumentationModule(path: string) {
  window.__DOC_NAV__?.(path);
}
