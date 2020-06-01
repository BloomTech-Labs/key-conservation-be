
exports.up = function (knex) {
    return knex.schema.alterTable('users', (tbl) => {
        tbl.integer('total_stars');
        tbl.integer('total_reviews');
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.alterTable('users', (tbl) => {
        tbl.dropColumn('total_stars');
        tbl.dropColumn('total_reviews');
    });
  };
