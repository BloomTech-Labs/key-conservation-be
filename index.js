const { WebSocketManager } = require('./app/websockets');
const app = require('./app');
const log = require('./app/logger');

WebSocketManager.start();

const port = process.env.PORT || 8000;

app.listen(port, () => {
  log.info(`listening on port ${port}`);
});
