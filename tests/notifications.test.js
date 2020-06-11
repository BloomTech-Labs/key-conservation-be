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
    it('should return a 200 when notification has been updated', async ()=> {
Notifications.mark = () => { return  ["notification 1"]}
 const res = await supertest(server).put('/api/notifications', {"userID":1, "notifID":1})
 expect(res.body).toEqual({"message": 'Notification updated', "notification": ["notification 1"]})
    })

})
}) 