import http from './http';
import { CHAIN } from '@/constants';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async initSpreadsheet({ dispatch, commit }) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    await Promise.all([
      dispatch('fetchAbrTokens'),
      dispatch('fetchAccountsTokens'),
      dispatch('fetchAllTokens'),
      dispatch('fetchVbrTokens'),
    ]);
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchAbrTokens({ dispatch, commit }) {
    try {
      const response = await http.requestAbrTokens();
      commit('setAbrTokens', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchVbrTokens({ dispatch, commit }) {
    try {
      const response = await http.requestVbrTokens();
      commit('setVbrTokens', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchAllTokens({ dispatch, commit }) {
    try {
      const response = await http.requestAllTokens();
      commit('setAllTokens', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchAccountsTokens({ dispatch, commit }) {
    try {
      const accounts =
        CHAIN.SPREADSHEET_ACCOUNTS !== ''
          ? JSON.parse(CHAIN.SPREADSHEET_ACCOUNTS)
          : [];
      if (accounts.length === 0) return;
      for (const account of accounts) {
        const response = await http.requestBalances(account.address);
        account.balances = response.data.result;
        commit('addAccountTokens', account);
      }
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
