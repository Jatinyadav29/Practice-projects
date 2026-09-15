import express from "express";
import dotenv from "dotenv";
import postRouter from "./routes/post.route.js";

dotenv.config();
const app = express();

app.use("/post", postRouter);

export default app;
