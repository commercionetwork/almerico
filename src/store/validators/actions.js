import { staking, tendermintRpc } from '@/apis/http';
import { VALIDATORS } from '@/constants';

export default {
  async initValidatorsList({ commit, dispatch }) {
    commit('setLoading', true);
    commit('setFilter', {
      active: true,
      query: '',
    });
    const requests = [dispatch('fetchPool')];
    if (process.env.VUE_APP_BLOCKS_MONITOR === 'true') {
      commit('setBlocks', []);
      requests.push(dispatch('fetchTrackedBlocks'));
    }
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchPool({ commit, dispatch }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchTrackedBlocks({ dispatch, rootGetters }) {
    const items = VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT;
    const latestBlock = rootGetters['application/latestBlock'];
    const maxHeight = parseInt(latestBlock.header.height);
    const minHeight = maxHeight - items > 0 ? maxHeight - items : 0;
    const requests = setUpBlocksRequests(dispatch, maxHeight, minHeight);
    await Promise.all(requests);
  },

  async addBlocksItem({ commit, dispatch }, height) {
    try {
      const resBlock = await tendermintRpc.requestBlock(height);
      const resValidatorSets = await tendermintRpc.requestValidatorSets(height);
      commit('addBlock', { ...resBlock.data, ...resValidatorSets.data.result });
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  setValidatorsFilter({ commit }, filter) {
    commit('setFilter', filter);
  },

  async initValidatorsDetail({ commit, dispatch }, id) {
    commit('setLoading', true);
    const requests = [
      dispatch('fetchDetail', id),
      dispatch('fetchDetailDelegations', id),
      dispatch('fetchPool'),
    ];
    if (VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.VISIBILITY)
      requests.push(dispatch('fetchTrackedBlocks'));
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchDetail({ commit, dispatch }, id) {
    try {
      const response = await staking.requestValidatorsDetailLegacy(id);
      commit('setDetail', response.data.result);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchDetailDelegations({ commit, dispatch }, id) {
    try {
      const response = await staking.requestValidatorsDetailDelegationsLegacy(
        id,
      );
      commit('setDelegations', response.data.result);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
};

const setUpBlocksRequests = (dispatch, maxHeight, minHeight) => {
  const requests = [];
  while (maxHeight > minHeight) {
    requests.push(dispatch('addBlocksItem', maxHeight--));
  }
  return requests;
};
