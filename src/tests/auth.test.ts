import assert from "node:assert";
import { after, describe, it } from "node:test";
import supertest from "supertest";
import app from "../index";

let userToken;

describe("POST /v1/auth/signup", function () {
  it("should sign up a new user successfully", async function () {
    const user = {
      email: "JOndoe@email.com",
      name: "Jon doe",
      password: "notarealpassword10",
    };
    const response = await supertest(app).post("/v1/auth/signup").send(user);
    assert.strictEqual(response.status, 201);
  });
});

describe("POST /v1/auth/signin", function () {
  it("should login a user successfully", async function () {
    const user = {
      email: "JONdoe@email.com",
      password: "notarealpassword10",
    };
    const response = await supertest(app).post("/v1/auth/signin").send(user);
    userToken = JSON.parse(response.text).data.token;
    assert.strictEqual(response.status, 201);
  });
});

describe("POST /v1/auth/password/reset", function () {
  it("should change password successfully", async function () {
    const user = {
      email: "JOndoe@email.com",
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
  if (userToken) {
    const deleteResponse = await supertest(app)
      .delete(`/v1/user/`)
      .set({
        "x-auth-token": userToken,
      })
      .send();
    assert.strictEqual(deleteResponse.status, 200);
  }
  process.exit(0);
});
