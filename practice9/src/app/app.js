import express from "express";
import urlRoutes from "../routes/url.routes.js";
import redirectRouter from "../routes/redirect.routes.js";

const app = express();
app.use(express.json());

app.use("/", redirectRouter);
app.use("/api", urlRoutes);

export default app;
