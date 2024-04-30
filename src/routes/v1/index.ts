import { Router } from "express";
import AuthRouter from "./auth.route";
import UserRouter from "./user.route";
const router = Router();

router.use("/auth", AuthRouter.router);
router.use("/user", UserRouter.router);

export default router;
