/**
 * Validators actions
 */

import api from "./api";

export default {
  /**
   * Action to get the validators list
   * 
   * @param {Function} dispatch
   * @param {Object} filters // status, page, limit
   */
  getValidators({
    dispatch
  }, filters) {
    dispatch("fetchValidators", filters);
  },
  /**
   * Action to fetch a validators list
   * 
   * @param {Function} commit 
   * @param {Object} filters // status, page, limit
   */
  async fetchValidators({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestValidators(filters);
      commit("setValidators", response.data);
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
