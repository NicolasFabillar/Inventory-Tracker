const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");

const {
    accountLogin,
    accountCreate
} = require("../../../controllers/allUsers/accounts");

const router = express.Router();

router.post(
    "/login",
    [
        body("usernameOrEmail").notEmpty(),
        body("password").notEmpty()
    ],
    validation,
    accountLogin
);

router.post(
    "/register",
    [
        body("token").notEmpty(),
        body("firstName").notEmpty(),
        body("lastName").notEmpty(),
        body("username").notEmpty(),
        body("emailAddress").notEmpty(),
        body("password").notEmpty(),
        body("confirmPassword")
            .notEmpty()
            .custom((value, { req }) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match!");
                }
                return true;
            }),
        body("phoneNo").notEmpty()
    ],
    validation,
    accountCreate
);

module.exports = router;