const db = require('../dbConfig.js');
const pick = require('../../../util/pick');

/* FUNCTIONS

    'get()' - Gets all notifications.
    'getByID(UID, NID)' - Gets a specific notification using the provided ID.
    'mark(UID, NID)' - Marks a specific notification as READ.
    'markAll()' - Marks ALL notifications as READ.
    'deleteByID(UID, NID)' - Deletes a specific notification.
    'deleteAll()' - Deletes ALL notifications.
    'create(data)' - Creates a new notification via the data supplied.

*/

function get(UID) {

    return db('notifications')
        .where('user_id', UID);

}

function getByID(UID, NID) {

    return db('notifications')
        .select('*')
        .where('user_id', UID)
        .andWhere('notification_id', NID)
        .first();

}

function mark(UID, NID) {

    return db('notifications')
        .select('*')
        .where('user_id', UID)
        .andWhere('notification_id', NID)
        .first()
        .update({ 'new_notification': false });

}

function markAll(UID) {

    return db('notifications')
        .select('*')
        .where('user_id', UID)
        .update({ 'new_notification': false });

}

function deleteByID(UID, NID) {

    return db('notifications')
        .select('*')
        .where('user_id', UID)
        .andWhere('notification_id', NID)
        .first()
        .del();

}

function deleteAll(UID) {

    return db('notifications')
        .select('*')
        .where('user_id', UID)
        .del();

}

function create(data) {

    return db('notifications')
        .insert(data);

}

module.exports = {
  get,
  getByID,
  mark,
  markAll,
  deleteByID,
  deleteAll,
  create
};