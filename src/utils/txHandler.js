const txHandler = {
  /**
   *
   * @param {Array.<Object>} msgs
   * @returns {String}
   */
  getType(msgs) {
    if (msgs === null || msgs.length === 0) return '';

    return msgs.length === 1 ? msgs[0].type.split('/').pop() : 'Multi Types';
  },
};

export default txHandler;
