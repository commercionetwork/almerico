import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  abrTokens: [],
  accounts: [],
  error: null,
  freezedTokens: null,
  isLoading: false,
  pool: null,
  supply: [],
  vbrTokens: [],
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
