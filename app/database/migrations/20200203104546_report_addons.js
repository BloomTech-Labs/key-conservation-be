exports.up = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('reported_posts')
    .createTable('user_reports', (tbl) => {
      tbl.increments('id');
      // Who reported this item?
      tbl
        .integer('reported_by')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT');
      // Who got reported?
      tbl
        .integer('reported_user')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT');
      // What is the ID of the reported item (if any)?
      tbl.integer('post_id').unsigned();
      // What table does the reported item belong to (if any)?
      tbl.string('table_name');

      // A text description of the report (Why was this reported?)
      // ** Note: On the frontend, this will be a description a user
      // can select from a set of options
      tbl.string('report_desc');
      // When was this report made?
      tbl.timestamp('reported_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists('user_reports')
    .createTable('reported_posts', (tbl) => {
      tbl.increments('id');
      // Who reported this item?
      tbl
        .integer('reported_by')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT');
      // What is the ID of the reported item?
      tbl
        .integer('post_id')
        .notNullable()
        .unsigned();
      // What table does the reported item belong to?
      tbl.string('table_name').notNullable();
      // A text description of the report (Why was this reported?)
      // ** Note: On the frontend, this will be a description a user
      // can select from a set of options
      tbl.string('report_desc');
      // When was this report made?
      tbl.timestamp('reported_at').defaultTo(knex.fn.now());
    });
};
