const https = require('https');
const app = require('./app');
const { WebSocketManager } = require('./app/websockets');
const log = require('./app/logger');

const port = process.env.PORT || 8000;

const server = https.createServer(app);

app.listen(port, () => {
  log.info(`listening on port ${port}`);
});

WebSocketManager.start(server);
