const supertest = require("supertest");
const server = require("../index");
const db = require('../database/dbConfig')

describe("user routes", () => {
    beforeEach(async () => {
        await db("users").truncate();
    })
})

describe("it registers a user creating a new login", () => {
    it("registers a new user", async () => {
        let newUser = {
            username: "dobbie",
            password: "house elf"
        }

        await supertest(server).post("/api/register", newUser)
            .expect(404)
    })
})

describe("it registers a new user", () => {
    it ("won't add a new user without a token", async () => {
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
    })

    it("will not register a user with incomplete creds", async () => {
        let anotherNewConservationist = {
            sub: "tu madre",
            username: "votre maman"
        }

        await supertest(server)
            .post("/api/users", anotherNewConservationist)
            .expect(401)
    })
})
