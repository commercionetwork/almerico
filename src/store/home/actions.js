import { bank, commercio, staking, tendermintRpc, tx } from '@/apis/http';
import { APIS, HOME, CONFIG } from '@/constants';

export default {
  async initHome({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchAbrTokens'),
      dispatch('fetchAllTokens'),
      dispatch('fetchParams'),
      dispatch('fetchPool'),
      dispatch('fetchRateUpdates'),
      dispatch('fetchStartingDate'),
      dispatch('fetchVbrTokens'),
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

  async fetchRateUpdates({ dispatch, getters }) {
    await dispatch('addRateUpdates');
    while (getters['rateUpdatesTotal'] > getters['rateUpdatesOffset']) {
      await dispatch('addRateUpdates', {
        offset: getters['rateUpdatesOffset'],
      });
    }
  },

  async addRateUpdates({ commit }, offset) {
    const parameters = {
      events: "message.action='setEtpsConversionRate'",
    };
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await tx.requestTxsList(parameters, pagination);
      commit('addRateUpdates', response.data.tx_responses);
      commit('setRateUpdatesPagination', response.data.pagination);
      commit('sumRateUpdatesOffset', response.data.tx_responses.length);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchStartingDate({ commit }) {
    try {
      const response = await tendermintRpc.requestBlock(CONFIG.FIRST_HEIGHT);
      commit('setStartingDate', response.data.block.header.time);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchAbrTokens({ commit }) {
    try {
      const response = await commercio.requestAbrTokens();
      commit('setAbrTokens', response.data.result);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchVbrTokens({ commit }) {
    try {
      const response = await commercio.requestVbrTokens();
      commit('setVbrTokens', response.data.funds);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchAllTokens({ commit }) {
    try {
      const response = await bank.requestSupply();
      commit('setSupply', response.data.supply);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchPool({ commit }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchTransactions({ commit }) {
    const params = {
      events: 'tx.height >= 1',
      order_by: APIS.SORTING_ORDERS.ORDER_BY_DESC,
    };
    const pagination = {
      limit: HOME.TRANSACTIONS_NUMBER,
    };
    commit('setLoadingTxs', true);
    try {
      const response = await tx.requestTxsList(params, pagination);
      commit('addTransactions', response.data.tx_responses);
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
