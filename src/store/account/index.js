import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  balances: [],
  delegations: [],
  error: null,
  isLoading: false,
  isAddingTxs: false,
  membership: null,
  membershipTxs: [],
  rewards: null,
  transactions: [],
  transactionsOffset: 0,
  transactionsPagination: [],
  unbondings: [],
  unbondingsOffset: 0,
  unbondingsPagination: null,
};

export default {
  namespaced: true,
  initialState,
  state: {
    ...initialState,
  },
  getters,
  actions,
  mutations,
};
