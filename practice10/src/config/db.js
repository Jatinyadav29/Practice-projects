import mongoose from "mongoose";
import config from "./config.js";

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(`Connection error with Database - ${error}`);
  }
}
