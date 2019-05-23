/**
 * Votings mutations
 */
export default {
  /**
   * Set votings isFetching state to true
   *
   * @param {VotingsState} state
   */
  startLoading(state) {
    state.isFetching = true;
  },
  /**
   * Set votings isFetching state to false
   *
   * @param {VotingsState} state
   */
  stopLoading(state) {
    state.isFetching = false;
  },
};
