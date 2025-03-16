import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      base: '/otus-react-shop/',
      'process.env': env,
    },
    plugins: [react()],
  };
});
