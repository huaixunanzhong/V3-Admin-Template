import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv
  console.log(env)
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
        // 自动导入vue相关函数，如: ref、reactive、toRef等
        imports: ['vue', 'vue-router'],
        dts: 'src/auto-import.d.ts'
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: 'url' }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]'
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    }
  }
})
