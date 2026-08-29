/* Hilo Conecta — línea continua fina que encadena puntos de una secuencia o de un
   conjunto relacionado. Nace del trazo del estetoscopio del logo. */
function ConectaThread({
  orientation = "horizontal",
  nodes = 4,
  active = -1,
  animate = true,
  thickness = 2,
  nodeRadius = 5,
  className,
  style
}) {
  const n = Math.max(2, nodes);
  const horizontal = orientation === "horizontal";
  const r = nodeRadius + thickness;
  const inset = `${r}px`;
  const trackAxis = horizontal ? "width" : "height";
  const fraction = active < 0 ? 1 : Math.min(1, Math.max(0, active / (n - 1)));
  const track = {
    position: "absolute",
    background: "var(--thread-stroke-muted, #B9CCE8)",
    borderRadius: 999,
    ...(horizontal ? {
      left: inset,
      right: inset,
      top: "50%",
      height: thickness,
      transform: "translateY(-50%)"
    } : {
      top: inset,
      bottom: inset,
      left: "50%",
      width: thickness,
      transform: "translateX(-50%)"
    })
  };
  const fill = {
    position: "absolute",
    background: "var(--thread-stroke, #12489E)",
    borderRadius: 999,
    transformOrigin: horizontal ? "left center" : "center top",
    animation: animate ? `conecta-thread-draw-${horizontal ? "x" : "y"} var(--dur-thread, 1400ms) var(--ease-thread, cubic-bezier(.65,0,.35,1)) both` : undefined,
    ...(horizontal ? {
      left: inset,
      top: "50%",
      height: thickness,
      [trackAxis]: `calc((100% - ${r * 2}px) * ${fraction})`,
      transform: "translateY(-50%)"
    } : {
      top: inset,
      left: "50%",
      width: thickness,
      [trackAxis]: `calc((100% - ${r * 2}px) * ${fraction})`,
      transform: "translateX(-50%)"
    })
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: "relative",
      ...(horizontal ? {
        width: "100%",
        height: r * 2
      } : {
        height: "100%",
        width: r * 2
      }),
      ...style
    },
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes conecta-thread-draw-x{from{transform:translateY(-50%) scaleX(0)}to{transform:translateY(-50%) scaleX(1)}}" + "@keyframes conecta-thread-draw-y{from{transform:translateX(-50%) scaleY(0)}to{transform:translateX(-50%) scaleY(1)}}" + "@media (prefers-reduced-motion:reduce){.conecta-thread-fill{animation:none!important}}"), /*#__PURE__*/React.createElement("div", {
    style: track
  }), /*#__PURE__*/React.createElement("div", {
    className: "conecta-thread-fill",
    style: fill
  }), Array.from({
    length: n
  }, (_, i) => {
    const on = active < 0 || i <= active;
    const at = `calc(${inset} + (100% - ${r * 2}px) * ${i / (n - 1)})`;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "absolute",
        width: nodeRadius * 2,
        height: nodeRadius * 2,
        borderRadius: 999,
        boxSizing: "content-box",
        background: "var(--color-white, #fff)",
        border: `${thickness}px solid ${on ? "var(--thread-stroke, #12489E)" : "var(--thread-stroke-muted, #B9CCE8)"}`,
        ...(horizontal ? {
          left: at,
          top: "50%",
          transform: "translate(-50%,-50%)"
        } : {
          top: at,
          left: "50%",
          transform: "translate(-50%,-50%)"
        })
      }
    });
  }));
}
Object.assign(__ds_scope, { ConectaThread });
