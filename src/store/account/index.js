/**
 *
 * @typedef {Object} AccountState
 * @property {Array.<Object>} balances
 * @property {Array.<Object>} delegations
 * @property {Array.<Object>} unbondings
 * @property {Boolean} isLoading
 * @property {Object} buyMembershipTx
 * @property {Object} membership
 * @property {Object} rewards
 */

import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const initialState = {
  balances: [],
  buyMembershipTx: null,
  delegations: [],
  isLoading: false,
  membership: null,
  rewards: null,
  unbondings: [],
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
