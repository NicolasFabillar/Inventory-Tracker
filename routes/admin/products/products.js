const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");
const isAuth = require("../../../middlewares/authorization");

const {
    createProduct,
    updateProduct,
    deleteProduct,
    findAllProducts,
    findProductById,
} = require("../../../controllers/admin/products");

const router = express.Router();

router.post("/create",
    isAuth,
    [
        body("name").notEmpty().isString(),
        body("sku").notEmpty().isString(),
        body("categoryId").notEmpty().isString(),
        body("description").notEmpty().isString(),
        body("quantity").notEmpty().isInt(),
        body("lowStockThreshold").notEmpty().isInt(),
        body("price").notEmpty().isInt(),
    ],
    validation,
    createProduct
);

router.put('/:productId/update', 
    isAuth,
    [
        body("name").optional().isString(),
        body("sku").optional().isString(),
        body("categoryId").optional().isString(),
        body("description").optional().isString(),
        body("quantity").optional().isInt(),
        body("lowStockThreshold").optional().isInt(),
        body("price").optional().isInt(),
        body("editReason").notEmpty().isString(),
    ],
    validation,
    updateProduct
)

router.delete('/:productId/delete', 
    isAuth,
    deleteProduct
)

router.get('/show-all', 
    isAuth,
    findAllProducts
)

router.get('/:productId/search', 
    isAuth,
    findProductById
)

module.exports = router;