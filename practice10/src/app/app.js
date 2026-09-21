import express from "express";
import directRouter from "../router/direct.routes.js";

const app = express();

app.use(express.json());
app.use("/", directRouter);

export default app;
