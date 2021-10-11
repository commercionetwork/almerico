import http from './http';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchLatestValidatorSets({ dispatch, commit }) {
    try {
      const response = await http.requestLatestValidatorSets();
      commit('setLatestValidatorsSets', response.data.result.validators);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} status
   * @param {Number} page
   * @param {Number} limit
   */
  async fetchValidatorsList({ dispatch, commit }, { status, page, limit }) {
    try {
      const response = await http.requestValidatorsList({
        status,
        page,
        limit,
      });
      if (response.data.result.length > 0) {
        commit('addValidators', response.data.result);
      }
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} commit
   * @param {Function} dispatch
   * @param {Array.<String>} statuses
   * @param {Number} page
   * @param {Number} limit
   */
  async initValidators({ commit, dispatch }, { statuses, page, limit }) {
    commit('startLoading');
    commit('setValidators', []);
    let requests = [dispatch('fetchLatestValidatorSets')];
    for (const status of statuses) {
      requests.push(
        dispatch('fetchValidatorsList', {
          status: status,
          page: page,
          limit: limit,
        }),
      );
    }
    await Promise.all(requests);
    commit('stopLoading');
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
      commit('setHeightValidatorsSets', response.data.result.validators);
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
      commit('setDetails', response.data.result);
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
      commit('addDetails', { delegations: response.data.result });
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
    dispatch('fetchValidatorPicture');
    commit('stopLoading');
  },
};
