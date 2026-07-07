const express = require("express");
const router = express.Router();

// admin
const adminAccountsRoute = require("./admin/accounts/accounts");
const adminCategoriesRoute = require("./admin/categories/categories");
const adminProductsRoute = require("./admin/products/products");

router.use("/admin", adminAccountsRoute);
router.use("/admin/categories", adminCategoriesRoute);
router.use("/admin/products", adminProductsRoute);

// customers
const employeeAccountsRoute = require("./employee/accounts/accounts");

router.use("/employee", employeeAccountsRoute);

// all users
const allAccountsRoute = require("./allUsers/accounts/accounts");

router.use("/all", allAccountsRoute);


module.exports = router;
