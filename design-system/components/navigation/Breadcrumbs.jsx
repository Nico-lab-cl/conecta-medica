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
