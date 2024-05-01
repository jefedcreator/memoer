import { ICreateNote, IUpdateNote, IUpdateUser } from "@types";
import assert from "node:assert";
import { after, describe, it } from "node:test";
import supertest from "supertest";
import app from "../index";

let userToken;
let noteId;

describe("POST /v1/auth/signup", function () {
  it("should sign up a new user successfully", async function () {
    const user = {
      email: "JOndoe3@email.com",
      name: "Jon doe 3",
      password: "notarealpassword10",
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
    userToken = JSON.parse(response.text).data.token;
    assert.strictEqual(response.status, 201);
  });
});

describe("POST /v1/notes/", function () {
  it("user should add a new note successfully", async function () {
    const note: ICreateNote = {
      title: "Random",
      content: "Random stuff",
      priority: "MEDIUM",
      category: ["work", "pleasure"],
    };
    const response = await supertest(app)
      .post("/v1/notes/")
      .set({
        "x-auth-token": userToken,
      })
      .send(note);
    noteId = JSON.parse(response.text).data.id;
    assert.strictEqual(response.status, 201);
  });
});

describe("GET /v1/notes/", function () {
  it("should get a user notes successfully", async function () {
    const response = await supertest(app)
      .get(`/v1/notes/`)
      .set({
        "x-auth-token": userToken,
      })
      .send();
    assert.strictEqual(response.status, 200);
  });
});

describe("PATCH /v1/notes/:id", function () {
  it("should get a user notes successfully", async function () {
    const note: IUpdateNote = {
      title: "Random",
      content: "Good stuff",
      priority: "HIGH",
      status: "COMPLETE",
    };
    const response = await supertest(app)
      .patch(`/v1/notes/${noteId}`)
      .set({
        "x-auth-token": userToken,
      })
      .send(note);
    assert.strictEqual(response.status, 200);
  });
});

describe("GET /v1/user/", function () {
  it("should get a user profile successfully", async function () {
    const response = await supertest(app)
      .get(`/v1/user/`)
      .set({
        "x-auth-token": userToken,
      })
      .send();
    assert.strictEqual(response.status, 200);
  });
});

describe("PATCH /v1/user/", function () {
  it("should get a user profile successfully", async function () {
    const user: IUpdateUser = {
      name: "John doe",
    };
    const response = await supertest(app)
      .patch(`/v1/user/`)
      .set({
        "x-auth-token": userToken,
      })
      .send(user);
    assert.strictEqual(response.status, 200);
  });
});

describe("DELETE /v1/notes/:id", function () {
  it("should delete a user note successfully", async function () {
    const response = await supertest(app)
      .delete(`/v1/notes/${noteId}`)
      .set({
        "x-auth-token": userToken,
      })
      .send();
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
