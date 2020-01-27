const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');

function find() {
  return db('users')
    .select('id', 'username', 'department')
};

function findBy(filter) {
  return db('users')
    .where(filter)
    .select('id', 'username', 'department')
};

function findByUsername(username) {
  return db('users')
    .where(username)
    .select('id', 'username', 'password', 'department')
};

function findById(id) {
  return db("users")
    .where({ id })
    .first('id', 'username', 'department')
}

async function add(user) {
  user.password = await bcrypt.hash(user.password, 14)

  const [id] = await db('users')
    .insert(user)

  return findById(id)
};

module.exports = {
  find,
  findBy,
  findByUsername,
  findById,
  add
};