/**
 * Cria partículas leves seguindo o mouse
 */
document.addEventListener("mousemove", (e) => {
  const particle = document.createElement("div");
  particle.classList.add("particle");

  document.body.appendChild(particle);

  particle.style.left = `${e.clientX}px`;
  particle.style.top = `${e.clientY}px`;

  setTimeout(() => particle.remove(), 1000);
});
