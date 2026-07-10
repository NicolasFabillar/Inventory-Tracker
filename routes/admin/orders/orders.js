const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");
const isAuth = require("../../../middlewares/authorization");

const {
    approveRefund,
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

module.exports = router;