import "dotenv/config";

import connectDB from "./config/db.js";
import app from "./app/app.js";
const port = process.env.PORT;

await connectDB();

app.listen(port, () => {
  console.log(`Server running on port - ${port}`);
});
