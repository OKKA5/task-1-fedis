const { validationResult } = require("express-validator");
const Student = require("../models/student");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, age, email, password, role } = req.body;
  const existingStudent = await Student.findOne({ email: req.body.email });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json(errors.array());
  }
  if (existingStudent) {
    return res.status(500).json({ msg: "email already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 8);
  const newStudent = new Student({
    name,
    age,
    email,
    password: hashedPassword,
    role,
    avatar: req.file.filename, 
  });
  const token = await jwt.sign(
    { email: newStudent.email, _id: newStudent._id, role: newStudent.role },
    process.env.SercretKey,
    { expiresIn: "10m" }
  );
  console.log(token);
  await newStudent.save();
  newStudent.token = token;
  res.status(200).json({ msg: "User Registered succesfully" }, newStudent);
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "email and password required" });
  }
  const student = await Student.findOne({ email: email });
  if (!student) {
    return res.status(400).json({ msg: "email or password aren't correct" });
  }
  const matchedPassword = await bcrypt.compare(password, student.password);
  if (!matchedPassword) {
    return res.status(400).json({ msg: "email or password aren't correct" });
  }
  const token = jwt.sign(
    { email: student.email, _id: student._id, role: student.role },
    process.env.SercretKey,
    { expiresIn: "10m" }
  );
  return res
    .status(200)
    .json({ msg: "user logged in successfully", data: { token } });
};

const getAllStudents = async (req, res) => {
  const query = req.query;
  const limit = query.limit || 4;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const students = await Student.find({}, { password: false })
    .limit(limit)
    .skip(skip);
  res.json(students);
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
  const studentData = await Student.findByIdAndUpdate(req.params.studentId, {
    $set: { ...req.body },
    new: true,
  });
  if (!studentData) {
    res.status(500).json({ msg: "user doesnt exist" });
  }
  res.json({ msg: "student updated success" });
};
const deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndDelete({
    _id: req.params.studentId,
  });
  if (!student) {
    res.status(500).json({ msg: "user doesnt exist" });
  }
  res.json({ msg: "deleted success" });
};

module.exports = {
  deleteStudent,
  updateStudent,
  addStudent,
  getStudent,
  getAllStudents,
  register,
  login,
};
