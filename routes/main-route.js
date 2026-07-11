const express = require("express");
const router = express.Router();

// admin
const adminAccountsRoute = require("./admin/accounts/accounts");
const adminCategoriesRoute = require("./admin/categories/categories");
const adminProductsRoute = require("./admin/products/products");
const adminProductMovementsRoute = require("./admin/products/productMovements");
const adminOrdersRoute = require("./admin/orders/orders");

router.use("/admin", adminAccountsRoute);
router.use("/admin/categories", adminCategoriesRoute);
router.use("/admin/products", adminProductsRoute);
router.use("/admin/products/product-movement", adminProductMovementsRoute);
router.use("/admin/orders", adminOrdersRoute);

// customers
const employeeAccountsRoute = require("./employee/accounts/accounts");

router.use("/employee", employeeAccountsRoute);

// all users
const allAccountsRoute = require("./allUsers/accounts/accounts");
const allOrdersRoute = require("./allUsers/orders/orders");
const allProductsRoute = require("./allUsers/products/products");

router.use("/all", allAccountsRoute);
router.use("/all/orders", allOrdersRoute);
router.use("/all/products", allProductsRoute);

module.exports = router;
