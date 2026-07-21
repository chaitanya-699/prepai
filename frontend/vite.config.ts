import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
         allowedHosts: ['329b-157-50-154-0.ngrok-free.app']
    }
})
