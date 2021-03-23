const arrayHandler = {
  /**
   * Sorts an array of objects by number property value in descending order
   * 
   * @param {Array.<Object>} items 
   * @param {String} key
   * @returns {Array.<Object>} 
   */
  sortObjectsByNumberPropertyValueAsc(items, key) {
    return items.sort((a, b) => a[`${key}`] - b[`${key}`]);
  },
  /**
   * Sorts an array of objects by number property value in descending order
   * 
   * @param {Array.<Object>} items 
   * @param {String} key
   * @returns {Array.<Object>} 
   */
  sortObjectsByNumberPropertyValueDesc(items, key) {
    return items.sort((a, b) => b[`${key}`] - a[`${key}`]);
  },
  /**
   * Sorts an array of objects by string property value in descending order
   * 
   * @param {Array.<Object>} items 
   * @param {String} key
   * @returns {Array.<Object>} 
   */
  sortObjectsByStringPropertyValueAsc(items, key) {
    return items.sort((a, b) => (a[key] > b[key]) ? 1 : ((b[key] > a[key]) ? -1 : 0));
  },
  /**
   * Sorts an array of objects by string property value in descending order
   * 
   * @param {Array.<Object>} items 
   * @param {String} key
   * @returns {Array.<Object>} 
   */
  sortObjectsByStringPropertyValueDesc(items, key) {
    return items.sort((a, b) => (b[key] > a[key]) ? 1 : ((a[key] > b[key]) ? -1 : 0));
  },
};

export default arrayHandler;