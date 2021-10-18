import http from './http';
import { VALIDATOR_STATUS } from '@/constants';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async init({ dispatch, commit }) {
    dispatch('handleError', null, { root: true });
    commit('startLoading');
    let requests = [
      dispatch('fetchTokens'),
      dispatch('fetchNodeInfo'),
      dispatch('fetchParams'),
      dispatch('fetchPool'),
      dispatch('blocks/fetchLatestBlock', null, { root: true }),
      dispatch('validators/fetchLatestValidatorSets', null, { root: true }),
    ];
    for (const status in VALIDATOR_STATUS) {
      requests.push(
        dispatch(
          'validators/getValidatorsList',
          { status: VALIDATOR_STATUS[status] },
          { root: true },
        ),
      );
    }
    await Promise.all(requests);
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
      commit('setParams', response.data.params);
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
      commit('setPool', response.data.pool);
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
      commit('setTokens', response.data.supply);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
};
