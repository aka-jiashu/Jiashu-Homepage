document$.subscribe(() => {
  if (!window.mermaid) return;

  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    securityLevel: "loose"
  });

  const nodes = document.querySelectorAll(".mermaid");
  if (nodes.length > 0) {
    mermaid.run({ nodes });
  }
});
