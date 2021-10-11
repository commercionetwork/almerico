/**
 *
 * @typedef {Object} DashboardState
 * @property {Array.<Object>} rateUpdates
 * @property {Boolean} isLoading
 * @property {String} conversionRate
 * @property {String} startingDate
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  conversionRate: '',
  isLoading: false,
  rateUpdates: [],
  startingDate: '',
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
