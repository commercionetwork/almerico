/**
 * TRANSACTIONS STATE
 * 
 * @typedef {Object} TransactionsState
 * @property {Array.<Object>} transactions
 * @property {Boolean} hasNext
 * @property {Boolean} isLoading
 * @property {Number} currentPage
 * @property {Object} details
 * @property {String} error
 * @property {String} filter
 * @property {String} version
 */

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const initialState = {
  currentPage: 1,
  details: null,
  error: "",
  filter: "",
  hasNext: false,
  isLoading: false,
  transactions: [],
  version: '',
};

export default {
  namespaced: true,
  initialState,
  state: {
    ...initialState
  },
  actions,
  getters,
  mutations,
};