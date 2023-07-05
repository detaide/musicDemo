import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import type {ImportMetaEnv} from './vite-env'

// https://vitejs.dev/config/
export default defineConfig(({ mode, command})=>{


  const ViteEnv = loadEnv(mode, import.meta.url)

  return {
    plugins: [vue()],
    resolve:{
      alias:{
        '@': path.resolve(__dirname,'src'),
        '@Pictures': path.resolve(__dirname, 'src/assets/Pictures'),
        '@CSS' : path.resolve(__dirname, 'src/assets/CSS'),
        '@Components' : path.resolve(__dirname, 'src/components')
      }
    },
    server:{
      host:'0.0.0.0',
      // port:3000,
      open:false,
      proxy:{
        '/api':{
          target: 'http://47.113.146.85:3000/',
          changeOrigin:true,
          rewrite: path=> path.replace('/api/','/')
        },
        '/server':{
          target: 'http://localhost:8080/',
          changeOrigin:true,
          rewrite: path=> path.replace('/server/','/')
        }
      }
    },
  }
  
})
