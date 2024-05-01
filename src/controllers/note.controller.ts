import NoteService from "@services/note.service";
import { AuthenticatedRequest } from "@types";
import { CustomApiResponse } from "@utils";
import { NextFunction, Response } from "express";
import { Service } from "typedi";

@Service()
class NoteController {
  constructor(private readonly noteService: NoteService) {}

  createNote = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.userId);
      const user = await this.noteService.createNote(id, req.body);
      return CustomApiResponse(res, 201, "note created", user);
    } catch (e) {
      next(e);
    }
  };

  getNotes = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.userId);
      const user = await this.noteService.getNotes(id);
      return CustomApiResponse(res, 200, "notes fetched", user);
    } catch (e) {
      next(e);
    }
  };

  updateNote = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.userId);
      const noteId = Number(req.params.id);
      const user = await this.noteService.updateNote(id, noteId, req.body);
      return CustomApiResponse(res, 200, "note updated", user);
    } catch (e) {
      next(e);
    }
  };

  deleteNote = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.userId);
      const noteId = Number(req.params.id);
      const user = await this.noteService.deleteNote(id, noteId);
      return CustomApiResponse(res, 200, "note deleted", user);
    } catch (e) {
      next(e);
    }
  };
}

export default NoteController;
