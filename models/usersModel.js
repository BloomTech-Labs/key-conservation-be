/* eslint-disable no-console */
const db = require('../database/dbConfig.js');
const Camp = require('./campaignModel.js');
const CampUpdate = require('./updateModel.js');
const Bookmarks = require('./socialModel');

function find() {
  return db('users')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .leftJoin('supporters as sup', 'sup.users_id', 'users.id')
    .select(
      'users.*',
      'cons.cons_id',
      'cons.org_name',
      'cons.org_link_url',
      'cons.org_link_text',
      'cons.org_cta',
      'cons.about_us',
      'cons.issues',
      'cons.support_us',
      'sup.sup_name'
    );
}

function findUser(id) {
  return db('users')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .leftJoin('supporters as sup', 'sup.users_id', 'users.id')
    .where({ id })
    .first()
    .then(usr => ({
      ...usr,
      name: usr.org_name || usr.sup_name || 'User'
    }));
}

async function findById(id) {
  let user = await db('users')
    .where({ id })
    .first();

  if (user.roles === 'conservationist') {
    const campaigns = await Camp.findCampByUserId(id);
    const campaign_updates = await CampUpdate.findUpdatesByUser(id);
    const bookmarks = await Bookmarks.findUserBookmarks(id);
    user = await db('users')
      .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
      .where('users.id', id)
      .select(
        'users.*',
        'cons.cons_id',
        'cons.org_name as name',
        'cons.org_link_url',
        'cons.org_link_text',
        'cons.org_cta',
        'cons.about_us',
        'cons.issues',
        'cons.support_us',
        'cons.city',
        'cons.country',
        'cons.point_of_contact_name',
        'cons.point_of_contact_email',
        'cons.latitude',
        'cons.longitude'
      )
      .first();
    user.bookmarks = bookmarks;
    user.campaigns = campaigns.concat(campaign_updates);
  } else if (user.roles === 'supporter') {
    const bookmarks = await Bookmarks.findUserBookmarks(id);
    user = await db('users')
      .leftJoin('supporters as sup', 'sup.users_id', 'users.id')
      .where('users.id', id)
      .select('users.*', 'sup.sup_name as name')
      .first();
    user.bookmarks = bookmarks;
  }

  return user;
}

async function findBySub(sub) {
  // This is used only to verify user information at login. It does not collect campaign information.
  let user = await db('users')
    .where({ sub })
    .first();

  const { id } = user;

  if (user.roles === 'conservationist') {
    const bookmarks = await Bookmarks.findUserBookmarks(id);
    user = await db('users')
      .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
      .where('users.id', id)
      .select(
        'users.*',
        'cons.cons_id',
        'cons.org_name as name',
        'cons.org_link_url',
        'cons.org_link_text',
        'cons.org_cta',
        'cons.about_us',
        'cons.issues',
        'cons.support_us',
        'cons.longitude',
        'cons.latitude'
      )
      .first();
    user.bookmarks = bookmarks;
  } else if (user.roles === 'supporter') {
    const bookmarks = await Bookmarks.findUserBookmarks(id);
    user = await db('users')
      .leftJoin('supporters as sup', 'sup.users_id', 'users.id')
      .where('users.id', id)
      .select('users.*', 'sup.sup_name as name')
      .first();
    user.bookmarks = bookmarks;
  }

  return user;
}

// DO NOT MODIFY. This model is available to the outside.
async function findUserStatus(sub) {
  const user = await db('users')
    .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
    .leftJoin('supporters as sup', 'sup.users_id', 'users.id')
    .select('users.*', 'sup.sup_name', 'cons.org_name')
    .where({ sub })
    .first()
    .then(usr => usr && ({
      ...usr,
      name: usr.sup_name || usr.org_name || 'User'
    }));

  let response = {};

  if (user) {
    response.is_deactivated = user.is_deactivated;
    response.subCheck = true;
  } else response.subCheck = false;

  return response;
}

// adds user to conservationists table in add user function
async function addCons(cons) {
  const newConservationist = await db('conservationists').insert(
    cons,
    'cons_id'
  );
  return newConservationist;
}

// adds user to supporters table in add user function
async function addSup(sup) {
  const newSupporter = await db('supporters').insert(sup, 'sup_id');
  console.log('added to supporter database');
  return newSupporter;
}

async function add(user) {
  const usersTableInsert = {
    sub: user.sub,
    roles: user.roles,
    email: user.email,
    location: user.location,
    mini_bio: user.mini_bio,
    species_and_habitats: user.species_and_habitats,
    twitter: user.twitter,
    facebook: user.facebook,
    instagram: user.instagram,
    phone_number: user.phone_number,
    profile_image: user.profile_image
  };

  console.log('constructed user data', usersTableInsert);

  const [id] = await db('users').insert(usersTableInsert, 'id');

  console.log('user id established as', id);

  if (id) {
    if (user.roles === 'conservationist') {
      const conservationistsData = {
        users_id: id,
        org_name: user.name,
        org_link_url: user.org_link_url,
        org_cta: user.org_cta,
        about_us: user.about_us,
        city: user.city,
        country: user.country,
        point_of_contact_name: user.point_of_contact_name,
        longitude: user.longitude,
        latitude: user.latitude
      };
      console.log('constructued conservationist profile', conservationistsData);
      addCons(conservationistsData);
    }
    if (user.roles === 'supporter') {
      const supportersData = {
        users_id: id,
        sup_name: user.name
      };
      console.log('constructed supporter profile', supportersData)
      addSup(supportersData);
    }
  }
  const newuser = await findById(id);
  return newuser;
}

async function update(user, id) {
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
    'strikes'
  ];
  const consColumns = [
    'org_name',
    'org_link_url',
    'org_link_text',
    'cons.org_cta',
    'org_cta',
    'about_us',
    'issues',
    'support_us',
    'longitude',
    'latitude'
  ];
  const supColumns = ['sup_name'];

  let userUpdate = {};
  let consUpdate = {};
  let supUpdate = {};
  let triggerUsers = false;
  let triggerCons = false;
  let triggerSup = false;

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
    await db('users')
      .where('id', id)
      .update(userUpdate);
  }
  if (triggerCons) {
    await db('conservationists')
      .where('users_id', id)
      .update(consUpdate);
  }
  if (triggerSup) {
    await db('supporters')
      .where('users_id', id)
      .update(supUpdate, '*')
  }
  if (triggerUsers || triggerCons || triggerSup) {
    const newUser = await findById(id);
    return newUser;
  }
}

// This is used for the getConnectionById function in connectionsModel
const getNameAndAvatarByIds = async ids => {

  try {
    const users = await db('users')
      .leftJoin('conservationists as cons', 'cons.users_id', 'users.id')
      .leftJoin('supporters as sup', 'sup.users_id', 'users.id')
      .whereIn('users.id', ids)
      .select(
        'users.id',
        'users.roles',
        'users.profile_image',
        'cons.org_name',
        'sup.sup_name'
      );

    return users.map(user => {
      return {
        id: user.id,
        name: user.org_name || user.sup_name || 'User',
        avatar: user.profile_image,
        role: user.roles
      };
    });
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
  getNameAndAvatarByIds
};
