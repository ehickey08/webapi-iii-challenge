const express = require('express');
const helmet = require('helmet');
const usersRouter = require('./users/usersRouter');
const postsRouter = require('./posts/postsRouter');
const { logger } = require('./middleware');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(logger);
server.use('/users', usersRouter);
server.use('/posts', postsRouter);

server.get('/', (req, res) => {
    res.status(200).json({test: "Server is working"})
});
module.exports = server;
