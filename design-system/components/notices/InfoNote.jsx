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
