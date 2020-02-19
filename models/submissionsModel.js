const db = require("../database/dbConfig");

// not sure if I need async here or not either
function find() {
  return db("application_submissions");
}

function findById(id) {
  return db("application_submissions")
    .where({ id })
    .first();
}

// same here, not sure if needed
async function insert(submission) {
  // .returning("id") returns array with id, so need [id] to capture value
  const [id] = await db("application_submissions")
    .insert(submission)
    .returning("id");
  if (id) {
    const sub = await findById(id);
    return sub;
  }
}

async function update(decision, id) {
  const [sub_id] = await db("application_submissions")
    .where({ id })
    .update({decision})
    .returning("id");
  if (sub_id) {
    const sub = await findById(sub_id);
    return sub;
  }
}

module.exports = {
  find,
  findById,
  insert,
  update
};
