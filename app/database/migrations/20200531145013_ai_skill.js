exports.up = function(knex) {
  return knex('skill_enum').insert({ skill: 'ARTIFICIAL_INTELLIGENCE' });
};

exports.down = function(knex) {
  return knex('skill_enum').where('skill', 'ARTIFICIAL_INTELLIGENCE').delete();
};
