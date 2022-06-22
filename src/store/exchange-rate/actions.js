import { chart, overview } from '@/apis/http';

export default {
  async initExchangeRate({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchChart'), dispatch('fetchOverview')];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchChart({ commit }) {
    try {
      const response = await chart.requestTokens();
      commit('setChart', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchOverview({ commit }) {
    try {
      const response = await overview.requestExchangeRate();
      commit('setOverview', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
};
