const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const errorHandler = require("../util/errorHandler");
const Users = require("../models/Users");

dotenv.config();

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      return errorHandler("Not authenticated", 401);
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRETKEY);

    if (!decodedToken) {
      return errorHandler("Not Authenticated", 401);
    }

    const user = await Users.findByPk(decodedToken.userId);

    if (!user) {
      return errorHandler("User token not valid.", 401);
    }

    req.userId = decodedToken.userId;

    next();
  } catch (err) {
    console.error(err);
    next(err);
  }
};