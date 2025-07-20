// middlewares/validate.js
module.exports = (validLogin) => {
  return (req, res, next) => {
    const { error, value } = validLogin.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });
    if (error) {
      return res
        .status(400)
        .json({ errors: error.details.map((d) => d.message) });
    }
    req.body = value;
    next();
  };
};
