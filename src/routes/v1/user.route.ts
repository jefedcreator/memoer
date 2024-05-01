import UserController from "@controllers/user.controller";
import { UserAuth } from "@middlewares/auth.middleware";
import { Router } from "express";
import { Container, Service } from "typedi";

@Service()
class UserRouter {
  readonly router = Router();
  private readonly userController = Container.get(UserController);

  constructor() {
    this.routes();
  }

  private routes() {
    this.router.get("/", UserAuth, this.userController.getUser);
    this.router.delete("/", UserAuth, this.userController.deleteUser);
    this.router.patch("/", UserAuth, this.userController.updateUser);
  }
}

export default new UserRouter();
