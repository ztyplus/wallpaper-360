import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  server: {
    port: 3000,
    host: '0.0.0.0',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/search': {
        target: "http://wallpaper.apc.360.cn/index.php",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/search/, '')
      },
      '/imglist': {
        target: "http://wallpaper.apc.360.cn/index.php",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/imglist/, '')
      },
    }
  },

  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
