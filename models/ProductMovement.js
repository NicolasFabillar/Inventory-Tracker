const Sequelize = require("sequelize");
const connection = require("../connection/database");

const ProductMovements = connection.define("product_movements", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    product_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    change_quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    quantity_after_change: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reason: {
        type: Sequelize.ENUM("sale", "restock", "correction", "refund"),
        allowNull: false
    },
    order_id: {
        type: Sequelize.UUID,
        allowNull: true
    },
    refund_id: {
        type: Sequelize.UUID,
        allowNull: true
    },
    performed_by: {
        type: Sequelize.UUID,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: true
    },
}, {
    tableName: "product_movements",
    timestamps: true
});

module.exports = ProductMovements;