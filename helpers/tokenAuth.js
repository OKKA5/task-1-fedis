require("dotenv").config();
const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "Access Denied. No token provided." });
  }
  const token = header.split(" ")[1];

  try {
    const currentStudent = jwt.verify(token, process.env.SercretKey);
    req.currentStudent = currentStudent;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Invalid token." });
  }
};
module.exports = { verifyToken };
