const express = require("express");
const studentController = require("../controllers/studentController");
const valid =require('../Dtos/studentDto')
const router = express.Router();

router
  .route("/")
  .get(studentController.getAllStudents)
  .post(
    valid() ,
    studentController.addStudent
  );
router
  .route("/:studentId")
  .get(studentController.getStudent)
  .patch(studentController.updateStudent)
  .delete(studentController.deleteStudent);
module.exports = router;
