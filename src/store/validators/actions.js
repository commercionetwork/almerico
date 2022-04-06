import { keybase, staking, tendermintRpc } from '@/apis/http';
import { CONFIG, VALIDATORS } from '@/constants';
import { bech32Manager, blocksRequestHelper } from '@/utils';

export default {
  async initValidatorsList({ commit, dispatch }, lastHeight) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchPool')];
    await Promise.all(requests);
    commit('setLoading', false);
    if (process.env.VUE_APP_BLOCKS_MONITOR === 'true') {
      requests.push(dispatch('fetchTrackedBlocks', lastHeight));
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

  async fetchTrackedBlocks({ commit, dispatch }, height) {
    commit('setLoadingBlocks', true);
    const max = parseInt(height);
    const min = parseInt(CONFIG.FIRST_HEIGHT);
    const minimumHeight = blocksRequestHelper.getMinimumHeight({
      max,
      min,
      items: VALIDATORS.CUSTOMIZATION.BLOCKS_MONITOR.AMOUNT,
    });
    const requests = blocksRequestHelper.setupRequests({
      dispatch,
      action: 'addBlocksItem',
      height: max,
      minimumHeight,
    });
    await Promise.all(requests);
    commit('setLoadingBlocks', false);
  },

  async addBlocksItem({ commit }, height) {
    try {
      const resBlock = await tendermintRpc.requestBlock(height);
      const resValidatorSets = await tendermintRpc.requestValidatorSets(height);
      commit('addBlock', { ...resBlock.data, ...resValidatorSets.data.result });
    } catch (error) {
      commit('setError', error);
    }
  },

  async initValidatorsDetail({ commit, dispatch }, { id, lastHeight }) {
    commit('reset');
    commit('setLoading', true);
    const requests = [
      dispatch('fetchDetail', id),
      dispatch('fetchDetailDelegations', id),
      dispatch('fetchPool'),
      dispatch('setAccount', id),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
    if (process.env.VUE_APP_BLOCKS_MONITOR === 'true') {
      await dispatch('fetchTrackedBlocks', lastHeight);
    }
  },

  async fetchDetail({ commit, dispatch }, id) {
    try {
      const response = await staking.requestValidatorsDetailLegacy(id);
      commit('setDetail', response.data.result);
      const identity = response.data.result.description
        ? response.data.result.description.identity
        : '';
      if (identity) await dispatch('fetchDetailLogo', identity);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchDetailLogo({ commit }, identity) {
    try {
      const response = await keybase.requestValidatorLogo(identity);
      if (!response.data.them || !response.data.them.length) {
        commit('setDetailLogo', '');
        return;
      }
      for (const item of response.data.them) {
        if ('primary' in item['pictures']) {
          commit('setDetailLogo', item['pictures']['primary']['url']);
          break;
        }
      }
    } catch (error) {
      commit('setDetailLogo', '');
    }
  },

  async setAccount({ commit }, address) {
    try {
      const hex = await bech32Manager.decode(address);
      const account = await bech32Manager.encode(
        hex,
        CONFIG.PREFIXES.ACCOUNT.ADDRESS
      );
      commit('setAccount', account);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchDetailDelegations({ dispatch, getters }, id) {
    await dispatch('addDetailDelegations', { id });
    while (getters['delegationsTotal'] > getters['delegationsOffset']) {
      await dispatch('addDetailDelegations', {
        id,
        offset: getters['delegationsOffset'],
      });
    }
  },

  async addDetailDelegations({ commit }, { id, offset }) {
    const pagination = {
      offset: offset ? offset : 0,
    };
    try {
      const response = await staking.requestValidatorsDetailDelegations(
        id,
        pagination
      );
      commit('addDelegations', response.data.delegation_responses);
      commit('setDelegationsPagination', response.data.pagination);
      commit('sumDelegationsOffset', response.data.delegation_responses.length);
    } catch (error) {
      commit('setError', error);
    }
  },

  async updateBlocksMonitor({ commit, dispatch }, height) {
    commit('setLoadingBlocks', true);
    await dispatch('addBlocksItem', height);
    commit('setLoadingBlocks', false);
  },

  setValidatorsFilter({ commit }, filter) {
    commit('setFilter', filter);
  },
};
