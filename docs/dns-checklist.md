# Checklist de despliegue, DNS y correo

**Nada de esto se ha ejecutado todavía.** El despliegue quedó explícitamente
para el final, y hace falta acceso a la cuenta de Cloudflare y al repositorio de
GitHub. Ver `docs/preguntas-carlos.md`, puntos A-3 y A-4.

El orden importa: **el correo antes que el sitio**. Si se cambian los
nameservers o se toca el DNS sin haber migrado los registros MX,
`asistente@conectamedica.com` deja de recibir correo y el formulario del sitio
muere en silencio, sin que nadie se entere hasta que un paciente reclame.

---

## 1. Antes de tocar nada — inventario del DNS actual

El dominio está registrado en Google y los nameservers ya apuntan a Cloudflare.
Antes de cualquier cambio, exportar la zona completa y guardarla:

```bash
# Desde el panel de Cloudflare: DNS → Records → Export
# Guardar el archivo en un lugar seguro antes de modificar nada.
```

Verificar desde afuera qué está publicado hoy:

```bash
dig +short MX conectamedica.com
dig +short TXT conectamedica.com
dig +short TXT google._domainkey.conectamedica.com
dig +short TXT _dmarc.conectamedica.com
```

- [ ] Zona exportada y guardada
- [ ] Registros MX actuales anotados
- [ ] SPF, DKIM y DMARC actuales anotados

---

## 2. Correo (Google Workspace)

Si el dominio usa Google Workspace, en Cloudflare deben existir:

- [ ] **MX** → `smtp.google.com` (prioridad 1). Google usa un solo registro hoy;
      si la zona trae los cinco antiguos (`aspmx.l.google.com` y compañía),
      también sirven, pero no mezclar ambos esquemas.
- [ ] **SPF** → `v=spf1 include:_spf.google.com ~all`
      Un solo registro TXT de SPF por dominio. Dos registros rompen la
      autenticación.
- [ ] **DKIM** → el TXT que entrega la consola de Google Workspace en
      *Apps → Google Workspace → Gmail → Autenticar correo*
- [ ] **DMARC** → `_dmarc` TXT. Empezar suave y endurecer después:
      `v=DMARC1; p=none; rua=mailto:asistente@conectamedica.com`
      Subir a `p=quarantine` cuando los informes muestren que todo autentica.

**Los registros MX deben quedar en "DNS only" (nube gris), no en "Proxied".**
Cloudflare no proxea correo, y si quedan naranjas el correo se cae.

- [ ] Enviar un correo de prueba **desde fuera** a `asistente@conectamedica.com`
      y confirmar que llega
- [ ] Responder desde esa casilla y confirmar que sale

---

## 3. Dominio del remitente del formulario

El Worker envía con Resend desde `web@conectamedica.com`. Para que ese correo no
caiga en spam hay que verificar el dominio en Resend, lo que agrega registros
propios:

- [ ] Dominio verificado en Resend
- [ ] Registro DKIM de Resend agregado (`resend._domainkey`)
- [ ] SPF ajustado si Resend lo pide. **Cuidado:** no crear un segundo registro
      SPF; hay que agregar el `include` dentro del que ya existe
- [ ] `RESEND_API_KEY`, `CORREO_DESTINO` y `CORREO_REMITENTE` cargados en el
      Worker (Settings → Variables and Secrets). `RESEND_API_KEY` va como
      **Secret**, no como texto plano

Mientras `RESEND_API_KEY` no exista, el formulario responde **503 y no finge que
envió**. Es deliberado: preferimos un error visible antes que un paciente
convencido de que pidió hora.

---

## 4. Sitio

El sitio se despliega como **Worker de Cloudflare con assets estáticos**, no como
Pages. Las veinte páginas ya renderizadas se sirven como archivos y el Worker
solo atiende `/api/contacto`, `/keystatic` y `/_image`.

