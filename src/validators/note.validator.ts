import Joi from "joi";
import { INote, NoteCategory, NotePriority, Reminder } from "../types";

export const NoteCreationValidator = (
  note: INote
): Joi.ValidationResult<INote> => {
  const schema = Joi.object({
    title: Joi.string().trim().lowercase().required().label("Note Title"),
    content: Joi.string().trim().required().label("Note Content"),
    userId: Joi.number().required().label("User Id"),
    priority: Joi.string()
      .valid(...Object.values(NotePriority))
      .optional()
      .label("Note priority"),
    category: Joi.array<NoteCategory>().optional().label("Note categories"),
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
