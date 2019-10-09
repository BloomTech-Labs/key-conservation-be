
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('speciesHabitats', species => {
      species.increments('spec_hab_id');
      species.text('spec_hab_name')
        .unique()
        .notNullable()
      species.string('spec_hab_photo')
        .notNullable()
        // add a default photo if none is included
      species.text('spec_hab_type')
        .notNullable()
        // either 'species' or 'habitat'
    })
    .createTable('conservationCats', cats => {
      cats.increments('consv_cat_id');
      cats.integer('conservation_id')
        .notNullable()
        .unsigned()
        .references('cons_id')
        .inTable('conservationists')
      cats.integer('spec_hab_id')
        .notNullable()
        .unsigned()
        .references('spec_hab_id')
        .inTable('speciesHabitats')
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('campaignCats')
    .dropTableIfExists('speciesHabitats')
};


// search turtle
// - campaigns
// - conservationists
// - species
// if ('species.type' === 'species') {
//   do this
// } else {
//   do that
// }