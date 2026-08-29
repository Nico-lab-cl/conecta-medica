/* Recurso de video. La portada es una imagen de YouTube; el iframe se carga solo al
   hacer clic, así la página no arrastra scripts de terceros. */
function ResourceCard({
  videoId,
  title,
  duration,
  kicker = "Video",
  style
}) {
  const [playing, setPlaying] = React.useState(false);
  const poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      background: "var(--surface-card, #fff)",
      border: "1px solid var(--color-line, #E2E7EE)",
      borderRadius: "var(--radius-lg, 16px)",
      boxShadow: "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))",
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "16 / 9",
      background: "var(--surface-alt, #EDF3FC)"
    }
  }, playing ? /*#__PURE__*/React.createElement("iframe", {
    title: title,
    src: `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`,
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture",
    allowFullScreen: true,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      border: 0
    }
  }) : /*#__PURE__*/React.createElement("button", {
    className: "conecta-play",
    onClick: () => setPlaying(true),
    "aria-label": `Reproducir: ${title}`,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      padding: 0,
      border: 0,
      cursor: "pointer",
      background: `center/cover no-repeat url(${poster})`,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      height: 48,
      padding: "0 20px",
      borderRadius: 999,
      background: "var(--color-white, #fff)",
      color: "var(--color-blue, #12489E)",
      fontFamily: "var(--font-sans, sans-serif)",
      fontSize: 15,
      fontWeight: 600,
      boxShadow: "var(--shadow-1, 0 1px 2px rgba(20,24,29,.06))"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "play",
    size: 18,
    color: "var(--color-blue, #12489E)"
  }), "Reproducir")), /*#__PURE__*/React.createElement("style", null, `.conecta-play:focus-visible{outline:2px solid var(--color-blue,#12489E);outline-offset:-4px}`)), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 20,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      fontFamily: "var(--font-mono, monospace)",
      fontSize: 14,
      letterSpacing: ".08em",
      textTransform: "uppercase",
      color: "var(--color-gray, #5B646E)"
    }
  }, /*#__PURE__*/React.createElement("span", null, kicker), duration && /*#__PURE__*/React.createElement("span", null, duration)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-sans, sans-serif)",
      fontWeight: 600,
      fontSize: "var(--text-h4, 19px)",
      lineHeight: 1.4,
      color: "var(--color-ink, #14181D)"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--text-caption, 14px)",
      color: "var(--color-gray, #5B646E)"
    }
  }, "El video se carga desde YouTube solo al reproducirlo.")));
}
Object.assign(__ds_scope, { ResourceCard });
