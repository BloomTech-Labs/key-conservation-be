const db = require('../dbConfig');
const Users = require('../models/usersModel');
const log = require('../../logger');

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

// copies user to users and conservationists table and deletes them from vetting table
const approveUser = async (id) => {
  const user = await findVettingUserById(id);
  console.log('user', user);
  const newUser = await Users.add(user);
  console.log('newUser from approveUser', newUser);
  deleteUser(id);
  return newUser;
};

const deleteUser = async (id) => {
  const deleted = await db('vetting').where({ id }).del();
  if (deleted) {
    return id;
  } else {
    return 0;
  }
};

module.exports = {
  addVettingUser,
  findVettingUserById,
  approveUser,
  deleteUser,
  findAll,
};
