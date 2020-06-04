const TABLE_NAME = 'skills';
exports.seed = (knex, Promise) => {
  knex(TABLE_NAME)
    .del()
    .then(() => {
      knex(TABLE_NAME).insert([
        {
          user_id: 92,
          skill: 'APP_DEVELOPMENT',
          description: '',
        },
        {
          user_id: 92,
          skill: 'DATABASE_MANAGEMENT',
          description: '',
        },
        {
          user_id: 92,
          skill: 'WEB_DEVELOPMENT',
          description: '',
        },
        {
          user_id: 92,
          skill: 'WEB_DESIGN',
          description: '',
        },
        {
          user_id: 92,
          skill: 'ART',
          description: '',
        },
        {
          user_id: 92,
          skill: 'AUTO',
          description: '',
        },
      ]);
    });
};
