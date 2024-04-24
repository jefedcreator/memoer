var chai = require("chai");
const chaiHttp = require("chai-http");
var expect = chai.expect;
chai.use(chaiHttp);
chai.should();

describe("POST /signup", function () {
  it("should create a new user", function (done) {
    const newUser = {
      user_name: "jack bauer",
      user_password: "mr24",
      user_mobile: "345564",
    };

    chai
      .request("http://localhost:8000/api/v1")
      .post("/signup")
      .send(newUser)
      .end(function (err, res) {
        expect(res).to.have.status(201);
        expect(res.body.STATUS).to.equal("OK");
        expect(res.body.data).to.be.an("object");
        expect(res.body.data.username).to.equal(newUser.username);
        expect(res.body.data.email).to.equal(newUser.email);
        done();
      });
  });
});


describe("POST /login", () => {
  it("should return a 200 status code and an OK status message", (done) => {
    chai
      .request("http://localhost:8000/api/v1")
      .post("/login")
      .send({
        user_name: "jackdoe",
        user_password: "mine1234"
      })
      .set("Cookie", "id=5") // set the user_id cookie to simulate an authenticated user
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property("STATUS", "OK");
        done();
      });
  });
});

describe("POST /notes", () => {
    it("should create a new note", (done) => {
      chai
        .request("http://localhost:8000/api/v1") // replace with the URL of your server
        .post("/notes")
        .send({
          note_title: "Test note title",
          note_content: "Test note content",
          note_status: "active"
        })
        .set("Cookie", "id=5") // replace with a valid user ID cookie
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.be.an("object");
          expect(res.body.STATUS).to.equal("OK");
          expect(res.body.data.note_title).to.equal("Test note title");
          expect(res.body.data.note_content).to.equal("Test note content");
          expect(res.body.data.note_status).to.equal("active");
          done();
        });
    });
  
    it("should return an error if not logged in", (done) => {
      chai
      .request("http://localhost:8000/api/v1") // replace with the URL of your server
      .post("/notes")
        .send({
          note_title: "Test note title",
          note_content: "Test note content",
          note_status: "active"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body.STATUS).to.equal("ERROR");
          expect(res.body.message).to.equal("Login to create notes");
          done();
        });
    });
  
    it("should return an error if title, content, or status are missing", (done) => {
      chai
      .request("http://localhost:8000/api/v1") // replace with the URL of your server
      .post("/notes")
        .send({
          note_title: "Test note title",
          note_content: "",
          note_status: ""
        })
        .set("Cookie", "id=5") // replace with a valid user ID cookie
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.be.an("object");
          expect(res.body.STATUS).to.equal("ERROR");
          expect(res.body.message).to.equal("Title, status and content are required");
          done();
        });
    });
  });

describe("GET /notes", () => {
  it("should return a list of notes", (done) => {
    chai
      .request("http://localhost:8000/api/v1")
      .get("/notes")
      .set("Cookie", "id=5")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("STATUS").that.equals("OK");
        expect(res.body).to.have.property("data").that.is.an("array");
        done();
      });
  });
  it("should return an error if user is not logged in", (done) => {
    chai
      .request("http://localhost:8000/api/v1")
      .get("/notes")
    //   .set("Cookie", "id=0")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(401);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("STATUS").that.equals("ERROR");
        expect(res.body)
          .to.have.property("message")
          .that.equals("Unauthorized: login to view your notes");
        done();
      });
  });
});

describe("PUT /notes/:id", () => {
  it("should update a note with a given id", (done) => {
    const note = {
      note_title: "Updated Title",
      note_content: "Updated Content",
    };
    chai
      .request("http://localhost:8000/api/v1")
      .put("/notes/29")
      .set("Cookie", "id=5")
      .send(note)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.STATUS.should.be.eql("OK");
        res.body.data.should.be.an("object");
        done();
      });
  });
});

describe("DELETE /notes/:id", () => {
    it("should delete a note successfully", (done) => {
      chai
      .request("http://localhost:8000/api/v1")
        .delete("/notes/29")
        .set("Cookie", "id=5")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property("STATUS").eql("OK");
          res.body.should.have.property("message").eql("Note deleted successfully");
          done();
        });
    });
  
    it("should return an error message when trying to delete another user's note", (done) => {
      chai
      .request("http://localhost:8000/api/v1")
        .delete("/notes/28")
        .set("Cookie", "id=5")
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.have.property("STATUS").eql("ERROR");
          res.body.should.have.property("message").eql("Forbidden: Cannot delete another user's note");
          done();
        });
    });
  
    it("should return an error message when note is not found", (done) => {
      chai
      .request("http://localhost:8000/api/v1")
        .delete("/notes/11")
        .set("Cookie", "id=5")
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property("STATUS").eql("ERROR");
          res.body.should.have.property("message").eql("Note not found");
          done();
        });
    });
  
    it("should return an error message when not logged in", (done) => {
      chai
      .request("http://localhost:8000/api/v1")
        .delete("/notes/1")
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property("STATUS").eql("ERROR");
          res.body.should.have.property("message").eql("Unauthorized: Login to delete your notes");
          done();
        });
    });
  });
