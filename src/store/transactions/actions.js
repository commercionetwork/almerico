/**
 * Transactions actions
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
      if (error.response) {
        commit("setMessage", error.response.data.error);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  },
  /**
   * Action to add transactions
   * 
   * @param {Function} commit 
   * @param {Number} height 
   */
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
      if (error.response) {
        commit("setMessage", error.response.data.error);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
        commit("setServerReachability", false, {
          root: true
        });
      }
    } finally {
      commit("stopLoading");
    }
  },
};
