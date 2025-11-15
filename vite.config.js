import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    host: true,      // so it works on LAN/Tailscale
    port: 5173,
    proxy: {
      // All /api calls from React -> go to backend over Tailscale
      '/api': 'http://100.70.181.100:8088',
    },
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
