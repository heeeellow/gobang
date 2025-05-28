import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)) // 支持 '@/xx'
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8080',          // REST 代理到后端
      '/ws': {
        target: 'ws://localhost:8080',
        ws: true
      }
    }
  }
})
