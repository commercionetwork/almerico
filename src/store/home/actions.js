import { bank, commercio, staking, tendermintRpc, tx } from '@/apis/http';
import { APIS, HOME, SETTINGS } from '@/constants';

export default {
  async initHome({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchAbrTokens'),
      dispatch('fetchAllTokens'),
      dispatch('fetchConversionRate'),
      dispatch('fetchPool'),
      dispatch('fetchRateUpdates'),
      dispatch('fetchStartingDate'),
      dispatch('fetchVbrTokens'),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
    commit('setLoadingTxs', true);
    await dispatch('fetchTransactions');
    commit('setLoadingTxs', false);
  },

  async fetchConversionRate({ commit, dispatch }) {
    try {
      const response = await commercio.requestConversionRate();
      commit('setConversionRate', response.data.params.conversion_rate);
    } catch (error) {
      dispatch('handleError', error);
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

  async addRateUpdates({ commit, dispatch }, offset) {
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
      dispatch('handleError', error);
    }
  },

  async fetchStartingDate({ commit, dispatch }) {
    try {
      const response = await tendermintRpc.requestBlock(SETTINGS.FIRST_HEIGHT);
      commit('setStartingDate', response.data.block.header.time);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchAbrTokens({ commit, dispatch }) {
    try {
      const response = await commercio.requestAbrTokens();
      commit('setAbrTokens', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchVbrTokens({ commit, dispatch }) {
    try {
      const response = await commercio.requestVbrTokens();
      commit('setVbrTokens', response.data.funds);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchAllTokens({ commit, dispatch }) {
    try {
      const response = await bank.requestSupply();
      commit('setSupply', response.data.supply);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchPool({ commit, dispatch }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchTransactions({ commit, dispatch }) {
    const params = {
      events: 'tx.height >= 1',
      order_by: APIS.SORTING_ORDERS.ORDER_BY_DESC,
    };
    const pagination = {
      limit: HOME.TRANSACTIONS_NUMBER,
    };
    try {
      const response = await tx.requestTxsList(params, pagination);
      commit('addTransactions', response.data.tx_responses);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async refreshTransactions({ commit, dispatch }) {
    commit('setTransactions', []);
    commit('setLoadingTxs', true);
    await dispatch('fetchTransactions');
    commit('setLoadingTxs', false);
  },

  handleError({ commit }, error) {
    commit('setError', error);
  },
};
