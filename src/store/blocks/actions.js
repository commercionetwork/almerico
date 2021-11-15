import { tendermintRpc, tx } from '@/apis/http';
import { BLOCKS } from '@/constants';

export default {
  async initBlocksList({ commit, dispatch }, lastHeight) {
    commit('setLoading', true);
    commit('setBlocks', []);
    const requests = [dispatch('fetchBlocks', lastHeight)];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async addBlocks({ commit, dispatch }, lastHeight) {
    commit('setAddingBlocks', true);
    await dispatch('fetchBlocks', lastHeight);
    commit('setAddingBlocks', false);
  },

  async fetchBlocks({ commit, dispatch }, lastHeight) {
    const maxHeight = parseInt(lastHeight);
    const minHeight =
      maxHeight - BLOCKS.TABLE_ITEMS > 0 ? maxHeight - BLOCKS.TABLE_ITEMS : 0;
    const requests = setUpBlocksRequests(dispatch, maxHeight, minHeight);
    await Promise.all(requests);
    commit('setCurrentHeight', minHeight);
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

  async initBlocksDetail({ commit, dispatch }, height) {
    commit('setLoading', true);
    commit('setTransactions', []);
    const requests = [
      dispatch('fetchBlock', height),
      dispatch('fetchTransactions', height),
      dispatch('fetchValidatorSets', height),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchBlock({ commit, dispatch }, height) {
    try {
      const response = await tendermintRpc.requestBlock(height);
      commit('setDetail', response.data);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchValidatorSets({ commit, dispatch }, height) {
    try {
      const response = await tendermintRpc.requestValidatorSets(height);
      commit('setValidatorSets', response.data.result.validators);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },

  async fetchTransactions({ dispatch, getters }, height) {
    const params = {
      events: `tx.height = ${height}`,
    };
    await dispatch('getTransactions', { params });
    while (getters['blockTxsNextKey']) {
      await dispatch('getValidators', {
        params,
        pagination: { key: getters['blockTxsNextKey'] },
      });
    }
  },

  async getTransactions({ commit, dispatch }, { params, pagination }) {
    try {
      const response = await tx.requestTxsList(params, pagination);
      commit('addTransactions', response.data.tx_responses);
      commit('setBlockTxsPagination', response.data.pagination);
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
