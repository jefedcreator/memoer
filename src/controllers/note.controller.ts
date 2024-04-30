import NoteService from "@services/note.service";
import { CustomApiResponse } from "@utils";
import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";

@Service()
class NoteController {
  constructor(private readonly noteService: NoteService) {}

  createNote = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.noteService.createNote(req.body);
      return CustomApiResponse(res, 201, "note created", user);
    } catch (e) {
      next(e);
    }
  };
}

export default NoteController;
