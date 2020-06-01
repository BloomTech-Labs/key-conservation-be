const db = require('../dbConfig');
const Users = require('../models/usersModel');

const addVettingUser = async (user) => {
  const newUser = await db('vetting').insert(user, 'id');
  return newUser;
};

const findVettingUserById = async (id) => {
  const user = await db('vetting').where({ id }).first();
  return user;
};

const findAll = async () => {
  return db('vetting');
};

// copies user to users and conservationists table and deletes them from vetting table
const approveUser = async (id) => {
  const user = await findVettingUserById(id);
  const newUser = await Users.add(user);
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
