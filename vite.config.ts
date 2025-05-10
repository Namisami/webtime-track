// vite.config.react.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webExtension from 'vite-plugin-web-extension'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    webExtension({
      additionalInputs: ['index.html'],
      manifest: 'public/manifest.json'
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src/"),
    },
  },
})
