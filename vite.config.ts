import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'

const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    nitroV2Plugin({ 
      preset: 'bun',
      rollupConfig: {
        external: ['@vercel/og', 'satori', 'yoga-wasm-web'],
      },
    }),
    mdx({
      remarkPlugins: [remarkGfm, remarkFrontmatter],
    }),
    viteReact(),
  ],
  ssr: {
    external: ['@vercel/og', 'satori', 'yoga-wasm-web'],
  },
})

export default config
