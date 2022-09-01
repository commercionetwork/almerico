import {
  bank,
  commercio,
  cosmwasm,
  distribution,
  staking,
  tx,
} from '@/apis/http';
import { ACCOUNT, APIS, CONFIG } from '@/constants';
import { bech32Manager, stringEncoder } from '@/utils';

export default {
  async initAccountDashboard({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchBalances', address),
      dispatch('fetchCommission', address),
      dispatch('fetchDelegations', address),
      dispatch('fetchMembership', address),
      dispatch('fetchMembershipTxs', address),
      dispatch('fetchRewards', address),
      dispatch('fetchUnbondings', address),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
    await dispatch('fetchTransactions', { address });
  },

  async fetchBalances({ commit }, address) {
    try {
      const response = await bank.requestBalances(address);
      commit('setBalances', response.data.balances);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchCommission({ commit }, address) {
    try {
      const hex = bech32Manager.decode(address);
      const validator = bech32Manager.encode(
        hex,
        CONFIG.PREFIXES.VALIDATOR.OPERATOR.ADDRESS
      );
      const response = await distribution.requestCommission(validator);
      commit('setCommission', response.data.commission);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchDelegations({ commit }, address) {
    try {
      const response = await staking.requestDelegations(address);
      commit('setDelegations', response.data.delegation_responses);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchRewards({ commit }, address) {
    try {
      const response = await distribution.requestRewards(address);
      commit('setRewards', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchUnbondings({ dispatch, getters }, address) {
    await dispatch('addUnbondings', { address });
    while (getters['unbondingsTotal'] > getters['unbondingsOffset']) {
      await dispatch('addUnbondings', {
        address,
        offset: getters['unbondingsOffset'],
      });
    }
  },

  async addUnbondings({ commit }, { address, offset }) {
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await staking.requestUnbondings(address, pagination);
      commit('addUnbondings', response.data.unbonding_responses);
      commit('setUnbondingsPagination', response.data.pagination);
      commit('sumUnbondingsOffset', response.data.unbonding_responses.length);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchMembership({ commit }, address) {
    try {
      const response = await commercio.requestMembership(address);
      commit('setMembership', response.data.membership);
    } catch (error) {
      commit('setMembership', null);
    }
  },

  async fetchMembershipTxs({ commit }, address) {
    const parameters = { events: `assign_membership.owner='${address}'` };
    try {
      const response = await tx.requestTxsList(parameters);
      commit('setMembershipTxs', response.data.tx_responses);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchTransactions({ commit }, { address, offset }) {
    const parameters = {
      events: `transfer.sender='${address}'`,
      order_by: APIS.SORTING_ORDERS.ORDER_BY_DESC,
    };
    const pagination = {
      limit: ACCOUNT.TRANSACTIONS_NUMBER,
      offset: offset ? offset : 0,
    };
    commit('setAddingTxs', true);
    try {
      const response = await tx.requestTxsList(parameters, pagination);
      commit('addTransactions', response.data.tx_responses);
      commit('setTransactionsPagination', response.data.pagination);
      commit('sumTransactionsOffset', response.data.tx_responses.length);
    } catch (error) {
      commit('setTransactions', []);
    }
    commit('setAddingTxs', false);
  },

  async addTransactions({ dispatch }, { address, offset }) {
    await dispatch('fetchTransactions', { address, offset });
  },

  async initAccountBalance({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchBalances', address),
      dispatch('fetchMembership', address),
      dispatch('fetchWasmBalances', address),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },

  async fetchWasmBalances({ commit }, address) {
    const balances = [];
    try {
      const contracts = await _fetchContracts();
      if (!contracts.length) {
        commit('setAllBalances', balances);
        return;
      }
      const all = await _fetchContractsBalance(address, contracts);
      for (const el of all) {
        const entries = await _fetchContractHistory(el.contract);
        if (!entries.length) {
          continue;
        }
        el.name = entries[0].msg.name;
        el.decimals = entries[0].msg.decimals;
        el.symbol = entries[0].msg.symbol;
        balances.push(el);
      }
      commit('setAllBalances', balances);
    } catch (error) {
      commit('setAllBalances', balances);
    }
  },
};

const _fetchContracts = async () => {
  try {
    const response = await cosmwasm.requestContracts(CONFIG.WASM_CODE_ID);
    return response.data.contracts;
  } catch (error) {
    return [];
  }
};

const _fetchContractsBalance = async (address, contracts) => {
  const all = [];
  try {
    const obj = { balance: { address } };
    const query_data = stringEncoder.encodeObjToBase64(obj);
    for (const contract of contracts) {
      const response = await cosmwasm.requestContractBalance(
        contract,
        query_data
      );
      if (parseFloat(response.data.data.balance) > 0) {
        all.push({ contract, balance: response.data.data.balance });
      }
    }
    return all;
  } catch (error) {
    return all;
  }
};

const _fetchContractHistory = async (address) => {
  try {
    const response = await cosmwasm.requestContractHistory(address);
    return response.data.entries;
  } catch (error) {
    return [];
  }
};
