import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/manansala/personalities': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
