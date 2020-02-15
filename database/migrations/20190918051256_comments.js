exports.up = function (knex, Promise) {
  return knex.schema.createTable('comments', (tbl) => {
    tbl.increments('comment_id');
    tbl
      .integer('users_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl
      .integer('camp_id')
      .notNullable()
      .unsigned()
      .references('camp_id')
      .inTable('campaigns')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    tbl.timestamp('created_at').defaultTo(knex.fn.now());
    tbl.text('comment_body', 500).notNullable();
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('comments');
};
