// Partículas leves no fundo (efeito futurista)
document.addEventListener("mousemove", (e) => {
  const particle = document.createElement("div");
  particle.className = "particle";
  document.body.appendChild(particle);

  particle.style.left = e.clientX + "px";
  particle.style.top = e.clientY + "px";

  setTimeout(() => particle.remove(), 1200);
});
