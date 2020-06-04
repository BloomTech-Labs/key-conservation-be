const TABLE_NAME = 'skills';
//  COMPLETED
exports.seed = (knex, Promise) => {

  return knex(TABLE_NAME)
    .del()
    .then(() => knex(TABLE_NAME).insert([
        {
          user_id: 53,
          skill: 'APP_DEVELOPMENT',
          
        },
        {
          user_id: 53,
          skill: 'DATABASE_MANAGEMENT',

        },
        {
          user_id: 53,
          skill: 'WEB_DEVELOPMENT',

        },
        {
          user_id: 53,
          skill: 'WEB_DESIGN',

        },
        {
          user_id: 53,
          skill: 'ART',

        },
        {
          user_id: 53,
          skill: 'AUTO',
         
        },
      ]));
};
