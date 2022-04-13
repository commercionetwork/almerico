import Chart from 'chart.js/auto';

const chartBuilder = {
  /**
   *
   * @typedef {Object} BuildParams
   * @property {HTMLElement} el
   * @property {String} type
   * @property {ChartData} data
   * @property {Object} options
   *
   * @typedef {Object} ChartData
   * @property {Array.String} labels
   * @property {Array.<Object>} datasets
   *
   * @param {BuildParams} p
   * @returns {Chart}
   */
  build({ el, type, data, options }) {
    return new Chart(el, {
      type,
      data,
      options,
    });
  },
  /**
   *
   * @param {Chart} chart
   * @param {ChartData} data
   * @param {Object} options
   * @returns {void}
   */
  update(chart, { data, options }) {
    chart.data = data;
    chart.options = options;
    chart.update();
  },
  /**
   *
   * @param {Chart} chart
   * @returns {void}
   */
  destroy(chart) {
    chart.destroy();
  },
};

export default chartBuilder;
