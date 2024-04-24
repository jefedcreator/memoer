import express from "express";
import V1Router from "./v1";

const router = express.Router();

// Add sub-routes
router.use("/v1", V1Router);

// Export the base-router
export default router;
