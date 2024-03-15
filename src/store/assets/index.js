import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  isHandling: false,
  isInvalid: true,
  supply: [],
  list: [],
  balances: null,
  detail: null,
  newCW20: null,
  government: '',
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
