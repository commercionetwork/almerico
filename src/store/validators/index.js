/**
 *
 * @typedef {Object} ValidatorsState
 * @property {Array.<Object>} heightValidatorsSets
 * @property {Array.<Object>} latestValidatorsSets
 * @property {Array.<Object>} validators
 * @property {Boolean} isLoading
 * @property {Object} details
 * @property {Object} filter
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  details: null,
  filter: null,
  heightValidatorsSets: [],
  isLoading: false,
  latestValidatorsSets: [],
  validators: [],
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
