/* @ds-bundle: {"format":4,"namespace":"ConectaDesignSystem_3fd8ff","components":[{"name":"Button","sourcePath":"components/actions/Button.jsx"},{"name":"TextLink","sourcePath":"components/actions/TextLink.jsx"},{"name":"WhatsAppButton","sourcePath":"components/actions/WhatsAppButton.jsx"},{"name":"LOGO_CROPS","sourcePath":"components/brand/ConectaLogo.jsx"},{"name":"ConectaLogo","sourcePath":"components/brand/ConectaLogo.jsx"},{"name":"ConectaThread","sourcePath":"components/brand/ConectaThread.jsx"},{"name":"Accordion","sourcePath":"components/content/Accordion.jsx"},{"name":"PriceBlock","sourcePath":"components/content/PriceBlock.jsx"},{"name":"ProfessionalCard","sourcePath":"components/content/ProfessionalCard.jsx"},{"name":"Pullquote","sourcePath":"components/content/Pullquote.jsx"},{"name":"ResourceCard","sourcePath":"components/content/ResourceCard.jsx"},{"name":"ServiceCard","sourcePath":"components/content/ServiceCard.jsx"},{"name":"StatusChip","sourcePath":"components/content/StatusChip.jsx"},{"name":"StepBlock","sourcePath":"components/content/StepBlock.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"MOTIVOS","sourcePath":"components/forms/AppointmentForm.jsx"},{"name":"AppointmentForm","sourcePath":"components/forms/AppointmentForm.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"CONTROL_CSS","sourcePath":"components/forms/Field.jsx"},{"name":"Breadcrumbs","sourcePath":"components/navigation/Breadcrumbs.jsx"},{"name":"SiteFooter","sourcePath":"components/navigation/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/navigation/SiteHeader.jsx"},{"name":"ClinicalDisclaimer","sourcePath":"components/notices/ClinicalDisclaimer.jsx"},{"name":"InfoNote","sourcePath":"components/notices/InfoNote.jsx"},{"name":"UrgencyNotice","sourcePath":"components/notices/UrgencyNotice.jsx"}],"sourceHashes":{"components/actions/Button.jsx":"f45536d98709","components/actions/TextLink.jsx":"cac15e8848e4","components/actions/WhatsAppButton.jsx":"3e0517301e86","components/brand/ConectaLogo.jsx":"b991df93f5b5","components/brand/ConectaThread.jsx":"5c86720a84f4","components/content/Accordion.jsx":"71dd73d71af7","components/content/PriceBlock.jsx":"2e827469ba8b","components/content/ProfessionalCard.jsx":"24af56965c87","components/content/Pullquote.jsx":"bdc6951da4a6","components/content/ResourceCard.jsx":"ca8ae7e83526","components/content/ServiceCard.jsx":"7859f053bb8a","components/content/StatusChip.jsx":"356f6373e0a2","components/content/StepBlock.jsx":"5e89c9c97002","components/core/Icon.jsx":"3e050c58d4e7","components/forms/AppointmentForm.jsx":"34312fb75051","components/forms/Field.jsx":"fa2f28adf8bc","components/navigation/Breadcrumbs.jsx":"ce1b7fd436c3","components/navigation/SiteFooter.jsx":"97e7a2ea0c4b","components/navigation/SiteHeader.jsx":"f4a5f1e26081","components/notices/ClinicalDisclaimer.jsx":"bc8634696772","components/notices/InfoNote.jsx":"6d72f0fb3a53","components/notices/UrgencyNotice.jsx":"67353805e10c"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ConectaDesignSystem_3fd8ff = window.ConectaDesignSystem_3fd8ff || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/ConectaLogo.jsx
try { (() => {
/* Recortes del archivo original (assets/logo-conecta-original.jpg, 500×500).
   No se redibuja la marca: cada variante es una ventana sobre el mismo archivo.
   Ajustar estos valores si el cliente entrega el vector. */
