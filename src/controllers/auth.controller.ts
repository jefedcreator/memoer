import AuthService from "@services/auth.service";
import { CustomApiResponse } from "@utils";
import { NextFunction, Request, Response } from "express";
import { Service } from "typedi";

@Service()
class AuthController {
  constructor(private readonly authService: AuthService) {}

  signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.signUp(req.body);
      return CustomApiResponse(res, 201, "user created", user);
    } catch (e) {
      next(e);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.signIn(req.body);
      return CustomApiResponse(res, 201, "logged in", user);
    } catch (e) {
      next(e);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resetPassword = await this.authService.resetPassword(req.body);
      return CustomApiResponse(res, 200, "Reset successful", resetPassword);
    } catch (e) {
      next(e);
    }
  };
}

export default AuthController;
