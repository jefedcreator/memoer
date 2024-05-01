import {
  NotePriority,
  NoteCategory,
  Reminder,
  NoteStatus,
} from ".prisma/client";
import { Prisma } from "@prisma/client";

export interface INote {
  title: string;
  content: string;
  userId: number;
  priority?: NotePriority;
  category?: NoteCategory[];
  reminders?: Pick<Reminder, "title" | "content">[];
}

export interface ICreateNote {
  title: string;
  content: string;
  priority?: NotePriority;
  category?: string[];
  reminders?: Pick<Reminder, "title" | "content">[];
}

export interface IUpdateNote extends Prisma.NoteUpdateInput {}

export { NotePriority, NoteCategory, Reminder, NoteStatus };
