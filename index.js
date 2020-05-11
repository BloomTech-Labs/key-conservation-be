const http = require('http');
const app = require('./app');
const { WebSocketManager } = require('./app/websockets');
const log = require('./app/logger');

const port = process.env.PORT || 8000;

const server = http.createServer(app);

WebSocketManager.start(server);

server.listen(port, () => {
  log.info(`listening on port ${port}`);
});
