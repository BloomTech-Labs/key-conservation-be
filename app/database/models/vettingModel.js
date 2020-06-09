const db = require('../dbConfig');
const Users = require('../models/usersModel');
const log = require('../../logger');

const findVettingUserBySub = async (sub) => {
  const user = await db('vetting').where({ sub }).first();
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

const deleteUser = async (id) => {
  const user = await findVettingUserById(id);
  const deleted = await db('vetting').where({ id }).del();
  if (deleted === 1) {
    return user;
  } else {
    return 0;
  }
};

// copies user to users and conservationists table and deletes them from vetting table
const approveUser = async (id) => {
  const user = await findVettingUserById(id);
  const newUser = await Users.add(user);
  deleteUser(id);
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
