import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  abrTokens: [],
  conversionRate: 1,
  error: null,
  isLoading: false,
  isFetchingTxs: false,
  pool: null,
  rateUpdates: [],
  rateUpdatesOffset: 0,
  rateUpdatesPagination: null,
  startingDate: '',
  supply: [],
  transactions: [],
  txEventHeight: '',
  vbrTokens: [],
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
