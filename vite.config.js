import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/main.scss" as *;
        `
      }
    }
  },
  build: {
    rolldownOptions: {
      onLog(level, log, defaultHandler) {
        // https://github.com/vueuse/vueuse/issues/5387#issuecomment-4734186040
        if (log.code === 'INVALID_ANNOTATION') return
        else defaultHandler(level, log)
      }
    }
  }
})
