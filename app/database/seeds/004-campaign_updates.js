const TABLE_NAME = 'campaign_updates';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    id: 1,
    campaign_id: 2,
    user_id: 1,
    image: 'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585351735678_photo.jpg',
    description: 'We saved the beavers!',
    camp_name: 'Save the Beavers',
  },
  {
    id: 1,
    campaign_id: 4,
    user_id: 3,
    image: 'https://keyconservation.s3.us-west-1.amazonaws.com/files/1585501450042_photo.jpg',
    description: 'We planted some trees today',
    camp_name: 'Plant more trees in park',
  },
]));
