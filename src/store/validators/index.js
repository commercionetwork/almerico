import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { VALIDATORS } from '@/constants';

export const initState = () => ({
  blocks: [],
  delegations: [],
  detail: null,
  error: null,
  filter: {
    status: VALIDATORS.FILTER.ACTIVE,
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
