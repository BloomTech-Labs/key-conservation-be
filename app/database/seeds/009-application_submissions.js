const TABLE_NAME = 'application_submissions';
exports.seed = (knex, Promise) => knex(TABLE_NAME).del().then(() => knex(TABLE_NAME).insert([
  {
    // id: 1,
    skilled_impact_request_id: 2,
    user_id: 3,
    decision: 'PENDING',
    why_project: 'I love pandas and photography.',
    relevant_experience: 'I took an online course.',
  },
  {
    // id: 2,
    skilled_impact_request_id: 2,
    user_id: 4,
    decision: 'PENDING',
    why_project: 'I want to see some pandas lying on pillows.',
    relevant_experience: 'I have published a book on animal photography.',
  },
  {
    // id: 3,
    skilled_impact_request_id: 3,
    user_id: 1,
    decision: 'PENDING',
    why_project: 'I think it\'d make for a fun afternoon',
    relevant_experience: 'I\'m a long-time drone enthusiast.',
  },
]));
