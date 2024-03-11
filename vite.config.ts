import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";
import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  plugins: [react(),
  createHtmlPlugin({
    inject: {
      tags: [
        {
          tag: "script",
          attrs: {
            src: "https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/18.2.0/umd/react.production.min.js",
          },
          injectTo: "head-prepend",
        },
        {
          tag: "script",
          attrs: {
            src: "https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/react-dom/18.2.0/umd/react-dom.production.min.js",
          },
          injectTo: "head-prepend",
        },
        {
          tag: "script",
          attrs: {
            async: 'true',
            src: "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js",
          },
          injectTo: "body",
        },
      ],
    },
  }),
  ],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    host: "0.0.0.0",
  },
  build: {
    chunkSizeWarningLimit: 500,
    sourcemap: false,
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') {
          return
        }
        warn(warning)
      },
      external: ['react', 'react-dom'],
      output: {
        format: "iife",
        globals: {
          'react': "React",
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
  esbuild: {
    pure: ['console.log'], // 删除 console.log
    drop: ['debugger'], // 删除 debugger
  },
  define: {
    'process.env': process.env,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  }
})
