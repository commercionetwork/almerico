/**
 * STARTING STATE
 *
 * @typedef {Object} StartingState
 * @property {Boolean} isLoading
 * @property {Object} error
 * @property {Object} nodeInfo
 * @property {Object} params
 * @property {Object} pool
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  error: null,
  isLoading: false,
  nodeInfo: null,
  params: null,
  pool: null,
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
