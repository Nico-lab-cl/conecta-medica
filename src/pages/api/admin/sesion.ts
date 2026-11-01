import type { APIRoute } from 'astro';
import { entorno } from '../../../lib/crm/entorno';
import { abrirSesion, cerrarSesion, configurado, iguales } from '../../../lib/crm/sesion';

export const prerender = false;

/* Entrar y salir de /admin. Un formulario normal, sin JavaScript: el navegador
   envía y vuelve con 303. */
export const POST: APIRoute = async ({ request, locals, cookies, url }) => {
  const env = entorno(locals);
  const datos = await request.formData();
  const volver = (q = '') => new Response(null, { status: 303, headers: { location: `/admin/${q}` } });

  if (datos.get('accion') === 'salir') {
    cerrarSesion(cookies);
    return volver();
  }

  if (!configurado(env)) return volver('?error=config');
  const clave = String(datos.get('clave') ?? '');
  if (!iguales(clave, env.ADMIN_PASSWORD!)) {
    // Una pausa corta encarece probar claves a ciegas.
    await new Promise((r) => setTimeout(r, 800));
    return volver('?error=clave');
  }
  await abrirSesion(cookies, env, url.protocol === 'https:');
  return volver();
};
