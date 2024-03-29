import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver, VueUseComponentsResolver, VueUseDirectiveResolver, Vuetify3Resolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { VitePWA } from 'vite-plugin-pwa'
import Markdown from 'unplugin-vue-markdown/vite'
import LinkAttributes from 'markdown-it-link-attributes'
import Shiki from 'markdown-it-shiki'
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Layouts from 'vite-plugin-vue-layouts'
import WebfontDownload from 'vite-plugin-webfont-dl'
import { webUpdateNotice } from '@plugin-web-update-notification/vite'
import { vitePluginVersionMark } from 'vite-plugin-version-mark'
import VueDevTools from 'vite-plugin-vue-devtools'
import { viteVueCSSVars } from 'unplugin-vue-cssvars'
import Pages from 'vite-plugin-pages'
import postcssPresetEnv from 'postcss-preset-env'

import virtual from 'vite-plugin-virtual'
import { VitePluginMock } from './plugin'

// https://vitejs.dev/config/
const vendorLibs: { match: string[]; output: string }[] = [
  {
    match: ['naive-ui'],
    output: 'naive-ui',
  },
]
// 分包
function configManualChunk(id: string) {
  if (/[\\/]node_modules[\\/]/.test(id)) {
    const matchItem = vendorLibs.find((item) => {
      const reg = new RegExp(
        `[\\/]node_modules[\\/]_?(${item.match.join('|')})(.*)`,
        'ig',
      )
      return reg.test(id)
    })
    return matchItem ? matchItem.output : null
  }
}
// eslint-disable-next-line unused-imports/no-unused-vars
export default defineConfig(({ command, mode }) => {
  const { VITE_APP_NAME, VITE_APP_DESCRIPTION, VITE_DEV_PORT, VITE_API_BASE_PREFIX, VITE_API_BASE_URL } = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      VueDevTools(), // https://github.com/JohnCampionJr/vite-plugin-vue-layouts

      virtual({
        'virtual:module': 'export default { mode: \'web\' }',
      }), // https://github.com/patak-dev/vite-plugin-virtual

      VitePluginMock({ prefix: VITE_API_BASE_PREFIX }),
      // https://github.com/hannoeru/vite-plugin-pages
      Pages({
        extensions: ['vue', 'md'],
      }),
      // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
      Layouts(),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      webUpdateNotice({
        logVersion: true,
      }),
      vitePluginVersionMark({
        // name: 'test-app',
        // version: '0.0.1',
        // command: 'git describe --tags',
        ifGitSHA: true,
        ifShortSHA: true,
        ifMeta: true,
        ifLog: true,
        ifGlobal: true,
      }), // https://github.com/ZhongxuYang/vite-plugin-version-mark

      vue({
        script: {
          defineModel: true,
        },
        include: [/\.vue$/, /\.md$/],
      }),
      vueJsx(),
      // https://github.com/feat-agency/vite-plugin-webfont-dl

      viteVueCSSVars({
        include: [/.vue/],
        includeCompile: ['**/**.scss'],
        server: false,
      }), // https://github.com/baiwusanyu-c/unplugin-vue-cssvars

      WebfontDownload(),
      // https://github.com/webfansplz/vite-plugin-vue-inspector
      Icons({ compiler: 'vue3' }),
      // https://github.com/antfu/unplugin-auto-import
      AutoImport({
        /* options */
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: [
          'vue',
          '@vueuse/core',
          '@vueuse/head',
          'pinia',
          'vue-router',
          'vue-i18n',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dirs: ['src/hooks', 'src/composables', 'src/stores', 'src/utils', 'src/apis'],
        dts: 'src/typings/auto-import.d.ts',
        vueTemplate: true,
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: ['src/components', 'src/layouts'],
        extensions: ['vue', 'md'],
        deep: true,
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: 'src/typings/components.d.ts',
        resolvers: [
          NaiveUiResolver(),
          Vuetify3Resolver(),
          VueUseComponentsResolver(),
          VueUseDirectiveResolver(),
        ],
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss(),
      // https://github.com/intlify/bundle-tools/tree/main/packages/unplugin-vue-i18n
      VueI18nPlugin({
        runtimeOnly: true,
        compositionOnly: true,
        fullInstall: true,
        include: resolve(__dirname, './src/locales/**'),
      }),
      // https://github.com/antfu/vite-plugin-vue-markdown
      Markdown({
        wrapperClasses: 'prose prose-sm m-auto text-left',
        headEnabled: true,
        markdownItSetup(md) {
          // https://prismjs.com/
          md.use(Shiki, {
            theme: {
              light: 'vitesse-light',
              dark: 'vitesse-dark',
            },
          })
          md.use(LinkAttributes, {
            matcher: (link: string) => /^https?:\/\//.test(link),
            attrs: {
              target: '_blank',
              rel: 'noopener',
            },
          })
        },
      }),
      // https://github.com/antfu/vite-plugin-pwa
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'safari-pinned-tab.svg'],
        manifest: {
          name: VITE_APP_NAME,
          short_name: VITE_APP_NAME,
          description: VITE_APP_DESCRIPTION,
          theme_color: '#ffffff',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable',
            },
          ],
        },
        devOptions: {
          enabled: process.env.SW_DEV === 'true',
          /* when using generateSW the PWA plugin will switch to classic */
          type: 'module',
          navigateFallback: 'index.html',
        },
      }),
    ],
    clearScreen: true,
    server: {
      port: Number(VITE_DEV_PORT),
      host: true, // host设置为true才可以使用network的形式，以ip访问项目
      open: false, // 自动打开浏览器
      cors: true, // 跨域设置允许
      strictPort: true, // 如果端口已占用直接退出
      proxy: {
        [VITE_API_BASE_PREFIX]: {
          target: VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\`${VITE_API_BASE_PREFIX}`/, ''),
        },
      },
    },
    build: {
      minify: 'esbuild',
      brotliSize: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 2000,
      // 在生产环境移除console.log
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      assetsDir: 'static/assets',
      // 静态资源打包到dist下的不同目录
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          // manualChunks: configManualChunk,
        },
      },
    },
    resolve: {
      alias: {
        '~': resolve(__dirname, './src'), // 路径别名
        'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
    },
    css: {
      modules: {
        localsConvention: 'camelCase',
        scopeBehaviour: 'local',
      },
      postcss: {
        plugins: [
          postcssPresetEnv(),
        ],
      },
    },
  }
})
