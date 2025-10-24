import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    strictPort: true,
    allowedHosts: [
      '.clackypaas.com',
      'localhost',
      '127.0.0.1',
    ],
  },
  build: {
    outDir: 'dist',
  },
});
