import express from "express";
import {
  getUserController,
  registerController,
} from "../controllers/auth.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Register new User
router.post("/auth/register", registerController);

// Get an existing user - if any
router.get("/auth/user", authenticate, getUserController);

export default router;
