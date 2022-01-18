import { gaiaRest, staking, tendermintRpc, tx } from '@/apis/http';
import { VALIDATORS } from '@/constants';

export default {
  async initAppData({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchInfo'),
      dispatch('fetchLatestBlock'),
      dispatch('fetchLatestValidatorSets'),
      dispatch('fetchStakingParams'),
      dispatch('fetchValidators'),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchInfo({ commit }) {
    try {
      const response = await gaiaRest.requestNodeInfo();
      commit('setInfo', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchLatestBlock({ commit }) {
    try {
      const response = await tendermintRpc.requestBlockLatest();
      commit('setLatestBlock', response.data.block);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchLatestTransactions({ commit }, height) {
    try {
      const response = await tx.requestTxsList({
        events: `tx.height=${height}`,
      });
      commit('addLatestTransactions', response.data.txs);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchLatestValidatorSets({ commit }) {
    try {
      const response = await tendermintRpc.requestValidatorSetsLatest();
      commit('setLatestValidatorSets', response.data.result.validators);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchStakingParams({ commit }) {
    try {
      const response = await staking.requestParameters();
      commit('setStakingParams', response.data.params);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchValidators({ commit, dispatch, getters }) {
    const statuses = Object.values(VALIDATORS.STATUS);
    for (const status of statuses) {
      await dispatch('addValidators', {
        params: { status },
      });
      while (getters['validatorsTotal'] > getters['validatorsOffset']) {
        await dispatch('addValidators', {
          params: { status },
          offset: getters['validatorsOffset'],
        });
      }
      commit('setValidatorsOffset', 0);
    }
  },

  async addValidators({ commit }, { params, offset }) {
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await staking.requestValidatorsList(params, pagination);
      commit('addValidators', response.data.validators);
      commit('setValidatorsPagination', response.data.pagination);
      commit('sumValidatorsOffset', response.data.validators.length);
    } catch (error) {
      commit('setError', error);
    }
  },
};
