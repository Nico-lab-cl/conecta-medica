import type { APIRoute } from 'astro';
import { entorno } from '../../../lib/crm/entorno';
import { haySesion } from '../../../lib/crm/sesion';
import { ESTADOS } from '../../../lib/crm/estados';

export const prerender = false;

/* Alta manual y edición de pacientes desde /admin. Formularios normales con
   303 de vuelta; la cookie es SameSite=Strict, así que otro sitio no puede
   enviar estos formularios con la sesión del equipo. */

const limpiar = (v: FormDataEntryValue | null, max = 200) => {
  const s = String(v ?? '').trim().slice(0, max);
  return s || null;
};

export const POST: APIRoute = async ({ request, locals, cookies }) => {
  const env = entorno(locals);
  if (!(await haySesion(cookies, env))) return new Response('Sin sesión', { status: 401 });
  if (!env.DB) return new Response('CRM sin base de datos', { status: 503 });

  const d = await request.formData();
  const estado = String(d.get('estado') ?? 'nuevo');
  if (!ESTADOS.some((e) => e.valor === estado)) return new Response('Estado inválido', { status: 400 });

  const campos = [
    limpiar(d.get('nombre')) ?? '',
    limpiar(d.get('email'))?.toLowerCase() ?? null,
    limpiar(d.get('telefono'), 40),
    limpiar(d.get('rut'), 20),
    estado,
    String(d.get('notas') ?? '').slice(0, 10_000),
  ];

  const id = Number(d.get('id'));
  if (id) {
    await env.DB.prepare(
      `UPDATE pacientes SET nombre = ?, email = ?, telefono = ?, rut = ?, estado = ?, notas = ?,
         actualizado_en = datetime('now') WHERE id = ?`,
    )
      .bind(...campos, id)
      .run();
    return new Response(null, { status: 303, headers: { location: `/admin/pacientes/${id}/?guardado=1` } });
  }

  if (!campos[0]) return new Response(null, { status: 303, headers: { location: '/admin/?error=nombre' } });
  const r = await env.DB.prepare(
    `INSERT INTO pacientes (nombre, email, telefono, rut, estado, notas, origen)
     VALUES (?, ?, ?, ?, ?, ?, 'manual')`,
  )
    .bind(...campos)
    .run();
  return new Response(null, {
    status: 303,
    headers: { location: `/admin/pacientes/${r.meta.last_row_id}/` },
  });
};
