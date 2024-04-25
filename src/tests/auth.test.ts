import assert from "node:assert";
import { after, describe, it } from "node:test";
import supertest from "supertest";
import app from "../index";

let userId;
let riderId;
let adminId;
let userToken;
let adminToken;
let riderToken;

// describe("POST /v1/auth/signup", function () {
//   it("should sign up a new user successfully", async function () {
//     const user = {
//       email: "JOndoe@email.com",
//       name: "Jon doe",
//       password: "notarealpassword10",
//       phone:"0801234"
//     };

//     const response = await supertest(app).post("/v1/auth/signup").send(user);
//     console.log("sign up response", response.text);

//     assert.strictEqual(response.status, 201);
//   });
// });

describe("POST /v1/auth/signin", function () {
  it("should login a user successfully", async function () {
    const user = {
      email: "JOHndoe@email.com",
      password: "notarealpassword10",
    };
    const response = await supertest(app).post("/v1/auth/signin").send(user);
    console.log("sign in response", response.text);
    assert.strictEqual(response.status, 201);
  });
});

describe("POST /v1/auth/password/reset", function () {
  it("should change password successfully", async function () {
    const user = {
      email: "jondoe@email.com",
      password: "notarealpassword11",
      confirmPassword: "notarealpassword11",
    };
    const response = await supertest(app)
      .post("/v1/auth/password/reset")
      .send(user);
    assert.strictEqual(response.status, 200);
  });
});

after(async function () {
  //   if (userId) {
  //     const deleteResponse = await supertest(app)
  //       .delete(`/v1/user/${userId}`)
  //       .set({
  //         "x-auth-token": userToken,
  //       });
  //     assert.strictEqual(deleteResponse.status, 200);
  //   }
  //   if (riderId) {
  //     const deleteResponse = await supertest(app)
  //       .delete(`/v1/user/${riderId}`)
  //       .set({
  //         "x-auth-token": riderToken,
  //       });
  //     assert.strictEqual(deleteResponse.status, 200);
  //   }
  //   if (adminId) {
  //     const deleteResponse = await supertest(app)
  //       .delete(`/v1/admin/${adminId}`)
  //       .set({
  //         "x-auth-token": adminToken,
  //       });
  //     assert.strictEqual(deleteResponse.status, 200);
  //   }
  process.exit(0);
});
