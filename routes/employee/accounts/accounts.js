const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");

const {
    accountLogin,
} = require("../../../controllers/employee/accounts");

const router = express.Router();

router.post(
    "/login",
    [
        body("emailAddress").notEmpty().isEmail(),
        body("password").notEmpty()
    ],
    validation,
    accountLogin
);

module.exports = router;