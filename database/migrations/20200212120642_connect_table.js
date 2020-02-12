exports.up = function(knex, Promise) {
  return knex.schema.createTable('connections', tbl => {
    tbl.increments('connection_id');
    tbl
      .integer('connector_id') // user who clicks connect
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .string('connector_role', 50)
      .notNullable()
      .references('roles')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .integer('connected_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    tbl
      .string('connected_role', 50)
      .notNullable()
      .references('roles')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('connections');
};
