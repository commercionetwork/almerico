/**
 *
 * @typedef {Object} StartingState
 * @property {Array.<Object>} tokens
 * @property {Boolean} isLoading
 * @property {Object} nodeInfo
 * @property {Object} params
 * @property {Object} pool
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  isLoading: false,
  nodeInfo: null,
  params: null,
  pool: null,
  tokens: [],
};

export default {
  namespaced: true,
  initialState,
  state: {
    ...initialState,
  },
  actions,
  getters,
  mutations,
};
