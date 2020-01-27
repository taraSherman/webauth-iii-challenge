const express = require("express")
const helmet = require("helmet")
const cors = require("cors")

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router');

const morgan = require("morgan")

const server = express();

server.use(helmet());
server.use(cors());
server.use(morgan('dev'));
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res, next) => {
  res.send(`
  <h2>WebAuth III Challenge</h2>
  `)
});

server.use((err, req, res, next) => {
  console.log('Error:', err)
  res.status(500).json({
    message: 'Something went wrong...'
  })
});

module.exports = server;