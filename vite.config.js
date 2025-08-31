// vite.config.js

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: { // Configuración específica para Vitest
    environment: 'jsdom', // Usa JSDOM para simular el DOM del navegador
    globals: true, // Hace que las funciones de Vitest/RTL estén disponibles globalmente (describe, it, expect, render, screen)
    setupFiles: './src/setupTests.js', // Archivo para configurar @testing-library/jest-dom
  },
})