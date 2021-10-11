import http from './http';
import { STATUS } from '@/constants';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async init({ dispatch, commit }) {
    commit('startLoading');
    const statuses = [
      STATUS.VALIDATOR.BONDED,
      STATUS.VALIDATOR.UNBONDED,
      STATUS.VALIDATOR.UNBONDING,
    ];
    await Promise.all([
      dispatch('fetchNodeInfo'),
      dispatch('fetchParams'),
      dispatch('fetchPool'),
      // dispatch('fetchTokens'),
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
      dispatch('handleError', error, { root: true });
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
      dispatch('handleError', error, { root: true });
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
      dispatch('handleError', error, { root: true });
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
      dispatch('handleError', error, { root: true });
    }
  },
};
