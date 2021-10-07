const BACKGROUND_COLOR = ['rgb(47, 157, 119)', 'rgb(211, 47, 47)'];
const BORDER_COLOR = ['rgb(235, 249, 244)', 'rgb(251, 234, 234)'];
const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
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
  getChartData(assets) {
    const earningRewards = _formatPercent(assets.earning, assets.total);
    const notEarningRewards = _formatPercent(assets.notEarning, assets.total);
    return {
      labels: [`Earning Rewards`, `Not Earning Rewards`],
      datasets: [
        {
          data: [earningRewards, notEarningRewards],
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
  getChartLabel() {
    return 'tokens performance';
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
