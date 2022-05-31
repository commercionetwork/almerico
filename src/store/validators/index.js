import { VALIDATORS } from '@/constants';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

export const initState = () => ({
  error: null,
  isLoading: false,
  detail: null,
  list: [],
  newUpdate: false,
  delegations: [],
  delegationsOffset: 0,
  delegationsPagination: null,
  filter: {
    status: VALIDATORS.FILTER.ACTIVE,
    query: '',
  },
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
