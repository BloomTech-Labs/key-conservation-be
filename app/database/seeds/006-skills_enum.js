const TABLE_NAME = 'skill_enum';
// COMPLETED
exports.seed = (knex, Promise) => {
  knex(TABLE_NAME)
    .del()
    .then(() => {
      knex(TABLE_NAME).insert([
        {
          skill: 'ACCOUNTING',
        },
        {
          skill: 'ARCHITECTURE',
        },
        {
          skill: 'AUTO',
        },
        {
          skill: 'APP_DEVELOPMENT',
        },
        {
          skill: 'ART',
        },
        {
          skill: 'AVIATION',
        },
        {
          skill: 'BOATING',
        },
        {
          skill: 'BUSINESS_DEVELOPMENT',
        },
        {
          skill: 'CAMERA_TRAPS',
        },
        {
          skill: 'COMMUNICATION',
        },
        {
          skill: 'COMMUNITY_LIAISON',
        },
        {
          skill: 'CONSTRUCTION',
        },
        {
          skill: 'CRAFT',
        },
        {
          skill: 'CULINARY',
        },
        {
          skill: 'DATA_ANALYSIS',
        },
        {
          skill: 'DATABASE_MANAGEMENT',
        },
        {
          skill: 'DIVING',
        },
        {
          skill: 'DRONE',
        },
        {
          skill: 'ELECTRICITY',
        },
        {
          skill: 'ENGINEERING',
        },
        {
          skill: 'ENTREPRENEURSHIP',
        },
        {
          skill: 'FINANCE',
        },
        {
          skill: 'FUNDRAISING',
        },
        {
          skill: 'GAMING',
        },
        {
          skill: 'GRAPHIC_DESIGN',
        },
        {
          skill: 'HOSPITALITY',
        },
        {
          skill: 'HUMAN_RESOURCES',
        },
        {
          skill: 'INFORMATION_TECHNOLOGY',
        },
        {
          skill: 'LANDSCAPE',
        },
        {
          skill: 'LEGAL',
        },
        {
          skill: 'MANAGEMENT',
        },
        {
          skill: 'MARKETING',
        },
        {
          skill: 'MEDICAL',
        },
        {
          skill: 'MUSICAL',
        },
        {
          skill: 'PHOTOGRAPHY',
        },
        {
          skill: 'PLUMBING',
        },
        {
          skill: 'PUBLIC_RELATIONS',
        },
        {
          skill: 'RENEWABLE_ENERGY',
        },
        {
          skill: 'RESEARCH',
        },
        {
          skill: 'SENSORS',
        },
        {
          skill: 'SOCIAL_MEDIA',
        },
        {
          skill: 'STRATEGY_CONSULTING',
        },
        {
          skill: 'TAXI',
        },
        {
          skill: 'TRANSLATION',
        },
        {
          skill: 'VETERINARY_SERVICES',
        },
        {
          skill: 'VIDEOGRAPHY',
        },
        {
          skill: 'WEB_DESIGN',
        },
        {
          skill: 'WEB_DEVELOPMENT',
        },
        {
          skill: 'WRITING',
        },
        {
          skill: 'ARTIFICIAL_INTELLIGENCE',
        },
      ]);
    });
};
