# Manual del sitio — Dr. Carlos Flores

Este manual es para usted. No hace falta saber nada de programación.

Todo lo que cambie acá aparece en conectamedica.com. Los cambios quedan
guardados con fecha y autor, así que **nada se pierde y todo se puede deshacer**.

---

## 1. Cómo entrar

Vaya a **conectamedica.com/admin** e inicie sesión con su cuenta de GitHub.

Si es la primera vez, Nicolás le va a enviar una invitación por correo: acéptela
antes de intentar entrar.

Va a ver un menú a la izquierda con cuatro grupos:

- **Contenido** — prestaciones, la unidad y las preguntas frecuentes
- **Personas y recursos** — profesionales, videos y artículos
- **Configuración** — datos de la clínica, dirección y horarios
- **Legales** — política de privacidad, términos y aviso médico

---

## 2. La regla más importante

**Desactive en vez de borrar.**

Casi todo tiene una casilla que dice *Publicado* o *Activa*. Si la desmarca, ese
contenido desaparece del sitio pero queda guardado. Si se arrepiente, la vuelve a
marcar y reaparece.

Borrar es definitivo. Desactivar, no.

---

## 3. Cambiar el precio de la consulta

1. **Configuración → Datos de la clínica**
2. Busque *Valor de la consulta*
3. Escriba el número **sin puntos ni signo peso**: `55000`, no `$55.000`
4. Guarde

El precio se actualiza solo en las cinco páginas donde aparece. No hay que
buscarlo uno por uno.

---

## 4. Cambiar los horarios

1. **Configuración → Dirección y horarios**
2. En *Horarios de atención* puede editar, agregar o eliminar bloques
3. Escriba las horas en formato de 24 horas: `15:00`, no `3 pm`
4. Guarde

Los horarios aparecen en el pie de página, en contacto y en la página de agenda.
También los lee Google para mostrar si está abierto o cerrado.

---

## 5. Publicar el número de WhatsApp

Mientras el campo esté vacío, **los botones de WhatsApp no aparecen en el sitio**.
Es a propósito: preferimos no tener botón antes que tener uno con un número que
no existe.

1. **Configuración → Datos de la clínica**
2. En *WhatsApp*, escriba el número con código de país y sin espacios:
   `56912345678`
3. Guarde

Los botones aparecen solos en todo el sitio, cada uno con un mensaje distinto
según la página desde la que el paciente escriba.

---

## 6. Aprobar una respuesta clínica

Las respuestas médicas **no se publican hasta que usted las apruebe**. Es una
protección deliberada: usted es quien firma lo que el sitio dice sobre salud.

1. **Contenido → Preguntas frecuentes**
2. Abra la pregunta
3. Lea la *Respuesta corta* y la *Respuesta completa*. Corrija lo que necesite
4. Marque **Revisada y aprobada por el médico**
5. Escriba la fecha en *Fecha de revisión*, con formato `2026-09-15`
6. Guarde

Recién ahí la respuesta aparece en el sitio, con su nombre y la fecha al pie.

### Sobre la respuesta corta

Es lo más importante de cada pregunta. Debe responder **de frente en 40 a 60
palabras**, sin rodeos, porque es lo que Google muestra como resumen antes de que
la persona entre al sitio. El desarrollo largo va en la respuesta completa.

---

## 7. Agregar un profesional

1. **Personas y recursos → Profesionales → +**
2. Complete nombre, especialidad y biografía corta
3. En *Prestaciones en las que atiende*, escriba el identificador de cada
   prestación, uno por línea: `hematologia`, `gastroenterologia`,
   `nutricion-y-dietetica`, `interpretacion-de-imagenes`
4. Marque *Publicado*
5. Guarde

**Importante:** la sección "Equipo" del sitio aparece sola cuando haya **dos o
más** profesionales publicados. Con uno solo no se muestra, porque un directorio
de una sola persona resta credibilidad en vez de sumarla.

### Sobre la foto

Si no tiene un retrato profesional de esa persona, **deje el campo vacío**. El
sitio muestra automáticamente sus iniciales sobre un fondo azul claro. Nunca
usamos fotos de banco de imágenes para personas que atienden pacientes.

---

## 8. Publicar un video de YouTube

1. Suba el video a YouTube. Puede dejarlo como *No listado* si no quiere que
   aparezca en las búsquedas de YouTube
2. Copie el enlace completo
3. **Personas y recursos → Información para pacientes → +**
4. Pegue el enlace en *Enlace de YouTube*
5. Complete título, descripción y categoría
6. Marque *Revisado por el médico* y *Publicado*
7. Guarde

El video no se carga hasta que el visitante lo reproduce. Eso mantiene la página
rápida y evita que YouTube instale cookies a quien solo estaba leyendo.

---

## 9. Desactivar una prestación

1. **Contenido → Prestaciones**
2. Abra la prestación
3. Desmarque *Publicada*
4. Guarde

Desaparece del menú, de la portada y del listado. El enlace directo deja de
existir. Cuando la vuelva a marcar, todo reaparece.

---

## 10. Qué NO tocar

- **Slug (para la URL).** Es la dirección de la página en internet. Si la cambia,
  los enlaces que ya existen se rompen y Google pierde la página. Avísele a
  Nicolás si necesita cambiar una.
- **La sección "Agendamiento"**, salvo cuando contraten Medinet. Ahí hay que
  cambiar *Cómo se agenda hoy* a "Agenda en línea embebida", pegar el enlace y
  **completar el enlace a la política de privacidad del proveedor** — es una
  obligación legal, porque el paciente entrega su RUT en la plataforma de ellos.
- **Los textos legales**, hasta que un abogado los revise. Mientras la casilla
  *Revisado por abogado* esté sin marcar, el sitio los muestra con una
  advertencia de borrador. Eso es correcto: no los publique como definitivos
  antes de tiempo.

---

## 11. Lo que el sitio nunca va a hacer solo

- Inventar un dato que usted no haya escrito. Si un campo está vacío, esa sección
  simplemente no aparece.
- Publicar una respuesta clínica sin su aprobación.
- Mostrar un teléfono o un WhatsApp que no exista.
- Prometer algo que usted no confirmó. Por eso hay avisos que dicen "estamos
  terminando de definir" en telemedicina y en medios de pago: son reales, y se
  quitan solos cuando complete esos campos.

---

## 12. Si algo se rompe

Escríbale a Nicolás. Indique:

- qué página está mal (copie la dirección completa),
- qué estaba haciendo cuando pasó,
- qué esperaba que ocurriera.

Nada de lo que haga desde el administrador puede romper el sitio de forma
definitiva: todos los cambios quedan versionados y se pueden revertir.

---

## 13. Preguntas que todavía tenemos para usted

La lista completa está en `docs/preguntas-carlos.md`. Las más urgentes:

1. Fecha de apertura y de inicio de agenda
2. Teléfono público y WhatsApp
3. Su número de registro en la Superintendencia de Salud
4. Retrato profesional en alta resolución y el logo en vectorial
5. Listado de condiciones hematológicas que va a atender
6. Qué incluye la consulta de $50.000 y cuánto dura
7. Medios de pago y política de anulación
8. Telemedicina: plataforma, recetas y licencias
9. Revisión de las 7 respuestas clínicas
