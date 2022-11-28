import { Semaphore } from 'async-mutex';

import { bank, distribution, staking } from '@/apis/http';
import { CONFIG, STATS } from '@/constants';
import { bech32Manager } from '@/utils';

export default {
  async initAccountsBalance({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchAccounts')];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchAccounts({ commit }) {
    const chain = _getChain();
    const requests = _buildAccountsBalanceRequests(chain.addresses);
    try {
      const responses = await _fetchAll(requests);
      for (const res of responses) {
        commit('addWallet', res);
      }
    } catch (error) {
      commit('setError', error);
    }
  },
};

const _getChain = () => {
  const chainIndex = STATS.CHAIN.LIST.findIndex(
    (item) => item.lcd === process.env.VUE_APP_LCD
  );
  return chainIndex > -1
    ? STATS.CHAIN.LIST[chainIndex]
    : STATS.CHAIN.LIST[STATS.CHAIN.DEFAULT_INDEX];
};

const _buildAccountsBalanceRequests = (addresses) => {
  const requests = [];
  addresses.forEach((address) => {
    requests.push(
      _fetchBalances(address),
      _fetchCommission(address),
      _fetchDelegations(address),
      _fetchRewards(address),
      _fetchUnbondings(address)
    );
  });
  return requests;
};

const _fetchBalances = async (address) => {
  const response = await bank.requestBalances(address);
  return { address, value: response.data.balances };
};

const _fetchCommission = async (address) => {
  const hex = bech32Manager.decode(address);
  const validator = bech32Manager.encode(
    hex,
    CONFIG.PREFIXES.VALIDATOR.OPERATOR.ADDRESS
  );
  const response = await distribution.requestCommission(validator);
  return { address, value: response.data.commission.commission };
};

const _fetchDelegations = async (address) => {
  const response = await staking.requestDelegations(address);
  const delegations = [];
  response.data.delegation_responses.forEach((res) =>
    delegations.push(res.balance)
  );
  return {
    address,
    value: delegations,
  };
};

const _fetchRewards = async (address) => {
  const response = await distribution.requestRewards(address);
  return { address, value: response.data.total };
};

const _fetchUnbondings = async (address) => {
  let offset = 0;
  const unbonding_responses = [];
  let response = await _getUnbondings(address, offset);
  response.data.unbonding_responses.forEach((res) => {
    res.entries.forEach((entry) =>
      unbonding_responses.push({
        amount: entry.balance,
        denom: 'ucommercio',
      })
    );
  });
  const total = response.data.pagination.total;
  offset = response.data.offset;
  while (total > offset) {
    response = await _getUnbondings(address, offset);
    response.data.unbonding_responses.forEach((res) => {
      res.entries.forEach((entry) =>
        unbonding_responses.push({
          amount: entry.balance,
          denom: 'ucommercio',
        })
      );
    });
    offset = response.data.offset;
  }
  return { address, value: unbonding_responses };
};

const _getUnbondings = async (address, offset) => {
  const pagination = {
    offset,
  };
  const response = await staking.requestUnbondings(address, pagination);
  const newOffset = offset + response.data.unbonding_responses.length;
  return { data: response.data, offset: newOffset };
};

const _fetchAll = async (requests) => {
  const semaphore = new Semaphore(STATS.SEMAPHORE_ITEMS);
  const wallets = [];
  for (const request of requests) {
    // eslint-disable-next-line no-unused-vars
    const [_, release] = await semaphore.acquire();
    const response = await request;
    if (response.value.length > 0) wallets.push(response);
    release();
  }
  return wallets;
};
