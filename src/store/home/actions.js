import { bank, commercio, staking, tendermintRpc, tx } from '@/apis/http';
import { APIS, HOME, CONFIG } from '@/constants';

export default {
  async initHome({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchAbrTokens'),
      dispatch('fetchAllTokens'),
      dispatch('fetchFreezedTokensLegacy'),
      dispatch('fetchParams'),
      dispatch('fetchParamsUpdates'),
      dispatch('fetchPool'),
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

  async fetchAbrTokens({ commit }) {
    try {
      const response = await commercio.requestAbrTokens();
      commit('setAbrTokens', response.data.funds);
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

  async fetchFreezedTokens({ commit }) {
    try {
      const response = await bank.requestBalances(CONFIG.MINTER_ACCOUNT);
      commit('setFreezedTokens', response.data.balances);
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

  //TODO: remove when the new version will be available
  async fetchFreezedTokensLegacy({ commit }) {
    try {
      const response = await bank.requestBalancesLegacy(CONFIG.MINTER_ACCOUNT);
      commit('setFreezedTokens', response.data.result);
    } catch (error) {
      commit('setError', error);
    }
  },
};
