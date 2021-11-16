import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  balances: [],
  delegations: [],
  isLoading: false,
  isAddingTxs: false,
  membership: null,
  membershipTxs: [],
  rewards: null,
  transactions: [],
  transactionsOffset: 0,
  transactionsPagination: [],
  unbondings: [],
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
