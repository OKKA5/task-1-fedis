const allowed = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.currentStudent.role)) {
      return res.status(403).json({ msg: "Not allowed" });
    }
    next();
  };
};
module.exports = allowed;
