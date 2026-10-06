import { createElement } from "../components/base/dom-utils.js";
import { apiRequest } from "./api-client.js";
const API_KEY = "CyberWatch2026";

/**
 * Exibe mensagem para o usuário na tela
 *
 * @param {"success"|"danger"|"warning"|"info"} type
 * @param {string} message
 * @returns {void}
 */
const showMessage = (type, message) => {
  const box = document.getElementById("msgBox");

  if (!box) {
    alert(message);
    return;
  }

  const alert = createElement("div", `alert alert-${type} alert-dismissible fade show`, null, { role: "alert" });
  const closeButton = createElement("button", "btn-close", null, { type: "button", "aria-label": "Fechar mensagem" });
  closeButton.addEventListener("click", () => alert.remove());
  alert.append(createElement("span", "", String(message)), closeButton);
  box.replaceChildren(alert);
};

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
    document.getElementById("outData").textContent = data
      .split("-")
      .reverse()
      .join("/");
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
    data: dataInput ? dataInput.split("-").reverse().join("/") : "",
  };
};

/**
 * Registra certificado na API
 *
 * @param {Object} certData
 * @returns {Promise<{success:boolean,message:string}>}
 */
/**
 * Registra certificado na API
 *
 * @param {Object} certData
 * @returns {Promise<{success:boolean,message:string}>}
 */
const registerCertificate = async (certData) => {
  try {
    const response = await apiRequest("crt/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: API_KEY,
    },
    body: JSON.stringify(certData),
    });

    const payload = response.data;
    const message = payload && typeof payload === "object"
      ? payload.message || payload.error || ""
      : String(payload || "");

    return {
      success: response.ok,
      message: message || (response.ok ? "Certificado registrado com sucesso." : "Erro ao registrar certificado."),
    };
  } catch {
    return { success: false, message: "Falha de conexão com o servidor." };
  }
};

/**
 * Gera o PDF do certificado
 * @returns {void}
 */
const generatePDF = () => {
  syncFields();

  const certData = getCertData();

  if (!certData.empresa || !certData.sistema || !certData.capacidade) {
    showMessage(
      "warning",
      "Preencha todos os campos antes de gerar o certificado.",
    );
    return;
  }

  showMessage("info", "Registrando certificado no servidor...");

  registerCertificate(certData).then((result) => {
    if (!result.success) {
      showMessage("danger", result.message);
      return;
    }

    showMessage("success", result.message);

    const element = document.getElementById("laudo-tecnico");
    const oldDisplay = element.style.display;

    element.style.display = "block";

    const filename = `Certificado ${certData.empresa} - ${certData.capacidade} - LDA CyberWatch.pdf`;

    return html2pdf()
      .set({
        margin: 0,
        filename: filename,
        image: { type: "jpeg", quality: 1 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "landscape",
        },
      })
      .from(element)
      .save()
      .then(() => {
        element.style.display = oldDisplay;
      });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const id = generateTechnicalID();

  document.getElementById("inID").value = id;
  document.getElementById("outID").textContent = id;

  document.getElementById("btnPDF").addEventListener("click", generatePDF);
  document.getElementById("btnImprimir").addEventListener("click", () => window.print());
});
