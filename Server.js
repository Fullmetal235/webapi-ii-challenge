const express = require('express');

const postsRouter =require('./post/postRouter.js')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(' Welcome to the Lambda Posts API');
});

server.use('/api/posts', postsRouter);

module.exports=server;