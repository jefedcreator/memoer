import { Prisma } from "@prisma/client";
export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ISignIn {
  name: string;
  email: string;
  password: string;
}

export interface IChangePassword {
  email: string;
  currentPassword: string;
  password: string;
  confirmPassword: string;
}

export type IUpdateUser = Pick<
  Prisma.UserWhereUniqueInput,
  "name" | "email" 
>;
