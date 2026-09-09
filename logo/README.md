# Clínica Conecta — logo «la gota nodo»

Marca redibujada en vector. Ningún archivo aquí proviene del JPG original.

## Símbolo (isotipo)
Path de 12 comandos, hueco calado con `fill-rule: evenodd`, viewBox 24 × 28.
Geometría: círculo de radio r, vértice a 1,78 r sobre el centro, hueco de 0,4 r.

| archivo | uso |
|---|---|
| `isotipo-azul.svg` | por defecto, sobre blanco y azul nube |
| `isotipo-blanco.svg` | sobre azul profundo, fotos oscuras |
| `isotipo-tinta.svg` | una tinta, fax, sellos |
| `isotipo-micro.svg` | 16–20px, hueco 0,5 r |

## Imagotipo
| archivo | uso |
|---|---|
| `imagotipo-horizontal.svg` | versión por defecto: header, firma de correo |
| `imagotipo-horizontal-blanco.svg` | footer azul, fondos oscuros |
| `imagotipo-horizontal-tinta.svg` | una tinta |
| `imagotipo-compacto.svg` | sin «Clínica»: header móvil, franjas bajo 40px |
| `imagotipo-vertical.svg` | pendón, fachada, avatar cuadrado |
| `imagotipo-vertical-blanco.svg` | igual, sobre azul profundo |

## Iconos
`app-icon.svg` (512, esquinas 112) y `favicon.svg` (32). PNG equivalentes en `png/`.

```html
<link rel="icon" href="/logo/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/logo/png/favicon-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="/logo/png/app-icon-180.png">
```

## PNG (`png/`)
- `isotipo-{azul|blanco|tinta}-{512|128|64}.png` — fondo transparente
- `imagotipo-{horizontal|vertical|compacto}.png` — 4×, tipografía ya rasterizada
- `app-icon-{1024|512|180}.png`
- `favicon-{512|64|48|32|16}.png`

## Reglas
- Aire mínimo por lado = medio alto del isotipo.
- Mínimos de alto: imagotipo 28px, compacto 22px, isotipo 16px.
- Colores permitidos: `#12489E` azul, `#FFFFFF` blanco, `#14181D` tinta. Nada más.
- No estirar, rotar, inclinar, sombrear, ni encerrar el isotipo en un círculo tintado.
- «Clínica» siempre en IBM Plex Mono con tracking .26em; «Conecta» en Source Serif 4 600.
- El isotipo no se usa como ícono de interfaz: en la UI los íconos son Lucide.

## Tipografía en los SVG
El texto va como `<text>`, no como curvas: en web se resuelve porque Source Serif 4 e
IBM Plex Mono se cargan por CSS. Para imprenta, convertir texto a curvas en Illustrator
o usar los PNG del imagotipo.
