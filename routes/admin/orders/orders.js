const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");
const isAuth = require("../../../middlewares/authorization");

const {
    approveRefund,
    findAllOrders,
    findOrderById,
    getSaleSummary
} = require("../../../controllers/admin/orders");

const router = express.Router();

router.put('/:orderId/refund/approve', 
    isAuth,
    [
        body("status").notEmpty().isString().isIn(["approved", "rejected"]),
    ],
    validation,
    approveRefund
)

router.get('/show-all', 
    isAuth,
    findAllOrders
)

router.get('/:orderId/search', 
    isAuth,
    findOrderById
)

router.get('/sales-summary', 
    isAuth,
    getSaleSummary
)

module.exports = router;