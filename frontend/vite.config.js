import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import envCompatible from 'vite-plugin-env-compatible';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    envCompatible({
      dotenvFile: '.env',
    }),
  ],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
});
