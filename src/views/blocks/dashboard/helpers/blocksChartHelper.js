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
        label: function(tooltipItem) {
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
  getChartData(blocks) {
    const txs = _getTxs(blocks);
    const all = blocks.length;
    return {
      labels: [`${txs} Txs`, `${all} Blocks`],
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
  getChartLabel(blocks) {
    const txs = _getTxs(blocks);
    const all = blocks.length;
    return `Txs/blocks: ${txs}/${all}`;
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
  blocks.reduce(
    (acc, block) =>
      block.data && block.data.txs ? acc + block.data.txs.length : acc + 0,
    0,
  );
