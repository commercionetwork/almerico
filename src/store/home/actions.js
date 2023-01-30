import { chart, commercio, tendermintRpc, tx } from '@/apis/http';
import { APIS, HOME, CONFIG } from '@/constants';

export default {
  async initHome({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchParams'),
      dispatch('fetchParamsUpdates'),
      dispatch('fetchStartingDate'),
      dispatch('fetchTokensChart'),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
    await dispatch('fetchTransactions');
  },

  async fetchParams({ commit }) {
    try {
      const response = await commercio.requestParams();
      commit('setParams', response.data.params);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchParamsUpdates({ dispatch, getters }) {
    await dispatch('addParamsUpdates');
    while (getters['paramsUpdatesTotal'] > getters['paramsUpdatesOffset']) {
      await dispatch('addParamsUpdates', {
        offset: getters['paramsUpdatesOffset'],
      });
    }
  },

  async addParamsUpdates({ commit }, offset) {
    const parameters = {
      events: "message.action='setParams'",
    };
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await tx.requestTxsList(parameters, pagination);
      commit('addParamsUpdates', response.data.tx_responses);
      commit('setParamsUpdatesPagination', response.data.pagination);
      commit('sumParamsUpdatesOffset', response.data.tx_responses.length);
    } catch (error) {
      commit('setError', error);
    }
  },

  async refreshParams({ commit, dispatch }) {
    commit('setLoadingParams', true);
    commit('setParamsUpdates', []);
    const requests = [dispatch('fetchParams'), dispatch('fetchParamsUpdates')];
    await Promise.all(requests);
    commit('setLoadingParams', false);
  },

  async fetchStartingDate({ commit }) {
    try {
      const response = await tendermintRpc.requestBlock(CONFIG.FIRST_HEIGHT);
      commit('setStartingDate', response.data.block.header.time);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchTokensChart({ commit }) {
    try {
      const response = await chart.requestTokens();
      commit('setTokensChart', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchTransactions({ commit }) {
    commit('setLoadingTxs', true);
    try {
      const response = await tx.requestTxs(
        APIS.SORTING_ORDERS.DESC,
        HOME.TRANSACTIONS_NUMBER
      );
      commit('setTransactions', response.data.txs);
    } catch (error) {
      commit('setError', error);
    }
    commit('setLoadingTxs', false);
  },

  async refreshTransactions({ commit, dispatch }) {
    commit('setTransactions', []);
    await dispatch('fetchTransactions');
  },
};
