const TABLE_NAME = 'project_goals';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    id: 1,
    goal_title: 'Design a dam',
    description: 'Design a dam for a family of beavers',
    skilled_impact_request_id: 1,
  },
  {
    id: 2,
    goal_title: 'Write instructions for building a dam',
    description: 'Should include materials required and progress pictures',
    skilled_impact_request_id: 1,
  },
  {
    id: 3,
    goal_title: 'Take pictures of pandas and their pillows',
    description: 'Please shoot on film! Our director prefers that.',
    skilled_impact_request_id: 2,
  },
  {
    id: 4,
    goal_title: 'Send photos',
    description: 'Please scan/develop your photos and send them to as via email.',
    skilled_impact_request_id: 2,
  },
  {
    id: 5,
    goal_title: 'Make any necessary edits',
    description: 'Our director will reach out to you if she\'d like to request any changes',
    skilled_impact_request_id: 2,
  },
  {
    id: 6,
    goal_title: 'Collect seeds',
    description: 'You can pick up seeds from our center.',
    skilled_impact_request_id: 3,
  },
  {
    id: 7,
    goal_title: 'Spray seeds around park via drone',
    description: 'Please don\'t let the seeds fall too far',
    skilled_impact_request_id: 3,
  },
]));
