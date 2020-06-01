const db = require('../dbConfig');
const Users = require('../models/usersModel');

module.exports = {
  addVettingUser,
  findVettingUserById,
  approveUser,
};

const addVettingUser = async (user) => {
  const newUser = await db('vetting').insert(user, 'id');
  return newUser;
};

const findVettingUserById = async (id) => {
  const user = await db('vetting').where({ id }).first();
  return user;
};

// copies user to users and conservationists table and deletes them from vetting table
const approveUser = async (id) => {
  const user = await findVettingUserById(id);
  const newUser = Users.add(user);
  const deleted = await db('vetting').where({ id }).del();
  if (deleted && newUser) {
    return newUser;
  } else {
    return 0;
  }
};
