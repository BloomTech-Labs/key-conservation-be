const supertest = require("supertest");
const server = require("../api/server.js");
const db = require('../database/dbConfig');
const commentsModel = require('../comments/commentsModel')

describe("comment route", () => {
    it ("will not give a 200 without a token", async () => {
        await supertest(server)
            .get("/api/comments")
            .expect(401)
    })
})

describe("comment get request", () => {
    it ("can retrieve a list of comments", async () => {
        const getComments = await commentsModel.find();
        expect(getComments).toBeDefined();
    })
})

