const API_BASE = "https://pingobras-sg.onrender.com/api/crt";
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

  box.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
  `;
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
const registerCertificate = (certData) => {
  return fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: API_KEY,
    },
    body: JSON.stringify(certData),
  })
    .then((res) => {
      return res.text().then((text) => ({
        ok: res.ok,
        text,
      }));
    })
    .then(({ ok, text }) => {
      let message = "Erro desconhecido";

      try {
        const json = JSON.parse(text);

        // 🔥 Aqui está a correção
        message = json.message || json.error || message;
      } catch {
        message = text || message;
      }

      if (!ok) {
        return {
          success: false,
          message,
        };
      }

      return {
        success: true,
        message: message || "Certificado registrado com sucesso.",
      };
    })
    .catch(() => {
      return {
        success: false,
        message: "Falha de conexão com o servidor.",
      };
    });
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
});
