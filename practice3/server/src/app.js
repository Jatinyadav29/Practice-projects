const express = require("express");
const appRouter = require("./routes/app.route");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(cors({ origin: "http://localhost:5173" }));

app.use("/demo", appRouter);

module.exports = app;
