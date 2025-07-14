const { validationResult } = require("express-validator");
const Student = require("../models/student");

const getAllStudents = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 4;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const students = await Student.find().limit(limit).skip(skip);
  res.json(students);
  console.log(students);
};
const getStudent = async (req, res) => {
  const student = await Student.findById(req.params.studentId);
  if (student) {
    res.json(student);
  } else {
    res.status(500).json({ msg: "User Doesnt exist" });
  }
};
const addStudent = async (req, res) => {
  const newStudent = new Student(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json(errors.array());
  }
  const existingStudent = await Student.findOne({ email: req.body.email });
  if (existingStudent) {
    res.status(500).json({ msg: "email already exists" });
    return;
  }
  await newStudent.save();
  res.json(newStudent);
};
const updateStudent = async (req, res) => {
  const student = await Student.findOne({ email: req.body.email });
  if (student) {
    await Student.findByIdAndUpdate(req.params.studentId, {
      $set: { ...req.body },
    });
    res.json({ msg: "student updated success" });
  } else {
    res.status(500).json({ msg: "user doesnt exist" });
  }
};
const deleteStudent = async (req, res) => {
  const student = await Student.findOne({ _id: req.params.studentId });
  if (student) {
    await Student.deleteOne(student);
    res.json({ msg: "deleted success" });
  } else {
    res.status(500).json({ msg: "user doesnt exist" });
  }
};
module.exports = {
  deleteStudent,
  updateStudent,
  addStudent,
  getStudent,
  getAllStudents,
};
