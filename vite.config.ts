import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          redux: ['@reduxjs/toolkit', 'react-redux'],
          forms: ['react-hook-form', 'yup', '@hookform/resolvers'],
          date: ['date-fns', 'react-datepicker'],
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@ui': resolve(__dirname, './src/shared/ui'),
      '@widgets': resolve(__dirname, './src/widgets'),
      '@assets': resolve(__dirname, './src/assets'),
      '@hooks': resolve(__dirname, './src/shared/hooks'),
    },
  },
})
