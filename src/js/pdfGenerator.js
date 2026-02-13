/**
 * Gera um ID técnico único para o certificado
 * @returns {string}
 */
const generateTechnicalID = () => {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 999999);
  return `LDA-${year}-${rand}`;
};

/**
 * Sincroniza os dados do formulário com o certificado
 * @returns {void}
 */
const syncFields = () => {
  const empresa = document.getElementById("inEmpresa").value;
  const sistema = document.getElementById("inSistema").value;
  const capacidade = document.getElementById("inCapacidade").value;
  const data = document.getElementById("inData").value;

  document.getElementById("outEmpresa").textContent = empresa;
  document.getElementById("outSistema").textContent = sistema;
  document.getElementById("outCapacidade").textContent = capacidade;

  if (data) {
    document.getElementById("outData").textContent =
      data.split("-").reverse().join("/");
  }
};

/**
 * Gera o PDF do certificado
 * @returns {Promise<void>}
 */
const generatePDF = async () => {

  syncFields();

  const element = document.getElementById("laudo-tecnico");
  const oldDisplay = element.style.display;

  element.style.display = "block";

  const empresa = document.getElementById("inEmpresa").value;
  const capacidade = document.getElementById("inCapacidade").value;

  const filename =
    `Certificado ${empresa} - ${capacidade} - LDA CyberWatch.pdf`;

  await html2pdf()
    .set({
      margin: 0,
      filename: filename,
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "landscape"
      }
    })
    .from(element)
    .save();

  element.style.display = oldDisplay;
};

document.addEventListener("DOMContentLoaded", () => {

  const id = generateTechnicalID();

  document.getElementById("inID").value = id;
  document.getElementById("outID").textContent = id;

  document
    .getElementById("btnPDF")
    .addEventListener("click", generatePDF);
});
