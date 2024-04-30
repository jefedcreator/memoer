import assert from "node:assert";
import { after, describe, it } from "node:test";
import supertest from "supertest";
import app from "../index";
import { INote } from "@types";

let userId;
let riderId;
let adminId;
let userToken;
let adminToken;
let riderToken;

describe("POST /v1/auth/signup", function () {
  it("should sign up a new user successfully", async function () {
    const user = {
      email: "JOndoe3@email.com",
      name: "Jon doe 3",
      password: "notarealpassword10",
      phone: "0801234",
    };
    const response = await supertest(app).post("/v1/auth/signup").send(user);
    assert.strictEqual(response.status, 201);
  });
});

describe("POST /v1/auth/signin", function () {
  it("should login a user successfully", async function () {
    const user = {
      email: "JOndoe3@email.com",
      password: "notarealpassword10",
    };
    const response = await supertest(app).post("/v1/auth/signin").send(user);
    userId = JSON.parse(response.text).data.id;
    assert.strictEqual(response.status, 201);
  });
});

describe("POST /v1/note/add", function () {
  it("user should add a new note successfully", async function () {
    const note: INote = {
      title: "Random",
      content: "Random stuff",
      userId,
      priority: "MEDIUM",
    };
    const response = await supertest(app).post("/v1/note/add").send(note);
    assert.strictEqual(response.status, 201);
  });
});

after(async function () {
  if (userId) {
    const deleteResponse = await supertest(app)
      .delete(`/v1/user/${userId}`)
      .send();

    assert.strictEqual(deleteResponse.status, 200);
  }
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
