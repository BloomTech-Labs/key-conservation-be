const server = require('./app');
const log = require('./app/logger');

const port = process.env.PORT || 8000;
server.listen(port, () => {
  log.info(`listening on port ${port}`);
});
