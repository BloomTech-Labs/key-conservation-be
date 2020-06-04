// Complete
const TABLE_NAME = 'project_goals';
exports.seed = (knex, Promise) => {
  return knex(TABLE_NAME)
    .del()
    .then(() => knex(TABLE_NAME).insert([
        {
          goal_title: 'A1',
          description: 'A description 1',
          skilled_impact_request_id: 5,
        },
        {
          goal_title: 'B1',
          description: 'B description 1',
          skilled_impact_request_id: 5,
        },
        {
          goal_title: 'Drone 1',
          description: 'Drone description 1',
          skilled_impact_request_id: 6,
        },
        {
          goal_title: 'A1',
          description: 'A1',
          skilled_impact_request_id: 7,
        },
        {
          goal_title: 'A2',
          description: 'A2',
          skilled_impact_request_id: 7,
        },
        {
          goal_title: 'A3',
          description: 'A3',
          skilled_impact_request_id: 7,
        },
        {
          goal_title: 'Great art',
          description: 'Create something',
          skilled_impact_request_id: 8,
        },
        {
          goal_title: 'Get that Drone flying',
          description: 'Fly me to the moon',
          skilled_impact_request_id: 9,
        },
        {
          goal_title: 'Game 1',
          description: 'Description of Game 1',
          skilled_impact_request_id: 10,
        },
        {
          goal_title: 'Game 2',
          description: 'Description of Game 2',
          skilled_impact_request_id: 10,
        },
        {
          goal_title: 'Hum1',
          description: 'Hum1 description',
          skilled_impact_request_id: 11,
        },
        {
          goal_title: 'Hum2',
          description: 'Hum2 description',
          skilled_impact_request_id: 11,
        },
        {
          goal_title: 'Hum3',
          description: 'Hum3 description',
          skilled_impact_request_id: 11,
        },
      ]));
};
