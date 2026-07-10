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

Orders.hasMany(OrderItems, {
    foreignKey: 'order_id',
    as: 'orderItems'
});

OrderItems.belongsTo(Orders, {
    foreignKey: 'order_id',
    as: 'order'
});

Products.hasMany(OrderItems, {
    foreignKey: 'product_id',
    as: 'orderItems'
});

OrderItems.belongsTo(Products, {
    foreignKey: 'product_id',
    as: 'orderProduct'
});

Users.hasMany(Orders, {
    foreignKey: 'employee_id',
    as: 'orderCreator'
});

Orders.belongsTo(Users, {
    foreignKey: 'employee_id',
    as: 'orderCreatedBy'
});

Orders.hasMany(Refunds, {
    foreignKey: 'order_id',
    as: 'orderRefund'
});

Refunds.belongsTo(Orders, {
    foreignKey: 'order_id',
    as: 'refund'
});

OrderItems.hasMany(Refunds, {
    foreignKey: 'order_item_id',
    as: 'orderItemRefund'
});

Refunds.belongsTo(OrderItems, {
    foreignKey: 'order_item_id',
    as: 'itemRefund'
});

Users.hasMany(Refunds, {
    foreignKey: 'refunded_by',
    as: 'refundCreator'
});

Refunds.belongsTo(Users, {
    foreignKey: 'refunded_by',
    as: 'refundedBy'
});

Users.hasMany(Refunds, {
    foreignKey: 'approved_by',
    as: 'refundApprover'
});

Refunds.belongsTo(Users, {
    foreignKey: 'approved_by',
    as: 'approvedBy'
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