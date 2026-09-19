import express from "express";
import {
  refreshTokenController,
  registerController,
  userInfoController,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", registerController);
router.get("/me", userInfoController);

router.post("/refresh", refreshTokenController);

export default router;
