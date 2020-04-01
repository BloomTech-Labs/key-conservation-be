const db = require('../database/dbConfig');

async function insert(projectGoal) {
  await db('project_goals')
    .insert(projectGoal);
}

module.exports = {
  insert,
};
