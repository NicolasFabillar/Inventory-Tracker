const Sequelize = require("sequelize");
const connection = require("../connection/database");

const Products = connection.define("products", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    sku: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    created_by: {
        type: Sequelize.UUID,
        allowNull: false
    },
    category_id: {
        type: Sequelize.UUID,
        allowNull: true
    },
    description : {
        type: Sequelize.TEXT,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    low_stock_threshold: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: Sequelize.ENUM("active", "inactive", "discontinued"),
        allowNull: false,
        defaultValue: "active"
    }
},
{
    tableName: "products",
    timestamps: true
});

module.exports = Products;