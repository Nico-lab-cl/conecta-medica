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
  /* 'ignore' y no 'always'. Con 'always', el Worker redirigía
     /keystatic/cloud/oauth/callback a la misma dirección con barra final, y
     Keystatic compara esa ruta de forma exacta: al volver de iniciar sesión en
     Keystatic Cloud mostraba "Not found" y nadie podía entrar al CMS.

     Las páginas del sitio no cambian: se generan como carpeta/index.html y
     Cloudflare las sirve igual, con barra; las canónicas se arman a mano en
     Meta.astro y el sitemap sale idéntico. */
  trailingSlash: 'ignore',

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
