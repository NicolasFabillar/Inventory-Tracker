const express = require("express");
const { body } = require("express-validator");
const validation = require("../../../middlewares/route-validation");
const isAuth = require("../../../middlewares/authorization");

const {
    showAllUsers,
    findUserById,
} = require("../../../controllers/admin/accounts");

const router = express.Router();

router.get('/show-all', 
    isAuth,
    showAllUsers
)

router.get('/:userId/search', 
    isAuth,
    findUserById
)


module.exports = router;