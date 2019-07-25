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
  /**
   * Set votings message
   *
   * @param {VotingsState} state
   * @param {String} message
   */
  setMessage(state, message) {
    state.message = message;
  },
  /**
   * Set votings data
   * 
   * @param {VotingsState} state 
   * @param {Array.<Proposal>} data 
   */
  setVotings(state, data) {
    state.all = data;
  }
};