const LOGO_CROPS = {
  full: {
    x: 0,
    y: 0,
    w: 1,
    h: 1
  },
  lockup: {
    x: 0.09,
    y: 0.29,
    w: 0.82,
    h: 0.365
  },
  isotype: {
    x: 0.50,
    y: 0.29,
    w: 0.075,
    h: 0.09
  }
};
function ConectaLogo({
  variant = "lockup",
  height = 48,
  src = "/assets/logo-conecta-original.jpg",
  plate = false,
  alt = "Clínica Conecta",
  className,
  style
}) {
  const c = LOGO_CROPS[variant] || LOGO_CROPS.lockup;
  const mark = /*#__PURE__*/React.createElement("div", {
    role: "img",
    "aria-label": alt,
    className: className,
    style: {
      height,
      width: height * (c.w / c.h),
      backgroundImage: `url(${src})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: `${100 / c.w}% ${100 / c.h}%`,
      backgroundPosition: `${c.x / (1 - c.w || 1) * 100}% ${c.y / (1 - c.h || 1) * 100}%`,
      flexShrink: 0,
      ...(plate ? {} : style)
    }
  });
  if (!plate) return mark;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--color-white, #fff)",
      borderRadius: "var(--radius-md, 8px)",
      padding: "10px 14px",
      display: "inline-flex",
      alignItems: "center",
      ...style
    }
  }, mark);
}
Object.assign(__ds_scope, { LOGO_CROPS, ConectaLogo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ConectaLogo.jsx", error: String((e && e.message) || e) }); }

// components/brand/ConectaThread.jsx
try { (() => {
/* Hilo Conecta — línea continua fina que encadena puntos de una secuencia o de un
   conjunto relacionado. Nace del trazo del estetoscopio del logo. */
function ConectaThread({
  orientation = "horizontal",
  nodes = 4,
  active = -1,
  animate = true,
  thickness = 2,
  nodeRadius = 5,
  className,
  style
}) {
  const n = Math.max(2, nodes);
  const horizontal = orientation === "horizontal";
  const r = nodeRadius + thickness;
  const inset = `${r}px`;
  const trackAxis = horizontal ? "width" : "height";
  const fraction = active < 0 ? 1 : Math.min(1, Math.max(0, active / (n - 1)));
  const track = {
    position: "absolute",
    background: "var(--thread-stroke-muted, #B9CCE8)",
    borderRadius: 999,
    ...(horizontal ? {
      left: inset,
      right: inset,
      top: "50%",
      height: thickness,
      transform: "translateY(-50%)"
    } : {
      top: inset,
      bottom: inset,
      left: "50%",
      width: thickness,
      transform: "translateX(-50%)"
    })
  };
  const fill = {
    position: "absolute",
    background: "var(--thread-stroke, #12489E)",
    borderRadius: 999,
    transformOrigin: horizontal ? "left center" : "center top",
    animation: animate ? `conecta-thread-draw-${horizontal ? "x" : "y"} var(--dur-thread, 1400ms) var(--ease-thread, cubic-bezier(.65,0,.35,1)) both` : undefined,
    ...(horizontal ? {
      left: inset,
      top: "50%",
      height: thickness,
      [trackAxis]: `calc((100% - ${r * 2}px) * ${fraction})`,
      transform: "translateY(-50%)"
    } : {
      top: inset,
      left: "50%",
      width: thickness,
      [trackAxis]: `calc((100% - ${r * 2}px) * ${fraction})`,
      transform: "translateX(-50%)"
    })
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: "relative",
      ...(horizontal ? {
        width: "100%",
        height: r * 2
      } : {
        height: "100%",
        width: r * 2
      }),
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes conecta-thread-draw-x{from{transform:translateY(-50%) scaleX(0)}to{transform:translateY(-50%) scaleX(1)}}" + "@keyframes conecta-thread-draw-y{from{transform:translateX(-50%) scaleY(0)}to{transform:translateX(-50%) scaleY(1)}}" + "@media (prefers-reduced-motion:reduce){.conecta-thread-fill{animation:none!important}}"), /*#__PURE__*/React.createElement("div", {
    style: track
  }), /*#__PURE__*/React.createElement("div", {
    className: "conecta-thread-fill",
    style: fill
  }), Array.from({
    length: n
  }, (_, i) => {
    const on = active < 0 || i <= active;
    const at = `calc(${inset} + (100% - ${r * 2}px) * ${i / (n - 1)})`;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "absolute",
        width: nodeRadius * 2,
        height: nodeRadius * 2,
        borderRadius: 999,
        boxSizing: "content-box",
        background: "var(--color-white, #fff)",
        border: `${thickness}px solid ${on ? "var(--thread-stroke, #12489E)" : "var(--thread-stroke-muted, #B9CCE8)"}`,
        ...(horizontal ? {
          left: at,
          top: "50%",
          transform: "translate(-50%,-50%)"
        } : {
          top: at,
          left: "50%",
          transform: "translate(-50%,-50%)"
        })
      }
    });
  }));
}
Object.assign(__ds_scope, { ConectaThread });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/ConectaThread.jsx", error: String((e && e.message) || e) }); }

// components/content/Pullquote.jsx
try { (() => {
/* Cita o dato destacado dentro de texto largo. */
function Pullquote({
  children,
  source,
  kind = "quote",
  style
}) {
  const data = kind === "data";
  return /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: "40px 0",
      padding: "28px 32px",
      background: data ? "var(--surface-alt, #EDF3FC)" : "transparent",
      borderRadius: data ? "var(--radius-lg, 16px)" : 0,
      borderTop: data ? "none" : "2px solid var(--color-blue, #12489E)",
      borderBottom: data ? "none" : "1px solid var(--color-line, #E2E7EE)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: data ? "var(--font-mono, monospace)" : "var(--font-serif, serif)",
      fontWeight: data ? 400 : 600,
      fontSize: data ? "var(--text-h2, 30px)" : "var(--text-h3, 22px)",
      lineHeight: data ? 1.25 : 1.4,
      color: data ? "var(--color-blue-deep, #0A2B5E)" : "var(--color-blue, #12489E)"
    }
  }, children), source && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: 12,
      fontSize: "var(--text-body-sm, 15px)",
      color: "var(--color-gray, #5B646E)"
    }
  }, source));
}
Object.assign(__ds_scope, { Pullquote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Pullquote.jsx", error: String((e && e.message) || e) }); }

// components/content/StepBlock.jsx
try { (() => {
/* Paso numerado. La numeración es información real: es la secuencia de la atención. */
function StepBlock({
  number,
  title,
  children,
  active = true,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 999,
      border: `2px solid ${active ? "var(--color-blue, #12489E)" : "var(--thread-stroke-muted, #B9CCE8)"}`,
      background: "var(--color-white, #fff)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 18,
      fontWeight: 500,
      color: active ? "var(--color-blue, #12489E)" : "var(--color-gray, #5B646E)"
    }
  }, String(number).padStart(2, "0")), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif, serif)",
      fontWeight: 600,
      fontSize: "var(--text-h3, 22px)",
      lineHeight: 1.3,
      color: "var(--color-blue, #12489E)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--text-body, 17px)",
      lineHeight: 1.6,
      color: "var(--color-ink, #14181D)",
      maxWidth: "38ch"
    }
  }, children));
}
Object.assign(__ds_scope, { StepBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StepBlock.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const LUCIDE = "https://unpkg.com/lucide-static@latest/icons/";
const SIMPLE = "https://unpkg.com/simple-icons@latest/icons/";

/* Ícono monocromo. El SVG llega como máscara CSS, así que hereda el color
   del texto y nunca se ve como una imagen pegada. */
function Icon({
  name,
  size = 20,
  color = "currentColor",
  set = "lucide",
  style,
  ...rest
}) {
  const url = (set === "simple" ? SIMPLE : LUCIDE) + name + ".svg";
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flexShrink: 0,
      background: color,
      WebkitMaskImage: `url(${url})`,
      maskImage: `url(${url})`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/actions/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 40,
    padding: "0 16px",
    font: "var(--text-body-sm, 15px)",
    icon: 18,
    gap: 8
  },
  md: {
    height: 48,
    padding: "0 20px",
    font: "var(--text-body, 17px)",
    icon: 20,
    gap: 8
  },
  lg: {
    height: 56,
    padding: "0 28px",
    font: "var(--text-body-lg, 18px)",
    icon: 22,
    gap: 10
  }
};
function Button({
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "right",
  loading = false,
  disabled = false,
  fullWidth = false,
  as = "button",
  children,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const isText = variant === "text";
  const off = disabled || loading;
  const skin = {
    primary: {
      background: off ? "var(--action-disabled-bg, #E2E7EE)" : "var(--action-primary-bg, #12489E)",
      color: off ? "var(--action-disabled-fg, #5B646E)" : "var(--action-primary-fg, #fff)",
      border: "1px solid transparent"
    },
    secondary: {
      background: "transparent",
      color: off ? "var(--action-disabled-fg, #5B646E)" : "var(--action-secondary-fg, #12489E)",
      border: `1px solid ${off ? "var(--color-line, #E2E7EE)" : "var(--color-blue, #12489E)"}`
    },
    text: {
      background: "transparent",
      color: off ? "var(--action-disabled-fg, #5B646E)" : "var(--color-blue, #12489E)",
      border: "1px solid transparent",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "1px"
    }
  }[variant];
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    disabled: as === "button" ? off : undefined,
    "aria-busy": loading || undefined,
    "data-variant": variant,
    className: "conecta-btn",
    style: {
      display: fullWidth ? "flex" : "inline-flex",
      width: fullWidth ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: s.gap,
      minHeight: s.height,
      minWidth: 44,
      padding: isText ? "0 2px" : s.padding,
      borderRadius: isText ? "var(--radius-sm, 4px)" : "var(--radius-md, 8px)",
      fontFamily: "var(--font-sans, sans-serif)",
      fontSize: s.font,
      fontWeight: 600,
      lineHeight: 1,
      cursor: off ? "not-allowed" : "pointer",
      textDecorationColor: "currentColor",
      transition: "background-color var(--dur-fast, 150ms) var(--ease-out, ease), color var(--dur-fast, 150ms) var(--ease-out, ease), border-color var(--dur-fast, 150ms) var(--ease-out, ease)",
      ...skin,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `.conecta-btn{-webkit-tap-highlight-color:transparent}
.conecta-btn:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px}
.conecta-btn[data-variant=primary]:hover:not(:disabled){background:var(--action-primary-bg-hover,#0A2B5E)}
.conecta-btn[data-variant=primary]:active:not(:disabled){background:#08214A}
.conecta-btn[data-variant=secondary]:hover:not(:disabled){background:var(--surface-alt,#EDF3FC)}
.conecta-btn[data-variant=secondary]:active:not(:disabled){background:#DCE8F9}
.conecta-btn[data-variant=text]:hover:not(:disabled){color:var(--color-blue-deep,#0A2B5E)}
@keyframes conecta-spin{to{transform:rotate(360deg)}}`), loading && /*#__PURE__*/React.createElement("span", {
    style: {
      width: s.icon,
      height: s.icon,
      borderRadius: 999,
      border: "2px solid currentColor",
      borderTopColor: "transparent",
      animation: "conecta-spin 700ms linear infinite",
      flexShrink: 0
    }
  }), !loading && icon && iconPosition === "left" && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }), /*#__PURE__*/React.createElement("span", null, children), !loading && icon && iconPosition === "right" && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: s.icon
  }));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/Button.jsx", error: String((e && e.message) || e) }); }

// components/actions/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Enlace en texto corrido: siempre subrayado, nunca solo color. */
function TextLink({
  href = "#",
  external = false,
  arrow = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    className: "conecta-link",
    target: external ? "_blank" : undefined,
    rel: external ? "noopener noreferrer" : undefined,
    style: {
      color: "var(--text-link, #12489E)",
      textDecoration: "underline",
      textDecorationThickness: "1px",
      textUnderlineOffset: "3px",
      fontWeight: 500,
      transition: "color var(--dur-fast, 150ms) var(--ease-out, ease)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `.conecta-link:hover{color:var(--text-link-hover,#0A2B5E);text-decoration-thickness:2px}.conecta-link:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:2px}`), children, arrow && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16,
    style: {
      marginLeft: 4,
      verticalAlign: "-2px"
    }
  }), external && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "external-link",
    size: 14,
    style: {
      marginLeft: 4,
      verticalAlign: "-1px"
    }
  }));
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/actions/WhatsAppButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* WhatsApp: variante propia, reconocible en todo el sitio. Verde solo aquí. */
function WhatsAppButton({
  phone = "56912345678",
  message = "Hola, quiero consultar por una hora en Clínica Conecta.",
  variant = "floating",
  label = "Escribir por WhatsApp",
  style,
  ...rest
}) {
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  const floating = variant === "floating";
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "conecta-wa",
    "aria-label": label,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      minHeight: 48,
      padding: floating ? "0 20px" : "0 18px",
      borderRadius: floating ? 999 : "var(--radius-md, 8px)",
      background: "#0F7A46",
      color: "#fff",
      fontFamily: "var(--font-sans, sans-serif)",
      fontSize: "var(--text-body, 17px)",
      fontWeight: 600,
      lineHeight: 1,
      textDecoration: "none",
      boxShadow: floating ? "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))" : "none",
      transition: "background-color var(--dur-fast, 150ms) var(--ease-out, ease)",
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("style", null, `.conecta-wa:hover{background:#0B5F36!important}.conecta-wa:active{background:#094D2C!important}.conecta-wa:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px}`), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "whatsapp",
    set: "simple",
    size: 22,
    color: "#fff"
  }), /*#__PURE__*/React.createElement("span", null, floating ? "WhatsApp" : label));
}
Object.assign(__ds_scope, { WhatsAppButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/WhatsAppButton.jsx", error: String((e && e.message) || e) }); }

// components/content/Accordion.jsx
try { (() => {
function Accordion({
  items = [],
  single = true,
  defaultOpen = 0,
  style
}) {
  const [open, setOpen] = React.useState(single ? defaultOpen : [defaultOpen]);
  const isOpen = i => single ? open === i : open.includes(i);
  const toggle = i => single ? setOpen(open === i ? -1 : i) : setOpen(isOpen(i) ? open.filter(x => x !== i) : [...open, i]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--color-line, #E2E7EE)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `.conecta-acc-btn{display:flex;width:100%;gap:16px;align-items:flex-start;justify-content:space-between;min-height:44px;padding:20px 0;background:none;border:0;cursor:pointer;text-align:left;font-family:var(--font-sans,sans-serif);font-size:var(--text-h4,19px);font-weight:600;color:var(--color-ink,#14181D);transition:color var(--dur-fast,150ms) var(--ease-out,ease)}
.conecta-acc-btn:hover{color:var(--color-blue,#12489E)}
.conecta-acc-btn:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:var(--radius-sm,4px)}`), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.q,
    style: {
      borderBottom: "1px solid var(--color-line, #E2E7EE)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "conecta-acc-btn",
    "aria-expanded": isOpen(i),
    onClick: () => toggle(i)
  }, /*#__PURE__*/React.createElement("span", null, it.q), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: isOpen(i) ? "minus" : "plus",
    size: 22,
    color: "var(--color-blue, #12489E)",
    style: {
      marginTop: 2
    }
  }))), isOpen(i) && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 24px",
      maxWidth: "66ch",
      fontSize: "var(--text-body, 17px)",
      lineHeight: 1.6,
      color: "var(--color-ink, #14181D)"
    }
  }, it.a))));
}
Object.assign(__ds_scope, { Accordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/Accordion.jsx", error: String((e && e.message) || e) }); }

// components/content/PriceBlock.jsx
try { (() => {
function PriceBlock({
  amount = "$50.000",
  note = "Consulta hematología",
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 24,
      alignItems: "center",
      justifyContent: "space-between",
      padding: 28,
      background: "var(--surface-alt, #EDF3FC)",
      borderRadius: "var(--radius-lg, 16px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--color-gray, #5B646E)"
    }
  }, note), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 40,
      lineHeight: 1,
      color: "var(--color-blue-deep, #0A2B5E)"
    }
  }, amount)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.55,
      color: "var(--color-ink, #14181D)",
      maxWidth: "34ch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "info",
    size: 18,
    color: "var(--color-blue, #12489E)",
    style: {
      marginTop: 2
    }
  }), "Atenci\xF3n solo particular. No trabajamos con Fonasa ni isapres en convenio."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "file-text",
    size: 18,
    color: "var(--color-blue, #12489E)",
    style: {
      marginTop: 2
    }
  }), "Entregamos boleta para reembolso en tu isapre o seguro.")));
}
Object.assign(__ds_scope, { PriceBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/PriceBlock.jsx", error: String((e && e.message) || e) }); }

// components/content/ProfessionalCard.jsx
try { (() => {
/* Tarjeta de profesional. Sin foto disponible se usa un monograma sobre azul nube:
   nunca un avatar genérico ni una silueta. */
function ProfessionalCard({
  name,
  role,
  subtitle,
  href = "#",
  photoSrc,
  initials,
  style
}) {
  const HONORIFICS = ["dr.", "dra.", "prof.", "prof", "dr", "dra", "sr.", "sra."];
  const mono = initials || (name || "").split(" ").filter(Boolean).filter(w => !HONORIFICS.includes(w.toLowerCase())).slice(0, 2).map(w => w[0]).join("");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      padding: 24,
      background: "var(--surface-card, #fff)",
      border: "1px solid var(--color-line, #E2E7EE)",
      borderRadius: "var(--radius-lg, 16px)",
      boxShadow: "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    "aria-hidden": "true",
    style: {
      width: 88,
      height: 88,
      flexShrink: 0,
      borderRadius: "var(--radius-md, 8px)",
      background: photoSrc ? `center/cover no-repeat url(${photoSrc})` : "var(--surface-alt, #EDF3FC)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-serif, serif)",
      fontWeight: 600,
      fontSize: 30,
      color: "var(--color-blue, #12489E)"
    }
  }, !photoSrc && mono), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans, sans-serif)",
      fontWeight: 600,
      fontSize: "var(--text-h4, 19px)",
      color: "var(--color-ink, #14181D)"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--color-blue, #12489E)"
    }
  }, role), subtitle && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.55,
      color: "var(--color-gray, #5B646E)"
    }
  }, subtitle), /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "conecta-prof-link",
    style: {
      marginTop: 4,
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: "var(--color-blue, #12489E)",
      fontWeight: 500,
      fontSize: "var(--text-body-sm, 15px)",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "1px",
      width: "fit-content"
    }
  }, "Ver perfil", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16
  })), /*#__PURE__*/React.createElement("style", null, `.conecta-prof-link:hover{color:var(--color-blue-deep,#0A2B5E)}.conecta-prof-link:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:2px}`)));
}
Object.assign(__ds_scope, { ProfessionalCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProfessionalCard.jsx", error: String((e && e.message) || e) }); }

// components/content/ResourceCard.jsx
try { (() => {
/* Recurso de video. La portada es una imagen de YouTube; el iframe se carga solo al
   hacer clic, así la página no arrastra scripts de terceros. */
function ResourceCard({
  videoId,
  title,
  duration,
  kicker = "Video",
  style
}) {
  const [playing, setPlaying] = React.useState(false);
  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card, #fff)",
      border: "1px solid var(--color-line, #E2E7EE)",
      borderRadius: "var(--radius-lg, 16px)",
      boxShadow: "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "16 / 9",
      background: "var(--surface-alt, #EDF3FC)"
    }
  }, playing ? /*#__PURE__*/React.createElement("iframe", {
    title: title,
    src: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture",
    allowFullScreen: true,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      border: 0
    }
  }) : /*#__PURE__*/React.createElement("button", {
    className: "conecta-play",
    onClick: () => setPlaying(true),
    "aria-label": `Reproducir: ${title}`,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      padding: 0,
      border: 0,
      cursor: "pointer",
      background: `center/cover no-repeat url(${poster})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      height: 48,
      padding: "0 20px",
      borderRadius: 999,
      background: "var(--color-white, #fff)",
      color: "var(--color-blue, #12489E)",
      fontFamily: "var(--font-sans, sans-serif)",
      fontSize: 15,
      fontWeight: 600,
      boxShadow: "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "play",
    size: 18,
    color: "var(--color-blue, #12489E)"
  }), "Reproducir")), /*#__PURE__*/React.createElement("style", null, `.conecta-play:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:-4px}`)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--color-gray, #5B646E)"
    }
  }, /*#__PURE__*/React.createElement("span", null, kicker), duration && /*#__PURE__*/React.createElement("span", null, duration)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans, sans-serif)",
      fontWeight: 600,
      fontSize: "var(--text-h4, 19px)",
      lineHeight: 1.4,
      color: "var(--color-ink, #14181D)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-caption, 14px)",
      color: "var(--color-gray, #5B646E)"
    }
  }, "El video se carga desde YouTube solo al reproducirlo.")));
}
Object.assign(__ds_scope, { ResourceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ResourceCard.jsx", error: String((e && e.message) || e) }); }

// components/content/StatusChip.jsx
try { (() => {
const KINDS = {
  telemedicina: {
    label: "Telemedicina",
    icon: "video"
  },
  presencial: {
    label: "Presencial",
    icon: "map-pin"
  },
  sabado: {
    label: "Sábado",
    icon: "calendar"
  }
};
function StatusChip({
  kind = "presencial",
  label,
  style
}) {
  const k = KINDS[kind] || KINDS.presencial;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 28,
      padding: "0 12px",
      borderRadius: "var(--radius-pill, 999px)",
      background: "var(--surface-alt, #EDF3FC)",
      border: "1px solid #D3E1F6",
      color: "var(--color-blue-deep, #0A2B5E)",
      fontFamily: "var(--font-sans, sans-serif)",
      fontSize: "var(--text-caption, 14px)",
      fontWeight: 500,
      lineHeight: 1,
      whiteSpace: "nowrap",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: k.icon,
    size: 14,
    color: "var(--color-blue, #12489E)"
  }), label || k.label);
}
Object.assign(__ds_scope, { StatusChip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/StatusChip.jsx", error: String((e && e.message) || e) }); }

// components/content/ServiceCard.jsx
try { (() => {
/* Tarjeta de prestación. "axis" es hematología: el eje. "orbit" son las tres que
   giran alrededor. La jerarquía se resuelve con superficie y tamaño, no con color de borde. */
function ServiceCard({
  level = "orbit",
  title,
  summary,
  href = "#",
  icon,
  chips = [],
  style
}) {
  const axis = level === "axis";
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "conecta-service",
    style: {
      display: "flex",
      flexDirection: "column",
      gap: axis ? 16 : 12,
      padding: axis ? 32 : 24,
      background: axis ? "var(--surface-alt, #EDF3FC)" : "var(--surface-card, #fff)",
      border: axis ? "1px solid transparent" : "1px solid var(--color-line, #E2E7EE)",
      borderRadius: "var(--radius-lg, 16px)",
      boxShadow: axis ? "none" : "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))",
      textDecoration: "none",
      color: "var(--color-ink, #14181D)",
      height: "100%",
      transition: "border-color var(--dur-fast, 150ms) var(--ease-out, ease), background-color var(--dur-fast, 150ms) var(--ease-out, ease)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `.conecta-service:hover{border-color:var(--color-blue,#12489E)!important}
.conecta-service:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px}
.conecta-service:hover .conecta-service-cta{text-decoration-thickness:2px}`), icon && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: axis ? 32 : 24,
    color: "var(--color-blue, #12489E)"
  }), axis && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "var(--color-gray, #5B646E)"
    }
  }, "Unidad principal"), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-serif, serif)",
      fontWeight: 600,
      fontSize: axis ? "var(--text-h2, 30px)" : "var(--text-h4, 19px)",
      lineHeight: axis ? 1.2 : 1.4,
      letterSpacing: axis ? "-0.01em" : 0,
      color: "var(--color-blue, #12489E)"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: axis ? "var(--text-body-lg, 19px)" : "var(--text-body-sm, 15px)",
      lineHeight: 1.6,
      color: axis ? "var(--color-ink, #14181D)" : "var(--color-gray, #5B646E)",
      maxWidth: "44ch"
    }
  }, summary), chips.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 4
    }
  }, chips.map(c => /*#__PURE__*/React.createElement(__ds_scope.StatusChip, {
    key: c,
    kind: c
  }))), /*#__PURE__*/React.createElement("span", {
    className: "conecta-service-cta",
    style: {
      marginTop: "auto",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      color: "var(--color-blue, #12489E)",
      fontWeight: 600,
      fontSize: "var(--text-body-sm, 15px)",
      textDecoration: "underline",
      textUnderlineOffset: "3px",
      textDecorationThickness: "1px"
    }
  }, axis ? "Ver la unidad" : "Ver prestación", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 16
  })));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
/* Envoltura de campo: etiqueta, ayuda, error y marca de requerido.
   Todo control del sistema se monta dentro de este componente. */
function Field({
  id,
  label,
  help,
  error,
  required = false,
  children,
  style
}) {
  const helpId = help ? id + "-help" : undefined;
  const errId = error ? id + "-error" : undefined;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      ...style
    }
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: id,
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".06em",
      textTransform: "uppercase",
      color: "var(--color-ink, #14181D)"
    }
  }, label, !required && /*#__PURE__*/React.createElement("span", {
    style: {
      textTransform: "none",
      letterSpacing: 0,
      color: "var(--color-gray, #5B646E)"
    }
  }, " (opcional)")), help && /*#__PURE__*/React.createElement("div", {
    id: helpId,
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.5,
      color: "var(--color-gray, #5B646E)"
    }
  }, help), React.isValidElement(children) ? React.cloneElement(children, {
    id,
    "aria-describedby": [helpId, errId].filter(Boolean).join(" ") || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-required": required || undefined,
    "data-error": error ? "true" : undefined
  }) : children, error && /*#__PURE__*/React.createElement("div", {
    id: errId,
    role: "alert",
    style: {
      display: "flex",
      gap: 6,
      alignItems: "flex-start",
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.5,
      color: "var(--text-error, #B4472F)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "triangle-alert",
    size: 18,
    style: {
      marginTop: 1
    }
  }), error));
}
const CONTROL_CSS = `.conecta-control{width:100%;min-height:48px;padding:0 14px;background:var(--color-white,#fff);border:1px solid var(--border-control,#78828E);border-radius:var(--radius-md,8px);font-family:var(--font-sans,sans-serif);font-size:var(--text-body,17px);color:var(--color-ink,#14181D);transition:border-color var(--dur-fast,150ms) var(--ease-out,ease)}
.conecta-control::placeholder{color:var(--color-gray,#5B646E)}
.conecta-control:hover:not(:disabled){border-color:var(--color-blue,#12489E)}
.conecta-control:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-color:var(--color-blue,#12489E)}
.conecta-control[data-error=true]{border-width:2px;border-color:var(--border-error,#B4472F)}
.conecta-control:disabled{background:#F5F7FA;border-color:var(--color-line,#E2E7EE);color:var(--color-gray,#5B646E);cursor:not-allowed}
textarea.conecta-control{min-height:120px;padding:12px 14px;line-height:1.6;resize:vertical}
select.conecta-control{appearance:none;padding-right:44px;background-image:url("https://unpkg.com/lucide-static@latest/icons/chevron-down.svg");background-repeat:no-repeat;background-position:right 14px center;background-size:20px}`;
Object.assign(__ds_scope, { Field, CONTROL_CSS });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/AppointmentForm.jsx
try { (() => {
const MOTIVOS = ["Hemograma alterado", "Anemia", "Plaquetas bajas o altas", "Control de tratamiento hematológico", "Interpretación de imágenes", "Otra derivación de mi médico"];
const COMUNAS = ["Ñuñoa", "Providencia", "Las Condes", "La Reina", "Macul", "Peñalolén", "Santiago Centro", "Otra comuna", "Otra región"];

/* Formulario de solicitud de hora. Sin ningún campo libre para síntomas o antecedentes. */
function AppointmentForm({
  state = "idle",
  errors = {},
  onSubmit,
  style
}) {
  const [status, setStatus] = React.useState(state);
  React.useEffect(() => setStatus(state), [state]);
  const submit = e => {
    e.preventDefault();
    if (onSubmit) return onSubmit(e);
    setStatus("loading");
    setTimeout(() => setStatus("sent"), 1200);
  };
  if (status === "sent") {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        padding: 32,
        background: "var(--surface-alt, #EDF3FC)",
        borderRadius: "var(--radius-lg, 16px)",
        maxWidth: 620,
        ...style
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 32,
      color: "var(--color-blue, #12489E)"
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        margin: 0,
        fontFamily: "var(--font-serif, serif)",
        fontWeight: 600,
        fontSize: "var(--text-h2, 30px)",
        lineHeight: 1.2,
        color: "var(--color-blue, #12489E)"
      }
    }, "Solicitud enviada"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "var(--text-body, 17px)",
        lineHeight: 1.6,
        maxWidth: "56ch"
      }
    }, "Te llamamos dentro del pr\xF3ximo d\xEDa h\xE1bil para confirmar d\xEDa y hora. Si necesitas algo antes, escr\xEDbenos por WhatsApp."), /*#__PURE__*/React.createElement(__ds_scope.WhatsAppButton, {
      variant: "inline",
      style: {
        alignSelf: "flex-start",
        marginTop: 4
      }
    }));
  }
  return /*#__PURE__*/React.createElement("form", {
    onSubmit: submit,
    noValidate: true,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24,
      maxWidth: 620,
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, __ds_scope.CONTROL_CSS), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "nombre",
    label: "Nombre y apellido",
    required: true,
    error: errors.nombre,
    style: {
      gridColumn: "span 2"
    }
  }, /*#__PURE__*/React.createElement("input", {
    className: "conecta-control",
    name: "nombre",
    autoComplete: "name"
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "telefono",
    label: "Tel\xE9fono",
    help: "Lo usamos solo para confirmar tu hora.",
    required: true,
    error: errors.telefono
  }, /*#__PURE__*/React.createElement("input", {
    className: "conecta-control",
    name: "telefono",
    type: "tel",
    inputMode: "tel",
    autoComplete: "tel",
    placeholder: "+56 9 1234 5678"
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "correo",
    label: "Correo",
    required: true,
    error: errors.correo
  }, /*#__PURE__*/React.createElement("input", {
    className: "conecta-control",
    name: "correo",
    type: "email",
    autoComplete: "email"
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "comuna",
    label: "Comuna",
    required: true,
    error: errors.comuna
  }, /*#__PURE__*/React.createElement("select", {
    className: "conecta-control",
    name: "comuna",
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Selecciona"), COMUNAS.map(c => /*#__PURE__*/React.createElement("option", {
    key: c
  }, c)))), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "modalidad",
    label: "Modalidad",
    required: true,
    error: errors.modalidad
  }, /*#__PURE__*/React.createElement("select", {
    className: "conecta-control",
    name: "modalidad",
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Selecciona"), /*#__PURE__*/React.createElement("option", null, "Presencial en \xD1u\xF1oa"), /*#__PURE__*/React.createElement("option", null, "Telemedicina"))), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    id: "motivo",
    label: "Motivo de la consulta",
    help: "Elige la opci\xF3n m\xE1s cercana. No escribas s\xEDntomas ni antecedentes ac\xE1.",
    required: true,
    error: errors.motivo,
    style: {
      gridColumn: "span 2"
    }
  }, /*#__PURE__*/React.createElement("select", {
    className: "conecta-control",
    name: "motivo",
    defaultValue: ""
  }, /*#__PURE__*/React.createElement("option", {
    value: "",
    disabled: true
  }, "Selecciona"), MOTIVOS.map(m => /*#__PURE__*/React.createElement("option", {
    key: m
  }, m))))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.55,
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    name: "consentimiento",
    required: true,
    style: {
      width: 22,
      height: 22,
      marginTop: 2,
      accentColor: "var(--color-blue, #12489E)",
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", null, "Autorizo a Cl\xEDnica Conecta a contactarme por tel\xE9fono, correo o WhatsApp para coordinar esta hora. No enviaremos publicidad.")), errors.consentimiento && /*#__PURE__*/React.createElement("div", {
    role: "alert",
    style: {
      display: "flex",
      gap: 6,
      fontSize: "var(--text-body-sm, 15px)",
      color: "var(--text-error, #B4472F)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "triangle-alert",
    size: 18
  }), errors.consentimiento), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    loading: status === "loading"
  }, "Solicitar hora"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--text-caption, 14px)",
      color: "var(--color-gray, #5B646E)"
    }
  }, "Respondemos dentro del pr\xF3ximo d\xEDa h\xE1bil.")));
}
Object.assign(__ds_scope, { MOTIVOS, AppointmentForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/AppointmentForm.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumbs.jsx
try { (() => {
function Breadcrumbs({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Ruta",
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("ol", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: 8,
      listStyle: "none",
      margin: 0,
      padding: 0
    }
  }, items.map((it, i) => {
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement("li", {
      key: it.href || it.label,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 8
      }
    }, last ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        color: "var(--color-gray, #5B646E)"
      }
    }, it.label) : /*#__PURE__*/React.createElement("a", {
      href: it.href,
      className: "conecta-crumb",
      style: {
        color: "var(--color-blue, #12489E)",
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        textDecorationThickness: "1px"
      }
    }, it.label), !last && /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-right",
      size: 14,
      color: "var(--color-line-strong, #78828E)"
    }));
  })), /*#__PURE__*/React.createElement("style", null, `.conecta-crumb:hover{color:var(--color-blue-deep,#0A2B5E)}.conecta-crumb:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:2px}`));
}
Object.assign(__ds_scope, { Breadcrumbs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumbs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteFooter.jsx
try { (() => {
function SiteFooter({
  logoSrc,
  style
}) {
  const link = {
    color: "#D6E3F7",
    textDecoration: "none",
    fontSize: "var(--text-body-sm, 15px)",
    lineHeight: 1.9
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      background: "var(--surface-footer, #0A2B5E)",
      color: "#fff",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `.conecta-foot-link{color:#D6E3F7;text-decoration:none}.conecta-foot-link:hover{color:#fff;text-decoration:underline;text-underline-offset:3px}.conecta-foot-link:focus-visible{outline:2px solid #fff;outline-offset:2px;border-radius:2px}`), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max, 1200px)",
      margin: "0 auto",
      padding: "64px 48px 32px",
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr 1fr",
      gap: 48
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      borderRadius: "var(--radius-md, 8px)",
      padding: "10px 14px",
      display: "inline-flex"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ConectaLogo, {
    variant: "lockup",
    height: 34,
    src: logoSrc
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 20,
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.7,
      color: "#D6E3F7"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: "#fff",
      fontWeight: 600
    }
  }, "Cl\xEDnica Conecta SpA"), /*#__PURE__*/React.createElement("div", null, "Edificio New Ega\xF1a"), /*#__PURE__*/React.createElement("div", null, "Av. Am\xE9rico Vespucio 1106, \xD1u\xF1oa, Santiago"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontFamily: "var(--font-mono, monospace)"
    }
  }, "+56 9 1234 5678"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)"
    }
  }, "contacto@conectamedica.com"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "#8FB0DE",
      marginBottom: 12
    }
  }, "Horarios"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.9,
      color: "#D6E3F7"
    }
  }, /*#__PURE__*/React.createElement("div", null, "Lunes a viernes \xB7 09:00\u201318:00"), /*#__PURE__*/React.createElement("div", null, "S\xE1bado \xB7 09:00\u201313:00"), /*#__PURE__*/React.createElement("div", null, "Domingo y festivos \xB7 cerrado"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      color: "#fff"
    }
  }, "Atenci\xF3n solo particular \xB7 $50.000"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".12em",
      textTransform: "uppercase",
      color: "#8FB0DE",
      marginBottom: 12
    }
  }, "Sitio"), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      flexDirection: "column"
    }
  }, [["Unidad de hematología", "/hematologia"], ["Prestaciones", "/prestaciones"], ["Telemedicina", "/telemedicina"], ["Agendar hora", "/agendar"], ["Política de privacidad", "/privacidad"], ["Términos de uso", "/terminos"]].map(([l, h]) => /*#__PURE__*/React.createElement("a", {
    key: h,
    href: h,
    className: "conecta-foot-link",
    style: link
  }, l))))), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid rgba(255,255,255,.18)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max, 1200px)",
      margin: "0 auto",
      padding: "20px 48px 40px",
      display: "flex",
      flexWrap: "wrap",
      gap: 24,
      alignItems: "flex-start",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      maxWidth: "62ch"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "triangle-alert",
    size: 20,
    color: "#F0B5A5",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.6,
      color: "#F0B5A5"
    }
  }, /*#__PURE__*/React.createElement("b", {
    style: {
      color: "#fff"
    }
  }, "Esta no es una unidad de urgencia."), " Si tienes fiebre alta, sangrado que no se detiene o falta de aire, acude al servicio de urgencia m\xE1s cercano o llama al 131.")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-caption, 14px)",
      color: "#8FB0DE"
    }
  }, "\xA9 2026 Cl\xEDnica Conecta SpA"))));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SiteHeader.jsx
try { (() => {
const NAV = [{
  label: "Unidad de hematología",
  href: "/hematologia"
}, {
  label: "Prestaciones",
  href: "/prestaciones"
}, {
  label: "Telemedicina",
  href: "/telemedicina"
}, {
  label: "Información para pacientes",
  href: "/pacientes"
}, {
  label: "Contacto",
  href: "/contacto"
}];
function SiteHeader({
  items = NAV,
  active = "/hematologia",
  compressed = false,
  layout = "desktop",
  menuOpen = false,
  logoSrc,
  onToggleMenu,
  style
}) {
  const mobile = layout === "mobile";
  const h = compressed ? 64 : 80;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: "relative",
      background: "var(--color-white, #fff)",
      borderBottom: compressed ? "none" : "1px solid var(--color-line, #E2E7EE)",
      boxShadow: compressed ? "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))" : "none",
      transition: "height var(--dur-mid, 200ms) var(--ease-standard, ease), box-shadow var(--dur-mid, 200ms) var(--ease-standard, ease)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `.conecta-nav-item{position:relative;font-family:var(--font-sans,sans-serif);font-size:var(--text-body-sm,15px);font-weight:500;color:var(--color-ink,#14181D);text-decoration:none;padding:6px 0;transition:color var(--dur-fast,150ms) var(--ease-out,ease)}
.conecta-nav-item:hover{color:var(--color-blue,#12489E)}
.conecta-nav-item:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:4px;border-radius:2px}
.conecta-nav-item[aria-current=page]{color:var(--color-blue,#12489E)}
.conecta-nav-item[aria-current=page]::after{content:"";position:absolute;left:0;right:0;bottom:-6px;height:2px;background:var(--color-blue,#12489E)}
.conecta-burger{display:inline-flex;align-items:center;justify-content:center;width:44px;height:44px;background:none;border:none;cursor:pointer;color:var(--color-ink,#14181D)}
.conecta-burger:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:var(--radius-sm,4px)}
.conecta-mobile-item{display:block;font-family:var(--font-sans,sans-serif);font-size:var(--text-body,17px);font-weight:500;color:var(--color-ink,#14181D);text-decoration:none;padding:14px 0;border-bottom:1px solid var(--color-line,#E2E7EE)}
.conecta-mobile-item[aria-current=page]{color:var(--color-blue,#12489E)}`), /*#__PURE__*/React.createElement("div", {
    style: {
      height: h,
      maxWidth: "var(--container-max, 1200px)",
      margin: "0 auto",
      padding: mobile ? "0 20px" : "0 48px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "/",
    "aria-label": "Cl\xEDnica Conecta, inicio",
    style: {
      display: "inline-flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ConectaLogo, {
    variant: "lockup",
    height: compressed || mobile ? 36 : 44,
    src: logoSrc
  })), !mobile && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Principal",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.href,
    href: it.href,
    className: "conecta-nav-item",
    "aria-current": active === it.href ? "page" : undefined
  }, it.label))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: compressed ? "sm" : "md",
    as: "a",
    href: "/agendar",
    icon: "calendar",
    iconPosition: "left"
  }, "Agendar hora")), mobile && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    as: "a",
    href: "/agendar"
  }, "Agendar hora"), /*#__PURE__*/React.createElement("button", {
    className: "conecta-burger",
    "aria-label": menuOpen ? "Cerrar menú" : "Abrir menú",
    "aria-expanded": menuOpen,
    onClick: onToggleMenu
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: menuOpen ? "x" : "menu",
    size: 24
  })))), mobile && menuOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: h,
      background: "var(--color-white, #fff)",
      borderTop: "1px solid var(--color-line, #E2E7EE)",
      boxShadow: "var(--shadow-2, 0 4px 12px -2px rgba(20,24,29,.10))",
      padding: "8px 20px 24px",
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Principal"
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it.href,
    href: it.href,
    className: "conecta-mobile-item",
    "aria-current": active === it.href ? "page" : undefined
  }, it.label))), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "md",
    as: "a",
    href: "/agendar",
    fullWidth: true,
    icon: "calendar",
    iconPosition: "left",
    style: {
      marginTop: 20
    }
  }, "Agendar hora"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      fontSize: "var(--text-body-sm, 15px)",
      color: "var(--color-gray, #5B646E)"
    }
  }, "Atenci\xF3n solo particular \xB7 consulta $50.000")));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/notices/ClinicalDisclaimer.jsx
