import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
// import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'
import remarkFrontmatter from 'remark-frontmatter'
import { nitroV2Plugin } from '@tanstack/nitro-v2-vite-plugin'
import type { Plugin } from 'vite'

// Plugin to prevent duplicate CSS injection
const preventDuplicateCSS = (): Plugin => ({
  name: 'prevent-duplicate-css',
  enforce: 'post',
  generateBundle(_options, bundle) {
    // Find all CSS assets
    const cssAssets = Object.entries(bundle).filter(
      ([, asset]) => asset.type === 'asset' && asset.fileName.endsWith('.css')
    )
    
    // If there are multiple CSS files, keep only the last one (most recent)
    if (cssAssets.length > 1) {
      cssAssets.slice(0, -1).forEach(([name]) => {
        delete bundle[name]
      })
    }
  },
})

const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    // tailwindcss(),
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
    preventDuplicateCSS(),
  ],
  ssr: {
    external: ['@vercel/og', 'satori', 'yoga-wasm-web'],
  },
})

export default config
