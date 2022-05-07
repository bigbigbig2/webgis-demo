import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// import cesium from 'vite-plugin-cesium';
const path = require('path');
import { viteExternalsPlugin } from 'vite-plugin-externals'
import viteCompression from 'vite-plugin-compression'
import htmlPlugin from 'vite-plugin-html-config'


// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [vue(),cesium()],
  plugins: [
    vue(),
    viteCompression(),
    viteExternalsPlugin({
      cesium: 'Cesium'
    }),
    htmlPlugin({
      links: [
        {
          rel: 'stylesheet',
          href: 'https://cesium.com/downloads/cesiumjs/releases/1.92/Build/Cesium/Widgets/widgets.css'
        }
      ],
      scripts: [
        {
          src: 'https://cesium.com/downloads/cesiumjs/releases/1.92/Build/Cesium/Cesium.js'
        }
      ]
    })
  ],
  resolve:{
    alias:{
      '@':path.resolve(__dirname,'./src')
    }
  },
  server:{
    //配置代理
    proxy:{
      "/Api":{
        target:"http://typhoon.zjwater.gov.cn",
        changeOrigin: true,
      },
    }
  },
})
