import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: undefined,
  isLoading: false,
  isFetching: false,
  isHandling: false,
  hasWallet: true,
  detail: null,
  list: [],
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
