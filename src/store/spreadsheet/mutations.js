export default {
  /**
   *
   * @param {SpreadsheetState} state
   */
  startLoading(state) {
    state.error = null;
    state.isLoading = true;
  },
  /**
   *
   * @param {SpreadsheetState} state
   */
  stopLoading(state) {
    state.isLoading = false;
  },
  /**
   *
   * @param {SpreadsheetState} state
   * @param {Object} error
   */
  setError(state, error) {
    state.error = error;
  },
  /**
   *
   * @param {SpreadsheetState} state
   * @param {Array.<Object>} data
   */
  setAbrTokens(state, data) {
    state.abrTokens = data;
  },
  /**
   *
   * @param {SpreadsheetState} state
   * @param {Array.<Object>} data
   */
  setVbrTokens(state, data) {
    state.vbrTokens = data;
  },
  /**
   *
   * @param {SpreadsheetState} state
   * @param {Array.<Object>} data
   */
  setAllTokens(state, data) {
    state.allTokens = data;
  },
  /**
   *
   * @param {SpreadsheetState} state
   * @param {Object} data
   */
  addAccountTokens(state, data) {
    state.accountsTokens.push(data);
  },
};
