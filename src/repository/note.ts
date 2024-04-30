import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { INote } from "../types";
import { prisma } from "./prisma";

interface IFindOptions {
  select?: Prisma.NoteSelect;
  include?: Prisma.NoteInclude;
}

@Service()
export class Note {
  async create(data: Omit<INote, "reminders">) {
    return await prisma.note.create({ data });
  }

  async findOne(where: Prisma.NoteWhereUniqueInput, options?: IFindOptions) {
    return await prisma.note.findFirst({ where: { ...where }, ...options });
  }

  async findById(id: number, options?: IFindOptions) {
    return await this.findOne({ id }, options);
  }

  async updateNote(
    where: Prisma.NoteWhereUniqueInput,
    data: Prisma.NoteUpdateInput,
  ) {
    return await prisma.note.update({ where: { ...where }, data: { ...data } });
  }

  async deleteNote(where: Prisma.NoteWhereUniqueInput) {
    return await prisma.note.delete({ where: { ...where } });
  }

  async findMany(where: Prisma.NoteWhereInput, data: Prisma.NoteFindManyArgs) {
    return await prisma.note.findMany({ where: { ...where }, ...data });
  }

  async totalUsers(where?: Prisma.NoteWhereInput) {
    return await prisma.note.count({
      where: {
        ...where,
      },
    });
  }
}
