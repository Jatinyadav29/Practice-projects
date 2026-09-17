import express from "express";
import authRoutes from "../routes/app.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173/",
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello world 🌍",
  });
});

app.use("/api/auth", authRoutes);

export default app;
