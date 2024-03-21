import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  isHandling: false,
  connection: null,
  modal: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
