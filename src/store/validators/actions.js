import { keybase, staking, tendermintRpc } from '@/apis/http';
import { CONFIG, VALIDATORS } from '@/constants';
import { bech32Manager, blocksRequestHelper, regExpBuilder } from '@/utils';

const controller = new AbortController();
const signal = controller.signal;

export default {
  async initValidatorsList({ commit, dispatch }, lastHeight) {
    commit('reset');
    commit('setLoading', true);
    const requests = [dispatch('fetchPool'), dispatch('fetchValidatorsLogo')];
    await Promise.all(requests);
    commit('setLoading', false);
    if (process.env.VUE_APP_BLOCKS_MONITOR === 'true') {
      dispatch('fetchTrackedBlocks', lastHeight);
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

  async fetchValidatorsLogo({ commit, rootState }) {
    try {
      const validators = rootState.application.validators;
      const validatorsWithLogo = await _setValidatorsLogo(validators);
      commit('application/setValidators', validatorsWithLogo, { root: true });
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
    dispatch('setAccount', id);
    const requests = [
      dispatch('fetchDetail', id),
      dispatch('fetchDetailDelegations', id),
      dispatch('fetchPool'),
    ];
    await Promise.all(requests);
    commit('setLoading', false);
    if (process.env.VUE_APP_BLOCKS_MONITOR === 'true') {
      dispatch('fetchTrackedBlocks', lastHeight);
    }
  },

  setAccount({ commit }, address) {
    try {
      const hex = bech32Manager.decode(address);
      const account = bech32Manager.encode(
        hex,
        CONFIG.PREFIXES.ACCOUNT.ADDRESS
      );
      commit('setAccount', account);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchDetail({ commit, dispatch }, id) {
    try {
      const response = await staking.requestValidatorsDetail(id);
      commit('setDetail', response.data.validator);
      const identity = response.data.validator.description.identity || '';
      if (identity) await dispatch('fetchDetailLogo', identity);
    } catch (error) {
      commit('setError', error);
    }
  },

  async fetchDetailLogo({ commit }, identity) {
    try {
      const response = await Promise.race([
        keybase.requestValidatorLogo(identity, signal),
        _wait(),
      ]);
      if (!response.data.them || !response.data.them.length) {
        commit('setDetailLogo', '');
        controller.abort();
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

const _wait = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve(504), CONFIG.REST_LEAD_TIME)
  );

const _setValidatorsLogo = async (validators) => {
  return Promise.all(
    validators.map(async (validator) => {
      const identity = validator.description.identity;
      const validatorIdentityRegExp =
        regExpBuilder.getValidatorIdentityRegExp();
      if (!identity || !validatorIdentityRegExp.test(identity)) {
        return validator;
      }
      let response;
      try {
        response = await Promise.race([
          keybase.requestValidatorLogo(identity, signal),
          _wait(),
        ]);
        if (
          !response.data ||
          !response.data.them ||
          !response.data.them.length
        ) {
          controller.abort();
          return validator;
        }
        for (const item of response.data.them) {
          if ('primary' in item['pictures']) {
            validator['logo'] = item['pictures']['primary']['url'];
            break;
          }
        }
        return validator;
      } catch (error) {
        throw new Error(error);
      }
    })
  );
};
