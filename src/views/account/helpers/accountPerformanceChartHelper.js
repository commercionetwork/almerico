const BACKGROUND_COLOR = ['rgba(47, 157, 119, 1)', 'rgba(211, 47, 47, 1)'];
const BORDER_COLOR = ['rgba(98, 208, 170, 1)', 'rgba(228, 129, 129, 1)'];
const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          const index = tooltipItem.dataIndex;
          return `${tooltipItem.label} ${tooltipItem.dataset.data[index]}%`;
        },
      },
    },
  },
};

const accountPerformanceChartHelper = {
  /**
   *
   * @param {Object} assets
   * @returns {Object}
   */
  getChartData(assets, labels) {
    const earning = _formatPercent(assets.earning, assets.total);
    const notEarning = _formatPercent(assets.notEarning, assets.total);
    return {
      labels: [labels.earning, labels.notEarning],
      datasets: [
        {
          data: [earning, notEarning],
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
  /**
   *
   * @returns {String}
   */
  getChartLabel(label) {
    return label;
  },
  /**
   *
   * @returns {Object}
   */
  getChartOptions() {
    return CHART_OPTIONS;
  },
};

export default accountPerformanceChartHelper;

const _formatPercent = (amount, total) => ((amount / total) * 100).toFixed(2);
