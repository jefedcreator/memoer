import AuthController from "@controllers/auth.controller";
import { Router } from "express";
import { Container, Service } from "typedi";
@Service()
class AuthRouter {
  readonly router = Router();
  private readonly authController = Container.get(AuthController);

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
