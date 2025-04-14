import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/sentence-construction', // update to match your repo name
  plugins: [react()],
})
