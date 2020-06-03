const skills = [
  'ACCOUNTING',
  'ARCHITECTURE',
  'AUTO',
  'APP_DEVELOPMENT',
  'ART',
  'AVIATION',
  'BOATING',
  'BUSINESS_DEVELOPMENT',
  'CAMERA_TRAPS',
  'COMMUNICATION',
  'COMMUNITY_LIAISON',
  'CONSTRUCTION',
  'CRAFT',
  'CULINARY',
  'DATA_ANALYSIS',
  'DATABASE_MANAGEMENT',
  'DIVING',
  'DRONE',
  'ELECTRICITY',
  'ENGINEERING',
  'ENTREPRENEURSHIP',
  'FINANCE',
  'FUNDRAISING',
  'GAMING',
  'GRAPHIC_DESIGN',
  'HOSPITALITY',
  'HUMAN_RESOURCES',
  'INFORMATION_TECHNOLOGY',
  'LANDSCAPE',
  'LEGAL',
  'MANAGEMENT',
  'MARKETING',
  'MEDICAL',
  'MUSICAL',
  'PHOTOGRAPHY',
  'PLUMBING',
  'PUBLIC_RELATIONS',
  'RENEWABLE_ENERGY',
  'RESEARCH',
  'SENSORS',
  'SOCIAL_MEDIA',
  'STRATEGY_CONSULTING',
  'TAXI',
  'TRANSLATION',
  'VETERINARY_SERVICES',
  'VIDEOGRAPHY',
  'WEB_DESIGN',
  'WEB_DEVELOPMENT',
  'WRITING',
];

exports.up = function (knex) {
  console.log("sadf");
  return knex.schema.createTable('skill_enum', (tbl) => {
    tbl.string('skill').primary();
  })
    .then(() => knex('skill_enum').insert(skills.map((skill) => ({ skill }))))
    .then(() => knex.schema.alterTable('skills', (tbl) => {
      tbl.string('skill').notNullable().references('skill_enum.skill').alter();
    }))
    .then(() => knex.schema.alterTable('skilled_impact_requests', (tbl) => {
      tbl.string('skill').notNullable().references('skill_enum.skill').alter();
    }))
    .then(() => knex.raw('DROP TYPE enum_skills'));
};

exports.down = function () {
  return knex.schema.dropTable('skill_enum');
};
