const WebSocket = require('ws');

class WebSocketManager {
  static wss;

  static getClients() {
    return this.wss.clients;
  }

  static start(server) {
    this.wss = new WebSocket.Server({
      server,
    });
  }
}

function sendWSMessage(message) {
  WebSocketManager.getClients().forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
}

module.exports = { WebSocketManager, sendWSMessage };
