import type { UserConfigExport } from 'vite'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import svgLoader from "vite-svg-loader"

// https://vite.dev/config/
export default (): UserConfigExport => {
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      /** 将 SVG 静态图转化为 Vue 组件 */
      svgLoader({ defaultImport: "url" }),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [resolve(process.cwd(), 'src/icons/svg')],
        // Specify symbolId format
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  }
}
