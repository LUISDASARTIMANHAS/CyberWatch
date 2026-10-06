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
 * Sincroniza os campos complementares com o relatório local.
 * @returns {void}
 */
const syncReportDetails = () => {
  const fieldMap = [
    ["inTipo", "outTipo"],
    ["inEscopo", "outEscopo"],
    ["inPeriodo", "outPeriodo"],
    ["inResponsavel", "outResponsavel"],
    ["inReferencia", "outReferencia"],
    ["inMetodologia", "outMetodologia"],
    ["inConclusao", "outConclusao"],
    ["inAchados", "outAchados"],
    ["inRecomendacoes", "outRecomendacoes"],
    ["inLimitacoes", "outLimitacoes"],
  ];

  fieldMap.forEach(([inputID, outputID]) => {
    const value = document.getElementById(inputID).value.trim();
    document.getElementById(outputID).textContent = value || "Não informado";
  });

  document.getElementById("outAssinatura").textContent =
    document.getElementById("inResponsavel").value.trim();
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
  syncReportDetails();

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
const registerAndPrintReport = async () => {
  const form = document.getElementById("formCertificado");
  if (!form.reportValidity()) return;

  syncFields();
  const certData = getCertData();
  const button = document.getElementById("btnPDF");
  button.disabled = true;

  showMessage("info", "Registrando os dados principais do relatório...");

  try {
    const result = await registerCertificate(certData);

    if (!result.success) {
      showMessage("danger", result.message);
      return;
    }

    showMessage("success", `${result.message} Selecione “Salvar como PDF” na janela de impressão.`);
    window.print();
  } finally {
    button.disabled = false;
  }
};

/**
 * Valida e prepara o relatório para impressão local.
 * @returns {void}
 */
const printReport = () => {
  const form = document.getElementById("formCertificado");
  if (!form.reportValidity()) return;

  syncFields();
  window.print();
};

document.addEventListener("DOMContentLoaded", () => {
  const id = generateTechnicalID();

  document.getElementById("inID").value = id;
  document.getElementById("outID").textContent = id;
  document.getElementById("inData").value = new Date().toISOString().slice(0, 10);

  document.getElementById("btnPDF").addEventListener("click", registerAndPrintReport);
  document.getElementById("btnImprimir").addEventListener("click", printReport);
});
