/**
 * ACCOUNT ACTIONS
 */

import api from "./api";

export default {
  /**
   * @param {Function} dispatch 
   * @param {Function} commit 
   * @param {String} address 
   */
  async getAccount({
    dispatch,
    commit
  }, address) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      await dispatch("fetchMembership", address);
      await dispatch("fetchBalances", address);
      await dispatch("fetchDelegations", address);
      await dispatch("fetchUnbondings", address);
      await dispatch("fetchRewards", address);
    } catch (error) {
      if (error.response) {
        commit("setError", JSON.stringify(error.response.data));
      } else if (error.request) {
        commit("setError", JSON.stringify(error));
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
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchBalances({
    commit
  }, address) {
    const response = await api.requestBalances(address);
    commit("setBalances", response.data.result);
  },
  /**
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchDelegations({
    commit
  }, address) {
    const response = await api.requestDelegations(address);
    commit("setDelegations", response.data.result);
  },
  /**
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchMembership({
    commit
  }, address) {
    try {
      const response = await api.requestMembership(address);
      commit("setMembership", response.data.result);
    } catch (error) {
      if (error.request) {
        commit("setMembership", null);
        commit("setError", "");
      } else {
        throw error;
      }
    }
  },
  /**
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchRewards({
    commit
  }, address) {
    const response = await api.requestRewards(address);
    commit("setRewards", response.data.result);
  },
  /**
   * @param {Function} commit 
   * @param {String} address 
   */
  async fetchUnbondings({
    commit
  }, address) {
    const response = await api.requestUnbondings(address);
    commit("setUnbondings", response.data.result);
  },
};