/**
 * Tendermint actions
 */

import api from "./api";

export default {
  /**
   * Action to fetch transactions
   * 
   * @param {Function} commit 
   * @param {Object} filters // tag, page, limit
   */
  async fetchTransactions({
    commit
  }, filters) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestTransactions(filters);
      commit("addTransactions", response.data);
    } catch (error) {
      if (error.response !== undefined) {
        commit("setMessage", error.response.data.error);
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  },
  async updateTransactions({
    commit
  }, height) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestTransactionsByHeight(height);
      commit("addTransactions", response.data);
    } catch (error) {
      if (error.response !== undefined) {
        commit("setMessage", error.response.data.error);
      } else {
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  },
};
