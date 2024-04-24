import { Prisma } from "@prisma/client";
import { Service } from "typedi";
import { IUser } from "../types";
import { prisma } from "./prisma";

interface IFindOptions {
  select?: Prisma.UserSelect;
  include?: Prisma.UserInclude;
}

@Service()
export class User {
  async create(payload: IUser) {
    let data: any = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
    };

    return await prisma.user.create({ data });
  }

  async findOne(where: Prisma.UserWhereUniqueInput, options?: IFindOptions) {
    return await prisma.user.findFirst({ where: { ...where }, ...options });
  }

  public async findByEmail(email: string, options?: IFindOptions) {
    return await this.findOne({ email }, options);
  }

  public async findById(id: number, options?: IFindOptions) {
    return await this.findOne({ id }, options);
  }

  public async findByUsername(name: string, options?: IFindOptions) {
    return await this.findOne({ name }, options);
  }

  public async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput
  ) {
    return await prisma.user.update({ where: { ...where }, data: { ...data } });
  }

  public async deleteUser(where: Prisma.UserWhereUniqueInput) {
    return await prisma.user.delete({ where: { ...where } });
  }

  public async findMany(
    where: Prisma.UserWhereInput,
    data: Prisma.UserFindManyArgs
  ) {
    return await prisma.user.findMany({ where: { ...where }, ...data });
  }

  public async totalUsers(where?: Prisma.UserWhereInput) {
    return await prisma.user.count({
      where: {
        ...where,
      },
    });
  }
}
