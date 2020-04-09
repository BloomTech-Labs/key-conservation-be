exports.up = function (knex, Promise) {
  return knex.schema.createTable('connections', (tbl) => {
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
      .integer('connected_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('connections');
};
