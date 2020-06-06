const db = require('../dbConfig');
const Users = require('../models/usersModel');
const log = require('../../logger');

const findVettingUserBySub = async (sub) => {
  const user = await db('vetting').where({ sub }).first();
  console.log('user from findVettingUserBySub', user);
  return user;
};

const findVettingUserById = async (id) => {
  const user = await db('vetting').where({ id }).first();
  return user;
};

const addVettingUser = async (user) => {
  try {
    log.verbose(`Inserting new vetting user ${user}`);
    const [id] = await db('vetting').insert(user, 'id');
    const newUser = findVettingUserById(id);
    return newUser;
  } catch (e) {
    log.error(`Error inserting user: ${e}`);
  }
};

const findAll = async () => {
  return db('vetting');
};

const deleteUser = async (sub) => {
  const deleted = await db('vetting').where({ sub }).del();
  if (deleted) {
    return sub;
  } else {
    return 0;
  }
};

// copies user to users and conservationists table and deletes them from vetting table
const approveUser = async (sub) => {
  const user = await findVettingUserBySub(sub);
  const newUser = await Users.add(user);
  deleteUser(sub);
  return newUser;
};

module.exports = {
  addVettingUser,
  findVettingUserBySub,
  findVettingUserById,
  approveUser,
  deleteUser,
  findAll,
};
