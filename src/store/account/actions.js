import http from './http';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async getAccount({ dispatch, commit }, address) {
    commit('startLoading');
    await Promise.all([
      // dispatch('fetchMembership', address),
      // dispatch('fetchBuyMembershipTx', address),
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
      const response = await http.requestBalances(address);
      commit('setBalances', response.data.balances);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchDelegations({ dispatch, commit }, address) {
    try {
      const response = await http.requestDelegations(address);
      commit('setDelegations', response.data.delegation_responses);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  //TODO: add  dispatch param
  async fetchMembership({ commit }, address) {
    try {
      const response = await http.requestMembership(address);
      commit('setMembership', response.data.result);
    } catch (error) {
      commit('setMembership', null);
      //TODO: Enable when resolved CORS type error in devnet
      // if (error.response && error.response.status === 404) {
      //   commit('setMembership', null);
      // } else {
      //   dispatch('handleError', error, { root: true });
      // }
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
      let response = await http.requestSearchTransactions({
        query: query,
        page: 1,
        limit: 1,
      });
      const pageTotal = response.data.page_total;
      if (parseInt(pageTotal) < 1) {
        commit('setBuyMembershipTx', null);
        return;
      }
      response = await http.requestSearchTransactions({
        query: query,
        page: pageTotal,
        limit: 1,
      });
      commit('setBuyMembershipTx', response.data.txs[0]);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchRewards({ dispatch, commit }, address) {
    try {
      const response = await http.requestRewards(address);
      commit('setRewards', response.data.rewards);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   * @param {String} address
   */
  async fetchUnbondings({ dispatch, commit }, address) {
    try {
      const response = await http.requestUnbondings(address);
      commit('setUnbondings', response.data.unbonding_responses);
    } catch (error) {
      dispatch('handleError', error, { root: true });
    }
  },
};
