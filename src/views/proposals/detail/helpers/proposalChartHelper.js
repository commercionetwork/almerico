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
  getChartData({ data, labels }) {
    return data
      ? {
          labels: [
            `${labels.yes}`,
            `${labels.abstain}`,
            `${labels.no}`,
            `${labels.noWithVeto}`,
          ],
          datasets: [
            {
              data: [data.yes, data.abstain, data.no, data.no_with_veto],
              backgroundColor: BACKGROUND_COLOR,
              borderColor: BORDER_COLOR,
            },
          ],
        }
      : null;
  },
  getChartOptions({ title, darkTheme }) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: title,
          align: 'start',
          font: {
            size: 24,
          },
          color: darkTheme ? 'rgba(255, 255, 255, 1)' : 'rgba(25, 25, 25, 1)',
        },
        legend: {
          display: true,
          position: 'right',
          labels: {
            color: darkTheme ? 'rgba(255, 255, 255, 1)' : 'rgba(25, 25, 25, 1)',
          },
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
