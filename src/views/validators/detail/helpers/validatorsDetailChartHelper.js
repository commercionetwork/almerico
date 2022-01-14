const BACKGROUND_COLOR = ['rgba(66, 165, 245, 1)', 'rgba(25, 118, 210, 1)'];
const BORDER_COLOR = ['rgba(158, 209, 250, 1)', 'rgba(95, 166, 236, 1)'];
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
          return tooltipItem.label;
        },
      },
    },
  },
};

const validatorsDetailChartHelper = {
  /**
   *
   * @param {Array.<Object>} delegations
   * @returns {Object}
   */
  getChartData(delegations, labels) {
    const others = _formatTokens(delegations.others);
    const self = _formatTokens(delegations.self);
    return {
      labels: [`${labels.others} ${others} M`, `${labels.self} ${self} M`],
      datasets: [
        {
          data: [parseFloat(others), parseFloat(self)],
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
  /**
   *
   * @param {Array.<Object>} delegations
   * @returns {String}
   */
  getChartLabel(delegations, label) {
    return `${label} ${_formatTokens(delegations.total)} M`;
  },
  /**
   *
   * @returns {Object}
   */
  getChartOptions() {
    return CHART_OPTIONS;
  },
};

export default validatorsDetailChartHelper;

const _formatTokens = (amount) =>
  new Intl.NumberFormat(undefined, {
    style: 'decimal',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  }).format(amount / 1000000);
