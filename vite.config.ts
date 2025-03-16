import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    base: '/otus-react-shop/',
    define: {
      'process.env': env,
    },
    plugins: [react()],
  };
});
