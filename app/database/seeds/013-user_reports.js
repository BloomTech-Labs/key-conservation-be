const TABLE_NAME = 'user_reports';
exports.seed = (knex, Promise) => {
  knex(TABLE_NAME)
    .del()
    .then(() => {
      knex(TABLE_NAME).insert([
        {
          // id: '10',
          reported_by: 14,
          reported_user: 95,
          post_id: 181,
          table_name: 'campaign_posts',
          description: "It's an attempt at scam",
          reported_at: '2020-05-27 18:03:47.087311-05',
          is_archived: 'f',
        },
        {
          // id: '11',
          reported_by: 14,
          reported_user: 95,
          post_id: 95,
          table_name: 'users',
          description: "It's spam",
          reported_at: '2020-05-27 18:04:50.147984-05',
          is_archived: 'f',
        },
        {
          // id: '15',
          reported_by: 14,
          reported_user: 126,
          post_id: 141,
          table_name: 'comments',
          description: "It's inappropriate/offensive",
          reported_at: '2020-05-27 18:12:54.551914-05',
          is_archived: 'f',
        },
      ]);
    });
};
