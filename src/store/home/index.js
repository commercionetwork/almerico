import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  abrTokens: [],
  error: null,
  freezedTokens: [],
  isLoading: false,
  isLoadingParams: false,
  isLoadingTxs: false,
  params: null,
  paramsUpdates: [],
  paramsUpdatesOffset: 0,
  paramsUpdatesPagination: null,
  pool: null,
  setParamsEventHeight: '',
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
