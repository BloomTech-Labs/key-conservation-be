const TABLE_NAME = 'bookmarks';
// COMPLETED
exports.seed = (knex, Promise) => {
  return knex(TABLE_NAME)
    .del()
    .then(() => knex(TABLE_NAME).insert([
        {
          // new: 1
          // id: '104',
          user_id: 40,
          campaign_id: 16,
        },
        {
          // new: 2
          // id: '108',
          user_id: 86,
          campaign_id: 13,
        },
        {
          // new: 3
          // id: '110',
          user_id: 59,
          campaign_id: 17,
        },
        {
          // new: 4
          // id: '111',
          user_id: 31,
          campaign_id: 17,
        },
        {
          // new: 5
          // id: '112',
          user_id: 66,
          campaign_id: 17,
        },
        {
          // new: 6
          // id: '113',
          user_id: 23,
          campaign_id: 17,
        },
        {
          // new: 7
          // id: '114',
          user_id: 59,
          campaign_id: 12,
        },
        {
          // new: 8
          // id: '115',
          user_id: 86,
          campaign_id: 17,
        },
        {
          // new: 9
          // id: '116',
          user_id: 59,
          campaign_id: 10,
        },
        {
          // new: 10
          // id: '117',
          user_id: 64,
          campaign_id: 13,
        },
        {
          // new: 11
          // id: '118',
          user_id: 64,
          campaign_id: 10,
        },
        {
          // new: 12
          // id: '119',
          user_id: 64,
          campaign_id: 17,
        },
        {
          // new: 13
          // id: '130',
          user_id: 73,
          campaign_id: 10,
        },
        {
          // new: 14
          // id: '134',
          user_id: 84,
          campaign_id: 18,
        },
        {
          // new: 15
          // id: '135',
          user_id: 59,
          campaign_id: 21,
        },
        {
          // new: 16
          // id: '137',
          user_id: 86,
          campaign_id: 21,
        },
        {
          // new: 17
          // id: '138',
          user_id: 86,
          campaign_id: 22,
        },
        {
          // new: 18
          // id: '139',
          user_id: 59,
          campaign_id: 22,
        },
      ]));
};
