import express from "express";
import {
  redirectToOriginalUrlController,
  demoController,
} from "../controllers/url.controller.js";

const redirectRouter = express.Router();

redirectRouter.get("/", demoController);

redirectRouter.get("/:code", redirectToOriginalUrlController);

export default redirectRouter;
