const supertest = require("supertest");
const server = require("../api/server.js");
const db = require('../database/dbConfig');
const commentsModel = require('../comments/commentsModel')

describe("comments", () => {
    it ("can retrieve a list of comments", async () => {
        const getComments = await commentsModel.find();
        expect(getComments).toBeDefined();
    })
})