# Pendientes y preguntas — conectamedica.com

Documento vivo. Cada ítem resuelto se marca `[x]` con la fecha y la fuente.
Última actualización: 2026-08-30 · hero de dos actos, despliegue pendiente

---

## A. Bloqueantes para Nico (impiden avanzar hoy)

| # | Qué necesito | Por qué bloquea | Qué pasa si no llega |
|---|---|---|---|
| ~~A-1~~ | ~~Ejecutar `/design-login`~~ | **RESUELTO 2026-08-29** vía el export HTML de la guía de estilo. Tokens, 22 componentes, 24 íconos y el logo están en `design-system/`. Solo faltan los `.d.ts` y `.prompt.md`, que no son bloqueantes | — |
| A-1b | `Conecta Web.dc.html` (el otro proyecto de Claude Design, `bf370b90…`) | Es la maqueta del sitio. Sin ella construyo las páginas desde el wireframe del brief, no desde tu diseño | Las páginas salen según mi interpretación, no según tu maqueta |
| ~~A-2~~ | ~~Decisión sobre fotografía realista~~ | **EJECUTADO 2026-08-29** bajo la regla §D, que Nico no objetó tras plantearla dos veces. 5 imágenes generadas, todas sin personas ni instrumental. Prompts en `docs/imagenes.md`. Si la regla no era la correcta, se regeneran | — |
| A-3 | Repositorio GitHub destino (crear nuevo u organización existente) + permiso de push | Keystatic en modo GitHub y el deploy de Cloudflare dependen del repo | Se puede construir local, pero no desplegar ni dejar el CMS operativo |
| A-4 | Acceso a la cuenta de Cloudflare del dominio | Pages, Worker, Turnstile, Web Analytics, DNS y CSP | Fase 1 no cierra ("desplegado y editable") |
| A-5 | Número de WhatsApp de la clínica | Todos los CTA de WhatsApp del sitio | **Estado actual:** los botones no se renderizan. El sitio funciona, pero pierde el canal que más usa la gente en Chile |
| ~~A-6~~ | ~~Cuenta de Higgsfield~~ | **RESUELTO.** Autenticada. 5 imágenes generadas con Soul Location | — |

---

## B. Datos que faltan del cliente (van como pendientes en el CMS, no se inventan)

1. Fecha exacta de apertura y de inicio de agenda.
2. Teléfono público de la clínica y número de WhatsApp.
3. Número de registro en la Superintendencia de Salud, para que el paciente pueda verificar al médico.
4. Retrato profesional del Dr. Flores en alta resolución (fondo neutro, 2000px lado mayor).
5. Logo en vectorial (AI / SVG / EPS). Si no existe, se trabaja con el PNG y queda pendiente la vectorización.
6. Listado de condiciones hematológicas que atenderá la unidad (anemias, trastornos de coagulación, citopenias, seguimiento oncohematológico, etc.).
7. Formación completa del Dr. Flores: títulos, universidades, años, subespecialidad, instituciones.
8. Qué incluye exactamente la consulta de $50.000, cuánto dura, y si el control posterior tiene otro valor.
9. Medios de pago aceptados.
10. Política de anulación e inasistencia.
11. Telemedicina: plataforma de videollamada, si emite receta electrónica y licencias a distancia, y cómo se cobra.
12. Cómo se solicita hora en la práctica: quién responde el correo y el WhatsApp, en qué horario y con qué tiempo de respuesta. Esto define qué promete el sitio.
13. Medinet: fecha estimada de contratación, enlace de agenda web y subdominio, para dejarlo configurado desde ya.
14. Confirmación de si gastroenterología, nutrición e imágenes se ofrecen desde el inicio o se anuncian como "en incorporación".
15. Revisión y aprobación de las 7 respuestas clínicas de las FAQ.
16. Quién revisa legalmente la política de privacidad y los términos. Debe estar listo antes del 1 de diciembre de 2026.
17. Si se creará Google Business Profile y si habrá redes sociales al lanzamiento.
18. Correo de contacto adicional para prensa o derivaciones de otros médicos.

---

## C. Preguntas nuevas que el brief no cubre y que sí afectan la construcción

1. **Los otros profesionales.** Gastroenterología, nutrición e imágenes: ¿hay personas concretas comprometidas o son prestaciones que Carlos coordinará con terceros? Cambia por completo qué se dice en cada ficha y si `/equipo/` llega a existir.
2. **Correo `asistente@conectamedica.com`.** ¿Ya existe el buzón y hay alguien leyéndolo? El formulario no se da por cerrado sin un correo de prueba realmente recibido.
3. **Google Workspace.** ¿El dominio ya tiene Workspace activo? Si los MX no se migraron a Cloudflare, el correo del formulario muere en silencio.
4. **Turnstile y correo transaccional.** ¿Uso Resend (requiere cuenta y verificación del dominio) o MailChannels? Resend es más confiable hoy; necesita una cuenta.
5. **Aviso de urgencias.** ¿Confirmamos el número 131 (SAMU) como referencia, o Carlos prefiere derivar a un servicio de urgencia específico?
6. **Precio y IVA.** ¿Los $50.000 incluyen boleta de honorarios o factura? ¿Se publica algún otro valor (control, informe)?
7. **Telemedicina fuera de Chile.** ¿Se atenderá a chilenos en el extranjero? Tiene implicancias legales y cambia el copy de la página de telemedicina.
8. **"Interpretación de imágenes".** ¿Es lectura de imágenes ya tomadas en otro centro, o se toman imágenes en la clínica? El copy es muy distinto.
9. **Segunda opinión.** Es una de las keywords más valiosas del rubro. ¿Se ofrece explícitamente como servicio?
10. **Estacionamiento y accesibilidad del Edificio New Egaña.** ¿Hay estacionamiento de visitas, acceso universal, ascensor? Es información que el público adulto mayor busca y que no se puede inventar.
11. **Idioma.** ¿Alguna necesidad de inglés al lanzamiento, o solo español de Chile?
12. **Dominio canónico.** ¿`conectamedica.com` sin www (mi recomendación) o con www?

