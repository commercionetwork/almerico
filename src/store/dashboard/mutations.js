export default {
  /**
   *
   * @param {DashboardState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {DashboardState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   *
   * @param {DashboardState} state
   * @param {Object} error
   */
  setError(state, error) {
    state.error = { ...error };
  },
  /**
   *
   * @param {DashboardState} state
   * @param {String} rate
   */
  setConversionRate(state, rate) {
    state.conversionRate = rate;
  },
  /**
   *
   * @param {DashboardState} state
   * @param {Array.<Object>} data
   */
  setRateUpdates(state, data) {
    state.rateUpdates = [...data];
  },
  /**
   *
   * @param {DashboardState} state
   * @param {String} date
   */
  setStartingDate(state, date) {
    state.startingDate = date;
  },
};
