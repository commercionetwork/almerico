import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  isAddingTxs: false,
  balances: [],
  commission: null,
  delegations: [],
  delegationsPagination: null,
  membership: null,
  membershipTxs: [],
  rewards: null,
  transactions: [],
  transactionsOffset: 0,
  transactionsPagination: [],
  unbondings: [],
  unbondingsPagination: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
