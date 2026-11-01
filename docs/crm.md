# CRM de pacientes (/admin)

Desde el 2026-11-01 la agenda del sitio es la de **TotalMed**: todo "Agendar
hora" pasa por `/agendar/`, que reenvía a
`https://totalmed.lat/reserva/334e8ec5-e3d8-43b7-b7e2-61e80362b706`. El enlace
se cambia en el CMS (*Datos de la clínica → Agendamiento*), no en el código.

Cada reserva en TotalMed avisa por webhook a `/api/webhooks/totalmed`, y el
paciente aparece solo en `conectamedica.com/admin`. Ahí el equipo le pone etapa
(nuevo, agendado, atendido, en seguimiento, inactivo) y notas. El CMS de textos
sigue en `/keystatic`.

La ficha clínica **no** va acá. El CRM guarda contacto, citas y notas de
seguimiento, nada más.

## Puesta en marcha (una vez)

Los pasos 1 y 2 ya se hicieron el 2026-11-01 (base `conecta-crm`, id
`ee8a6384-…`). Quedan como referencia por si hay que rehacerla.

1. Crear la base y pegar el `database_id` que imprime en `wrangler.jsonc`:

   ```bash
   npx wrangler d1 create conecta-crm
   ```

2. Crear las tablas en producción:

   ```bash
   npx wrangler d1 migrations apply conecta-crm --remote
   ```

3. Cargar los secretos en Cloudflare (Workers → conecta-medica → Settings →
   Variables and Secrets, tipo *Secret*), o con `npx wrangler secret put <NOMBRE>`:

   | Nombre | Qué es |
   | --- | --- |
   | `ADMIN_PASSWORD` | La clave para entrar a /admin |
   | `ADMIN_SECRET` | Texto largo al azar; firma la sesión. Cambiarlo cierra todas las sesiones |
   | `TOTALMED_WEBHOOK_SECRET` | El secreto que muestra TotalMed al crear el destino (paso 4) |

4. En TotalMed: *Configuración → API y webhooks → Agregar destino*.
   URL `https://conectamedica.com/api/webhooks/totalmed`, todos los eventos de
   citas y pacientes. Copiar el secreto al paso 3.

   La API y los webhooks de TotalMed vienen en los planes Clínica MAX,
   Multisede y Enterprise. En otro plan hay que pedírselos a TotalMed.

5. Hacer una reserva de prueba y revisar `/admin/eventos/`.

## Si un paciente no aparece

TotalMed no publica el formato de sus avisos, así que `src/lib/crm/totalmed.ts`
busca el paciente y la cita por los nombres de campo habituales. Todo envío,
reconocido o no, queda guardado crudo y se ve en `/admin/eventos/` con sus
cabeceras. Con un envío real a la vista se ajusta el lector.

- **"Firma inválida o ausente"**: el secreto en Cloudflare no es el de TotalMed,
  o TotalMed firma con una cabecera que no dice *signature* ni *firma*. Las
  cabeceras del evento muestran cuál es.
- **"No se reconoció un paciente"**: el formato no calza con el lector.

## En local

`npm run dev` emula D1. Una vez:

```bash
npx wrangler d1 migrations apply conecta-crm --local
```

Y un `.dev.vars` (ignorado por git) con `ADMIN_PASSWORD`, `ADMIN_SECRET` y
`TOTALMED_WEBHOOK_SECRET`.
