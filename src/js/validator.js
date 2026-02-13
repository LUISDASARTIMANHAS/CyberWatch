/**
 * Base de dados simulada (modo front-end)
 * Pode ser substituída por API futuramente
 */
const certificados = [
  {
    id: "LDA-2026-443908",
    empresa: "Skyzer mc",
    sistema: "mc server",
    capacidade: "1 Gb/s",
    data: "09/02/2026"
  }
];

/**
 * Procura certificado pelo ID
 * @param {string} id
 * @returns {object|null}
 */
const findCertificado = (id) => {
  return certificados.find(c => c.id === id) || null;
};

/**
 * Exibe resultado validado
 * @param {object} cert
 * @returns {void}
 */
const showResultado = (cert) => {
  document.getElementById("outEmpresa").textContent = cert.empresa;
  document.getElementById("outSistema").textContent = cert.sistema;
  document.getElementById("outCapacidade").textContent = cert.capacidade;
  document.getElementById("outData").textContent = cert.data;
  document.getElementById("outID").textContent = cert.id;

  document.getElementById("resultado").classList.remove("d-none");
  document.getElementById("naoEncontrado").classList.add("d-none");
};

/**
 * Exibe erro de validação
 * @returns {void}
 */
const showNotFound = () => {
  document.getElementById("resultado").classList.add("d-none");
  document.getElementById("naoEncontrado").classList.remove("d-none");
};

/**
 * Evento principal
 */
document.getElementById("btnValidar").addEventListener("click", () => {
  const id = document.getElementById("inID").value.trim();
  const cert = findCertificado(id);

  if (cert) showResultado(cert);
  else showNotFound();
});
