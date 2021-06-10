import { STATUS, WS } from '@/constants';
import store from '../store';

export const subscribeWebSocket = () => {
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
        handleNewBlockEvent(eventData);
        break;
      case WS.EVENTS.VALIDATOR_SET_UPDATES:
        handleValidatorSetUpdates(eventData);
        break;
      case WS.EVENTS.TX:
        handleTxEvent(eventData);
        break;
      default:
        break;
    }
  };

  client.onerror = function(evt) {
    store.dispatch('starting/handleError', evt.error);
  };

  client.onclose = function() {
    connected = false;
  };
};

const handleNewBlockEvent = (data) => {
  store.commit('blocks/setLatestBlock', data.result.data.value.block);
  if (
    data.result.data.value.block.data.txs &&
    data.result.data.value.block.data.txs.length > 0
  )
    updateStoredData(data);
};

const updateStoredData = (data) => {
  store.dispatch(
    'transactions/fetchBlockTransactions',
    data.result.data.value.block.header.height,
  );
  store.dispatch('validators/initValidators', {
    statuses: [
      STATUS.VALIDATOR.BONDED,
      STATUS.VALIDATOR.UNBONDED,
      STATUS.VALIDATOR.UNBONDING,
    ],
  });
};

const handleValidatorSetUpdates = (data) => {
  store.commit(
    'validators/setLatestValidatorsSets',
    data.result.data.value.validator_updates,
  );
};

const handleTxEvent = (data) => {
  const events = data.result.data.value.TxResult.result.events;
  const index = events.findIndex(
    (event) => (event.type = WS.TX_TYPES.NEW_CONVERSION_RATE),
  );
  if (index > -1) {
    store.dispatch('dashboard/init');
  }
};
