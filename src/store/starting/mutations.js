/**
 * STARING MUTATIONS
 */

export default {
  /**
   * Set isLoading state to true
   *
   * @param {StartingState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   * Set isLoading state to false
   *
   * @param {StartingState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   * Set error message
   *
   * @param {StartingState} state
   * @param {Object} error
   */
  setError(state, error) {
    state.error = { ...error };
  },
  /**
   * Set node info
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
   * Set params
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
   * Set pool
   *
   * @param {StartingState} state
   * @param {Object} data
   */
  setPool(state, data) {
    state.pool = {
      ...data,
    };
  },
};