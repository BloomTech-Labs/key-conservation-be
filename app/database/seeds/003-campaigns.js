const TABLE_NAME = 'campaigns';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    id: 1,
    user_id: 1,
    name: 'Save the Eggs',
    call_to_action: 'https://www.turtleibrary/donate.now.com',
    urgency: 'Critical',
  },
  {
    id: 2,
    user_id: 1,
    name: 'Save the Beavers',
    call_to_action: 'https://www.nwf.org/Educational-Resources/Wildlife-Guide/Mammals/American-Beaver',
    urgency: 'Critical',
  },
  {
    id: 3,
    user_id: 2,
    name: 'Pillows 4 Pandas',
    call_to_action: 'https://live.adyen.com/hpp/pay.shtml',
    urgency: 'Longterm',
  },
  {
    id: 4,
    user_id: 3,
    name: 'Plant more trees in park',
    call_to_action: 'https://giraffeconservation.org/donate/',
    urgency: 'Urgent',
  },
]));
