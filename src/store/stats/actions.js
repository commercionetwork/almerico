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
    const requests = _buildAccountsBalanceRequests(STATS.ADDRESSES);
    const semaphore = new Semaphore(STATS.SEMAPHORE_ITEMS);
    for (const request of requests) {
      // eslint-disable-next-line no-unused-vars
      const [_, release] = await semaphore.acquire();
      try {
        const response = await request;
        if (response.value.length > 0) commit('addWallet', response);
      } catch (error) {
        commit('setError', error);
      } finally {
        release();
      }
    }
  },
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

const _getDelegations = async (address, key) => {
  const pagination = {
    key: key ? key : undefined,
  };
  const response = await staking.requestDelegations(address, pagination);
  return response.data;
};

const _fetchDelegations = async (address) => {
  const delegations = [];
  let key = '';
  let response = await _getDelegations(address, key);
  response.delegation_responses.forEach((res) => delegations.push(res.balance));
  key = response.pagination.next_key;
  while (key) {
    response = await _getDelegations(address, key);
    response.delegation_responses.forEach((res) =>
      delegations.push(res.balance)
    );
    key = response.pagination.next_key;
  }
  return {
    address,
    value: delegations,
  };
};

const _fetchRewards = async (address) => {
  const response = await distribution.requestRewards(address);
  return { address, value: response.data.total };
};

const _getUnbondings = async (address, key) => {
  const pagination = {
    key: key ? key : undefined,
  };
  const response = await staking.requestUnbondings(address, pagination);
  return response.data;
};

const _fetchUnbondings = async (address) => {
  const unbonding_responses = [];
  let key = '';
  let response = await _getUnbondings(address, key);
  response.unbonding_responses.forEach((res) => {
    res.entries.forEach((entry) =>
      unbonding_responses.push({
        amount: entry.balance,
        denom: 'ucommercio',
      })
    );
  });
  key = response.pagination.next_key;
  while (key) {
    response = await _getUnbondings(address, key);
    response.unbonding_responses.forEach((res) => {
      res.entries.forEach((entry) =>
        unbonding_responses.push({
          amount: entry.balance,
          denom: 'ucommercio',
        })
      );
    });
    key = response.pagination.next_key;
  }
  return { address, value: unbonding_responses };
};
