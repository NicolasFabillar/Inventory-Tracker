const Users = require("./Users");
const Products = require("./Products");
const Categories = require("./Categories");
const OrderItems = require("./OrderItems");
const Orders = require("./Orders");
const Refunds = require("./Refunds");
const ProductMovements = require("./ProductMovement");

Users.hasMany(Products, {
    foreignKey: 'created_by',
    as: 'creator'
});

Products.belongsTo(Users, {
    foreignKey: 'created_by',
    as: 'productCreator',
});

Categories.hasMany(Products, {
    foreignKey: 'category_id',
    as: 'products'
});

Products.belongsTo(Categories, {
    foreignKey: 'category_id',
    as: 'category',
});

ProductMovements.belongsTo(Products, {
    foreignKey: 'product_id',
    as: 'productMovement',
});

Products.hasMany(ProductMovements, {
    foreignKey: 'product_id',
    as: 'movements',
});

module.exports = { 
    Users,
    Products,
    Categories,
    OrderItems,
    Orders,
    Refunds,
    ProductMovements
};