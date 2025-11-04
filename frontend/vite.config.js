import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
    strictPort: true,
    // Add the specific Clacky host that's being blocked
    allowedHosts: [
      '3001-b9e2753da0f9-web.clackypaas.com',
      '.clackypaas.com',
      'localhost',
      '127.0.0.1',
    ],
    hmr: {
      clientPort: 3001,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5060',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
