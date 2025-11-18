// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: true,   // so you can also open via 127.0.0.1 or LAN if needed
    port: 5173,
    proxy: {
      '/api': 'http://localhost:8088',  // 👈 Spring Boot
      // or 'http://127.0.0.1:8088'
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
