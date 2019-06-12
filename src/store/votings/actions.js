import api from "./api";

/**
 * Votings actions
 */
export default {
  /**
   * Action to get the votings list
   * 
   * @param {Function} dispatch 
   * @param {Object} filters // voter, depositor, status
   */
  getVotings({
    dispatch
  }, filters) {
    dispatch("fetchVotings", filters);
  },
  /**
   * Action to fetch a votings list
   * 
   * @param {Function} commit 
   * @param {Object} filters // voter, depositor, status
   */
  async fetchVotings({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestProposals(filters);
      commit("setProposals", response.data);
    } catch (error) {
      if (error.response !== undefined) {
        console.log(error.response);
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  }
};
