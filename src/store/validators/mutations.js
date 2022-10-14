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
  setList(state, payload) {
    state.list = payload;
  },
  setDelegations(state, payload) {
    state.delegations = payload;
  },
  addDelegations(state, payload) {
    state.delegations.push(...payload);
  },
  setDelegationsOffset(state, payload) {
    state.delegationsOffset = payload;
  },
  sumDelegationsOffset(state, payload) {
    state.delegationsOffset += payload;
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
  addWalletUnbondings(state, payload) {
    state.wallet['unbondings'].push(...payload);
  },
  setWalletUnbondingsPagination(state, payload) {
    state.setWalletUnbondingsPagination = payload;
  },
  sumWalletUnbondingsOffset(state, payload) {
    state.walletUnbondingsOffset += payload;
  },
  resetWallet(state) {
    state.walletUnbondingsOffset = 0;
    state.setWalletUnbondingsPagination = null;
    for (const k in state.wallet) {
      state.wallet[k] = [];
    }
  },
};
