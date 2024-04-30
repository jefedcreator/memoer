import { NotePriority, NoteCategory, Reminder } from ".prisma/client";

export interface INote {
  title: string;
  content: string;
  userId: number;
  priority?: NotePriority;
  category?: NoteCategory[];
  reminders?: Pick<Reminder, "title" | "content">[];
}

export { NotePriority, NoteCategory, Reminder };
