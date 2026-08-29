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
