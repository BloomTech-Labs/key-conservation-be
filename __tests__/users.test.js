const supertest = require("supertest");
const server = require("../api/server.js");
const Users = require("../users/usersModel");
const db = require('../database/dbConfig')

describe("user routes", () => {
    beforeEach(async () => {
        await db("users").truncate();
    })
})

describe("it registers a new user", () => {
    it ("adds new user to database", async () => {
        let newConservationist = {
            id: 557,
            sub: "blahdumblee",
            username: "tralalalalala",
            email: "tralala@lala.tra",
            roles: "conservationist"
    
        }

        await supertest(server)
            .post('/api/users', newConservationist)
            .expect(401)
    } )
})