exports.up = function (knex, Promise) {
  return knex.schema.createTable('conservationists', (tbl) => {
    tbl.increments('cons_id');
    tbl
      .integer('users_id')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('users')
      .onDelete('RESTRICT')
      .onUpdate('CASCADE');
    tbl.string('org_name', 50);
    tbl.string('org_link_url', 500);
    tbl.string('org_link_text', 50);
    tbl.string('org_cta', 500);
    tbl.text('about_us', 1000);
    tbl.text('issues', 1000);
    tbl.text('support_us', 1000);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('conservationists');
};
