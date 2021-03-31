export default {
  /**
   *
   * @param {StartingState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {StartingState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   *
   * @param {StartingState} state
   * @param {Object} error
   */
  setError(state, error) {
    state.error = { ...error };
  },
  /**
   *
   * @param {StartingState} state
   * @param {Object} data
   */
  setNodeInfo(state, data) {
    state.nodeInfo = {
      ...data,
    };
  },
  /**
   *
   * @param {StartingState} state
   * @param {Object} data
   */
  setParams(state, data) {
    state.params = {
      ...data,
    };
  },
  /**
   *
   * @param {StartingState} state
   * @param {Object} data
   */
  setPool(state, data) {
    state.pool = {
      ...data,
    };
  },
  /**
   *
   * @param {StartingState} state
   * @param {String} rate
   */
  setConversionRate(state, rate) {
    state.conversionRate = rate;
  },
};
