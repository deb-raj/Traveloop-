import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,        // run on port 3000 (matches your Spring Boot CORS)
    open: true,
  },
})