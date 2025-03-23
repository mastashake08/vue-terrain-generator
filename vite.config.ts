import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueTerrainGenerator',
      fileName: (format) => `vue-terrain-generator.${format}.js`,
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue', 'three', 'simplex-noise'],
      output: {
        globals: {
          vue: 'Vue',
          three: 'THREE',
          'simplex-noise': 'SimplexNoise'
        }
      }
    }
  }
})
