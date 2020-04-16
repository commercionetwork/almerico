/**
 * Chain actions
 */

import api from "./api";

export default {
  /**
   * Action to fetch node info
   * 
   * @param {Function} commit 
   */
  async fetchNodeInfo({ commit }) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestNodeInfo();
      commit("setNodeInfo", response.data.result);
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
