import UserServie from "@services/user.service";
import { CustomApiResponse } from "@utils";
import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";

@Service()
class UserController {
  constructor(private readonly authService: UserServie) {}

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const user = await this.authService.deleteUser(id);
      return CustomApiResponse(res, 200, "user deleted", user);
    } catch (e) {
      next(e);
    }
  };
}

export default UserController;
