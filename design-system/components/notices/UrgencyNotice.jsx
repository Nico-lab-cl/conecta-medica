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
