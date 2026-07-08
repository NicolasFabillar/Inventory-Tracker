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
    as: 'changedProduct',
});

Products.hasMany(ProductMovements, {
    foreignKey: 'product_id',
    as: 'movements',
});

Users.hasMany(ProductMovements, {
    foreignKey: 'performed_by',
    as: 'stockMovements'
});

ProductMovements.belongsTo(Users, {
    foreignKey: 'performed_by',
    as: 'performedBy'
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