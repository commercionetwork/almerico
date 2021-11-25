const BACKGROUND_COLOR = ['rgba(255, 160, 0, 1)', 'rgba(255, 202, 40, 1)'];
const BORDER_COLOR = ['rgba(255, 199, 102, 1)', 'rgba(255, 223, 128, 1)'];
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

const blocksChartHelper = {
  /**
   *
   * @param {Array.<Object>} blocks
   * @returns {Object}
   */
  getChartData(blocks, labels) {
    const txs = _getTxs(blocks);
    const all = blocks.length;
    return {
      labels: [`${txs} ${labels.txs}`, `${all} ${labels.blocks}`],
      datasets: [
        {
          data: [txs, all],
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
        },
      ],
    };
  },
  /**
   *
   * @param {Array.<Object>} blocks
   * @returns {String}
   */
  getChartLabel(blocks, title) {
    const txs = _getTxs(blocks);
    const all = blocks.length;
    return `${title} ${txs}/${all}`;
  },
  /**
   *
   * @returns {Object}
   */
  getChartOptions() {
    return CHART_OPTIONS;
  },
};

export default blocksChartHelper;

const _getTxs = (blocks) =>
  blocks.reduce((acc, block) => acc + block.block.data.txs.length, 0);
