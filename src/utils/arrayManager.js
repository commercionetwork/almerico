const arrayManager = {
  /**
   * Function that groups by property an objects array
   * 
   * @param {Array.<Object>} objectArray 
   * @param {String} property
   * @returns {Object}
   */
  groupBy(objectArray, property) {
    return objectArray.reduce(function (acc, obj) {
      var key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(obj);
      return acc;
    }, {});
  },
  /**
   * Function that removes duplicates from an array of objects
   * 
   * @param {Array.<Object>} a 
   * @param {Function} key 
   * @returns {Array.<Object>}
   */
  uniqueByKey(a, key) {
    return [...new Map(a.map(x => [key(x), x])).values()];
  },
  /**
   * Function that removes duplicates from an array of objects
   * 
   * @param {Array.<Object>} arr
   * @returns {Array.<Object>}
   */
  uniqueValuesArrayFromObjectsArray(arr) {
    return Array.from(new Set(arr.map(JSON.stringify))).map(JSON.parse);
  }
};

export default arrayManager;
