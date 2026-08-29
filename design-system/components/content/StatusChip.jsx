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
