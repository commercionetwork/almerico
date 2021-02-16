/**
 * VALIDATORS ACTIONS
 */

import api from './api';

export default {
  /**
   * @param {Function} commit
   */
  async fetchLatestValidatorSets({ commit }) {
    const response = await api.requestLatestValidatorSets();
    commit('setLatestValidatorsSets', response.data.result.validators);
  },
  /**
   * @param {Function} commit
   * @param {String} status
   * @param {Number} page
   * @param {Number} limit
   */
  async fetchValidatorsList({ commit }, { status, page, limit }) {
    const response = await api.requestValidatorsList({
      status,
      page,
      limit,
    });
    if (response.data.result.length > 0) {
      commit('addValidators', response.data.result);
    }
  },
  /**
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {Array.<String>} status
   * @param {Number} page
   * @param {Number} limit
   */
  async initValidators({ commit, dispatch }, { status, page, limit }) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    commit('setValidators', []);
    try {
      await dispatch('fetchLatestValidatorSets');
      [...status].forEach(async (el) => {
        await dispatch('fetchValidatorsList', {
          status: el,
          page: page,
          limit: limit,
        });
      });
    } catch (error) {
      dispatch('handleError', error);
    } finally {
      commit('stopLoading');
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {ValidatorsState} state
   * @param {Number} height
   */
  async fetchValidatorsetsFromHeight({ dispatch, commit }, height) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    try {
      const response = await api.requestValidatorsetsFromHeight(height);
      commit('setHeightValidatorsSets', response.data.result.validators);
    } catch (error) {
      dispatch('handleError', error);
    } finally {
      commit('stopLoading');
    }
  },
  /**
   * @param {Function} commit
   * @param {Object} filter
   */
  setValidatorsFilter({ commit }, filter) {
    commit('setFilter', filter);
  },
  /**
   * @param {Function} commit
   * @param {String} address
   */
  async fetchValidatorDetails({ commit }, address) {
    const response = await api.requestValidatorDetails(address);
    commit('setDetails', response.data.result);
  },
  /**
   * @param {Function} commit
   * @param {String} address
   */
  async fetchValidatorDelegations({ commit }, address) {
    const response = await api.requestValidatorDelegations(address);
    commit('addDetails', {
      delegations: response.data.result,
    });
  },
  /**
   * @param {Function} commit
   * @param {String} id
   */
  async fetchValidatorPicture({ commit }, id) {
    const response = await api.requestValidatorPictures(id);
    if (response.data.them && response.data.them.length > 0) {
      response.data.them.forEach((item) => {
        if ('primary' in item['pictures']) {
          commit('addDetails', {
            picture: item['pictures']['primary']['url'],
          });
          return;
        }
      });
    }
  },
  /**
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {ValidatorsState} state
   * @param {String} id
   */
  async getValidatorData({ commit, dispatch, state }, { address }) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    commit('resetDetails');
    try {
      await dispatch('fetchValidatorDetails', address);
      await dispatch('fetchValidatorDelegations', address);
      if (state.details.description.identity != '') {
        await dispatch(
          'fetchValidatorPicture',
          state.details.description.identity
        );
      }
    } catch (error) {
      dispatch('handleError', error);
    } finally {
      commit('stopLoading');
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
