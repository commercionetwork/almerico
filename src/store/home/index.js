import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  isLoadingParams: false,
  isLoadingTxs: false,
  params: null,
  paramsUpdates: [],
  paramsUpdatesOffset: 0,
  paramsUpdatesPagination: null,
  setParamsEventHeight: '',
  startingDate: '',
  tokensChart: null,
  transactions: [],
  txEventHeight: '',
  chartEventTokens: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
