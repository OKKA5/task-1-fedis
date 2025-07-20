const mongoose = require("mongoose");
const roles = require("../helpers/roles");
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: [roles.ADMIN, roles.USER],
      default: roles.USER,
    },
    avatar: {
      type: String,
      default:"uploads/pic.png"
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
