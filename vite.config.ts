import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  base: '/Truth-Knowability-Ethics-Benefit/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n-vendor': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'motion-vendor': ['framer-motion'],
          'charts-vendor': ['recharts'],
          'storage-vendor': ['dexie', 'zustand'],
        },
      },
    },
    chunkSizeWarningLimit: 700,
  },
});
