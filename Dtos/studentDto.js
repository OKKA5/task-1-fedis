const { body } = require("express-validator");
const validStudent = () => {
  return [
    body("name")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("minimium char length is 3"),
    body("email").notEmpty().isEmail().withMessage("this is not email format"),
    body("age").notEmpty().withMessage("age cannot be empty"),
    body("password").notEmpty().withMessage("password is required"),
  ];
};
module.exports = validStudent;
