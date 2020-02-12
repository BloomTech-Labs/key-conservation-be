const skills = [
  'ACCOUNTING',
  'ARCHITECTURE',
  'AUTO',
  'APP_DEVELOPMENT',
  'ART',
  'AVIATION',
  'BOATING',
  'BUSINESS_DEVELOPMENT',
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
  'SOCIAL_MEDIA',
  'STRATEGY_CONSULTING',
  'TAXI',
  'TRANSLATION',
  'VETERINARY_SERVICES',
  'VIDEOGRAPHY',
  'WEB_DESIGN',
  'WEB_DEVELOPMENT',
  'WRITING'
];

exports.up = function(knex) {
  return knex.schema
    .createTable('skills', tbl => {
      tbl.increments('id');
      tbl.integer('user_id').unsigned().references('users.id').notNullable().index();
      tbl.enum('skill', skills, { useNative: true, enumName: 'enum_skills' }).notNullable().index();
      tbl.unique(['user_id', 'skill'])
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('skills');
};
