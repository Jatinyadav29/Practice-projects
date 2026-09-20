import express from "express";
import {
  createUrlController,
  deleteUrlController,
  getAllUrlController,
} from "../controllers/url.controller.js";

const router = express.Router();

router.post("/urls", createUrlController);
router.get("/urls", getAllUrlController);

router.delete("/urls/:code", deleteUrlController);

export default router;
