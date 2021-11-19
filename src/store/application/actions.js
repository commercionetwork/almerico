import { gaiaRest, staking, tendermintRpc, tx } from '@/apis/http';
import { VALIDATORS } from '@/constants';

export default {
  async initAppData({ commit, dispatch }) {
    commit('setLoading', true);
    commit('setLatestTransactions', []);
    commit('setValidators', []);
    commit('setValidatorsOffset', 0);
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

  async fetchInfo({ commit, dispatch }) {
    try {
      const response = await gaiaRest.requestNodeInfo();
      commit('setInfo', response.data);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchLatestBlock({ commit, dispatch }) {
    try {
      const response = await tendermintRpc.requestBlockLatest();
      commit('setLatestBlock', response.data.block);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchLatestTransactions({ commit, dispatch }, height) {
    try {
      const response = await tx.requestTxsList({
        events: `tx.height=${height}`,
      });
      commit('addLatestTransactions', response.data.txs);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchLatestValidatorSets({ commit, dispatch }) {
    try {
      const response = await tendermintRpc.requestValidatorSetsLatest();
      commit('setLatestValidatorSets', response.data.result.validators);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchStakingParams({ commit, dispatch }) {
    try {
      const response = await staking.requestParameters();
      commit('setStakingParams', response.data.params);
    } catch (error) {
      dispatch('handleError', error, { root: true });
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

  async addValidators({ commit, dispatch }, { params, offset }) {
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await staking.requestValidatorsList(params, pagination);
      commit('addValidators', response.data.validators);
      commit('setValidatorsPagination', response.data.pagination);
      commit('sumValidatorsOffset', response.data.validators.length);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
};
