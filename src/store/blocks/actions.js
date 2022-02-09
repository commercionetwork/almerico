import { tendermintRpc, tx } from '@/apis/http';
import { BLOCKS, CONFIG } from '@/constants';
import { blocksRequestHelper } from '@/utils';

export default {
  async initBlocksList({ commit, dispatch }, lastHeight) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchBlocks', lastHeight)];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchBlocks({ commit, dispatch }, height) {
    const max = typeof height === 'number' ? height : parseInt(height);
    const min = parseInt(CONFIG.FIRST_HEIGHT);
    const minimumHeight = blocksRequestHelper.getMinimumHeight({
      max,
      min,
      items: BLOCKS.TABLE_ITEMS,
    });
    const requests = blocksRequestHelper.setupRequests({
      dispatch,
      action: 'addBlocksItem',
      height: max,
      minimumHeight,
    });
    await Promise.all(requests);
    commit('setCurrentHeight', minimumHeight);
  },

  async searchBlocks({ commit, dispatch }, height) {
    commit('setBlocks', []);
    commit('setCurrentHeight', '');
    commit('setSearching', true);
    const max = typeof height === 'number' ? height : parseInt(height);
    const min = parseInt(CONFIG.FIRST_HEIGHT);
    const minimumHeight = blocksRequestHelper.getMinimumHeight({
      max,
      min,
      items: BLOCKS.SEARCH_ITEMS,
    });
    const requests = blocksRequestHelper.setupRequests({
      dispatch,
      action: 'addBlocksItem',
      height: max,
      minimumHeight,
    });
    await Promise.all(requests);
    commit('setCurrentHeight', minimumHeight);
    commit('setSearching', false);
  },

  async addBlocksItem({ commit }, height) {
    try {
      const resBlock = await tendermintRpc.requestBlock(height);
      const resValidatorSets = await tendermintRpc.requestValidatorSets(height);
      commit('addBlock', { ...resBlock.data, ...resValidatorSets.data.result });
    } catch (error) {
      commit('setError', error);
    }
  },

  async addBlocks({ commit, dispatch }, height) {
    commit('setAddingBlocks', true);
    await dispatch('fetchBlocks', height);
    commit('setAddingBlocks', false);
  },

  async initBlocksDetail({ commit, dispatch }, height) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchBlock', height),
      dispatch('fetchTransactions', height),
      dispatch('fetchValidatorSets', height),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchBlock({ commit }, height) {
    try {
      const response = await tendermintRpc.requestBlock(height);
      commit('setDetail', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchValidatorSets({ commit }, height) {
    try {
      const response = await tendermintRpc.requestValidatorSets(height);
      commit('setValidatorSets', response.data.result.validators);
    } catch (error) {
      commit('setError', error);
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

  async addTransactions({ commit }, { height, offset }) {
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
      commit('setError', error);
    }
  },
};
