import http from './http';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async init({ dispatch, commit }) {
    commit('startLoading');
    await Promise.all([
      // dispatch('fetchConversionRate'),
      // dispatch('fetchRateUpdates'),
      // dispatch('fetchStartingDate'),
      // dispatch('spreadsheet/fetchAbrTokens', null, { root: true }),
      // dispatch('spreadsheet/fetchVbrTokens', null, { root: true }),
      dispatch(
        'transactions/fetchTransactionsDescendingOrder',
        { limit: 10, query: 'tx.minheight=1' },
        {
          root: true,
        },
      ),
    ]);
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchConversionRate({ dispatch, commit }) {
    try {
      const response = await http.requestConversionRate();
      commit('setConversionRate', response.data.result);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchRateUpdates({ dispatch, commit }) {
    const updates = [];
    const limit = 30;
    let page = 1;
    try {
      let response = await http.requestRateUpdates({ page, limit });
      if (response.data.page_total == 0) {
        return;
      }
      response.data.txs.forEach((tx) => updates.push(tx));
      if (response.data.page_total > 1) {
        while (page < response.data.page_total) {
          page++;
          response = await http.requestRateUpdates({ page, limit });
          response.data.txs.forEach((tx) => updates.push(tx));
        }
      }
      commit('setRateUpdates', updates);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchStartingDate({ dispatch, commit }) {
    try {
      const response = await http.requestBlock('1');
      commit('setStartingDate', response.data.block.header.time);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
};
