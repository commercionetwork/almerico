import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  blocks: [],
  delegations: [],
  detail: null,
  error: null,
  filter: {
    active: true,
    query: '',
  },
  isLoading: false,
  newHeight: '',
  pool: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
