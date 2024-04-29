import { Router } from "express";
import AuthRouter from "./auth.route";

const router = Router();

router.use("/auth", AuthRouter.router);

export default router;
