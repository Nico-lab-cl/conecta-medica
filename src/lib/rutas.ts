/* Rutas e internacionalización.

   Chile vive en la raíz. Los países futuros van en subcarpeta (/ve/, /es/), de
   modo que activar Venezuela o España no obliga a migrar ninguna URL chilena ni
   a perder el posicionamiento ya ganado.

   Hoy, con Chile como único país activo, `rutaLocalizada` devuelve la raíz. */

export const PAIS_RAIZ = 'cl';

export const RUTAS = {
  inicio: '/',
  conocenos: '/conocenos/',
  unidad: '/conecta-hematologia/',
  prestaciones: '/conecta-hematologia/prestaciones/',
  prestacion: (slug: string) => `/conecta-hematologia/prestaciones/${slug}/`,
  equipo: '/equipo/',
  perfil: (slug: string) => `/equipo/${slug}/`,
  pacientes: '/informacion-para-pacientes/',
  categoria: (slug: string) => `/informacion-para-pacientes/${slug}/`,
  recurso: (slug: string) => `/informacion-para-pacientes/${slug}/`,
  preguntas: '/preguntas-frecuentes/',
  precios: '/precios/',
  telemedicina: '/telemedicina/',
  contacto: '/contacto/',
  agendar: '/agendar/',
  privacidad: '/legal/politica-de-privacidad/',
  terminos: '/legal/terminos-de-uso/',
  avisoMedico: '/legal/aviso-medico/',
} as const;

export function rutaLocalizada(ruta: string, pais: string = PAIS_RAIZ): string {
  if (pais === PAIS_RAIZ) return ruta;
  return `/${pais}${ruta}`;
}

/** URL absoluta, para canónicas, Open Graph y JSON-LD. */
export function urlAbsoluta(ruta: string, sitio: URL | string): string {
  return new URL(ruta, sitio).toString();
}

export type Miga = { label: string; href?: string };

/** Migas de pan derivadas de la ruta, para no escribirlas a mano en cada página. */
export function migas(...tramos: Miga[]): Miga[] {
  return [{ label: 'Inicio', href: RUTAS.inicio }, ...tramos];
}
