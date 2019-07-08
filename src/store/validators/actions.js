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
   * 
   * @param {Function} commit 
   * @param {Function} dispatch
   * @param {Array.<String>} filters 
   */
  searchValidators({
    commit,
    dispatch
  }, filters) {
    commit("setValidators", []);
    [...filters].forEach(filter => dispatch("updateValidators", {
      status: filter
    }));
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
  },
  /**
   * Action to update a the validators list
   * 
   * @param {Function} commit 
   * @param {Object} filters // status, page, limit
   */
  async updateValidators({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestValidators(filters);
      commit("addValidators", response.data);
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
