import { gaiaRest, monitor, staking, tendermintRpc, tx } from '@/apis/http';
import { BLOCKS, VALIDATORS } from '@/constants';

export default {
  async fetchHealth({ commit }) {
    try {
      const response = await monitor.requestBackendHealth();
      commit('setMaintenance', response.data.maintenance);
    } catch (error) {
      commit('setError', error);
    }
  },
  async initAppData({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchFirstHeight'),
      dispatch('fetchInfo'),
      dispatch('fetchLatestBlock'),
      dispatch('fetchLatestValidatorSets'),
      dispatch('fetchStakingParams'),
      dispatch('fetchValidators'),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchFirstHeight({ commit }) {
    try {
      await tendermintRpc.requestBlock(BLOCKS.FIRST_HEIGHT_PROBE);
      // The probe height is available: the node holds the whole history.
      commit('setFirstHeight', BLOCKS.FIRST_HEIGHT_PROBE);
    } catch (error) {
      const lowestHeight = _parseLowestHeight(error);
      if (lowestHeight) {
        commit('setFirstHeight', lowestHeight);
      } else if (process.env.VUE_APP_FIRST_HEIGHT) {
        // Use the env variable and not a constant to make the action testable.
        // It is only a fallback for when the node does not report its lowest
        // available height (truthy check also covers an empty Docker default).
        commit('setFirstHeight', parseInt(process.env.VUE_APP_FIRST_HEIGHT));
      } else {
        commit('setError', error);
      }
    }
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
  async refreshValidators({ commit, dispatch }) {
    commit('setLoading', true);
    commit('setValidators', []);
    await dispatch('fetchValidators');
    commit('setLoading', false);
  },
};

const _parseLowestHeight = (error) => {
  const message =
    error && error.response && error.response.data
      ? error.response.data.error || error.response.data.message
      : null;
  if (!message) {
    return null;
  }
  const match = message.match(BLOCKS.LOWEST_HEIGHT_REGEX);
  return match ? parseInt(match[1]) : null;
};
