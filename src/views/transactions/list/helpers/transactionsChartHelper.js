const BACKGROUND_COLOR = ['rgba(123, 31, 162, 1)', 'rgba(171, 71, 188, 1)'];
const BORDER_COLOR = ['rgba(171, 62, 218, 1)', 'rgba(204, 143, 214, 1)'];
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

const transactionsChartHelper = {
  /**
   *
   * @param {Array.<Object>} transactions
   * @returns {Object}
   */
  getChartData(transactions, labels) {
    const msgs = _getMsgs(transactions);
    const txs = transactions.length;
    return {
      labels: [`${txs} ${labels.txs}`, `${msgs} ${labels.msgs}`],
      datasets: [
        {
          data: [txs, msgs],
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
  getChartLabel(transactions, title) {
    const msgs = _getMsgs(transactions);
    const all = transactions.length;
    return `${title} ${msgs}/${all}`;
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
  transactions.reduce((acc, item) => acc + item.msgs_number, 0);
