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
