import { APIS } from '@/constants';
import wsBackendHandler from './wsBackendHandler';

let client;

const wsBackendClient = {
  get() {
    if (!client) {
      _init();
    }
    return client;
  },
};

export default wsBackendClient;

const _init = () => {
  let connected = false;

  client = new WebSocket(APIS.WS.URL_BACKEND);

  client.onopen = function () {
    if (!connected) {
      connected = true;
    }
  };

  client.onmessage = function (evt) {
    wsBackendHandler.onMessage(evt);
  };

  client.onerror = function (evt) {
    wsBackendHandler.onError(evt);
  };

  client.onclose = function () {
    connected = false;
  };
};
