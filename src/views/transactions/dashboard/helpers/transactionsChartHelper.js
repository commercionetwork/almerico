const BACKGROUND_COLOR = ['rgb(123, 31, 162)', 'rgb(171, 71, 188)'];
const BORDER_COLOR = ['rgb(246, 234, 251)', 'rgb(246, 236, 248)'];
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

const transactionsChartHelper = {
  /**
   *
   * @param {Array.<Object>} transactions
   * @returns {Object}
   */
  getChartData(transactions) {
    const msgs = _getMsgs(transactions);
    const all = transactions.length;
    return {
      labels: [`${all} Txs`, `${msgs} Msgs`],
      datasets: [
        {
          data: [all, msgs],
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
  /**
   *
   * @param {Array.<Object>} transactions
   * @returns {String}
   */
  getChartLabel(transactions) {
    const msgs = _getMsgs(transactions);
    const all = transactions.length;
    return `Msgs/txs: ${msgs}/${all}`;
  },
  /**
   *
   * @returns {Object}
   */
  getChartOptions() {
    return CHART_OPTIONS;
  },
};

export default transactionsChartHelper;

const _getMsgs = (transactions) =>
  transactions.reduce((acc, item) => acc + item.tx.value.msg.length, 0);
