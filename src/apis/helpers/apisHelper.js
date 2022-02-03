const apisHelper = {
  /**
   *
   * @param {Object} params
   * @param {Object} pagination
   * @returns {Object}
   */
  setupParams(params, pagination) {
    if (!params) return {};
    const obj = Object.assign({}, params);
    if (pagination) {
      Object.keys(pagination).forEach((k) => {
        obj[`pagination.${k}`] = pagination[k];
      });
    }
    return obj;
  },
};

export default apisHelper;
