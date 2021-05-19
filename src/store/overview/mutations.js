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
    state.error = error;
  },
  /**
   *
   * @param {OverviewState} state
   * @param {Array.<Object>} data
   */
  setAbrTokens(state, data) {
    state.abrTokens = data;
  },
  /**
   *
   * @param {OverviewState} state
   * @param {Array.<Object>} data
   */
  setVbrTokens(state, data) {
    state.vbrTokens = data;
  },
  /**
   *
   * @param {OverviewState} state
   * @param {Array.<Object>} data
   */
  setAllTokens(state, data) {
    state.allTokens = data;
  },
  /**
   *
   * @param {OverviewState} state
   * @param {Object} data
   */
  addAccountTokens(state, data) {
    state.accountsTokens.push(data);
  },
};
