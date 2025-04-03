import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    sourcemap: true // Assurez-vous que les sourcemaps sont activées
  },
  plugins: [tailwindcss(),react()],
  server: {
    proxy: {
      '/user': 'http://localhost:5000',
      '/auth': 'http://localhost:5000',
    },
  },
})
