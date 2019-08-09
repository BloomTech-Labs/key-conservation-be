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
    .leftJoin("supporters as sup", "sup.users_id", "users.id")
    .select(
      "users.*",
      "cons.cons_id",
      "cons.org_name",
      "cons.org_link_url",
      "cons.org_link_text",
      "cons.org_cta",
      "cons.about_us",
      "cons.issues",
      "cons.support_us",
      "sup.sup_name"
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
        "cons.org_link_text",
        "cons.org_cta",
        "cons.about_us",
        "cons.issues",
        "cons.support_us"
      )
      .first();
    user.campaigns = campaigns;
  } else if (user.roles === "supporter") {
    user = await db("users")
      .leftJoin("supporters as sup", "sup.users_id", "users.id")
      .where("users.id", id)
      .select(
        "users.*",
        "sup.sup_name"
      )
      .first();
  }

  return user;
}

async function findBySub(sub) {
  let user = await db("users")
    .where({ sub })
    .first();
  
  const { id } = user

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
        "cons.org_link_text",
        "cons.org_cta",
        "cons.about_us",
        "cons.issues",
        "cons.support_us"
      )
      .first();
    user.campaigns = campaigns;
  } else if (user.roles === "supporter") {
    user = await db("users")
      .leftJoin("supporters as sup", "sup.users_id", "users.id")
      .where("users.id", id)
      .select(
        "users.*",
        "sup.sup_name"
      )
      .first();
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
    } else if (roles === "supporter") {
      db("supporters").insert({ users_id: id });
    }
    const user = await findById(id);
    return user;
  }
}

async function update(user, id) {
  const userColumns = [
    "username",
    "email",
    "profile_image",
    "location",
    "mini_bio",
    "species_and_habitats",
    "twitter",
    "facebook",
    "instagram",
    "phone_number"
  ];
  const consColumns = [
    "org_name",
    "org_link_url",
    "org_link_text",
    "cons.org_cta",
    "org_cta",
    "about_us",
    "issues",
    "support_us"
  ];
  const supColumns = [
    "sup_name"
  ];

  let userUpdate = {},
    consUpdate = {},
    supUpdate = {},
    triggerUsers = false,
    triggerCons = false;
    triggerSup = false;

  const keys = Object.keys(user);

  keys.forEach(key => {
    if (userColumns.includes(key)) {
      triggerUsers = true;
      userUpdate = { ...userUpdate, [key]: user[key] };
    } else if (consColumns.includes(key)) {
      triggerCons = true;
      consUpdate = { ...consUpdate, [key]: user[key] };
    } else if (supColumns.includes(key)) {
      triggerSup = true;
      supUpdate = { ...supUpdate, [key]: user[key] };
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
  if (triggerSup) {
    await db("supporters")
      .where("users_id", id)
      .update(supUpdate);
  }
  if (triggerUsers || triggerCons || triggerSup) {
    const newUser = await findById(id);
    return newUser;
  }
}
