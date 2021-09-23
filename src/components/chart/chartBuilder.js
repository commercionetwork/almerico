import Chart from 'chart.js/auto';

const chartBuilder = {
  /**
   * @typedef {Object} BuildParams
   * @property {HTMLElement} el
   * @property {String} type
   * @property {Object} data
   * @property {Object} options
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
};

export default chartBuilder;
