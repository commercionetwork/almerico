export default {
  /**
   *
   * @param {Function} dispatch
   * @param {String} action
   * @param {String} height
   * @param {String} minimun
   * @param {Number} items
   * @returns {Array}
   */
  setupRequests({ dispatch, action, height, minimum, items }) {
    let max = parseInt(height);
    const min = parseInt(minimum);
    const minimuHeight = this.getMinimumHeight({ max, min, items });
    const requests = [];
    while (minimuHeight < max) {
      requests.push(dispatch(action, max--));
    }
    return requests;
  },
  /**
   *
   * @param {String} max
   * @param {String} min
   * @param {Number} items
   * @returns {Number}
   */
  getMinimumHeight({ max, min, items }) {
    return max - items < min ? min - 1 : max - items;
  },
};
