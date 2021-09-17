const arrayHandler = {
  /**
   *
   * @param {Array.<String>} testValues
   * @param {Array.<String>} allowedValues
   * @returns {Boolean}
   */
  isArrayContentValid(testValues, allowedValues) {
    return testValues.every((value) => allowedValues.includes(value));
  },
  /**
   *
   * @param {Array.<Object>} items
   * @param {String} key
   * @returns {Array.<Object>}
   */
  sortObjectsByNumberPropertyValueAsc(items, key) {
    return items.sort((a, b) => a[`${key}`] - b[`${key}`]);
  },
  /**
   *
   * @param {Array.<Object>} items
   * @param {String} key
   * @returns {Array.<Object>}
   */
  sortObjectsByNumberPropertyValueDesc(items, key) {
    return items.sort((a, b) => b[`${key}`] - a[`${key}`]);
  },
  /**
   *
   * @param {Array.<Object>} items
   * @param {String} key
   * @returns {Array.<Object>}
   */
  sortObjectsByStringPropertyValueAsc(items, key) {
    return items.sort((a, b) =>
      a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0,
    );
  },
  /**
   *
   * @param {Array.<Object>} items
   * @param {String} key
   * @returns {Array.<Object>}
   */
  sortObjectsByStringPropertyValueDesc(items, key) {
    return items.sort((a, b) =>
      b[key] > a[key] ? 1 : a[key] > b[key] ? -1 : 0,
    );
  },
};

export default arrayHandler;
