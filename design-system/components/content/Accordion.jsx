function Accordion({
  items = [],
  single = true,
  defaultOpen = 0,
  style
}) {
  const [open, setOpen] = React.useState(single ? defaultOpen : [defaultOpen]);
  const isOpen = i => single ? open === i : open.includes(i);
  const toggle = i => single ? setOpen(open === i ? -1 : i) : setOpen(isOpen(i) ? open.filter(x => x !== i) : [...open, i]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--color-line, #E2E7EE)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("style", null, `.conecta-acc-btn{display:flex;width:100%;gap:16px;align-items:flex-start;justify-content:space-between;min-height:44px;padding:20px 0;background:none;border:0;cursor:pointer;text-align:left;font-family:var(--font-sans,sans-serif);font-size:var(--text-h4,19px);font-weight:600;color:var(--color-ink,#14181D);transition:color var(--dur-fast,150ms) var(--ease-out,ease)}
.conecta-acc-btn:hover{color:var(--color-blue,#12489E)}
.conecta-acc-btn:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:2px;border-radius:var(--radius-sm,4px)}`), items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: it.q,
    style: {
      borderBottom: "1px solid var(--color-line, #E2E7EE)"
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "conecta-acc-btn",
    "aria-expanded": isOpen(i),
    onClick: () => toggle(i)
  }, /*#__PURE__*/React.createElement("span", null, it.q), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: isOpen(i) ? "minus" : "plus",
    size: 22,
    color: "var(--color-blue, #12489E)",
    style: {
      marginTop: 2
    }
  }))), isOpen(i) && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 0 24px",
      maxWidth: "66ch",
      fontSize: "var(--text-body, 17px)",
      lineHeight: 1.6,
      color: "var(--color-ink, #14181D)"
    }
  }, it.a))));
}
Object.assign(__ds_scope, { Accordion });
