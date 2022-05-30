import { bank, commercio, staking } from '@/apis/http';
import { CONFIG } from '@/constants';

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

  async fetchAbrTokens({ commit }) {
    try {
      const response = await commercio.requestAbrTokens();
      commit('setAbrTokens', response.data.funds);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchAccounts({ commit }) {
    const accounts = JSON.parse(CONFIG.SPREADSHEET_ACCOUNTS);
    if (!accounts.length) return;
    try {
      for (const account of accounts) {
        const response = await bank.requestBalances(account.address);
        account.balances = response.data.balances;
        commit('addAccount', account);
      }
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchFreezedTokens({ commit }) {
    try {
      const response = await bank.requestBalances(CONFIG.MINTER_ACCOUNT);
      commit('setFreezedTokens', response.data.balances);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchPool({ commit }) {
    try {
      const response = await staking.requestPool();
      commit('setPool', response.data.pool);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchSupply({ commit }) {
    try {
      const response = await bank.requestSupply();
      commit('setSupply', response.data.supply);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchVbrTokens({ commit }) {
    try {
      const response = await commercio.requestVbrTokens();
      commit('setVbrTokens', response.data.funds);
    } catch (error) {
      commit('setError', error);
    }
  },
};
