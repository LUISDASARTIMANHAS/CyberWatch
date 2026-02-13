const API_BASE = "https://pingobras-sg.onrender.com/api/crt";
const API_KEY = "CyberWatch2026";

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
 * Obtém dados do formulário formatados
 * @returns {Object}
 */
const getCertData = () => {
  const dataInput = document.getElementById("inData").value;

  return {
    id: document.getElementById("inID").value,
    empresa: document.getElementById("inEmpresa").value.trim(),
    sistema: document.getElementById("inSistema").value.trim(),
    capacidade: document.getElementById("inCapacidade").value.trim(),
    data: dataInput
      ? dataInput.split("-").reverse().join("/")
      : ""
  };
};

/**
 * Registra certificado na API
 * @param {Object} certData
 * @returns {Promise<boolean>}
 */
const registerCertificate = async (certData) => {
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: API_KEY
      },
      body: JSON.stringify(certData)
    });

    return res.ok;
  } catch {
    return false;
  }
};

/**
 * Gera o PDF do certificado
 * @returns {Promise<void>}
 */
const generatePDF = async () => {
  syncFields();

  const certData = getCertData();

  // registra primeiro no servidor
  const registered = await registerCertificate(certData);

  if (!registered) {
    alert("Erro ao registrar certificado no servidor.");
    return;
  }

  const element = document.getElementById("laudo-tecnico");
  const oldDisplay = element.style.display;

  element.style.display = "block";

  const filename =
    `Certificado ${certData.empresa} - ${certData.capacidade} - LDA CyberWatch.pdf`;

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
