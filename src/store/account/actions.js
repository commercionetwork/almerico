/**
 * Account actions
 */

import api from "./api";

export default {
  /**
   * Action to fetch account's balances by address
   * 
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchBalances({
    commit
  }, address) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestBalances(address);
      commit("setBalances", response.data);
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
