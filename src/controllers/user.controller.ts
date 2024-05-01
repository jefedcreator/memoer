import UserServie from "@services/user.service";
import { AuthenticatedRequest } from "@types";
import { CustomApiResponse } from "@utils";
import { NextFunction, Response } from "express";
import { Service } from "typedi";
@Service()
class UserController {
  constructor(private readonly authService: UserServie) {}

  deleteUser = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = Number(req.userId);
      const user = await this.authService.deleteUser(id);
      return CustomApiResponse(res, 200, "user deleted", user);
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;
