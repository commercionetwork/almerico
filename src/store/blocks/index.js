/**
 *
 * @typedef {Object} BlocksState
 * @property {Array.<Object>} blocks
 * @property {Boolean} isLoading
 * @property {Number} currentHeight
 * @property {Object} details
 * @property {Object} latest
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  blocks: [],
  currentHeight: 1,
  details: null,
  isLoading: false,
  latest: null,
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
