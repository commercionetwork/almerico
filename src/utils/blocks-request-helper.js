const blocksRequestHelper = {
  /**
   *
   * @param {Number} max
   * @param {Number} min
   * @param {Number} items
   * @returns {Number}
   */
  getMinimumHeight({ max, min, items }) {
    return max - items < min ? min - 1 : max - items;
  },
  /**
   *
   * @param {Function} dispatch
   * @param {String} action
   * @param {Number} height
   * @param {Number} minimumHeight
   * @returns {Array}
   */
  setupRequests({ dispatch, action, height, minimumHeight }) {
    const requests = [];
    while (minimumHeight < height) {
      requests.push(dispatch(action, height--));
    }
    return requests;
  },
};

export default blocksRequestHelper;
