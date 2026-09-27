# Dejar el CMS operativo en producción

Este documento es para Nicolás, no para el cliente. El manual del cliente es
`manual-carlos.md`.

Estado al 2026-09-27: el CMS está construido y en modo `cloud` (Keystatic
Cloud) en producción, `local` en desarrollo.

---

## Qué está hecho

- Las rutas `/keystatic` y `/api/keystatic` se compilan dentro del Worker de
  Cloudflare. Verificado en `npm run build`: aparecen en `dist/_worker.js/pages/`,
  y tanto el panel como su API salen en modo `cloud`.
- `/admin` redirige a `/keystatic` vía `_redirects`, y ninguna de las dos se
  indexa (filtro en el sitemap y `robots.txt`).
- Campos de imagen reales en profesionales, prestaciones y cuadros de portada.
- El copy completo de la portada es editable desde *Contenido → Portada del sitio*.

---

## Por qué Keystatic Cloud y no el modo `github`

En modo `github` cada persona que edita necesita su propia cuenta de GitHub con
permiso de escritura en el repo, y para entrar hay que crear y mantener una
GitHub App con cuatro secretos en Cloudflare. Para un médico que sólo quiere
corregir una frase es demasiado.

Con Keystatic Cloud el cliente entra con correo y contraseña. Keystatic hace el
commit en GitHub por él. **El contenido sigue viviendo en el repo**, no en
Keystatic: comprobado en el código de `@keystatic/core`, donde el modo `cloud`
lee y escribe el árbol de GitHub a través de `api.keystatic.cloud`. Si algún
día se deja el servicio, volver a `github` es cambiar el bloque `storage` de
`keystatic.config.ts`.

Plan gratis: hasta 3 usuarios por equipo. Pasado eso, US$10/mes más US$5 por
usuario adicional.

---

## Cómo llega un cambio al sitio

```
El cliente guarda en conectamedica.com/admin
  → Keystatic Cloud hace un commit en main
  → Cloudflare (Workers Builds, conectado al repo) reconstruye y publica
  → el cambio está en línea en uno o dos minutos
```

Nadie tiene que desplegar a mano. El GitHub Action de verificación corre en
paralelo, pero no frena el despliegue. Si el cliente guarda algo que no pasa la
validación del esquema, falla el build de Cloudflare y el sitio se queda con la
versión anterior: no se rompe. El aviso le llega a Nicolás por Cloudflare, no
al cliente.

---

## Configuración en keystatic.cloud

- Equipo `conectamedica`, proyecto `conecta-medica`. La clave del proyecto,
  `conectamedica/conecta-medica`, es la que va en `cloud.project`.
- **Project URLs → Primary URL:** `https://conectamedica.com`. Sin esto
  Keystatic Cloud no deja iniciar sesión desde el sitio.
- El proyecto tiene que estar conectado al repo `Nico-lab-cl/conecta-medica`.
- Usuarios: en *Users* del equipo, invitar por correo. Cada usuario ocupa uno
  de los tres cupos del plan gratis, incluido Nicolás.

## Probar el ciclo completo

Entrar a `/admin` con una cuenta de prueba, cambiar una frase de la portada,
guardar, y comprobar que aparece el commit en el repo y el cambio en el sitio.
Después sacar la cuenta de prueba para liberar el cupo del cliente.

---

## Una trampa que ya costó un bug

El loader `file()` de Astro trata cada clave de primer nivel del JSON como una
entrada distinta. Por eso `site.json` venía envuelto en `{"site": {...}}`.

Keystatic escribe esos archivos **planos**: para él, el archivo *es* el
singleton. Es decir, el primer guardado del cliente en *Datos de la clínica*
habría dejado el JSON en un formato que el loader no sabe leer, y el sitio
habría dejado de compilar. Con el CMS en modo local nadie lo había notado,
porque nadie había guardado nunca desde la interfaz.

Está resuelto en `src/content.config.ts`: los archivos se guardan planos —que es
lo que el CMS escribe— y el loader los envuelve al leer con `parser`. Aplica a
`settings` y a `homepage`.

**Si en el futuro se agrega otro singleton de Keystatic sobre un `file()`
loader, tiene que llevar el mismo `parser`.** Las colecciones que usan `glob`
—países, prestaciones, profesionales— no tienen este problema: ahí cada archivo
ya es una entrada completa.

---

## Lo que sigue sin estar en el CMS

Para no prometer de más:

- El copy de las páginas internas: telemedicina, precios, contacto, agendar,
  conócenos y preguntas frecuentes siguen con su texto en las plantillas.
- Las fotografías de cabecera del resto de las páginas (`FOTO_PAGINA` en
  `src/lib/imagenes.ts`). Sólo los tres cuadros de la portada son subibles.
- `units.hero.imagen` y `resources.portada` existen en el esquema pero **no se
  usan en ninguna plantilla**. Son campos muertos desde antes; no se les puso
  campo de imagen para no ofrecer al cliente un control que no hace nada.
