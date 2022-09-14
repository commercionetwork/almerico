import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: undefined,
  isLoading: false,
  wallets: [],
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
