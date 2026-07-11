const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");
const isAuth = require("../../../middlewares/authorization");

const {
    findAllProducts,
    findProductById,
} = require("../../../controllers/allUsers/products");

const router = express.Router();

router.get('/show-all', 
    isAuth,
    findAllProducts
)

router.get('/:productId/search', 
    isAuth,
    findProductById
)

module.exports = router;