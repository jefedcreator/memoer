import AuthController from "@controllers/auth.controller";
import { Router } from "express";
import { Container } from "typedi";

class AuthRouter {
  authController = Container.get(AuthController);
  readonly router = Router();

  constructor() {
    this.routes();
  }

  private routes() {
    this.router
      .post("/signup", this.authController.signUp)
      .post("/signin", this.authController.login)
      .post("/password-reset", this.authController.resetPassword);
  }
}

export default new AuthRouter();
