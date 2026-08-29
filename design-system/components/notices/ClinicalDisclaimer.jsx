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
