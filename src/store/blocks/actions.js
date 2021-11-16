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
    commit('setBlockTxsOffset', 0);
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
    await dispatch('addTransactions', { height });
    while (getters['blockTxsTotal'] > getters['blockTxsOffest']) {
      await dispatch('addTransactions', {
        height,
        offset: getters['blockTxsOffest'],
      });
    }
  },

  async addTransactions({ commit, dispatch }, { height, offset }) {
    const parameters = {
      events: `tx.height = ${height}`,
    };
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await tx.requestTxsList(parameters, pagination);
      commit('addTransactions', response.data.tx_responses);
      commit('setBlockTxsPagination', response.data.pagination);
      commit('sumBlockTxsOffset', response.data.tx_responses.length);
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
