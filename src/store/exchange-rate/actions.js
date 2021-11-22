import { auth, bank, commercio, staking } from '@/apis/http';
import { SETTINGS } from '@/constants';

export default {
  async initExchangeRate({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchAbrTokens'),
      dispatch('fetchAccounts'),
      dispatch('fetchFreezedTokens'),
      dispatch('fetchPool'),
      dispatch('fetchSupply'),
      dispatch('fetchVbrTokens'),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchAbrTokens({ dispatch, commit }) {
    try {
      const response = await commercio.requestAbrTokens();
      commit('setAbrTokens', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchAccounts({ dispatch, commit }) {
    const accounts = SETTINGS.SPREADSHEET_ACCOUNTS
      ? JSON.parse(SETTINGS.SPREADSHEET_ACCOUNTS)
      : [];
    if (!accounts.length) return;
    try {
      for (const account of accounts) {
        const response = await bank.requestBalancesLegacy(account.address);
        account.balances = response.data.result;
        commit('addAccount', account);
      }
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchFreezedTokens({ dispatch, commit }) {
    try {
      const response = await auth.requestFreezedTokensLegacy();
      commit('setFreezedTokens', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchPool({ commit, dispatch }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchSupply({ dispatch, commit }) {
    try {
      const response = await bank.requestSupply();
      commit('setSupply', response.data.supply);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  async fetchVbrTokens({ dispatch, commit }) {
    try {
      const response = await commercio.requestVbrTokens();
      commit('setVbrTokens', response.data.funds);
    } catch (error) {
      dispatch('handleError', error);
    }
  },

  handleError({ commit }, error) {
    commit('setError', error);
  },
};
