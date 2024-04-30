import { Exception } from "@middlewares/error.middleware";
import { User } from "@repository/user";
import { Service } from "typedi";
import { Note } from "@repository/note";
import { INote } from "@types";
import { NoteCreationValidator } from "@validators/note.validator";

@Service()
class NoteService {
  constructor(
    private readonly user: User,
    private readonly note: Note
  ) {}

  async createNote(payload: INote) {
    const { error, value } = NoteCreationValidator(payload);    
    if (error) throw new Exception(400, error.details[0].message);
    const user = await this.user.findById(value.userId);
    if (!user) throw new Exception(400, "Incorrect Id, User does not exist");
    const note = await this.note.create(value);
    return note;
  }
}

export default NoteService;
