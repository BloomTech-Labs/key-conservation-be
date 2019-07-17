const express = require('express');
const server = express();

const helmet = require('helmet');
const cors = require('cors');

server.use(express.json());
server.use(express());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`<h1>Server live</h1>`);
});

// defined routes
server.use('/api/cons', require('../Routes/consRouter'));

module.exports = server;
