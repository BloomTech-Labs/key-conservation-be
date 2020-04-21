require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const log = require('./logger');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express());
server.use(helmet());
server.use(cors());

server.use('/api', require('./api'));

module.exports = server;

const port = process.env.PORT || 8000;
server.listen(port, () => {
  log.info(`Listening on port ${port}`);
});
