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
      dispatch('fetchAbrTokens'),
      dispatch('fetchVbrTokens'),
    ]);
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchAbrTokens({ dispatch, commit }) {
    try {
      const response = await api.requestAbrTokens();
      commit('setAbrTokens', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchVbrTokens({ dispatch, commit }) {
    try {
      const response = await api.requestVbrTokens();
      commit('setVbrTokens', response.data.result);
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
