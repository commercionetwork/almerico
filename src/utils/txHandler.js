const txHandler = {
  /**
   *
   * @param {Array.<Object>} msgs
   * @returns {String}
   */
  getType(msgs) {
    console.log(msgs);
    if (msgs === null || !msgs.length) return '';

    return msgs.length === 1
      ? msgs[0]['@type'].split('/').pop()
      : 'Multi Types';
  },
};

export default txHandler;
