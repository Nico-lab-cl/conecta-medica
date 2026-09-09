// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import markdoc from '@keystatic/astro'; // integración de Keystatic
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@tailwindcss/vite';

export const SITE = 'https://conectamedica.com';

export default defineConfig({
  site: SITE,
  // Estático por defecto. Solo /admin y /api/keystatic salen del prerender.
  output: 'static',
  adapter: cloudflare({ imageService: 'compile' }),
  trailingSlash: 'always',

  // La integración de Keystatic inyecta /keystatic y /api/keystatic. El brief
  // pide /admin, así que se redirige. Ninguna de las tres se indexa.
  redirects: {
    '/admin': '/keystatic',
  },
  integrations: [
    react(),
    mdx(),
    markdoc(),
    sitemap({
      filter: (page) => !page.includes('/admin') && !page.includes('/keystatic'),
      i18n: { defaultLocale: 'es', locales: { es: 'es-CL' } },
    }),
  ],
  vite: { plugins: [tailwind()] },
  build: { inlineStylesheets: 'auto' },
  image: { domains: [], remotePatterns: [] },
  prefetch: { prefetchAll: false },
});
