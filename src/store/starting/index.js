/**
 *
 * @typedef {Object} StartingState
 * @property {Array.<Object>} rateUpdates
 * @property {Boolean} isLoading
 * @property {Object} error
 * @property {Object} nodeInfo
 * @property {Object} params
 * @property {Object} pool
 * @property {String} conversionRate
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  conversionRate: '',
  error: null,
  isLoading: false,
  nodeInfo: null,
  params: null,
  pool: null,
  rateUpdates: [],
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
