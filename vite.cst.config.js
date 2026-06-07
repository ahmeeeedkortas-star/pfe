import { defineConfig } from 'vite';

/** Build IIFE qhse-cst.js pour le monolithe qhse.html */
export default defineConfig({
  publicDir: false,
  build: {
    outDir: '.',
    emptyOutDir: false,
    lib: {
      entry: 'src/qhse-cst-bundle.js',
      name: 'QhseCstBundle',
      formats: ['iife'],
      fileName: () => 'qhse-cst.js',
    },
    rollupOptions: {
      output: {
        extend: true,
        inlineDynamicImports: true,
      },
    },
  },
});
