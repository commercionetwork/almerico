const arrayManager = {
  /**
   * Function that removes duplicates from an array of objects
   * 
   * @param {Array.<Object>} a 
   * @param {Function} key 
   */
  uniqueByKey(a, key) {
    return [...new Map(a.map(x => [key(x), x])).values()];
  },
};

export default arrayManager;
