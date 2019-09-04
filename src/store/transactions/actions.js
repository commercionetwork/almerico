/**
 * Transactions actions
 */

import api from "./api";

export default {
  /**
   * Action to fetch all transactions
   * 
   * @param {Function} commit 
   * @param {String} tag
   */
  async fetchTransactions({
    commit
  }, tag) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      let response = await api.requestTransactions({
        tag,
        page: 1,
        limit: 30
      });
      const totalPage = parseInt(response.data.page_total);
      if (totalPage > 0) {
        commit("addTransactions", response.data.txs);
        if (totalPage > 1) {
          let page = 2;
          while (page <= totalPage) {
            response = await api.requestTransactions({
              tag,
              page,
              limit: 30
            });
            commit("addTransactions", response.data.txs);
            page++;
          }
        }
      }
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
   * Action to fetch a transaction by hash
   * 
   * @param {Function} commit 
   * @param {String} hash 
   */
  async fetchTransaction({
    commit
  }, hash) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestTransaction(hash);
      commit("setDetails", response.data);
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
