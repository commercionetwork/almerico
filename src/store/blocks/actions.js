import { tendermintRpc, tx } from '@/apis/http';
import { BLOCKS } from '@/constants';

export default {
  async initBlocksList({ commit, dispatch }, lastHeight) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchBlocks', lastHeight)];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchBlocks({ commit, dispatch }, height) {
    const requests = setUpBlocksRequests({
      height,
      items: BLOCKS.TABLE_ITEMS,
      commit,
      dispatch,
    });
    await Promise.all(requests);
  },

  async addBlocksItem({ commit, dispatch }, height) {
    try {
      const resBlock = await tendermintRpc.requestBlock(height);
      const resValidatorSets = await tendermintRpc.requestValidatorSets(height);
      commit('addBlock', { ...resBlock.data, ...resValidatorSets.data.result });
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async addBlocks({ commit, dispatch }, height) {
    commit('setAddingBlocks', true);
    await dispatch('fetchBlocks', height);
    commit('setAddingBlocks', false);
  },

  async searchBlocks({ commit, dispatch }, height) {
    commit('setBlocks', []);
    commit('setCurrentHeight', '');
    commit('setSearching', true);
    const requests = setUpBlocksRequests({
      height,
      items: BLOCKS.SEARCH_ITEMS,
      commit,
      dispatch,
    });
    await Promise.all(requests);
    commit('setSearching', false);
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

  async fetchBlock({ commit, dispatch }, height) {
    try {
      const response = await tendermintRpc.requestBlock(height);
      commit('setDetail', response.data);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchValidatorSets({ commit, dispatch }, height) {
    try {
      const response = await tendermintRpc.requestValidatorSets(height);
      commit('setValidatorSets', response.data.result.validators);
    } catch (error) {
      dispatch('handleError', error);
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
      dispatch('handleError', error);
    }
  },

  handleError({ commit }, error) {
    commit('setError', error);
  },
};

const setUpBlocksRequests = ({ height, items, commit, dispatch }) => {
  const requests = [];
  let maxHeight = parseInt(height);
  let minHeight = maxHeight - items > 0 ? maxHeight - items : 0;
  while (maxHeight > minHeight) {
    requests.push(dispatch('addBlocksItem', maxHeight--));
  }
  commit('setCurrentHeight', minHeight);
  return requests;
};
