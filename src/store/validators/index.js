import { VALIDATORS } from '@/constants';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  isUpdating: false,
  detail: null,
  list: [],
  delegations: [],
  delegationsOffset: 0,
  delegationsPagination: null,
  filter: {
    status: VALIDATORS.FILTER.ACTIVE,
    query: '',
  },
  isLoadingWallet: false,
  wallet: {
    balances: [],
    delegations: [],
    rewards: [],
    unbondings: [],
  },
  walletDelegationsOffset: 0,
  walletDelegationsPagination: null,
  walletUnbondingsOffset: 0,
  walletUnbondingsPagination: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
