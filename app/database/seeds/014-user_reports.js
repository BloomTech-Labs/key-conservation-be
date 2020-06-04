// COMPLETED
// NOTE: the last 2 objects were removed bec

const TABLE_NAME = 'user_reports';
exports.seed = (knex, Promise) => {
  knex(TABLE_NAME)
    .del()
    .then(() => {
      knex(TABLE_NAME).insert([
        {
          // id: '10',
          reported_by: 76,
          reported_user: 54,
          post_id: 28,
          table_name: 'campaign_posts',
          description: "It's an attempt at scam",
          reported_at: '2020-05-27 18:03:47.087311-05',
          is_archived: 'f',
        },
      ]);
    });
};
