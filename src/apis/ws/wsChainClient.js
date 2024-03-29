import { APIS } from '@/constants';
import wsHandler from './wsChainHandler';

let client;

const wsChainClient = {
  get() {
    if (!client) {
      _init();
    }
    return client;
  },
};

export default wsChainClient;

const _init = () => {
  let connected = false;

  client = new WebSocket(APIS.WS.URL);

  client.onopen = function () {
    if (!connected) {
      Object.values(APIS.WS.EVENTS).forEach((event) => {
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

  client.onmessage = function (evt) {
    wsHandler.onMessage(evt.data);
  };

  client.onerror = function (evt) {
    wsHandler.onError(evt);
  };

  client.onclose = function () {
    connected = false;
  };
};
