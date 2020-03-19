import {
  WS
} from "Constants";


const webSocketManager = {
  /**
   * Function to subscribe WebSocket event  
   * 
   * @param {Object} message
   * @param {Function} onMessage
   */
  subscribeWebSocketEvent(message, onMessage) {
    let webSocket = new WebSocket(WS);
    let msg = JSON.stringify(message);

    webSocket.onopen = function () {
      webSocket.send(msg);
    };

    webSocket.onclose = function () { };

    webSocket.onmessage = function (evt) {
      let data = evt.data;
      onMessage(data);
    };

    webSocket.onerror = function (evt) {
      throw evt.data;
    };
  },
};

export default webSocketManager;