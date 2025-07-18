const express = require("express");
const studentController = require("../controllers/studentController");
const valid = require("../Dtos/studentDto");
const router = express.Router();
const verifyToken = require("../helpers/tokenAuth");
const allowed = require("../helpers/allowed");
const roles=require("../helpers/roles")

router
  .route("/")
  .get(verifyToken.verifyToken,allowed(roles.ADMIN,roles.USER),studentController.getAllStudents)
  .post(valid(),allowed(roles.ADMIN),verifyToken.verifyToken, studentController.addStudent);
router
  .route("/:studentId")
  .get(verifyToken.verifyToken,allowed(roles.ADMIN,roles.USER),studentController.getStudent)
  .patch(verifyToken.verifyToken,allowed(roles.ADMIN),studentController.updateStudent)
  .delete(verifyToken.verifyToken,allowed(roles.ADMIN),studentController.deleteStudent);
router.route("/register").post(valid(), studentController.register);

router.route("/login").post(studentController.login);
module.exports = router;
