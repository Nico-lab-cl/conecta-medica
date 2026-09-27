import { getEntry } from 'astro:content';
import { ajustes, pais, precioCLP } from './contenido';
import { RUTAS } from './rutas';

/* Portada editable.

   El copy de la portada vive en src/content/settings/portada.json y se edita
   desde el CMS. Este archivo es el puente entre ese texto y la página: expande
   los marcadores y traduce los destinos a rutas reales.

   ---------------------------------------------------------------------------
   POR QUÉ MARCADORES Y NO TEXTO FIJO

   Buena parte de la portada se componía con datos vivos: "Consulta particular
   $50.000", "Presencial en Ñuñoa", "15 preguntas respondidas". Si eso se
   copiara como texto plano al CMS, el día que cambie el precio en "Datos de la
   clínica" la portada seguiría anunciando el anterior. Es el mismo error que
   el pie de sitio arrastró con la dirección y el horario.

   Con marcadores, el cliente escribe la frase que quiera y el dato se rellena
   solo. Si escribe un marcador que no existe, se borra en vez de imprimirse en
   crudo: es preferible una frase con un hueco a una que muestre "{preico}".
   --------------------------------------------------------------------------- */

/** Destinos que el cliente puede elegir, con su ruta real. */
export const DESTINOS = {
  inicio: RUTAS.inicio,
  agendar: RUTAS.agendar,
  telemedicina: RUTAS.telemedicina,
  precios: RUTAS.precios,
  preguntas: RUTAS.preguntas,
  'que-llevar': `${RUTAS.preguntas}#que-llevar-a-la-consulta`,
  contacto: RUTAS.contacto,
  conocenos: RUTAS.conocenos,
  unidad: RUTAS.unidad,
  prestaciones: RUTAS.prestaciones,
  pacientes: RUTAS.pacientes,
} as const;

/* El destino llega como texto desde el contenido, así que puede no estar en la
   tabla. Antes de caer al inicio se avisa en consola durante el build: un
   enlace que apunta silenciosamente a otra parte es peor que uno roto, porque
   nadie lo nota. */
export function rutaDeDestino(destino: string): string {
  const ruta = (DESTINOS as Record<string, string>)[destino];
  if (ruta) return ruta;
  console.warn(
    `[portada] Destino desconocido: "${destino}". Se usa el inicio. Revisa src/content/settings/portada.json.`,
  );
  return RUTAS.inicio;
}

export type Marcadores = Record<string, string>;

/** Reemplaza {marcador} por su valor. Los que no existen se borran. */
export function expandir(texto: string, valores: Marcadores): string {
  return (
    texto
      .replace(/\{(\w+)\}/g, (_, clave: string) => valores[clave] ?? '')
      /* Un marcador vacío deja basura alrededor: ", Ñuñoa." cuando no hay
         referencia de dirección, o dos espacios donde iba el precio. Se limpia
         acá y no en cada punto de uso.

         Sólo se tocan el espacio doble, el espacio delante de un signo que se
         pega a la palabra anterior, y los separadores que quedaron al principio
         de la frase. El punto medio NO entra: en "Sin derivación previa · Te
         confirmamos..." los espacios que lo rodean son parte del texto, y una
         regla más amplia se los comía. */
      .replace(/ {2,}/g, ' ')
      .replace(/\s+([,;.])/g, '$1')
      .replace(/^[\s,;·]+/, '')
      .trim()
  );
}

/** Los valores disponibles hoy para los marcadores de la portada. */
export async function marcadores(totalPreguntas: number): Promise<Marcadores> {
  const a = await ajustes();
  const cl = (await pais('cl')).data;
  const sabado = cl.horarios.find((h) => h.dia === 'Sábado');

  return {
    precio: precioCLP(a.precioConsulta),
    notaPrecio: a.precioNota,
    nombre: a.nombre,
    razonSocial: a.razonSocial,
    comuna: cl.direccion.comuna,
    ciudad: cl.direccion.ciudad,
    referencia: cl.direccion.referencia ?? '',
    preguntas: String(totalPreguntas),
    sabado: sabado ? `Sábado de ${sabado.desde} a ${sabado.hasta}` : '',
  };
}

/** El contenido de la portada, tal como está guardado. */
export async function portada() {
  const entrada = await getEntry('homepage', 'portada');
  if (!entrada) {
    throw new Error(
      'Falta src/content/settings/portada.json: es el texto de la portada y sin él la página no tiene qué mostrar.',
    );
  }
  return entrada.data;
}
