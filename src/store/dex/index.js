import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: undefined,
  isLoading: false,
  isHandling: false,
  hasWallet: false,
  balances: [],
  contract: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
