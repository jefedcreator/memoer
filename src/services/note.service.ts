import { Exception } from "@middlewares/error.middleware";
import { Note } from "@repository/note";
import { User } from "@repository/user";
import { ICreateNote, IUpdateNote, NotePriority } from "@types";
import { Mailer } from "@utils";
import {
  NoteCreationValidator,
  NoteUpdationValidator,
} from "@validators/note.validator";
import { setInterval } from "timers/promises";
import { Service } from "typedi";

@Service()
class NoteService {
  constructor(
    private readonly user: User,
    private readonly note: Note,
    private readonly mail: Mailer
  ) {}

  private async checkUser(id: number) {
    const user = await this.user.findById(id);
    if (!user) throw new Exception(400, "Incorrect Id, User does not exist");
    return user;
  }

  async createNote(userId: number, payload: ICreateNote) {
    const { error, value } = NoteCreationValidator(payload);
    if (error) throw new Exception(400, error.details[0].message);
    const user = await this.checkUser(userId);
    const note = await this.note.create(userId, value);
    return note;
  }

  async getNotes(userId: number) {
    await this.checkUser(userId);
    const notes: any = await this.note.findMany(
      {
        userId,
      },
      {
        include: {
          categories: {
            select: {
              category: {
                select: {
                  name: true,
                  id: true,
                },
              },
            },
          },
        },
      }
    );

    return notes.map(
      (note: { categories: { category: { name: any; id: any } }[] }) => {
        return {
          ...note,
          categories: note.categories.map(
            (category: { category: { name: any; id: any } }) => ({
              name: category.category.name,
              id: category.category.id,
            })
          ),
        };
      }
    );
  }

  async getNotesCategories(userId: number) {
    await this.checkUser(userId);
    const notes = await this.note.findManyNoteCategories(
      { note: { userId } },
      { select: { note: true } }
    );
    return notes;
  }

  async updateNote(userId: number, id: number, data: IUpdateNote) {
    const { error, value } = NoteUpdationValidator(data);
    if (error) throw new Exception(400, error.details[0].message);
    await this.checkUser(userId);
    const note = await this.note.findOne({ userId, id });
    if (!note) throw new Exception(400, "Incorrect Id, Note not found");
    return await this.note.updateNote({ userId, id }, value);
  }

  async deleteNote(userId: number, id: number) {
    await this.checkUser(userId);
    const note = await this.note.findOne({ userId, id });
    if (!note) throw new Exception(400, "Incorrect Id, Note not found");
    return await this.note.deleteNote({ userId, id });
  }

  async sendNoteReminder() {
    setTimeout(async () => {
      await Promise.all([
        this.sendReminderForPriority("HIGH"),
        this.sendReminderForPriority("MEDIUM"),
        this.sendReminderForPriority("LOW"),
      ]);
    }, 60000);
    setTimeout(async () => {
      await Promise.all([
        this.sendReminderForPriority("HIGH"),
        this.sendReminderForPriority("MEDIUM"),
      ]);
    }, 45000);
    setTimeout(async () => {
      await Promise.all([this.sendReminderForPriority("HIGH")]);
    }, 30000);
    return true;
  }

  private async sendReminderForPriority(priority: NotePriority) {
    const notes = await this.note.findMany({ priority });
    notes.forEach(async (note) => {
      console.log(`${priority} priority: ${note.content}`);
      if (note.userId && note.status !== "COMPLETE") {
        let user = await this.checkUser(note.userId);
        await this.mail.nodemailersend({
          to: user.email,
          username: user.name,
          subject: "Memoer",
          content: "You have a reminder",
          template: "<h1>Welcome</h1>",
        });
      }
    });
  }
}

export default NoteService;
