// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from 'fumadocs-mdx/vite';
import * as MdxConfig from './source.config';

export default defineConfig({
  plugins: [
    // Order: mdx first is fine, then tailwind, then react
    mdx(MdxConfig),
    tailwindcss(),
    react(),
  ],
});