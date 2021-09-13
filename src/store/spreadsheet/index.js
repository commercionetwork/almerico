/** SpreadsheetState
 * @typedef {Object} SpreadsheetState
 * @property {Array.<Object>} abrTokens
 * @property {Array.<Object>} accountsTokens
 * @property {Array.<Object>} allTokens
 * @property {Array.<Object>} vbrTokens
 * @property {Boolean} isLoading
 * @property {Object} error
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  abrTokens: [],
  accountsTokens: [],
  allTokens: [],
  error: null,
  isLoading: false,
  vbrTokens: [],
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
