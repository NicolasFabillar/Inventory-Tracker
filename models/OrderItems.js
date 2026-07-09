const Sequelize = require("sequelize");
const connection = require("../connection/database");

const OrderItems = connection.define("orderItems", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    order_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    product_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price_at_sale: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    subtotal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("sold","refunded", "cancelled",  "partially_refunded"),
        allowNull: false,
        defaultValue: "sold"
    }
}, 
{
    tableName: "orderItems",
    timestamps: true
});

module.exports = OrderItems;