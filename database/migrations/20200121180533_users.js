exports.up = async function (knex) {
  await knex.schema.createTable('users', users => {
    users.increments();
    users.string('username')
      .notNullable()
      .unique()
    users.string('password')
      .notNullable()
    users.string('department')
      .notNullable()
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('users')
};