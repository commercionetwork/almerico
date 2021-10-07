import { numberIntlFormatter } from '@/utils';

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
        label: function(tooltipItem) {
          return tooltipItem.label;
        },
      },
    },
  },
};

const validatorDetailsChartHelper = {
  /**
   *
   * @param {Array.<Object>} delegations
   * @returns {Object}
   */
  getChartData(delegations) {
    const others = _formatTokens(delegations.others);
    const self = _formatTokens(delegations.self);
    return {
      labels: [`Others ${others} M`, `Self ${self} M`],
      datasets: [
        {
          data: [others, self],
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
  getChartLabel(delegations) {
    return `Delegated ${_formatTokens(delegations.total)} M`;
  },
  /**
   *
   * @returns {Object}
   */
  getChartOptions() {
    return CHART_OPTIONS;
  },
};

export default validatorDetailsChartHelper;

const _formatTokens = (value) =>
  numberIntlFormatter.toDecimal({
    amount: value / 1000000,
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
