const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const restricted = require('../middleware/restricted');
const Users = require('../users/users-model');
const secrets = require('../config/secrets');

const router = express.Router()

router.post('/register', async (req, res, next) => {
  try {
    const registered = await Users.add(req.body)

    res.status(201).json(registered)
  } catch (err) {
    next(err)
  }
});

// Error: Error: Undefined binding(s) detected when compiling FIRST. Undefined column(s): [username] query: select `id`, `username`, `department` from `users` where `username` = ? limit ?

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const user = await Users.findByUsername({ username }).first()
    const passwordValid = await bcrypt.compare(password, user.password)

    if (user && passwordValid) {

      const token = jwt.sign({
        subject: user.id,
        username: user.username
      }, secrets.jwt, {
        expiresIn: '10d'
      })

      res.status(200).json({
        token: token,
        message: `Welcome, ${user.username}. You have successfully logged in`
      })
    } else {
      res.status(401).json({
        message: 'You shall not pass!'
      })
    }
  } catch (err) {
    next(err)
  };
});

router.get('/restricted', restricted(), async (req, res, next) => {
  try {
    res.json({
      message: 'You are authorized.',
      userId: req.userId
    })
  } catch (err) {
    next(err)
  }
});


module.exports = router