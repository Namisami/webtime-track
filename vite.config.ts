import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import hotReloadExtension from 'hot-reload-extension-vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/manifest.json',
          dest: '.',
        },
      ],
    }),
    hotReloadExtension({
      log: true,
      backgroundPath: 'src/main.tsx',
    }),
  ],
})
