const { WebSocketManager } = require('./app/websockets');
const app = require('./app');
const log = require('./app/logger');

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  log.info(`listening on port ${port}`);
});

WebSocketManager.start(server);
