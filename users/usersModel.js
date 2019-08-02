const db = require("../database/dbConfig.js");
const Camp = require("../campaigns/campModel.js");

module.exports = {
  find,
  findById,
  findBySub,
  insert,
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
  let user = await db("users")
    .where({ id })
    .first();

  if (user.roles === "conservationist") {
    const campaigns = await Camp.findCampById(id);
    user = await db("users")
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
    user.campaigns = campaigns;
  }
  return user;
}

async function findBySub(sub) {
  const user = await db("users")
    .where({ sub })
    .first();

  if (user.roles === "conservationist") {
    const campaigns = Camp.findCampById(id);
    user = db("users")
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
    user.campaigns = campaigns;
  }
  return user;
}

async function insert(user) {
  const { roles } = user;
  const [id] = await db("users")
    .insert(user)
    .returning("id");
  if (id) {
    if (roles === "conservationist") {
      db("conservationists").insert({ users_id: id });
    }
    const user = await findById(id);
    return user;
  }
}

// async function update(user, id) {
//   const userColumns = [
//     "username",
//     "email",
//     "profile_image",
//     "location",
//     "twitter",
//     "facebook",
//     "instagram",
//     "phone_number"
//   ];
//   const consColumns = [
//     "org_name",
//     "org_link_url",
//     "org_link_text",
//     "org_cta",
//     "mini_bio",
//     "about_us",
//     "species_and_habitats",
//     "issues",
//     "support_us"
//   ];

//   let userUpdate = {}, consUpdate = {};

//   const keys = Object.keys(user);
//   console.log(keys);

//   keys.forEach(key => {
//     if (userColumns.includes(key)) {
//       userUpdate = {...userUpdate, [key]: user[key]}
//     } else if (consColumns.includes(key)) {
//       consUpdate = {...consUpdate, [key]: user[key]}
//     }
//   });

async function update(user, id) {
  const userColumns = [
    "username",
    "email",
    "profile_image",
    "location",
    "twitter",
    "facebook",
    "instagram",
    "phone_number"
  ];
  const consColumns = [
    "org_name",
    "org_link_url",
    "org_link_text",
    "org_cta",
    "mini_bio",
    "about_us",
    "species_and_habitats",
    "issues",
    "support_us"
  ];

  let userUpdate = {},
    consUpdate = {},
    triggerUsers = false,
    triggerCons = false;

  const keys = Object.keys(user);

  keys.forEach(key => {
    if (userColumns.includes(key)) {
      triggerUsers = true;
      userUpdate = { ...userUpdate, [key]: user[key] };
    } else if (consColumns.includes(key)) {
      triggerCons = true;
      consUpdate = { ...consUpdate, [key]: user[key] };
    }
  });

  if (triggerUsers) {
    await db("users")
      .where("id", id)
      .update(userUpdate);
  }
  if (triggerCons) {
    await db("conservationists")
      .where("users_id", id)
      .update(consUpdate);
  }
  if (triggerUsers || triggerCons) {
    const newUser = await findById(id);
    return newUser;
  }
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}
