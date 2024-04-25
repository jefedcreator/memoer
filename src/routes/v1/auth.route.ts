import AuthController from "@controllers/auth.controller";
import { User } from "@repository/user";
import AuthService from "@services/auth.service";
import { Router } from "express";

class AuthRouter {
  readonly router = Router();
  readonly authController = new AuthController(new AuthService(new User()));

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post("/signup", this.authController.signUp)
      .post("/signin", this.authController.login)
      .post("/password/reset", this.authController.resetPassword);
  }
}

export default new AuthRouter();
