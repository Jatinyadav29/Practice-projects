import express from "express";
import appRouter from "../routes/app.route.js";

const app = express();

app.use(express.json());
app.use("/api", appRouter);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Hello Ji 👋",
  });
});

export default app;
