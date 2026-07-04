const Sequelize = require("sequelize");
const connection = require("../connection/database");

const Orders = connection.define("orders", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    employee_id: {
        type: Sequelize.UUID,
        allowNull: false
    },
    customer_name: {
        type: Sequelize.STRING(50),
        allowNull: true
    },
    total_amount: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    payment_method: {
        type: Sequelize.ENUM("cash", "card", "e-wallet"),
        allowNull: false
    },
    amount_tendered: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    change_due: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
    },
    status: {
        type: Sequelize.ENUM("pending", "completed", "cancelled", "refunded", "partially_refunded"),
        allowNull: false,
        defaultValue: "pending"
    }
},
{
    tableName: "orders",
    timestamps: true
});

module.exports = Orders;