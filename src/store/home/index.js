import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  abrTokens: [],
  conversionRate: 1,
  isLoading: false,
  isAddingTx: false,
  pool: null,
  rateUpdates: [],
  rateUpdatesPagination: null,
  startingDate: '',
  supply: [],
  transactions: [],
  txEventHeight: '',
  vbrTokens: [],
};

export default {
  namespaced: true,
  initialState,
  state: {
    ...initialState,
  },
  getters,
  actions,
  mutations,
};
