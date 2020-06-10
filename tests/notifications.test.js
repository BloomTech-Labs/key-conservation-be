const supertest = require('supertest');
const server = require('../app');
const db = require('../app/database/dbConfig');

beforeAll(() => {
    db('users').truncate();
});

afterAll(async () => {
    db.destroy();
});

describe('notifications route', () => {
    it('will return 400 if no notifications exist for the ID, 200 and the notifications if any do exist', async () => {
        await supertest(server)
            .get('/api/notifications/0')
            .expect(400); // Shouldn't exist, so 400
    });
});

describe('notifications route 2, electric boogaloo', () => {
    it('will return 400 if no notifications exist for the user ID and notification ID provided, 200 and the notification if it does exist', async () => {
        await supertest(server)
            .get('/api/notifications/0/1') // :UID/:NID
            .expect(400); // Shouldn't exist, so 400
    });
});