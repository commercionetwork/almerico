/**
 * Account state
 */

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

export const initialState = {
  balances: [],
  delegations: [],
  isFetching: false,
  membership: "",
  message: "",
  rewards: null,
  unbondingDelegations: [],
};

export default {
  namespaced: true,
  initialState,
  state: {
    ...initialState
  },
  getters,
  actions,
  mutations
};
