import { Router } from "express";
import AuthRouter from "./auth.route";
import NoteRouter from "./note.route";
import UserRouter from "./user.route";

const router = Router();

router.use("/auth", AuthRouter.router);
router.use("/user", UserRouter.router);
router.use("/notes", NoteRouter.router);

export default router;