La configuración vive en `wrangler.jsonc`, en la raíz del repositorio. El `name`
de ese archivo tiene que ser **exactamente** el del Worker que tiene enganchado
el dominio: si no coinciden, el despliegue falla o publica en otro Worker.

- [x] Repositorio creado en GitHub y el proyecto empujado
- [x] `wrangler.jsonc` en el repositorio, con el punto de entrada y los assets
- [ ] Worker conectado al repositorio (Workers → Builds)
- [ ] **Comando de build: `npm run build`.** Sin esto no se genera `dist/` y el
      despliegue falla con *"Missing entry-point to Worker script or to assets
      directory"*, que fue el error del primer intento
- [ ] Comando de despliegue: `npx wrangler deploy`
- [ ] Versión de Node fijada en 22 o superior
- [ ] Dominio `conectamedica.com` asignado al proyecto
- [ ] **Una sola canónica.** Recomendación: `conectamedica.com` sin www, con una
      redirección 301 desde `www`. Elegir una y no cambiarla después.
- [ ] SSL/TLS en **Full (strict)**
- [ ] **Always Use HTTPS** activado
- [ ] **HSTS** activado, empezando con un max-age corto y subiéndolo después
- [ ] Despliegues de vista previa activados para cada rama

---

## 5. Cabeceras de seguridad

Crear `public/_headers`. Los assets estáticos del Worker lo respetan igual que
Pages:

```
/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY
  Permissions-Policy: geolocation=(), microphone=(), camera=()
```

**Sobre `frame-src` y la agenda de Medinet:** en cuanto se active la agenda
embebida hay que agregar una CSP que permita ese dominio **y solo ese**:

```
  Content-Security-Policy: frame-src 'self' https://*.medinetapp.com;
```

Confirmar el dominio exacto con Medinet antes de escribirlo. Abrir `frame-src`
a `*` para que "funcione" anula el sentido de tenerlo.

---

## 6. Keystatic (el administrador de Carlos)

- [ ] En `keystatic.config.ts`, cambiar `storage: { kind: 'local' }` por:
      ```ts
      storage: { kind: 'github', repo: { owner: 'ORG', name: 'REPO' } }
      ```
- [ ] Aplicación de GitHub creada y conectada
- [ ] Carlos invitado al repositorio con permisos de escritura
- [ ] Probar entrar a `/admin` y guardar un cambio de prueba
- [ ] Verificar que `/keystatic` y `/admin` **no** están indexados
      (`robots.txt` ya los bloquea)

---

## 7. Analítica y verificación

- [ ] **Cloudflare Web Analytics** activado. Sin cookies, así que el sitio no
      necesita banner de consentimiento — que es justamente por qué se eligió
- [ ] Google Search Console verificado **por DNS** (registro TXT), no por
      archivo, para que la verificación sobreviva a los despliegues
- [ ] `sitemap-index.xml` enviado en Search Console
- [ ] Ficha de Google Business Profile creada con **exactamente** la misma
      dirección, teléfono y horarios que el sitio. Cualquier diferencia entre
      los dos daña el posicionamiento local

---

## 8. Verificación final, después de publicar

```bash
# Cabeceras y redirección
curl -sSI https://conectamedica.com | head -20
curl -sSI https://www.conectamedica.com | grep -i location

# El sitemap y robots responden
curl -sS https://conectamedica.com/robots.txt
curl -sSI https://conectamedica.com/sitemap-index.xml | head -3

# El administrador NO se indexa
curl -sS https://conectamedica.com/robots.txt | grep -i keystatic
```

- [ ] Formulario enviado de verdad desde el sitio publicado, y correo recibido
      en `asistente@conectamedica.com`
- [ ] El correo trae `reply-to` con la dirección del paciente
- [ ] Turnstile activo y bloqueando envíos automáticos
- [ ] Datos estructurados validados en el Rich Results Test de Google
- [ ] Lighthouse ≥ 95 en móvil y escritorio, en las cuatro categorías
- [ ] `npm run presupuesto` en verde
