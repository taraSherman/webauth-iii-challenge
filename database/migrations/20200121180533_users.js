exports.up = async function (knex) {
  await knex.schema.createTable('users', users => {
    users.increments();
    users.string('username', 128)
      .notNullable()
      .unique()
    users.string('password', 128)
      .notNullable()
    users.string('department')
      .notNullable()
  })
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('users')
};