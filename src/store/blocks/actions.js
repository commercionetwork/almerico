/**
 * BLOCKS ACTIONS
 */

import api from './api';

export default {
  /**
   *
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} height
   */
  async getBlock({ dispatch, commit }, height) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    try {
      const response = await api.requestBlock(height);
      commit('setBlockDetails', response.data);
    } catch (error) {
      dispatch('handleError', error);
    } finally {
      commit('stopLoading');
    }
  },
  /**
   * @param {Function} commit
   */
  async fetchLatestBlock({ commit }) {
    const response = await api.requestLatestBlock();
    commit('setLatestBlock', response.data.block);
  },
  /**
   * @param {Function} commit
   * @param {Number} height
   * @param {Number} items
   */
  async fetchBlocks({ commit }, { height, items }) {
    const maxHeight = parseInt(height);
    const minHeight = maxHeight - items > 0 ? maxHeight - items : 0;
    const requests = setUpBlocksRequests(maxHeight, minHeight);
    const responses = await Promise.all(requests);
    for (const response of responses) {
      commit('addSingleBlock', response.data.block);
    }
    commit('changeHeight', minHeight);
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} maxHeight
   * @param {Number} items
   */
  async getBlocks({ dispatch, commit }, { maxHeight, items }) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    commit('clearAllBlocks');
    try {
      await dispatch('fetchBlocks', {
        height: maxHeight,
        items: items,
      });
    } catch (error) {
      dispatch('handleError', error);
    } finally {
      commit('stopLoading');
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} currentHeight
   * @param {Number} items
   */
  async addBlocks({ dispatch, commit }, { currentHeight, items }) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    try {
      await dispatch('fetchBlocks', {
        height: currentHeight,
        items: items,
      });
    } catch (error) {
      dispatch('handleError', error);
    } finally {
      commit('stopLoading');
    }
  },
  /**
   * @param {Function} commit
   * @param {Object} error
   */
  handleError({ commit }, error) {
    if (error.response) {
      commit('setError', JSON.stringify(error.response.data));
    } else if (error.request) {
      commit('setError', JSON.stringify(error));
    } else {
      commit('setServerReachability', false, {
        root: true,
      });
    }
  },
};

const setUpBlocksRequests = (maxHeight, minHeight) => {
  let requests = [];
  while (maxHeight > minHeight) {
    requests.push(api.requestBlock(maxHeight));
    maxHeight--;
  }
  return requests;
};
