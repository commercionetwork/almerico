import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  detail: null,
  error: null,
  isAddingTxs: false,
  isLoading: false,
  isRefreshing: false,
  offset: 0,
  pagination: null,
  transactions: [],
  txEventHeight: '',
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
