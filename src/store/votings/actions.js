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
   * @param {String} voter
   * @param {String} depositor
   * @param {String} status
   */
  async fetchVotings({
    commit
  }, {
    voter,
    depositor,
    status
  } = {
    voter: "",
    depositor: "",
    status: ""
  }) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestProposals({
        voter,
        depositor,
        status
      });
      commit("setVotings", response.data.result);
    } catch (error) {
      if (error.response) {
        commit("setMessage", error.response.data.error);
      } else if (error.request) {
        commit("setMessage", "Request error");
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
