const express = require("express");
const studentController = require("../controllers/studentController");
const valid = require("../Dtos/studentDto");
const router = express.Router();
const verifyToken = require("../helpers/tokenAuth");
const allowed = require("../helpers/allowed");
const roles = require("../helpers/roles");
const validLogin = require("../Dtos/loginDto");
const validate = require("../helpers/validate");
const multer = require("multer");
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = (req, res, next) => {
  const imgType = file.mimetype.split("/")[0];
  if (imgType == "image") {
    return cb(null, true);
  } else {
    return cb(new Error("Only images allowed"), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter: fileFilter });

router
  .route("/")
  .get(
    verifyToken.verifyToken,
    allowed(roles.ADMIN, roles.USER),
    studentController.getAllStudents
  )
  .post(
    valid(),
    allowed(roles.ADMIN),
    verifyToken.verifyToken,
    studentController.addStudent
  );
router
  .route("/:studentId")
  .get(
    verifyToken.verifyToken,
    allowed(roles.ADMIN, roles.USER),
    studentController.getStudent
  )
  .patch(
    verifyToken.verifyToken,
    allowed(roles.ADMIN),
    studentController.updateStudent
  )
  .delete(
    verifyToken.verifyToken,
    allowed(roles.ADMIN),
    studentController.deleteStudent
  );
router
  .route("/register")
  .post(valid(), upload.single("avatar"), studentController.register);

router.route("/login").post(validate(validLogin), studentController.login);
module.exports = router;
