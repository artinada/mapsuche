import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './client',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    // Target modern browsers - ES2022 baseline features
    target: 'es2022',
    // Disable module preload polyfill for modern browsers
    modulePreload: {
      polyfill: false
    },
    // Optimize for modern browsers
    minify: 'esbuild',
    rollupOptions: {
      // External AWS CDK and Node.js modules that shouldn't be bundled for browser
      external: [
        'aws-cdk-lib',
        '@aws-cdk/*',
        'fs',
        'path',
        'crypto',
        'os',
        'child_process',
        'util',
        'assert',
        'stream',
        'url',
        'zlib',
        'net',
        'https',
        'module',
        'constants'
      ],
      output: {
        // Modern chunk splitting strategy
        manualChunks: {
          // Separate vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@radix-ui/react-slot', 'class-variance-authority', 'clsx', 'tailwind-merge'],
          'router': ['wouter'],
          'forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'aws': ['aws-amplify', '@tanstack/react-query']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './client/src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'wouter', 'clsx', 'tailwind-merge'],
    exclude: ['@aws-amplify/backend', 'aws-cdk-lib', '@aws-cdk/*']
  }
})
