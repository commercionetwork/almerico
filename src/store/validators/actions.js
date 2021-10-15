import http from './http';

export default {
  /**
   *
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} status
   * @param {Object} pagination
   * @returns {Promise}
   */
  async initValidatorsDashboard({ commit, dispatch }, { status, pagination }) {
    commit('setError', null, { root: true });
    commit('setValidators', []);
    commit('setPagination', null);
    commit('startLoading');
    const requests = [
      dispatch('fetchLatestValidatorSets'),
      dispatch('getValidatorsList', { status, pagination }),
    ];
    await Promise.all(requests);
    commit('stopLoading');
  },
  /**
   *
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} status
   * @param {Object} pagination
   * @returns {Promise}
   */
  async fetchValidators({ dispatch, commit }, { status, pagination }) {
    commit('setError', null, { root: true });
    commit('startLoading');
    await dispatch('getValidatorsList', { status, pagination });
    commit('stopLoading');
  },
  /**
   *
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} status
   * @param {Object} pagination
   * @returns {Promise}
   */
  async getValidatorsList({ dispatch, commit }, { status, pagination }) {
    try {
      const response = await http.requestValidatorsList({ status, pagination });
      commit('addValidators', response.data.validators);
      commit('setPagination', response.data.pagination);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchLatestValidatorSets({ dispatch, commit }) {
    try {
      const response = await http.requestLatestValidatorSets();
      commit('setLatestValidatorsSets', response.data.validators);
    } catch (error) {
      dispatch('handleError', error, { root: true });
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
    try {
      const response = await http.requestValidatorsetsFromHeight(height);
      commit('setHeightValidatorsSets', response.data.validators);
    } catch (error) {
      dispatch('handleError', error, { root: true });
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
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchValidatorDetails({ dispatch, commit }, address) {
    try {
      const response = await http.requestValidatorDetails(address);
      commit('setDetails', response.data.validator);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchValidatorDelegations({ dispatch, commit }, address) {
    try {
      const response = await http.requestValidatorDelegations(address);
      commit('addDetails', { delegations: response.data.delegation_responses });
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} commit
   * @param {Function} getters
   */
  async fetchValidatorPicture({ commit, getters }) {
    const id = getters.details ? getters.details.description.identity : '';
    if (id === '') {
      return;
    }
    try {
      const response = await http.requestValidatorPictures(id);
      if (response.data.them && response.data.them.length > 0) {
        for (const item of response.data.them) {
          if ('primary' in item['pictures']) {
            commit('addDetails', {
              picture: item['pictures']['primary']['url'],
            });
            break;
          }
        }
      }
    } catch (error) {
      commit('addDetails', {
        picture: '',
      });
    }
  },
  /**
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {String} id
   */
  async getValidatorData({ commit, dispatch }, { address }) {
    commit('startLoading');
    commit('resetDetails');
    await dispatch('fetchValidatorDetails', address);
    await dispatch('fetchValidatorDelegations', address);
    // dispatch('fetchValidatorPicture');
    commit('stopLoading');
  },
};
