import { PluginOption, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { visualizer } from "rollup-plugin-visualizer";
import { Plugin as importToCDN } from 'vite-plugin-cdn-import'

export default defineConfig({
  plugins: [react(), visualizer() as PluginOption,
  importToCDN({
    modules: [
      {
        name: "react",
        var: 'React',
        path: 'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/react/18.2.0/umd/react.production.min.js',
      },
      {
        name: "react-dom",
        var: 'ReactDOM',
        path: 'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/react-dom/18.2.0/umd/react-dom.production.min.js',
      },
    ],
  }),],
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
      output: {
        manualChunks: {
          reactRouterDom: ["react-router-dom"]
        },
      },
    },
  },
  define: {
    'process.env': process.env,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    __VUE_OPTIONS_API__: false,
    __VUE_PROD_DEVTOOLS__: false
  }
})