try { (() => {
function ClinicalDisclaimer({
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      marginTop: 40,
      paddingTop: 20,
      borderTop: "1px solid var(--color-line, #E2E7EE)",
      maxWidth: "var(--container-prose, 720px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "info",
    size: 18,
    color: "var(--color-gray, #5B646E)",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.55,
      color: "var(--color-gray, #5B646E)"
    }
  }, "Informaci\xF3n general, no reemplaza una evaluaci\xF3n m\xE9dica. Cada caso se define en consulta, con tus ex\xE1menes a la vista."));
}
Object.assign(__ds_scope, { ClinicalDisclaimer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/notices/ClinicalDisclaimer.jsx", error: String((e && e.message) || e) }); }

// components/notices/InfoNote.jsx
try { (() => {
/* Nota informativa neutra. Azul nube, sin ícono de alerta. */
function InfoNote({
  title,
  icon = "info",
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("aside", {
    style: {
      display: "flex",
      gap: 14,
      padding: 20,
      background: "var(--surface-alt, #EDF3FC)",
      borderRadius: "var(--radius-md, 8px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22,
    color: "var(--color-blue, #12489E)",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      maxWidth: "62ch"
    }
  }, title && /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      fontSize: "var(--text-body, 17px)",
      color: "var(--color-ink, #14181D)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body-sm, 15px)",
      lineHeight: 1.6,
      color: "var(--color-ink, #14181D)"
    }
  }, children)));
}
Object.assign(__ds_scope, { InfoNote });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/notices/InfoNote.jsx", error: String((e && e.message) || e) }); }

// components/notices/UrgencyNotice.jsx
try { (() => {
/* Aviso de urgencias. Presente sin gritar: el rojo aparece en el ícono, el título
   y una superficie al 6%. Nunca un banner rojo a sangre. */
function UrgencyNotice({
  tone = "surface",
  style
}) {
  const flat = tone === "flat";
  return /*#__PURE__*/React.createElement("aside", {
    role: "note",
    style: {
      display: "flex",
      gap: 14,
      padding: flat ? "16px 0" : 24,
      background: flat ? "transparent" : "rgba(180,71,47,.06)",
      borderTop: flat ? "1px solid var(--color-line, #E2E7EE)" : "none",
      borderRadius: flat ? 0 : "var(--radius-lg, 16px)",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "triangle-alert",
    size: 24,
    color: "var(--text-error, #B4472F)",
    style: {
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      maxWidth: "62ch"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans, sans-serif)",
      fontWeight: 600,
      fontSize: "var(--text-h4, 19px)",
      color: "var(--text-error, #B4472F)"
    }
  }, "Esta no es una unidad de urgencia"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-body, 17px)",
      lineHeight: 1.6,
      color: "var(--color-ink, #14181D)"
    }
  }, "Si tienes fiebre sobre 38\xB0C, sangrado que no se detiene o falta de aire, acude al servicio de urgencia m\xE1s cercano o llama al ", /*#__PURE__*/React.createElement("b", null, "131"), ". No esperes una hora con nosotros.")));
}
Object.assign(__ds_scope, { UrgencyNotice });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/notices/UrgencyNotice.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Button = __ds_scope.Button;

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.WhatsAppButton = __ds_scope.WhatsAppButton;

__ds_ns.LOGO_CROPS = __ds_scope.LOGO_CROPS;

__ds_ns.ConectaLogo = __ds_scope.ConectaLogo;

__ds_ns.ConectaThread = __ds_scope.ConectaThread;

__ds_ns.Accordion = __ds_scope.Accordion;

__ds_ns.PriceBlock = __ds_scope.PriceBlock;

__ds_ns.ProfessionalCard = __ds_scope.ProfessionalCard;

__ds_ns.Pullquote = __ds_scope.Pullquote;

__ds_ns.ResourceCard = __ds_scope.ResourceCard;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatusChip = __ds_scope.StatusChip;

__ds_ns.StepBlock = __ds_scope.StepBlock;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.MOTIVOS = __ds_scope.MOTIVOS;

__ds_ns.AppointmentForm = __ds_scope.AppointmentForm;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.CONTROL_CSS = __ds_scope.CONTROL_CSS;

__ds_ns.Breadcrumbs = __ds_scope.Breadcrumbs;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.ClinicalDisclaimer = __ds_scope.ClinicalDisclaimer;

__ds_ns.InfoNote = __ds_scope.InfoNote;

__ds_ns.UrgencyNotice = __ds_scope.UrgencyNotice;

})();
