// COMPLETED

const TABLE_NAME = 'connections';
exports.seed = (knex, Promise) => {
  return knex(TABLE_NAME)
    .del()
    .then(() =>
      knex(TABLE_NAME).insert([
        {
          // id: '1',
          connector_id: 3, // old 13
          connected_id: 76, // old 14
          status: 'Connected',
        },
        {
          // id: '2',
          connector_id: 2, // old 1
          connected_id: 3, // old 13
          status: 'Connected',
        },
        {
          // id: '10',
          connector_id: 7, // old 18
          connected_id: 3, // old 13
          status: 'Connected',
        },
        {
          // id: '12',
          connector_id: 16, // old 16
          connected_id: 2, // old 1
          status: 'Pending',
        },
        {
          // id: '14',
          connector_id: 23, // old 2
          connected_id: 3, // old 13
          status: 'Connected',
        },
        {
          // id: '9',
          connector_id: 7, // old 18
          connected_id: 10, // old 15
          status: 'Connected',
        },
        {
          // id: '18',
          connector_id: 10, // old 15
          connected_id: 3, // old 13
          status: 'Connected',
        },
        {
          // id: '30',
          connector_id: 16, // old 16
          connected_id: 3, // old 13
          status: 'Connected',
        },
        {
          // id: '31',
          connector_id: 16, // old 16
          connected_id: 18, // old 27
          status: 'Connected',
        },
        {
          // id: '34',
          connector_id: 1, // old 22
          connected_id: 3, // old 13
          status: 'Connected',
        },
        {
          // id: '36',
          connector_id: 39, // old 44
          connected_id: 1, // old 22
          status: 'Connected',
        },
        {
          // id: '37',
          connector_id: 39, // old 44
          connected_id: 18, // old 27
          status: 'Connected',
        },
        {
          // id: '38',
          connector_id: 9, // old 45
          connected_id: 1, // old 22
          status: 'Connected',
        },
        {
          // id: '40',
          connector_id: 7, // old 18
          connected_id: 18, // old 27
          status: 'Connected',
        },
        {
          // id: '41',
          connector_id: 39, // old 44
          connected_id: 76, // old 14
          status: 'Connected',
        },
        {
          // id: '42',
          connector_id: 76, // old 14
          connected_id: 1, // old 22
          status: 'Connected',
        },
        {
          // id: '43',
          connector_id: 29, // old 59
          connected_id: 39, // old 44
          status: 'Connected',
        },
        {
          // id: '44',
          connector_id: 7, // old 18
          connected_id: 39, // 44
          status: 'Connected',
        },
        {
          // id: '46',
          connector_id: 7, // old 18
          connected_id: 1, // old 22
          status: 'Connected',
        },
        {
          // id: '45',
          connector_id: 16, // old 16
          connected_id: 7, // old 18
          status: 'Connected',
        },
        {
          // id: '55',
          connector_id: 54, // old 95
          connected_id: 58, // old 97
          status: 'Connected',
        },
        {
          // id: '56',
          connector_id: 44, // old 98
          connected_id: 54, // old 95
          status: 'Connected',
        },
        {
          // id: '57',
          connector_id: 29, // old 59
          connected_id: 54, // old 95
          status: 'Connected',
        },
        {
          // id: '58',
          connector_id: 29, // old 59
          connected_id: 58, // old 97
          status: 'Connected',
        },
        {
          // id: '59',
          connector_id: 29, // old 59
          connected_id: 44, // old 98,
          status: 'Connected',
        },
        {
          // id: '47',
          connector_id: 37, // old 90
          connected_id: 29, // old 59
          status: 'Connected',
        },
        {
          // id: '60',
          connector_id: 59, // old 126,
          connected_id: 58, // old 97,
          status: 'Connected',
        },
        {
          // id: '62',
          connector_id: 30, // old 127,
          connected_id: 58, // old 97,
          status: 'Connected',
        },
        {
          // id: '63',
          connector_id: 47, // old 130,
          connected_id: 45, // old 129,
          status: 'Connected',
        },
        {
          // id: '64',
          connector_id: 47, // old 130,
          connected_id: 58, // old 97,
          status: 'Connected',
        },
        {
          // id: '65',
          connector_id: 55, // old 131,
          connected_id: 47, // old 130,
          status: 'Connected',
        },
        {
          // id: '66',
          connector_id: 55, // old 131,
          connected_id: 45, // old 129,
          status: 'Connected',
        },
        {
          // id: '67',
          connector_id: 55, // old 131,
          connected_id: 44, // old 98,
          status: 'Connected',
        },
        {
          // id: '68',
          connector_id: 56, // old 132,
          connected_id: 55, // old 131,
          status: 'Connected',
        },
        {
          // id: '69',
          connector_id: 57, // old 133,
          connected_id: 56, // old 132,
          status: 'Connected',
        },
        {
          // id: '70',
          connector_id: 57, // old 133,
          connected_id: 55, // old 131,
          status: 'Connected',
        },
        {
          // id: '71',
          connector_id: 45, // old 129,
          connected_id: 57, // old 133,
          status: 'Connected',
        },
        {
          // id: '72',
          connector_id: 45, // old 129,
          connected_id: 56, // old 132,
          status: 'Connected',
        },
        {
          // id: '73',
          connector_id: 59, // old 126,
          connected_id: 57, // old 133,
          status: 'Connected',
        },
        {
          // id: '74',
          connector_id: 81, // old 128,
          connected_id: 57, // old 133,
          status: 'Connected',
        },
        {
          // id: '15',
          connector_id: 16, // old 16
          connected_id: 23, // old 2
          status: 'Connected',
        },
        {
          // id: '23',
          connector_id: 7, // 18
          connected_id: 23, // 2
          status: 'Connected',
        },
        {
          // id: '75',
          connector_id: 86, // old 139
          connected_id: 47, // old 130,
          status: 'Connected',
        },
        {
          // id: '76',
          connector_id: 86, // old 139
          connected_id: 57, // old 133,
          status: 'Connected',
        },
        {
          // id: '77',
          connector_id: 86, // old 139
          connected_id: 54, // old 95
          status: 'Connected',
        },
        {
          // id: '78',
          connector_id: 23, // old 2
          connected_id: 57, // old 133,
          status: 'Connected',
        },
        {
          // id: '79',
          connector_id: 23, // old 2
          connected_id: 56, // old 132,
          status: 'Connected',
        },
        {
          // id: '80',
          connector_id: 23, // old 2
          connected_id: 2, // old 1
          status: 'Pending',
        },
        {
          // id: '81',
          connector_id: 23, // old 2
          connected_id: 76, // old 14
          status: 'Connected',
        },
        {
          // id: '82',
          connector_id: 82, // old 171
          connected_id: 1, // old 22
          status: 'Connected',
        },
        {
          // id: '61',
          connector_id: 30, // old 127,
          connected_id: 59, // old 126,
          status: 'Connected',
        },
        {
          // id: '83',
          connector_id: 59, // old 126,
          connected_id: 44, // old 98,
          status: 'Connected',
        },
        {
          // id: '84',
          connector_id: 84, //old 172
          connected_id: 76, // old 14
          status: 'Connected',
        },
        {
          // id: '85',
          connector_id: 84, // old 172
          connected_id: 58, // old 97,
          status: 'Connected',
        },
        {
          // id: '86',
          connector_id: 44, // old 98,
          connected_id: 58, // old 97,
          status: 'Connected',
        },
        {
          // id: '87',
          connector_id: 81, // old 128,
          connected_id: 59, // old 126,
          status: 'Pending',
        },
        {
          // id: '88',
          connector_id: 30, // old 127,
          connected_id: 57, // old 133,
          status: 'Connected',
        },
        {
          // id: '89',
          connector_id: 30, // old 127,
          connected_id: 44, // old 98,
          status: 'Connected',
        },
        {
          // id: '91',
          connector_id: 54, // old 95
          connected_id: 76, // old 14
          status: 'Connected',
        },
        {
          // id: '92',
          connector_id: 81, // old 128,
          connected_id: 30, // old 127,
          status: 'Pending',
        },
        {
          // id: '93',
          connector_id: 86, // old 139
          connected_id: 30, // old 127,
          status: 'Pending',
        },
      ])
    );
};
