import type { APIRoute } from 'astro';
import { entorno } from '../../../lib/crm/entorno';
import { firmaValida, guardar, leer } from '../../../lib/crm/totalmed';

export const prerender = false;

/* Destino del webhook de TotalMed: https://conectamedica.com/api/webhooks/totalmed

   Se registra en TotalMed → Configuración → API y webhooks → Agregar destino, y
   el secreto que muestra ahí va como TOTALMED_WEBHOOK_SECRET en Cloudflare.

   Todo envío queda en `eventos_webhook`, firmado o no, para poder ver qué manda
   TotalMed realmente. Sólo los firmados con el secreto tocan la lista de
   pacientes. Al que no trae firma válida se le responde 401, y TotalMed lo
   mostrará como fallido en su panel. */

const MAX_CUERPO = 64 * 1024;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = entorno(locals);
  if (!env.DB) return new Response('CRM sin base de datos', { status: 503 });

  const cuerpo = (await request.text()).slice(0, MAX_CUERPO);
  const secreto = env.TOTALMED_WEBHOOK_SECRET;
  const valida = secreto ? await firmaValida(request.headers, cuerpo, secreto) : false;

  // Se guardan las cabeceras para descubrir dónde viene la firma, pero nunca
  // las que podrían traer credenciales.
  const cabeceras: Record<string, string> = {};
  request.headers.forEach((v, k) => {
    if (!/^(authorization|cookie|cf-|x-forwarded|x-real-ip)/i.test(k)) cabeceras[k] = v.slice(0, 500);
  });

  let datos: unknown = null;
  let error: string | null = null;
  try {
    datos = JSON.parse(cuerpo);
  } catch {
    error = 'El cuerpo no es JSON';
  }

  const lectura = leer(datos);
  let pacienteId: number | null = null;
  if (valida && !error) {
    try {
      pacienteId = await guardar(env.DB, lectura);
      if (!pacienteId) error = 'No se reconoció un paciente en el envío';
    } catch (e) {
      error = `Error al guardar: ${(e as Error).message}`.slice(0, 500);
    }
  } else if (!valida) {
    error = secreto ? 'Firma inválida o ausente' : 'Falta TOTALMED_WEBHOOK_SECRET';
  }

  await env.DB.prepare(
    `INSERT INTO eventos_webhook (tipo, firma_valida, cabeceras, cuerpo, paciente_id, error)
     VALUES (?, ?, ?, ?, ?, ?)`,
  )
    .bind(lectura.tipo, valida ? 1 : 0, JSON.stringify(cabeceras), cuerpo, pacienteId, error)
    .run();

  if (!valida) return new Response('Firma inválida', { status: 401 });
  // 200 aunque no se haya reconocido el paciente: el evento quedó guardado, y si
  // respondiéramos error TotalMed lo reintentaría sin que nada cambie.
  return new Response(JSON.stringify({ ok: true, paciente: pacienteId }), {
    headers: { 'content-type': 'application/json' },
  });
};
