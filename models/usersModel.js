/* eslint-disable no-console */
const db = require('../database/dbConfig.js');
const Campaign = require('./campaignModel.js');
const CampaignUpdate = require('./updateModel.js');
const Bookmarks = require('./socialModel');
const Skills = require('./skillsEnum');
const pick = require('../util/pick');

// Columns of the user model that are stored in the users table
const userColumns = [
  'email',
  'profile_image',
  'location',
  'mini_bio',
  'species_and_habitats',
  'twitter',
  'facebook',
  'instagram',
  'phone_number',
  'is_deactivated',
  'strikes',
];

// Columns of the user model that are stored in the conservationists table
const conservationistColumns = [
  'name',
  'link_url',
  'link_text',
  'call_to_action',
  'about_us',
  'issues',
  'support_us',
  'longitude',
  'latitude',
];

// Columns of the user model that are stored in the supporters table
const supporterColumns = ['name'];

function find() {
  return db('users')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .leftJoin('supporters as sup', 'sup.user_id', 'users.id')
    .leftJoin('skills', 'skills.user_id', 'users.id')
    .select(
      'users.*',
      'cons.id as cons_id',
      'cons.name as org_name',
      'cons.link_url',
      'cons.link_text',
      'cons.call_to_action',
      'cons.about_us',
      'cons.issues',
      'cons.support_us',
      'sup.name as sup_name',
      db.raw('array_to_json(array_agg(skills.skill)) as skills'),
    )
    .groupBy('users.id', 'cons.id');
}

function findUser(id) {
  return db('users')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .leftJoin('supporters as sup', 'sup.user_id', 'users.id')
    .where({ id })
    .first()
    .select('*', 'sup.name as sup_name', 'cons.name as cons_name')
    .then((usr) => ({
      ...usr,
      name: usr.cons_name || usr.sup_name || 'User',
    }));
}

async function findById(id) {
  let user = await db('users').where({ id }).first();

  if (user.roles === 'conservationist') {
    user = await db('users')
      .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
      .leftJoin('skills', 'skills.user_id', 'users.id')
      .where('users.id', id)
      .select(
        'users.*',
        'cons.id AS conservationist_id',
        'cons.name',
        'cons.link_url',
        'cons.link_text',
        'cons.call_to_action',
        'cons.about_us',
        'cons.issues',
        'cons.support_us',
        'cons.city',
        'cons.country',
        'cons.point_of_contact_name',
        'cons.point_of_contact_email',
        'cons.latitude',
        'cons.longitude',
        db.raw('array_to_json(array_agg(skills.skill)) as skills'),
      )
      .groupBy('users.id', 'cons.id')
      .first();
    user.bookmarks = await Bookmarks.findUserBookmarks(id);
    const campaigns = await Campaign.findCampByUserId(id);
    const campaign_updates = await CampaignUpdate.findUpdatesByUser(id);
    user.campaigns = campaigns.concat(campaign_updates);
  } else if (user.roles === 'supporter') {
    user = await db('users')
      .leftJoin('supporters as sup', 'sup.user_id', 'users.id')
      .where('users.id', id)
      .select('users.*', 'sup.name')
      .first();
    user.bookmarks = await Bookmarks.findUserBookmarks(id);
  }

  return user;
}

async function findBySub(sub) {
  // This is used only to verify user information at login. It does not collect campaign information.
  let user = await db('users').where({ sub }).first();

  const { id } = user;

  if (user.roles === 'conservationist') {
    user = await db('users')
      .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
      .leftJoin('skills', 'skills.user_id', 'users.id')
      .where('users.id', id)
      .select(
        'users.*',
        'cons.id AS conservationist_id',
        'cons.name',
        'cons.link_url',
        'cons.link_text',
        'cons.call_to_action',
        'cons.about_us',
        'cons.issues',
        'cons.support_us',
        'cons.longitude',
        'cons.latitude',
        db.raw('array_to_json(array_agg(skills.skill)) as skills'),
      )
      .groupBy('users.id', 'cons.id')
      .first();
    user.bookmarks = await Bookmarks.findUserBookmarks(id);
  } else if (user.roles === 'supporter') {
    const bookmarks = await Bookmarks.findUserBookmarks(id);
    user = await db('users')
      .leftJoin('supporters as sup', 'sup.user_id', 'users.id')
      .where('users.id', id)
      .select('users.*', 'sup.name')
      .first();
    user.bookmarks = bookmarks;
  }

  return user;
}

