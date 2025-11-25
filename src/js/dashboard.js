/**
 * @param {HTMLCanvasElement} canvas - Elemento canvas do gráfico
 * @return {Chart} Instância do Chart.js configurada
 */
function loadDashboardChart(canvas) {
  return new Chart(canvas, {
    type: "line",
    data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Vulnerabilidades detectadas",
          data: [2, 5, 3, 8, 4, 7],
          borderColor: "#00eaff",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: { ticks: { color: "#a8f3ff" } },
        y: { ticks: { color: "#a8f3ff" } },
      },
    },
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("graficoVulns");
  if (canvas) loadDashboardChart(canvas);
});
