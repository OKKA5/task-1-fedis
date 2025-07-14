const mongoose = require("mongoose");
const express = require("express");
const { body } = require("express-validator");
const app = express();

require("dotenv").config();
app.use(express.json());

const studentController = require("./controllers/studentController");

const URL = process.env.MongoUrl;
const port = process.env.PortNumber;

mongoose.connect(URL).then(() => {
  console.log("connected to database");
});

app.get("/api/students", studentController.getAllStudents);
app.get("/api/students/:studentId", studentController.getStudent);
app.post(
  "/api/students",
  [
    body("name")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("minimium char length is 3"),
    body("email").notEmpty().isEmail().withMessage("this is not email format"),
    body("age").notEmpty().withMessage("age cannot be empty"),
  ],
  studentController.addStudent
);
app.patch("/api/students/:studentId", studentController.updateStudent);
app.delete("/api/students/:studentId", studentController.deleteStudent);

app.listen(port, () => {
  console.log("listening on port 4000");
});
