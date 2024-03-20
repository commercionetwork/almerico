import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  isFetching: false,
  isHandling: false,
  isInvalid: true,
  connection: null,
  supply: [],
  list: [],
  balances: null,
  modal: null,
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
