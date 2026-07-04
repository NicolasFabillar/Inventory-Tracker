const express = require("express");
const router = express.Router();

// admin
const adminAccountsRoute = require("./admin/accounts/accounts");

router.use("/admin", adminAccountsRoute);

// customers
const employeeAccountsRoute = require("./employee/accounts/accounts");

router.use("/employee", employeeAccountsRoute);

// all users
const allAccountsRoute = require("./allUsers/accounts/accounts");

router.use("/all", allAccountsRoute);


module.exports = router;
