/**
 * Banco de dados local simulando métricas mensais
 * Pode ser substituído futuramente por:
 * - localStorage
 * - IndexedDB
 * - API REST
 * - arquivo JSON
 */
const localDatabase = {
  Jan: {
    name: "Janeiro",
    qtde: 2,
    criticas: 1,
    medias: 4,
    baixas: 8,
  },

  Feb: {
    name: "Fevereiro",
    qtde: 5,
    criticas: 2,
    medias: 6,
    baixas: 10,
  },

  Mar: {
    name: "Março",
    qtde: 3,
    criticas: 0,
    medias: 5,
    baixas: 7,
  },

  Apr: {
    name: "Abril",
    qtde: 8,
    criticas: 4,
    medias: 12,
    baixas: 16,
  },

  May: {
    name: "Maio",
    qtde: 4,
    criticas: 1,
    medias: 7,
    baixas: 9,
  },

  Jun: {
    name: "Junho",
    qtde: 7,
    criticas: 3,
    medias: 9,
    baixas: 14,
  },

  Jul: {
    name: "Julho",
    qtde: 9,
    criticas: 5,
    medias: 13,
    baixas: 20,
  },

  Ago: {
    name: "Agosto",
    qtde: 6,
    criticas: 2,
    medias: 8,
    baixas: 12,
  },

  Set: {
    name: "Setembro",
    qtde: 11,
    criticas: 6,
    medias: 15,
    baixas: 21,
  },

  Out: {
    name: "Outubro",
    qtde: 10,
    criticas: 4,
    medias: 14,
    baixas: 18,
  },

  Nov: {
    name: "Novembro",
    qtde: 14,
    criticas: 8,
    medias: 18,
    baixas: 25,
  },

  Dez: {
    name: "Dezembro",
    qtde: 12,
    criticas: 5,
    medias: 16,
    baixas: 22,
  },
};

/**
 * Converte banco local para arrays compatíveis com Chart.js
 *
 * @param {Object} database
 * @returns {{
 * labels: string[],
 * qtde: number[],
 * criticas: number[],
 * medias: number[],
 * baixas: number[]
 * }}
 */
function parseDatabase(database) {
  const labels = [];
  const qtde = [];
  const criticas = [];
  const medias = [];
  const baixas = [];

  for (const key in database) {
    const item = database[key];

    labels.push(item.name);
    qtde.push(item.qtde || 0);
    criticas.push(item.criticas || 0);
    medias.push(item.medias || 0);
    baixas.push(item.baixas || 0);
  }

  return {
    labels,
    qtde,
    criticas,
    medias,
    baixas,
  };
}

/**
 * Carrega gráfico principal do dashboard
 *
 * @param {HTMLCanvasElement} canvas
 * @param {Object} database
 * @returns {Chart}
 */
function loadDashboardChart(canvas, database) {
  const parsedData = parseDatabase(database);

  return new Chart(canvas, {
    type: "line",

    data: {
      labels: parsedData.labels,

      datasets: [
        {
          label: "Vulnerabilidades Detectadas",
          data: parsedData.qtde,
          borderColor: "#00eaff",
          backgroundColor: "rgba(0,234,255,0.15)",
          borderWidth: 3,
          tension: 0.3,
          fill: true,
        },

        {
          label: "Críticas",
          data: parsedData.criticas,
          borderColor: "#ff3b3b",
          backgroundColor: "rgba(255,59,59,0.15)",
          borderWidth: 2,
          tension: 0.3,
        },

        {
          label: "Médias",
          data: parsedData.medias,
          borderColor: "#ffc107",
          backgroundColor: "rgba(255,193,7,0.15)",
          borderWidth: 2,
          tension: 0.3,
        },

        {
          label: "Baixas",
          data: parsedData.baixas,
          borderColor: "#28a745",
          backgroundColor: "rgba(40,167,69,0.15)",
          borderWidth: 2,
          tension: 0.3,
        },
      ],
    },

    options: {
      responsive: true,

      plugins: {
        legend: {
          labels: {
            color: "#a8f3ff",
          },
        },
      },

      scales: {
        x: {
          ticks: {
            color: "#a8f3ff",
          },

          grid: {
            color: "rgba(255,255,255,0.05)",
          },
        },

        y: {
          beginAtZero: true,

          ticks: {
            color: "#a8f3ff",
          },

          grid: {
            color: "rgba(255,255,255,0.05)",
          },
        },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("graficoVulns");

  if (!canvas) return;

  loadDashboardChart(canvas, localDatabase);
});