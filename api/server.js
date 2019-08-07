const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser')
const path = require('path')
const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRouter');
const { logger } = require('./middleware');
const apiDocsPath = path.join( __dirname, "../apidoc" );

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
server.use('/users', usersRouter);
server.use('/posts', postsRouter);

server.use( "/", express.static( apiDocsPath ) );
server.use( bodyParser.urlencoded( { extended: true } ) );

module.exports = server;
