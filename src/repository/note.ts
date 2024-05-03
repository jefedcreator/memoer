import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { ICreateNote } from "../types";
import { prisma } from "./prisma";

interface IFindOptions {
  select?: Prisma.NoteSelect;
  include?: Prisma.NoteInclude;
}

@Service()
export class Note {
  async create(userId: number, payload: Omit<ICreateNote, "reminders">) {
    return await prisma.note.create({
      data: {
        title: payload.title,
        content: payload.content,
        priority: payload.priority,
        user: { connect: { id: userId } },
        categories: {
          create: payload.category?.map((c) => {
            return {
              category: {
                create: {
                  name: c,
                },
              },
            };
          }),
        },
      },
    });
  }

  async findOne(where: Prisma.NoteWhereUniqueInput, options?: IFindOptions) {
    return await prisma.note.findFirst({ where: { ...where }, ...options });
  }

  async findById(id: number, options?: IFindOptions) {
    return await this.findOne({ id }, options);
  }

  async updateNote(
    where: Prisma.NoteWhereUniqueInput,
    data: Prisma.NoteUpdateInput
  ) {
    return await prisma.note.update({ where: { ...where }, data: { ...data } });
  }

  async deleteNote(where: Prisma.NoteWhereUniqueInput) {
    return await prisma.note.delete({ where: { ...where } });
  }

  async findMany(where?: Prisma.NoteWhereInput, data?: Prisma.NoteFindManyArgs) {
    return await prisma.note.findMany({ where: { ...where }, ...data });
  }

  async findManyNoteCategories(
    where: Prisma.NoteCategoryWhereInput,
    data?: Prisma.NoteCategoryFindManyArgs
  ) {
    return await prisma.noteCategory.findMany({ where: { ...where }, ...data });
  }

  async totalNotes(where?: Prisma.NoteWhereInput) {
    return await prisma.note.count({
      where: {
        ...where,
      },
    });
  }
}
