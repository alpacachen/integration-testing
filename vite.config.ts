/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'istanbul',
    }
  },
  server: {
    proxy: {
      '/hupu': {
        target: 'https://m.hupu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hupu/, ''),
      },
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    }
  },
})
