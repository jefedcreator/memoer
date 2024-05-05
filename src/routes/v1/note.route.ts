import NoteController from "@controllers/note.controller";
import { Router } from "express";
import { Container, Service } from "typedi";
import { UserAuth } from "@middlewares/auth.middleware";
@Service()
class NoteRouter {
  readonly router = Router();
  private readonly noteController = Container.get(NoteController);

  constructor() {
    this.routes();
  }

  private routes() {
    this.router.post("/", UserAuth, this.noteController.createNote);
    this.router.get("/", UserAuth, this.noteController.getNotes);
    this.router.get("/:id", UserAuth, this.noteController.getNote);
    this.router.patch("/:id", UserAuth, this.noteController.updateNote);
    this.router.delete("/:id", UserAuth, this.noteController.deleteNote);
    this.router.get("/reminder", this.noteController.sendReminders);
  }
}

export default new NoteRouter();
