const supertest = require("supertest");
const server = require("../index");
const db = require('../database/dbConfig');
const campModel = require('../campaigns/campModel')

describe("user routes", () => {
    beforeEach(async () => {
        await db("campaigns").truncate();
    })
})


describe("campaign routes", () => {
    it (" will not let you access social route without a token", async () => {
           await supertest(server)
                .get("/api/campaigns")
                .expect(401)
    })
})

describe('campaign find functionality', () => {
    it ("will return a defined entity", async () => {
        const campaigns = await campModel.find();
        expect(campaigns).toBeDefined();
    })

    it ("will return an array", async () => {
        const campaignArray = await campModel.find();
        expect(campaignArray).toStrictEqual([]);
    })
})
