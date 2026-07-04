const Sequelize = require("sequelize");
const connection = require("../connection/database");

const Refunds = connection.define("refunds", {
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
    order_item_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    refund_reason: {
        type: Sequelize.TEXT,
        allowNull: true
    },
    refunded_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    status: {
        type: Sequelize.ENUM("pending", "approved", "rejected", "completed"),
        allowNull: false,
        defaultValue: "pending"
    }
},
{
    tableName: "refunds",
    timestamps: true
});

module.exports = Refunds;