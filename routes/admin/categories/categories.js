const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");
const isAuth = require("../../../middlewares/authorization");

const {
    createCategory,
    updateCategory,
    findAllCategories
} = require("../../../controllers/admin/categories");

const router = express.Router();

router.post("/create",
    isAuth,
    [
        body("name").notEmpty().isString(),
    ],
    validation,
    createCategory
);

router.put('/:categoryID/update', 
    isAuth,
    [
        body("name").optional().isString(),
    ],
    validation,
    updateCategory
)

router.get('/show-all', 
    isAuth,
    findAllCategories
)

module.exports = router;