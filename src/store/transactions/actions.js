/**
 * TRANSACTIONS ACTIONS
 */

import api from './api';
import { API, CHAIN, CUSTOMIZATION } from '@/constants';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} hash
   */
  async fetchTransaction({ dispatch, commit }, hash) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    commit('setTransactionDetails', null);
    let response;
    try {
      response = await api.requestTransaction(hash);
      commit('setTransactionDetails', {
        data: response.data,
        ledger: API.LCD,
        version: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await dispatch('fetchAncestorTransaction', hash);
      } else {
        dispatch('handleError', error);
      }
    } finally {
      commit('stopLoading');
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} hash
   */
  async fetchAncestorTransaction({ dispatch, commit }, hash) {
    const ancestors = JSON.parse(CHAIN.ANCESTORS);
    for (const ancestor of ancestors) {
      try {
        const response = await api.requestAncestorTransaction({
          lcd: ancestor.lcd,
          hash: hash,
        });
        commit('setTransactionDetails', {
          data: response.data,
          ledger: ancestor.lcd_ledger,
          version: ancestor.ver,
        });
        break;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          continue;
        } else {
          dispatch('handleError', error);
        }
      }
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} limit
   * @param {String} query
   */
  async getLastPage({ dispatch, commit }, { limit, query }) {
    try {
      const response = await api.requestSearchTransactions({
        query,
        page: 1,
        limit: 1,
      });
      const lastPage = Math.ceil(parseInt(response.data.page_total) / limit);
      commit('changePage', lastPage);
      commit('setHasNext', lastPage);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} page
   * @param {Number} limit
   * @param {String} query
   */
  async getTransactions({ dispatch, commit }, { page, limit, query }) {
    try {
      const response = await api.requestSearchTransactions({
        query: query,
        page: page,
        limit: limit,
      });
      commit('addTransactions', response.data.txs);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {TransactionsState} state
   * @param {Number} limit
   * @param {String} query
   */
  async fetchTransactionsDescendingOrder(
    { commit, dispatch, state },
    { limit = CUSTOMIZATION.TXS.TABLE_ITEMS, query = 'tx.minheight=1' } = {}
  ) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    commit('clearAllTransactions');
    commit('changePage', 1);
    commit('setHasNext', 1);
    await dispatch('getLastPage', {
      limit,
      query,
    });
    if (state.currentPage === 0) {
      commit('stopLoading');
      return;
    }
    await dispatch('getTransactions', {
      page: state.currentPage,
      limit,
      query,
    });
    if (state.hasNext) {
      const currentPage = state.currentPage - 1;
      commit('changePage', currentPage);
      commit('setHasNext', currentPage);
      await dispatch('getTransactions', {
        page: currentPage,
        limit,
        query,
      });
    }
    commit('stopLoading');
  },
  /**
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {TransactionsState} state
   * @param {Number} diff
   * @param {Number} limit
   * @param {String} query
   */
  async changePage(
    { commit, dispatch, state },
    {
      diff,
      limit = CUSTOMIZATION.TXS.TABLE_ITEMS,
      query = 'tx.minheight=1',
    } = {}
  ) {
    if (!state.hasNext) return;
    const currentPage = state.currentPage - diff;
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    await dispatch('getTransactions', {
      page: currentPage,
      limit,
      query,
    });
    commit('changePage', currentPage);
    commit('setHasNext', currentPage);
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} height
   */
  async fetchBlockTransactions({ dispatch, commit }, height) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    try {
      const response = await api.requestBlockTransactions(height);
      if (response.data.txs.length > 0) {
        response.data.txs.forEach((tx) => {
          commit('addSingleTransaction', tx);
        });
      }
    } catch (error) {
      dispatch('handleError', error);
    } finally {
      commit('stopLoading');
    }
  },
  /**
   *
   * @param {Function} commit
   * @param {String} filter
   */
  setTransactionsFilter({ commit }, filter) {
    commit('setFilter', filter);
  },
  /**
   * @param {Function} commit
   * @param {Object} error
   */
  handleError({ commit }, error) {
    if (error.response) {
      commit('setError', error.response);
    } else if (error.request) {
      commit('setError', error);
    } else {
      commit('setServerReachability', false, {
        root: true,
      });
    }
  },
};
