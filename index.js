require('dotenv').config();

const express = require('express');

const server = express();

const helmet = require('helmet');
const cors = require('cors');

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express());
server.use(helmet());
server.use(cors());

server.use('/api', require('./api'));

module.exports = server;

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`listening on port ${port}`);
});
