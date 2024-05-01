import { Request } from "express";
interface AuthenticatedRequest extends Request {
  userId?: number;
}

export * from "./note";
export * from "./user";
export * from "./mail";
export { AuthenticatedRequest };
