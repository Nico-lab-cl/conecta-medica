/* Sesión de /admin.

   Una sola clave compartida (ADMIN_PASSWORD) y una cookie firmada con HMAC que
   dura doce horas. Sin tabla de usuarios: hoy entran dos o tres personas. Cuando
   haga falta saber quién cambió qué, se reemplaza por Cloudflare Access o por
   usuarios propios sin tocar las páginas, que sólo llaman a `haySesion`. */
import type { AstroCookies } from 'astro';
import type { EntornoCRM } from './entorno';

export const COOKIE = 'cm_admin';
const DURACION_S = 12 * 60 * 60;

const texto = new TextEncoder();

async function hmac(secreto: string, dato: string): Promise<string> {
  const clave = await crypto.subtle.importKey(
    'raw',
    texto.encode(secreto),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const firma = await crypto.subtle.sign('HMAC', clave, texto.encode(dato));
  return [...new Uint8Array(firma)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Comparación en tiempo constante, para que la respuesta no delate cuántos
    caracteres coinciden. */
export function iguales(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let dif = 0;
  for (let i = 0; i < a.length; i++) dif |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return dif === 0;
}

export function configurado(env: EntornoCRM): boolean {
  return Boolean(env.ADMIN_PASSWORD && env.ADMIN_SECRET);
}

export async function abrirSesion(cookies: AstroCookies, env: EntornoCRM, seguro: boolean) {
  const vence = Math.floor(Date.now() / 1000) + DURACION_S;
  const firma = await hmac(env.ADMIN_SECRET!, String(vence));
  cookies.set(COOKIE, `${vence}.${firma}`, {
    path: '/',
    httpOnly: true,
    secure: seguro,
    sameSite: 'strict',
    maxAge: DURACION_S,
  });
}

export function cerrarSesion(cookies: AstroCookies) {
  cookies.delete(COOKIE, { path: '/' });
}

export async function haySesion(cookies: AstroCookies, env: EntornoCRM): Promise<boolean> {
  if (!configurado(env)) return false;
  const valor = cookies.get(COOKIE)?.value ?? '';
  const [vence, firma] = valor.split('.');
  if (!vence || !firma || Number(vence) < Date.now() / 1000) return false;
  return iguales(firma, await hmac(env.ADMIN_SECRET!, vence));
}
