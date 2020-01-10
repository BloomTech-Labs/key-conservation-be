const supertest = require("supertest");
const server = require("../index");
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

// describe("post a new comment", () => {
//     it ("will post a new comment", async () => {
//         const newComment = {
//             users_id: 1,
//             camp_id: 2,
//             comment_id: 5,
//             comment_body: "Your mum"
//         };
//         const postNewComment = await commentsModel.insert(newComment);
//         expect(postNewComment).toBeDefined();
//     })
// })
