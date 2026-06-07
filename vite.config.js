import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  plugins: [
    react(),
    tailwindcss({
      content: ['./src/documentation/**/*.{tsx,ts,jsx,js}'],
    }),
  ],
  resolve: {
    alias: {
      '@doc': resolve(__dirname, 'src/documentation'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks(id) {
          if (id.includes('src/documentation')) return 'documentation';
          if (id.includes('legacy/pages/home')) return 'pages-home';
          if (id.includes('legacy/pages/rc')) return 'pages-rc';
          if (id.includes('legacy/pages/nc')) return 'pages-nc';
          if (id.includes('legacy/pages/audit')) return 'pages-audit';
          if (id.includes('legacy/pages/env')) return 'pages-env';
          if (id.includes('legacy/pages/sec')) return 'pages-sec';
          if (id.includes('legacy/core')) return 'legacy-core';
          if (id.includes('legacy/env-helpers')) return 'legacy-env';
          if (id.includes('legacy/notifications') || id.includes('legacy/search')) {
            return 'legacy-shell';
          }
        },
      },
    },
    chunkSizeWarningLimit: 900,
  },
  server: {
    host: true, /* écoute aussi sur 127.0.0.1 (évite ERR_CONNECTION_REFUSED si localhost → IPv4) */
    port: 5173,
    open: true,
    proxy: {
      '/api': { target: 'http://localhost:3001', changeOrigin: true },
    },
  },
});
