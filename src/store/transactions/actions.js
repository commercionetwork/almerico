import http from './http';
import { API, CHAIN, CUSTOMIZATION } from '@/constants';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} page
   * @param {Number} limit
   * @param {String} query
   */
  async getTransactionsDEPRECATED(
    { dispatch, commit },
    { page, limit, query },
  ) {
    try {
      const response = await http.requestSearchTransactionsDEPRECATED({
        query: query,
        page: page,
        limit: limit,
      });
      commit('addTransactions', response.data.txs);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} hash
   */
  async fetchTransaction({ dispatch, commit }, hash) {
    commit('startLoading');
    commit('setTransactionDetails', null);
    let response;
    try {
      response = await http.requestTransaction(hash);
      commit('setTransactionDetails', {
        data: response.data,
        ledger: API.LCD,
        version: '',
      });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        await dispatch('fetchAncestorTransaction', hash);
      } else {
        dispatch('handleError', error, { root: true });
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
    const ancestors = CHAIN.ANCESTORS !== '' ? JSON.parse(CHAIN.ANCESTORS) : [];
    if (ancestors.length === 0) return;
    for (const ancestor of ancestors) {
      try {
        const response = await http.requestAncestorTransaction({
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
          dispatch('handleError', error, { root: true });
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
      const response = await http.requestSearchTransactionsDEPRECATED({
        query,
        page: 1,
        limit: 1,
      });
      const lastPage = Math.ceil(parseInt(response.data.page_total) / limit);
      commit('changePage', lastPage);
      commit('setHasNext', lastPage);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} events
   * @param {Object} pagination
   * @param {String} orderBy
   */
  async getTransactions({ dispatch, commit }, { events, pagination, orderBy }) {
    try {
      const response = await http.requestSearchTransactions({
        events,
        pagination,
        orderBy,
      });
      commit('addTransactions', response.data.txs);
    } catch (error) {
      dispatch('handleError', error, { root: true });
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
    { limit = CUSTOMIZATION.TXS.TABLE_ITEMS, query = 'tx.minheight=1' } = {},
  ) {
    commit('startLoading');
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
    await dispatch('getTransactionsDEPRECATED', {
      page: state.currentPage,
      limit,
      query,
    });
    if (state.hasNext) {
      const currentPage = state.currentPage - 1;
      commit('changePage', currentPage);
      commit('setHasNext', currentPage);
      await dispatch('getTransactionsDEPRECATED', {
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
    } = {},
  ) {
    if (!state.hasNext) return;
    const currentPage = state.currentPage - diff;
    commit('startLoading');
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
    try {
      const response = await http.requestBlockTransactions(height);
      if (response.data.tx_responses.length > 0) {
        response.data.tx_responses.forEach((tx) => {
          console.log(tx);
          commit('addSingleTransaction', tx);
        });
      }
    } catch (error) {
      dispatch('handleError', error, { root: true });
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
};
