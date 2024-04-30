import NoteController from "@controllers/note.controller";
import { Router } from "express";
import { Container, Service } from "typedi";
@Service()
class NoteRouter {
  readonly router = Router();
  private readonly noteController = Container.get(NoteController);

  constructor() {
    this.routes();
  }

  private routes() {
    this.router.post("/add", this.noteController.createNote);
  }
}

export default new NoteRouter();
