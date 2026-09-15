import express from "express";
import appRouter from "../routes/app.route.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello 👋",
  });
});

app.use("/api", appRouter);

export default app;
