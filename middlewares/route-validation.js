const { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid request!");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  next();
};
  