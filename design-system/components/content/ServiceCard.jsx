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
