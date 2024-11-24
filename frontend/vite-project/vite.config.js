import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true, // Ensures routing works on refresh in dev
  },
  build: {
    rollupOptions: {
      output: {
        // Optional: Adjust chunking for cleaner output
      },
    },
  },
});
