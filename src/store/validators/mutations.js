import { initState } from './index';

export default {
  reset(state) {
    Object.assign(state, initState());
  },
  setError(state, error) {
    state.error = error;
  },
  setLoading(state, payload) {
    state.isLoading = payload;
  },
  setUpdating(state, payload) {
    state.isUpdating = payload;
  },
  setDetail(state, payload) {
    state.detail = payload;
  },
  setMissedBlocksCounter(state, payload) {
    state.missedBlocksCounter = payload;
  },
  setList(state, payload) {
    state.list = payload;
  },
  setDelegations(state, payload) {
    state.delegations = payload;
  },
  addDelegations(state, payload) {
    state.delegations.push(...payload);
  },
  setDelegationsPagination(state, payload) {
    state.delegationsPagination = payload;
  },
  setFilter(state, payload) {
    state.filter = payload;
  },
  setLoadingWallet(state, payload) {
    state.isLoadingWallet = payload;
  },
  setWalletItem(state, payload) {
    state.wallet = { ...state.wallet, ...payload };
  },
  addWalletDelegations(state, payload) {
    state.wallet['delegations'].push(...payload);
  },
  addWalletUnbondings(state, payload) {
    state.wallet['unbondings'].push(...payload);
  },
  setWalletDelegationsPagination(state, payload) {
    state.walletDelegationsPagination = payload;
  },
  setWalletUnbondingsPagination(state, payload) {
    state.walletUnbondingsPagination = payload;
  },
  resetWallet(state) {
    state.walletDelegationsPagination = null;
    state.walletUnbondingsPagination = null;
    for (const k in state.wallet) {
      state.wallet[k] = [];
    }
  },
};
