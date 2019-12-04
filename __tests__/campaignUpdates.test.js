const supertest = require("supertest");
const server = require("../api/server.js");
const db = require('../database/dbConfig')

describe("user routes", () => {
    beforeEach(async () => {
        await db("campaignUpdates").truncate();
    })
})


describe("campaign routes", () => {
    it (" will not let you access social route without a token", async () => {
           await supertest(server)
                .get("/api/updates")
                .expect(401) 
    })
})