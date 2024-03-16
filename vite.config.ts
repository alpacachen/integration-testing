/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import UnoCSS from 'unocss/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), UnoCSS()],
  test: {
    environment: 'jsdom',
    setupFiles: ['test.setup.js'],
    coverage: {
      provider: 'istanbul',
      exclude: [
        'coverage/**',
        'dist/**',
        '**/[.]**',
        'packages/*/test?(s)/**',
        '**/*.d.ts',
        '**/virtual:*',
        '**/__x00__*',
        '**/\x00*',
        'cypress/**',
        'test?(s)/**',
        'test?(-*).?(c|m)[jt]s?(x)',
        '**/*{.,-}{test,spec}.?(c|m)[jt]s?(x)',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/vitest.{workspace,projects}.[jt]s?(on)',
        '**/.{eslint,mocha,prettier}rc.{?(c|m)js,yml}',
        'server'
      ]
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
