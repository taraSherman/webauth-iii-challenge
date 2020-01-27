// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const Users = require('../users/users-model');
const secrets = require('../config/secrets');

module.exports = () => {
  return (req, res, next) => {
    try {
      const token = req.headers.authorization
      const decoded = jwt.verify(token, secrets.jwt)

      // req.userId = decoded.subject
      next()
    } catch (err) {
      return res.status(401).json({
        message: 'You shall not pass!'
      })
    }
  }
}



// function restricted() {
//   return async (req, res, next) => {
//     try {
//       const token = req.headers.authorization;
//       const decoded = jwt.verify(token, secrets);

//       req.userId = decoded.userId
//       next()
//     } catch (err) {
//       return res.status(401).json ({
//         message: 'You shall not pass!'
//       })
//     }
//   }
// };

// module.exports = {
//   restricted
// };

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if(authorization) {

//   const secret = process.env.JWT_SECRET || 'is it secret, is it safe?';

//     jwt.verify(authorization, secret, function(err, decodedToken) {
//       if(err) {
//         res.status(401).json({ message: 'You shall not pass!' });
//       } else {
//         req.token = decodedToken;
//         next();
//       }
//     });
//   } else {
//     res.status(400).json({ message: 'Try logging in again.'})
//   }
// };