const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
const app = express();
const studentRouter = require("./routes/studentRoutes");

require("dotenv").config();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());

const URL = process.env.MongoUrl;
const port = process.env.PortNumber;



mongoose.connect(URL).then(() => {
  console.log("connected to database");
});

app.use("/api/students", studentRouter);

app.listen(port, () => {
  console.log("listening on port 4000");
});
