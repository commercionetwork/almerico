import { bank, distribution, staking, validators } from '@/apis/http';
import { CHAIN } from '@/constants';
import { msgBuilder } from '@/utils';

export default {
  async initValidatorsList({ commit, dispatch }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchList')];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async fetchList({ commit }) {
    try {
      const response = await validators.requestList();
      commit('setList', response.data.validators);
    } catch (error) {
      commit('setError', error);
    }
  },
  async initValidatorsDetail({ commit, dispatch }, address) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchDetail', address),
      dispatch('fetchDetailDelegations', address),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
  },
  async updateValidatorsDetail({ commit, dispatch }, address) {
    commit('setUpdating', true);
    await dispatch('fetchDetail', address);
    commit('setUpdating', false);
  },
  async fetchDetail({ commit }, address) {
    try {
      const response = await validators.requestDetail(address);
      commit('setDetail', response.data);
    } catch (error) {
      commit('setError', error);
    }
  },
  async fetchDetailDelegations({ dispatch, getters }, validator) {
    await dispatch('getDetailDelegations', { validator });
    while (getters['delegationsNextKey']) {
      await dispatch('getDetailDelegations', {
        validator,
        key: getters['delegationsNextKey'],
      });
    }
  },
  async getDetailDelegations({ commit }, { validator, key }) {
    const pagination = {
      key: key ? key : undefined,
    };
    try {
      const response = await staking.requestValidatorsDetailDelegations(
        validator,
        pagination
      );
      commit('addDelegations', response.data.delegation_responses);
      commit('setDelegationsPagination', response.data.pagination);
    } catch (error) {
      commit('setError', error);
    }
  },
  setValidatorsFilter({ commit }, filter) {
    commit('setFilter', filter);
  },
  async initWallet({ commit, dispatch, rootGetters }) {
    commit('resetWallet');
    commit('setLoadingWallet', true);
    const accounts = rootGetters['keplr/accounts'];
    const account = accounts[0].address;
    const requests = [
      dispatch('fetchAccountBalances', account),
      dispatch('fetchAccountDelegations', account),
      dispatch('fetchAccountRewards', account),
      dispatch('fetchAccountUnbondings', account),
    ];
    await Promise.all(requests);
    commit('setLoadingWallet', false);
  },
  async fetchAccountBalances({ commit }, account) {
    try {
      const response = await bank.requestBalances(account);
      commit('setWalletItem', {
        balances: response.data.balances,
      });
    } catch {
      commit('setWalletItem', { balances: [] });
      return;
    }
  },
  async fetchAccountDelegations({ dispatch, getters }, account) {
    await dispatch('getWalletDelegations', { account });
    while (getters['walletDelegationsNextKey']) {
      await dispatch('getWalletDelegations', {
        account,
        key: getters['walletDelegationsNextKey'],
      });
    }
  },
  async getWalletDelegations({ commit }, { account, key }) {
    const pagination = {
      key: key ? key : undefined,
    };
    try {
      const response = await staking.requestDelegations(account, pagination);
      commit('addWalletDelegations', response.data.delegation_responses);
      commit('setWalletDelegationsPagination', response.data.pagination);
    } catch (error) {
      commit('setWalletItem', { delegations: [] });
      return;
    }
  },
  async fetchAccountUnbondings({ dispatch, getters }, account) {
    await dispatch('getWalletUnbondings', { account });
    while (getters['walletUnbondingsNextKey']) {
      await dispatch('getWalletUnbondings', {
        account,
        key: getters['walletUnbondingsNextKey'],
      });
    }
  },
  async getWalletUnbondings({ commit }, { account, key }) {
    const pagination = {
      key: key ? key : undefined,
    };
    try {
      const response = await staking.requestUnbondings(account, pagination);
      commit('addWalletUnbondings', response.data.unbonding_responses);
      commit('setWalletUnbondingsPagination', response.data.pagination);
    } catch (error) {
      commit('setWalletItem', { unbondings: [] });
      return;
    }
  },
  async fetchAccountRewards({ commit }, account) {
    try {
      const response = await distribution.requestRewards(account);
      commit('setWalletItem', {
        rewards: response.data,
      });
    } catch (error) {
      commit('setWalletItem', { rewards: [] });
      return;
    }
  },
  async delegateTokens(
    { commit, dispatch, rootGetters },
    { validatorAddress, amount, translator, context }
  ) {
    if (!rootGetters['keplr/isInitialized']) {
      await dispatch(
        'keplr/connect',
        { translator, context },
        {
          root: true,
        }
      );
    }
    const chain = CHAIN.INFO();
    const account = rootGetters['keplr/wallet'];
    const msg = msgBuilder.buildMsgDelegate({
      validatorAddress,
      amount,
      account,
    });
    commit('setLoading', true);
    await dispatch(
      'keplr/signAndBroadcastTransaction',
      { chain, msgs: [msg] },
      { root: true }
    );
    commit('setLoading', false);
  },
  async undelegateTokens(
    { commit, dispatch, rootGetters },
    { validatorAddress, amount, translator, context }
  ) {
    if (!rootGetters['keplr/isInitialized']) {
      await dispatch(
        'keplr/connect',
        { translator, context },
        {
          root: true,
        }
      );
    }
    const chain = CHAIN.INFO();
    const account = rootGetters['keplr/wallet'];
    const msg = msgBuilder.buildMsgUndelegate({
      validatorAddress,
      amount,
      account,
    });
    commit('setLoading', true);
    await dispatch(
      'keplr/signAndBroadcastTransaction',
      { chain, msgs: [msg] },
      { root: true }
    );
    commit('setLoading', false);
  },
  async redelagateTokens(
    { commit, dispatch, rootGetters },
    { validatorAddress, srcAddress, amount, translator, context }
  ) {
    if (!rootGetters['keplr/isInitialized']) {
      await dispatch(
        'keplr/connect',
        { translator, context },
        {
          root: true,
        }
      );
    }
    const chain = CHAIN.INFO();
    const account = rootGetters['keplr/wallet'];
    const msg = msgBuilder.buildMsgBeginRedelegate({
      validatorAddress,
      srcAddress,
      amount,
      account,
    });
    commit('setLoading', true);
    await dispatch(
      'keplr/signAndBroadcastTransaction',
      { chain, msgs: [msg] },
      { root: true }
    );
    commit('setLoading', false);
  },
  async claimRewards(
    { commit, dispatch, rootGetters },
    { validators, translator, context }
  ) {
    if (!rootGetters['keplr/isInitialized']) {
      await dispatch(
        'keplr/connect',
        { translator, context },
        {
          root: true,
        }
      );
    }
    const chain = CHAIN.INFO();
    const account = rootGetters['keplr/wallet'];
    const msgs = [];
    for (const validatorAddress of validators) {
      const msg = msgBuilder.buildMsgWithdrawDelegatorReward({
        validatorAddress,
        account,
      });
      msgs.push(msg);
    }
    commit('setLoading', true);
    await dispatch(
      'keplr/signAndBroadcastTransaction',
      { chain, msgs },
      { root: true }
    );
    commit('setLoading', false);
  },
};
