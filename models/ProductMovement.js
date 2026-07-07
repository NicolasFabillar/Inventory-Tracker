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
    change_amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    reason: {
        type: Sequelize.ENUM("sale", "restock", "correction", "refund"),
        allowNull: false
    },
    reference_id: {
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
    }
}, {
    tableName: "product_movements",
    timestamps: true
});

module.exports = ProductMovements;