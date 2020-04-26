require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(express());
server.use(helmet());
server.use(cors());

server.use('/api', require('./api'));

module.exports = server;
