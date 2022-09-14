import { auth, bank } from '@/apis/http';

export default {
  async initAccountsBalance({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchAccounts')];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchAccounts({ commit }) {
    try {
      const response = await auth.requestAccounts(1000);
      const requests = _buildAccountsBalanceRequests(response.data.accounts);
      const responses = await Promise.all(requests);
      for (const res of responses) {
        commit('addWallet', res);
      }
    } catch (error) {
      commit('setError', error);
    }
  },
};

const _buildAccountsBalanceRequests = (accounts) => {
  const requests = [];
  accounts.forEach((account) => {
    const address = account.address;
    if (address) {
      requests.push(_fetchBalances(address));
    }
  });
  return requests;
};

const _fetchBalances = async (address) => {
  const response = await bank.requestBalances(address);
  return { address, balances: response.data.balances };
};
