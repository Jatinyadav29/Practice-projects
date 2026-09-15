import "dotenv/config";

import app from "./src/app.js";
import connectDB from "./src/config/db.config.js";

const port = process.env.PORT;

connectDB();

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
