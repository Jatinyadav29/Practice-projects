import express from "express";
import { demo } from "../controllers/app.controller.js";

const router = express.Router();

router.get("/", demo);

export default router;
