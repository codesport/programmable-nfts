import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//https://stackoverflow.com/questions/64677212/how-to-configure-proxy-in-vite
//https://vitejs.dev/config/#server-proxy
// with rwat p just add this in your package.json:  "proxy": "http://localhost:3001",
export default defineConfig({
  // server:{
  //   proxy: {
  //     '/process': {
  //          target: 'http://localhost:3001/process',     
  //      }
  // }
  // },
  plugins: [react()]
})
