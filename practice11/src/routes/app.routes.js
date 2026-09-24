import express from "express";
import { demo, registerController } from "../controllers/app.controller.js";
import { validateBody } from "../middleware/validation.middleware.js";
import { registerSchema } from "../validators/auth.zod.js";

const router = express.Router();

router.get("/", demo);
router.post("/register", validateBody(registerSchema), registerController);

export default router;
