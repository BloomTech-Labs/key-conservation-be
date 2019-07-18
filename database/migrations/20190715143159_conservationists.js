exports.up = function(knex, Promise) {
  return knex.schema.createTable('conservationists', tbl => {
    tbl.increments('id');
    // tbl
    //   .integer('users_id')
    //   .notNullable()
    //   .unsigned()
    //   .references('id')
    //   .inTable('users')
    //   .onDelete('RESTRICT')
    //   .onUpdate('CASCADE');
    tbl.string('org_name', 255);
    tbl.string('org_link', 1000).notNullable();
    tbl.text('about_us', 1000).notNullable();
    tbl.text('species', 1000);
    tbl.text('habitats', 1000);
    tbl.text('issues', 1000);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('conservationists');
};
