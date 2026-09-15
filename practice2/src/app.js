const express = require("express");
const appRouter = require("./routes/app.route");
const app = express();
app.use(express.json());

app.use("/demo", appRouter);

module.exports = app;
