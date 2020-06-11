const supertest = require('supertest');
const server = require('../app');
const db = require('../app/database/dbConfig');

jest.mock("../app/database/models/notificationsModel");
const Notifications = require('../app/database/models/notificationsModel');

describe('notifications endpoint', () => {
    describe('GET/:UID', () => {
        it('should return message with 0 notifications', async () => {
            Notifications.get = () => {return[]}
            const res = await supertest(server).get('/api/notifications/0')

            expect(200); 
            expect(res.body).toEqual({"message": "0 notifications were found", "notifications": []})
        });
        it('should return message with 2 notifications', async () => {
            Notifications.get = () => {return["notification 1", "notification 2"]}
            const res = await supertest(server).get('/api/notifications/0')

            expect(200); 
            expect(res.body).toEqual({"message": "2 notifications were found", "notifications": ["notification 1", "notification 2"]})
        });
    })
    describe('GET/:UID/:NID', () => {
        it('should return status 200', async () => {
            Notifications.getByID = () => {return[]}
            const res = await supertest(server).get('/api/notifications/0/0')
            expect(res.status).toBe(200)
        })

        it('should return one notification', async () => {
            Notifications.getByID = () => {return["notification 1"]}
            const res = await supertest(server).get('/api/notifications/0/0');
            expect(res.body).toEqual({"message": "Notification found", "notification": ["notification 1"]})
        })
    })

    describe('PUT/', () =>{
        it('should return an object with a message and notification when notification has been updated', async ()=> {
            Notifications.mark = () => { return  ["notification 1"]}
            const res = await supertest(server).put('/api/notifications', {"userID":1, "notifID":1})
            expect(res.body).toEqual({"message": 'Notification updated', "notification": ["notification 1"]})
         }) 
    })

    describe('PUT/', () =>{
        it('should return a 200 when notification has been updated', async ()=> {
            Notifications.mark = () => { return  ["notification 1"]}
            const res = await supertest(server).put('/api/notifications', {"userID":1, "notifID":1})
            expect(res.status).toBe(200)    
        })
    })
    
    describe('DELETE/', () => {
        it('should return a 200 when notification has been deleted', async ()=> {
            Notifications.deleteByID = () => { return 1; }
            const res = await supertest(server).delete('/api/notifications/', {"userID":1, "notifID":1})
            expect(res.status).toBe(200);
        })
    
    });

    describe('DELETE/', () => {
        it('should return an empty object when notification has been deleted', async () => {
            Notifications.deleteByID = () => { return 1; }
            const res = await supertest(server).delete('/api/notifications/', {"userID":1, "notifID":1})
            expect(res.body).toEqual({"message": "Notification deleted"});
        })
    })

    describe('POST/', () => {
        it('should return status 200 when notification has been created', async () => {
            Notifications.create = () => {return {}}
            const res = await supertest(server).post('/api/notifications/', {"userID":1, "notifID":1})
            expect(res.status).toBe(200);
        })
    })
    

});

// You do, yeah. Didn't save. Look at the output, not correct.

// '/:UID' - This is a GET endpoint. It fetches ALL of the users notifications.
// '/:UID/:NID' - This is a GET endpoint. It fetches a specific notification.
// '/:ID' - This is a PUT endpoint. It sets the provided notifications as READ.
// '/:ID' - This is a DELETE endpoint. It deletes the provided notification.
// '/all/' - This is a PUT endpoint. It marks ALL of the users notifications as READ.
// '/all/' - This is a DELETE endpoint. It deletes ALL of the users notifications.
// '/' - This is a POST endpoint. It creates a new notification.