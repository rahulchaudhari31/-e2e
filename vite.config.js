import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/motion-dom') || id.includes('node_modules/motion-utils')) {
            return 'motion'
          }

          if (id.includes('node_modules/gsap')) {
            return 'gsap'
          }

          if (id.includes('node_modules/lenis')) {
            return 'lenis'
          }

          if (
            id.includes('node_modules/react/') ||
            id.includes('node_modules/react-dom/') ||
            id.includes('node_modules/scheduler/') ||
            id.includes('node_modules/react-router') ||
            id.includes('node_modules/react-helmet-async')
          ) {
            return 'react-vendor'
          }

          return undefined
        },
      },
    },
  },
})
