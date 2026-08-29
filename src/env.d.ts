/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** Clave pública de Cloudflare Turnstile. Sin ella, el widget no se monta. */
  readonly PUBLIC_TURNSTILE_SITE_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
