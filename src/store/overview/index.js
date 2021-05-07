/**
 *
 * @typedef {Object} OverviewState
 * @property {Boolean} isLoading
 * @property {Object} error
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  error: null,
  isLoading: false,
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
