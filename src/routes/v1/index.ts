import { Router } from "express";
import AuthRouter from "./auth.route";
import UserRouter from "./user.route";
import NoteRouter from "./note.route";
const router = Router();

router.use("/auth", AuthRouter.router);
router.use("/user", UserRouter.router);
router.use("/note", NoteRouter.router);

export default router;
