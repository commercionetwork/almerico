/**
 * TRANSACTIONS ACTIONS
 */

import api from "./api";
import {
  CUSTOMIZATION
} from "@/constants";

export default {
  /**
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
      commit("setTransactionDetails", response.data);
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
   * Fetch transactions in descending order
   * @param {Function} commit
   * @param {Number} page
   * @param {Number} limit
   * @param {String} query
   */
  async fetchTransactions({
    commit
  }, {
    page,
    limit,
    query
  }) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    let currentPage;
    let lastPage;
    let response;
    let responseData;
    try {
      if (page === 1) {
        response = await api.requestSearchTransactions({
          query: query,
          page: 1,
          limit: limit,
        });
        lastPage = parseInt(response.data.page_total);
        if (lastPage <= 1) {
          currentPage = page;
          responseData = {
            hasNext: false,
            records: response.data.txs
          };
        } else {
          currentPage = lastPage;
          response = await api.requestSearchTransactions({
            query: query,
            page: currentPage,
            limit: limit,
          });
          responseData = {
            hasNext: currentPage > 1,
            records: response.data.txs
          };
        }
      } else if (page > 1) {
        response = await api.requestSearchTransactions({
          query: query,
          page: page,
          limit: limit,
        });
        currentPage = page;
        responseData = {
          hasNext: currentPage > 1,
          records: response.data.txs
        };
      }
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
      commit("addTransactions", responseData);
      commit("changePage", currentPage);
      commit("stopLoading");
    }
  },
  /**
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {Number} page
   * @param {Number} limit
   * @param {String} query
   */
  async getTransactions({
    commit,
    dispatch
  }, {
    page = 1,
    limit = CUSTOMIZATION.TXS.TABLE_ITEMS,
    query = "tx.minheight=1"
  } = {}) {
    commit("clearAllTransactions");
    commit("changePage", 1);
    await dispatch("fetchTransactions", {
      page,
      limit,
      query
    });
  },
  /**
   * @param {Function} dispatch
   * @param {TransactionsState} state
   * @param {Number} diff
   */
  async changePage({
    dispatch,
    state,
  }, {
    diff
  }) {
    const newValue = state.currentPage + diff;
    const isOperationAllowed =
      (newValue >= 1 && diff < 0) || (state.hasNext && diff > 0);
    if (!isOperationAllowed) {
      return;
    }

    await dispatch("fetchTransactions", {
      page: newValue,
      limit: CUSTOMIZATION.TXS.TABLE_ITEMS, // must be the same of 'getTransactions' action
      query: "tx.minheight=1",
    });
  },
  /**
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {TransactionsState} state
   * @param {Number} items
   * @param {Number} page
   * @param {Number} limit
   * @param {String} query
   */
  async getLatestTransactions({
    commit,
    dispatch,
    state,
  }, {
    items = 10,
    page = 1,
    limit = 10,
    query = "tx.minheight=1"
  } = {}) {
    commit("clearAllTransactions");
    commit("changePage", 1);
    await dispatch("fetchTransactions", {
      page,
      limit,
      query
    });
    if (state.transactions.length < items && state.hasNext === true) {
      await dispatch("fetchTransactions", {
        page: state.currentPage - 1,
        limit,
        query
      });
    }
  },
  /**
   * @param {Function} commit 
   * @param {Number} height
   */
  async fetchBlockTransactions({
      commit
    },
    height
  ) {
    commit("startLoading");
    commit("setServerReachability", true, {
      root: true
    });
    try {
      const response = await api.requestBlockTransactions(height);
      if (response.data.txs.length > 0) {
        response.data.txs.forEach(tx => {
          commit("addSingleTransaction", tx);
        });
      }
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
   * 
   * @param {Function} commit
   * @param {String} filter
   */
  setTransactionsFilter({
    commit
  }, filter) {
    commit("setFilter", filter);
  },
};