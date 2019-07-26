const db = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  remove,
  update
};

function find() {
  return db("users")
    .leftJoin("conservationists as cons", "cons.users_id", "users.id")
    .select(
      "users.*",
      "cons.cons_id",
      "cons.org_name",
      "cons.org_link_url",
      "cons.org_link_title",
      "cons.mini_bio",
      "cons.about_us",
      "cons.species_and_habitats",
      "cons.issues",
      "cons.support_us"
    );
}

async function findById(id) {
  const user = await db("users")
    .where({ id })
    .first();
  
  if (user.roles === "conservationist") {
    return db("users")
      .leftJoin("conservationists as cons", "cons.users_id", "users.id")
      .where("users.id", id)
      .select(
        "users.*",
        "cons.cons_id",
        "cons.org_name",
        "cons.org_link_url",
        "cons.org_link_title",
        "cons.mini_bio",
        "cons.about_us",
        "cons.species_and_habitats",
        "cons.issues",
        "cons.support_us"
      )
      .first();
  } else {
    return user;
  }
}

async function update(user, id) {
  const editedUser = await db("users")
    .leftJoin("conservationists as cons", "cons.users_id", "users.id")
    .where("users.id", id)
    .select(
      "users.*",
      "cons.cons_id",
      "cons.org_name",
      "cons.org_link_url",
      "cons.org_link_title",
      "cons.mini_bio",
      "cons.about_us",
      "cons.species_and_habitats",
      "cons.issues",
      "cons.support_us"
    )
    .update(user);
  if (editedUser) {
    const user = await findById(id);
    return user;
  }
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
