// const supertest = require('supertest');

// const server = require('../api/server.js');

// const db = require('../database/dbConfig');

// const {
//   find,
//   findById,
//   insert,
//   update,
//   remove
// } = require('../Models/consModel');

// describe('Cons Routes', () => {
//   beforeEach(async () => {
//     await db("conservationists").truncate();
//   });

//   describe('GET /api/cons', () => {
//     it('should respond with 200', async () => {
//       const res = await supertest(server).get('/api/cons/');
//       expect(res.status).toBe(200);
//     });
//   });
//   it('should return an array', async () => {
//     let result;
//     await supertest(server)
//       .get('/api/cons')
//       .then(res => result = res.body);
//     expect (result.cons.length).toEqual(0)
//   });
//   describe("GET /api/cons/:id", () => {
//     it("responds 200", async () => {
//       let save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       await db("saves").insert(save);

//       let { id } = await db("saves")
//         .where("lat", 1234)
//         .first();

//       await supertest(server)
//         .get(`/saves/${id}`)
//         .set("Authorization", token)
//         .expect("Content-Type", /json/)
//         .expect(200);
//     });

//     it("returns an object with the desired id", async () => {
//       let save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       await db("saves").insert(save);

//       let { id } = await db("saves")
//         .where("lat", 1234)
//         .first();

//       await supertest(server)
//         .get(`/saves/${id}`)
//         .set("Authorization", token)
//         .then(res => (result = res.body));
//       expect(typeof result).toBe("object");
//       expect(result.id).toEqual(id);
//     });
//   });

//   describe("POST /", () => {
//     it("responds 201", async () => {
//       let save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       await supertest(server)
//         .post("/saves")
//         .send(save)
//         .set("Authorization", token)
//         .set("Accept", "application/json")
//         .expect("Content-Type", /json/)
//         .expect(201);
//     });

//     it("returns an object", async () => {
//       let save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       let result;
//       await supertest(server)
//         .post("/saves")
//         .send(save)
//         .set("Authorization", token)
//         .set("Accept", "application/json")
//         .then(res => (result = res.body));
//       expect(typeof result).toBe("object");
//     });
//   });

//   describe("PUT /:id", () => {
//     it("responds 201", async () => {
//       let save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       let modified = {
//         user_id: 1,
//         lat: 1235,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       await db("saves").insert(save);

//       let { id } = await db("saves")
//         .where("lat", 1234)
//         .first();

//       await supertest(server)
//         .put(`/saves/${id}`)
//         .send(modified)
//         .set("Authorization", token)
//         .set("Accept", "application/json")
//         .expect("Content-Type", /json/)
//         .expect(201);
//     });

//     it("returns the modified object", async () => {
//       let save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       let modified = {
//         user_id: 1,
//         lat: 1235,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       await db("saves").insert(save);

//       let { id } = await db("saves")
//         .where("lat", 1234)
//         .first();

//       await supertest(server)
//         .put(`/saves/${id}`)
//         .send(modified)
//         .set("Authorization", token)
//         .set("Accept", "application/json")
//         .expect("Content-Type", /json/)
//         .then(res => (result = res.body));
//       expect(typeof result).toBe("object");
//       expect(result.lat).toEqual(1235);
//     });
//   });
//   describe("DELETE /:id", () => {
//     it("responds 204", async () => {
//       let save = {
//         user_id: 1,
//         lat: 1234,
//         lon: 5678,
//         address: "123 4th St."
//       };

//       await db("saves").insert(save);

//       let { id } = await db("saves")
//         .where("lat", 1234)
//         .first();

//       await supertest(server)
//         .delete(`/saves/${id}`)
//         .set("Authorization", token)
//         .expect(204);
//     });
//   });
// });
