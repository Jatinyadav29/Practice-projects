import express from "express";
import {
  authRegisterController,
  getSingleUserController,
  refreshAuthTokensController,
} from "../controllers/auth.controller.js";

const router = express.Router();

// * User Register and Info routes
router.post("/register", authRegisterController);
router.get("/me", getSingleUserController);

// * Used to refresh Both the tokens
router.post("/refresh", refreshAuthTokensController);

export default router;
