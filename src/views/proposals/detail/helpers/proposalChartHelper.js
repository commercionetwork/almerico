const BACKGROUND_COLOR = [
  'rgba(104, 159, 56,1)',
  'rgba(0, 151, 167,1)',
  'rgba(255, 160, 0,1)',
  'rgba(194, 24, 91,1)',
];
const BORDER_COLOR = [
  'rgba(174, 213, 129,1)',
  'rgba(77, 208, 225,1)',
  'rgba(255, 213, 79,1)',
  'rgba(240, 98, 146,1)',
];

const proposalChartHelper = {
  getChartData(votes) {
    if (!votes) return null;
    const values = Object.values(votes);
    const labels = values.map((value) => `${value.label}: ${value.percentage}`);
    const data = values.map((value) => parseFloat(value.amount));
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
  getChartOptions() {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: false,
        },
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.label;
            },
          },
        },
      },
    };
  },
};

export default proposalChartHelper;
