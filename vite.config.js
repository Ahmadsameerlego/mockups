import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {  // Use 'server' instead of 'devServer'
    proxy: {
      '/api': {
        target: 'https://oceanoutdoor-mockup.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),  // rewrite the path if needed
        secure: false,  // set to true if using https and self-signed certificates
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
