/**
 *
 * @typedef {Object} TransactionsState
 * @property {Array.<Object>} transactions
 * @property {Boolean} hasNext
 * @property {Boolean} isLoading
 * @property {Number} currentPage
 * @property {Object} details
 * @property {String} filter
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  currentPage: 1,
  details: null,
  filter: '',
  hasNext: false,
  isLoading: false,
  transactions: [],
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
