/* Construcción de los enlaces de WhatsApp.

   Dos reglas:
   1. El mensaje siempre viene precargado y dice de qué página viene la persona.
      Quien contesta sabe de entrada de qué se trata, sin preguntar.
   2. Si no hay número configurado, la función devuelve null y el botón NO se
      renderiza. Nunca un número de ejemplo. */

export type OrigenWhatsApp =
  | 'inicio'
  | 'unidad'
  | 'prestacion'
  | 'telemedicina'
  | 'precios'
  | 'contacto'
  | 'agendar'
  | 'preguntas'
  | 'recursos';

const MENSAJES: Record<OrigenWhatsApp, string> = {
  inicio: 'Hola, vengo de la web de Clínica Conecta y necesito agendar una consulta.',
  unidad:
    'Hola, vengo de la web de Clínica Conecta - Conecta Hematología, necesito agendar una consulta.',
  prestacion: 'Hola, vengo de la web de Clínica Conecta y tengo una consulta sobre {tema}.',
  telemedicina:
    'Hola, vengo de la web de Clínica Conecta - telemedicina, necesito más información.',
  precios:
    'Hola, vengo de la web de Clínica Conecta y quiero consultar por el valor de la consulta.',
  contacto: 'Hola, vengo de la web de Clínica Conecta y necesito coordinar una hora.',
  agendar: 'Hola, vengo de la web de Clínica Conecta y necesito ayuda para agendar mi hora.',
  preguntas:
    'Hola, vengo de las preguntas frecuentes de Clínica Conecta y me quedó una duda.',
  recursos:
    'Hola, vengo de la información para pacientes de Clínica Conecta y necesito orientación.',
};

/** Deja solo dígitos: wa.me no acepta espacios, signos ni paréntesis. */
function normalizarNumero(numero: string): string {
  return numero.replace(/\D/g, '');
}

export function mensajeWhatsApp(origen: OrigenWhatsApp, tema?: string): string {
  const base = MENSAJES[origen];
  return tema ? base.replace('{tema}', tema) : base.replace(' sobre {tema}', '');
}

/**
 * Devuelve el enlace de wa.me, o null si todavía no hay número de la clínica.
 * Los componentes deben tratar null como "no mostrar el botón".
 */
export function enlaceWhatsApp(
  numero: string | null,
  origen: OrigenWhatsApp,
  tema?: string,
): string | null {
  if (!numero) return null;
  const limpio = normalizarNumero(numero);
  if (limpio.length < 8) return null;
  return `https://wa.me/${limpio}?text=${encodeURIComponent(mensajeWhatsApp(origen, tema))}`;
}
