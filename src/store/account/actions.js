import api from './api';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async getAccount({ dispatch, commit }, address) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    await Promise.all([
      dispatch('fetchMembership', address),
      dispatch('fetchBuyMembershipTx', address),
      dispatch('fetchBalances', address),
      dispatch('fetchDelegations', address),
      dispatch('fetchUnbondings', address),
      dispatch('fetchRewards', address),
    ]);
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchBalances({ dispatch, commit }, address) {
    try {
      const response = await api.requestBalances(address);
      commit('setBalances', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchDelegations({ dispatch, commit }, address) {
    try {
      const response = await api.requestDelegations(address);
      commit('setDelegations', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchMembership({ dispatch, commit }, address) {
    try {
      const response = await api.requestMembership(address);
      commit('setMembership', response.data.result);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        commit('setMembership', null);
      } else {
        dispatch('handleError', error);
      }
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchBuyMembershipTx({ dispatch, commit }, address) {
    const query = `assign_membership.owner=${address}`;
    try {
      let response = await api.requestSearchTransactions({
        query: query,
        page: 1,
        limit: 1,
      });
      const pageTotal = response.data.page_total;
      if (parseInt(pageTotal) < 1) {
        commit('setBuyMembershipTx', null);
        return;
      }
      response = await api.requestSearchTransactions({
        query: query,
        page: pageTotal,
        limit: 1,
      });
      commit('setBuyMembershipTx', response.data.txs[0]);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchRewards({ dispatch, commit }, address) {
    try {
      const response = await api.requestRewards(address);
      commit('setRewards', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchUnbondings({ dispatch, commit }, address) {
    try {
      const response = await api.requestUnbondings(address);
      commit('setUnbondings', response.data.result);
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
