import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: false
  },
  plugins: [react()],
  server: {
    proxy: {
      '/user': 'http://localhost:5000',
      '/auth': 'http://localhost:5000',
    },
  },
})
