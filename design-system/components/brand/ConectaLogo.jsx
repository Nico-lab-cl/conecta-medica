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
