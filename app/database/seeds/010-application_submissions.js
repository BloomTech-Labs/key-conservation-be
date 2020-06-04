// completed AC

const TABLE_NAME = 'application_submissions';
exports.seed = (knex, Promise) => {
  knex(TABLE_NAME)
    .del()
    .then(() => {
      knex(TABLE_NAME).insert([
        {
          // id: '1',
          skilled_impact_request_id: 1,
          user_id: 2,
          decision: 'PENDING',
          why_project: 'Because I love Drones!',
          relevant_experience: 'Own a drone',
        },
        {
          // id: '2',
          skilled_impact_request_id: 2,
          user_id: 81,
          decision: 'PENDING',
          why_project: 'Because I love architecture!',
          relevant_experience: 'Own a building',
        },
        {
          // id: '3',
          skilled_impact_request_id: 1,
          user_id: 81,
          decision: 'ACCEPTED',
          why_project: 'Because I love Drones!',
          relevant_experience: 'Own a drone',
        },
        {
          // id: '4',
          skilled_impact_request_id: 3,
          user_id: 81,
          decision: 'DENIED',
          why_project: 'Because I love Drones!',
          relevant_experience: 'Own a drone',
        },
        {
          // id: '5',
          skilled_impact_request_id: 4,
          user_id: 81,
          decision: 'PENDING',
          why_project: 'Because I absolutely love Drones!',
          relevant_experience: 'Own a drone',
        },
      ]);
    });
};
