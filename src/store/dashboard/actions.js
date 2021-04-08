import api from './api';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async init({ dispatch, commit }) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    await Promise.all([
      dispatch('fetchConversionRate'),
      dispatch('fetchRateUpdates'),
    ]);
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchConversionRate({ dispatch, commit }) {
    try {
      const response = await api.requestConversionRate();
      commit('setConversionRate', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
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
      let response = await api.requestRateUpdates({ page, limit });
      if (response.data.page_total == 0) {
        return;
      }
      response.data.txs.forEach((tx) => updates.push(tx));
      if (response.data.page_total > 1) {
        while (page < response.data.page_total) {
          page++;
          response = await api.requestRateUpdates({ page, limit });
          response.data.txs.forEach((tx) => updates.push(tx));
        }
      }
      commit('setRateUpdates', updates);
    } catch (error) {
      dispatch('handleError', error);
    }
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
