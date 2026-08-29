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
