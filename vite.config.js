import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// For GitHub Pages: repository name is infohub.github.io
// It will be served from: https://cheifx.github.io/infohub.github.io/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/infohub.github.io/' : '/',
})

