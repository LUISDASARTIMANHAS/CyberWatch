import { createElement } from "../components/base/dom-utils.js";

export const CERTIFICATE_FIELDS = [
  { key: "id", label: "ID do relatório", inputId: "inID", outputId: "outID" },
  { key: "empresa", label: "Organização", inputId: "inEmpresa", outputId: "outEmpresa" },
  { key: "sistema", label: "Sistema ou serviço", inputId: "inSistema", outputId: "outSistema" },
  { key: "tipoAvaliacao", label: "Tipo de avaliação", inputId: "inTipo", outputId: "outTipo" },
  { key: "escopo", label: "Escopo autorizado", inputId: "inEscopo", outputId: "outEscopo" },
  { key: "capacidade", label: "Capacidade de referência", inputId: "inCapacidade", outputId: "outCapacidade" },
  { key: "data", label: "Data da avaliação", inputId: "inData", outputId: "outData" },
  { key: "periodo", label: "Período observado", inputId: "inPeriodo", outputId: "outPeriodo" },
  { key: "responsavel", label: "Responsável técnico", inputId: "inResponsavel", outputId: "outResponsavel" },
  { key: "referencia", label: "Referência da evidência", inputId: "inReferencia", outputId: "outReferencia" },
  { key: "metodologia", label: "Metodologia e ferramentas", inputId: "inMetodologia", outputId: "outMetodologia" },
  { key: "conclusao", label: "Conclusão", inputId: "inConclusao", outputId: "outConclusao" },
  { key: "achados", label: "Resumo dos achados", inputId: "inAchados", outputId: "outAchados" },
  { key: "recomendacoes", label: "Recomendações", inputId: "inRecomendacoes", outputId: "outRecomendacoes" },
  { key: "limitacoes", label: "Limitações e observações", inputId: "inLimitacoes", outputId: "outLimitacoes" },
];

/**
 * Lê todos os campos do formulário no contrato compartilhado.
 * @returns {Record<string, string>}
 */
export function readCertificateForm() {
  return Object.fromEntries(CERTIFICATE_FIELDS.map(({ key, inputId }) => {
    const input = document.getElementById(inputId);
    let value = input.value.trim();

    if (key === "data" && value) {
      const [year, month, day] = value.split("-");
      value = `${day}/${month}/${year}`;
    }

    return [key, value];
  }));
}

/**
 * Monta a relação completa de dados do certificado usando texto seguro.
 * @param {Record<string, unknown>} certificate
 * @param {string} className
 * @returns {HTMLDListElement}
 */
export function createCertificateDetails(certificate, className = "") {
  const entries = CERTIFICATE_FIELDS.map(({ key, label }) => {
    const rawValue = certificate?.[key];
    const value = rawValue === null || rawValue === undefined || rawValue === ""
      ? "Não informado"
      : String(rawValue);

    return createElement("div", "certificate-detail-item", null, {}, [
      createElement("dt", "", label),
      createElement("dd", "", value),
    ]);
  });

  return createElement("dl", `certificate-detail-grid ${className}`.trim(), null, {}, entries);
}