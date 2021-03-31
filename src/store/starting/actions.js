import api from './api';
import { STATUS, WS } from '@/constants';

export default {
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchInitData({ dispatch, commit }) {
    commit('startLoading');
    commit('setServerReachability', true, {
      root: true,
    });
    const statuses = [
      STATUS.VALIDATOR.BONDED,
      STATUS.VALIDATOR.UNBONDED,
      STATUS.VALIDATOR.UNBONDING,
    ];
    await Promise.all([
      dispatch('fetchNodeInfo'),
      dispatch('fetchParams'),
      dispatch('fetchPool'),
      dispatch('fetchConversionRate'),
      dispatch('fetchRateUpdates'),
      dispatch('blocks/fetchLatestBlock', null, { root: true }),
      dispatch(
        'validators/initValidators',
        { statuses: statuses },
        { root: true },
      ),
    ]);
    dispatch('subscribeWebSocket');
    commit('stopLoading');
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchNodeInfo({ dispatch, commit }) {
    try {
      const response = await api.requestNodeInfo();
      commit('setNodeInfo', response.data);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchParams({ dispatch, commit }) {
    try {
      const response = await api.requestStakingParameters();
      commit('setParams', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchPool({ dispatch, commit }) {
    try {
      const response = await api.requestPool();
      commit('setPool', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchConversionRate({ dispatch, commit }) {
    try {
      const response = await api.requestConversionRate();
      commit('setConversionRate', response.data.result);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  async fetchRateUpdates({ dispatch, commit }) {
    const updates = [];
    const limit = 30;
    let page = 1;
    try {
      let response = await api.requestRateUpdates({ page, limit });
      if (response.data.page_total == 0) {
        return;
      }
      response.data.txs.forEach((tx) => updates.push(tx));
      if (response.data.page_total > 1) {
        while (page < response.data.page_total) {
          page++;
          response = await api.requestRateUpdates({ page, limit });
          response.data.txs.forEach((tx) => updates.push(tx));
        }
      }
      commit('setRateUpdates', updates);
    } catch (error) {
      dispatch('handleError', error);
    }
  },
  /**
   * @param {Function} dispatch
   * @param {Function} commit
   */
  subscribeWebSocket({ dispatch, commit }) {
    const client = new WebSocket(WS.URL);
    let connected = false;

    client.onopen = function() {
      if (!connected) {
        Object.values(WS.EVENTS).forEach((event) => {
          const msg = JSON.stringify({
            jsonrpc: '2.0',
            method: 'subscribe',
            id: 0,
            params: {
              query: `tm.event='${event}'`,
            },
          });
          client.send(msg);
        });
        connected = true;
      }
    };

    client.onmessage = function(evt) {
      let eventData = JSON.parse(evt.data);
      let type =
        eventData.result.data != undefined
          ? eventData.result.data.type.replace('tendermint/event/', '')
          : null;
      switch (type) {
        case WS.EVENTS.NEW_BLOCK:
          commit('blocks/setLatestBlock', eventData.result.data.value.block, {
            root: true,
          });
          break;
        case WS.EVENTS.TX:
          dispatch(
            'transactions/fetchBlockTransactions',
            eventData.result.data.value.TxResult.height,
            {
              root: true,
            },
          );
          dispatch(
            'validators/initValidators',
            {
              statuses: [
                STATUS.VALIDATOR.BONDED,
                STATUS.VALIDATOR.UNBONDED,
                STATUS.VALIDATOR.UNBONDING,
              ],
            },
            {
              root: true,
            },
          );
          break;
        case WS.EVENTS.VALIDATOR_SET_UPDATES:
          commit(
            'validators/setLatestValidatorsSets',
            eventData.result.data.value.validator_updates,
            {
              root: true,
            },
          );
          break;
        default:
          break;
      }
    };

    client.onerror = function(evt) {
      commit('setError', evt.error);
    };

    client.onclose = function() {
      connected = false;
    };
  },
  /**
   * @param {Function} commit
   * @param {Object} error
   */
  handleError({ commit }, error) {
    if (error.response) {
      commit('setError', error.response);
    } else if (error.request) {
      commit('setError', error);
    } else {
      commit('setServerReachability', false, {
        root: true,
      });
    }
  },
};
