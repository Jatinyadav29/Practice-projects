import dotenv from "dotenv";
dotenv.config();

import app from "./app/app.js";
import connectDB from "./config/db.js";
const port = process.env.PORT;

await connectDB();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
