import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport, {VantResolve} from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    styleImport({
      resolves: [VantResolve()],
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `../es/${name}/style`
        }
      ]

    })
  ],
  server: {
    // 指定开发服务器的主机名，默认为 localhost
    host: 'localhost',
    // 指定开发服务器的端口号，默认为 3000
    port: 3000,
    // 是否开启 https，默认为 false
    https: false,
    // 是否允许跨域请求，默认为 true
    cors: true,
    // 指定代理规则，用于解决跨域问题
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    },
  }
})
