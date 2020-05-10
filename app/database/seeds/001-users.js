const generateRandomSub = require('../../../util/generateRandomSub');

const TABLE_NAME = 'users';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    // id: 1,
    sub: generateRandomSub(),
    email: 'info@beavertown.org',
    location: 'Pittsburg, PA',
    roles: 'conservationist',
    accepting_help_requests: true,
  }, {
    // id: 2,
    sub: generateRandomSub(),
    email: 'pandalover234@hotmail.com',
    location: 'Phoenix, AZ',
    roles: 'conservationist',
    accepting_help_requests: false,
  }, {
    // id: 3,
    sub: generateRandomSub(),
    email: 'giraffe2tall@gmail.com',
    location: 'Paris, France',
    roles: 'conservationist',
    accepting_help_requests: true,
  }, {
    // id: 4,
    sub: generateRandomSub(),
    email: 'supporter23@conservation.com',
    location: 'Chicago, IL',
    roles: 'supporter',
    accepting_help_requests: true,
  }, {
    // id: 5,
    sub: generateRandomSub(),
    email: 'supporter30@conservation.com',
    location: 'Oakland, CA',
    roles: 'supporter',
    accepting_help_requests: true,
  },
]));
