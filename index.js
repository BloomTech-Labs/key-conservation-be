const WebSocket = require('ws');
const server = require('./app');
const log = require('./app/logger');

const port = process.env.PORT || 8000;

// Set up WebSocket server
const wss = new WebSocket.Server({
  port: 8080,
  server: server.listen(port, () => {
    log.info(`listening on port ${port}`);
  }),
});

wss.on('connection', (ws) => {
  console.log('connected');
  ws.on('message', (message) => {
    console.log(`Recieved message => ${message}`);
  });
  ws.send('hello!');
});
