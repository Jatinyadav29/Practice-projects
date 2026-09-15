import express from "express";
import {
  registerController,
  authenticationCheckController,
  loginController,
} from "../controller/app.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/auth/register", registerController);
router.get("/auth/me", authenticate, authenticationCheckController);

router.post("/auth/login", loginController);

export default router;
