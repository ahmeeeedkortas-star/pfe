/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EMPTY_DATA?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
