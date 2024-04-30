import UserController from "@controllers/user.controller";
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
    this.router.delete("/:id", this.userController.deleteUser);
  }
}

export default new UserRouter();
