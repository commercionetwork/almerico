const webSocketManager = {
  /**
   * Function to subscribe WebSocket event  
   * 
   * @param {WebSocket} client
   * @param {String} message
   * @param {Function} onMessage
   */
  subscribeWebSocketEvent(client, message, onMessage) {
    client.onopen = function () {
      client.send(message);
    };

    client.onclose = function () { };

    client.onmessage = function (evt) {
      let data = evt.data;
      onMessage(data);
    };

    client.onerror = function (evt) {
      throw evt.data;
    };
  },
};

export default webSocketManager;