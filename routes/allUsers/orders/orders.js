const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");
const isAuth = require("../../../middlewares/authorization");

const {
    createOrder,
    payOrder,
    refundOrder,
    refundAmount
} = require("../../../controllers/allUsers/orders");

const router = express.Router();

router.post("/create",
    isAuth,
    [
        body("customerName").notEmpty().isString(),
        body("orderItems")
            .isArray()
            .custom((value) => {
                if (value.length === 0) {
                    throw new Error('orderItems array cannot be empty');
                }

                value.forEach((detail, index) => {
                    const requiredFields = [
                        'id', 'quantity'
                    ];

                    requiredFields.forEach(field => {
                        if (!detail[field]) {
                            throw new Error(`orderItems[${index}] is missing the field: ${field}`);
                        }
                    });
                });

                return true;
            }),
    ],
    validation,
    createOrder
);

router.put('/:orderId/payOrder', 
    isAuth,
    [
        body("paymentMethod").notEmpty().isString().isIn(["cash", "card", "e-wallet"]),
        body("amountTendered").optional().isInt(),
    ],
    validation,
    payOrder
)

router.put("/:orderId/refund",
    isAuth,
    [
        body("customerName").notEmpty().isString(),
        body("refundReason").notEmpty().isString(),
        body("refundItems")
            .isArray()
            .custom((value) => {
                if (value.length === 0) {
                    throw new Error('refundItems array cannot be empty');
                }

                value.forEach((detail, index) => {
                    const requiredFields = [
                        'id', 'quantity'
                    ];

                    requiredFields.forEach(field => {
                        if (!detail[field]) {
                            throw new Error(`refundItems[${index}] is missing the field: ${field}`);
                        }
                    });
                });

                return true;
            }),
    ],
    validation,
    refundOrder
);

router.get('/:orderId/refundAmount', 
    isAuth,
    refundAmount
)

module.exports = router;