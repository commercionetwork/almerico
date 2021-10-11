import http from './http';
import { STATUS } from '@/constants';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async init({ dispatch, commit }) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    const statuses = [
      STATUS.VALIDATOR.BONDED,
      STATUS.VALIDATOR.UNBONDED,
      STATUS.VALIDATOR.UNBONDING,
    ];
    await Promise.all([
      dispatch('fetchNodeInfo'),
      dispatch('fetchParams'),
      dispatch('fetchPool'),
      dispatch('fetchTokens'),
      dispatch('blocks/fetchLatestBlock', null, { root: true }),
      dispatch(
        'validators/initValidators',
        { statuses: statuses },
        { root: true },
      ),
    ]);
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchNodeInfo({ dispatch, commit }) {
    try {
      const response = await http.requestNodeInfo();
      commit('setNodeInfo', response.data);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchParams({ dispatch, commit }) {
    try {
      const response = await http.requestStakingParameters();
      commit('setParams', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchPool({ dispatch, commit }) {
    try {
      const response = await http.requestPool();
      commit('setPool', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchTokens({ dispatch, commit }) {
    try {
      const response = await http.requestAllTokens();
      commit('setTokens', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} commit
   * @param {Object} error
   */
  handleError({ commit }, error) {
    if (error.response) {
      commit('setError', error.response);
    } else if (error.request) {
      commit('setError', error);
    } else {
      commit('setServerReachability', false, {
        root: true,
      });
    }
  },
};
