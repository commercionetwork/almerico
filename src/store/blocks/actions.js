import http from './http';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} height
   */
  async getBlock({ dispatch, commit }, height) {
    commit('startLoading');
    try {
      const response = await http.requestBlock(height);
      commit('setBlockDetails', response.data);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    } finally {
      commit('stopLoading');
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchLatestBlock({ dispatch, commit }) {
    try {
      const response = await http.requestLatestBlock();
      commit('setLatestBlock', response.data.block);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} height
   * @param {Number} items
   */
  async fetchBlocks({ dispatch, commit }, { height, items }) {
    const maxHeight = parseInt(height);
    const minHeight = maxHeight - items > 0 ? maxHeight - items : 0;
    const requests = setUpBlocksRequests(maxHeight, minHeight);
    try {
      const responses = await Promise.all(requests);
      for (const response of responses) {
        commit('addSingleBlock', response.data.block);
      }
      commit('changeHeight', minHeight);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} maxHeight
   * @param {Number} items
   */
  async getBlocks({ dispatch, commit }, { maxHeight, items }) {
    dispatch('handleError', null, { root: true });
    commit('startLoading');
    commit('clearAllBlocks');
    await dispatch('fetchBlocks', {
      height: maxHeight,
      items: items,
    });
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {Number} currentHeight
   * @param {Number} items
   */
  async addBlocks({ dispatch, commit }, { currentHeight, items }) {
    commit('startLoading');
    await dispatch('fetchBlocks', {
      height: currentHeight,
      items: items,
    });
    commit('stopLoading');
  },
};

const setUpBlocksRequests = (maxHeight, minHeight) => {
  let requests = [];
  while (maxHeight > minHeight) {
    requests.push(http.requestBlock(maxHeight));
    maxHeight--;
  }
  return requests;
};
