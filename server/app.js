require("dotenv").config();

const express = require("express");
const compression = require('compression');
const router = require("./routes");

const app = express();

app.set("port", 5000);
app.use([
  express.urlencoded({
    extended: false,
  }),
  express.json(),
  compression(),
]);
app.use("/api/v1/", router);

app.get("/", (req, res) =>
  res.json({
    message: "server is running",
  })
);

module.exports = app;
