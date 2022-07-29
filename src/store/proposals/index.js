import actions from './actions';
import getters from './getters';
import mutations from './mutations';

import { PROPOSALS } from '@/constants';

export const initState = () => ({
  error: null,
  isLoading: false,
  list: [],
  filter: PROPOSALS.STATUS.UNSPECIFIED,
  detail: null,
  pool: null,
});

export default {
  namespaced: true,
  state: initState(),
  getters,
  mutations,
  actions,
};
