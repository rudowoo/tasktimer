import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Set base for GitHub Pages when building in CI
  // If GITHUB_REPOSITORY is set (e.g., user/repo), use /repo/ as base; otherwise '/'
  base: process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/').pop()}/`
    : '/',
})