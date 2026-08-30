import { getCollection, getEntry, type CollectionEntry } from 'astro:content';

/* Consultas al contenido. Toda vista del sitio pasa por acá, para que las reglas
   de publicación estén en un solo lugar y no repartidas por las páginas.

   Regla base: nada se borra, se desactiva. Todo listado filtra por `activo`. */

const porOrden = <T extends { data: { orden: number } }>(a: T, b: T) =>
  a.data.orden - b.data.orden;

export type Ajustes = CollectionEntry<'settings'>['data'];
export type Servicio = CollectionEntry<'services'>;
export type Profesional = CollectionEntry<'professionals'>;
export type Faq = CollectionEntry<'faqs'>;
export type Unidad = CollectionEntry<'units'>;

/** Ajustes del sitio. Falla ruidosamente si faltan: sin esto no hay sitio. */
export async function ajustes(): Promise<Ajustes> {
  const entrada = await getEntry('settings', 'site');
  if (!entrada) throw new Error('Falta src/content/settings/site.json');
  return entrada.data;
}

export async function pais(codigo = 'cl') {
  const entrada = await getEntry('countries', codigo);
  if (!entrada) throw new Error(`No existe el país "${codigo}"`);
  return entrada;
}

export async function unidadesActivas() {
  return (await getCollection('units', (u) => u.data.activo)).sort(porOrden);
}

export async function serviciosActivos() {
  return (await getCollection('services', (s) => s.data.activo)).sort(porOrden);
}

export async function servicioPorSlug(slug: string) {
  return (await serviciosActivos()).find((s) => s.data.slug === slug);
}

export async function profesionalesActivos() {
  return (await getCollection('professionals', (p) => p.data.activo)).sort(porOrden);
}

/**
 * El directorio de profesionales existe desde el primer perfil activo.
 *
 * Antes el umbral eran dos: un directorio de una sola persona suele restar
 * credibilidad en vez de sumarla. El cliente pidió "Equipo médico" en el menú
 * principal, así que la decisión es suya y el umbral baja a uno.
 *
 * Queda una advertencia registrada: la ficha del Dr. Flores todavía no tiene
 * foto, formación, experiencia ni número de Superintendencia, porque esos datos
 * no se inventan. Ver `docs/preguntas-carlos.md`, puntos B-3, B-4 y B-7. Con
 * ellos cargados la página se completa sola.
 */
export async function hayDirectorioDeEquipo() {
  return (await profesionalesActivos()).length >= 1;
}

/**
 * Con una sola unidad activa el menú enlaza directo a esa unidad.
 * El desplegable aparece solo cuando se activa la segunda.
 */
export async function menuUsaDesplegable() {
  return (await unidadesActivas()).length > 1;
}

/**
 * Las respuestas clínicas no se publican sin la firma del médico.
 * En desarrollo se muestran para poder maquetarlas; en producción, no.
 */
export function faqPublicable(faq: Faq): boolean {
  if (!faq.data.activo) return false;
  if (faq.data.categoria !== 'clinica') return true;
  return faq.data.revisado || import.meta.env.DEV;
}

export async function faqsPublicables() {
  return (await getCollection('faqs')).filter(faqPublicable).sort(porOrden);
}

export async function faqsDestacadas(limite = 4) {
  return (await faqsPublicables()).filter((f) => f.data.destacada).slice(0, limite);
}

export async function faqsDeServicio(slugServicio: string) {
  return (await faqsPublicables()).filter((f) =>
    f.data.servicios.some((s) => s.id === slugServicio),
  );
}

export async function profesionalesDeServicio(servicio: Servicio) {
  const todos = await profesionalesActivos();
  return todos.filter((p) => servicio.data.profesionales.some((ref) => ref.id === p.id));
}

export async function recursosPublicables() {
  // La colección está vacía a propósito hasta que existan recursos revisados.
  // Astro avisa cuando una colección no tiene entradas; acá eso es el estado
  // esperado, no un error, y la página resuelve con su estado vacío honesto.
  try {
    const rs = await getCollection('resources', (r) => r.data.activo && r.data.revisado);
    return rs.sort(porOrden);
  } catch {
    return [];
  }
}

export async function categoriasConRecursos() {
  const recursos = await recursosPublicables();
  const categorias = await getCollection('categories');
  return categorias
    .filter((c) => recursos.some((r) => r.data.categoria.id === c.id))
    .sort(porOrden);
}

export async function legalPorSlug(slug: string) {
  return (await getCollection('legal')).find((l) => l.data.slug === slug);
}

/** Formato de precio chileno, sin decimales. */
export function precioCLP(valor: number): string {
  return '$' + valor.toLocaleString('es-CL');
}

/** "Martes 15:00–19:00" a partir del registro del país. */
export function horarioLegible(h: { dia: string; desde: string; hasta: string }): string {
  return `${h.dia} ${h.desde}–${h.hasta}`;
}