// DO NOT MODIFY. This model is available to the outside.
async function findUserStatus(sub) {
  const user = await db('users')
    .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
    .leftJoin('supporters as sup', 'sup.user_id', 'users.id')
    .select('users.*', 'sup.name as sup_name', 'cons.name as org_name')
    .where({ sub })
    .first()
    .then(
      (usr) => usr && {
        ...usr,
        name: usr.sup_name || usr.org_name || 'User',
      },
    );

  const response = {};

  if (user) {
    response.is_deactivated = user.is_deactivated;
    response.subCheck = true;
  } else response.subCheck = false;

  return response;
}

// adds user to conservationists table in add user function
async function addCons(cons) {
  const newConservationist = await db('conservationists').insert(cons, 'id');
  return newConservationist;
}

// adds user to supporters table in add user function
async function addSup(sup) {
  return db('supporters').insert(sup, 'id');
}

async function add(user) {
  const usersTableInsert = {
    sub: user.sub,
    roles: user.roles,
    email: user.email,
    location: user.location,
    mini_bio: user.mini_bio,
    twitter: user.twitter,
    facebook: user.facebook,
    instagram: user.instagram,
    phone_number: user.phone_number,
    profile_image: user.profile_image,
  };

  console.log('constructed user data', usersTableInsert);

  try {
    const [id] = await db('users').insert(usersTableInsert, 'id');
    console.log('user id established as', id);

    if (id) {
      if (user.roles === 'conservationist') {
        const conservationistsData = {
          user_id: id,
          name: user.name,
          link_url: user.link_url,
          call_to_action: user.call_to_action,
          about_us: user.about_us,
          city: user.city,
          country: user.country,
          point_of_contact_name: user.point_of_contact_name,
          longitude: user.longitude,
          latitude: user.latitude,
        };
        console.log(
          'constructued conservationist profile',
          conservationistsData,
        );
        addCons(conservationistsData);
      }
      if (user.roles === 'supporter') {
        const supportersData = {
          user_id: id,
          name: user.name,
        };
        console.log('constructed supporter profile', supportersData);
        addSup(supportersData);
      }
    }
    return findById(id);
  } catch (err) {
    throw new Error(err.message);
  }
}

async function updateUsersTable(user, id) {
  const userUpdate = pick(user, userColumns);
  await db('users').where('id', id).update(userUpdate);
}

async function updateConservationistsTable(user, id) {
  const conservationistUpdate = pick(user, conservationistColumns);
  await db('conservationists')
    .where('user_id', id)
    .update(conservationistUpdate);
}

async function updateSupportersTable(user, id) {
  const supporterUpdate = pick(user, supporterColumns);
  await db('supporters').where('user_id', id).update(supporterUpdate);
}

async function updateSkillsTable(user, id) {
  const skills = user.skills
    .map((skill) => skill.toUpperCase())
    .filter((skill) => skill in Skills);

  if (skills.length > 0) {
    // Need to manually build a query with a conflict statement here as Knex doesn't support Postgres conflicts
    const insertQuery = db('skills')
      .insert(skills.map((skill) => ({ user_id: id, skill })))
      .toQuery();

    await db.raw(`${insertQuery} ON CONFLICT DO NOTHING`);
  }

  await db('skills')
    .whereNotIn('skill', skills)
    .andWhere('user_id', id)
    .delete();
}

async function update(user, id) {
  const existingUser = await findById(id);
  const isEmpty = (obj) => Object.getOwnPropertyNames(obj).length === 0;
  const triggerUsers = !isEmpty(pick(user, userColumns));
  const triggerConservationists = !isEmpty(pick(user, conservationistColumns)) && existingUser.roles === 'conservationist';
  const triggerSupporters = !isEmpty(pick(user, supporterColumns)) && existingUser.roles === 'supporter';
  const triggerSkills = user.skills && Array.isArray(user.skills);

  if (triggerUsers) {
    await updateUsersTable(user, id);
  }

  if (triggerConservationists) {
    await updateConservationistsTable(user, id);
  }

  if (triggerSupporters) {
    await updateSupportersTable(user, id);
  }

  if (triggerSkills) {
    await updateSkillsTable(user, id);
  }

  return findById(id);
}

// This is used for the getConnectionById function in connectionsModel
const getNameAndAvatarByIds = async (ids) => {
  try {
    const users = await db('users')
      .leftJoin('conservationists as cons', 'cons.user_id', 'users.id')
      .leftJoin('supporters as sup', 'sup.user_id', 'users.id')
      .whereIn('users.id', ids)
      .select(
        'users.id',
        'users.roles',
        'users.profile_image',
        'cons.name as org_name',
        'sup.name as sup_name',
      );

    return users.map((user) => ({
      id: user.id,
      name: user.org_name || user.sup_name || 'User',
      avatar: user.profile_image,
      role: user.roles,
    }));
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  find,
  addCons,
  addSup,
  findUser,
  findById,
  findBySub,
  findUserStatus,
  add,
  update,
  getNameAndAvatarByIds,
};
