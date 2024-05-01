import Joi from "joi";
import {
  ICreateNote,
  IUpdateNote,
  NotePriority,
  NoteStatus,
  Reminder,
} from "../types";

export const NoteCreationValidator = (
  note: ICreateNote,
): Joi.ValidationResult<ICreateNote> => {
  const schema = Joi.object({
    title: Joi.string().trim().lowercase().required().label("Note Title"),
    content: Joi.string().trim().required().label("Note Content"),
    priority: Joi.string()
      .valid(...Object.values(NotePriority))
      .optional()
      .label("Note priority"),
    category: Joi.array<string>().optional().label("Note categories"),
    reminders: Joi.array<Pick<Reminder, "title" | "content">>()
      .optional()
      .label("Note reminders"),
  });
  const options = {
    errors: {
      wrap: {
        label: "",
        array: "",
      },
    },
  };
  return schema.validate(note, options);
};

export const NoteUpdationValidator = (
  note: IUpdateNote,
): Joi.ValidationResult<IUpdateNote> => {
  const schema = Joi.object({
    title: Joi.string().trim().lowercase().optional().label("Note Title"),
    content: Joi.string().trim().optional().label("Note Content"),
    priority: Joi.string()
      .valid(...Object.values(NotePriority))
      .optional()
      .label("Note priority"),
    status: Joi.string()
      .valid(...Object.values(NoteStatus))
      .optional()
      .label("Note status"),
    reminders: Joi.array<Pick<Reminder, "title" | "content">>()
      .optional()
      .label("Note reminders"),
  });
  const options = {
    errors: {
      wrap: {
        label: "",
        array: "",
      },
    },
  };
  return schema.validate(note, options);
};
