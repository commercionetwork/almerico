import { cosmwasm } from '@/apis/http';
import { CONFIG } from '@/constants';
import { stringEncoder } from '@/utils';

export default {
  async initAllBalancesDashboard({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchWasmBalances', address),
      dispatch('account/fetchBalances', address, { root: true }),
      dispatch('account/fetchMembership', address, { root: true }),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchWasmBalances({ commit, dispatch, getters }, address) {
    const balances = [];
    try {
      const requests = [
        dispatch('fetchCw20Contracts'),
        dispatch('fetchSwapContracts'),
      ];
      await Promise.all(requests);
      const contracts = removeSwapContracts(
        getters['cw20Contracts'],
        getters['swapContracts']
      );
      const all = await fetchContractsBalance(address, contracts);
      for (const el of all) {
        const entries = await fetchContractHistory(el.contract);
        if (!entries.length) {
          continue;
        }
        el.name = entries[0].msg.name;
        el.decimals = entries[0].msg.decimals;
        el.symbol = entries[0].msg.symbol;
        balances.push(el);
      }
    } finally {
      commit('setBalances', balances);
    }
  },
  async fetchCw20Contracts({ commit }) {
    let nextKey = null;
    do {
      try {
        const response = await cosmwasm.requestContracts(
          CONFIG.WASM_CW20_CODE_ID,
          { key: nextKey }
        );
        commit('addCw20Contracts', response.data.contracts);
        nextKey = response.data.pagination.next_key;
      } catch (error) {
        commit('addCw20Contracts', '');
      }
    } while (nextKey);
  },
  async fetchSwapContracts({ commit }) {
    const addresses = await fetchSwapAddresses();
    for (const address of addresses) {
      try {
        const response = await cosmwasm.requestContractState(address);
        const models = response.data.models;
        commit(
          'addSwapContract',
          stringEncoder.decodeBase64ToString(models[1].value)
        );
      } catch (error) {
        commit('addSwapContract', '');
      }
    }
  },
};

const fetchSwapAddresses = async () => {
  const addresses = [];
  let nextKey = null;
  do {
    try {
      const response = await cosmwasm.requestContracts(
        CONFIG.WASM_SWAP_CODE_ID,
        { key: nextKey }
      );
      for (const contract of response.data.contracts) {
        addresses.push(contract);
      }
      nextKey = response.data.pagination.next_key;
    } catch (error) {
      continue;
    }
  } while (nextKey);
  return addresses;
};

const removeSwapContracts = (cw20Contracts, swapContracts) => {
  const contracts = [];
  for (const cw20 of cw20Contracts) {
    if (swapContracts.includes(cw20)) {
      continue;
    } else {
      contracts.push(cw20);
    }
  }
  return contracts;
};

const fetchContractsBalance = async (address, contracts) => {
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

const fetchContractHistory = async (address) => {
  const entries = [];
  let nextKey = null;
  do {
    try {
      const response = await cosmwasm.requestContractHistory(address, {
        key: nextKey,
      });
      nextKey = response.data.pagination.next_key;
      if (response.data.entries.length > 0) {
        for (const entry of response.data.entries) {
          entries.push(entry);
        }
      }
    } catch (error) {
      continue;
    }
  } while (nextKey);
  return entries;
};
