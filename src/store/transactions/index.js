import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  detail: null,
  isAddingTxs: false,
  isLoading: false,
  offset: 0,
  pagination: null,
  transactions: [],
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
