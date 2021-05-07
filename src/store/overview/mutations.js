export default {
  /**
   *
   * @param {OverviewState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {OverviewState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   *
   * @param {OverviewState} state
   * @param {Object} error
   */
  setError(state, error) {
    state.error = { ...error };
  },
};
