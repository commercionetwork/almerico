import { numberIntlFormatter } from '@/utils';

const BACKGROUND_COLOR = ['rgb(66, 165, 245)', 'rgb(25, 118, 210)'];
const BORDER_COLOR = ['rgb(231, 243, 254)', 'rgb(232, 242, 252)'];
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