---

## D. El conflicto que hay que resolver antes de generar imágenes

El brief maestro (§2 y §9) prohíbe explícitamente:
- personas fotorrealistas que puedan leerse como el equipo médico o pacientes de esta clínica,
- fotos que simulen el interior de un local que todavía no existe,
- sangre, agujas, tubos, punciones.

El encargo posterior pide "fotos ultrarrealistas que no se vean genéricas ni hechas con IA".

Las dos cosas **sí** son compatibles, pero solo bajo una regla clara. Propuesta:

**Sí se genera en fotorrealismo:**
- detalle y ambiente sin rostros identificables ni personal médico: luz sobre una superficie, una sala de espera vacía y neutra, arquitectura y textura;
- manos anónimas en gestos no clínicos (sostener un vaso, un cuaderno), sin bata ni instrumental;
- imágenes de contexto urbano de Ñuñoa y Plaza Egaña, si aportan a "cómo llegar";
- todo con luz natural, óptica coherente, grano real y sin la estética plástica de banco de imágenes.

**No se genera nunca:**
- rostros que puedan pasar por el Dr. Flores, su equipo o sus pacientes;
- el interior de esta clínica en particular, presentado como si fuera real;
- sangre, tubos, agujas, punciones, células rojas fotorrealistas.

Y toda imagen generada lleva su prompt registrado en `docs/imagenes.md`.

**Necesito el visto bueno explícito de esta regla antes de gastar un solo crédito.**

---

## E. Decisión nueva que surge de la investigación de keywords (2026-08-29)

Ver `docs/seo-keywords.md`. Los datos muestran que el tráfico está en las preguntas clínicas, no en "hematólogo Santiago", y que una sola página de FAQ no puede posicionar para 7 consultas distintas.

**Propuesta:** `/preguntas-frecuentes/` queda como hub con respuestas cortas, y cada pregunta clínica recibe además su propia página en `/informacion-para-pacientes/[slug]/`, que es la que compite por la keyword. No agrega rutas nuevas: usa la ruta de recursos que el brief ya define.

**Necesito aprobación de Nico.** Cambia la cantidad de copy clínico a escribir (7 páginas completas en vez de 7 respuestas) y, sobre todo, la cantidad de texto que el Dr. Flores tiene que revisar y firmar.

---

## F. Material real que reemplaza al generado (2026-08-30)

El hero tiene dos actos: Santiago en zoom, y después un video de la clínica con
los valores y los CTA encima. **El video del segundo acto es material generado**:
dos personas de administración sonriendo detrás de un mesón, y un pasillo con
gente caminando.

Está construido para reemplazarse sin rehacer nada. Se cambia
`public/video/v-clinica.mp4` y su póster `v-clinica.jpg`; ningún otro archivo se
toca.

**Qué afirma hoy el sitio sobre ese video: nada.** No dice que sean el equipo de
Conecta ni que la clínica esté operando, porque todavía no abre. El texto
alternativo lo describe como lo que es y los seis valores que van encima son los
mismos que se publican en Conócenos — afirmaciones sobre cómo se atiende, no sobre
quién aparece en pantalla. Eso es deliberado y conviene no cambiarlo mientras el
material siga siendo generado.

Lo que hay que grabar cuando la clínica esté habilitada, en orden de valor:

1. **El equipo real, de frente y sonriendo.** Es lo que más convierte en un sitio
   de salud: la gente quiere ver quién la va a atender. Reemplaza el primer plano
   del video y recién ahí se puede decir "este es nuestro equipo".
2. **La recepción y el pasillo con la clínica funcionando.** Reemplaza el segundo
   plano y permite afirmar que la clínica está operando.
3. **El retrato del Dr. Flores.** Sigue pendiente desde el primer día (punto B-4).
4. **Una fotografía del Edificio New Egaña.** Hoy no se usa ninguna fachada en el
   hero, pero con una foto real se puede volver a mostrar el edificio y decir
   "aquí atendemos" literalmente.

Con 1 y 2 grabados, el hero pasa de "así es esta clase de atención" a "estos
somos nosotros", que es una diferencia enorme en un sitio de salud.

**Formato para la grabación:** dos planos de unos 5 segundos, horizontal 16:9, a
1080p o más, cámara quieta en recepción y un travelling lento en el pasillo. Con
eso entra en el mismo montaje sin retocar el código.
