import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initialState = {
  abrTokens: [],
  accounts: [],
  error: null,
  freezedTokens: null,
  isLoading: false,
  pool: null,
  supply: [],
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
