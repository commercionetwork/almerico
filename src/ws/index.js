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
        store.commit(
          'blocks/setLatestBlock',
          eventData.result.data.value.block,
        );
        break;
      case WS.EVENTS.TX:
        store.dispatch(
          'transactions/fetchBlockTransactions',
          eventData.result.data.value.TxResult.height,
        );
        store.dispatch('validators/initValidators', {
          statuses: [
            STATUS.VALIDATOR.BONDED,
            STATUS.VALIDATOR.UNBONDED,
            STATUS.VALIDATOR.UNBONDING,
          ],
        });
        break;
      case WS.EVENTS.VALIDATOR_SET_UPDATES:
        store.commit(
          'validators/setLatestValidatorsSets',
          eventData.result.data.value.validator_updates,
        );
        break;
      default:
        break;
    }
    if (type === WS.EVENTS.TX) {
      const events = eventData.result.data.value.TxResult.result.events;
      const index = events.findIndex(
        (event) => (event.type = WS.TX_TYPES.NEW_CONVERSION_RATE),
      );
      if (index > -1) {
        store.dispatch('dashboard/init');
      }
    }
  };

  client.onerror = function(evt) {
    store.dispatch('starting/handleError', evt.error);
  };

  client.onclose = function() {
    connected = false;
  };
};
