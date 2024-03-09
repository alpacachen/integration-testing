import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  server: {
    proxy: {
      '/hupu': {
        target: 'https://m.hupu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/hupu/, ''),
      },
    }
  }
})
